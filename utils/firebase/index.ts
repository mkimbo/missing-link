import * as firebaseAdmin from "firebase-admin";
//import { TUserDevice } from "../../pages/api/report/missing";

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from "../../config/AdminSA.json";
import { TUserDevice } from "../../models/missing_person.model";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      serviceAccount as firebaseAdmin.ServiceAccount
    ),
  });
}
//export const geofire = require("geofire-common");
export const serverDB = firebaseAdmin.firestore();

export const getUser = async (id: string) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log("error fetching user", error);
  }
};

// export const uploadFileToCloud = async (file: File) => {
//   try {
//     const fileName = `${Date.now()}-${file.name}`;
//     const storageRef = ref(storage, "files/" + fileName);
//     const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);
//     const downloadUrl = await getDownloadURL(uploadTaskSnapshot.ref);
//     return downloadUrl;
//   } catch (error) {
//     console.log("error uploading to storage", error);
//   }
// };

/* export const onVerifyCode = async (enteredCode: string) => {
  let success = false;
  window.confirmationResult
    .confirm(enteredCode)
    .then((result) => {
      console.log(result, "success");
      addPhoneNumber({ verified: true }).then((result) => true);
      //console.log(result, "success");
      // ...
    })
    .catch((error) => false);
  return success;
}; */
