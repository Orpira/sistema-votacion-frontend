import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";

const DashboardPage: React.FC = () => {
	const navigate = useNavigate();
	const { isAuthenticated, logout } = useAuth();
	const { votingData, loading, error, fetchVotingData } = useDashboard();

	const handleLogout = () => {
		logout();
		navigate("/inicio", { replace: true });
	};

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white border-b border-gray-200">
				<div className="flex items-center justify-between p-6 max-w-7xl mx-auto">
					<h1 className="text-2xl font-bold">Panel de Control Electoral</h1>
					<div className="flex items-center gap-3">
						<button
							onClick={() => navigate("/")}
							className="px-4 py-2 border-2 border-slate-300 text-slate-800 rounded hover:bg-slate-50 transition"
						>
							Inicio
						</button>
						<button
							onClick={handleLogout}
							className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
						>
							Cerrar Sesión
						</button>
					</div>
				</div>
			</div>

			{error && (
				<div className="p-6 bg-red-100 text-red-700 rounded m-6">{error}</div>
			)}

			{loading && (
				<div className="flex flex-col items-center justify-center h-96">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
					<p className="mt-4 text-gray-600">Cargando datos...</p>
				</div>
			)}

			{!loading && (
				<Dashboard votingData={votingData} onFilterChange={fetchVotingData} />
			)}
		</div>
	);
};

export default DashboardPage;
