import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-red-50">
{/* Campaign Banner featuring candidate */}
		<div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-4 px-4 text-center">
			<p className="text-sm md:text-base font-bold uppercase tracking-widest">
				🗳️ Proceso Electoral Histórico 2026 • Camilo Torres - Justicia por Santander
				</p>
			</div>

{/* Hero Section - Campaign (with candidate banner) */}
		<div className="relative overflow-hidden pt-20 pb-28 sm:pt-32 sm:pb-40">
			{/* banner image overlay */}
			<div className="absolute inset-0 -z-20">
				<img
					src="/images/camilo-banner.png"
					alt="Camilo Torres campaña"
					className="w-full h-full object-cover opacity-30" />
			</div>
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-30"></div>
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
			</div>

			<div className="container-premium">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
					<div className="space-y-8">
						{/* candidate badge / profile */}
						<div className="flex items-center gap-4">
							<img
								src="/images/camilo-portrait.png"
								alt="Camilo Torres"
								className="w-24 h-24 rounded-full border-4 border-red-600"
							/>
							<div>
								<h2 className="text-2xl font-playfair font-bold text-slate-900">
									Camilo Torres
								</h2>
								<p className="text-red-600 font-semibold">Justicia por Santander</p>
							</div>
						</div>
							<div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm">
								Vota por el Cambio
							</div>
							<div>
								<h1 className="text-5xl sm:text-6xl font-playfair font-bold mb-6 text-slate-900">
									Tu Voto es tu
									<br />
									<span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
										Voz
									</span>
								</h1>
								<p className="text-xl text-slate-700 leading-relaxed max-w-xl font-medium">
									Participa en el proceso electoral más seguro, transparente e
									innovador. Tu voto decide el futuro de nuestra nación. Juntos
									construimos democracia.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 pt-4">
								<button
									className="btn-primary text-lg"
									onClick={() => navigate("/login")}
								>
									Inicia Sesión
								</button>
								<button
									className="btn-secondary text-lg"
									onClick={() => navigate("/register")}
								>
									Únete Ahora
								</button>
							</div>

							<div className="pt-6 border-t border-slate-200">
								<p className="text-sm text-slate-600 font-medium">
									✓ 100% Seguro | ✓ Voto Confidencial | ✓ Resultados en Tiempo
									Real
								</p>
							</div>
						</div>

						<div className="hidden md:flex justify-center">
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 rounded-3xl blur-3xl opacity-40 animate-pulse-glow"></div>
								<div className="relative text-9xl drop-shadow-2xl animate-float">
									🗳️
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section - Campaign Benefits */}
			<div className="py-20 px-4">
				<div className="container-premium">
					<div className="section-header mb-16">
						<h2 className="font-playfair text-red-600">
							Por qué esta campaña es diferente
						</h2>
						<p className="text-lg text-slate-600">
							Una plataforma electoral revolucionaria, segura y completamente
							transparente
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								title: "Máxima Seguridad",
								desc: "Encriptación de nivel militar con protección de datos de nivel internacional. Tu información está completamente segura.",
								icon: "🔒",
								color: "from-red-600 to-red-700",
							},
							{
								title: "Voto Confidencial",
								desc: "Tu decisión es absolutamente privada. Nadie sabrá por quién votaste. Así es el voto democrático.",
								icon: "✓",
								color: "from-orange-600 to-orange-700",
							},
							{
								title: "Acceso Fácil",
								desc: "Diseño intuitivo que cualquier ciudadano puede usar. Sin complicaciones, solo democracia.",
								icon: "👥",
								color: "from-amber-600 to-amber-700",
							},
							{
								title: "Resultados en Vivo",
								desc: "Panel de control con análisis detallados. Mira cómo se desarrolla la elección en tiempo real.",
								icon: "📊",
								color: "from-cyan-600 to-cyan-700",
							},
							{
								title: "Vota desde Casa",
								desc: "Participa desde cualquier lugar, en cualquier momento. Democracia sin límites geográficos.",
								icon: "🌍",
								color: "from-emerald-600 to-emerald-700",
							},
							{
								title: "Validación Robusta",
								desc: "Verificación segura de identidad. Solo votantes registrados pueden ejercer su derecho.",
								icon: "📱",
								color: "from-red-600 to-red-700",
							},
						].map((feature, idx) => (
							<div
								key={idx}
								className="card-premium group hover:shadow-2xl hover:scale-105 transition-transform duration-300"
							>
								<div
									className={`inline-block bg-gradient-to-br ${feature.color} p-3 rounded-xl text-white text-3xl mb-4 group-hover:scale-110 transition-transform`}
								>
									{feature.icon}
								</div>
								<h3 className="font-playfair text-xl font-bold mb-3 text-slate-900">
									{feature.title}
								</h3>
								<p className="text-slate-700 leading-relaxed font-medium">
									{feature.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Call to Action - Electoral Info */}
			<div className="py-20 px-4 bg-gradient-to-r from-red-700 to-red-800">
				<div className="container-premium">
					<h2 className="font-playfair text-4xl font-bold mb-16 text-center text-white">
						Información Electoral Importante
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-white">
							<div className="text-5xl mb-4">📅</div>
							<h3 className="font-playfair text-2xl font-bold mb-4">
								Fechas a Recordar
							</h3>
							<div className="space-y-3 font-medium">
								<div>
									<p className="text-red-200 text-sm uppercase tracking-wide">
										Día de Votación
									</p>
									<p className="text-xl">26 de febrero de 2026</p>
								</div>
								<div>
									<p className="text-red-200 text-sm uppercase tracking-wide">
										Horario Electoral
									</p>
									<p className="text-xl">8:00 AM - 5:00 PM</p>
								</div>
							</div>
						</div>

						<div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-white">
							<div className="text-5xl mb-4">✅</div>
							<h3 className="font-playfair text-2xl font-bold mb-4">
								Requisitos para Votar
							</h3>
							<ul className="space-y-2 font-medium">
								<li className="flex items-center gap-2">
									<span className="text-amber-400">★</span>
									Ser mayor de 18 años
								</li>
								<li className="flex items-center gap-2">
									<span className="text-amber-400">★</span>
									Tener cédula válida
								</li>
								<li className="flex items-center gap-2">
									<span className="text-amber-400">★</span>
									Estar registrado como votante
								</li>
							</ul>
						</div>

						<div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-white">
							<div className="text-5xl mb-4">🛡️</div>
							<h3 className="font-playfair text-2xl font-bold mb-4">
								Protección Legal
							</h3>
							<p className="font-medium leading-relaxed">
								Cumplimos totalmente con la Ley 1581 de 2012 sobre protección de
								datos personales y todas las normativas electorales vigentes. Tu
								información está bajo máxima protección.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main CTA */}
			<div className="py-20 px-4">
				<div className="container-premium text-center">
					<h2 className="font-playfair text-5xl font-bold mb-6 text-slate-900">
						¿Estás listo para hacer historia?
					</h2>
					<p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto font-medium">
						Millones de ciudadanos ya están listos. Tu voto es el cambio que
						esperamos. Regístrate ahora y sé parte de esta revolución
						democrática.
					</p>
					<button
						className="btn-accent text-xl px-12 py-5"
						onClick={() => navigate("/register")}
					>
						Registrarse y Votar
					</button>
				</div>
			</div>

			{/* Candidates Section Preview */}
			<div className="py-20 px-4 bg-white/50">
				<div className="container-premium">
					<h2 className="font-playfair text-4xl font-bold mb-4 text-center text-slate-900">
						Conoce a los Candidatos
					</h2>
					<p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
						Información completa sobre cada candidato, sus propuestas y visiones
						para el futuro
					</p>

					<div className="text-center">
						<button
							className="btn-primary text-lg"
							onClick={() => navigate("/voting")}
						>
							Ver Candidatos
						</button>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-slate-900 text-slate-300 py-16 px-4">
				<div className="container-premium">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
						<div>
							<h3 className="font-playfair text-white text-xl font-bold mb-4">
								2026 Electoral
							</h3>
							<p className="leading-relaxed">
								Plataforma oficial segura y transparente para participar en el
								proceso democrático más importante de nuestra nación.
							</p>
						</div>
						<div>
							<h4 className="text-white font-bold text-lg mb-4">
								Enlaces Rápidos
							</h4>
							<ul className="space-y-2">
								<li>
									<a href="#start" className="hover:text-white transition">
										Inicio
									</a>
								</li>
								<li>
									<a href="#register" className="hover:text-white transition">
										Registro
									</a>
								</li>
								<li>
									<a href="#candidates" className="hover:text-white transition">
										Candidatos
									</a>
								</li>
								<li>
									<a href="#results" className="hover:text-white transition">
										Resultados
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="text-white font-bold text-lg mb-4">Legal</h4>
							<ul className="space-y-2">
								<li>
									<a href="#privacy" className="hover:text-white transition">
										Privacidad
									</a>
								</li>
								<li>
									<a href="#terms" className="hover:text-white transition">
										Términos
									</a>
								</li>
								<li>
									<a href="#security" className="hover:text-white transition">
										Seguridad
									</a>
								</li>
								<li>
									<a href="#contact" className="hover:text-white transition">
										Contacto
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="text-white font-bold text-lg mb-4">Síguenos</h4>
							<div className="flex gap-4">
								<a
									href="#"
									className="text-slate-400 hover:text-white text-2xl transition"
								>
									f
								</a>
								<a
									href="#"
									className="text-slate-400 hover:text-white text-2xl transition"
								>
									𝕏
								</a>
								<a
									href="#"
									className="text-slate-400 hover:text-white text-2xl transition"
								>
									in
								</a>
								<a
									href="#"
									className="text-slate-400 hover:text-white text-2xl transition"
								>
									▶
								</a>
							</div>
						</div>
					</div>
					<div className="border-t border-slate-700 pt-8">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<p className="text-slate-400">
								&copy; 2026 Proceso Electoral Nacional. Todos los derechos
								reservados.
							</p>
							<p className="text-slate-400 text-sm mt-4 md:mt-0">
								Sistema Oficial Certificado | Seguridad Garantizada
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;
