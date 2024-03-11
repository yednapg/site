var Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appdPydXlWO2ZAhhV'
)

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const ids = []

      await base('hackers')
        .select({
          maxRecords: 100,
          view: 'Grid view'
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(function (record) {
              ids.push({ github: record.get('id'), id: record.id })
            })
            fetchNextPage()
          },
          async function done(err) {
            console.log(ids)
            let findId = ids.find(x => x.github === req.body.Id)
            if (findId) {
              await base('hackers').update([
                {
                  id: findId.id,
                  fields: {
                    id: req.body.Id,
                    username: req.body.Username,
                    email: req.body.Email
                  }
                }
              ])
            } else {
              await base('hackers').create([
                {
                  fields: {
                    id: req.body.Id,
                    username: req.body.Username,
                    email: req.body.Email
                  }
                }
              ])
            }
            res.status(200).json({ message: 'Data updated successfully' })
          }
        )
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
