const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const host = "http://www.stopcoronatn.in/whomtocontact.html";


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

const emergencyContactTN = async () => {

    try {
     const html = await fetchPage(host, 6);
   
     const $ = cheerio.load(html);
   
     const tnEmergencyContact = $('body > div.container-fluid.mt-20.cont > div > div > div > table > tbody > tr').map( async (index, element) => {
    
        const tds = $(element).find("td");
    
        const id = $(tds[0]).text();
        const district_name = $(tds[1]).text();
        const emergency_number = $(tds[2]).text();
        const landline_number = $(tds[3]).text();
      
      return {
        id,
       district_name,
       emergency_number,
       landline_number
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

   emergencyContactTN()
  .then(results => {
   console.log("number of results: "+results.length);
   exportResults(results, "data/tn-emergency-contact.json");
  }).catch(err => {
   console.log("Error while fetching top rated movies with error :::: "+err);
  })

  
module.exports = emergencyContactTN;