import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Button,
  ScrollView,
  SafeAreaView
} from "react-native";
import {Icon, CheckBox} from "react-native-elements";
import * as EmailValidator from "email-validator";

import DismissKeyboard from "_Components/DismissKeyboard";
import LongButton from "_Components/LongButton";
import Input from "_Components/InputField";
import * as fb from "_root/firebase";
import textStyles from "_styles/textStyles";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFiName: "",
      inputLaName: "",
      inputEmail: "",
      inputPassword1: "",
      inputPassword2: "",
      emailError: "",
      password1Error: "",
      password2Error: "",
      emailValid: false,
      passwordsValid: false,
      test: "false",
      checked: false
    };
  }

  _inputChanged(field, text) {
    switch (field) {
      case "fiName":
        this.setState({inputFiName: text});
        break;
      case "laName":
        this.setState({inputLaName: text});
        break;
      case "email":
        this.setState({inputEmail: text});
        break;

      case "password1":
        this.setState({inputPassword1: text});
        break;

      case "password2":
        this.setState({inputPassword2: text});
        break;

      default:
        console.log("Error Input");
        break;
    }
  }

  _checkEmail(email) {
    var emailValid = EmailValidator.validate(email);
    if (emailValid) {
      var splittedEmail = email.split("@");
      if (
        splittedEmail[1] === "edu.em-lyon.com" ||
        splittedEmail[1] === "edu.emlyon.com"
      ) {
        console.log(splittedEmail);
        this.setState({emailValid: true, emailError: ""});
      } else {
        //Mail emlyon
        console.log(splittedEmail);
        this.setState({emailError: "Il faut une adresse mail emlyon"});
      }
    } else {
      this.setState({emailError: "L'adresse mail est non valide"});
    }
  }

  _checkPasswords(password1, password2) {
    if (password1.length < 8) {
      this.setState({
        password1Error:
          "Votre mot de passe doit avoir une longueur de 8 caractères"
      });
    } else {
      if (password1 !== password2) {
        this.setState({
          password2Error: "Les deux mots de passe ne correspondent pas"
        });
      } else {
        this.setState({
          passwordsValid: true,
          password1Error: "",
          password2Error: ""
        });
      }
    }
  }

  async _submitted() {
    var submittedEmail = this.state.inputEmail;
    var password1 = this.state.inputPassword1;
    var password2 = this.state.inputPassword2;
    var fName = this.state.inputFiName;
    var lName = this.state.inputLaName;

    await this._checkEmail(submittedEmail);
    await this._checkPasswords(password1, password2);

    var verifFName = fName
      .split("-")
      .join("")
      .split("'")
      .join("")
      .split(" ")
      .join("")
      .toLowerCase();
    var verifLName = lName
      .split("-")
      .join("")
      .split("'")
      .join("")
      .split(" ")
      .join("")
      .toLowerCase();
    var emailName = submittedEmail
      .toLowerCase()
      .split("@")[0]
      .split(".");

    if (verifFName != emailName[0]) {
      Alert.alert(
        "Prénom incorrect",
        "Votre prénom ne correspond pas à l'email. Utiliser uniquement des lettres sans accents, des tirets, des apostrophes ou des espaces!"
      );
      return null;
    }
    if (verifLName != emailName[1]) {
      Alert.alert(
        "Nom incorrect",
        "Votre nom ne correspond pas à l'email. Utiliser uniquement des lettres sans accents, des tirets, des apostrophes ou des espaces!"
      );
      return null;
    }

    if (this.state.emailValid && this.state.passwordsValid) {
      console.log("Inscription envoyée à Firebase");
      fb.auth
        .createUserWithEmailAndPassword(
          this.state.inputEmail,
          this.state.inputPassword1
        )
        .then(() => {
          fb.auth.currentUser
            .sendEmailVerification()
            .then(async function() {
              let uID = fb.auth.currentUser.uid;
              let userData = {
                firstName: fName,
                lastName: lName,
                userID: uID,
                mail: submittedEmail,
                asso: "None",
                accountType: 0,
                signUpDate: new Date(),
                cguAccepted: true,
                checked: false
              };
              await fb.writeInDatabase("usersData", uID, userData);
              fb.auth.signOut();
            })
            .catch(function(error) {
              console.log(error);
              Alert.alert(error);
            }),
            Alert.alert(
              "Presque finie...",
              "Pour terminer votre inscription, cliquez sur le lien dans le mail de validation. Si vous ne trouvez pas le mail, vérifiez dans vos spams.",
              [
                {
                  text: "OK",
                  onPress: () =>
                    this.props.navigation.navigate("Login", {
                      mail: submittedEmail
                    })
                }
              ]
            );
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error.code);
          if (error.code === "auth/email-already-in-use") {
            this.setState({
              emailError: "Cette adresse mail est déjà utilisée."
            });
          } else {
            this.setState({
              emailError:
                "Erreur inconnue, veuillez contacter l'équipe myEMApp."
            });
          }
        });
    } else {
      console.log("INSCRIPTION INVALIDE");
    }
  }

  componentDidMount() {
    console.log("####### REGISTER #######");
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled="enabled"
        >
          <View style={styles.header}>
            <Icon
              name="chevron-left"
              type="font-awesome"
              color="#FF0000"
              onPress={() => this.props.navigation.navigate("Login")}
            />
          </View>
          <View style={styles.infoArea}>
            <Text style={[textStyles.h2, styles.title]}>Créer mon compte</Text>
            <Text style={[textStyles.h4, styles.info]}>
              Le compte myEMApp est différent du compte MyEMLife. La création de
              compte est seulement autorisée pour les étudiants de l'emlyon.
              L'application n'accepte que les mails fournis par l'école.
            </Text>
          </View>
          <View style={styles.inputArea}>
            <Input
              placeholder="Votre prénom"
              autoCapitalize="none"
              returnKeyType={"next"}
              clearButtonMode="always"
              inputContainerStyle={{
                marginBottom: 15
              }}
              onChangeText={text => this._inputChanged("fiName", text)}
              onSubmitEditing={() => this.refInput1.getInnerRef().focus()}
            />
            <Input
              ref={r => (this.refInput1 = r)}
              placeholder="Votre nom"
              autoCapitalize="none"
              returnKeyType={"next"}
              clearButtonMode="always"
              inputContainerStyle={{
                marginBottom: 15
              }}
              onChangeText={text => this._inputChanged("laName", text)}
              onSubmitEditing={() => this.refInput2.getInnerRef().focus()}
            />
            <Input
              ref={r => (this.refInput2 = r)}
              placeholder="Votre email emlyon"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType={"next"}
              clearButtonMode="always"
              inputContainerStyle={{
                marginBottom: 15
              }}
              onChangeText={text => this._inputChanged("email", text)}
              onSubmitEditing={() => this.refInput3.getInnerRef().focus()}
              errorMessage={this.state.emailError}
            />
            <Input
              ref={r => (this.refInput3 = r)}
              placeholder="Votre mot de passe"
              autoCompleteType="password"
              autoCapitalize="none"
              secureTextEntry={true}
              returnKeyType={"next"}
              inputContainerStyle={{
                marginBottom: 15
              }}
              errorMessage={this.state.password1Error}
              onChangeText={text => this._inputChanged("password1", text)}
              onSubmitEditing={() => this.refInput4.getInnerRef().focus()}
            />
            <Input
              ref={r => (this.refInput4 = r)}
              placeholder="Confirmez votre mot de passe"
              autoCompleteType="password"
              autoCapitalize="none"
              returnKeyType={"done"}
              secureTextEntry={true}
              inputContainerStyle={{
                marginBottom: 15
              }}
              errorMessage={this.state.password2Error}
              onChangeText={text => this._inputChanged("password2", text)}
            />
            <View style={styles.accords}>
              <Text style={[textStyles.h1, styles.text]}>
                Veuillez accepter les
                <Text
                  style={[textStyles.h5, styles.cgu]}
                  onPress={() => this.props.navigation.navigate("CGUScreen")}
                >
                  conditions générales d 'utilisation.
                </Text>
              </Text>
              <CheckBox
                center="center"
                checked={this.state.checked}
                onPress={() =>
                  this.setState({
                    checked: !this.state.checked
                  })
                }
              />
            </View>
            <LongButton
              style={styles.button}
              title="Créer mon compte"
              onPress={() => {
                this._submitted();
              }}
              disabled={!this.state.checked}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 40
  },
  header: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "flex-start"
  },
  infoArea: {
    marginTop: 30
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    color: "grey",
    textAlign: "justify"
  },
  inputArea: {
    marginTop: 40,
    flex: 1,
    alignItems: "center"
  },
  button: {
    marginTop: 10,
    marginBottom: 10
  },
  accords: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: 270,
    justifyContent: "space-around",
    paddingLeft: 10
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
  },
  cgu: {
    color: "blue",
    textDecorationLine: "underline"
  }
});

export default Register;
