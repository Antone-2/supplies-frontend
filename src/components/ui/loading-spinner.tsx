import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'white' | 'gray' | 'current';
    text?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = 'blue',
    text,
    className
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    const colorClasses = {
        blue: 'border-blue-600',
        white: 'border-white',
        gray: 'border-gray-600',
        current: 'border-current'
    };

    const borderWidth = size === 'sm' ? 'border-2' : 'border-b-2';

    return (
        <div className={cn("flex flex-col items-center justify-center", className)}>
            <div
                className={cn(
                    "animate-spin rounded-full border-t-transparent",
                    sizeClasses[size],
                    borderWidth,
                    colorClasses[color]
                )}
            />
            {text && (
                <p className={cn(
                    "mt-4 text-gray-600 font-medium",
                    size === 'sm' ? 'text-xs' : 'text-sm'
                )}>
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;
