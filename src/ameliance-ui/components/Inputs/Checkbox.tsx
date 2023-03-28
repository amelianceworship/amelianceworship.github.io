import { forwardRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import s from './Checkbox.module.scss';
import cs from './commonStyle.module.scss';

type ComponentElementType = HTMLInputElement;

export interface CheckboxProps extends ReactHTMLElementAttributes<ComponentElementType> {
	register?: FieldValues;
	errors?: Record<string, FieldError> | undefined;
	label: string;
}

export const Checkbox = forwardRef<ComponentElementType, CheckboxProps>(({
	register = null,
	errors,
	label,
	children,
	...rest
}, ref) => (

	<div className={cs.container}>
		<Typography component="h3">{children}</Typography>
		<div className={cs.inputBlockContainer}>
			<label className={s.inputContainer}>
				<input
					type="checkbox"
					ref={ref}
					{...register}
					{...rest}
				/>
				<Typography component="p1">{label}</Typography>
			</label>
			{register && (
				<Typography component="p2" className={asm.join(cs.error)}>
					{(errors && errors[register.name] && errors[register.name].message) || ''}
				</Typography>
			)}
		</div>
	</div>
));

Checkbox.displayName = 'Checkbox';
