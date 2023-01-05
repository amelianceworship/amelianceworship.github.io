import React, { useState } from 'react';

import asm from 'asm-ts-scripts';

import s from './Dropdown.module.scss';

interface IProps {
	options: string[];
	selected?: string;
	children?: React.ReactNode;
	testId?: string;
	disabled?: boolean;
	onChange?: (key: string) => void;
}

export function Dropdown({
	options, children, testId, selected, disabled, onChange,
}: IProps) {
	const [selectedValue, setSelectedValue] = useState(selected);
	const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value);
		if (onChange) {
			onChange(event.target.value);
		}
	};

	return (
		<div className={s.Dropdown}>
			<span className="h3">{children}</span>
			<label>
				<select
					className={asm.joinClasses(s.input, 'input input dropdown')}
					value={selectedValue}
					onChange={handleOnChange}
					disabled={disabled}
					data-testid={testId}
				>
					{options.map((optionValue) => (
						<option key={optionValue} value={optionValue}>
							{optionValue}
						</option>
					))}
				</select>
			</label>
		</div>
	);
}
