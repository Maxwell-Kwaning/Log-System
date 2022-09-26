import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  query,
  Query,
  orderBy,
  onSnapshot,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { database, storage } from "../config/firebaseConfig";

const organizationsCollectionName = "organizations";

const organizationsCollectionRef = collection(
  database,
  organizationsCollectionName
);

// queries

// const reactComponentsQuery = query(collectionRef, where('tag', '==', 'react'), orderBy('date', 'desc'));
// const angularComponentsQuery = query(collectionRef, where('tag', '==', 'angular'), orderBy('date', 'desc'));
// const bootstrapComponentsQuery = query(collectionRef, where('tag', '==', 'bootstrap'), orderBy('date', 'desc'));

// const getCategoryQuery = (category: string): Query<DocumentData> => {
//   return query(
//     collectionRef,
//     where("category", "==", category),
//     orderBy("date", "desc")
//   );
// };

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

export const addNewLogSheet = (documentId, newLogSheet) => {
  const documentRef = doc(database, organizationsCollectionName, documentId);
  return updateDoc(documentRef, {
    logs: arrayUnion(newLogSheet),
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

// export const getAllCategories = () => {
//   return getDocuments(categoriesCollectionRef);
// };

function uploadComponentImage(file) {
  if (!file) {
    alert("Please choose a file first!");
  }

  const storageRef = ref(storage, `/images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // update progress
      //  setPercent(percent);
    },
    (err) => console.log(err),
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
      });
    }
  );
}

// export const deleteQuiz = (documentId: string): Promise<IFBResponse> => {
//   const documentRef = doc(database, collectionName, documentId);
//   return deleteDoc(documentRef)
//     .then(() => {
//       return { success: true, data: { message: actionMessages.quizDeleted } };
//     })
//     .catch(() => {
//       return {
//         success: false,
//         data: { message: actionMessages.couldNotPublishQuiz },
//       };
//     });
// };

// export const getAllReactComponents = () => {
// 	return getDocuments(reactComponentsQuery);
// };

// export const getAllAngularComponents = () => {
// 	return getDocuments(angularComponentsQuery);
// };

// export const getAllBootstrapComponents = () => {
// 	return getDocuments(bootstrapComponentsQuery);
// };

// export const getAllComponentsInCategory = (category: string) => {
//   return getDocuments(getCategoryQuery(category));
// };

// export const updatedDownloads = (documentId: string, downloads: number) => {
// 	const documentRef = doc(database, collectionName, documentId);
// 	return updateDoc(documentRef, { downloads });
// };

// export const updatedViews = (documentId: string, views: number) => {
// 	const documentRef = doc(database, collectionName, documentId);
// 	return updateDoc(documentRef, { views });
// };

// export const updatedLikes = (documentId: string, likes: number) => {
// 	const documentRef = doc(database, collectionName, documentId);
// 	return updateDoc(documentRef, { likes });
// };
