import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Data Store centered in VADODARA, GUJARAT, INDIA (22.3072, 73.1812) - 12 Fleet Vehicles
let vehicles = [
  // PUBLIC TRANSPORT (VMC BUSES)
  {
    id: 'bus-p12',
    name: 'VMC Bus 12',
    code: 'P-12',
    category: 'public',
    type: 'Standard City Bus',
    capacity: 50,
    occupancy: 28,
    lat: 22.3072,
    lng: 73.1812,
    heading: 90,
    speed: 34,
    status: 'ACTIVE',
    routeId: 'route-p1',
    routeName: 'Route 12 - Vadodara Railway Station ↔ Alkapuri Express',
    driver: 'Marcus Vance',
    etaMinutes: 6,
    hasDeviation: false,
    lastUpdated: 'Just now',
    stops: ['Vadodara Railway Station', 'Alkapuri Hub', 'Sayajigunj Circle', 'MSU Campus']
  },
  {
    id: 'bus-p24',
    name: 'VMC Bus 24',
    code: 'P-24',
    category: 'public',
    type: 'Articulated Metro Bus',
    capacity: 50,
    occupancy: 42,
    lat: 22.3120,
    lng: 73.1870,
    heading: 180,
    speed: 28,
    status: 'ACTIVE',
    routeId: 'route-p2',
    routeName: 'Route 24 - Sayajigunj ↔ Fatehgunj ↔ Nizampura',
    driver: 'Elena Rostova',
    etaMinutes: 4,
    hasDeviation: true,
    deviationDistance: '650m',
    deviationDuration: '4 min',
    lastUpdated: 'Just now',
    stops: ['Vadodara Railway Station', 'Sayajigunj Circle', 'Fatehgunj Flyover', 'Nizampura Circle']
  },
  {
    id: 'bus-p31',
    name: 'VMC Bus 31',
    code: 'P-31',
    category: 'public',
    type: 'Electric Transit Bus',
    capacity: 50,
    occupancy: 18,
    lat: 22.3010,
    lng: 73.1750,
    heading: 45,
    speed: 38,
    status: 'ACTIVE',
    routeId: 'route-p2',
    routeName: 'Route 24 - Akota ↔ Old Padra Road Express',
    driver: 'David Chen',
    etaMinutes: 8,
    hasDeviation: false,
    recommended: true,
    recommendationReason: 'VMC Bus 31 arrives 4 min later but has 57% lower crowd density.',
    lastUpdated: 'Just now',
    stops: ['Vadodara Railway Station', 'Alkapuri', 'Akota Stadium', 'Old Padra Road']
  },

  // EMERGENCY VEHICLES (GUJARAT REGISTRATION FORMAT)
  {
    id: 'amb-e01',
    name: 'GJ 06 AB 1234',
    code: 'GJ 06 AB 1234',
    category: 'emergency',
    type: 'Advanced Life Support Ambulance',
    capacity: 2,
    occupancy: 1,
    lat: 22.3180,
    lng: 73.1840,
    heading: 270,
    speed: 58,
    status: 'RESPONDING',
    routeId: 'route-e1',
    routeName: 'SSG Hospital Priority Response',
    driver: 'Dr. Sarah Connor (Paramedic Lead)',
    etaMinutes: 3,
    hasDeviation: false,
    emergencyTarget: 'Alkapuri RC Dutt Road (Cardiac Incident Call)',
    lastUpdated: 'Just now'
  },
  {
    id: 'amb-e02',
    name: 'GJ 06 CD 4521',
    code: 'GJ 06 CD 4521',
    category: 'emergency',
    type: 'Basic Life Support Ambulance',
    capacity: 2,
    occupancy: 0,
    lat: 22.2980,
    lng: 73.1680,
    heading: 120,
    speed: 0,
    status: 'AVAILABLE',
    routeId: 'route-e2',
    routeName: 'Akota Emergency Standby',
    driver: 'James Holden',
    etaMinutes: 5,
    hasDeviation: false,
    lastUpdated: 'Just now'
  },
  {
    id: 'fire-e03',
    name: 'GJ 06 EF 7812',
    code: 'GJ 06 EF 7812',
    category: 'emergency',
    type: 'Heavy Rescue Fire Pumper',
    capacity: 6,
    occupancy: 5,
    lat: 22.3250,
    lng: 73.2050,
    heading: 0,
    speed: 45,
    status: 'ASSIGNED',
    routeId: 'route-e3',
    routeName: 'Karelibaug Fire Station Standby',
    driver: 'Captain Robert Shaw',
    etaMinutes: 7,
    hasDeviation: false,
    lastUpdated: 'Just now'
  },

  // MUNICIPAL VEHICLES (VMC MUNICIPAL VEHICLES)
  {
    id: 'muni-m07',
    name: 'VMC Municipal Vehicle 07',
    code: 'M-07',
    category: 'municipal',
    type: 'Automated Side Loader Garbage Truck',
    capacity: 10,
    occupancy: 7,
    lat: 22.3200,
    lng: 73.1920,
    heading: 190,
    speed: 18,
    status: 'WARNING',
    routeId: 'route-m1',
    routeName: 'VMC Solid Waste Zone A (Fatehgunj)',
    driver: 'Carlos Mendez',
    etaMinutes: 15,
    hasDeviation: true,
    deviationDistance: '420m',
    completedTasks: 18,
    totalTasks: 24,
    missedLocations: ['Fatehgunj Sector 3 Bin #4'],
    lastUpdated: 'Just now'
  },
  {
    id: 'muni-m11',
    name: 'VMC Municipal Vehicle 11',
    code: 'M-11',
    category: 'municipal',
    type: '10,000L Fleet Water Tanker',
    capacity: 100,
    occupancy: 65,
    lat: 22.2950,
    lng: 73.2300,
    heading: 90,
    speed: 22,
    status: 'ACTIVE',
    routeId: 'route-m2',
    routeName: 'Sayaji Baug Park Irrigation Route',
    driver: 'Arthur Pendelton',
    etaMinutes: 20,
    hasDeviation: false,
    completedTasks: 12,
    totalTasks: 15,
    missedLocations: [],
    lastUpdated: 'Just now'
  },

  // SCHOOL BUSES (VADODARA SCHOOLS)
  {
    id: 'school-sb07',
    name: 'School Bus 07',
    code: 'SB-07',
    category: 'school',
    schoolName: 'Nalanda International School',
    type: 'Type C School Bus',
    capacity: 35,
    occupancy: 22,
    lat: 22.3150,
    lng: 73.1600,
    heading: 135,
    speed: 26,
    status: 'WARNING',
    routeId: 'route-sb7',
    routeName: 'Route 3 - Gotri ↔ Vasna Road Drop-off',
    driver: 'Thomas Miller',
    etaMinutes: 7,
    hasDeviation: true,
    deviationDistance: '650m',
    deviationDuration: '2m 14s',
    upcomingStop: 'Gotri Circle Stop',
    assignedStudents: ['Emma Watson', 'Lucas Vance', 'Sophia Patel'],
    lastUpdated: 'Just now'
  },
  {
    id: 'school-sb08',
    name: 'School Bus 08',
    code: 'SB-08',
    category: 'school',
    schoolName: 'Podar International School Vadodara',
    type: 'Type C School Bus',
    capacity: 35,
    occupancy: 19,
    lat: 22.3080,
    lng: 73.1950,
    heading: 90,
    speed: 30,
    status: 'ACTIVE',
    routeId: 'route-sb8',
    routeName: 'Route 4 - Karelibaug ↔ Vadodara Station Loop',
    driver: 'Robert Sterling',
    etaMinutes: 9,
    hasDeviation: false,
    upcomingStop: 'Karelibaug Water Tank Stop',
    assignedStudents: ['Alex Vance', 'Chloe Smith'],
    lastUpdated: 'Just now'
  },

  // UNIVERSITY BUSES (VADODARA UNIVERSITIES)
  {
    id: 'uni-u01',
    name: 'University Bus 01',
    code: 'U-01',
    category: 'university',
    universityName: 'The Maharaja Sayajirao University of Baroda (MSU)',
    type: 'Campus Shuttle Electric Express',
    capacity: 40,
    occupancy: 31,
    lat: 22.3140,
    lng: 73.1890,
    heading: 270,
    speed: 32,
    status: 'ACTIVE',
    routeId: 'route-u1',
    routeName: 'MSU Tech Faculty ↔ Main Quad Loop',
    driver: 'Rachel Adams',
    etaMinutes: 5,
    hasDeviation: false,
    stops: ['MSU Main Gate', 'Faculty of Tech', 'Science Pavilion', 'Hostel Campus'],
    lastUpdated: 'Just now'
  },
  {
    id: 'uni-u03',
    name: 'University Bus 03',
    code: 'U-03',
    category: 'university',
    universityName: 'GSFC University',
    type: 'Campus Shuttle Line B',
    capacity: 40,
    occupancy: 12,
    lat: 22.3280,
    lng: 73.1780,
    heading: 180,
    speed: 29,
    status: 'ACTIVE',
    routeId: 'route-u2',
    routeName: 'Fatehgunj Housing ↔ GSFC Campus Quad',
    driver: 'Gregory House',
    etaMinutes: 11,
    hasDeviation: false,
    stops: ['Fatehgunj Housing', 'Nizampura Plaza', 'GSFC Main Gate', 'Polytechnic Pavilion'],
    lastUpdated: 'Just now'
  }
];

