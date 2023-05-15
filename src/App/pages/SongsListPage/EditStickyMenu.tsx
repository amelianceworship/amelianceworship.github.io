import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { songsListSlice } from '~store/songsList/songsListSlice';

import { StickyMenu } from '~/ameliance-ui/components/_LAB/StickyMenu';

export function EditStickyMenu() {
	const { isPlayerShow } = useTypedSelector((state) => state.musicPlayerReducer);
	const { pageMode } = useTypedSelector((state) => state.songsListReducer);
	const playerOffset = isPlayerShow && 174;
	const defaultOffset = pageMode === 'list' && 0;
	const offset = playerOffset || defaultOffset || 0;

	const dispatch = useTypedDispatch();
	const { actions } = songsListSlice;

	const selectionOnClick = () => {
		dispatch(actions.setPageMode('selection'));
	};

	return (
		<StickyMenu
			offset={offset}
			inverseDirection
			menuItems={[
				// { title: 'Додати групу', action: () => console.log('01') },
				// { title: 'Перейменувати групу', action: () => console.log('04') },
				// { title: 'Перейменувати пісню', action: () => console.log('03') },
				// { title: 'Додати пісню', action: () => console.log('02') },
				{ title: 'Вибрати', action: selectionOnClick },
			]}
		/>
	);
}
