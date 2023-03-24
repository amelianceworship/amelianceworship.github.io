import { forwardRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import s from './TextInput.module.scss';

type ComponentElementType = HTMLInputElement;

export interface TextInputProps extends ReactHTMLElementAttributes<ComponentElementType> {
	register?: FieldValues;
	errors?: Record<string, FieldError> | undefined;
}

export const TextInput = forwardRef<ComponentElementType, TextInputProps>(({
	register,
	errors,
	placeholder,
	children,
	...rest
}, ref) => (
	<div className={s.TextInput}>
		<Typography component="h5">{children}</Typography>
		<label>
			<input
				type="text"
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

TextInput.displayName = 'TextInput';