let alerts = [
  {
    id: 'alt-101',
    priority: 'HIGH',
    type: 'ROUTE_DEVIATION',
    category: 'school',
    vehicleId: 'school-sb07',
    vehicleName: 'School Bus 07',
    timestamp: '2 minutes ago',
    title: 'School Bus 07 Route Deviation Alert',
    description: 'Vehicle SB-07 deviated 650 meters from assigned Route 3 near Gotri Sector, Vadodara.',
    location: 'Gotri Road, Vadodara',
    resolved: false
  },
  {
    id: 'alt-102',
    priority: 'CRITICAL',
    type: 'EMERGENCY_DISPATCH',
    category: 'emergency',
    vehicleId: 'amb-e01',
    vehicleName: 'GJ 06 AB 1234',
    timestamp: '5 minutes ago',
    title: 'Active Emergency Response Unit Dispatched',
    description: 'Ambulance GJ 06 AB 1234 responding to priority cardiac call at Alkapuri RC Dutt Road, Vadodara.',
    location: 'RC Dutt Road, Alkapuri, Vadodara',
    resolved: false
  },
  {
    id: 'alt-103',
    priority: 'MEDIUM',
    type: 'HIGH_CROWD',
    category: 'public',
    vehicleId: 'bus-p24',
    vehicleName: 'VMC Bus 24',
    timestamp: '12 minutes ago',
    title: 'High Passenger Capacity Threshold Reached',
    description: 'VMC Bus 24 occupancy reached 84% (42/50 capacity). Smart recommendation pushed for VMC Bus 31.',
    location: 'Sayajigunj Circle, Vadodara',
    resolved: false
  }
];

