import Snowfall from 'react-snowfall';

import s from './Snow.module.scss';

export function Snow() {
	return (
		<div className={s.Snow}>
			<Snowfall
				color="white"
				snowflakeCount={200}
				wind={[0, 0]}
				speed={[0.023, 0.025]}
			/>
		</div>
	);
}
