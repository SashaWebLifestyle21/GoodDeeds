import React from 'react';

interface ITitle {
    children: React.ReactNode
    className?: string
}

const Title = ({ children, className }: ITitle) => {
    return (
        <h2 className={`text-[36px] text-center m-auto text-primary font-semiBold ${className}`}>{children}</h2>
    );
};

export default Title;