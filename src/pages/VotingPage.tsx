import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VotingInterface from "../components/Voting/VotingInterface";
import { useAuth } from "../context/AuthContext";
import { useVoting } from "../context/VotingContext";
import { Candidato } from "../types/index";

const VotingPage: React.FC = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuth();
	const { candidatos, hasVoted, loading, error, submitVote } = useVoting();

	const handleLogout = () => {
		logout();
		navigate("/inicio", { replace: true });
	};

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		if (hasVoted) {
			navigate("/voting-success");
		}
	}, [hasVoted, navigate]);

	const handleVoteSubmit = async (candidate: Candidato) => {
		try {
			await submitVote(candidate.id);
		} catch (err) {
			console.error("Error al votar:", err);
		}
	};

	if (!isAuthenticated) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
			<div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-lg">
				<div className="p-6 max-w-7xl mx-auto">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h1 className="font-playfair text-3xl font-bold text-white mb-1">
								¡Bienvenido, {user?.nombre}!
							</h1>
							<p className="text-red-100">
								Estás participando en el proceso electoral histórico 2026
							</p>
						</div>
						<div className="flex items-center gap-3">
							<button
								onClick={() => navigate("/")}
								className="px-4 py-2 border-2 border-white/40 text-white rounded hover:bg-white/10 transition"
							>
								Inicio
							</button>
							<button onClick={handleLogout} className="btn-danger px-6 py-3">
								← Cerrar Sesión
							</button>
						</div>
					</div>
					<div className="flex items-center gap-6 pt-4 border-t border-red-500/30">
						<div className="flex items-center gap-2 text-white">
							<span className="text-2xl">📅</span>
							<div>
								<p className="text-sm text-red-100">
									Fecha del proceso electoral
								</p>
								<p className="font-bold text-lg">26 de febrero de 2026</p>
							</div>
						</div>
						<div className="flex items-center gap-2 text-white">
							<span className="text-2xl">🗳️</span>
							<div>
								<p className="text-sm text-red-100">Tu derecho cívico</p>
								<p className="font-bold text-lg">Tu voto es tu voz</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{error && (
				<div className="p-6 mx-6 mt-6 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 rounded-lg">
					<p className="text-red-900 font-semibold">⚠️ {error}</p>
				</div>
			)}

			<div className="max-w-7xl mx-auto">
				<VotingInterface
					candidates={candidatos}
					onVoteSubmit={handleVoteSubmit}
					loading={loading}
				/>
			</div>

			<div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t-2 border-amber-300 mt-6">
				<div className="max-w-7xl mx-auto p-6">
					<div className="flex items-start gap-4">
						<span className="text-3xl">🔐</span>
						<div>
							<p className="font-bold text-slate-900 mb-2">
								Tu voto es sagrado
							</p>
							<p className="text-slate-700">
								Recuerda: Tu voto es secreto, libre y universal. Una vez que
								votes, no podrás cambiar tu decisión. Tu participación es
								esencial para la democracia.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VotingPage;
