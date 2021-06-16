import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Button } from "react-native";

import LicensesListItem from "_Components/LicenseListItem";
import licenseData from "_Legal/licence.json";
import textStyles from "_styles/textStyles";

//Ecran réalisé en suivant ce guide: https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f

function extractNameFromGithubUrl(url) {
  if (!url) {
    return null;
  }

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return null;
}

function sortDataByKey(data, key) {
  data.sort(function (a, b) {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  });
  return data;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let licenses = Object.keys(licenseData).map((key) => {
  let { licenses, ...license } = licenseData[key];
  let [name, version] = key.split("@");

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  let username =
    extractNameFromGithubUrl(license.repository) ||
    extractNameFromGithubUrl(license.licenseUrl);

  let userUrl;
  let image;
  if (username) {
    username = capitalizeFirstLetter(username);
    image = `http://github.com/${username}.png`;
    userUrl = `http://github.com/${username}`;
  }

  return {
    key,
    name,
    image,
    userUrl,
    username,
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

sortDataByKey(licenses, "username");

export default class Credits extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={[textStyles.h3, styles.text]}>
          Voici la liste des outils que nous avons utilisés pour réaliser notre
          application:
        </Text>
        <FlatList
          style={styles.list}
          keyExtractor={({ key }) => key}
          data={licenses}
          renderItem={({ item }) => <LicensesListItem {...item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  list: {
    flex: 1,
  },
  text: {
    marginBottom: 10,
  },
});
