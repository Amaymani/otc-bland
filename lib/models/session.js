const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  call_id: {
    type: String,
    required: true
  },
    s_id: {
        type: String,
        required: true
    },

}, {
  timestamps: true 
});




const sessionToken = mongoose.models?.sessionToken || mongoose.model('sessionToken', sessionSchema);
export default sessionToken;
