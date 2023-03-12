import { forwardRef, useEffect, useState } from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Avatar } from '../Avatar';
import { CameraIcon } from '../icons/CameraIcon';
import { Typography } from '../Typography';

import s from './FileImgUpload.module.scss';

type ComponentElementType = HTMLInputElement;

interface FileImgUpload extends ReactHTMLElementAttributes<ComponentElementType> {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	watch: (name: string) => FieldValues;
	accept?: string;
	label?: string;
}

export const FileImgUpload = forwardRef<ComponentElementType, FileImgUpload>(({
	register,
	errors,
	watch,
	accept,
	label,
	children,
	className,
	...rest
}: FileImgUpload, ref) => {
	const [image, setImage] = useState<string>();
	const files = watch(register.name);
	useEffect(() => {
		let fileImage = '';
		if (files && files.length > 0) {
			fileImage = URL.createObjectURL(files[0]);
		}
		setImage(fileImage);
	}, [files]);

	return (
		<div className={s.FileImgUpload}>
			<span className="h5">{children}</span>
			<label className={asm.join(s.container, 'p1')}>
				<input
					type="file"
					accept={accept || ''}
					className={asm.join(s.input, className)}
					ref={ref}
					{...register}
					{...rest}
				/>
				{!image ? <Avatar><CameraIcon /></Avatar>
					: <Avatar src={image} alt={image} /> }
				{label}
			</label>
			<Typography component="p2" className={asm.join(s.error, 'input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</Typography>
		</div>
	);
});

FileImgUpload.displayName = 'FileImgUpload';

// <div
// 	className={asm.join(s.FileImgUpload, className, componentClass)}
// 	ref={ref}
// 	{...rest}
// >
// 	{children}
// </div>

// import React, { useEffect, useState } from 'react';
// import type { FieldError, FieldValues } from 'react-hook-form';

// import asm from 'asm-ts-scripts';

// import { Avatar } from '~components/Avatar';

// import s from './FileImgUpload.module.scss';

// interface IProps {
// 	register: FieldValues;
// 	errors: Record<string, FieldError> | undefined;
// 	watch: (name: string) => FieldValues;
// 	placeholder?: string;
// 	children?: React.ReactNode;
// 	testId?: string;
// 	accept?: string;
// 	label?: string;
// }

// export function FileImgUpload({
// 	register,
// 	errors,
// 	watch,
// 	children,
// 	placeholder,
// 	testId,
// 	accept,
// 	label,
// }: IProps) {
// 	const [image, setImage] = useState<string>();
// 	const files = watch(register.name);
// 	useEffect(() => {
// 		let fileImage = '';
// 		if (files && files.length > 0) {
// 			fileImage = URL.createObjectURL(files[0]);
// 		}
// 		setImage(fileImage);
// 	}, [files]);

// 	return (
// 		<div className={s.FileImgUpload}>
// 			<span className="h5">{children}</span>
// 			<label className={asm.join(s.container, 'p1')}>
// 				<input
// 					className={s.input}
// 					type="file"
// 					{...register}
// 					placeholder={placeholder}
// 					accept={accept || ''}
// 					data-testid={testId}
// 				/>
// 				{!image ? <Avatar icon="icon--camera" />
// 					: <Avatar src={image} alt={image} /> }
// 				{label}
// 			</label>
// 			<p className={asm.join(s.error, 'p2 input-error')}>
// 				{(errors && errors[register.name] && errors[register.name].message) || ''}
// 			</p>
// 		</div>
// 	);
// }
