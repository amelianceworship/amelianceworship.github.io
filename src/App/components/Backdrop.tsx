import './Backdrop.scss';

interface IBackdropProps {
	onClick?: () => void;
}

export function Backdrop({ onClick }: IBackdropProps) {
	// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
	return <div className="backdrop" onClick={onClick} />;
}
