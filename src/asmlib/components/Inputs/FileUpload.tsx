import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './FileUpload.module.scss';

type ComponentElementType = HTMLInputElement;

interface FileUpload extends ReactHTMLElementAttributes<ComponentElementType> {
	icon: string;
}

export const FileUpload = forwardRef<ComponentElementType, FileUpload>(({
	children,
	className,
	...rest
}: FileUpload, ref) => (

	<div>
		<label htmlFor="file">
			{children}
			<input
				type="file"
				className={asm.join(s.input, className)}
				id="file"
				ref={ref}
				{...rest}
			/>
		</label>
	</div>
));

FileUpload.displayName = 'FileUpload';

// <div
// 	className={asm.join(s.FileUpload, className, componentClass)}
// 	ref={ref}
// 	{...rest}
// >
// 	{children}
// </div>

// import { Icon } from '~components/Icon';

// import s from './FileUpload.module.scss';

// interface Props {
// 	icon: string;
// }

// export function FileUpload({
// 	icon,
// }: Props) {
// 	return (
// 		<div>
// 			<label htmlFor="file">
// 				<Icon icon={icon} />
// 				<input
// 					type="file"
// 					className={s.input}
// 					id="file"
// 				/>
// 			</label>
// 		</div>
// 	);
// }
