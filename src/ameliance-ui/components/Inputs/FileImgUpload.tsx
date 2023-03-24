import { forwardRef, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Avatar } from '../Avatar';
import { CameraIcon } from '../icons/CameraIcon';
import { Typography } from '../Typography';

import s from './FileImgUpload.module.scss';

type ComponentElementType = HTMLInputElement;

export interface FileImgUploadProps extends ReactHTMLElementAttributes<ComponentElementType> {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	watch: (name: string) => FieldValues;
	accept?: string;
	label?: string;
}

export const FileImgUpload = forwardRef<ComponentElementType, FileImgUploadProps>(({
	register,
	errors,
	watch,
	accept,
	label,
	children,
	className,
	...rest
}, ref) => {
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
