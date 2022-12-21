import './FileImgUpload.scss';
import React, { useEffect, useState } from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

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
    let image = '';
    if (files && files.length > 0) {
      image = URL.createObjectURL(files[0]);
    }
    setImage(image);
  }, [files]);

  return (
    <div className="file-img-upload">
      <span className="h3 file-img-upload__title">{children}</span>
      <label className="p1 file-img-upload__container">
        <input
          type="file"
          className="file-img-upload__input"
          {...register}
          placeholder={placeholder}
          accept={accept || ''}
          data-testid={testId}
        />
        {image && <img className="file-img-upload__img-preview" src={image} alt={image} />}
      </label>
      <p className="p2 file-img-upload__error input-error">
        {(errors && errors[register.name] && errors[register.name].message) || ''}
      </p>
    </div>
  );
}
