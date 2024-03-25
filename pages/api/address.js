var Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appK53aN0fz3sgJ4w'
)

export default async function handler(req, res) {
  try {
    await base('Poster Requests').create(
      [
        {
          fields: {
            'First Name': req.body.FirstName,
            'Last Name': req.body.lastName,
            'Address (Line 1)': req.body.Address1,
            'Address (Line 2)': req.body.Address2,
            City: req.body.City,
            'State / Province': req.body.State,
            'ZIP / Postal Code': req.body.Postal,
            Country: req.body.Country,
            Type: "I'm a teenager!",
            'Send To Warehouse': false,
            'Request Type': ['Hackers Wanted booklet']
          }
        }
      ],
      function (err, records) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

    res.status(200).json({ message: 'Data added successfully' })
  } catch (err) {
    console.error(error)
    res.status(500).json({ message: 'Failed to add data to Airtable' })
  }
}