const wasteManagementWeightage = {
  organicWasteDisposal: {
    A: 0.22,  // Compost
    B: 0.90,  // Landfill
    C: 0.41,  // Recycling
    D: 0.55,  // Other
  },

  paperPlasticGlassMetalRecycling: {
    A: 0.21,  // Always
    B: 0.39,  // Sometimes
    C: 0.81,  // Rarely or never
  },

  avoidSingleUsePlastic: {
    A: 0.24,  // Yes, always
    B: 0.52,  // Sometimes
    C: 0.81,  // Rarely or never
  },

  reduceDisposableProducts: {
    A: 0.30,  // Yes, extensively
    B: 0.42,  // Sometimes
    C: 0.70,  // Rarely or never
  },
  
  communityCleanupParticipation: {
    A: 0.31,  // Frequently (multiple times a year)
    B: 0.56,  // Occasionally (once a year)
    C: 0.73,  // Rarely or never
  },
  
  eWasteRecycling: {
    A: 0.20,  // Yes, always
    B: 0.40,  // Sometimes
    C: 0.74,  // Rarely or never
  },
  
  minimizePackagingWaste: {
    A: 0.31,  // Yes, extensively
    B: 0.53,  // Sometimes
    C: 0.86,  // Rarely or never
  },
  
  repairOrRepurposeItems: {
    A: 0.18,  // Frequently
    B: 0.42,  // Occasionally
    C: 0.73,  // Rarely or never
  },
  
  donateUnwantedItems: {
    A: 0.31,  // Yes, always
    B: 0.54,  // Sometimes
    C: 0.80,  // Rarely or never
  },
  recyclingGuidelinesAwareness: {
    A: 0.33,  // Yes, well-informed
    B: 0.51,  // Somewhat aware
    C: 0.80,  // Not aware
  },
};

module.exports = {
    wasteManagementWeightage,
};