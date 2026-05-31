import fs from "fs";
import csv from "csv-parser";
import { db } from "../firebase.js";

export function importCSV(path) {
  fs.createReadStream(path)
    .pipe(csv())
    .on("data", row => {
      db.collection("incidents").add(row);
    })
    .on("end", () => {
      console.log("CSV imported");
    });
}
