import React, { createContext, useContext, useState, useEffect } from 'react';

const INITIAL_VADODARA_VEHICLES = [
  // PUBLIC TRANSPORT (BLUE)
  {
    id: 'bus-p12',
    name: 'Bus P-12',
    code: 'P-12',
    category: 'public',
    type: 'Standard Bus',
    capacity: 50,
    occupancy: 28,
    lat: 22.3072,
    lng: 73.1812,
    heading: 90,
    speed: 34,
    status: 'ACTIVE',
    routeId: 'route-p1',
    routeName: 'Route 12 - Vadodara Station ↔ Alkapuri Express',
    driver: 'Marcus Vance',
    etaMinutes: 6,
    hasDeviation: false,
    lastUpdated: 'Just now',
    stops: ['Vadodara Railway Station', 'Alkapuri Hub', 'RC Dutt Road', 'MS University Campus']
  },
  {
    id: 'bus-p24',
    name: 'Bus P-24',
    code: 'P-24',
    category: 'public',
    type: 'Articulated Bus',
    capacity: 50,
    occupancy: 42,
    lat: 22.3120,
    lng: 73.1870,
    heading: 180,
    speed: 28,
    status: 'ACTIVE',
    routeId: 'route-p2',
    routeName: 'Route 24 - Sayajigunj ↔ Fatehgunj Metro Line',
    driver: 'Elena Rostova',
    etaMinutes: 4,
    hasDeviation: true,
    deviationDistance: '650m',
    deviationDuration: '4 min',
    lastUpdated: 'Just now',
    stops: ['Vadodara Station', 'Sayajigunj Circle', 'Fatehgunj Flyover', 'Airport Circle']
  },
  {
    id: 'bus-p31',
    name: 'Bus P-31',
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
    routeName: 'Route 24 - Old Padra ↔ Akota Alt Express',
    driver: 'David Chen',
    etaMinutes: 8,
    hasDeviation: false,
    recommended: true,
    recommendationReason: 'Bus P-31 arrives 4 min later but has 57% lower crowd density.',
    lastUpdated: 'Just now',
    stops: ['Vadodara Station', 'Alkapuri', 'Old Padra Road', 'Akota Stadium']
  },

  // EMERGENCY VEHICLES (RED)
  {
    id: 'amb-e01',
    name: 'Ambulance E-01',
    code: 'E-01',
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
    emergencyTarget: 'RC Dutt Road Sector 4 (Cardiac Call)',
    lastUpdated: 'Just now'
  },
  {
    id: 'amb-e02',
    name: 'Ambulance E-02',
    code: 'E-02',
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
    routeName: 'Akota Station Standby',
    driver: 'James Holden',
    etaMinutes: 5,
    hasDeviation: false,
    lastUpdated: 'Just now'
  },
  {
    id: 'fire-e03',
    name: 'Fire Truck E-03',
    code: 'E-03',
    category: 'emergency',
    type: 'Heavy Rescue Pumper',
    capacity: 6,
    occupancy: 5,
    lat: 22.3250,
    lng: 73.2050,
    heading: 0,
    speed: 45,
    status: 'ASSIGNED',
    routeId: 'route-e3',
    routeName: 'Karelibaug Industrial Standby',
    driver: 'Captain Robert Shaw',
    etaMinutes: 7,
    hasDeviation: false,
    lastUpdated: 'Just now'
  },

  // MUNICIPAL VEHICLES (ORANGE)
  {
    id: 'muni-m07',
    name: 'Garbage Truck M-07',
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
    name: 'Water Tanker M-11',
    code: 'M-11',
    category: 'municipal',
    type: '10,000L Fleet Sprinkling Water Tanker',
    capacity: 100,
    occupancy: 65,
    lat: 22.2950,
    lng: 73.2300,
    heading: 90,
    speed: 22,
    status: 'ACTIVE',
    routeId: 'route-m2',
    routeName: 'Sayaji Baug Park Irrigation Route',
    driver: 'Ayush Patel',
    etaMinutes: 20,
    hasDeviation: false,
    completedTasks: 12,
    totalTasks: 15,
    missedLocations: [],
    lastUpdated: 'Just now'
  },

  // SCHOOL BUSES (PURPLE)
  {
    id: 'school-sb07',
    name: 'School Bus SB-07',
    code: 'SB-07',
    category: 'school',
    schoolName: 'Gujarat Public School',
    type: 'Type C School Bus',
    capacity: 35,
    occupancy: 22,
    lat: 22.3150,
    lng: 73.1600,
    heading: 135,
    speed: 26,
    status: 'WARNING',
    routeId: 'route-sb7',
    routeName: 'Route 3 - Gotri ↔ Vasna Road Afternoon Drop-off',
    driver: 'Ankit Mehta',
    etaMinutes: 7,
    hasDeviation: true,
    deviationDistance: '650m',
    deviationDuration: '2m 14s',
    upcomingStop: 'Gotri Green Park Stop',
    assignedStudents: ['Emma Watson', 'Lucas Vance', 'Sophia Patel'],
    lastUpdated: 'Just now'
  },
  {
    id: 'school-sb08',
    name: 'School Bus SB-08',
    code: 'SB-08',
    category: 'school',
    schoolName: 'St. Jude Academy Vadodara',
    type: 'Type C School Bus',
    capacity: 35,
    occupancy: 19,
    lat: 22.3080,
    lng: 73.1950,
    heading: 90,
    speed: 30,
    status: 'ACTIVE',
    routeId: 'route-sb8',
    routeName: 'Route 4 - Karelibaug ↔ Station Loop',
    driver: 'Krihna Desai',
    etaMinutes: 9,
    hasDeviation: false,
    upcomingStop: 'Karelibaug Circle Stop',
    assignedStudents: ['Alex Vance', 'Chloe Smith'],
    lastUpdated: 'Just now'
  },

  // UNIVERSITY BUSES (PURPLE)
  {
    id: 'uni-u01',
    name: 'University Bus U-01',
    code: 'U-01',
    category: 'university',
    universityName: 'The Maharaja Sayajirao University of Baroda',
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
    driver: 'Ram',
    etaMinutes: 5,
    hasDeviation: false,
    stops: ['MSU Main Gate', 'Faculty of Tech', 'Science Pavilion', 'Hostel Campus'],
    lastUpdated: 'Just now'
  },
  {
    id: 'uni-u03',
    name: 'University Bus U-03',
    code: 'U-03',
    category: 'university',
    universityName: 'The Maharaja Sayajirao University of Baroda',
    type: 'Campus Shuttle Line B',
    capacity: 40,
    occupancy: 12,
    lat: 22.3280,
    lng: 73.1780,
    heading: 180,
    speed: 29,
    status: 'ACTIVE',
    routeId: 'route-u2',
    routeName: 'Fatehgunj Student Housing ↔ Polytech',
    driver: 'kamna Patel',
    etaMinutes: 11,
    hasDeviation: false,
    stops: ['Fatehgunj Housing', 'University Library', 'Polytech Ground', 'Polytechnic Pavilion'],
    lastUpdated: 'Just now'
  }
];

