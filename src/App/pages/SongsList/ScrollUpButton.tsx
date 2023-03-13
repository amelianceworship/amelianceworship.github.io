import { StickyButton } from '~/asmlib/components/_REFACTOR/StickyButton';
import { Button } from '~/asmlib/components/Button/Button';
import { ChevronUpIcon } from '~/asmlib/components/icons/ChevronUpIcon';

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
