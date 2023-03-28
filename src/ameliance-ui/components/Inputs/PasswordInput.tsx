import { forwardRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Icon } from '../Icon';
import { EyeOffIcon } from '../icons/EyeOffIcon';
import { EyeOnIcon } from '../icons/EyeOnIcon';
import { Typography } from '../Typography';

import typography from '../Typography/Typography.module.scss';
import cs from './commonStyle.module.scss';
import s from './PasswordInput.module.scss';

type ComponentElementType = HTMLInputElement;

export interface PasswordInputProps extends ReactHTMLElementAttributes<ComponentElementType> {
	register?: FieldValues;
	errors?: Record<string, FieldError> | undefined;
}

export const PasswordInput = forwardRef<ComponentElementType, PasswordInputProps>(({
	register,
	errors,
	placeholder,
	children,
	...rest
}, ref) => {
	const [isShowPassword, setIsShowPassword] = useState(false);

	const handlerIconClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setIsShowPassword((prev) => !prev);
	};

	const inputType = isShowPassword ? 'text' : 'password';

	return (
		<div className={cs.container}>
			<Typography component="h5">{children}</Typography>
			<div className={cs.inputBlockContainer}>
				<label className={s.inputContainer}>
					<input
						type={inputType}
						className={asm.join(s.input, cs.input, typography.input)}
						placeholder={placeholder}
						ref={ref}
						{...register}
						{...rest}
					/>
					<Icon size="custom" style={{ width: 20, height: 20 }} className={s.icon} onClick={handlerIconClick}>
						{isShowPassword
							? <EyeOnIcon size="custom" style={{ width: 20, height: 20 }} />
							: <EyeOffIcon size="custom" style={{ width: 20, height: 20 }} />}
					</Icon>
				</label>
				{register && (
					<Typography component="p2" className={asm.join(cs.error)}>
						{(errors && errors[register?.name] && errors[register?.name].message) || ''}
					</Typography>
				)}
			</div>
		</div>
	);
});

PasswordInput.displayName = 'PasswordInput';