let routes = [
  {
    id: 'route-p1',
    name: 'Route 12 - Vadodara Railway Station ↔ Alkapuri Express',
    category: 'public',
    assignedVehicle: 'VMC Bus 12',
    schedule: 'Every 10 mins',
    stops: ['Vadodara Railway Station', 'Alkapuri Hub', 'Sayajigunj Circle', 'MSU Campus'],
    status: 'NORMAL'
  },
  {
    id: 'route-p2',
    name: 'Route 24 - Sayajigunj ↔ Fatehgunj ↔ Nizampura',
    category: 'public',
    assignedVehicle: 'VMC Bus 24 & VMC Bus 31',
    schedule: 'Every 8 mins',
    stops: ['Vadodara Railway Station', 'Sayajigunj Circle', 'Fatehgunj Flyover', 'Nizampura Circle'],
    status: 'DEVIATED'
  },
  {
    id: 'route-sb7',
    name: 'Route 3 - Gotri ↔ Vasna Road Drop-off',
    category: 'school',
    assignedVehicle: 'School Bus 07',
    schedule: 'Daily 15:30 Drop-off',
    stops: ['Nalanda International School', 'Gotri Circle', 'Vasna Road', 'Sunset Heights'],
    status: 'DEVIATED'
  },
  {
    id: 'route-u1',
    name: 'MSU Tech Faculty ↔ Main Quad Loop',
    category: 'university',
    assignedVehicle: 'University Bus 01',
    schedule: 'Continuous Shuttle (5 min loop)',
    stops: ['MSU Main Gate', 'Faculty of Tech', 'Science Pavilion', 'Hostel Campus'],
    status: 'NORMAL'
  }
];

// Continuous Backend Vehicle Movement & Simulation Loop in Vadodara
setInterval(() => {
  vehicles.forEach(v => {
    // Smooth GPS Movement inside Vadodara
    const deltaLat = (Math.random() - 0.48) * 0.0004;
    const deltaLng = (Math.random() - 0.48) * 0.0004;
    v.lat += deltaLat;
    v.lng += deltaLng;
    v.lastUpdated = 'Just now';

    // Small ETA adjustments
    if (v.status === 'ACTIVE' || v.status === 'RESPONDING') {
      if (Math.random() > 0.7) {
        v.etaMinutes = Math.max(1, v.etaMinutes + (Math.random() > 0.5 ? 1 : -1));
      }
    }
  });
}, 2500);

