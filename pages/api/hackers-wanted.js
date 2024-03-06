var Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appdPydXlWO2ZAhhV'
)

export default async function handler(req, res) {
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
            await base('hackers').update(
              [
                {
                  id: findId.id,
                  fields: {
                    id: req.body.Id,
                    username: req.body.Username,
                    email: req.body.Email
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
          } else {
            await base('hackers').create(
              [
                {
                  fields: {
                    id: req.body.Id,
                    username: req.body.Username,
                    email: req.body.Email
                  }
                }
              ],
              function (err, records) {
                if (err) {
                  console.error('hi' + err)
                  return
                }
              }
            )
          }
          if (err) {
            console.error(err)
            return
          }
        }
      )
  }
}
