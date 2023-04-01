import { StickyButton } from '~/ameliance-ui/components/_LAB/StickyButton';
import { Button } from '~/ameliance-ui/components/Button/Button';
import { ChevronUpIcon } from '~/ameliance-ui/components/icons/ChevronUpIcon';
import { useScreenQuery } from '~/ameliance-ui/hooks/useScreenQuery';

export function ScrollUpButton() {
	const { isScreenMD } = useScreenQuery();
	const offset = isScreenMD ? 64 : 24;

	return (
		<StickyButton popup offset={offset} inverseDirection hideOnScreensCount={1}>
			<Button
				onClick={() => document.body.scrollIntoView()}
			>
				<ChevronUpIcon />
			</Button>
		</StickyButton>
	);
}
