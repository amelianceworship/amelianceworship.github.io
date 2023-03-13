import { forwardRef } from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '~/asmlib/components/Typography';

import s from './TextInput.module.scss';

type ComponentElementType = HTMLInputElement;

interface TextInput extends ReactHTMLElementAttributes<ComponentElementType> {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
}

export const TextInput = forwardRef<ComponentElementType, TextInput>(({
	register,
	errors,
	placeholder,
	children,
	...rest
}: TextInput, ref) => (
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
			{(errors && errors[register.name] && errors[register.name].message) || ''}
		</Typography>
	</div>
));

TextInput.displayName = 'TextInput';
