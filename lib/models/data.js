//write the model for named otcData which will have one field "data" and can store another object.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otcDataSchema = new Schema({
  to: String,
  sid: String,
  c_id: String,
  from: String,
  price: Number,
  record: Boolean,
  status: String,
  call_id: String,
  inbound: Boolean,
  summary: String,
  analysis: {
    symbol: String,
    quantity: Number,
    exchange_platform: String
  },
  batch_id: String,
  metadata: Schema.Types.Mixed,
  completed: Boolean,
  variables: Schema.Types.Mixed,
  created_at: Date,
  pathway_id: String,
  started_at: Date,
  answered_by: String,
  call_length: Number,
  transcripts: [
    {
      id: Number,
      text: String,
      user: String,
      created_at: Date
    }
  ],
  max_duration: Number,
  pathway_logs: Schema.Types.Mixed,
  pathway_tags: [String],
  queue_status: String,
  call_ended_by: String,
  error_message: String,
  local_dialing: Boolean,
  recording_url: String,
  transferred_to: String,
  analysis_schema: {
    symbol: String,
    quantity: String,
    exchange_platform: String
  },
  citation_schema_id: String,
  twilio_account_sid: String,
  is_proxy_agent_call: Boolean,
  warm_transfer_calls: Schema.Types.Mixed,
  recording_expiration: String,
  concatenated_transcript: String
}, { timestamps: true });



const otcData = mongoose.models?.otcData || mongoose.model('otcData', otcDataSchema);
export default otcData;
