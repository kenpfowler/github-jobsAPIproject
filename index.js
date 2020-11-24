const Sheet = require("./sheet");
const fetch = require("node-fetch");

async function scrapePage(counter) {
  //fetch jobs from github using the public API
  let res = await fetch(
    `https://jobs.github.com/positions.json?description=remote&page=${counter}`
  );
  //convert to json format
  const json = await res.json();
//map the json responses onto our preferred data structure
  const rows = json.map((job) => {
    return {
      company: job.company,
      location: job.location,
      url: job.url,
      type: job.type,
      title: job.title,
      date: job.created_at,
    };
  });
  //return the new array
  return rows;
}

(async function () {
  let counter = 1;
  let rowsArray = [];
//loop through the jobs page by page and accumulate them all in a new array.
  while (true) {
    let rows = await scrapePage(counter);
    if (rows.length === 0) break;
    rowsArray = rowsArray.concat(rows);
    counter++;
  }
  
//create a new sheet and load the rows
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(rowsArray);
  // rows.sort(); want a function that sorts the objects in row by date (Stardting with most recent)
  // Also want a function that filters the results further - lets look for jobs that are suitable for new engineers
})();
