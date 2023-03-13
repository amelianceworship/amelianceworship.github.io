import { forwardRef } from 'react';

type ComponentElementType = HTMLImageElement;

type Img = ReactHTMLElementAttributes<
ComponentElementType, React.ImgHTMLAttributes<ComponentElementType>>;

export const Img = forwardRef<ComponentElementType, Img>(({
	className,
	alt,
	...rest
}, ref) => (
	<img
		className={className}
		alt={alt}
		ref={ref}
		{...rest}
	/>
));

Img.displayName = 'Img';
