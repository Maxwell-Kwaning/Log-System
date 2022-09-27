import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  onSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { database, storage } from "../config/firebaseConfig";

const organizationsCollectionName = "organizations";

const organizationsCollectionRef = collection(
  database,
  organizationsCollectionName
);

// ==================================
// organizations
// ==================================

const getDocuments = (query) => {
  return getDocs(query)
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    .catch((error) => error);
};

export const getAllOrganizations = () => {
  return getDocuments(organizationsCollectionRef);
};

export const addOrganization = (newOrganization) => {
  return addDoc(organizationsCollectionRef, newOrganization);
};

export const getOrganizationDetails = (id) => {
  const documentRef = doc(database, organizationsCollectionName, id);
  return getDoc(documentRef);
};

export const getOrganizationDetailsInRealTime = (id, callback) => {
  const documentRef = doc(database, organizationsCollectionName, id);
  return onSnapshot(documentRef, callback);
};

export const updateAccountDetails = (documentId, accountDetails) => {
  const documentRef = doc(database, organizationsCollectionName, documentId);
  return updateDoc(documentRef, { accountDetails });
};

export const addNewUser = (documentId, newUser) => {
  const documentRef = doc(database, organizationsCollectionName, documentId);
  return updateDoc(documentRef, {
    users: arrayUnion(newUser),
  });
};

export const accountLoginRequest = (email, password) => {
  const loginQuery = query(
    organizationsCollectionRef,
    where("accountDetails.email", "==", email),
    where("accountDetails.password", "==", password),
    limit(1)
  );

  return getDocuments(loginQuery);
};

// ==================================
// logs
// ==================================
const logsCollectionName = "logs";
const logsCollectionRef = collection(database, logsCollectionName);

export const getAllLogs = (documentId) => {
  const logsQuery = query(
    logsCollectionRef,
    where("documentId", "==", documentId)
  );

  return getDocuments(logsQuery);
};

export const getAllLogsInRealTime = (organizationId, callback) => {
  const logsQuery = query(
    logsCollectionRef,
    where("organizationId", "==", organizationId)
  );
  return onSnapshot(logsQuery, callback);
};

export const getLogDetails = (id) => {
  const documentRef = doc(database, logsCollectionName, id);
  return getDoc(documentRef);
};

export const getLogDetailsInRealTime = (id, callback) => {
  const documentRef = doc(database, logsCollectionName, id);
  return onSnapshot(documentRef, callback);
};

export const addNewUserLog = (documentId, userDetails) => {
  const documentRef = doc(database, logsCollectionName, documentId);
  return updateDoc(documentRef, {
    loggedUsers: arrayUnion(userDetails),
  });
};

export const createNewLogSheet = (newLogSheet) => {
  return addDoc(logsCollectionRef, newLogSheet);
};

export const deleteLog = (documentId) => {
  const documentRef = doc(database, logsCollectionName, documentId);
  return deleteDoc(documentRef);
};

export const updateLogStatus = (documentId, status) => {
  const documentRef = doc(database, logsCollectionName, documentId);
  return updateDoc(documentRef, { status });
};

// ==================================
// users
// ==================================
const usersCollectionName = "users";
const usersCollectionRef = collection(database, usersCollectionName);

export const getAllUsers = (organizationId) => {
  const usersQuery = query(
    usersCollectionRef,
    where("organizationId", "==", organizationId)
  );

  return getDocuments(usersQuery);
};

export const getAllUsersInRealTime = (organizationId, callback) => {
  const usersQuery = query(
    usersCollectionRef,
    where("organizationId", "==", organizationId)
  );
  return onSnapshot(usersQuery, callback);
};

export const getUserDetails = (logId) => {
  const getUserQuery = query(
    usersCollectionRef,
    where("id", "==", logId),
    limit(1)
  );

  return getDocuments(getUserQuery);
};

export const createNewUser = (newUser) => {
  return addDoc(usersCollectionRef, newUser);
};

export const uploadImage = (folderName, file) => {
  const storageRef = ref(storage, `${folderName}/${file.name}`);
  return uploadBytes(storageRef, file);
};

export const deleteUser = (documentId) => {
  const documentRef = doc(database, usersCollectionName, documentId);
  return deleteDoc(documentRef);
};

export const userLogRequest = (organizationId, email, pin) => {
  const logQuery = query(
    usersCollectionRef,
    where("organizationId", "==", organizationId),
    where("email", "==", email),
    where("pin", "==", pin),
    limit(1)
  );

  return getDocuments(logQuery);
};
