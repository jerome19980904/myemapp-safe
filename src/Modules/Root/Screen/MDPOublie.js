import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import * as EmailValidator from "email-validator";

import LongButton from "_Components/LongButton";
import Input from "_Components/InputField";
import DismissKeyboard from "_Components/DismissKeyboard";
import * as fb from "_root/firebase.js";
import textStyles from "_styles/textStyles";



export default class MDPOublie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: "",
      inputEmail: "",
    };
  }

  _mdpOublie(email) {
    console.log(email);
    if (EmailValidator.validate(email)) {
      fb.auth.sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            "Email envoyé",
            "Un email de réinitialisation de mot de passe vous a été envoyé.",
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.navigate("Login"),
              },
            ]
          );
        })
        .catch((error) => {
          this.setState({ emailError: "Email inconnu" });
        });
    } else {
      this.setState({ emailError: "Votre email est invalide" });
    }
  }

  render() {
    console.log("****************** MDP OUBLIE ******************");
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
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
            <Text style={[textStyles.h2, styles.title]}>
              Retrouver mon mot de passe
            </Text>
            <Text style={[textStyles.h4, styles.info]}>
              Veuillez entrer votre email afin de recevoir le mail de
              réinitialisation de mot de passe.
            </Text>
          </View>
          <View style={styles.inputArea}>
            <Input
              placeholder="Votre email"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType={"next"}
              inputContainerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => {
                this.setState({ inputEmail: text });
              }}
              onSubmitEditing={() => this._mdpOublie(this.state.inputEmail)}
              errorMessage={this.state.emailError}
            />

            <LongButton
              style={styles.button}
              title="Envoyer"
              onPress={() => {
                this._mdpOublie(this.state.inputEmail);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "flex-start",
  },
  infoArea: {
    marginTop: 30,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    color: "grey",
    textAlign: "center",
  },
  inputArea: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
  },
});
