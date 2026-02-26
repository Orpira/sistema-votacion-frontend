import React, { useEffect, useState } from "react";

interface MapItem {
  municipio: string;
  votos: number;
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
        .map(([municipio, count]) => ({ municipio, votos: count, porcentaje: "0" }))
        .sort((a, b) => b.votos - a.votos);

      const total = sortedData.reduce((sum, item) => sum + item.votos, 0);
      setMapData(
        sortedData.map((item) => ({
          ...item,
          porcentaje: total > 0 ? ((item.votos / total) * 100).toFixed(2) : "0",
        }))
      );
    }
  }, [data]);

  const maxVotos = Math.max(...mapData.map((item) => item.votos), 1);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="space-y-3">
          {mapData.length > 0 ? (
            mapData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{item.municipio}</span>
                  <span className="text-xs text-gray-600">{item.votos} ({item.porcentaje}%)</span>
                </div>
                <div className="h-6 bg-gray-100 rounded overflow-hidden">
                  <div
                    style={{
                      width: `${(item.votos / maxVotos) * 100}%`,
                      backgroundColor: getColorForIndex(index),
                    }}
                    className="h-full flex items-center justify-end px-2 text-white text-xs font-semibold"
                  >
                    {(item.votos / maxVotos) * 100 > 10 && item.porcentaje}%
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No hay datos disponibles</p>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-3">Distribución por Municipio</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {mapData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getColorForIndex(index) }}></div>
              <span>{item.municipio}: {item.votos} votos</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographicMap;
