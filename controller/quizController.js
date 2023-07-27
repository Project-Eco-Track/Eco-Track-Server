const calculateCarbonFootprint = (req, res) => {
  try {
    const quizResponses = req.body;
    console.log('Received Quiz Responses:', quizResponses);

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

    for (const category in quizResponses) {
      const categoryResponses = quizResponses[category];

      for (const question in categoryResponses) {
        const response = categoryResponses[question];

        // Get the weightage for the response from the weightages object
        const questionWeightages = weightages[category][question];

        // Checking if the weightage exists for the question
        if (questionWeightages) {
          const responseWeightage = questionWeightages[response];

          // Check if the weightage for the response exists
          if (responseWeightage !== undefined) {
            // Add the response weightage to the total carbon footprint
            totalCarbonFootprint += responseWeightage;
          } else {
            console.warn(`Weightage not defined for response '${response}' in question '${question}' of category '${category}'. Skipping calculation.`);
          }
        } else {
          console.warn(`Weightage not defined for question '${question}' of category '${category}'. Skipping calculation.`);
        }
      }
    }

    const roundedCarbonFootprint = totalCarbonFootprint.toFixed(2);
    console.log('Total Carbon Footprint:', roundedCarbonFootprint);

    res.json({ totalCarbonFootprint: roundedCarbonFootprint });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  calculateCarbonFootprint,
};

// const http = require('http');
// const transportWeightage = require('../src/weightages/transportWeightage.json');
// const dietWeightage = require('../src/weightages/dietWeightage.json');
// const energyUsageWeightage = require('../src/weightages/energyUsageWeightage.json');
// const purchasingHabitWeightage = require('../src/weightages/purchasingHabitWeightage.json');
// const wasteManagementWeightage = require('../src/weightages/wasteManagementWeightage.json');

// // map flat keys to their corresponding categories and questions
// const mapFlatToNested = (flatResponses) => {
//   const nestedResponses = {};
//   for (const category in flatResponses) {
//     nestedResponses[category] = {};
//     for (const question in flatResponses[category]) {
//       const response = flatResponses[category][question];
//       nestedResponses[category][question] = response;
//     }
//   }
//   return nestedResponses;
// };

// // Convert flat JSON object to nested format
// const convertToNestedFormat = (flatResponses) => {
//   const quizResponses = mapFlatToNested(flatResponses);
//   return quizResponses;
// };

// const calculateTotalCarbonFootprint = (quizResponses) => {
//   const weightages = {
//     transportWeightage,
//     dietWeightage,
//     energyUsageWeightage,
//     purchasingHabitWeightage,
//     wasteManagementWeightage,
//   };

//   let totalCarbonFootprint = 0;

//   for (const category in quizResponses) {
//     const categoryResponses = quizResponses[category];

//     for (const question in categoryResponses) {
//       const response = categoryResponses[question];
//       const questionWeightages = weightages[category][question];
//       if (questionWeightages) {
//         const responseWeightage = questionWeightages[response];

//         // Check if the weightage for the response exists
//         if (responseWeightage !== undefined) {
//           totalCarbonFootprint += responseWeightage;
//         } else {
//           console.warn(`Weightage not defined for response '${response}' in question '${question}' of category '${category}'. Skipping calculation.`);
//         }
//       } else {
//         console.warn(`Weightage not defined for question '${question}' of category '${category}'. Skipping calculation.`);
//       }
//     }
//   }

//   return totalCarbonFootprint.toFixed(2);
// };

// // Making POST request to the DataApp
// const postCarbonFootprintToDB = (data) => {
//   const endpoint = process.env.CFootPrint_ENDPOINT_URL;

//   const jsonData = JSON.stringify(data);

//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Content-Length': jsonData.length,
//     },
//   };

//   return new Promise((resolve, reject) => {
//     const req = http.request(endpoint, options, (res) => {
//       res.setEncoding('utf8');
//       let responseBody = '';

//       res.on('data', (chunk) => {
//         responseBody += chunk;
//       });

//       res.on('end', () => {
//         if (res.statusCode >= 200 && res.statusCode < 300) {
//           resolve(responseBody);
//         } else {
//           reject(new Error(`Request failed with status code ${res.statusCode}`));
//         }
//       });
//     });

//     req.on('error', (error) => {
//       reject(error);
//     });

//     // Send the request body
//     req.write(jsonData);
//     req.end();
//   });
// };

// // Calculating the total carbon footprint and making a POST request to the external API
// const calculateCarbonFootprint = async (req, res) => {
//   try {
//     const { userID, Date, ...flatQuizResponses } = req.body;
//     console.log('Received Quiz Responses:', flatQuizResponses);
//     const quizResponses = convertToNestedFormat(flatQuizResponses);

//     const totalCarbonFootprint = calculateTotalCarbonFootprint(quizResponses);
//     console.log('Total Carbon Footprint:', totalCarbonFootprint);

//     // Calculate the total weightages for each section
//     const transportWeightage = calculateSectionWeightages(quizResponses.transportWeightage);
//     const dietWeightage = calculateSectionWeightages(quizResponses.dietWeightage);
//     const energyUsageWeightage = calculateSectionWeightages(quizResponses.energyUsageWeightage);
//     const purchasingHabitWeightage = calculateSectionWeightages(quizResponses.purchasingHabitWeightage);
//     const wasteManagementWeightage = calculateSectionWeightages(quizResponses.wasteManagementWeightage);

//     // Request body for POST
//     const requestBody = {
//       UserID: userID,
//       CarbonFootprint: parseFloat(totalCarbonFootprint),
//       Transportation: transportWeightage,
//       Diet: dietWeightage,
//       EnergyUsage: energyUsageWeightage,
//       PurchasingHabit: purchasingHabitWeightage,
//       WasteManagement: wasteManagementWeightage,
//       Date: Date,
//     };

//     await postCarbonFootprintToDB(requestBody);

//     res.json({ totalCarbonFootprint: totalCarbonFootprint });
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// // Calculate the total weightages for each section
// const calculateSectionWeightages = (weightages) => {
//   const sectionWeightages = {};
//   for (const category in weightages) {
//     const categoryWeightages = weightages[category];
//     let totalSectionWeightage = 0;
//     for (const question in categoryWeightages) {
//       const weightage = categoryWeightages[question];
//       totalSectionWeightage += weightage;
//     }
//     sectionWeightages[category] = totalSectionWeightage;
//   }
//   return sectionWeightages;
// };

// // Transport Section
// const getTransportWeightages = (req, res) => {
//   const sectionWeightages = calculateSectionWeightages(transportWeightage);
//   res.json(sectionWeightages);
// };

// // Diet Section
// const getDietWeightages = (req, res) => {
//   const sectionWeightages = calculateSectionWeightages(dietWeightage);
//   res.json(sectionWeightages);
// };

// // Energy Usage Section
// const getEnergyUsageWeightages = (req, res) => {
//   const sectionWeightages = calculateSectionWeightages(energyUsageWeightage);
//   res.json(sectionWeightages);
// };

// // Purchasing Habit Section
// const getPurchasingHabitWeightages = (req, res) => {
//   const sectionWeightages = calculateSectionWeightages(purchasingHabitWeightage);
//   res.json(sectionWeightages);
// };

// // Waste Management Section
// const getWasteManagementWeightages = (req, res) => {
//   const sectionWeightages = calculateSectionWeightages(wasteManagementWeightage);
//   res.json(sectionWeightages);
// };

// module.exports = {
//   calculateCarbonFootprint,
//   getTransportWeightages,
//   getDietWeightages,
//   getEnergyUsageWeightages,
//   getPurchasingHabitWeightages,
//   getWasteManagementWeightages,
// };