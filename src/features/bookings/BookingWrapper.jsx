// src/features/bookings/BookingWrapper.jsx
import { useProviderType } from '../../hooks/useProviderType';

import CarCareBookings from '../car-care/bookings/Bookings';
import MaintenanceBookings from '../maintenance/bookings/Bookings';
import SparePartsBookings from '../spare-parts/bookings/Bookings';

const BookingWrapper = () => {
  const { isCarCare, isMaintenance, isSpareParts } = useProviderType();

  if (isCarCare) {
    return <CarCareBookings />;
  }
  if (isMaintenance) {
    return <MaintenanceBookings />;
  }
  if (isSpareParts) {
    return <SparePartsBookings />;
  }

  // fallback
  return <div>Bookings page not available for this provider type</div>;
};

export default BookingWrapper;