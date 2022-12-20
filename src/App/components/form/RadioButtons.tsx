import './RadioButtons.scss';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { FieldError } from 'react-hook-form/dist/types/errors';

interface IProps {
  register: FieldValues;
  errors: Record<string, FieldError> | undefined;
  labels: (string | number)[];
  placeholder?: string;
  children?: React.ReactNode;
  testId?: string;
}

export function RadioButtons({ register, errors, labels, children, testId }: IProps) {
  return (
    <div className="radio-buttons">
      <span className="h3 radio-buttons__title">{children}</span>
      <div className="radio-buttons__container">
        {labels.map((value, i) => (
          <div key={i} className="radio-button">
            <label className="radio-button__container">
              <input
                type="radio"
                className="radio-button__input"
                {...register}
                value={value.toString()}
                data-testid={testId}
              ></input>
              <span className="p1 radio-button__label">{value}</span>
            </label>
          </div>
        ))}
      </div>
      <p className="p2 radio-buttons__error input-error">
        {(errors && errors[register.name] && errors[register.name].message) || ''}
      </p>
    </div>
  );
}
