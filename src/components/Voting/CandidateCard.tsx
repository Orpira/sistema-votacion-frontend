import React from "react";
import { Candidato } from "../../types/index";

interface CandidateCardProps {
	candidate: Candidato;
	onSelect: (candidate: Candidato) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
	candidate,
	onSelect,
}) => {
	return (
		<div className="card-candidate group h-full hover:border-red-600 cursor-pointer transition-all duration-300">
			<div className="relative">
				{/* Contenedor de foto con superposición */}
				<div className="h-56 w-full mb-4 overflow-hidden bg-gradient-to-br from-red-100 to-amber-50 flex items-center justify-center relative">
					<img
						src={candidate.photo || "/images/default-candidate.png"}
						alt={candidate.nombre}
						className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</div>

				{/* Información del candidato */}
				<div className="px-6 pb-6">
					<div className="mb-3">
						<h3 className="text-2xl font-playfair font-bold text-slate-900 mb-1">
							{candidate.nombre}
						</h3>
						<p className="text-sm font-bold uppercase tracking-widest text-red-600">
							{candidate.apellido}
						</p>
					</div>

					{/* Distintivo del partido */}
					<div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
						{candidate.partido}
					</div>

					{/* Sección de la plataforma */}
					<p className="text-sm text-slate-700 leading-relaxed mb-4 min-h-16">
						<span className="font-bold text-slate-900 block mb-2">
							Propuesta:
						</span>
						{candidate.plataforma
							? `${candidate.plataforma.substring(0, 100)}...`
							: "Sin información disponible"}
					</p>

					{/* Enlaces sociales */}
					<div className="flex gap-2 mb-6 flex-wrap">
						{candidate.website && (
							<a
								href={candidate.website}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-red-600 rounded-full text-xs font-medium hover:bg-red-50 transition"
							>
								🌐 Sitio
							</a>
						)}
						{candidate.twitter && (
							<a
								href={candidate.twitter}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-red-600 rounded-full text-xs font-medium hover:bg-red-50 transition"
							>
								𝕏 Twitter
							</a>
						)}
					</div>
				</div>
			</div>

			{/* Botón de votar */}
			<button
				onClick={() => onSelect(candidate)}
				className="btn-primary w-full mx-6 mb-6"
			>
				Votar por {candidate.nombre.split(" ")[0]}
			</button>
		</div>
	);
};

export default CandidateCard;
