import { createSlice } from "@reduxjs/toolkit";
// import { apiRequest } from "./api";
import getValues from "./calculations";
import axios from "axios";

export const statSlice = createSlice({
  name: "stats",
  initialState: {
    value: {},
    calculations: [],
    number: null,
  },
  reducers: {
    apiSucceeded: (stats, action) => {
      stats.value = action.payload;
    },
    apiFailed: (stats, action) => {
      // maybe store error in the future
    },
    DataCalculated: (stats, action) => {
      stats.calculations = action.payload;
    },
    // numberUpdated: (stats, action) => {
    //   stats.number = action.payload;
    // },
  },
});

export const {
  apiSucceeded,
  apiFailed,
  DataCalculated,
  // numberUpdated,
} = statSlice.actions;

export const handleHydrateDashboard = () => async dispatch => {
  const { data } = await axios.get("http://localhost:9020/api/stats");
  dispatch(apiSucceeded(data));
  const calculateFormulas = () => {
    let arr = [];
    for (let [key, value] of Object.entries(data)) {
      arr.push(getValues(key, value));
    }
    dispatch(DataCalculated(arr));
  };
  calculateFormulas();
};

// export const handleHydrateDashboardNumber = number => dispatch => {
//   const calculateFormulas = number => state => {
//     let arr = [];
//     for (let [key, value] of Object.entries(state.stats.value)) {
//       arr.push(getValues(key, value, number));
//     }
//     dispatch(DataCalculated(arr));
//   };
//   calculateFormulas(number);
// };

// [{ title: "data1234", data: [1, 2, 3, 4], data2: [3, 4, 5, 6] }, {}]

export const selectStats = state => {
  console.log(`state:  `, state);
  return state.stats.calculations;
};

export default statSlice.reducer;
