//Ce module sert à éviter que l'on puisse revenir en arrière avec le bouton Back sur les Android. Il suffit de l'exporter vers l'écran LoadingScreen pour que ce soit effectif dans toutes l'appli.

import { BackHandler } from "react-native";
import { Alert } from "react-native";

const exitAlert = () => {
  Alert.alert(
    "Quitter ?",
    "Voulez-vous quitter MyEMApp ?",
    [
      { text: "Finalement non", style: "cancel" },
      { text: "Oui", onPress: () => BackHandler.exitApp() }
    ],
    { cancelable: true }
  );
};
export { exitAlert };

/**
 * Attaches an event listener that handles the android-only hardware
 * back button
 * @param  {Function} callback The function to call on click
 */
const handleAndroidBackButton = callback => {
  BackHandler.addEventListener("hardwareBackPress", () => {
    callback();
    return true;
  });
};
/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = () => {
  BackHandler.removeEventListener("hardwareBackPress", () => {});
};
export { handleAndroidBackButton, removeAndroidBackButtonHandler };
