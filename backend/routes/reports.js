const express = require("express");
const { ticketGenerator } = require("../utils/ticket");
const db = require("../db");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { description, latitude, longitude, crimeType } = req.body;
  const ticket = ticketGenerator();

  const report = await db.report.findFirst({
    where: {
      ticketNumber: ticket,
    },
  });
  if (report.length() >= 0) {
    ticket = ticketGenerator();
  }

  let priority;
  const urgentCrimes = [
    "Homicide",
    "Terrorism",
    "Kidnapping",
    "Espionage",
    "ChildExploitation",
    "SexualAssault",
    "GangActivity",
    "Smuggling",
    "DrugTrafficking",
    "CyberStalkingKidnapping",
  ];
  const highCrimes = [
    "AssaultAndBattery",
    "DomesticViolence",
    "Robbery",
    "Arson",
    "MotorVehicleTheft",
    "IdentityTheft",
    "Hacking",
    "CyberStalking",
    "OnlineFraud",
    "Bribery",
    "MoneyLaundering",
    "CorporateEspionage",
    "Extortion",
    "Fraud",
    "ReligiousHateCrime",
    "LGBTQHateCrime",
    "RacialAndEthnicHateCrime",
    "ChildAbuse",
  ];
  const mediumCrimes = [
    "Burglary",
    "TheftAndLarceny",
    "Vandalism",
    "PhishingAndScamming",
    "Embezzlement",
    "DrugPossession",
    "Prostitution",
    "Forgery",
    "AnimalCreulty",
    "IllegalDumping",
    "PollutionViolation",
    "DisorderlyConduct",
    "PublicIntoxication",
    "Trespassing",
  ];
  const lowCrimes = ["Gambling", "TrafficViolations", "Poaching"];

  if (urgentCrimes.includes(crimeType)) {
    priority = "URGENT";
  } else if (highCrimes.includes(crimeType)) {
    priority = "HIGH";
  } else if (mediumCrimes.includes(crimeType)) {
    priority = "MEDIUM";
  } else if (lowCrimes.includes(crimeType)) {
    priority = "LOW";
  }
  const authoritiesMap = {
    Homicide: [
      "Police",
      "Crime Investigation Department",
      "Central Bureau of Investigation",
    ],
    Terrorism: [
      "National Investigation Agency",
      "Anti Terrorism Squad",
      "Intelligence Bureau",
      "Research and Analysis Wing",
    ],
    Kidnapping: [
      "Police",
      "Crime Investigation Department",
      "Central Bureau of Investigation",
    ],
    Espionage: [
      "Intelligence Bureau",
      "Research and Analysis Wing",
      "Central Bureau of Investigation",
    ],
    ChildExploitation: [
      "National Commission for Protection of Child Rights",
      "Special Juvenile Police Unit",
      "Cyber Crime Cell",
    ],
    SexualAssault: [
      "Police",
      "National Commission for Protection of Child Rights",
    ],
    GangActivity: [
      "Police",
      "Crime Investigation Department",
      "Central Bureau of Investigation",
    ],
    Smuggling: [
      "Directorate of Revenue Intelligence",
      "Customs Department",
      "Border Security Force",
      "Narcotics Control Bureau",
    ],
    DrugTrafficking: [
      "Narcotics Control Bureau",
      "Border Security Force",
      "Directorate of Revenue Intelligence",
      "Customs Department",
    ],
    CyberStalkingKidnapping: [
      "Cyber Crime Cell",
      "Police",
      "Indian Computer Emergency Response Team",
    ],

    AssaultAndBattery: ["Police", "Crime Investigation Department"],
    DomesticViolence: [
      "Police",
      "National Commission for Protection of Child Rights",
    ],
    Robbery: [
      "Police",
      "Crime Investigation Department",
      "Central Bureau of Investigation",
    ],
    Arson: ["Police", "Central Bureau of Investigation", "Fire Department"],
    MotorVehicleTheft: [
      "Police",
      "Regional Transport Office",
      "Crime Investigation Department",
    ],
    IdentityTheft: [
      "Cyber Crime Cell",
      "Indian Computer Emergency Response Team",
    ],
    Hacking: ["Cyber Crime Cell", "Indian Computer Emergency Response Team"],
    CyberStalking: [
      "Cyber Crime Cell",
      "Indian Computer Emergency Response Team",
    ],
    OnlineFraud: [
      "Cyber Crime Cell",
      "Reserve Bank of India",
      "Indian Computer Emergency Response Team",
    ],
    Bribery: ["Anti Corruption Bureau", "Central Vigilance Commission"],
    MoneyLaundering: ["Enforcement Directorate", "Financial Intelligence Unit"],
    CorporateEspionage: ["Corporate Affairs Ministry", "Intelligence Bureau"],
    Extortion: ["Police", "Central Bureau of Investigation"],
    Fraud: [
      "Police",
      "Central Bureau of Investigation",
      "Financial Intelligence Unit",
    ],
    ReligiousHateCrime: ["Police", "National Commission for Minorities"],
    LGBTQHateCrime: ["Police", "National Human Rights Commission"],
    RacialAndEthnicHateCrime: [
      "Police",
      "National Commission for Minorities",
      "National Human Rights Commission",
    ],
    ChildAbuse: [
      "National Commission for Protection of Child Rights",
      "Special Juvenile Police Unit",
    ],

    Burglary: ["Police", "Crime Investigation Department"],
    TheftAndLarceny: ["Police", "Crime Investigation Department"],
    Vandalism: ["Police", "Municipality"],
    PhishingAndScamming: [
      "Cyber Crime Cell",
      "Indian Computer Emergency Response Team",
    ],
    Embezzlement: [
      "Police",
      "Enforcement Directorate",
      "Financial Intelligence Unit",
    ],
    DrugPossession: ["Police", "Narcotics Control Bureau"],
    Prostitution: ["Police", "National Commission for Women"],
    Forgery: ["Police", "Central Bureau of Investigation"],
    AnimalCreulty: ["Animal Welfare Board of India", "Police"],
    IllegalDumping: ["Municipality", "Central Pollution Control Board"],
    PollutionViolation: [
      "Central Pollution Control Board",
      "National Green Tribunal",
    ],
    DisorderlyConduct: ["Police"],
    PublicIntoxication: ["Police"],
    Trespassing: ["Police", "Municipality"],

    Gambling: ["Police", "Anti Corruption Bureau"],
    TrafficViolations: ["Traffic Police", "Regional Transport Office"],
    Poaching: ["Wildlife Crime Control Bureau", "Forest Department"],
  };

  let authorities = authoritiesMap[crimeType];

  await db.report.create({
    data: {
      ticketNumber: ticket,
      description,
      crimeType,
      priority,
      latitude,
      longitude,
      status: "RECEIVED",
      authorities: {
        connect: authorities.map((authority) => ({ name: authority })),
      },
    },
  });
});

module.exports = router;
