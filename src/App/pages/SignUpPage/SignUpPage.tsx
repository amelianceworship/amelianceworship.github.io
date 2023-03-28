import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { GoogleColorIcon } from '~components/SVG/GoogleColorIcon';
import { ROUTES } from '~constants/ROUTES';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { createUser } from '~store/user/actions/createUser';
import { signInWithGoogle } from '~store/user/actions/signInWithGoogle';
import { userSlice } from '~store/user/userSlice';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Main } from '~/ameliance-ui/components/blocks/Main';
import { Button } from '~/ameliance-ui/components/Button';
import { Form } from '~/ameliance-ui/components/Form';
import { Grid } from '~/ameliance-ui/components/Grid';
import {
	EmailInput, FileImgUpload, PasswordInput, TextInput,
} from '~/ameliance-ui/components/Inputs';
import { LinkLabel } from '~/ameliance-ui/components/Link';
import { Typography } from '~/ameliance-ui/components/Typography';

import { SignUpErrorModal } from './SignUpErrorModal';
import { SignUpSuccessModal } from './SignUpSuccessModal';

import s from './SignUpPage.module.scss';

interface FormFields {
	userName: string;
	email: string;
	password: string;
	profileImage: FileList;
}

export function SignUpPage() {
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

	const handleSignInWithGoogle = () => {
		dispatch(signInWithGoogle());
	};

	const handlerSuccessModal = () => {
		reset();
		navigate(ROUTES.home);
	};

	const handlerErrorModal = () => {
		dispatch(actions.resetError());
	};

	return (
		<Main>
			<Grid container className={s.container}>
				{/* {isLoading && <LoaderOverlay />} */}
				<Typography component="h4">Реєстрація</Typography>
				<Form
					className={s.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					<FileImgUpload
						watch={watch}
						register={registers.profileImage}
						errors={errors}
						accept=".jpg, .jpeg, .png"
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
					<Block className={s.buttons}>
						<Button
							submit
							disabled={!isDirty || !isValidFixed}
						>
							Створити
						</Button>
						<Button type="secondary" onClick={handleSignInWithGoogle}>
							<GoogleColorIcon />
							Увійти через Google
						</Button>
						<Typography component="p1">
							Вже є акаунт?
							{' '}
							<Link className="link" to={ROUTES.login}><LinkLabel>Увійти</LinkLabel></Link>
						</Typography>
					</Block>
				</Form>
			</Grid>
			{(uid && !isLoading) ? <SignUpSuccessModal onClose={handlerSuccessModal} /> : null}
			{(error && !isLoading) ? <SignUpErrorModal onClose={handlerErrorModal} /> : null}
		</Main>
	);
}
