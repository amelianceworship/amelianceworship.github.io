import asm from 'asm-ts-scripts';

import s from './Avatar.module.scss';

interface Props {
	src: string;
	alt: string;
	char?: string;
	color?: string;
}

export function Avatar({
	src, alt, char, color,
}: Props) {
	return (
		<div>
			{src
				? <img className={s.img} src={src} alt={alt} />
				: (
					<div className={s.charContainer} style={{ backgroundColor: color }}>
						<h5 className={asm.joinClasses(s.char, 'h5')}>
							{char}
						</h5>
					</div>
				)}
		</div>
	);
}
