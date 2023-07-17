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
