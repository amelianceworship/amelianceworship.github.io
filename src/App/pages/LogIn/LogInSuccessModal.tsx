import { Modal } from '~/asmlib/components/Modal';

interface LogInSuccessModal {
	onClose: () => void;
}

export function LogInSuccessModal({ onClose }: LogInSuccessModal) {
	return (
		<Modal
			onClose={onClose}
			type="success"
			size="medium"
			title="Вітаю!"
		>
			<p className="p1 center">
				Ви успішно увійшли на сайт та отримали доступ до додаткового функціоналу!
			</p>
		</Modal>
	);
}
