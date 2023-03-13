import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { GoogleColorIcon } from '~components/SVG/GoogleColorIcon';
import { ROUTES } from '~constants/ROUTES';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { signIn } from '~store/user/actions/signIn';
import { signInWithGoogle } from '~store/user/actions/signInWithGoogle';
import { userSlice } from '~store/user/userSlice';

import { Block } from '~/asmlib/components/blocks/Block';
import { Main } from '~/asmlib/components/blocks/Main';
import { Button } from '~/asmlib/components/Button';
import { Form } from '~/asmlib/components/Form';
import { Grid } from '~/asmlib/components/Grid';
import { EmailInput, PasswordInput } from '~/asmlib/components/Inputs';
import { LinkLabel } from '~/asmlib/components/Link';
import { Typography } from '~/asmlib/components/Typography';

import { LogInErrorModal } from './LogInErrorModal';
import { LogInSuccessModal } from './LogInSuccessModal';

import s from './LogIn.module.scss';

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
		<Main>
			<Grid container className={s.container}>
				{/* {isLoading && <LoaderOverlay />} */}
				<Typography component="h4">Вхід</Typography>
				<Form
					className={s.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					<EmailInput register={registers.email} errors={errors}>
						Адреса електронної пошти*:
					</EmailInput>
					<PasswordInput register={registers.password} errors={errors}>
						Пароль*:
					</PasswordInput>
					<Block className={s.buttons}>
						<Button type="primary" submit>
							Увійти
						</Button>
						<Button type="secondary" onClick={handleSignInWithGoogle}>
							<GoogleColorIcon />
							Увійти через Google
						</Button>
						<Typography component="p1">
							Немає акаунту?
							{' '}
							<Link to={ROUTES.SIGNUP}><LinkLabel>Створити</LinkLabel></Link>
						</Typography>
					</Block>
				</Form>
			</Grid>
			{(uid && !isLoading) ? <LogInSuccessModal onClose={handlerSuccessModal} /> : null}
			{(error && !isLoading) ? <LogInErrorModal onClose={handlerErrorModal} /> : null}
		</Main>
	);
}
