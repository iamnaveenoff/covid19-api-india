const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const host = "https://www.worldometers.info/coronavirus";


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
     let listOfCountry = [];
     const rowOfCountry = $("table#main_table_countries_today tbody tr");
     rowOfCountry.each(function() {
       let country = $(this)
         .find("td")
         .eq(0)
         .text();
       let totalCases = $(this)
         .find("td")
         .eq(1)
         .text();
       let newCases = $(this)
         .find("td")
         .eq(2)
         .text();
 
       let totalDeaths = $(this)
         .find("td")
         .eq(3)
         .text();
 
       let newDeaths = $(this)
         .find("td")
         .eq(4)
         .text();
 
       let totalRecovered = $(this)
         .find("td")
         .eq(5)
         .text();
       let activeCases = $(this)
         .find("td")
         .eq(6)
         .text();
       let seriousCritical = $(this)
         .find("td")
         .eq(7)
         .text();
       let firstCaseAt = $(this)
         .find("td")
         .eq(10)
         .text();
 
       response = {
         country,
         totalCases,
         newCases,
         totalDeaths,
         newDeaths,
         totalRecovered,
         activeCases,
         seriousCritical,
         firstCaseAt
       };
       listOfCountry.push(response);
       
     });


     return Promise.all(listOfCountry);
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
     exportResults(results, "data/world-update.json");
    }).catch(err => {
     console.log("Error while fetching data with error :::: "+err);
    })
    
 }, 600000);
  

  
module.exports = covid19StateWiseUpdate;