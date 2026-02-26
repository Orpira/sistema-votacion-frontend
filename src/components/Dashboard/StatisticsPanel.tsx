import React, { useMemo } from "react";
import { EstadisticasVoto, ResultadoCandidato } from "../../types/index";

interface StatisticsPanelProps {
  stats: EstadisticasVoto;
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const getColorForIndex = (index: number): string => COLORS[index % COLORS.length];

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ stats }) => {
  const candidateStats = useMemo<ResultadoCandidato[]>(() => {
    if (!stats.votos_por_candidato) return [];

    const total = Object.values(stats.votos_por_candidato).reduce((sum, votos) => sum + votos, 0);

    return Object.entries(stats.votos_por_candidato)
      .map(([candidatoId, votos]) => ({
        candidatoId,
        votos,
        porcentaje: total > 0 ? ((votos / total) * 100).toFixed(2) : "0",
      }))
      .sort((a, b) => b.votos - a.votos);
  }, [stats.votos_por_candidato]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl">📊</div>
          <div>
            <h4 className="text-sm text-gray-500">Total de Votos</h4>
            <div className="text-xl font-semibold">{stats.total_votos.toLocaleString("es-CO")}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl">📈</div>
          <div>
            <h4 className="text-sm text-gray-500">Participación</h4>
            <div className="text-xl font-semibold">{stats.participacion.toFixed(2)}%</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl">🗳️</div>
          <div>
            <h4 className="text-sm text-gray-500">Candidatos</h4>
            <div className="text-xl font-semibold">{candidateStats.length}</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Resultados por Candidato</h3>
        <div className="space-y-3">
          {candidateStats.length > 0 ? (
            candidateStats.map((candidate, index) => (
              <div key={candidate.candidatoId} className="flex items-center gap-4">
                <div className="w-8 text-sm text-gray-600">{index + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Candidato {candidate.candidatoId}</div>
                    <div className="text-sm text-gray-600">{candidate.votos} votos</div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded mt-2 overflow-hidden">
                    <div style={{ width: `${candidate.porcentaje}%`, backgroundColor: getColorForIndex(index) }} className="h-full"></div>
                  </div>
                </div>
                <div className="w-16 text-right text-sm text-gray-600">{candidate.porcentaje}%</div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Sin datos disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
