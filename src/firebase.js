import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import * as syst from "_root/systemFunctions";

// Initialize Firebase
firebaseConfig = {
  //####
};

firebase.initializeApp(firebaseConfig);
export const st = firebase.storage();
export const fr = firebase.firestore();
export const auth = firebase.auth();
export const persistence = firebase.auth.Auth.Persistence.LOCAL;

export async function verifierUser(uid) {
  await fr.collection("usersData").doc(uid).set(
    {
      checked: true,
    },
    { merge: true }
  );
}

export async function verifierDemandeAsso(id) {
  console.log("vérification");
  var askingList = await getData("assosAsking");
  var already = false;
  askingList.forEach((asking) => {
    var askingData = asking.data();
    if (askingData.userID === id) {
      already = true;
    }
  });
  return already;
}

export async function getURL(folder, fileName) {
  return await st.ref(folder + "/" + fileName).getDownloadURL();
}

export async function getURLImage(folder, fileName) {
  var extension = ".jpg";
  await st
    .ref(folder + "/" + fileName + extension)
    .getDownloadURL()
    .catch(() => (extension = ".png"));
  if (extension === ".png") {
    await st
      .ref(folder + "/" + fileName + extension)
      .getDownloadURL()
      .catch(() => (extension = "erreur"));
  }
  if (extension === "erreur") {
    console.log("Erreur pas d'image pour :" + fileName);
    return await st.ref("PNP/mandat.jpg").getDownloadURL();
  } else {
    return await st.ref(folder + "/" + fileName + extension).getDownloadURL();
  }
}

export async function getAllURLCached(folder, fileName, extension, extension2) {
  var urls = [];
  var ext = extension;
  let stop = false;
  let i = 1;
  while (!stop && i != 50) {
    var url;
    url = await getURL(folder, fileName + i + ext).catch(function (error) {
      console.log("Erreur dans la recherche du fichier " + fileName + i + ext);
    });
    if (url) {
      urls.push(url);
    } else {
      if (i === 1 && ext === extension) {
        ext = extension2;
      } else {
        stop = true;
      }
    }
    i++;
  }
  await syst.goToCache(urls[0]);
  await syst.goToCache(urls[1]);
  return await urls;
}

export async function getData(collection) {
  return await fr.collection(collection).get();
}

export async function getDataDoc(collection, doc) {
  return await fr.collection(collection).doc(doc).get();
}

export async function supprimerDoc(collection, doc) {
  return await fr.collection(collection).doc(doc).delete();
  console.log("Document supprimer!");
}

export async function getFilesList(folder) {
  return await st.ref().child("PNP").list();
}

export async function getLastUpdateTime(collection) {
  return await fr.collection(collection).doc("***Last Update***").get();
}

export async function updateLastUpdateTime(collection) {
  return await fr
    .collection(collection)
    .doc("***Last Update***")
    .set({
      time: await createTimeStamp(new Date().getTime()),
    });
}

export async function writeInDatabase(collection, doc, data, merge) {
  if (merge) {
    await fr.collection(collection).doc(doc).set(data, { merge: true });
  } else {
    await fr.collection(collection).doc(doc).set(data);
  }
}

export async function createTimeStamp(milliseconds) {
  return await firebase.firestore.Timestamp.fromMillis(milliseconds);
}

export async function addDataInDatabase(collection, data) {
  return await fr.collection(collection).add(data);
}

export async function createDocInDatabase(collection) {
  return await fr.collection(collection).doc();
}

export async function addFileInStorage(blob, path) {
  return new Promise((resolve, reject) => {
    var storageRef = firebase.storage().ref();

    storageRef
      .child(path)
      .put(blob)
      .then((snapshot) => {
        blob.close();

        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function supprimerImage(path) {
  var extension = ".jpg";
  await st
    .ref(path + extension)
    .getDownloadURL()
    .catch(() => (extension = ".png"));
  if (extension === ".png") {
    await st
      .ref(path + extension)
      .getDownloadURL()
      .catch(() => (extension = "erreur"));
  }
  if (extension === "erreur") {
    console.log("Erreur pas d'image pour :" + path);
  } else {
    return await st.ref(path + extension).delete();
    console.log("Fichier supprimé!");
  }
}
//console.log(firebase)

export async function getToken(assos, admin, user) {
  var token = {};
  console.log("debut");

  //problème avec user, quand il y a des users à chercher dans firebase, le code n'attend pas, même avec await
  if (user || assos) {
    token = { users: [] };
  }

  if (user) {
    console.log("Token User");
    var data = await getDataDoc("usersData", user);
    data = data.data();

    if (data.expoNotificationToken) {
      token = { ...token, users: [...token.users, data.expoNotificationToken] };
    }
  }

  console.log("Next");
  if (assos) {
    console.log("Token Assos");
    var data = await getDataDoc("notifications", "users-assos");
    data = data.data();
    assos.forEach((item) => {
      if (data[item]) {
        token = { ...token, users: [...token.users, ...data[item]] };
      }
    });
  }

  console.log("Next");
  if (admin) {
    console.log("Token Admin");
    var data = await getDataDoc("notifications", "admins");
    data = data.data();
    token = { ...token, admins: [] };
    admin.forEach((item) => {
      if (data[item]) {
        token = { ...token, admins: [...token.admins, ...data[item]] };
      }
    });
  }

  console.log("Les token sont : ", token);
  return token;
}

export async function supprimerToken(categories, token) {
  var data = await getDataDoc("notifications", "users-assos");
  data = data.data();
  categories.forEach((item) => {
    if (item.split("-") != item) {
      var list = data[item];
      if (list != undefined && list.indexOf(token) > -1) {
        list.splice(list.indexOf(token), 1);
        data[item] = list;
      }
    }
  });

  await writeInDatabase("notifications", "users-assos", data, true);
}

export async function ajouterToken(categories, token) {
  var data = await getDataDoc("notifications", "users-assos");
  data = data.data();
  categories.forEach((item) => {
    if (item.split("-") != item) {
      var list = data[item];
      if (list === undefined) {
        list = [];
      }
      if (!list.includes(token)) {
        list.push(token);
        data[item] = list;
      }
    }
  });

  await writeInDatabase("notifications", "users-assos", data, true);
}

export default { firebaseConfig };
