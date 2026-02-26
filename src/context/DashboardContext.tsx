import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DashboardContextType, Voto, EstadisticasVoto, FiltrosDashboard } from '../types/index';
import dashboardService from '../services/dashboardService';
import { useAuth } from './AuthContext';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [votingData, setVotingData] = useState<Voto[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasVoto>({
    total_votos: 0,
    participacion: 0,
    votos_por_candidato: {},
    distribucion_geografica: {}
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    if (isAuthenticated) {
      fetchVotingData();
    }
  }, [isAuthenticated]);

  const fetchVotingData = async (filters?: FiltrosDashboard) => {
    setLoading(true);
    setError(null);
    try {
      // Obtener votos
      const votesResponse = await dashboardService.getAllVotes(filters);
      if (votesResponse.success && votesResponse.data) {
        setVotingData(votesResponse.data);
      } else {
        setError(votesResponse.error || 'Error al cargar votos');
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
    votingData,
    estadisticas,
    loading,
    error,
    fetchVotingData
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
