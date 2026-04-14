import { UseProvider } from '../context/ProviderContext';

export const useProviderType = () => {
  const { providerType } = UseProvider();
  const isCarCare = providerType === "Car Care";
  const isMaintenance = providerType === "Maintenance";
  const isEmergency = providerType === "Emergency";
  const isSpareParts = providerType === "Spare parts and accessories";

  const getColor = () => {
    if (isCarCare) return "#dc3545";
    if (isMaintenance) return "#343a40";
    if (isEmergency) return "#fd7e14";
    if (isSpareParts) return "#198754";
    return "#6c757d";
  };

  return {
    providerType,
    isCarCare,
    isMaintenance,
    isEmergency,
    isSpareParts,
    color: getColor(),
  };
};
