import { forwardRef } from 'react';

import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { songsListSlice } from '~store/songsList/songsListSlice';

import type { StickyMenuElement } from '~/ameliance-ui/components/_LAB/StickyMenu';
import { StickyMenu } from '~/ameliance-ui/components/_LAB/StickyMenu';

export const EditStickyMenu = forwardRef<StickyMenuElement>((_, ref) => {
	const dispatch = useTypedDispatch();
	const { actions } = songsListSlice;

	const selectionOnClick = () => {
		dispatch(actions.setPageMode('selection'));
	};

	return (
		<StickyMenu
			inverseDirection
			menuItems={[
				{ title: 'Вибрати', action: selectionOnClick },
			]}
			ref={ref}
		/>
	);
});

EditStickyMenu.displayName = 'EditStickyMenu';
