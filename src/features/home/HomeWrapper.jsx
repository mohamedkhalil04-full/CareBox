// src/features/home/HomeWrapper.jsx
import { useProviderType } from '../../hooks/useProviderType';

import CarCareHome from '../car-care/dashboard/Home';
import MaintenanceHome from '../maintenance/dashboard/Home';
import EmergencyHome from '../emergency/dashboard/Home';
import SparePartsHome from '../spare-parts/dashboard/Home';

const HomeWrapper = () => {
  const { isCarCare, isMaintenance, isEmergency, isSpareParts } = useProviderType();

  if (isCarCare) {
    return <CarCareHome />;
  }
  if (isMaintenance) {
    return <MaintenanceHome />;
  }
  if (isEmergency) {
    return <EmergencyHome />;
  }
  if (isSpareParts) {
    return <SparePartsHome />;
  }

  // fallback لو مفيش نوع محدد
  return (
    <div className="text-center p-5">
      <h3>Welcome to CareBox</h3>
      <p>Please select your provider type to view the dashboard.</p>
    </div>
  );
};

export default HomeWrapper;