import { Modal } from '~/ameliance-ui/components/Modal';
import { Typography } from '~/ameliance-ui/components/Typography';

interface UserPageErrorModal {
	onClose: () => void;
	error: string;
}

export function UserPageErrorModal({ onClose, error }: UserPageErrorModal) {
	return (
		<Modal
			onClose={onClose}
			type="error"
			size="medium"
			title="Невірні дані!"
		>
			<>
				<Typography component="p1" className="center">
					Помилка при оновлені даних.
				</Typography>
				<Typography component="p1" className="center">
					Спробуйте, будь ласка, пізніше!
				</Typography>
				<Typography component="caption" className="center">
					{error}
				</Typography>
			</>
		</Modal>
	);
}
