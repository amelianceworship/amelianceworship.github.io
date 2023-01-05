import React from 'react';

import asm from 'asm-ts-scripts';

import s from './TextInput.module.scss';

interface IProps {
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
}

export function TextInput({
	children, placeholder, testId,
}: IProps) {
	return (
		<div className={s.TextInput}>
			<span className="h3">{children}</span>
			<label>
				<input
					type="input"
					className={asm.joinClasses(s.input, 'input text')}
					placeholder={placeholder}
					data-testid={testId}
				/>
			</label>
		</div>
	);
}
