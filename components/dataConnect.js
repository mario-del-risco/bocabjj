// dataConnect.js
import { db } from "../firebase.config";
import { ref, onValue } from "firebase/database";

export const getCalendarData = async () => {
  const dbRef = ref(db, "year"); // Replace with your data path
  return new Promise((resolve, reject) => {
    onValue(
      dbRef,
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        reject(error);
      }
    );
  });
};
