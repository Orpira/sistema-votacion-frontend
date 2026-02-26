import React, { useState, useEffect } from "react";
import { Voto, EstadisticasVoto, FiltrosDashboard } from "../../types/index";
import FilterPanel from "./FilterPanel";
import GeographicMap from "./GeographicMap";
import StatisticsPanel from "./StatisticsPanel";
import Analytics from "./Analytics";

interface DashboardProps {
  votingData: Voto[];
  onFilterChange: (filters: FiltrosDashboard) => Promise<void>;
}

const Dashboard: React.FC<DashboardProps> = ({ votingData, onFilterChange }) => {
  const [filters, setFilters] = useState<FiltrosDashboard>({
    municipio: "",
    genero: "",
    rango_edad: "",
    partido: "",
  });

  const [stats, setStats] = useState<EstadisticasVoto>({
    total_votos: 0,
    participacion: 0,
    votos_por_candidato: {},
    distribucion_geografica: {},
  });

  const applyFilters = (newFilters: FiltrosDashboard) => {
    setFilters(newFilters);
    void onFilterChange(newFilters);
  };

  useEffect(() => {
    if (votingData && votingData.length > 0) {
      const totalVotos = votingData.length;
      const votosPorCandidato: Record<string, number> = {};
      const distribucionGeografica: Record<string, number> = {};

      votingData.forEach((vote) => {
        votosPorCandidato[vote.candidato_id] = (votosPorCandidato[vote.candidato_id] || 0) + 1;
        distribucionGeografica[vote.municipio] = (distribucionGeografica[vote.municipio] || 0) + 1;
      });

      setStats({
        total_votos: totalVotos,
        participacion: (totalVotos / 5000000) * 100,
        votos_por_candidato: votosPorCandidato,
        distribucion_geografica: distribucionGeografica,
      });
    }
  }, [votingData]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard de Análisis</h1>
        <p className="text-gray-600">Visualiza los resultados en tiempo real</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <FilterPanel onFilter={applyFilters} currentFilters={filters} />
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-2">Resultados Geográficos</h2>
            <div className="bg-white p-4 rounded shadow">
              <GeographicMap data={stats.distribucion_geografica} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Estadísticas Generales</h2>
            <div className="bg-white p-4 rounded shadow">
              <StatisticsPanel stats={stats} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Análisis Automático</h2>
            <div className="bg-white p-4 rounded shadow">
              <Analytics stats={stats} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
