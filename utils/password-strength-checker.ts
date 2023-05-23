export function passwordStrengthChecker(password: string) {
	let strength = 0;
	// Check password length
	if (password.length > 8) {
		strength += 1;
	}

	// Check for mixed case
	if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
		strength += 1;
	}

	// Check for numbers
	if (password.match(/\d/)) {
		strength += 1;
	}

	// Check for special characters
	if (password.match(/[^a-zA-Z\d]/)) {
		strength += 1;
	}

	return strength;
}
