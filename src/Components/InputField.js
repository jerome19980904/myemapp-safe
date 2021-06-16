import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

import textStyles from "_styles/textStyles";



class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  getInnerRef = () => this.ref;

  componentDidMount() {
    console.log("****************** INPUT FIELD ******************");
  }

  render() {
    return (
      <Input
        ref={(r) => (this.ref = r)}
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.placeholderTextColor}
        autoCapitalize={this.props.autoCapitalize}
        inputContainerStyle={[styles.input, this.props.inputContainerStyle]}
        inputStyle={[textStyles.h4, styles.inputText, this.props.inputText]}
        onChangeText={this.props.onChangeText}
        secureTextEntry={this.props.secureTextEntry}
        errorMessage={this.props.errorMessage}
        keyboardType={this.props.keyboardType}
        onSubmitEditing={this.props.onSubmitEditing}
        clearButtonMode={this.props.clearButtonMode}
        value={this.props.value}
        errorStyle={[textStyles.h4, styles.error, this.props.errorStyle]}
        disabled={this.props.disabled}
        containerStyle={{
          alignItems: "center",
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  input: {
    width: 270,
    borderColor: "#C6C6C6",
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 200,
  },
  inputText: {
    textAlign: "center",
  },
  error: {
    marginTop: 0,
    textAlign: "center",
  },
});

InputField.defaultProps = {
  placeholder: "Veuillez entrer un placeholder",
  onChangeText: () => console.log("Texte changé"),
  placeholderTextColor: "grey",
};

export default InputField;
