import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import {Button} from "react-native-elements";
import {NavigationEvents} from "react-navigation";

import LongButton from "_Components/LongButton";
import DismissKeyboard from "_Components/DismissKeyboard";
import Input from "_Components/InputField";
import LoadingComponent from "_Components/LoadingComponent";
import * as fb from "_root/firebase.js";
import textStyles from "_styles/textStyles";

import appMeta from "_root/../app.json";

var alertSeen = false;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputID: "",
      inputPassword: "",
      errorMessage: null,
      userVerified: false,
      isConnecting: false
    };
  }

  _submitConnexion() {
    this._connexionFirebase(this.state.inputID, this.state.inputPassword);
    this.setState({isConnecting: true});
  }

  _connexionFirebase(email, password) {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        console.log(fb.auth.currentUser.uid);
        fb.verifierUser(fb.auth.currentUser.uid);
      })
      .catch(error => {
        // Handle Errors here.
        this.setState({isConnecting: false});

        var errorCode = error.code;
        var errorMessage = error.message;

        switch (errorCode) {
          case "auth/user-not-found":
          case "auth/user-disabled":
            this.setState({
              errorMessage: "Cet utilisateur n'existe pas, veuillez réessayer."
            });
            break;
          case "auth/invalid-email":
            this.setState({
              errorMessage: "Email invalide, veuillez réessayer."
            });
            break;
          case "auth/wrong-password":
            this.setState({
              errorMessage: "Mot de passe erronné, veuillez réessayer."
            });
            break;
          default:
            this.setState({errorMessage: "Erreur inconnue."});
        }

        console.log(errorCode);
        console.log(errorMessage); // ...
      });
  }

  _inputChanged(field, text) {
    if (field === "id") {
      let trimmedText = text.trim();
      this.setState({inputID: trimmedText});
    } else {
      this.setState({inputPassword: text});
    }
  }

  _fillInput() {
    if (this.props.navigation.getParam("mail", "empty") !== "empty") {
      this.setState({
        inputID: this.props.navigation.getParam("mail", "empty")
      });
    }
    console.log("Fill Input done");
  }

  componentDidMount() {
    console.log("****************** LOGIN ******************");
    if (alertSeen === false) {
      Alert.alert(
        "Bienvenue !",
        "Si tu es étudiant à l'emlyon, tu peux commencer par te créer un compte myEMapp. \n\nSi tu es admissible, nous t'invitons à te rendre dans 'Admissible / Visiteur' où tu trouveras tout ce qu'il y a à savoir sur la vie étudiante à l'emlyon."
      );
      alertSeen = true;
    }
  }

  render() {
    if (this.state.isConnecting) {
      return (
        <LoadingComponent
          logoStyle={styles.logo}
          logoVisible={true}
          size={"large"}
          color={"#FF3333"}
          text={"On te connecte..."}
          textStyle={textStyles.h3}
        />
      );
    } else {
      return (
        <DismissKeyboard>
          <View
            style={{
              flex: 1
            }}
          >
            <KeyboardAvoidingView
              style={styles.container}
              behavior="padding"
              enabled="enabled"
            >
              <NavigationEvents
                onWillFocus={() => {
                  this._fillInput();
                }}
              />
              <View style={styles.header}></View>
              <View style={styles.body}>
                <Image
                  style={{
                    height: 200,
                    width: 200,
                    marginBottom: 30
                  }}
                  source={require("_assets/logo2.png")}
                />
                <Input
                  placeholder="Identifiant /Email "
                  autoCapitalize="none"
                  keyboardType="email-address"
                  inputContainerStyle={{
                    marginBottom: 10
                  }}
                  onSubmitEditing={() => this.refInput1.getInnerRef().focus()}
                  onChangeText={text => this._inputChanged("id", text)}
                  value={this.state.inputID}
                />
                <Input
                  ref={r => (this.refInput1 = r)}
                  placeholder="Mot de passe"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  inputContainerStyle={{
                    marginBottom: 20
                  }}
                  errorMessage={this.state.errorMessage}
                  onChangeText={text => this._inputChanged("password", text)}
                  onSubmitEditing={() => this._submitConnexion()}
                />
                <LongButton
                  title="Se connecter"
                  onPress={() => {
                    this._submitConnexion();
                  }}
                  style={styles.button}
                />
                <LongButton
                  style={styles.button}
                  title="Créer un compte"
                  onPress={() => {
                    this.props.navigation.navigate("Register");
                  }}
                />
                <LongButton
                  style={styles.button}
                  title="Admissible / Visiteur"
                  onPress={() => {
                    this.props.navigation.navigate("Admissible");
                  }}
                />
                <Button
                  type="clear"
                  title="Mot de passe oublié ?"
                  onPress={() => this.props.navigation.navigate("MDPOublie")}
                  titleStyle={textStyles.h3}
                />
              </View>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
              <Text style={[textStyles.h1, styles.footerText]}>
                Application réalisée par Plug 'n' Play
              </Text>
              <Text style={[textStyles.h5, styles.versionText]}>
                Version {appMeta.expo.version}
              </Text>
            </View>
          </View>
        </DismissKeyboard>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "stretch",
    paddingVertical: 10
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 18
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },

  button: {
    marginBottom: 10
  },
  footer: {
    paddingBottom: 15
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 30
  },
  footerText: {
    textAlign: "center",
    color: "grey",
    fontSize: 14
  },
  versionText: {
    textAlign: "center",
    color: "grey",
    fontSize: 12
  }
});

export default Login;
