import React from "react";
import { Image, View, StyleSheet } from "react-native";

import * as fb from "_root/firebase";
import LoadingComponent from "./LoadingComponent";
import * as syst from "_root/systemFunctions";

/*
Component custom créé pour afficher les images de Firabse et de les mettre en cache, afin de réduire le temps de chargement des pages et les flux de données.

Utilisation
1) Importer CacheImage dans l'écran cible
2) Utilisation comme un component Image normal pour le style et pour le resizeMode

<CacheImage
  style={styles.image}
  firebaseFolder={"PNP"}
  firebaseFileName={"mandat.jpg"}
/>

3) Pour récupérer l'image depuis le storage de Firebase, préciser le folder et le nom de l'image. CF plus haut
*/

class CacheImage extends React.Component {
  state = {
    source: null,
    loadingImage: true,
  };

  componentDidMount = async () => {
    const folder = this.props.firebaseFolder;
    const fileName = this.props.firebaseFileName;
    const uri = this.props.uri;
    const notLoading = this.props.notLoading;

    if (folder && fileName) {
      console.log(
        "********************************READ FROM FB***************************"
      );
      console.log("folder =");
      console.log(folder);
      console.log("fileName =");
      console.log(fileName);
      this.setState({
        source: {
          uri: await syst.goToCache(await fb.getURL(folder, fileName)),
        },
        loadingImage: false,
      });
    } else {
      console.log(
        "******************************READ FROM URI*************************"
      );
      this.setState({
        source: {
          uri: await syst.goToCache(uri),
        },
        loadingImage: false,
      });
    }
  };

  render() {
    if (
      this.state.loadingImage &&
      !this.props.notLoading &&
      this.props.uri &&
      this.props.uri !== " "
    ) {
      return (
        <LoadingComponent
          logoVisible={false}
          size={"large"}
          color={"#FF3333"}
        />
      );
    } else if (this.props.firebaseFileName == "") {
      return (
        <Image
          style={this.props.style}
          source={require("_assets/noImage.png")}
          resizeMode={this.props.resizeMode}
        />
      );
    } else {
      return (
        <Image
          style={this.props.style}
          source={this.state.source}
          resizeMode={this.props.resizeMode}
        />
      );
    }
  }
}

export default CacheImage;
