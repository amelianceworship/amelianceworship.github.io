import React from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import s from '../Dropdown.module.scss';

interface IProps {
	options: string[];
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
}

export function Dropdown({
	options, register, errors, children, testId,
}: IProps) {
	return (
		<div className={s.Dropdown}>
			<span className="h3">{children}</span>
			<label>
				<select
					className={asm.join(s.input, 'input input dropdown')}
					{...register}
					data-testid={testId}
				>
					<option className="dropdown__option"> </option>
					{options.map((optionValue) => (
						<option className="dropdown__option" key={optionValue} value={optionValue}>
							{optionValue}
						</option>
					))}
				</select>
			</label>
			<p className={asm.join(s.input, 'p2 input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}
