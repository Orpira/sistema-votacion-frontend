import React, { useState, FormEvent, ChangeEvent } from "react";
import { CredencialesLogin } from "../../types/index";

interface LoginFormProps {
	onSubmit: (data: CredencialesLogin) => Promise<void>;
	loading: boolean;
}

interface FormErrors {
	[key: string]: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
	const [formData, setFormData] = useState<CredencialesLogin>({
		cedula: "",
		password: "",
		rememberMe: false,
	});

	const [errors, setErrors] = useState<FormErrors>({});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.cedula.trim()) {
			newErrors.cedula = "El número de cédula es requerido";
		}
		if (!formData.password) {
			newErrors.password = "La contraseña es requerida";
		}

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
					Ingresa a tu Cuenta
				</h2>
				<p className="text-slate-600">Accede a la plataforma electoral 2026</p>
			</div>

			<div>
				<label
					htmlFor="cedula"
					className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide"
				>
					Número de Cédula
				</label>
				<input
					type="text"
					id="cedula"
					name="cedula"
					placeholder="Ingresa tu cédula"
					value={formData.cedula}
					onChange={handleChange}
					className={`input-field ${errors.cedula ? "border-red-600 focus:ring-red-500" : ""}`}
					autoComplete="username"
				/>
				{errors.cedula && (
					<p className="mt-2 text-sm font-medium text-red-600">
						✗ {errors.cedula}
					</p>
				)}
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
					placeholder="••••••••"
					value={formData.password}
					onChange={handleChange}
					className={`input-field ${errors.password ? "border-red-600 focus:ring-red-500" : ""}`}
					autoComplete="current-password"
				/>
				{errors.password && (
					<p className="mt-2 text-sm font-medium text-red-600">
						✗ {errors.password}
					</p>
				)}
			</div>

			<div className="flex items-center justify-between pt-2">
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						name="rememberMe"
						checked={formData.rememberMe || false}
						onChange={handleChange}
						className="w-5 h-5 accent-red-600 cursor-pointer"
					/>
					<span className="text-sm text-slate-700 font-medium">
						Recuérdame en este dispositivo
					</span>
				</label>
				<a
					href="/forgot-password"
					className="text-sm font-medium text-red-600 hover:text-red-700 transition"
				>
					¿Olvidaste tu contraseña?
				</a>
			</div>

			<button
				type="submit"
				className="btn-primary w-full py-4 text-lg mt-8"
				disabled={loading}
			>
				{loading ? "Ingresando..." : "Ingresar"}
			</button>

			<div className="relative my-6">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-slate-200"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-4 bg-white text-slate-500">¿Eres nuevo?</span>
				</div>
			</div>

			<p className="text-center text-slate-700 font-medium">
				<a
					href="/register"
					className="text-red-600 font-bold hover:text-red-700 transition"
				>
					Regístrate para votar ahora
				</a>
			</p>
		</form>
	);
};

export default LoginForm;
