import React, { useState, useEffect } from 'react';

export function ClientOnlyWrapper({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="text-white text-center py-4">
        <div className="animate-pulse">Cargando gráfico...</div>
      </div>
    );
  }

  return children;
}
