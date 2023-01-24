interface Button {
	children: string;
	onClick?: () => void;
	isButtonIcon?: boolean;
	size?: 'normal' | 'small';
	iconPosition?: 'left' | 'right';
	icon?: string | undefined;
	disabled?: boolean;
	type?: 'primary' | 'secondary';
	id?: string;
	isSubmit?: boolean;
	form?: string;
}

export function Button({
	children,
	onClick,
	iconPosition,
	icon,
	id,
	isButtonIcon,
	size,
	type = 'primary',
	disabled = false,
	isSubmit,
	form,
}: Button) {
	let buttonClass;
	if (size === 'small') {
		if (isButtonIcon && icon) {
			buttonClass = 'button-icon-sm';
		} else {
			buttonClass = 'button-sm';
		}
	} else if (isButtonIcon && icon) {
		buttonClass = 'button-icon';
	} else {
		buttonClass = 'button';
	}

	const buttonClassAndType = `${buttonClass} ${type}`;

	return (
		<button
			type={isSubmit ? 'submit' : 'button'}
			id={id}
			className={buttonClassAndType}
			onClick={onClick}
			disabled={disabled}
			form={form}
		>
			{!isButtonIcon && icon && iconPosition === 'left' && (
				<span className={`icon left ${icon}`} />
			)}
			{isButtonIcon ? <span className={`icon center ${icon}`} /> : <span className="label">{children}</span>}
			{!isButtonIcon && icon && iconPosition === 'right' && (
				<span className={`icon right ${icon}`} />
			)}
		</button>
	);
}
