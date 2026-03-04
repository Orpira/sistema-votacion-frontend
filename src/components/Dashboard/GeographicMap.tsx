import React, { useEffect, useState } from "react";

interface MapItem {
  ciudad: string;
  simpatizantes: number;
  porcentaje: string;
}

interface GeographicMapProps {
  data: Record<string, number>;
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"];
const getColorForIndex = (index: number): string => COLORS[index % COLORS.length];

const GeographicMap: React.FC<GeographicMapProps> = ({ data }) => {
  const [mapData, setMapData] = useState<MapItem[]>([]);

  useEffect(() => {
    if (data) {
      const sortedData = Object.entries(data)
        .map(([ciudad, count]) => ({ ciudad, simpatizantes: count, porcentaje: "0" }))
        .sort((a, b) => b.simpatizantes - a.simpatizantes);

      const total = sortedData.reduce((sum, item) => sum + item.simpatizantes, 0);
      setMapData(
        sortedData.map((item) => ({
          ...item,
          porcentaje: total > 0 ? ((item.simpatizantes / total) * 100).toFixed(2) : "0",
        }))
      );
    }
  }, [data]);

  const maxSimpatizantes = Math.max(...mapData.map((item) => item.simpatizantes), 1);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-3">Simpatizantes por Ciudad</h4>
        <div className="space-y-3">
          {mapData.length > 0 ? (
            mapData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm capitalize">{item.ciudad.replace("-", " ")}</span>
                  <span className="text-xs text-gray-600">{item.simpatizantes} ({item.porcentaje}%)</span>
                </div>
                <div className="h-6 bg-gray-100 rounded overflow-hidden">
                  <div
                    style={{
                      width: `${(item.simpatizantes / maxSimpatizantes) * 100}%`,
                      backgroundColor: getColorForIndex(index),
                    }}
                    className="h-full flex items-center justify-end px-2 text-white text-xs font-semibold"
                  >
                    {(item.simpatizantes / maxSimpatizantes) * 100 > 10 && item.porcentaje}%
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No hay datos disponibles. ¡Registra simpatizantes para ver estadísticas!</p>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-3">Distribución por Ciudad</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {mapData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getColorForIndex(index) }}></div>
              <span className="capitalize">{item.ciudad.replace("-", " ")}: {item.simpatizantes} simpatizantes</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographicMap;