const MobilityContext = createContext();

export const MobilityProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(INITIAL_VADODARA_VEHICLES);
  const [alerts, setAlerts] = useState([
    {
      id: 'alt-101',
      priority: 'HIGH',
      type: 'ROUTE_DEVIATION',
      category: 'school',
      vehicleId: 'school-sb07',
      vehicleName: 'School Bus SB-07',
      timestamp: '2 minutes ago',
      title: 'School Bus SB-07 Route Deviation Alert',
      description: 'Vehicle SB-07 deviated 650 meters from assigned Route 3 near Gotri Sector, Vadodara.',
      location: 'Lat: 22.3150, Lng: 73.1600',
      resolved: false
    }
  ]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState('passenger');
  const [activeTab, setActiveTab] = useState('public');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  const [parentAuth, setParentAuth] = useState(null);
  const [universityAuth, setUniversityAuth] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch Data from Backend API or fall back to internal client simulation
  const fetchData = async () => {
    try {
      const [vRes, aRes, rRes] = await Promise.all([
        fetch('/api/vehicles'),
        fetch('/api/alerts'),
        fetch('/api/routes')
      ]);

      if (vRes.ok) {
        const data = await vRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setVehicles(data);
        }
      }
      if (aRes.ok) setAlerts(await aRes.json());
      if (rRes.ok) setRoutes(await rRes.json());
    } catch (err) {
      // Internal Client Jitter Simulation Fallback
      setVehicles(prev => prev.map(v => {
        const deltaLat = (Math.random() - 0.48) * 0.0004;
        const deltaLng = (Math.random() - 0.48) * 0.0004;
        return {
          ...v,
          lat: v.lat + deltaLat,
          lng: v.lng + deltaLng,
          lastUpdated: 'Just now'
        };
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Board Ticket Action (+1 Occupancy)
  const boardTicket = async (vehicleId) => {
    try {
      const res = await fetch(`/api/vehicles/${vehicleId}/ticket/board`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        showToast(data.message, 'success');
        fetchData();
        return data;
      }
    } catch (e) {
      setVehicles(prev => prev.map(v => {
        if (v.id === vehicleId && v.occupancy < v.capacity + 5) {
          return { ...v, occupancy: v.occupancy + 1 };
        }
        return v;
      }));
      showToast('Smart Ticket Validated! Passenger Boarded (+1)', 'success');
    }
  };

  // Exit Ticket Action (-1 Occupancy)
  const exitTicket = async (vehicleId) => {
    try {
      const res = await fetch(`/api/vehicles/${vehicleId}/ticket/exit`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        showToast(data.message, 'info');
        fetchData();
        return data;
      }
    } catch (e) {
      setVehicles(prev => prev.map(v => {
        if (v.id === vehicleId && v.occupancy > 0) {
          return { ...v, occupancy: v.occupancy - 1 };
        }
        return v;
      }));
      showToast('Passenger Exit Scanned (-1)', 'info');
    }
  };

  // Trigger Deviation
  const triggerDeviation = async (vehicleId) => {
    try {
      const res = await fetch(`/api/vehicles/${vehicleId}/trigger-deviation`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        showToast(`🚨 Route Deviation Alert triggered for ${data.vehicle.name}`, 'warning');
        fetchData();
        return;
      }
    } catch (e) {
      // Fallback
    }

    setVehicles(prev => prev.map(v => v.id === vehicleId ? { 
      ...v, 
      hasDeviation: true, 
      status: 'WARNING', 
      deviationDistance: '780m',
      lat: v.lat + 0.006,
      lng: v.lng + 0.006
    } : v));

    setAlerts(prev => [
      {
        id: `alt-${Date.now()}`,
        priority: 'HIGH',
        type: 'ROUTE_DEVIATION',
        category: 'public',
        vehicleId: vehicleId,
        vehicleName: 'Bus P-24',
        timestamp: 'Just now',
        title: 'Bus P-24 Route Deviation Detected',
        description: 'Bus P-24 has moved off its scheduled Vadodara route path by 780m.',
        location: 'Vadodara Sector 4',
        resolved: false
      },
      ...prev
    ]);

    showToast('Route Deviation Alert Simulated', 'warning');
  };

  // Resolve Deviation
  const resolveDeviation = async (vehicleId) => {
    try {
      const res = await fetch(`/api/vehicles/${vehicleId}/resolve-deviation`, { method: 'POST' });
      if (res.ok) {
        showToast('Route deviation cleared. Vehicle on normal schedule.', 'success');
        fetchData();
        return;
      }
    } catch (e) {
      // Fallback
    }

    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, hasDeviation: false, status: 'ACTIVE' } : v));
    showToast('Deviation Cleared', 'success');
  };

  // Emergency Dispatch
  const dispatchEmergency = async (locationAddress) => {
    try {
      const res = await fetch('/api/emergency/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationAddress })
      });
      if (res.ok) {
        const data = await res.json();
        showToast(`🚨 ${data.message}`, 'danger');
        fetchData();
        return data;
      }
    } catch (e) {
      showToast('Emergency dispatch sent to nearest available unit!', 'danger');
    }
  };

  // Resolve Alert
  const resolveAlert = async (alertId) => {
    try {
      await fetch(`/api/alerts/${alertId}/resolve`, { method: 'POST' });
      showToast('Alert marked as resolved.', 'success');
      fetchData();
    } catch (e) {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      showToast('Alert resolved.', 'success');
    }
  };

  // School Parent Login Simulation
  const loginParent = async (phone, otp, studentId) => {
    const mock = {
      parentName: 'Sarah Vance',
      phone,
      student: {
        studentId: studentId || 'STU-9924',
        name: 'Emma Vance',
        grade: 'Grade 5',
        school: 'St. Jude Academy Vadodara',
        assignedBusId: 'school-sb07',
        busName: 'School Bus SB-07',
        driverName: 'Thomas Miller'
      }
    };
    setParentAuth(mock);
    showToast('Parent Security Verified!', 'success');
    return mock;
  };

  // University Login Simulation
  const loginUniversity = async (email, studentId) => {
    const mock = {
      studentName: 'Alex Rivera',
      university: 'The Maharaja Sayajirao University of Baroda',
      email: email || 'alex.rivera@msubaroda.ac.in',
      studentId: studentId || 'MSU-88401',
      favoriteBusId: 'uni-u01',
      assignedBuses: ['uni-u01', 'uni-u03']
    };
    setUniversityAuth(mock);
    showToast('Student SSO Authenticated!', 'success');
    return mock;
  };

  return (
    <MobilityContext.Provider value={{
      vehicles,
      alerts,
      routes,
      loading,
      activeRole,
      setActiveRole,
      activeTab,
      setActiveTab,
      selectedVehicle,
      setSelectedVehicle,
      parentAuth,
      setParentAuth,
      universityAuth,
      setUniversityAuth,
      toast,
      showToast,
      boardTicket,
      exitTicket,
      triggerDeviation,
      resolveDeviation,
      dispatchEmergency,
      resolveAlert,
      loginParent,
      loginUniversity
    }}>
      {children}
    </MobilityContext.Provider>
  );
};

export const useMobility = () => useContext(MobilityContext);
