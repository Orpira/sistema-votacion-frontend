import React, { useState, FormEvent, ChangeEvent } from "react";
import { calculateAge } from "../../utils/validation";
import { RegistroSimpatizante } from "../../types/index";

interface RegisterFormProps {
	onSubmit: (data: RegistroSimpatizante) => Promise<void>;
	loading: boolean;
}

interface FormErrors {
	[key: string]: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading }) => {
	const [formData, setFormData] = useState<RegistroSimpatizante>({
		nombre: "",
		apellido: "",
		cedula: "",
		email: "",
		telefono: "",
		fechaNacimiento: "",
		genero: "masculino",
		ciudad: "",
		barrio: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};
		if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
		if (!formData.apellido.trim())
			newErrors.apellido = "El apellido es requerido";
		if (!formData.cedula.trim())
			newErrors.cedula = "El número de cédula es requerido";
		if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
			newErrors.email = "Email inválido";
		if (!formData.fechaNacimiento)
			newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
		else {
			const age = calculateAge(new Date(formData.fechaNacimiento));
			if (age < 18)
				newErrors.fechaNacimiento = "Debes ser mayor de 18 años para registrarte";
		}
		if (!formData.genero) newErrors.genero = "Selecciona un género";
		if (!formData.ciudad) newErrors.ciudad = "Selecciona una ciudad";
		if (!formData.password) newErrors.password = "La contraseña es requerida";
		if (formData.password.length < 8)
			newErrors.password = "La contraseña debe tener al menos 8 caracteres";
		if (formData.password !== formData.confirmPassword)
			newErrors.confirmPassword = "Las contraseñas no coinciden";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			await onSubmit(formData);
		}
	};

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			<div className="text-center mb-8">
				<h2 className="font-playfair text-3xl font-bold text-slate-900 mb-2">
					Registro de Simpatizante
				</h2>
				<p className="text-slate-600">
					Completa tu información para unirte a la campaña
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="nombre"
						className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
					>
						Nombre
					</label>
					<input
						type="text"
						id="nombre"
						name="nombre"
						value={formData.nombre}
						onChange={handleChange}
						className={`input-field ${errors.nombre ? "border-red-600 focus:ring-red-500" : ""}`}
						placeholder="Tu nombre"
					/>
					{errors.nombre && (
						<p className="mt-2 text-sm font-medium text-red-600">
							✗ {errors.nombre}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="apellido"
						className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
					>
						Apellido
					</label>
					<input
						type="text"
						id="apellido"
						name="apellido"
						value={formData.apellido}
						onChange={handleChange}
						className={`input-field ${errors.apellido ? "border-red-600 focus:ring-red-500" : ""}`}
						placeholder="Tu apellido"
					/>
					{errors.apellido && (
						<p className="mt-2 text-sm font-medium text-red-600">
							✗ {errors.apellido}
						</p>
					)}
				</div>
			</div>

			<div>
				<label
					htmlFor="cedula"
					className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
				>
					Cédula
				</label>
				<input
					type="text"
					id="cedula"
					name="cedula"
					placeholder="Ingresa tu cédula"
					value={formData.cedula}
					onChange={handleChange}
					className={`input-field ${errors.cedula ? "border-red-600 focus:ring-red-500" : ""}`}
				/>
				{errors.cedula && (
					<p className="mt-2 text-sm font-medium text-red-600">
						✗ {errors.cedula}
					</p>
				)}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={`input-field ${errors.email ? "border-red-600 focus:ring-red-500" : ""}`}
						placeholder="tu@email.com"
					/>
					{errors.email && (
						<p className="mt-2 text-sm font-medium text-red-600">
							✗ {errors.email}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="telefono"
						className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
					>
						Teléfono (Opcional)
					</label>
					<input
						type="tel"
						id="telefono"
						name="telefono"
						value={formData.telefono}
						onChange={handleChange}
						className="input-field"
						placeholder="Tu teléfono"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="fechaNacimiento"
					className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
				>
					Fecha de Nacimiento
				</label>
				<input
					type="date"
					id="fechaNacimiento"
					name="fechaNacimiento"
					value={formData.fechaNacimiento}
					onChange={handleChange}
					className={`input-field ${errors.fechaNacimiento ? "border-red-600 focus:ring-red-500" : ""}`}
				/>
				{errors.fechaNacimiento && (
					<p className="mt-2 text-sm font-medium text-red-600">
						✗ {errors.fechaNacimiento}
					</p>
				)}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="genero"
						className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
					>
						Género
					</label>
					<select
						id="genero"
						name="genero"
						value={formData.genero}
						onChange={handleChange}
						className={`input-field ${errors.genero ? "border-red-600 focus:ring-red-500" : ""}`}
					>
						<option value="">Seleccionar</option>
						<option value="masculino">Masculino</option>
						<option value="femenino">Femenino</option>
						<option value="otro">Otro</option>
					</select>
					{errors.genero && (
						<p className="mt-2 text-sm font-medium text-red-600">
							✗ {errors.genero}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="ciudad"
						className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
					>
						Ciudad
					</label>
					<select
						id="ciudad"
						name="ciudad"
						value={formData.ciudad}
						onChange={handleChange}
						className={`input-field ${errors.ciudad ? "border-red-600 focus:ring-red-500" : ""}`}
					>
						<option value="">Seleccionar</option>
						<option value="bucaramanga">Bucaramanga</option>
						<option value="floridablanca">Floridablanca</option>
						<option value="giron">Girón</option>
						<option value="piedecuesta">Piedecuesta</option>
						<option value="barrancabermeja">Barrancabermeja</option>
						<option value="san-gil">San Gil</option>
						<option value="socorro">Socorro</option>
						<option value="barbosa">Barbosa</option>
						<option value="otra">Otra ciudad de Santander</option>
					</select>
					{errors.ciudad && (
						<p className="mt-2 text-sm font-medium text-red-600">
							✗ {errors.ciudad}
						</p>
					)}
				</div>
			</div>

			<div>
				<label
					htmlFor="barrio"
					className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
				>
					Barrio (Opcional)
				</label>
				<input
					type="text"
					id="barrio"
					name="barrio"
					value={formData.barrio}
					onChange={handleChange}
					className="input-field"
					placeholder="Tu barrio"
				/>
			</div>

			<div>
				<label
					htmlFor="password"
					className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
				>
					Contraseña
				</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					className={`input-field ${errors.password ? "border-red-600 focus:ring-red-500" : ""}`}
					placeholder="Mínimo 8 caracteres"
				/>
				{errors.password && (
					<p className="mt-2 text-sm font-medium text-red-600">
						✗ {errors.password}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor="confirmPassword"
					className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
				>
					Confirmar Contraseña
				</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleChange}
					className={`input-field ${errors.confirmPassword ? "border-red-600 focus:ring-red-500" : ""}`}
					placeholder="Repite tu contraseña"
				/>
				{errors.confirmPassword && (
					<p className="mt-2 text-sm font-medium text-red-600">
						✗ {errors.confirmPassword}
					</p>
				)}
			</div>

			<button
				type="submit"
				className="btn-primary w-full py-4 text-lg mt-8"
				disabled={loading}
			>
				{loading ? "Registrando..." : "Registrarme como Simpatizante"}
			</button>

			<p className="text-center text-slate-700 font-medium">
				¿Ya tienes cuenta?{" "}
				<a
					href="/login"
					className="text-red-600 font-bold hover:text-red-700 transition"
				>
					Inicia sesión aquí
				</a>
			</p>
		</form>
	);
};

export default RegisterForm;
