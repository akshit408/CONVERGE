import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Data Store with Realistic Initial Mobility Data
let vehicles = [
  // PUBLIC TRANSPORT
  {
    id: 'bus-p12',
    name: 'Bus P-12',
    category: 'public',
    type: 'Standard Bus',
    capacity: 50,
    occupancy: 28,
    lat: 37.7749,
    lng: -122.4194,
    heading: 90,
    speed: 34,
    status: 'ACTIVE',
    routeId: 'route-p1',
    routeName: 'Route 12 - Downtown Express',
    driver: 'Marcus Vance',
    etaMinutes: 6,
    hasDeviation: false,
    stops: ['Central Station', 'Financial District', 'City Hall', 'University Plaza']
  },
  {
    id: 'bus-p24',
    name: 'Bus P-24',
    category: 'public',
    type: 'Articulated Bus',
    capacity: 50,
    occupancy: 42,
    lat: 37.7833,
    lng: -122.4167,
    heading: 180,
    speed: 28,
    status: 'ACTIVE',
    routeId: 'route-p2',
    routeName: 'Route 24 - Metro Corridor',
    driver: 'Elena Rostova',
    etaMinutes: 4,
    hasDeviation: true,
    deviationDistance: '650m',
    deviationDuration: '4 min',
    stops: ['Central Station', 'Market Street', 'Tech Hub', 'Westside Mall']
  },
  {
    id: 'bus-p31',
    name: 'Bus P-31',
    category: 'public',
    type: 'Electric Transit Bus',
    capacity: 50,
    occupancy: 18,
    lat: 37.7695,
    lng: -122.4250,
    heading: 45,
    speed: 38,
    status: 'ACTIVE',
    routeId: 'route-p2',
    routeName: 'Route 24 - Metro Corridor (Alt Express)',
    driver: 'David Chen',
    etaMinutes: 8,
    hasDeviation: false,
    recommended: true,
    recommendationReason: 'Bus P-31 arrives 4 min later but has 57% lower crowd density.',
    stops: ['Central Station', 'Market Street', 'Tech Hub', 'Westside Mall']
  },

  // EMERGENCY VEHICLES
  {
    id: 'amb-e01',
    name: 'Ambulance E-01',
    category: 'emergency',
    type: 'Advanced Life Support Ambulance',
    capacity: 2,
    occupancy: 1,
    lat: 37.7850,
    lng: -122.4080,
    heading: 270,
    speed: 58,
    status: 'RESPONDING',
    routeId: 'route-e1',
    routeName: 'Emergency Response Alpha',
    driver: 'Dr. Sarah Connor (Paramedic Lead)',
    etaMinutes: 3,
    hasDeviation: false,
    emergencyTarget: '742 Evergreen Terrace (Cardiac Event)'
  },
  {
    id: 'amb-e02',
    name: 'Ambulance E-02',
    category: 'emergency',
    type: 'Basic Life Support Ambulance',
    capacity: 2,
    occupancy: 0,
    lat: 37.7600,
    lng: -122.4350,
    heading: 120,
    speed: 0,
    status: 'AVAILABLE',
    routeId: 'route-e2',
    routeName: 'Station 4 Standby',
    driver: 'James Holden',
    etaMinutes: 5,
    hasDeviation: false
  },
  {
    id: 'fire-e03',
    name: 'Fire Truck E-03',
    category: 'emergency',
    type: 'Heavy Rescue Pumper',
    capacity: 6,
    occupancy: 5,
    lat: 37.7780,
    lng: -122.4300,
    heading: 0,
    speed: 45,
    status: 'ASSIGNED',
    routeId: 'route-e3',
    routeName: 'Zone 3 Industrial Dispatch',
    driver: 'Captain Robert Shaw',
    etaMinutes: 7,
    hasDeviation: false
  },

  // MUNICIPAL VEHICLES
  {
    id: 'muni-m07',
    name: 'Garbage Truck M-07',
    category: 'municipal',
    type: 'Automated Side Loader',
    capacity: 10,
    occupancy: 7,
    lat: 37.7650,
    lng: -122.4100,
    heading: 190,
    speed: 18,
    status: 'WARNING',
    routeId: 'route-m1',
    routeName: 'Municipal Solid Waste Zone A',
    driver: 'Carlos Mendez',
    etaMinutes: 15,
    hasDeviation: true,
    deviationDistance: '420m',
    completedTasks: 18,
    totalTasks: 24,
    missedLocations: ['Oak & 5th St Bin #4']
  },
  {
    id: 'muni-m11',
    name: 'Water Tanker M-11',
    category: 'municipal',
    type: '10,000L Fleet Sprinkling Tanker',
    capacity: 100,
    occupancy: 65,
    lat: 37.7550,
    lng: -122.4200,
    heading: 90,
    speed: 22,
    status: 'ACTIVE',
    routeId: 'route-m2',
    routeName: 'Civic Park Irrigation Route',
    driver: 'Arthur Pendelton',
    etaMinutes: 20,
    hasDeviation: false,
    completedTasks: 12,
    totalTasks: 15,
    missedLocations: []
  },

  // EDUCATION - SCHOOL
  {
    id: 'school-sb07',
    name: 'School Bus SB-07',
    category: 'school',
    schoolName: 'St. Jude Academy',
    type: 'Type C School Bus',
    capacity: 35,
    occupancy: 22,
    lat: 37.7710,
    lng: -122.4400,
    heading: 135,
    speed: 26,
    status: 'WARNING',
    routeId: 'route-sb7',
    routeName: 'Route 3 - Green Park Afternoon Drop-off',
    driver: 'Thomas Miller',
    etaMinutes: 7,
    hasDeviation: true,
    deviationDistance: '650m',
    deviationDuration: '2m 14s',
    upcomingStop: 'Green Park Stop',
    assignedStudents: ['Emma Watson', 'Lucas Vance', 'Sophia Patel']
  },

  // EDUCATION - UNIVERSITY
  {
    id: 'uni-u01',
    name: 'University Bus U-01',
    category: 'university',
    universityName: 'Metropolitan Tech University',
    type: 'Campus Shuttle Electric Express',
    capacity: 40,
    occupancy: 31,
    lat: 37.7790,
    lng: -122.4480,
    heading: 270,
    speed: 32,
    status: 'ACTIVE',
    routeId: 'route-u1',
    routeName: 'North Campus ↔ Quad Loop',
    driver: 'Rachel Adams',
    etaMinutes: 5,
    hasDeviation: false,
    stops: ['North Dorms', 'Engineering Hub', 'Central Quad', 'Science Labs']
  },
  {
    id: 'uni-u03',
    name: 'University Bus U-03',
    category: 'university',
    universityName: 'Metropolitan Tech University',
    type: 'Campus Shuttle Line B',
    capacity: 40,
    occupancy: 12,
    lat: 37.7730,
    lng: -122.4550,
    heading: 180,
    speed: 29,
    status: 'ACTIVE',
    routeId: 'route-u2',
    routeName: 'South Housing ↔ Innovation Center',
    driver: 'Gregory House',
    etaMinutes: 11,
    hasDeviation: false,
    stops: ['South Housing', 'Library Plaza', 'Athletic Complex', 'Innovation Hub']
  }
];

