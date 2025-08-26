export function isValidEmail(email: string): boolean {
  // Simple regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password: string): boolean {
  // Example: min 6 chars, 1 uppercase, 1 number
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

// Add more validators as needed