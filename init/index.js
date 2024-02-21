const mongoose = require("mongoose");
let { data } = require("./data.js");
const Listing = require("../models/litening.js");

main()
  .then(() => console.log(`Database is connected successfully`))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust");
}
// 65ce151c4f6ee144f68223f0
// Listing.insertMany(data)
//   .then(() => console.log("data is saved"))
//   .catch((err) => console.log(err));

const initDb = async () => {
  await Listing.deleteMany({});
  data = data.map((obj) => ({ ...obj, owner: "65ce151c4f6ee144f68223f0" }));
  await Listing.insertMany(data);
  console.log("data is saved");
};

initDb();
