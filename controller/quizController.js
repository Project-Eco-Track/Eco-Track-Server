const calculateCarbonFootprint = (req, res) => {
  try {
    const flatQuizResponses = req.body;
    console.log('Received Quiz Responses:', flatQuizResponses);

    // Loading weightages from the JSON files
    const transportWeightage = require('../src/weightages/transportWeightage.json');
    const dietWeightage = require('../src/weightages/dietWeightage.json');
    const energyUsageWeightage = require('../src/weightages/energyUsageWeightage.json');
    const purchasingHabitWeightage = require('../src/weightages/purchasingHabitWeightage.json');
    const wasteManagementWeightage = require('../src/weightages/wasteManagementWeightage.json');

    // mapping the response to their corresponding categories and questions with weightages and converting it to a nested JSON
    const mapFlatToNested = (flatResponses, weightages) => {
      const nestedResponses = {};
      let totalCarbonFootprint = 0;
      for (const category in weightages) {
        nestedResponses[category] = {};
        const categoryWeightages = weightages[category];
        for (const question in categoryWeightages) {
          const weightage = categoryWeightages[question];
          const response = flatResponses[question];
          if (response !== undefined) {
            nestedResponses[category][question] = response;
            // Apply the weightage to the total carbon footprint
            totalCarbonFootprint += weightage[response];
          } else {
            console.warn(`Response not found for question '${question}' of category '${category}'. Skipping calculation.`);
          }
        }
      }
      return { nestedResponses, totalCarbonFootprint };
    };

    // Convert flat JSON object to the desired nested format with weightages
    const { nestedResponses, totalCarbonFootprint } = mapFlatToNested(flatQuizResponses, {
      transportWeightage,
      dietWeightage,
      energyUsageWeightage,
      purchasingHabitWeightage,
      wasteManagementWeightage,
    });

    // Respond with the total carbon footprint
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

