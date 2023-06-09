import { FirebaseApp, FirebaseOptions, getApp } from "@firebase/app";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { clientConfig } from "../config/client-config";
import { nanoid } from "nanoid";
const getFirebaseApp = async (options: FirebaseOptions) => {
  const { getApp, getApps, initializeApp } = await import("firebase/app");

  return (!getApps().length ? initializeApp(options) : getApp()) as FirebaseApp;
};

const getAuth = async (options: FirebaseOptions) => {
  const app = await getFirebaseApp(options);
  const { getAuth } = await import("firebase/auth");

  return getAuth(app);
};

const getFirestore = async (options: FirebaseOptions) => {
  const app = await getFirebaseApp(options);
  const { getFirestore } = await import("firebase/firestore");

  return getFirestore(app);
};

export const useFirebaseAuth = (options: FirebaseOptions) => {
  const getFirebaseAuth = async () => {
    return getAuth(options);
  };

  return { getFirebaseAuth };
};

export const useFirebaseDb = (options: FirebaseOptions) => {
  const getFirebaseDb = async () => {
    return getFirestore(options);
  };

  return { getFirebaseDb };
};

export const getStorage = async (options: FirebaseOptions) => {
  const app = await getFirebaseApp(options);
  const { getStorage } = await import("firebase/storage");

  return getStorage(app);
};

export const uploadFileToCloud = async (file: any) => {
  try {
    const id = nanoid();
    const storage = await getStorage(clientConfig);
    const fileName = `${Date.now()}-${id}`;
    const storageRef = ref(storage, "files/" + fileName);
    const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);
    const downloadUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.log("error uploading to storage", error);
  }
};
