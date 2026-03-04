import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-red-50">
{/* Campaign Banner featuring candidate */}
		<div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-4 px-4 text-center">
			<p className="text-sm md:text-base font-bold uppercase tracking-widest">
				✊ Campaña 2026 • Camilo Torres - Justicia por Santander • ¡Únete al cambio!
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
								Únete a Nuestra Campaña
							</div>
							<div>
								<h1 className="text-5xl sm:text-6xl font-playfair font-bold mb-6 text-slate-900">
									Regístrate como
									<br />
									<span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
										Simpatizante
									</span>
								</h1>
								<p className="text-xl text-slate-700 leading-relaxed max-w-xl font-medium">
									Forma parte de nuestra base de apoyo. Juntos construiremos 
									el cambio que Santander necesita. Tu apoyo es fundamental 
									para nuestra campaña.
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
									Regístrate Ahora
								</button>
							</div>

							<div className="pt-6 border-t border-slate-200">
								<p className="text-sm text-slate-600 font-medium">
									✓ Registro Seguro | ✓ Información Confidencial | ✓ Reportes Estadísticos
								</p>
							</div>
						</div>

						<div className="hidden md:flex justify-center">
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 rounded-3xl blur-3xl opacity-40 animate-pulse-glow"></div>
								<div className="relative text-9xl drop-shadow-2xl animate-float">
									✊
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
							¿Por qué registrarte como simpatizante?
						</h2>
						<p className="text-lg text-slate-600">
							Tu apoyo nos ayuda a construir una campaña más fuerte y organizada
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								title: "Base de Datos Segura",
								desc: "Tu información está protegida con los más altos estándares de seguridad. Solo será usada para fines de campaña.",
								icon: "🔒",
								color: "from-red-600 to-red-700",
							},
							{
								title: "Mantente Informado",
								desc: "Recibe actualizaciones sobre eventos de campaña, propuestas y actividades en tu ciudad.",
								icon: "📢",
								color: "from-orange-600 to-orange-700",
							},
							{
								title: "Análisis por Ciudad",
								desc: "Ayúdanos a identificar las ciudades donde más apoyo tenemos y dónde necesitamos crecer.",
								icon: "🗺️",
								color: "from-amber-600 to-amber-700",
							},
							{
								title: "Reportes Estadísticos",
								desc: "Generamos informes de distribución por edad, género y ubicación para mejorar nuestra estrategia.",
								icon: "📊",
								color: "from-cyan-600 to-cyan-700",
							},
							{
								title: "Participa Activamente",
								desc: "Sé parte del movimiento de cambio. Tu registro nos da fuerza para seguir adelante.",
								icon: "✊",
								color: "from-emerald-600 to-emerald-700",
							},
							{
								title: "Validación de Apoyo",
								desc: "Cada simpatizante registrado es una voz más que respalda nuestra propuesta de cambio.",
								icon: "✓",
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

			{/* Call to Action - Campaign Info */}
			<div className="py-20 px-4 bg-gradient-to-r from-red-700 to-red-800">
				<div className="container-premium">
					<h2 className="font-playfair text-4xl font-bold mb-16 text-center text-white">
						Información de la Campaña
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-white">
							<div className="text-5xl mb-4">📅</div>
							<h3 className="font-playfair text-2xl font-bold mb-4">
								Fechas Importantes
							</h3>
							<div className="space-y-3 font-medium">
								<div>
									<p className="text-red-200 text-sm uppercase tracking-wide">
										Elecciones 2026
									</p>
									<p className="text-xl">26 de febrero de 2026</p>
								</div>
								<div>
									<p className="text-red-200 text-sm uppercase tracking-wide">
										Registro de Simpatizantes
									</p>
									<p className="text-xl">¡Abierto ahora!</p>
								</div>
							</div>
						</div>

						<div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-white">
							<div className="text-5xl mb-4">✅</div>
							<h3 className="font-playfair text-2xl font-bold mb-4">
								Para Registrarte
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
									Compartir tus datos básicos
								</li>
							</ul>
						</div>

						<div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-white">
							<div className="text-5xl mb-4">🛡️</div>
							<h3 className="font-playfair text-2xl font-bold mb-4">
								Protección de Datos
							</h3>
							<p className="font-medium leading-relaxed">
								Cumplimos totalmente con la Ley 1581 de 2012 sobre protección de
								datos personales. Tu información está bajo máxima protección y 
								solo será usada para fines de campaña.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main CTA */}
			<div className="py-20 px-4">
				<div className="container-premium text-center">
					<h2 className="font-playfair text-5xl font-bold mb-6 text-slate-900">
						¿Estás listo para unirte al cambio?
					</h2>
					<p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto font-medium">
						Miles de ciudadanos ya se han registrado como simpatizantes. 
						Tu apoyo es fundamental para construir el Santander que todos merecemos.
					</p>
					<button
						className="btn-accent text-xl px-12 py-5"
						onClick={() => navigate("/register")}
					>
						Registrarme como Simpatizante
					</button>
				</div>
			</div>

			{/* Stats Section */}
			<div className="py-20 px-4 bg-white/50">
				<div className="container-premium">
					<h2 className="font-playfair text-4xl font-bold mb-4 text-center text-slate-900">
						Nuestro Movimiento Crece
					</h2>
					<p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
						Con cada simpatizante registrado, nuestra campaña se hace más fuerte
					</p>

					<div className="text-center">
						<button
							className="btn-primary text-lg"
							onClick={() => navigate("/dashboard")}
						>
							Ver Estadísticas
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
								Campaña 2026
							</h3>
							<p className="leading-relaxed">
								Sistema de registro de simpatizantes para la campaña de 
								Camilo Torres - Justicia por Santander.
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
									<a href="#stats" className="hover:text-white transition">
										Estadísticas
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
									<a href="#data" className="hover:text-white transition">
										Datos Personales
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
								&copy; 2026 Campaña Camilo Torres. Todos los derechos
								reservados.
							</p>
							<p className="text-slate-400 text-sm mt-4 md:mt-0">
								Sistema de Registro de Simpatizantes | Datos Protegidos
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;
