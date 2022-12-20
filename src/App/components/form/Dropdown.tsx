import './Dropdown.scss';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { FieldError } from 'react-hook-form/dist/types/errors';

interface IProps {
  options: string[];
  register: FieldValues;
  errors: Record<string, FieldError> | undefined;
  placeholder?: string;
  children?: React.ReactNode;
  testId?: string;
}

export function Dropdown({ options, register, errors, children, testId }: IProps) {
  return (
    <div className="dropdown">
      <span className="h3 dropdown__label">{children}</span>
      <label className="dropdown__container">
        <select className="dropdown__input input dropdown" {...register} data-testid={testId}>
          <option className="dropdown__option"> </option>
          {options.map((optionValue) => (
            <option className="dropdown__option" key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          ))}
        </select>
      </label>
      <p className="p2 dropdown__error input-error">
        {(errors && errors[register.name] && errors[register.name].message) || ''}
      </p>
    </div>
  );
}
