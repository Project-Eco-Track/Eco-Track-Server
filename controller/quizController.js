const dietWeightage = require('../src/weightages/dietWeightage');
const energyUsageWeightage = require('../src/weightages/energyUsageWeightage');
const purchasingHabitWeightage = require('../src/weightages/purchasingHabitWeightage');
const transportWeightage = require('../src/weightages/transportWeightage');
const wasteManagementWeightage = require('../src/weightages/wasteManagementWeightage');

// Calculating Carbon footprint by Quiz Response
const calculateCarbonFootprint = (quizResponses) => {
  let categoricalCarbonFootprints = [];

  for (const question in quizResponses) {
    const response = quizResponses[question];
    let questionWeightage = 0;

    // Getting weightage by question category
    const category = question.split(':')[0];

    switch (category) {
      case 'Diet':
        questionWeightage = dietWeightage[response];
        break;
      case 'Energy Usage':
        questionWeightage = energyUsageWeightage[response];
        break;
      case 'Purchasing Habits':
        questionWeightage = purchasingHabitWeightage[response];
        break;
      case 'Transportation':
        questionWeightage = transportWeightage[response];
        break;
      case 'Waste Management':
        questionWeightage = wasteManagementWeightage[response];
        break;
      default:
        // Unrecognized question category handler
        break;
    }

    categoricalCarbonFootprints.push(questionWeightage);
  }

  return categoricalCarbonFootprints;
};

const calculateTotalCarbonFootprint = (categoricalCarbonFootprints) => {
  let totalCarbonFootprint = 0;

  // Sum all categorical carbon footprints
  for (const categoryCarbonFootprint of categoricalCarbonFootprints) {
    totalCarbonFootprint += categoryCarbonFootprint;
  }

  return totalCarbonFootprint;
};

const handleQuiz = (req, res) => {
  const quizResponses = req.body;
  const categoricalCarbonFootprints = calculateCarbonFootprint(quizResponses);
  const totalCarbonFootprint = calculateTotalCarbonFootprint(categoricalCarbonFootprints);
  
  // Return carbon footprint as response
  res.json({ totalCarbonFootprint });
};

module.exports = { 
  handleQuiz,
};