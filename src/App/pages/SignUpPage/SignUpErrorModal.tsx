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
					Невірно заповнені поля, або такий користувач вже існує.
				</Typography>
				<Typography component="p1" className="center">
					Перевірте, будь ласка, дані та спробуйте ще раз!
				</Typography>
				<Typography component="caption" className="center">
					{error}
				</Typography>
			</>
		</Modal>
	);
}
