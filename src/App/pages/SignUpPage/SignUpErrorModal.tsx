import { Modal } from '~/ameliance-ui/components/Modal';
import { Typography } from '~/ameliance-ui/components/Typography';

interface SignUpErrorModal {
	onClose: () => void;
	error: string;
}

export function SignUpErrorModal({ onClose, error }: SignUpErrorModal) {
	return (
		<Modal
			onClose={onClose}
			type="error"
			size="medium"
			title="Невірні дані!"
		>
			<>
				<Typography component="p1" className="center">
					Виникла помилка при реєстрації.
				</Typography>
				<Typography component="p1" className="center">
					Можливо такий користувач вже існує!
				</Typography>
				<Typography component="caption" className="center">
					{error}
				</Typography>
			</>
		</Modal>
	);
}
