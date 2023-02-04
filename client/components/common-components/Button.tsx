import React from 'react';

interface IButton {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    disabled?: boolean
}

const Button = ({ children, className, onClick, disabled }: IButton) => {
    return (
        <button
            className={`rounded-[5px] cursor-pointer transition duration-300 ease-linear pt-[12px] pb-[12px] pr-[24px] pl-[24px] ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;