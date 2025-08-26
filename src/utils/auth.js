// Frontend authentication utilities

// Token management
export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const setToken = (token) => {
    localStorage.setItem('authToken', token);
};

export const removeToken = () => {
    localStorage.removeItem('authToken');
};

// User data management
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = () => {
    localStorage.removeItem('user');
};

// Authentication status
export const isAuthenticated = () => {
    return !!getToken();
};

// API headers with auth
export const getAuthHeaders = () => {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Logout function
export const logout = () => {
    removeToken();
    removeUser();
    window.dispatchEvent(new CustomEvent('auth:logout'));
};

// Login function
export const login = (token, user) => {
    setToken(token);
    setUser(user);
    window.dispatchEvent(new CustomEvent('auth:login', { detail: { user } }));
};

// Check if token is expired
export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};

// Refresh authentication
export const refreshAuth = async () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
        logout();
        return false;
    }
    return true;
};

// API request wrapper with auth
export const authenticatedFetch = async (url, options = {}) => {
    const headers = {
        ...getAuthHeaders(),
        ...options.headers
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (response.status === 401) {
        logout();
        window.location.href = '/auth';
        throw new Error('Authentication required');
    }

    return response;
};

// Auth event listeners
export const onAuthChange = (callback) => {
    const handleLogin = (event) => callback('login', event.detail);
    const handleLogout = () => callback('logout');

    window.addEventListener('auth:login', handleLogin);
    window.addEventListener('auth:logout', handleLogout);

    return () => {
        window.removeEventListener('auth:login', handleLogin);
        window.removeEventListener('auth:logout', handleLogout);
    };
};

// Password validation
export const validatePassword = (password) => {
    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }
    if (!/\d/.test(password)) {
        return 'Password must contain at least one number';
    }
    return null;
};

// Email validation
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Form validation
export const validateAuthForm = (formData, isLogin = false) => {
    const errors = {};

    if (!formData.email || !validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (formData.password.length < 6 && !isLogin) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    if (!isLogin && (!formData.name || formData.name.trim().length < 2)) {
        errors.name = 'Name must be at least 2 characters';
    }

    return errors;
};
