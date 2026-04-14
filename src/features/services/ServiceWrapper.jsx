// src/features/services/ServiceWrapper.jsx
import { useProviderType } from '../../hooks/useProviderType';

import CarCareServices from '../car-care/services/Services';
import MaintenanceServices from '../maintenance/services/Services';
import EmergencyServices from '../emergency/services/Services';  
import SparePartsProducts from '../spare-parts/products/Products';   // قطع الغيار

const ServiceWrapper = () => {
  const { isCarCare, isMaintenance, isEmergency, isSpareParts } = useProviderType();

  if (isCarCare) {
    return <CarCareServices />;
  }
  if (isMaintenance) {
    return <MaintenanceServices />;
  }
  if (isEmergency) {
    return <EmergencyServices />;
  }
  if (isSpareParts) {
    return <SparePartsProducts />;     // بنستخدم Products مش Services
  }

  return <div>Services page not available for this provider type</div>;
};

export default ServiceWrapper;