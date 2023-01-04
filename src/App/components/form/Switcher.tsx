import React from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

import './Switcher.scss';

interface IProps {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	label: string;
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
}

export function Switcher({
	register, errors, label, children, testId,
}: IProps) {
	return (
		<div className="switcher">
			<span className="h3 switcher__label">{children}</span>
			<label className="switcher__container">
				<input type="checkbox" className="switcher__checkbox" {...register} data-testid={testId} />
				<div className="switcher__element" />
				<span className="p1 switcher__label">{label}</span>
			</label>
			<p className="p2 switcher__error input-error">
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}
