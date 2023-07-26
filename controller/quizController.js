const transportWeightage = require('../src/weightages/transportWeightage.json');
const dietWeightage = require('../src/weightages/dietWeightage.json');
const energyUsageWeightage = require('../src/weightages/energyUsageWeightage.json');
const purchasingHabitWeightage = require('../src/weightages/purchasingHabitWeightage.json');
const wasteManagementWeightage = require('../src/weightages/wasteManagementWeightage.json');

// map flat keys to their corresponding categories and questions
const mapFlatToNested = (flatResponses) => {
  const nestedResponses = {};
  for (const category in flatResponses) {
    nestedResponses[category] = {};
    for (const question in flatResponses[category]) {
      const response = flatResponses[category][question];
      nestedResponses[category][question] = response;
    }
  }
  return nestedResponses;
};

// Convert flat JSON object to nested format
const convertToNestedFormat = (flatResponses) => {
  const quizResponses = mapFlatToNested(flatResponses);
  return quizResponses;
};

const calculateTotalCarbonFootprint = (quizResponses) => {
  const weightages = {
    transportWeightage,
    dietWeightage,
    energyUsageWeightage,
    purchasingHabitWeightage,
    wasteManagementWeightage,
  };

  let totalCarbonFootprint = 0;

  for (const category in quizResponses) {
    const categoryResponses = quizResponses[category];

    for (const question in categoryResponses) {
      const response = categoryResponses[question];
      const questionWeightages = weightages[category][question];
      if (questionWeightages) {
        const responseWeightage = questionWeightages[response];

        // Check if the weightage for the response exists
        if (responseWeightage !== undefined) {
          totalCarbonFootprint += responseWeightage;
        } else {
          console.warn(`Weightage not defined for response '${response}' in question '${question}' of category '${category}'. Skipping calculation.`);
        }
      } else {
        console.warn(`Weightage not defined for question '${question}' of category '${category}'. Skipping calculation.`);
      }
    }
  }

  return totalCarbonFootprint.toFixed(2);
};

const calculateCarbonFootprint = (req, res) => {
  try {
    const flatQuizResponses = req.body;
    console.log('Received Quiz Responses:', flatQuizResponses);
    const quizResponses = convertToNestedFormat(flatQuizResponses);

    // Calculate the total carbon footprint
    const totalCarbonFootprint = calculateTotalCarbonFootprint(quizResponses);
    console.log('Total Carbon Footprint:', totalCarbonFootprint);
    res.json({ totalCarbonFootprint: totalCarbonFootprint });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Calculate the total weightages for each section
const calculateSectionWeightages = (weightages) => {
  const sectionWeightages = {};
  for (const category in weightages) {
    const categoryWeightages = weightages[category];
    let totalSectionWeightage = 0;
    for (const question in categoryWeightages) {
      const weightage = categoryWeightages[question];
      totalSectionWeightage += weightage;
    }
    sectionWeightages[category] = totalSectionWeightage;
  }
  return sectionWeightages;
};

// Transport Section
const getTransportWeightages = (req, res) => {
  const sectionWeightages = calculateSectionWeightages(transportWeightage);
  res.json(sectionWeightages);
};

// Diet Section
const getDietWeightages = (req, res) => {
  const sectionWeightages = calculateSectionWeightages(dietWeightage);
  res.json(sectionWeightages);
};

// Energy Usage Section
const getEnergyUsageWeightages = (req, res) => {
  const sectionWeightages = calculateSectionWeightages(energyUsageWeightage);
  res.json(sectionWeightages);
};

// Purchasing Habit Section
const getPurchasingHabitWeightages = (req, res) => {
  const sectionWeightages = calculateSectionWeightages(purchasingHabitWeightage);
  res.json(sectionWeightages);
};

// Waste Management Section
const getWasteManagementWeightages = (req, res) => {
  const sectionWeightages = calculateSectionWeightages(wasteManagementWeightage);
  res.json(sectionWeightages);
};

module.exports = {
  calculateCarbonFootprint,
  getTransportWeightages,
  getDietWeightages,
  getEnergyUsageWeightages,
  getPurchasingHabitWeightages,
  getWasteManagementWeightages,
};
