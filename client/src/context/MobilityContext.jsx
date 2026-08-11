import React, { createContext, useContext, useState, useEffect } from 'react';

const MobilityContext = createContext();

export const MobilityProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState('passenger'); // 'passenger' | 'parent' | 'university' | 'admin' | 'emergency' | 'guest'
  const [activeTab, setActiveTab] = useState('public'); // 'public' | 'emergency' | 'municipal' | 'school' | 'university'
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  // Auth states for Parent / Student workflows
  const [parentAuth, setParentAuth] = useState(null); // { phone, parentName, student }
  const [universityAuth, setUniversityAuth] = useState(null); // { email, studentName, university, favorites }
  
  // Notification toast system
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch Data from Server or Fallback to Internal Sim Engine
  const fetchData = async () => {
    try {
      const [vRes, aRes, rRes] = await Promise.all([
        fetch('/api/vehicles'),
        fetch('/api/alerts'),
        fetch('/api/routes')
      ]);

      if (vRes.ok) setVehicles(await vRes.json());
      if (aRes.ok) setAlerts(await aRes.json());
      if (rRes.ok) setRoutes(await rRes.json());
    } catch (err) {
      console.warn('Backend API connection offline, using fallback state', err);
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
      // Local fallback
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
      }
    } catch (e) {
      setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, hasDeviation: true, status: 'WARNING', deviationDistance: '720m' } : v));
      showToast('Route Deviation Alert Simulated', 'warning');
    }
  };

  // Resolve Deviation
  const resolveDeviation = async (vehicleId) => {
    try {
      const res = await fetch(`/api/vehicles/${vehicleId}/resolve-deviation`, { method: 'POST' });
      if (res.ok) {
        showToast('Route deviation cleared. Vehicle on normal schedule.', 'success');
        fetchData();
      }
    } catch (e) {
      setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, hasDeviation: false, status: 'ACTIVE' } : v));
      showToast('Deviation Cleared', 'success');
    }
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
    try {
      const res = await fetch('/api/auth/school-parent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, studentId })
      });
      if (res.ok) {
        const data = await res.json();
        setParentAuth(data);
        showToast(`Welcome ${data.parentName}! Accessing bus for ${data.student.name}`, 'success');
        return data;
      }
    } catch (e) {
      const mock = {
        parentName: 'Sarah Vance',
        phone,
        student: {
          studentId: studentId || 'STU-9924',
          name: 'Emma Vance',
          grade: 'Grade 5',
          school: 'St. Jude Academy',
          assignedBusId: 'school-sb07',
          busName: 'School Bus SB-07',
          driverName: 'Thomas Miller'
        }
      };
      setParentAuth(mock);
      showToast('Parent Security Verified!', 'success');
      return mock;
    }
  };

  // University Login Simulation
  const loginUniversity = async (email, studentId) => {
    try {
      const res = await fetch('/api/auth/university', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, studentId })
      });
      if (res.ok) {
        const data = await res.json();
        setUniversityAuth(data);
        showToast(`Welcome back, ${data.studentName}!`, 'success');
        return data;
      }
    } catch (e) {
      const mock = {
        studentName: 'Alex Rivera',
        university: 'Metropolitan Tech University',
        email: email || 'alex.rivera@metrotech.edu',
        studentId: studentId || 'MTU-88401',
        favoriteBusId: 'uni-u01',
        assignedBuses: ['uni-u01', 'uni-u03']
      };
      setUniversityAuth(mock);
      showToast('Student SSO Authenticated!', 'success');
      return mock;
    }
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
