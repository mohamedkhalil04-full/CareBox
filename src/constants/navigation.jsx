// مسارات السايد بار

import { PROVIDER_TYPES } from './providerTypes';  

export const getSidebarItems = (providerType) => {
  // العناصر المشتركة بين الجميع
  const commonItems = [
    { 
      path: "/home", 
      label: "Home", 
      icon: "fa-regular fa-house" 
    },
    { 
      path: "/invoices", 
      label: "Invoices", 
      icon: "fa-solid fa-file-invoice" 
    },
    { 
      path: "/clients", 
      label: "Clients", 
      icon: "fa-solid fa-users" 
    },
    { 
      path: "/reviews", 
      label: "Reviews", 
      icon: "fa-regular fa-star" 
    },
    { 
      path: "/profile", 
      label: "Profile", 
      icon: "fa-regular fa-user" 
    },
    { 
      path: "/about", 
      label: "About Us", 
      icon: "fa-solid fa-award" 
    },
    { 
      path: "/settings", 
      label: "Settings", 
      icon: "fa-solid fa-gear" 
    },
    
  ];
  switch (providerType) {
    case PROVIDER_TYPES.CAR_CARE:        // مغسلة 
      return [
        ...commonItems.slice(0, 1), // Home
        { path: "/bookings", label: "Bookings", icon: "fa-regular fa-calendar" },
        { path: "/services", label: "Services", icon: "fa-solid fa-wrench" },
        ...commonItems.slice(1), // Profile, Settings, About
      ];

    case PROVIDER_TYPES.MAINTENANCE:     // صيانة
      return [
        ...commonItems.slice(0, 1),
        { path: "/bookings", label: "Bookings", icon: "fa-regular fa-calendar" },
        { path: "/services", label: "Services", icon: "fa-solid fa-wrench" },
        ...commonItems.slice(1),
      ];

    case PROVIDER_TYPES.EMERGENCY:       // طوارئ
      return [
        ...commonItems.slice(0, 1),
        { path: "/bookings", label: "Emergency Requests", icon: "fa-solid fa-truck-medical" },
        { path: "/services", label: "Emergency Services", icon: "fa-solid fa-wrench" },
        ...commonItems.slice(1),
      ];

    case PROVIDER_TYPES.SPARE_PARTS:     // قطع غيار
      return [
        ...commonItems.slice(0, 1),
        // { path: "/orders", label:"Orders",icon:""}
        { path: "/services", label: "Products", icon: "fa-solid fa-gears" },
        ...commonItems.slice(1),
      ];

    default:
      return commonItems;
  }
};