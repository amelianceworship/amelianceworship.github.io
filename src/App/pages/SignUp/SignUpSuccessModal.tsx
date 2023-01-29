import { Modal } from '~components/Modal';

interface SignUpSuccessModal {
	onClose: () => void;
}

export function SignUpSuccessModal({ onClose }: SignUpSuccessModal) {
	return (
		<Modal
			onClose={onClose}
			type="success"
			size="medium"
			title="Вітаю!"
		>
			<p className="p1 center">
				Ви успішно зареєструвалися на сайті та отримали доступ до додаткового функціоналу!
			</p>
		</Modal>
	);
}
