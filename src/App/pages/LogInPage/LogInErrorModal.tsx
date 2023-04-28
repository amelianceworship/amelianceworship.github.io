import { Modal } from '~/ameliance-ui/components/Modal';
import { Typography } from '~/ameliance-ui/components/Typography';

interface LogInErrorModal {
	onClose: () => void;
	error: string;
}

export function LogInErrorModal({ onClose, error }: LogInErrorModal) {
	return (
		<Modal
			onClose={onClose}
			type="error"
			size="medium"
			title="Невірні дані!"
		>
			<>
				<Typography component="p1" className="center">
					Помилка при вході!
				</Typography>
				<Typography component="caption" className="center">
					{error}
				</Typography>
			</>
		</Modal>
	);
}
