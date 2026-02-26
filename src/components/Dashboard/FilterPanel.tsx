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
      municipio: "",
      genero: "",
      rango_edad: "",
      partido: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Filtros</h3>

      <div className="space-y-3">
        <div>
          <label htmlFor="municipio" className="block text-sm font-medium text-gray-700">Municipio</label>
          <select id="municipio" name="municipio" value={filters.municipio} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300">
            <option value="">Todos</option>
            <option value="bogota">Bogotá</option>
            <option value="medellin">Medellín</option>
            <option value="cali">Cali</option>
            <option value="barranquilla">Barranquilla</option>
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

        <div>
          <label htmlFor="partido" className="block text-sm font-medium text-gray-700">Partido</label>
          <select id="partido" name="partido" value={filters.partido} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300">
            <option value="">Todos</option>
            <option value="partido-a">Partido A</option>
            <option value="partido-b">Partido B</option>
            <option value="partido-c">Partido C</option>
            <option value="independiente">Independiente</option>
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
