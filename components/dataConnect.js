import { db } from "../firebase.config";
import { ref, onValue, update } from "firebase/database";

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

export const updateCalendarData = async (weekNumber, dayIndex, updatedData) => {
  try {
    console.log("Update Parameters:", {
      weekNumber,
      dayIndex,
      updatedData,
      fullPath: `year/${weekNumber}/${dayIndex}`,
    });

    const dbRef = ref(db, `year/${weekNumber}/${dayIndex}`);
    await update(dbRef, updatedData); // Now update is defined
    return updatedData;
  } catch (error) {
    console.error("Detailed Firebase Update Error:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    throw error;
  }
};

export const getTaoData = async () => {
  const dbRef = ref(db, "Wisdom/tao"); // Replace with your data path
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
