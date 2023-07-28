const DigestFetch = require("with-digest-fetch").default;
const publicKey = process.env.TIDB_PUBLIC_KEY_R;
const privateKey = process.env.TIDB_PRIVATE_KEY_R;
const client = new DigestFetch(publicKey, privateKey);

const calculateCarbonFootprint = async (req, res) => {
  try {
    const quizResponses = req.body;
    console.log("Received Quiz Responses:", quizResponses);

    // Extract the userID and Date from the JSON data
    const { userID, Date } = quizResponses;
    delete quizResponses.userID;
    delete quizResponses.Date;

    const transportWeightage = require("../src/weightages/transportWeightage.json");
    const dietWeightage = require("../src/weightages/dietWeightage.json");
    const energyUsageWeightage = require("../src/weightages/energyUsageWeightage.json");
    const purchasingHabitWeightage = require("../src/weightages/purchasingHabitWeightage.json");
    const wasteManagementWeightage = require("../src/weightages/wasteManagementWeightage.json");

    const weightages = {
      transportWeightage,
      dietWeightage,
      energyUsageWeightage,
      purchasingHabitWeightage,
      wasteManagementWeightage,
    };

    let totalCarbonFootprint = 0;
    const sectionalCarbonFootprints = {};

    for (const category in quizResponses) {
      const categoryResponses = quizResponses[category];
      let categoryCarbonFootprint = 0;

      for (const question in categoryResponses) {
        const response = categoryResponses[question];

        const questionWeightages = weightages[category][question];
        if (questionWeightages) {
          const responseWeightage = questionWeightages[response];

          if (responseWeightage !== undefined) {
            categoryCarbonFootprint += responseWeightage;
          } else {
            console.warn(
              `Weightage not defined for response '${response}' in question '${question}' of category '${category}'. Skipping calculation.`
            );
          }
        } else {
          console.warn(
            `Weightage not defined for question '${question}' of category '${category}'. Skipping calculation.`
          );
        }
      }

      // Store the sectional carbon footprint for the category
      sectionalCarbonFootprints[category] = parseFloat(
        categoryCarbonFootprint.toFixed(2)
      );

      // Add the category's carbon footprint to the total carbon footprint
      totalCarbonFootprint += categoryCarbonFootprint;
    }

    const roundedTotalCarbonFootprint = parseFloat(
      totalCarbonFootprint.toFixed(2)
    );
    console.log("Total Carbon Footprint:", roundedTotalCarbonFootprint);

    // Combine the total carbon footprint with the sectional carbon footprints for the API response
    const apiResponse = {
      UserID: userID,
      totalCarbonFootprint: roundedTotalCarbonFootprint(),
      Transportation: sectionalCarbonFootprints["transportWeightage"](),
      Diet: sectionalCarbonFootprints["dietWeightage"](),
      EnergyUsage: sectionalCarbonFootprints["energyUsageWeightage"](),
      PurchasingHabit: sectionalCarbonFootprints["purchasingHabitWeightage"](),
      WasteManagement: sectionalCarbonFootprints["wasteManagementWeightage"](),
      Date: Date,
    };

    console.log("API Response:", apiResponse);
    res.json(apiResponse);

    // Send the data to the dataApp via POST request
    const postData = {
      UserID: userID,
      CarbonFootprint: roundedTotalCarbonFootprint(),
      Transportation: sectionalCarbonFootprints["transportWeightage"](),
      Diet: sectionalCarbonFootprints["dietWeightage"](),
      EnergyUsage: sectionalCarbonFootprints["energyUsageWeightage"](),
      PurchasingHabit: sectionalCarbonFootprints["purchasingHabitWeightage"](),
      WasteManagement: sectionalCarbonFootprints["wasteManagementWeightage"](),
      Date: Date,
    };

    const endpointUrl = "https://eu-central-1.data.tidbcloud.com/api/v1beta/app/dataapp-jMIfjDIZ/endpoint/postCarbonFootprint";
    console.log("payload data: " + JSON.stringify(postData));
    client
      .fetch(endpointUrl, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("DataApp Response:", response.status);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  calculateCarbonFootprint,
};
