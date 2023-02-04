import React from 'react';

interface IFormGroup {
    labelName: string
    labelText: string
    inputName?: string
    inputType: TInputTypes
    value?: string | number
    placeholder?: string
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
    error?: string
    displayError?: boolean
}

export type TInputTypes =
    | "text"
    | "password"
    | "submit"
    | "radio"
    | "checkbox"
    | "button"
    | "tel"
    | "email"
    | "date"
    | "number"

const FormGroup = ({ labelName, labelText, inputName, inputType, value, placeholder, onChange, displayError, error, onBlur }: IFormGroup) => {
    return (
        <div className='mb-[16px]'>
            <div className='flex items-center justify-between gap-x-[18px]'>
                <label
                    htmlFor={labelName}
                    className='text-primary'
                >
                    {labelText}
                </label>
                <input
                    type={inputType}
                    name={inputName}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    className='border-1 border-solid border-lightGrey p-[5px] text-[18px] text-primary rounded-[5px] transition duration-300 ease-linear max-w-[300px] w-full hover:bg-footer focus:outline-none border-2 border-solid border-grey'
                />
            </div>
            <p
                className='text-12 text-secondary'
                style={{display: displayError ? 'block' : 'none'}}
            >
                {error}
            </p>
        </div>
    );
};

export default FormGroup;