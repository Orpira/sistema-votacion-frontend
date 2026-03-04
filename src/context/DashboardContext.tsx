import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DashboardContextType, Simpatizante, EstadisticasSimpatizantes, FiltrosDashboard } from '../types/index';
import dashboardService from '../services/dashboardService';
import { useAuth } from './AuthContext';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [simpatizantes, setSimpatizantes] = useState<Simpatizante[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasSimpatizantes>({
    total_simpatizantes: 0,
    distribucion_por_ciudad: {},
    distribucion_por_edad: {},
    distribucion_por_genero: {}
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    if (isAuthenticated) {
      fetchSimpatizantes();
    }
  }, [isAuthenticated]);

  const fetchSimpatizantes = async (filters?: FiltrosDashboard) => {
    setLoading(true);
    setError(null);
    try {
      // Obtener simpatizantes
      const simpatizantesResponse = await dashboardService.getAllSimpatizantes(filters);
      if (simpatizantesResponse.success && simpatizantesResponse.data) {
        setSimpatizantes(simpatizantesResponse.data);
      } else {
        setError(simpatizantesResponse.error || 'Error al cargar simpatizantes');
      }

      // Obtener estadísticas
      const statsResponse = await dashboardService.getStatistics();
      if (statsResponse.success && statsResponse.data) {
        setEstadisticas(statsResponse.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const value: DashboardContextType = {
    simpatizantes,
    estadisticas,
    loading,
    error,
    fetchSimpatizantes
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard debe ser usado dentro de DashboardProvider');
  }
  return context;
};
