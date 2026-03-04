import React, { useState, useEffect } from "react";
import { Simpatizante, EstadisticasSimpatizantes, FiltrosDashboard } from "../../types/index";
import FilterPanel from "./FilterPanel";
import GeographicMap from "./GeographicMap";
import StatisticsPanel from "./StatisticsPanel";
import Analytics from "./Analytics";

interface DashboardProps {
  simpatizantes: Simpatizante[];
  onFilterChange: (filters: FiltrosDashboard) => Promise<void>;
}

const Dashboard: React.FC<DashboardProps> = ({ simpatizantes, onFilterChange }) => {
  const [filters, setFilters] = useState<FiltrosDashboard>({
    ciudad: "",
    genero: "",
    rango_edad: "",
  });

  const [stats, setStats] = useState<EstadisticasSimpatizantes>({
    total_simpatizantes: 0,
    distribucion_por_ciudad: {},
    distribucion_por_edad: {},
    distribucion_por_genero: {},
  });

  const applyFilters = (newFilters: FiltrosDashboard) => {
    setFilters(newFilters);
    void onFilterChange(newFilters);
  };

  useEffect(() => {
    if (simpatizantes && simpatizantes.length > 0) {
      const totalSimpatizantes = simpatizantes.length;
      const distribucionPorCiudad: Record<string, number> = {};
      const distribucionPorEdad: Record<string, number> = {};
      const distribucionPorGenero: Record<string, number> = {};

      simpatizantes.forEach((s) => {
        distribucionPorCiudad[s.ciudad] = (distribucionPorCiudad[s.ciudad] || 0) + 1;
        distribucionPorGenero[s.genero] = (distribucionPorGenero[s.genero] || 0) + 1;
        
        // Calculate age range
        const age = calculateAge(s.fechaNacimiento);
        const ageRange = getAgeRange(age);
        distribucionPorEdad[ageRange] = (distribucionPorEdad[ageRange] || 0) + 1;
      });

      setStats({
        total_simpatizantes: totalSimpatizantes,
        distribucion_por_ciudad: distribucionPorCiudad,
        distribucion_por_edad: distribucionPorEdad,
        distribucion_por_genero: distribucionPorGenero,
      });
    }
  }, [simpatizantes]);

  const calculateAge = (fechaNacimiento: Date): number => {
    const now = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getAgeRange = (age: number): string => {
    if (age >= 18 && age <= 25) return "18-25";
    if (age >= 26 && age <= 35) return "26-35";
    if (age >= 36 && age <= 45) return "36-45";
    if (age >= 46 && age <= 55) return "46-55";
    return "56+";
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard de Simpatizantes</h1>
        <p className="text-gray-600">Análisis estadístico de la base de apoyo de la campaña</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <FilterPanel onFilter={applyFilters} currentFilters={filters} />
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-2">Distribución Geográfica</h2>
            <div className="bg-white p-4 rounded shadow">
              <GeographicMap data={stats.distribucion_por_ciudad} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Estadísticas de Simpatizantes</h2>
            <div className="bg-white p-4 rounded shadow">
              <StatisticsPanel stats={stats} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Análisis de Campaña</h2>
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
