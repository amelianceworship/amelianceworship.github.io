import { SubmitHandler, useForm } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Checkbox } from '~components/form/Checkbox';
import { EmailInput } from '~components/form/EmailInput';
import { PasswordInput } from '~components/form/PasswordInput';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { createUser } from '~store/user/actions/createUser';

interface FormFields {
	login: string;
	email: string;
	password: string;
 }

export function SignUp() {

	const dispatch = useTypedDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm<FormFields>({
		mode: 'onSubmit',
		defaultValues: {
			// login: '',
			email: '',
			password: '',
		},
	});

	const isValidFixed = asm.isObjectEmpty(errors);//* fix isValid default has false

	const registers = {
		email: register('email', {
			required: 'Поле таке пусте! Введіть більше символів!',
			pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: 'Невірно введена адреса електронної пошти!' },
		}),
		password: register('password', {
			required: 'Поле таке пусте! Введіть більше символів!',
			pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Використовуйте тільки латинські літери та цифри!' },
			minLength: { value: 8, message: 'Мінімальна довжина пароля 8 символів' },
			maxLength: { value: 16, message: 'Максимальна довжина пароля 16 символів' },
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async ({ login, email, password }: FormFields) => {
		dispatch(createUser({ email, password }));
		reset();
	};

	return (
		<main className="form-page main">
			<div className="container">
				<h2 className="h2">Створення облікового запису</h2>
				<form
					className="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<EmailInput register={registers.email} errors={errors}>
						Адреса електронної пошти*:
					</EmailInput>
					<PasswordInput register={registers.password} errors={errors}>
						Пароль*:
					</PasswordInput>
					<Checkbox register={{}} errors={errors} label="I am a good person" />
					<div className="form__buttons">
						<input
							className="button"
							type="submit"
							disabled={!isDirty || !isValidFixed}
							value="Створити"
						/>
					</div>
				</form>
			</div>
		</main>
	);
}
