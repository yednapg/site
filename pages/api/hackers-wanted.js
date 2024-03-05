var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appdPydXlWO2ZAhhV');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await base('hackers').create([
      {
        "fields": {
          "username": req.body.Username,
          "email": req.body.Email,
        }
      },
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
}