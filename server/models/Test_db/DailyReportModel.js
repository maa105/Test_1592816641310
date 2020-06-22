import DailyReportModelGenerated from "./generated/DailyReportModelGenerated";

const customModel = {
  
  /**
   * Customize here your schema with custom attributes
   * 
   * EXAMPLE:
    
    init() {
      let schema = DailyReportModelGenerated.init();
  
      schema.add({
        extraCustomField: Object
      });
    },
     
   */


  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await DailyReportModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...DailyReportModelGenerated,
  ...customModel
};
