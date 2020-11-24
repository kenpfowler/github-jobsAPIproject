const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(
      "1ov1ECWo4N__lMz3mINGZGLLr5_ZkPxy6VQKMF9aGACU"
    );
  }
  async load() {
    await this.doc.useServiceAccountAuth(require("./credentials.json"));
    await this.doc.loadInfo(); // loads document properties and worksheets
  }
  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0];
    // append rows
    await sheet.addRows(rows);
  }
}

// test funntion for our class:
// (async function () {
//   const sheet = new Sheet();
//   await sheet.load();
//   await sheet.addRows([
//     { Name: "Kyle Broflovski", Location: "Colorado" },
//     { Name: "Stan Marsh", Location: "Colorado" },
//   ]);
// })();