let alerts = [
  {
    id: 'alt-101',
    priority: 'HIGH',
    type: 'ROUTE_DEVIATION',
    category: 'school',
    vehicleId: 'school-sb07',
    vehicleName: 'School Bus SB-07',
    timestamp: '2 minutes ago',
    title: 'School Bus SB-07 Route Deviation Alert',
    description: 'Vehicle SB-07 deviated 650 meters from assigned Route 3 near Green Park Sector.',
    location: 'Lat: 37.7710, Lng: -122.4400',
    resolved: false
  },
  {
    id: 'alt-102',
    priority: 'CRITICAL',
    type: 'EMERGENCY_DISPATCH',
    category: 'emergency',
    vehicleId: 'amb-e01',
    vehicleName: 'Ambulance E-01',
    timestamp: '5 minutes ago',
    title: 'Active Emergency Response Unit Dispatched',
    description: 'Ambulance E-01 responding to priority cardiac call at 742 Evergreen Terrace.',
    location: 'Lat: 37.7850, Lng: -122.4080',
    resolved: false
  },
  {
    id: 'alt-103',
    priority: 'MEDIUM',
    type: 'HIGH_CROWD',
    category: 'public',
    vehicleId: 'bus-p24',
    vehicleName: 'Bus P-24',
    timestamp: '12 minutes ago',
    title: 'High Passenger Capacity Threshold Reached',
    description: 'Bus P-24 occupancy reached 84% (42/50 capacity). Smart recommendation pushed to passengers for Bus P-31.',
    location: 'Market Street Hub',
    resolved: false
  }
];

