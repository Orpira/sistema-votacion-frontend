/**
 * Calcula la edad basada en la fecha de nacimiento
 * @param birthDate - Fecha de nacimiento
 * @returns Edad en años (número entero)
 */
export const calculateAge = (birthDate: Date): number => {
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}

	return age;
};

/**
 * Valida que una dirección de correo electrónico sea válida
 * @param email - Dirección de correo electrónico
 * @returns true si el email es válido, false en caso contrario
 */
export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

/**
 * Valida la fortaleza de una contraseña
 * @param password - Contraseña a validar
 * @returns Objeto con detalles de validación
 */
export const validatePassword = (
	password: string,
): {
	isStrong: boolean;
	requirements: {
		minLength: boolean;
		hasUpperCase: boolean;
		hasLowerCase: boolean;
		hasNumbers: boolean;
		hasSpecialChars: boolean;
	};
} => {
	return {
		isStrong:
			password.length >= 8 &&
			/[A-Z]/.test(password) &&
			/[a-z]/.test(password) &&
			/[0-9]/.test(password) &&
			/[!@#$%^&*(),.?":{}|<>]/.test(password),
		requirements: {
			minLength: password.length >= 8,
			hasUpperCase: /[A-Z]/.test(password),
			hasLowerCase: /[a-z]/.test(password),
			hasNumbers: /[0-9]/.test(password),
			hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		},
	};
};

/**
 * Sanitiza una entrada de texto para prevenir inyección de código
 * @param input - Texto a sanitizar
 * @returns Texto sanitizado
 */
export const sanitizeInput = (input: string): string => {
	const div = document.createElement("div");
	div.textContent = input;
	return div.innerHTML;
};
