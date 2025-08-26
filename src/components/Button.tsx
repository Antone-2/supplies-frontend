import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    className = '',
    type = 'button'
}) => {
    const baseStyles = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-light focus:ring-primary',
        secondary: 'bg-primary text-white hover:bg-primary-light focus:ring-primary',
        outline: 'border border-primary text-primary hover:bg-primary/10 focus:ring-primary',
        ghost: 'bg-primary text-white hover:bg-primary-light focus:ring-primary',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
