import React, { useState } from 'react';

import './Dropdown.scss';

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
		<div className="dropdown">
			<span className="h3 dropdown__label">{children}</span>
			<label className="dropdown__container">
				<select
					className="dropdown__input input dropdown"
					value={selectedValue}
					onChange={handleOnChange}
					disabled={disabled}
					data-testid={testId}
				>
					{options.map((optionValue) => (
						<option className="dropdown__option" key={optionValue} value={optionValue}>
							{optionValue}
						</option>
					))}
				</select>
			</label>
		</div>
	);
}
