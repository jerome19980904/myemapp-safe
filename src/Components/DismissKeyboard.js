import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";



const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
