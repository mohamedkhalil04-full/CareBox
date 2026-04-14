// the context
import React, { createContext, useContext, useState, useMemo } from 'react';

const ProviderContext = createContext();

export const ProviderProvider = ({ children }) => {
  var [providerType, setProviderType] = useState(()=>{
 // Lazy initialization من localStorage عشان يشتغل من أول تحميل
    return localStorage.getItem('providerType') || null;
  });

  const setProvider = (type) => {
    setProviderType(type);
    localStorage.setItem('providerType', type);
  };

  const clearProvider = () => {
    setProviderType(null);
    localStorage.removeItem('providerType');
  };

  // استخدام useMemo عشان الـ value يكون ثابت (نفس الـ reference) طالما providerType ما تغيرش
  const value = useMemo(() => ({
    providerType,
    setProvider,
    clearProvider
  }), [providerType]);

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
};
  

export const UseProvider = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error('useProvider must be used within ProviderProvider');
  }
  return context;
};

