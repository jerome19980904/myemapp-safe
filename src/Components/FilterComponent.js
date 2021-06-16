import React, {Component} from "react";
import {Text, View, StyleSheet, Alert} from "react-native";
import MultiSelect from 'react-native-multiple-select';
import SelectionedMultiSelect from "react-native-sectioned-multi-select";

import InputField from "_Components/InputField"
import * as syst from "_root/systemFunctions"


class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFiltered:this.props.data,
      filtreCat : "Aucun Filtre",
      filtreText:"",
    };
  }

_filterer = (item, filtre, cat)=> {
  if (filtre===cat){
    cat="categories"
  }
  var compared = item[cat]
  if (compared===undefined){
    if (filtre==="undefined"){
      return true
    }
    return false
  } else {
    compared = syst.remplace_diacritiques(compared.toString()).toLowerCase()
    filtre = syst.remplace_diacritiques(filtre.toString()).toLowerCase()
    return compared.toString().includes(filtre)
  }
}

_filtrer = (categorieWithoutInput) => {
  var listFiltered=[]
  var listNone = this.props.data
  var onceFiltered = this.props.onceFiltered
  var cat = this.state.filtreCat
  var filtre = this.state.filtreText
  if (categorieWithoutInput){
    cat = categorieWithoutInput
    filtre = categorieWithoutInput
  }
  if (cat[0]==="Aucun Filtre" || filtre===""){
    onceFiltered(listNone)
    this.setState({filtreText:"", filtreCat:"Aucun Filtre"})
  }else if (filtre!=""){
    listNone.forEach((item)=>{
      if (this._filterer(item, filtre, cat)){
        listFiltered.push(item)
      }})
        onceFiltered(listFiltered)
        this.setState({ filtreCat:cat, dataFiltered:listFiltered})
  }

}

onSelectedItemChange = (cat)=>{
  if ((this.props.filtresWithoutInput && this.props.filtresWithoutInput.includes(cat[0])) || cat[0]==="Aucun Filtre"){
    this._filtrer(cat)
  } else {
    this.setState({filtreCat:cat})
  }
}
  render() {
    console.log("****************** FILTER COMPONENT ******************", this.state);

var rienAffiche
  var onceFiltered = this.props.onceFiltered

  var select = (  <MultiSelect
      items={this.props.filtreCategories}
      uniqueKey="objet"
      displayKey="display"
      selectText="Filtrer sur..."
      onSelectedItemsChange={(cat)=>{
      var  data=this.props.data
    onceFiltered(data)
  this.setState({dataFiltered:data, filtreCat:cat, filtreText:""})}
  }
      selectedItems={this.state.filtreCat}
      alwaysShowSelectText={true}
      styleDropdownMenu={{width : syst.viewportWidth/(1+(!(this.state.filtreCat=="Aucun Filtre")==1))- 20}}
      single={true}
      hideDropdown={true}

    />)
if (this.state.dataFiltered && !this.state.dataFiltered[0] ){
  rienAffiche = (<Text style={{textAlign:"center", color:"red", fontWeight:"bold"}}>Rien ne correspond à votre recherche</Text>)
}
if (this.props.sectioned){
  var coeff=2
  if (this.props.filtresWithoutInput && !this.props.filtresWithoutInput.includes(this.state.filtreCat[0]) && this.state.filtreCat!="Aucun Filtre"){
    coeff=1
  }
  select = (<SelectionedMultiSelect items={this.props.filtreCategories}
  uniqueKey="objet"
  displayKey="display"
  subKey="children"
  selectText="Filtrer sur..."
  single={true}
  alwaysShowSelectText={true}
  styleDropdownMenu={{width : syst.viewportWidth/coeff- 20}}
  onSelectedItemsChange={this.onSelectedItemChange}
  selectedItems={this.state.filtreCat}
  hideConfirm={true}
/>)
}
var input
if ((!this.props.filtresWithoutInput && this.state.filtreCat!="Aucun Filtre") || this.props.filtresWithoutInput && !this.props.filtresWithoutInput.includes(this.state.filtreCat[0]) && this.state.filtreCat!="Aucun Filtre"){
input=  (<InputField
              placeholder="Filtrer..."
              autoCapitalize="none"
              keyboardType="email-address"
              inputContainerStyle={{
                marginBottom: 10, width: syst.viewportWidth/2-20
              }}
              disabled={this.state.filtreCat=="Aucun Filtre"}
              onChangeText={text => this.setState({filtreText: text})}
              value={this.state.filtreText}
              onSubmitEditing={()=> this._filtrer()}
            />)
}
return(
        <View style={styles.mainContainer}>

        <View style={{ flexDirection:"row", paddingHorizontal:10, paddingTop:10}}>
        <View style={{flex:1}}>
      {select}
        </View>
        <View>
              {input}
                        </View>
                        </View>

                        {rienAffiche}

        </View>
      );
  }
}

const styles = StyleSheet.create({

  logo: {
    height: 100,
    width: 100,
    marginBottom: 30
  },
  main: {
    height: 100,
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "center"
  },

});

export default FilterComponent;
