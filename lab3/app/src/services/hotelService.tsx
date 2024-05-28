import { Hotel } from "../data";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  query,
  where,
  serverTimestamp,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import { firestore } from "../fbconfig";

export const getHotels = async () => {
  const hotels: Hotel[] = [];
  const hotelsCollection = collection(firestore, "hotels");
  const q = query(hotelsCollection);
  const results = await getDocs(q);

  results.forEach((doc) => {
    hotels.push({ id: doc.id, ...(doc.data() as Omit<Hotel, "id">) });
  });

  return hotels;
};

export const getMyHotels = async (user: User) => {
  const hotels: Hotel[] = [];
  const hotelsCollection = collection(firestore, "hotels");
  if (!user) return hotels;
  const q = query(hotelsCollection, where("userId", "==", user.uid));
  const results = await getDocs(q);

  results.forEach((doc) => {
    hotels.push({ id: doc.id, ...(doc.data() as Omit<Hotel, "id">) });
  });

  console.log(hotels);

  return hotels;
};

export const getHotel = async (id: string) => {
  const hotelDocRef = doc(firestore, "hotels", id);
  const hotelDoc = await getDoc(hotelDocRef);

  console.log(hotelDoc.data());

  if (hotelDoc.exists()) {
    return { id: hotelDoc.id, ...(hotelDoc.data() as Omit<Hotel, "id">) };
  } else {
    console.log("No such document!");
  }
};

export const createHotel = async (hotel: Omit<Hotel, "id">, user: User) => {
  const elo = await addDoc(collection(firestore, "hotels"), {
    ...hotel,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
  console.log("elo");
  console.log("Document written with ID: ", elo.id);
};

export const updateHotel = async (id: string, hotel: Hotel) => {
  console.log(hotel);
  console.log(id);
  const test = await updateDoc(doc(firestore, "hotels", id), { ...hotel });
  console.log("Document updated with ID: ", test);
};

export const deleteHotel = async (id: string) => {
  const test = await deleteDoc(doc(firestore, "hotels", id));
  console.log("Document deleted with ID: ", test);
};
