const userRoutes = (app, fs) => {

    // variables
    const IN_state_data = './data/inda-state-wise.json';
    const TN_district_data = './data/tn-emergency-contact.json';
    const World_Stats_data = './data/world-update.json';

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

    app.get('/all', (req, res) => {
      fs.readFile(World_Stats_data, 'utf8', (err, data) => {
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
              "World Data": "/all",
              "Emergency Contact in tamilnadu": "/emergency",
              "State Wise Data": "/state",
              "Source": "www.mygov.in, www.stopcoronatn.in,www.worldometers.info"
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