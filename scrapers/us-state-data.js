const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const host = "https://www.worldometers.info/coronavirus/country/us/";


const fetchPage = async (url, n) => {
    try {
        const result = await axios.get(url);
  return result.data;
    } catch(err) {
        if (n === 0) throw err;

        console.log("fetchPage(): Waiting For 3 seconds before retrying the request.")
  await waitFor(3000);
        console.log(`Request Retry Attempt Number: ${7 - n} ====> URL: ${url}`)
        return await fetchPage(url, n - 1);
    }
};

const covid19StateWiseUpdate = async () => {

    try {
     const html = await fetchPage(host, 6);
   
     const $ = cheerio.load(html);
   
     const tnEmergencyContact = $('#usa_table_countries_today > tbody > tr').map( async (index, element) => {
    
        const stnm = $(element).find("div.field.field-name-field-select-state.field-type-list-text.field-label-above > div.field-items > div");
        const confirmed = $(element).find("div.field.field-name-field-total-confirmed-indians.field-type-number-integer.field-label-above > div.field-items > div");
        const cured = $(element).find("div.field.field-name-field-cured.field-type-number-integer.field-label-above > div.field-items > div");
        const death = $(element).find("div.field.field-name-field-deaths.field-type-number-integer.field-label-above > div.field-items > div");

        const statename = $(stnm).text();
        const total_confirmed = $(confirmed).text();
        const total_discharged = $(cured).text();
        const total_death = $(death).text();
        
      
      return {
        statename,
        total_confirmed,
        total_discharged,
        total_death
      }
     }).get();
    
     return Promise.all(tnEmergencyContact);
    } catch (error) {
     throw error;
    }
   }
   const exportResults = (results, outputFile) => {

    try {
     fs.writeFile(outputFile, JSON.stringify(results, null, 4), (err) => {
      if (err) {
        console.log(err);
      }
      console.log('\n' + results.length + ' Results exported successfully to '+ outputFile);
       })
    } catch (error) {
     throw error;
    }
   
   }
   const interval = setInterval(function() {
    covid19StateWiseUpdate()
    .then(results => {
     console.log("number of results: "+results.length);
     exportResults(results, "data/inda-state-wise.json");
    }).catch(err => {
     console.log("Error while fetching top data with error :::: "+err);
    })
    
  }, 600000);
  

  
module.exports = covid19StateWiseUpdate;