// API Endpoints

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', system: 'CONVERGE Mobility Backend (Vadodara Region)', count: vehicles.length, timestamp: new Date() });
});

// GET all vehicles or filtered by category
app.get('/api/vehicles', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    return res.json(vehicles.filter(v => v.category === category));
  }
  res.json(vehicles);
});

// GET single vehicle
app.get('/api/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(vehicle);
});

// Smart Ticket Scan Simulation (Board +1)
app.post('/api/vehicles/:id/ticket/board', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  
  if (vehicle.occupancy < vehicle.capacity + 5) {
    vehicle.occupancy += 1;
  }
  
  res.json({
    success: true,
    message: `Boarding validated. Passenger added to ${vehicle.name}`,
    currentOccupancy: vehicle.occupancy,
    capacity: vehicle.capacity,
    crowdLevel: getCrowdLevel(vehicle.occupancy, vehicle.capacity)
  });
});

// Smart Ticket Scan Simulation (Exit -1)
app.post('/api/vehicles/:id/ticket/exit', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  
  if (vehicle.occupancy > 0) {
    vehicle.occupancy -= 1;
  }
  
  res.json({
    success: true,
    message: `Exit validated. Passenger checked out of ${vehicle.name}`,
    currentOccupancy: vehicle.occupancy,
    capacity: vehicle.capacity,
    crowdLevel: getCrowdLevel(vehicle.occupancy, vehicle.capacity)
  });
});

// Trigger Route Deviation
app.post('/api/vehicles/:id/trigger-deviation', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

  vehicle.hasDeviation = true;
  vehicle.status = 'WARNING';
  vehicle.deviationDistance = '780m';
  vehicle.deviationDuration = 'Just now';
  vehicle.etaMinutes += 7;
  vehicle.lat += 0.006;
  vehicle.lng += 0.006;

  const newAlert = {
    id: `alt-${Date.now()}`,
    priority: 'HIGH',
    type: 'ROUTE_DEVIATION',
    category: vehicle.category,
    vehicleId: vehicle.id,
    vehicleName: vehicle.name,
    timestamp: 'Just now',
    title: `${vehicle.name} Route Deviation Detected`,
    description: `${vehicle.name} has moved off its scheduled Vadodara route path by ${vehicle.deviationDistance}.`,
    location: `Vadodara Lat: ${vehicle.lat.toFixed(4)}, Lng: ${vehicle.lng.toFixed(4)}`,
    resolved: false
  };

  alerts.unshift(newAlert);

  res.json({ success: true, vehicle, alert: newAlert });
});

// Resolve Route Deviation
app.post('/api/vehicles/:id/resolve-deviation', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

  vehicle.hasDeviation = false;
  vehicle.status = 'ACTIVE';
  vehicle.deviationDistance = null;
  vehicle.deviationDuration = null;

  // Resolve matching alerts
  alerts.forEach(a => {
    if (a.vehicleId === vehicle.id) a.resolved = true;
  });

  res.json({ success: true, vehicle });
});

// GET all alerts
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// Resolve alert
app.post('/api/alerts/:id/resolve', (req, res) => {
  const alert = alerts.find(a => a.id === req.params.id);
  if (alert) alert.resolved = true;
  res.json({ success: true, alert });
});

// GET routes
app.get('/api/routes', (req, res) => {
  res.json(routes);
});

// Create/Edit Route
app.post('/api/routes', (req, res) => {
  const { id, name, category, assignedVehicle, schedule, stops } = req.body;
  if (id) {
    const existing = routes.find(r => r.id === id);
    if (existing) {
      Object.assign(existing, { name, category, assignedVehicle, schedule, stops });
      return res.json({ success: true, route: existing });
    }
  }
  const newRoute = {
    id: `route-${Date.now()}`,
    name,
    category: category || 'public',
    assignedVehicle: assignedVehicle || 'Unassigned',
    schedule: schedule || 'On Demand',
    stops: stops || [],
    status: 'NORMAL'
  };
  routes.push(newRoute);
  res.json({ success: true, route: newRoute });
});

