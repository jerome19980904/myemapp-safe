import React, { useState, useEffect, useRef } from "react";
import * as fb from "_root/firebase";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

//Fonction qui permet de demander la permission d'envoyer des notifications à l'utilisateur
export async function registerForPushNotifications() {
  //Vérifie si les permissions sont activées
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = status;

  //Pas activé
  if (status !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
    return;
  }

  if (finalStatus !== "granted") {
    return;
  }

  verifyTokenNotification();
}

export async function verifyTokenNotification() {
  let uid = fb.auth.currentUser.uid;
  var data = await fb.getDataDoc("usersData", uid);
  data = data.data();
  var token = data.expoNotificationToken;
  if (token === undefined) {
    let token = await Notifications.getExpoPushTokenAsync();
    fb.fr
      .collection("usersData")
      .doc(uid)
      .update({ expoNotificationToken: token })
      .then(console.log("Expo Token added to Firestore"));
  }
  console.log("All Good Man, he has the notifs activated!");
}

export async function sendPushNotification(
  token,
  sound,
  title,
  body,
  titleAdmin,
  bodyAdmin
) {
  var tokenUsers = [];
  console.log("Les tokens recus sont : ", token);

  if (token.users) {
    tokenUsers = token.users;
  }

  if (bodyAdmin) {
    const messageAdmin = {
      to: token.admins,
      sound: sound,
      title: titleAdmin,
      body: bodyAdmin,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageAdmin),
    });

    console.log("Message admin envoyé à : ", token.admins);
  } else {
    if (token.admins) {
      tokenUsers = [...tokenUsers, ...token.admins];
    }
  }

  if (tokenUsers) {
    const message = {
      to: tokenUsers,
      sound: sound,
      title: title,
      body: body,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    console.log("Message users envoyé à : ", tokenUsers);
  }
}
