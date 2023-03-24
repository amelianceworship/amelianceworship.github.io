import { forwardRef, useState } from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import s from './Dropdown.module.scss';

type ComponentElementType = HTMLSelectElement;

export interface DropdownProps extends ReactHTMLElementAttributes<ComponentElementType> {
	options: string[];
	register?: FieldValues;
	errors?: Record<string, FieldError> | undefined;
	selected?: string;
	onDropdownChange?: (key: string) => void;
}

export const Dropdown = forwardRef<ComponentElementType, DropdownProps>(({
	options,
	register,
	errors,
	selected,
	onDropdownChange,
	children,
	className,
	...rest
}, ref) => {
	const [selectedValue, setSelectedValue] = useState(selected);
	const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value);
		if (onDropdownChange) {
			onDropdownChange(event.target.value);
		}
	};

	return (
		<div className={s.Dropdown}>
			<Typography component="h5">{children}</Typography>
			<label>
				<select
					className={asm.join(s.input, className, 'input dropdown')}
					value={selectedValue}
					onChange={handleOnChange}
					ref={ref}
					{...register}
					{...rest}
				>
					<option> </option>
					{options.map((optionValue) => (
						<option key={optionValue} value={optionValue}>
							{optionValue}
						</option>
					))}
				</select>
			</label>
			<Typography component="p2" className={asm.join(s.error, 'input-error')}>
				{(errors && errors[register?.name] && errors[register?.name].message) || ''}
			</Typography>
		</div>
	);
});

Dropdown.displayName = 'Dropdown';
