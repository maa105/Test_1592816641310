// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function DailyReportListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_DAILYREPORT_SUCCESS:
      return { ...state, dailyreport: action.payload };
    case types.LIST_DAILYREPORT_SUCCESS:
      return { ...state, listDailyReport: action.payload };
    case types.LIST_DAILYREPORT_SUCCESS:
      return { ...state, listDailyReport: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}