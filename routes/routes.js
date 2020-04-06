const stateUpdate = require('../state-data');
const userRoutes = (app, fs) => {

    // variables
    const IN_state_data = './data/inda-state-wise.json';
    const TN_district_data = './data/tn-emergency-contact.json';

    app.get('/state', (req, res) => {


        fs.readFile(IN_state_data, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    app.get('/emergency', (req, res) => {
        fs.readFile(TN_district_data, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });


    app.get('/', (req, res) => {
        res.json({
          message: 'COVID-19 API - 👋🌎🌍🌏',
          author: 'Naveen Kumar',
          entries: [
            {
              "Emergency Contact": "/emergency",
              "State Wise Data": "/state",
            }
          ],
          contact_Me: [
            {
              "FaceBook"  : "https://www.facebook.com/iamnaveenofficial",
              "instagram" : "https://www.instagram.com/iamnaveenoff/",
              "Email"     : "naveencreater106@gmail.com"
            }
        ]  
        });
      });

};

module.exports = userRoutes;