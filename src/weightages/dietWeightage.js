const dietWeightage = {
  meatDairyConsumption: {
    A: 0.97,  // Multiple times a day 
    B: 0.75, // Once a day
    C: 0.51,  // Few times a week
    D: 0.22,  // Rarely or never
  },
  
  vegetarianVeganDiet: {
    A: 0.53,  // Yes, vegetarian 
    B: 0.24,  // Yes, vegan
    C: 0.30,  // No, I consume meat and dairy products
  },

  locallySourcedProduce: {
    A: 0.30,  // Always 
    B: 0.52,  // Sometimes
    C: 0.73,  // Rarely or never
  },

  foodWasteReduction: {
    A: 0.19,  // Yes, always 
    B: 0.51,  // Sometimes
    C: 1.01,  // Rarely or never
  },

  reduceProcessedPackagedFoods: {
    A: 0.28,  // Yes, actively 
    B: 0.49,  // Sometimes
    C: 0.99,  // Rarely or never
  },

  organicSustainableFood: {
    A: 0.30,  // Always 
    B: 0.51,  // Sometimes
    C: 0.69,  // Rarely or never
  },

  csaParticipation: {
    A: 0.20,  // Yes, regularly 
    B: 0.53,  // Occasionally
    C: 0.68,  // Tried once, but not regularly
    D: 1.02,  // No
  },

  plantBasedProteins: {
    A: 0.27,  // Yes, regularly 
    B: 0.51,  // Occasionally
    C: 0.74,  // Rarely or never
  },

  fromScratchMeals: {
    A: 0.23,  // Frequently (almost every meal) 
    B: 0.50,  // Occasionally (a few times a week)
    C: 0.71,  // Rarely (once a week or less)
    D: 0.92,  // Never
  },

  awarenessCarbonFootprint: {
    A: 0.23,  // Yes, well-informed 
    B: 0.56,  // Somewhat aware
    C: 0.82,  // Not aware
  },
}

module.exports = dietWeightage;