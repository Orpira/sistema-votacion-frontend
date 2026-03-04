import React, { useState, ChangeEvent } from "react";
import { FiltrosDashboard } from "../../types/index";

interface FilterPanelProps {
  onFilter: (filters: FiltrosDashboard) => void;
  currentFilters: FiltrosDashboard;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter, currentFilters }) => {
  const [filters, setFilters] = useState<FiltrosDashboard>(currentFilters);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters: FiltrosDashboard = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FiltrosDashboard = {
      ciudad: "",
      genero: "",
      rango_edad: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Filtros</h3>

      <div className="space-y-3">
        <div>
          <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Ciudad</label>
          <select id="ciudad" name="ciudad" value={filters.ciudad} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300">
            <option value="">Todas</option>
            <option value="bucaramanga">Bucaramanga</option>
            <option value="floridablanca">Floridablanca</option>
            <option value="giron">Girón</option>
            <option value="piedecuesta">Piedecuesta</option>
            <option value="barrancabermeja">Barrancabermeja</option>
            <option value="san-gil">San Gil</option>
            <option value="socorro">Socorro</option>
            <option value="barbosa">Barbosa</option>
            <option value="otra">Otra ciudad</option>
          </select>
        </div>

        <div>
          <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género</label>
          <select id="genero" name="genero" value={filters.genero} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300">
            <option value="">Todos</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="rango_edad" className="block text-sm font-medium text-gray-700">Rango de Edad</label>
          <select id="rango_edad" name="rango_edad" value={filters.rango_edad} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300">
            <option value="">Todos</option>
            <option value="18-25">18-25 años</option>
            <option value="26-35">26-35 años</option>
            <option value="36-45">36-45 años</option>
            <option value="46-55">46-55 años</option>
            <option value="56+">56+ años</option>
          </select>
        </div>

        <div className="pt-2">
          <button onClick={handleReset} className="w-full py-2 bg-gray-100 rounded hover:bg-gray-200">Limpiar Filtros</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
