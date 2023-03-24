import { Modal } from '~/ameliance-ui/components/Modal';

interface SignUpErrorModal {
	onClose: () => void;
}

export function SignUpErrorModal({ onClose }: SignUpErrorModal) {
	return (
		<Modal
			onClose={onClose}
			type="error"
			size="medium"
			title="Невірні дані!"
		>
			<>
				<p className="p1 center">
					Невірно заповнені поля, або такий користувач вже існує.
				</p>
				<p className="p1 center">
					Перевірте, будь ласка, дані та спробуйте ще раз!
				</p>
			</>
		</Modal>
	);
}
