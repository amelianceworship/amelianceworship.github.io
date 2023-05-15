import { useTypedSelector } from '~store/hooks/useTypedSelector';

import { StickyButton } from '~/ameliance-ui/components/_LAB/StickyButton';
import { Button } from '~/ameliance-ui/components/Button/Button';
import { ChevronUpIcon } from '~/ameliance-ui/components/icons/ChevronUpIcon';

export function ScrollUpButton() {
	const { isPlayerShow } = useTypedSelector((state) => state.musicPlayerReducer);
	const offset = isPlayerShow ? 232 : 64;

	return (
		<StickyButton animation="popup" offset={offset} inverseDirection hideOnScreensCount={1}>
			<Button
				onClick={() => document.body.scrollIntoView()}
			>
				<ChevronUpIcon />
			</Button>
		</StickyButton>
	);
}
