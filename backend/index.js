const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const reports = require("./routes/reports");

const app = express();

app.arguments(express.json());
app.arguments(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started at port " + port);
});

app.use("/reports", reports);

async function populateAuthorities() {
  await db.authority.createMany({
    data: [
      {
        name: "Police",
      },
      {
        name: "Crime Investigation Department",
      },
      {
        name: "National Investigation Agency",
      },
      {
        name: "Anti Terrorism Squad",
      },
      {
        name: "Intelligence Bureau",
      },
      {
        name: "Research and Analysis Wing",
      },
      {
        name: "National Commission for Protection of Child Rights",
      },
      {
        name: "Special Juvenile Police Unit",
      },
      {
        name: "Directorate of Revenue Intelligence",
      },
      {
        name: "Customs Department",
      },
      {
        name: "Border Security Force",
      },
      {
        name: "Narcotics Control Bureau",
      },
      {
        name: "Central Bureau of Investigation",
      },
      {
        name: "Regional Transport Office",
      },
      {
        name: "Cyber Crime Cell",
      },
      {
        name: "Indian Computer Emergenccy Response Team",
      },
      {
        name: "Reserve Bank of India",
      },
      {
        name: "Anti Corruption Bureau",
      },
      {
        name: "Central Vigilance Commission",
      },
      {
        name: "Enforcement Directorate",
      },
      {
        name: "Financial Intelligence Unit",
      },
      {
        name: "Corporate Affairs Ministry",
      },
      {
        name: "National Commission for Minorities",
      },
      {
        name: "National Human Rights Commission",
      },
      {
        name: "National Commission for Scheduled Castes/Tribes",
      },
      {
        name: "Municipality",
      },
      {
        name: "Animal Welfare Board of India",
      },
      {
        name: "Central Pollution Control Board",
      },
      {
        name: "Natinal Green Tribunal",
      },
      {
        name: "Traffic Police",
      },
      {
        name: "Wildlife Crime Control Bureau",
      },
      {
        name: "Forest Department",
      },
    ],
  });
  console.log("added");
}

populateAuthorities();
