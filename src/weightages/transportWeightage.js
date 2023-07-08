const transportWeightage = {
    commuteMethod: {
        A: 1.32,  // Car  
        B: 0.11,  // Bicycle or Walk 
        C: 0.80,  // Motorcycle
        D: 0.66,  // Other
    },
    
    weeklyMiles: {
        A: 0.51,  // Less than 50 miles 
        B: 0.62,  // 50-100 miles
        C: 0.70,  // 100-200 miles
        D: 0.81,  // 200-300 miles
        E: 1.24,  // More than 300 miles
    },

    carpoolFrequency: {
        A: 0.19,  // Frequently 
        B: 0.51,  // Occasionally
        C: 0.84,  // Rarely
        D: 1.02,  // Never
    },

    electricHybridVehicle: {
        A: 0.14,  // Yes 
        B: 0.70,  // No
    },

    airTravelFrequency: {
        A: 0.92,  // Frequently (more than 4 times a year) 
        B: 0.81,  // Occasionally (2-4 times a year)
        C: 0.50,  // Rarely (once a year or less)
        D: 0.20,  // Never
    },

    avoidPeakTraffic: {
        A: 0.20,  // Yes, always 
        B: 0.71,  // Sometimes
        C: 1.03,  // Rarely or never
    },

    alternativeTransportation: {
        A: 0.14,  // Yes, regularly 
        B: 0.52,  // Sometimes
        C: 0.80,  // Rarely or never
    },

    vehicleMaintenance: {
        A: 0.10,  // Regularly (as recommended by the manufacturer) 
        B: 0.24,  // Occasionally
        C: 0.82,  // Rarely or never
    },

    carpoolingProgram: {
        A: 0.11,  // Yes, regularly 
        B: 0.20,  // Occasionally
        C: 0.41,  // Tried once, but not regularly
        D: 0.79,  // No
    },

    walkBikeFrequency: {
        A: 0.13,  // Frequently (several times a week) 
        B: 0.21,  // Occasionally (once or twice a week)
        C: 0.40,  // Rarely (once a month or less)
        D: 0.68,  // Never
    },

}

module.exports = transportWeightage;