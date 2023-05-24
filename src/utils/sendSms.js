const accountSid = 'AC57eb5f4ac2cc994909ae52bee1cdfc24';
const authToken = 'b05375515d6fe8d4816062486afb6f26';
const client = require('twilio')(accountSid, authToken);

module.exports = {
    client
  };
