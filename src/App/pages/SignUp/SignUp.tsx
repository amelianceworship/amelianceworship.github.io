import { SubmitHandler, useForm } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Checkbox } from '~components/inputs/form/Checkbox';
import { EmailInput } from '~components/inputs/form/EmailInput';
import { FileImgUpload } from '~components/inputs/form/FileImgUpload';
import { PasswordInput } from '~components/inputs/form/PasswordInput';
import { TextInput } from '~components/inputs/form/TextInput';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { createUser } from '~store/user/actions/createUser';

import s from './SignUp.module.scss';

interface FormFields {
	login: string;
	email: string;
	password: string;
	avatar: FileList;
 }

export function SignUp() {

	const dispatch = useTypedDispatch();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty },
	} = useForm<FormFields>({
		mode: 'onSubmit',
		defaultValues: {
			login: '',
			email: '',
			password: '',
			avatar: undefined,
		},
	});

	const isValidFixed = asm.isObjectEmpty(errors);//* fix isValid default has false

	const registers = {
		login: register('login', {
			required: 'Поле таке пусте! Введіть більше символів!',
			pattern: { value: /^[a-zA-Z]+$/, message: 'Використовуйте тільки латинські літери та цифри!' },
		}),
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
		avatar: register('avatar', {
			required: 'Будь ласка, оберіть фотографію!',
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async ({ email, password }: FormFields) => {
		dispatch(createUser({ email, password }));
		// reset();
	};

	return (
		<main className="main">
			<div className={asm.joinClasses(s.container, 'container')}>
				<h2 className="h2">Створення облікового запису</h2>
				<form
					className="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextInput register={registers.login} errors={errors}>
						Логін*:
					</TextInput>
					<EmailInput register={registers.email} errors={errors}>
						Адреса електронної пошти*:
					</EmailInput>
					<PasswordInput register={registers.password} errors={errors}>
						Пароль*:
					</PasswordInput>
					<FileImgUpload
						watch={watch}
						register={registers.avatar}
						errors={errors}
						accept=".jpg, .jpeg, .png"
						testId="avatar"
					>
						Аватарка*:
					</FileImgUpload>
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
