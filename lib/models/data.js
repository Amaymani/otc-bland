//write the model for named otcData which will have one field "data" and can store another object.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otcDataSchema = new Schema({
  data: {
    type: Object,
    required: true
  }
}, {
  timestamps: true 
});




const otcData = mongoose.models?.otcData || mongoose.model('otcData', otcDataSchema);
export default otcData;
