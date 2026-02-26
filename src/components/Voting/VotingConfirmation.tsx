import React from "react";
import { Candidato } from "../../types/index";

interface VotingConfirmationProps {
	candidate: Candidato;
	onConfirm: () => Promise<void>;
	onCancel: () => void;
	loading: boolean;
}

const VotingConfirmation: React.FC<VotingConfirmationProps> = ({
	candidate,
	onConfirm,
	onCancel,
	loading,
}) => {
	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 border-t-4 border-red-600">
				<div className="mb-6 text-center">
					<h2 className="font-playfair text-2xl font-bold text-slate-900 mb-2">
						¡Un paso importante!
					</h2>
					<p className="text-slate-600">Confirma tu voto antes de proseguir</p>
				</div>

				<div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-br from-red-50 to-amber-50 rounded-lg border border-red-200">
					<img
						src={candidate.photo || "/images/default-candidate.png"}
						alt={candidate.nombre}
						className="w-20 h-20 object-cover rounded-lg border-2 border-red-600 shadow-md"
					/>
					<div>
						<h3 className="font-bold text-slate-900 text-lg">
							{candidate.nombre} {candidate.apellido}
						</h3>
						<p className="text-sm font-semibold text-red-600 mt-1">
							{candidate.partido}
						</p>
						<p className="text-xs text-slate-600 mt-2">
							Candidato electoral 2026
						</p>
					</div>
				</div>

				<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
					<p className="text-slate-900 font-semibold">
						¿Estás seguro de que deseas votar por{" "}
						<span className="text-red-600">{candidate.nombre}</span>?
					</p>
					<p className="text-sm text-slate-600 mt-2">
						Esta acción no se puede deshacer. Tu voto es tu voz.
					</p>
				</div>

				<div className="flex gap-3">
					<button
						onClick={onCancel}
						disabled={loading}
						className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 font-semibold transition disabled:opacity-50"
					>
						← Cambia de opinión
					</button>
					<button
						onClick={onConfirm}
						disabled={loading}
						className="flex-1 btn-primary py-3 text-base"
					>
						{loading ? "Registrando..." : "✓ Confirmar Voto"}
					</button>
				</div>

				{loading && (
					<div className="mt-4 text-center">
						<div className="inline-block animate-spin">⏳</div>
						<p className="text-sm text-slate-600 mt-2">
							Procesando tu voto de forma segura...
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default VotingConfirmation;
