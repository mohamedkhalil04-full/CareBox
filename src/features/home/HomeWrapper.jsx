import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviderType } from '../../hooks/useProviderType';

import CarCareHome from '../car-care/dashboard/Home';
import MaintenanceHome from '../maintenance/dashboard/Home';
import EmergencyHome from '../emergency/dashboard/Dashboard';
import SparePartsHome from '../spare-parts/dashboard/Home';

const HomeWrapper = () => {
  const navigate = useNavigate();
  const { isCarCare, isMaintenance, isEmergency, isSpareParts } = useProviderType();

  // فحص صارم للتأكد إن التوكن موجود ومش قيمة نصية وهمية
  const token = localStorage.getItem("token");
  const isAuthenticated = token && token !== "null" && token !== "undefined";

  useEffect(() => {
    // لو مش موثق بشكل صحيح، حوله فوراً لصفحة الـ login واقفل اللوب
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // حماية من الـ Flashing: لو مش مسجل ميعرضش أي حاجة خالص ويوقف الرندر
  if (!isAuthenticated) {
    return null; 
  }

  // التوجيه بناءً على نوع الـ Provider
  if (isCarCare) return <CarCareHome />;
  if (isMaintenance) return <MaintenanceHome />;
  if (isEmergency) return <EmergencyHome />;
  if (isSpareParts) return <SparePartsHome />;

  return (
    <div className="text-center p-5">
      <h3>Welcome to CareBox</h3>
      <p>Please select your provider type to view the dashboard.</p>
    </div>
  );
};

export default HomeWrapper;