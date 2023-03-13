// className={asm.join(s.SvgIcon, className, componentClass)}

import type { SvgIconProps } from '~/asmlib/components/SvgIcon';
import { SvgIcon } from '~/asmlib/components/SvgIcon';

export function MenuIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M3.55844 12.8077H21.5584" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M3.55844 6.80774H21.5584" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M3.55844 18.8077H21.5584" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}
