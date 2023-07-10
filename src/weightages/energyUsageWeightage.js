const energyUsageWeightage = {
    heatingSystem: {
        A: 0.82,  // Natural gas  
        B: 0.67,  // Electric
        C: 0.81,  // Heating Oil
        D: 0.20,  // Wood
        E: 0.31,  // Other
    },

    thermostatAdjustment: {
        A: 0.28,  // Regularly (based on occupancy and season)  
        B: 0.52,  // Occasionally 
        C: 0.84,  // Rarely or never
    },

    energyEfficientLightBulbs: {
        A: 0.32,  // Yes, all of them  
        B: 0.54,  // Some of them
        C: 0.83,  // No, none of them
    },

    lightsAppliancesUsage: {
        A: 0.23,  // Always  
        B: 0.64,  // Sometimes
        C: 1.20,  // Rarely or never
    },

    solarPanels: {
        A: 0.31,  // Yes  
        B: 0.79,  // No
    },

    energyMonitoring: {
        A: 0.35,  // Yes, regularly  
        B: 0.53,  // Occasionally
        C: 0.89,  // Rarely or never
    },

    energyAudit: {
        A: 0.23,  // Yes  
        B: 0.78,  // No
    },

    energyEfficientAppliances: {
        A: 0.12,  // All of them  
        B: 0.44,  // Some of them
        C: 0.81,  // None of them
    },

    programmableThermostats: {
        A: 0.25,  // Yes  
        B: 0.82,  // No 
    },

    naturalVentilation: {
        A: 0.21,  // Frequently (during mild weather)  
        B: 0.40,  // Occasionally
        C: 1.11,  // Rarely or never
    },
}

module.exports = energyUsageWeightage;