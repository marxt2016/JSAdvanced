const moment = require('moment');
const fs = require('fs');


const loggerPath = './server/db/stats.json';
const logger = (name, action) => {
    fs.readFile(loggerPath, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
            console.log(err);
        } else {
            const stat = JSON.parse(data);
            stat.push({
                time: moment().format('DD MMM YYYY, h:mm:ss a'),
                prod_name: name,
                action: action,
            });
            fs.writeFile(loggerPath, JSON.stringify(stat, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}
module.exports = logger;