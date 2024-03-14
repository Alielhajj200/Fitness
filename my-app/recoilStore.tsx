// recoilState.js
import { atom } from 'recoil';

// Define an atom to store an array of strings
export const stringArrayState = atom({
  key: 'stringArrayState', // Unique identifier for the state
  default: [], // Initial value is an empty array
});
export const credentials = atom({
  key: 'credentials', // Unique identifier for the state
  default: [], // Initial value is an empty array
});
