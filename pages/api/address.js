var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appdPydXlWO2ZAhhV');

export default async function handler(req, res) {
  try {
    await base('address').create([
      {
        "fields": {
          "Name": req.body.Name,
          "Address1":req.body.Address1,
          "Address2":req.body.Address2,
          "City":req.body.City,
          "State":req.body.State,
          "Postal":req.body.Postal,
          "Country":req.body.Country
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.status(200).json({ message: 'Data added successfully' });
  } catch(err) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add data to Airtable' });
  }
}