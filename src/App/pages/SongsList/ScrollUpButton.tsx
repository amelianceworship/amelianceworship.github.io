import { Button } from '~components/inputs/Button';
import { StickyButton } from '~components/StickyButton';

export function ScrollUpButton() {
	return (
		<StickyButton popup inverseDirection hideOnScreensCount={1}>
			<Button
				icon="icon--chevron-up"
				onClick={() => document.body.scrollIntoView()}
				buttonIcon
			/>
		</StickyButton>
	);
}