// Emergency Dispatch
app.post('/api/emergency/dispatch', (req, res) => {
  const { locationAddress } = req.body;
  const availableAmbs = vehicles.filter(v => v.category === 'emergency' && v.status === 'AVAILABLE');
  const targetUnit = availableAmbs[0] || vehicles.find(v => v.id === 'amb-e02');

  if (targetUnit) {
    targetUnit.status = 'RESPONDING';
    targetUnit.emergencyTarget = locationAddress || 'Vadodara Emergency Location';
    targetUnit.speed = 62;
    targetUnit.etaMinutes = 4;

    const dispatchAlert = {
      id: `alt-${Date.now()}`,
      priority: 'CRITICAL',
      type: 'EMERGENCY_DISPATCH',
      category: 'emergency',
      vehicleId: targetUnit.id,
      vehicleName: targetUnit.name,
      timestamp: 'Just now',
      title: `${targetUnit.name} Dispatched`,
      description: `Dispatched to ${targetUnit.emergencyTarget} in Vadodara with live priority sirens active.`,
      location: locationAddress || 'Vadodara Emergency Sector',
      resolved: false
    };
    alerts.unshift(dispatchAlert);

    return res.json({
      success: true,
      message: `${targetUnit.name} successfully dispatched to ${targetUnit.emergencyTarget}`,
      vehicle: targetUnit,
      alert: dispatchAlert
    });
  }

  res.status(400).json({ error: 'No available emergency vehicles at this moment.' });
});

// Parent School Auth
app.post('/api/auth/school-parent', (req, res) => {
  const { phone, otp, studentId, schoolName } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone number and OTP are required' });
  }
  res.json({
    success: true,
    parentName: 'Sarah Vance',
    phone: phone,
    student: {
      studentId: studentId || 'STU-9924',
      name: 'Emma Vance',
      grade: 'Grade 5',
      school: schoolName || 'Nalanda International School',
      assignedBusId: 'school-sb07',
      busName: 'School Bus 07',
      driverName: 'Thomas Miller'
    }
  });
});

// University Student Auth
app.post('/api/auth/university', (req, res) => {
  const { email, studentId, universityName } = req.body;
  if (!email && !studentId) {
    return res.status(400).json({ error: 'University Email or Student ID required' });
  }
  res.json({
    success: true,
    studentName: 'Alex Rivera',
    university: universityName || 'The Maharaja Sayajirao University of Baroda (MSU)',
    email: email || 'alex.rivera@msubaroda.ac.in',
    studentId: studentId || 'MSU-88401',
    favoriteBusId: 'uni-u01',
    assignedBuses: ['uni-u01', 'uni-u03']
  });
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  res.json({
    passengerDemandByHour: [
      { hour: '06:00', passengers: 420 },
      { hour: '08:00', passengers: 1480 },
      { hour: '10:00', passengers: 920 },
      { hour: '12:00', passengers: 780 },
      { hour: '14:00', passengers: 850 },
      { hour: '16:00', passengers: 1320 },
      { hour: '18:00', passengers: 1650 },
      { hour: '20:00', passengers: 610 }
    ],
    crowdByRoute: [
      { route: 'Station Express', avgOccupancy: 56, capacity: 100 },
      { route: 'Sayajigunj Line', avgOccupancy: 84, capacity: 100 },
      { route: 'Gotri School Bus', avgOccupancy: 63, capacity: 100 },
      { route: 'MSU Campus Shuttle', avgOccupancy: 78, capacity: 100 }
    ],
    emergencyResponseTimes: [
      { category: 'Cardiac / Medical', avgMinutes: 4.2 },
      { category: 'Fire / Rescue', avgMinutes: 5.8 },
      { category: 'Hazard Response', avgMinutes: 6.5 }
    ],
    schoolDeviations: [
      { day: 'Mon', count: 1 },
      { day: 'Tue', count: 0 },
      { day: 'Wed', count: 2 },
      { day: 'Thu', count: 0 },
      { day: 'Fri', count: 1 }
    ],
    kpis: {
      totalActiveVehicles: vehicles.length,
      onTimeRate: '92.4%',
      activeAlerts: alerts.filter(a => !a.resolved).length,
      avgEta: '6.2 min'
    }
  });
});

function getCrowdLevel(occupancy, capacity) {
  const pct = (occupancy / capacity) * 100;
  if (pct <= 40) return { level: 'LOW', color: 'green', text: '🟢 LOW' };
  if (pct <= 75) return { level: 'MODERATE', color: 'yellow', text: '🟡 MODERATE' };
  if (pct <= 100) return { level: 'HIGH', color: 'red', text: '🔴 HIGH' };
  return { level: 'OVERCAPACITY', color: 'black', text: '⚫ OVERCAPACITY' };
}

app.listen(PORT, () => {
  console.log(`🚀 CONVERGE Server (Vadodara) running on http://localhost:${PORT}`);
});
