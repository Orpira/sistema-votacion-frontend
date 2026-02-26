import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { VotingProvider } from "./context/VotingContext";
import { DashboardProvider } from "./context/DashboardContext";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VotingPage from "./pages/VotingPage";
import VotingSuccessPage from "./pages/VotingSuccessPage";
import DashboardPage from "./pages/DashboardPage";

// Protected Route Component
interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const isAuthenticated =
		!!localStorage.getItem("authToken") ||
		!!sessionStorage.getItem("authToken");

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<VotingProvider>
					<DashboardProvider>
						<Routes>
							{/* Public Routes */}
							<Route path="/" element={<HomePage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />

							{/* Protected Routes */}
							<Route
								path="/voting"
								element={
									<ProtectedRoute>
										<VotingPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/voting-success"
								element={
									<ProtectedRoute>
										<VotingSuccessPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard"
								element={
									<ProtectedRoute>
										<DashboardPage />
									</ProtectedRoute>
								}
							/>

							{/* Catch all - redirect to home */}
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</DashboardProvider>
				</VotingProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
