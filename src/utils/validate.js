

import { onAuthStateChanged } from "firebase/auth"
import { getCompletedLevels, getTilesLength } from "./utils";
import { trimCategoryLvl } from "./utils";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/userEssentials";

export const isUserUnlockedLevel = async (cat, diff, level) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {

              let unlockedLevels = [];

              let completedLevels = await getCompletedLevels(docSnap, cat);

  
              completedLevels = completedLevels
                  .map((lvl) => {
                      return trimCategoryLvl(diff, lvl);
                  })
                  .filter((lvl) => lvl != undefined || lvl != null);

              unlockedLevels = [...completedLevels]; // we copy all completed

              //if we have no completed levels yet we unlock the 1st level by default
              if (completedLevels.length <= 0) {
                  unlockedLevels.push("1");
              }


              if (completedLevels.length > 0) {
                  let highestLevelCompleted = Math.max(...completedLevels);
              
                  //we need to check first the length of all levels before adding
                  if (
                    highestLevelCompleted < (await getTilesLength(cat, diff))
                  ) {
                    let latestUnlockedLevel = String(
                      parseInt(highestLevelCompleted) + 1
                    );
                    unlockedLevels.push(latestUnlockedLevel); //then append the next level of the highest completed level
                  }
              }


              if (unlockedLevels.includes(level)) {
                  return true;
              } 

              location.href = "levels.html"

          }
      } else {
        
      }
    });
}

export const isExistingLevel = async (cat,diff, level) => {
    let totalLevels = parseInt(await getTilesLength(cat, diff));

    if (level > totalLevels || totalLevels < level) {
        location.href = "levels.html";
    }
}