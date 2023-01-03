import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { EmailInput } from '~components/form/EmailInput';
import { PasswordInput } from '~components/form/PasswordInput';
import { Modal } from '~components/Modal';
import { ROUTES } from '~constants/ROUTES';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { signIn } from '~store/user/actions/signIn';
import { signInWithGoogle } from '~store/user/actions/signInWithGoogle';

import { LogInModal } from './LogInModal';

interface FormFields {
	email: string;
	password: string;
 }

export function LogIn() {
	const [isShowModal, setIsShowModal] = useState(false);
	const navigate = useNavigate();

	const dispatch = useTypedDispatch();
	const { error, isLoading, id } = useTypedSelector((state) => state.userReducer);

	const {
		register,
		handleSubmit,
		reset,
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
		// dispatch(signIn({ email, password }));
		// reset();
	};

	const handleSignInWithGoogle = () => {
		dispatch(signInWithGoogle());
	};

	const handlerModal = () => {
		console.log('navigate(ROUTES.home)');
		setIsShowModal(false);
	};

	return (
		<main className="form-page main">
			<div className="container">
				<h2 className="h2">Увійти в обліковий запис</h2>
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
					<div className="form__buttons">
						<input
							className="button"
							type="submit"
							value="Увійти за допомогою електронної пошти"
						/>
						<button type="button" className="button secondary" onClick={handleSignInWithGoogle}>
							Увійти за допомогою Google
						</button>
						<p className="p1">
							Немає аккаунту?
							{' '}
							<Link className="link" to={ROUTES.signUp}>Створити обліковий запис</Link>
						</p>
						<button type="button" className="button secondary" onClick={() => setIsShowModal((prev) => !prev)}>
							modal
						</button>
					</div>
				</form>
			</div>
			{isShowModal && (
				<LogInModal title="Error" message="Hello" onClose={handlerModal} />
			)}
		</main>
	);
}
