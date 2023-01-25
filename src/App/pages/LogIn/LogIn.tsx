import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { Button } from '~components/inputs/Button';
import { EmailInput } from '~components/inputs/form/EmailInput';
import { PasswordInput } from '~components/inputs/form/PasswordInput';
import { LoaderOverlay } from '~components/LoaderOverlay';
import { ROUTES } from '~constants/ROUTES';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { signIn } from '~store/user/actions/signIn';
import { signInWithGoogle } from '~store/user/actions/signInWithGoogle';
import { userSlice } from '~store/user/userSlice';

import s from './LogIn.module.scss';
import { LogInErrorModal } from './LogInErrorModal';
import { LogInSuccessModal } from './LogInSuccessModal';

interface FormFields {
	email: string;
	password: string;
}

export function LogIn() {
	const navigate = useNavigate();

	const dispatch = useTypedDispatch();
	const { error, isLoading, uid } = useTypedSelector((state) => state.userReducer);
	const { actions } = userSlice;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: '',
		},
	});

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

	const onSubmit: SubmitHandler<FormFields> = async ({ email, password }: FormFields) => {
		dispatch(signIn({ email, password }));
	};

	const handleSignInWithGoogle = () => {
		dispatch(signInWithGoogle());
	};

	const handlerSuccessModal = () => {
		navigate(ROUTES.HOME);
	};

	const handlerErrorModal = () => {
		dispatch(actions.resetError());
	};

	return (
		<main className="login-page main">
			<div className={asm.joinClasses(s.container, 'container')}>
				{isLoading && <LoaderOverlay />}
				<h3 className="h3">Вхід</h3>
				<form
					className={s.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					<EmailInput register={registers.email} errors={errors}>
						Адреса електронної пошти*:
					</EmailInput>
					<PasswordInput register={registers.password} errors={errors}>
						Пароль*:
					</PasswordInput>
					<div className={s.buttons}>
						<Button type="primary" isSubmit>
							Увійти
						</Button>
						<Button type="secondary" onClick={handleSignInWithGoogle}>
							Увійти за допомогою Google
						</Button>
						<p className="p1">
							Немає акаунту?
							{' '}
							<Link className="link" to={ROUTES.SIGNUP}>Створити обліковий запис</Link>
						</p>
					</div>
				</form>
			</div>
			{(uid && !isLoading) ? <LogInSuccessModal onClose={handlerSuccessModal} /> : null}
			{(error && !isLoading) ? <LogInErrorModal onClose={handlerErrorModal} /> : null}
		</main>
	);
}
