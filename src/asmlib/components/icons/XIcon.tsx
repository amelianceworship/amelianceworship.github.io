// className={asm.join(s.SvgIcon, className, componentClass)}

import type { SvgIconProps } from '~/asmlib/components/SvgIcon';
import { SvgIcon } from '~/asmlib/components/SvgIcon';

export function XIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}
