import React from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import s from './EmailInput.module.scss';

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
		<div className={s.EmailInput}>
			<span className="h3">{children}</span>
			<label>
				<input
					type="email"
					className={asm.joinClasses(s.input, 'input text')}
					{...register}
					placeholder={placeholder}
					data-testid={testId}
				/>
			</label>
			<p className={asm.joinClasses(s.error, 'p2 input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}