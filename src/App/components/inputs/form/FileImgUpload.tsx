import React, { useEffect, useState } from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import s from './FileImgUpload.module.scss';

interface IProps {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	watch: (name: string) => FieldValues;
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
	accept?: string;
}

export function FileImgUpload({
	register,
	errors,
	watch,
	children,
	placeholder,
	testId,
	accept,
}: IProps) {
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
			<span className="h3">{children}</span>
			<label className={asm.joinClasses(s.container, 'p1')}>
				<input
					type="file"
					// className="file-img-upload__input" // TODO: check is need
					{...register}
					placeholder={placeholder}
					accept={accept || ''}
					data-testid={testId}
				/>
				{image && <img className={s.imgPreview} src={image} alt={image} />}
			</label>
			<p className={asm.joinClasses(s.error, 'p2 input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}
