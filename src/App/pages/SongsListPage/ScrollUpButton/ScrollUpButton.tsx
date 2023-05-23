import { forwardRef } from 'react';

import { StickyButton } from '~/ameliance-ui/components/_LAB/StickyButton';
import type { StickyMenuElement } from '~/ameliance-ui/components/_LAB/StickyMenu';
import { Button } from '~/ameliance-ui/components/Button/Button';
import { ChevronUpIcon } from '~/ameliance-ui/components/icons/ChevronUpIcon';

import s from './ScrollUpButton.module.scss';

export const ScrollUpButton = forwardRef<StickyMenuElement>((_, ref) => (
	<StickyButton className={s.ScrollUpButton} ref={ref} animation="popup" inverseDirection hideOnScreensCount={1}>
		<Button
			onClick={() => document.body.scrollIntoView()}
		>
			<ChevronUpIcon />
		</Button>
	</StickyButton>
));

ScrollUpButton.displayName = 'ScrollUpButton';
