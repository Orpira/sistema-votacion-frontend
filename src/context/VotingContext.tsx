import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VotingContextType, Candidato } from '../types/index';
import votingService from '../services/votingService';
import { useAuth } from './AuthContext';

const VotingContext = createContext<VotingContextType | undefined>(undefined);

interface VotingProviderProps {
  children: ReactNode;
}

export const VotingProvider: React.FC<VotingProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar candidatos al montar el componente
  useEffect(() => {
    if (isAuthenticated) {
      fetchCandidatos();
      checkVoteStatus();
    }
  }, [isAuthenticated]);

  const fetchCandidatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await votingService.getCandidatos();
      if (response.success && response.data) {
        setCandidatos(response.data);
      } else {
        setError(response.error || 'Error al cargar candidatos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const checkVoteStatus = async () => {
    try {
      const response = await votingService.checkUserVoteStatus();
      if (response.success && response.data) {
        setHasVoted(response.data.hasVoted);
      }
    } catch (err) {
      console.error('Error al verificar estado del voto:', err);
    }
  };

  const submitVote = async (candidatoId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await votingService.submitVote(candidatoId);
      if (response.success) {
        setHasVoted(true);
      } else {
        setError(response.error || 'Error al registrar voto');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const value: VotingContextType = {
    candidatos,
    hasVoted,
    loading,
    error,
    submitVote,
    fetchCandidatos
  };

  return (
    <VotingContext.Provider value={value}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = (): VotingContextType => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error('useVoting debe ser usado dentro de VotingProvider');
  }
  return context;
};
