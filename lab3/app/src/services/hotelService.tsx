import { Hotel } from "../data";
import {
  addDoc,
  collection,
  //   query,
  //   where,
  serverTimestamp,
  //   getDocs,
  //   doc,
  //   updateDoc,
  //   deleteDoc,
} from "firebase/firestore";

import { firestore } from "../fbconfig";

export const createHotel = async (hotel: Hotel) => {
  await addDoc(collection(firestore, "hotels"), {
    ...hotel,
    createdAt: serverTimestamp(),
  });
};

// export const updateHotel = async (id: string, hotel: Hotel) => {
//   await updateDoc(doc(firestore, "hotels", id), hotel);
// };
