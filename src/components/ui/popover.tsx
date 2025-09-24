import React, { useState } from 'react';

export const Popover: React.FC<{ trigger: React.ReactNode; children: React.ReactNode }> = ({ trigger, children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <span onClick={() => setOpen(!open)}>{trigger}</span>
            {open && <div>{children}</div>}
        </div>
    );
};

export const PopoverContent: React.FC<{ trigger: React.ReactNode; children: React.ReactNode }> = Popover;
export const PopoverTrigger: React.FC<{ trigger: React.ReactNode; children: React.ReactNode }> = Popover;
