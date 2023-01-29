import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { Button } from '~components/inputs/Button';
import { Checkbox } from '~components/inputs/form/Checkbox';
import { EmailInput } from '~components/inputs/form/EmailInput';
import { FileImgUpload } from '~components/inputs/form/FileImgUpload';
import { PasswordInput } from '~components/inputs/form/PasswordInput';
import { TextInput } from '~components/inputs/form/TextInput';
import { LoaderOverlay } from '~components/LoaderOverlay';
import { ROUTES } from '~constants/ROUTES';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { createUser } from '~store/user/actions/createUser';
import { userSlice } from '~store/user/userSlice';

import s from './SignUp.module.scss';
import { SignUpErrorModal } from './SignUpErrorModal';
import { SignUpSuccessModal } from './SignUpSuccessModal';

interface FormFields {
	userName: string;
	email: string;
	password: string;
	profileImage: FileList;
}

export function SignUp() {
	const navigate = useNavigate();

	const dispatch = useTypedDispatch();
	const { error, isLoading, uid } = useTypedSelector((state) => state.userReducer);
	const { actions } = userSlice;

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty },
	} = useForm<FormFields>({
		mode: 'onSubmit',
		defaultValues: {
			userName: '',
			email: '',
			password: '',
			profileImage: undefined,
		},
	});

	const isValidFixed = asm.isObjectEmpty(errors);//* fix isValid default has false

	const registers = {
		userName: register('userName', {
			required: 'Поле таке пусте! Введіть більше символів!',
			pattern: { value: /^[\sа-яА-ЯёЁъЪїЇіІєЄґҐa-zA-Z_]+$/, message: 'Використовуйте тільки літери, пробіл або нижнє підкреслення!' },
			minLength: { value: 2, message: 'Мінімальна довжина логіну 2 символів' },
			maxLength: { value: 32, message: 'Максимальна довжина логіну 32 символів' },
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
		profileImage: register('profileImage', {
			required: 'Будь ласка, оберіть зображення!',
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async ({
		userName, email, password, profileImage,
	}: FormFields) => {
		dispatch(createUser({
			displayName: userName, email, password, photo: profileImage[0],
		}));
	};

	const handlerSuccessModal = () => {
		reset();
		navigate(ROUTES.HOME);
	};

	const handlerErrorModal = () => {
		dispatch(actions.resetError());
	};

	return (
		<main className="main">
			<div className={asm.joinClasses(s.container, 'container')}>
				{isLoading && <LoaderOverlay />}
				<h2 className="h4">Реєстрація</h2>
				<form
					className={s.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					<FileImgUpload
						watch={watch}
						register={registers.profileImage}
						errors={errors}
						accept=".jpg, .jpeg, .png"
						testId="profile-image"
						label="Оберіть зображення"
					>
						Зображення профілю*:
					</FileImgUpload>
					<TextInput register={registers.userName} errors={errors}>
						Логін*:
					</TextInput>
					<EmailInput register={registers.email} errors={errors}>
						Адреса електронної пошти*:
					</EmailInput>
					<PasswordInput register={registers.password} errors={errors}>
						Пароль*:
					</PasswordInput>
					<Checkbox register={{}} errors={errors} label="Я хочу поставити галочку" />
					<div className={s.buttons}>
						<Button
							isSubmit
							disabled={!isDirty || !isValidFixed}
						>
							Створити
						</Button>
						<p className="p1">
							Вже є акаунт?
							{' '}
							<Link className="link" to={ROUTES.LOGIN}>Увійти</Link>
						</p>
					</div>
				</form>
			</div>
			{(uid && !isLoading) ? <SignUpSuccessModal onClose={handlerSuccessModal} /> : null}
			{(error && !isLoading) ? <SignUpErrorModal onClose={handlerErrorModal} /> : null}
		</main>
	);
}
