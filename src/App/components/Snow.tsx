import Snowfall from 'react-snowfall';

export function Snow() {
	return (
		<div style={{
			width: '100vw',
			height: '100vh',
			position: 'fixed',
			top: 0,
			left: 0,
			pointerEvents: 'none',
			opacity: '60%',
			filter: 'blur(1px)',
		}}
		>
			<Snowfall
				color="white"
				snowflakeCount={500}
				wind={[0, 0]}
				speed={[2, 4]}
			/>
		</div>
	);
}
