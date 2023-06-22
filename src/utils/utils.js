import {
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { db } from "../firebase/userEssentials";
import { Categories } from "./categories";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
export const getChallenge = async (category, level, difficulty) => {
  //we need to validate these!
  if (!level && !category && !difficulty) {
    return null;
  }

  //query from firebase
  const ref = doc(db, `levels/${category}/${difficulty}`, level);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return {};
  }
};

export const getTiles = async (category, difficulty) => {
  if (!category && !difficulty) {
    return null;
  }

  const ref = collection(db, `levels/${category}/${difficulty}`);
  const querySnapshot = await getDocs(ref);
  let tiles = [];
  querySnapshot.forEach((doc) => {
    tiles.push(doc.id);
  });
  return tiles;
};

export const getTilesLength = async (category, difficulty) => {
  if (!category && !difficulty) {
    return null;
  }

  const ref = collection(db, `levels/${category}/${difficulty}`);
  const querySnapshot = await getDocs(ref);
  let tiles = [];
  querySnapshot.forEach((doc) => {
    tiles.push(doc.id);
  });
  return tiles.length;
};

export const getAllTotalLevels = async () => {
  let totalEasy = Object.values(Categories).map(
    async (cat) => await getTilesLength(cat.name, "easy")
  );
  let totalMedium = Object.values(Categories).map(
    async (cat) => await getTilesLength(cat.name, "medium")
  );
  let totalHard = Object.values(Categories).map(
    async (cat) => await getTilesLength(cat.name, "hard")
  );

  let final = [];
  final = Object.values(Categories).map((cat) => {
    return {
      name: cat.name,
      easy: 0,
      medium: 0,
      hard: 0,
    };
  });

  let e = await Promise.all(totalEasy);
  let m = await Promise.all(totalMedium);
  let h = await Promise.all(totalHard);

  for (let i = 0; i < final.length; i++) {
    final[i].easy = e[i];
    final[i].medium = m[i];
    final[i].hard = h[i];
  }

  return final;
};

export const trimWhitespace = (target) => {
  return target.replace(/\s/g, "");
};

export const getPlayerReward = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return 15;
    case "medium":
      return 25;
    case "hard":
      return 40;
    default:
      return 15;
  }
};

export const getLvlString = (difficulty, level) => {
  switch (difficulty) {
    case "easy":
      return `1-${level}`;
    case "medium":
      return `2-${level}`;
    case "hard":
      return `3-${level}`;
    default:
      return `1-${level}`;
  }
};

export const getDifficultyNumberRep = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "1";
    case "medium":
      return "2";
    case "hard":
      return "3";
    default:
      return "1";
  }
};

export const getCompletedLevels = (docSnap, category) => {
  switch (category) {
    case Categories.FLOWCHARTS_PSEUDO.name:
      return docSnap.data().completedLevels1;
    case Categories.BASIC_SYNTAX.name:
      return docSnap.data().completedLevels2;
    case Categories.VARIABLES.name:
      return docSnap.data().completedLevels3;
    case Categories.DATA_TYPES.name:
      return docSnap.data().completedLevels4;
    case Categories.OPERATORS.name:
      return docSnap.data().completedLevels5;
    case Categories.CONDITIONAL_STATEMENTS.name:
      return docSnap.data().completedLevels6;
    case Categories.LOOPS.name:
      return docSnap.data().completedLevels7;
    case Categories.METHODS.name:
      return docSnap.data().completedLevels8;
    case Categories.ARRAYS.name:
      return docSnap.data().completedLevels9;
    case Categories.STRING_MANIPULATION.name:
      return docSnap.data().completedLevels10;
  }
};

export const updateByCategory = async (userRef, level, amount, category) => {
  switch (category) {
    case Categories.FLOWCHARTS_PSEUDO.name:
      await updateDoc(userRef, {
        completedLevels1: arrayUnion(level),
        points: increment(amount),
      });
      return;
    case Categories.BASIC_SYNTAX.name:
      await updateDoc(userRef, {
        completedLevels2: arrayUnion(level),
        points: increment(amount),
      });
      return;
    case Categories.VARIABLES.name:
      await updateDoc(userRef, {
        completedLevels3: arrayUnion(level),
        points: increment(amount),
      });
      return;
    case Categories.DATA_TYPES.name:
      await updateDoc(userRef, {
        completedLevels4: arrayUnion(level),
        points: increment(amount),
      });
      return;
    case Categories.OPERATORS.name:
      await updateDoc(userRef, {
        completedLevels5: arrayUnion(level),
        points: increment(amount),
      });
      return;
    case Categories.CONDITIONAL_STATEMENTS.name:
      await updateDoc(userRef, {
        completedLevels6: arrayUnion(level),
        points: increment(amount),
      });
      return;
    case Categories.LOOPS.name:
      await updateDoc(userRef, {
        completedLevels7: arrayUnion(level),
        points: increment(amount),
      });
      return;
    case Categories.METHODS.name:
      await updateDoc(userRef, {
        completedLevels8: arrayUnion(level),
        points: increment(amount),
      });
      return;
    case Categories.ARRAYS.name:
      await updateDoc(userRef, {
        completedLevels9: arrayUnion(level),
        points: increment(amount),
      });
      return;
    case Categories.STRING_MANIPULATION.name:
      await updateDoc(userRef, {
        completedLevels10: arrayUnion(level),
        points: increment(amount),
      });
      return;
  }
};

export const trimCategoryLvl = (cat, stringLevel) => {
  //must be sure that you have on same difficulty
  let diffInteger = String(stringLevel).split("-")[0];

  if (getDifficultyNumberRep(cat) == diffInteger) {
    return String(stringLevel).split("-")[1];
  }
};

export const filterByDifficulty = (completedLevels) => {
  let easy = [];
  let medium = [];
  let hard = [];
  completedLevels.map((lvl) => {
    let difficultyInteger = lvl.split("-")[0];
    let level = lvl.split("-")[1];
    if (difficultyInteger == "1") {
      easy.push(level);
    } else if (difficultyInteger == "2") {
      medium.push(level);
    } else if (difficultyInteger == "3") {
      hard.push(level);
    }
  });

  return {
    easy: easy.length,
    medium: medium.length,
    hard: hard.length,
  };
};

export const getDifficultyPanel = (levelSelect, tCat, tDiff) => {
  Object.values(levelSelect).map((el) => {
    var diff = el.getAttribute("data-diff");
    var cat = el.getAttribute("data-cat");

    if (tDiff == diff && tCat == cat) {
      el.style.filter = "";
      el.style.borderColor = "gray";
      el.setAttribute("data-disable", "");
    }
  });
};

export const incrementDifficulty = (diff) => {
  if (diff == "easy") {
    return "medium";
  } else if (diff == "medium") {
    return "hard";
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      return true;
    } else {
      location.href = "login.html";
      return false;
    }
  });
};

export const isWhileLoggedIn = () => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      location.href = "profile.html";
      return true;
    } else {
      return false;
    }
  });
};