import React, { useEffect, useRef, useState } from 'react';

export function ChartWrapper({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Asegurar que estamos en el cliente
    setIsMounted(true);
    
    // Pequeño delay para asegurar que todo esté listo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-800 rounded">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
          <p className="text-sm">Cargando gráfico...</p>
        </div>
      </div>
    );
  }

  return <div className="w-full h-64">{children}</div>;
}
