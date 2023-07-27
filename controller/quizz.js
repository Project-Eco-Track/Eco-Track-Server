const axios = require('axios');

const calculateCarbonFootprint = async (req, res) => {
  try {
    const quizResponses = req.body;
    console.log('Received Quiz Responses:', quizResponses);

    // Extract the userID and Date from the JSON data
    const { userID, Date } = quizResponses;
    delete quizResponses.userID;
    delete quizResponses.Date;

    const transportWeightage = require('../src/weightages/transportWeightage.json');
    const dietWeightage = require('../src/weightages/dietWeightage.json');
    const energyUsageWeightage = require('../src/weightages/energyUsageWeightage.json');
    const purchasingHabitWeightage = require('../src/weightages/purchasingHabitWeightage.json');
    const wasteManagementWeightage = require('../src/weightages/wasteManagementWeightage.json');

    const weightages = {
      transportWeightage,
      dietWeightage,
      energyUsageWeightage,
      purchasingHabitWeightage,
      wasteManagementWeightage
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
            console.warn(`Weightage not defined for response '${response}' in question '${question}' of category '${category}'. Skipping calculation.`);
          }
        } else {
          console.warn(`Weightage not defined for question '${question}' of category '${category}'. Skipping calculation.`);
        }
      }

      // Store the sectional carbon footprint for the category
      sectionalCarbonFootprints[category] = parseFloat(categoryCarbonFootprint.toFixed(2));

      // Add the category's carbon footprint to the total carbon footprint
      totalCarbonFootprint += categoryCarbonFootprint;
    }

    const roundedTotalCarbonFootprint = parseFloat(totalCarbonFootprint.toFixed(2));
    console.log('Total Carbon Footprint:', roundedTotalCarbonFootprint);

    // Send the data to the dataApp via POST request
    const postData = {
      UserID: userID,
      CarbonFootprint: roundedTotalCarbonFootprint,
      Transportation: sectionalCarbonFootprints['transportWeightage'],
      Diet: sectionalCarbonFootprints['dietWeightage'],
      EnergyUsage: sectionalCarbonFootprints['energyUsageWeightage'],
      PurchasingHabit: sectionalCarbonFootprints['purchasingHabitWeightage'],
      WasteManagement: sectionalCarbonFootprints['wasteManagementWeightage'],
      Date: Date,
    };

    const endpointUrl = process.env.CFOOTPRINT_ENDPOINT_URL;
    if (endpointUrl) {
      await axios.post(endpointUrl, postData);
      console.log('Data sent to the database successfully.');
    } else {
      console.warn('Endpoint not defined. Skipping data upload.');
    }

    // Combine the total carbon footprint with the sectional carbon footprints for the API response
    const apiResponse = {
      UserID: userID,
      totalCarbonFootprint: roundedTotalCarbonFootprint,
      Transportation: sectionalCarbonFootprints['transportWeightage'],
      Diet: sectionalCarbonFootprints['dietWeightage'],
      EnergyUsage: sectionalCarbonFootprints['energyUsageWeightage'],
      PurchasingHabit: sectionalCarbonFootprints['purchasingHabitWeightage'],
      WasteManagement: sectionalCarbonFootprints['wasteManagementWeightage'],
      Date: Date,
    };

    console.log('API Response:', apiResponse);
    res.json(apiResponse);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  calculateCarbonFootprint,
};

