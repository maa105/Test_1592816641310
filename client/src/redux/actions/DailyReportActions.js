import actionsFunction from "./generated/DailyReportActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import DailyReportApi from "../../api/DailyReportApi";
 
 actionsFunction.loadDailyReportList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return DailyReportApi
     .getDailyReportList()
     .then(list => {
       dispatch(actionsFunction.loadDailyReportSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
