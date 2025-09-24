import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Textarea: React.FC<TextareaProps> = (props) => {
    return <textarea {...props} />;
};
