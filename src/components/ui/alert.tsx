import React from 'react';

export const Alert: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
    <div role="alert" {...props}>{children}</div>
);

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, ...props }) => (
    <p {...props}>{children}</p>
);
