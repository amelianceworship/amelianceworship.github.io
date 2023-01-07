import React, { useEffect, useState } from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Icon } from '~components/Icon';

import s from './FileUpload.module.scss';

interface Props {
	icon: string;
}

export function FileUpload({
	icon,
}: Props) {
	return (
		<div>
			<label htmlFor="file">
				<Icon icon={icon} isClickable />
				<input
					type="file"
					className={s.input}
					id="file"
				/>
			</label>
		</div>
	);
}
