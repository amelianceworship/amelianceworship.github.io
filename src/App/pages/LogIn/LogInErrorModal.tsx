import { Modal } from '~components/Modal';

interface LogInErrorModal {
	onClose: () => void;
}

export function LogInErrorModal({ onClose }: LogInErrorModal) {
	return (
		<Modal
			onClose={onClose}
			type="error"
			size="medium"
			heading="Невірні дані!"
		>
			<>
				<p className="p1 center">
					Невірно вказана електронна адреса чи пароль.
				</p>
				<p className="p1 center">
					Перевірте, будь ласка, дані та спробуйте ще раз!
				</p>
			</>
		</Modal>
	);
}
