import { forwardRef } from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '~/asmlib/components/Typography';

import s from './EmailInput.module.scss';

type ComponentElementType = HTMLInputElement;

interface EmailInput extends ReactHTMLElementAttributes<ComponentElementType> {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
}

export const EmailInput = forwardRef<ComponentElementType, EmailInput>(({
	register,
	errors,
	placeholder,
	children,
	...rest
}: EmailInput, ref) => (
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
			{(errors && errors[register.name] && errors[register.name].message) || ''}
		</Typography>
	</div>
));

EmailInput.displayName = 'EmailInput';
