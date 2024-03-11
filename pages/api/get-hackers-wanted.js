var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appdPydXlWO2ZAhhV');

export async function fetchUsernames() {
    return new Promise(function(resolve, reject) {
        var usernames = [];
        base('hackers').select({
            maxRecords: 100,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                usernames.push(record.get('username'));
            });
            fetchNextPage()
        }, function done(err) {
            if (err) {
                reject(err);
            } else {
                resolve(usernames); 
            }
        }
        );
    });
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const usernames = await fetchUsernames();
            res.json(usernames);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}