import AirtablePlus from 'airtable-plus'

const airtable = new AirtablePlus({
  baseID: 'appdPydXlWO2ZAhhV',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'address'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await airtable.create({
      Name: req.body.Name,
      Address1: req.body.Address1,
      Address2: req.body.Address2,
      City: req.body.City,
      State: req.body.State,
      Postal: req.body.Postal,
      Country: req.body.Country
    })
  }
}
