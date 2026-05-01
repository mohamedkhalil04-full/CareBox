import { UseProvider } from '../context/providerContext.jsx';

export const useProviderType = () => {
  const { providerType } = UseProvider();
  const isCarCare = providerType === "Car Care";
  const isMaintenance = providerType === "Maintenance";
  const isEmergency = providerType === "Emergency";
  const isSpareParts = providerType === "Spare Parts";// هتصدقني لو قولتك ان المشكلة كانت في حرف

  
  // ألوان كل نوع
  const getColor = () => {
    if (isSpareParts)  return "#0f172a";   // الداكن الجديد لقطع الغيار
  };
  // // Normalize the string to avoid small differences
  // const normalizedType = providerType ? providerType.trim() : "";
  // const isCarCare = normalizedType === "Car Care";
  // const isMaintenance = normalizedType === "Maintenance";
  // const isEmergency = normalizedType === "Emergency";
  // const isSpareParts = 
  //   normalizedType === "Spare parts and accessories" ||
  //   normalizedType === "Spare Parts" ||
  //   normalizedType === "spare parts" ||
  //   normalizedType.toLowerCase().includes("spare");

  return {
    // providerType:normalizedType,
    providerType,
    isCarCare,
    isMaintenance,
    isEmergency,
    isSpareParts,
    color: getColor(),
    isDarkTheme: isSpareParts,
  };
};
