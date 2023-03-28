import { StickyButton } from '~/ameliance-ui/components/_LAB/StickyButton';
import { Button } from '~/ameliance-ui/components/Button/Button';
import { ChevronUpIcon } from '~/ameliance-ui/components/icons/ChevronUpIcon';

export function ScrollUpButton() {
	return (
		<StickyButton popup inverseDirection hideOnScreensCount={1}>
			<Button
				size="small"
				onClick={() => document.body.scrollIntoView()}
			>
				<ChevronUpIcon size="small" />
			</Button>
		</StickyButton>
	);
}
