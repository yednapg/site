import AirtablePlus from 'airtable-plus'

const airtable = new AirtablePlus({
  baseID: 'appdPydXlWO2ZAhhV',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'hackers'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await airtable.create({
      username: req.body.Username,
      email: req.body.Email,
    })
  }
}