let routes = [
  {
    id: 'route-p1',
    name: 'Route 12 - Downtown Express',
    category: 'public',
    assignedVehicle: 'Bus P-12',
    schedule: 'Every 10 mins',
    stops: ['Central Station', 'Financial District', 'City Hall', 'University Plaza'],
    status: 'NORMAL'
  },
  {
    id: 'route-p2',
    name: 'Route 24 - Metro Corridor',
    category: 'public',
    assignedVehicle: 'Bus P-24 & Bus P-31',
    schedule: 'Every 8 mins',
    stops: ['Central Station', 'Market Street', 'Tech Hub', 'Westside Mall'],
    status: 'DEVIATED'
  },
  {
    id: 'route-sb7',
    name: 'Route 3 - Green Park Afternoon Drop-off',
    category: 'school',
    assignedVehicle: 'School Bus SB-07',
    schedule: 'Daily 15:30 Drop-off',
    stops: ['St. Jude Academy', 'Maple Avenue', 'Green Park Stop', 'Sunset Heights'],
    status: 'DEVIATED'
  },
  {
    id: 'route-u1',
    name: 'North Campus ↔ Quad Loop',
    category: 'university',
    assignedVehicle: 'University Bus U-01',
    schedule: 'Continuous Shuttle (5 min loop)',
    stops: ['North Dorms', 'Engineering Hub', 'Central Quad', 'Science Labs'],
    status: 'NORMAL'
  }
];

// Continuous Backend Vehicle Movement & Simulation Loop
setInterval(() => {
  vehicles.forEach(v => {
    // Subtle GPS Jitter & Movement
    const deltaLat = (Math.random() - 0.48) * 0.0008;
    const deltaLng = (Math.random() - 0.48) * 0.0008;
    v.lat += deltaLat;
    v.lng += deltaLng;

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
  res.json({ status: 'OK', system: 'CONVERGE Mobility Backend', timestamp: new Date() });
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

  const newAlert = {
    id: `alt-${Date.now()}`,
    priority: 'HIGH',
    type: 'ROUTE_DEVIATION',
    category: vehicle.category,
    vehicleId: vehicle.id,
    vehicleName: vehicle.name,
    timestamp: 'Just now',
    title: `${vehicle.name} Route Deviation Detected`,
    description: `${vehicle.name} has moved off its scheduled path by ${vehicle.deviationDistance}.`,
    location: `Lat: ${vehicle.lat.toFixed(4)}, Lng: ${vehicle.lng.toFixed(4)}`,
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
  // Find nearest available ambulance
  const availableAmbs = vehicles.filter(v => v.category === 'emergency' && v.status === 'AVAILABLE');
  const targetUnit = availableAmbs[0] || vehicles.find(v => v.id === 'amb-e02');

  if (targetUnit) {
    targetUnit.status = 'RESPONDING';
    targetUnit.emergencyTarget = locationAddress || 'High-Priority Emergency Location';
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
      description: `Dispatched to ${targetUnit.emergencyTarget} with live priority sirens active.`,
      location: locationAddress || 'City Emergency Sector',
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
  const { phone, otp, studentId } = req.body;
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
      school: 'St. Jude Academy',
      assignedBusId: 'school-sb07',
      busName: 'School Bus SB-07',
      driverName: 'Thomas Miller'
    }
  });
});

// University Student Auth
app.post('/api/auth/university', (req, res) => {
  const { email, studentId } = req.body;
  if (!email && !studentId) {
    return res.status(400).json({ error: 'University Email or Student ID required' });
  }
  res.json({
    success: true,
    studentName: 'Alex Rivera',
    university: 'Metropolitan Tech University',
    email: email || 'alex.rivera@metrotech.edu',
    studentId: studentId || 'MTU-88401',
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
      { route: 'Route 12 (Downtown)', avgOccupancy: 56, capacity: 100 },
      { route: 'Route 24 (Metro)', avgOccupancy: 84, capacity: 100 },
      { route: 'Route 3 (School)', avgOccupancy: 63, capacity: 100 },
      { route: 'Campus Shuttle U1', avgOccupancy: 78, capacity: 100 }
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
  console.log(`🚀 CONVERGE Server running on http://localhost:${PORT}`);
});
