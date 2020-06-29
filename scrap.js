const cheerio = require("cheerio");
const axios = require("axios");
const siteUrl = "https://remoteok.io/";
let siteName = "";
const categories = new Set();
const tags = new Set();
const locations = new Set();
const positions = new Set();