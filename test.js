// const request = require("request-promise");
// const cheerio = require("cheerio");

// async function main() {
//   const result = await request.get("https://google.com/covid19-map/");
//   const $ = cheerio.load(result);
//   $(
//     "#yDmH0d > c-wiz > div > div.yQOtse > div > div.mQTbyb > div.l7w6lf > div > div > div > div > div > div.I5Zqqd > table > tbody > tr"
//   ).each((index, element) => {
//     console.log($($(element).find("td")[1]).text());
//   });
// }

// main();

const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://www.worldometers.info/coronavirus/country/us/';

async function main() {
    const result = await request.get(url);
    const $ = cheerio.load(result);

    var rows = [];
    $("#usa_table_countries_today > tbody > tr").each((index, element) => {
        var state = ($($(element).find('td')[0]).text());
        state = state.replace(/\s+/g, '');

        // Total Cases
        var totalCases = ($($(element).find('td')[1]).text());
        totalCases = totalCases.replace(/\s+/g, '');

        // New Cases
        var newCases = ($($(element).find('td')[2]).text());
        newCases = newCases.replace(/\s+/g, '');

        // Total Deaths
        var totalDeaths = ($($(element).find('td')[3]).text());
        totalDeaths = totalDeaths.replace(/\s+/g, '');

        // New Deaths
        var newDeaths = ($($(element).find('td')[4]).text());
        newDeaths = newDeaths.replace(/\s+/g, '');

        // Total Recovered
        var totalRecovered = ($($(element).find('td')[5]).text());
        totalRecovered = totalRecovered.replace(/\s+/g, '');

        // Active Cases
        var activeCases = ($($(element).find('td')[6]).text());
        activeCases = activeCases.replace(/\s+/g, '');

        // Push to row
        rows.push({
            state: state,
            totalCases: totalCases,
            newCases: newCases,
            totalDeaths: totalDeaths,
            newDeaths: newDeaths,
            totalRecovered: totalRecovered,
            activeCases: activeCases
        })
    });
    console.log(rows);
};

main();