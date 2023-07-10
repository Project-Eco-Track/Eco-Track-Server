const purchasingHabitWeightage = {
    reusableBags: {
      A: 0.20,  // Always bring reusable bags 
      B: 0.42,  // Mostly bring reusable bags, but sometimes use plastic bags
      C: 0.73,  // Usually use plastic bags, but sometimes bring reusable bags
      D: 0.90,  // Always use plastic bags
    },

    localProducts: {
      A: 0.21,  // Always prioritize local products 
      B: 0.40,  // Often choose local products
      C: 0.64,  // Sometimes choose local products
      D: 0.81,  // Rarely or never consider local products
    },

    ecoFriendlyCertifications: {
      A: 0.22,  // Always look for eco-friendly certifications  
      B: 0.43,  // Often choose products with eco-friendly certifications
      C: 0.72,  // Occasionally consider eco-friendly certifications
      D: 0.89,  // Rarely or never consider eco-friendly certifications
    },

    singleUsePlasticItems: {
      A: 0.32,  // Rarely or never purchase single-use plastic items 
      B: 0.41,  // Occasionally purchase single-use plastic items
      C: 0.61,  // Frequently purchase single-use plastic items
      D: 0.85,  // Always purchase single-use plastic items
    },

    clothingShoppingApproach: {
      A: 0.31,  // Primarily buy second-hand or sustainable fashion 
      B: 0.52,  // Mix of second-hand and new clothing purchases
      C: 0.61,  // Mostly buy new clothing from conventional retailers
      D: 0.82,  // Always buy new clothing from conventional retailers
    },

    repairOrMendItems: {
      A: 0.40,  // Always repair or mend broken items 
      B: 0.41,  // Often repair or mend broken items
      C: 0.70,  // Occasionally repair or mend broken items
      D: 0.82,  // Rarely or never repair or mend broken items
    },

    packagingImpactConsideration: {
      A: 0.20,  // Always consider the environmental impact of packaging 
      B: 0.42,  // Often consider the environmental impact of packaging
      C: 0.64,  // Occasionally consider the environmental impact of packaging
      D: 0.87,  // Rarely or never consider the environmental impact of packaging
    },

    bulkBuyingPractices: {
      A: 0.31,  // Always buy in bulk or practice bulk-buying 
      B: 0.52,  // Often buy in bulk or practice bulk-buying
      C: 0.74,  // Occasionally buy in bulk or practice bulk-buying
      D: 0.90,  // Rarely or never buy in bulk or practice bulk-buying
    },

    responsibleDisposal: {
      A: 0.29,  // Always dispose of electronics responsibly 
      B: 0.52,  // Often dispose of electronics responsibly
      C: 0.70,  // Occasionally dispose of electronics responsibly
      D: 0.71,  // Rarely or never dispose of electronics responsibly
    },

    brandImpactConsideration: {
      A: 0.21,  // Always consider the environmental and social impact of brands 
      B: 0.50,  // Often consider the environmental and social impact of brands
      C: 0.71,  // Occasionally consider the environmental and social impact of brands
      D: 0.91,  // Rarely or never consider the environmental and social impact of brands
    },
}

module.exports = purchasingHabitWeightage;