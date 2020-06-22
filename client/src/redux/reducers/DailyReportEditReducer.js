// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  dailyreport: {}
};

// Reducer
export default function DailyReportEditReducer(state = initialState, action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_DAILYREPORT_SUCCESS:
      return { ...state, dailyreport: action.payload };
    case types.UPDATE_DAILYREPORT_SUCCESS:
      return { ...state, dailyreport: action.payload };
    case types.GET_DAILYREPORT_SUCCESS:
      return { ...state, dailyreport: action.payload };
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}