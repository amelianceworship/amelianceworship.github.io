import { forwardRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import s from './EmailInput.module.scss';

type ComponentElementType = HTMLInputElement;

export interface EmailInputProps extends ReactHTMLElementAttributes<ComponentElementType> {
	register?: FieldValues;
	errors?: Record<string, FieldError> | undefined;
}

export const EmailInput = forwardRef<ComponentElementType, EmailInputProps>(({
	register,
	errors,
	placeholder,
	children,
	...rest
}, ref) => (
	<div className={s.EmailInput}>
		<Typography component="h5">{children}</Typography>
		<label>
			<input
				type="email"
				className={asm.join(s.input, 'input text')}
				placeholder={placeholder}
				ref={ref}
				{...register}
				{...rest}
			/>
		</label>
		<Typography component="p2" className={asm.join(s.error, 'input-error')}>
			{(errors && errors[register?.name] && errors[register?.name].message) || ''}
		</Typography>
	</div>
));

EmailInput.displayName = 'EmailInput';
