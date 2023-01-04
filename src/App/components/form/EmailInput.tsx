import React from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

import './EmailInput.scss';

interface IProps {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
}

export function EmailInput({
	register, errors, children, placeholder, testId,
}: IProps) {
	return (
		<div className="text-input">
			<span className="h3 text-input__label">{children}</span>
			<label className="text-input__container">
				<input
					type="email"
					className="text-input__input input text"
					{...register}
					placeholder={placeholder}
					data-testid={testId}
				/>
			</label>
			<p className="p2 text-input__error input-error">
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}
