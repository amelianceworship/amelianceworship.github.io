import { forwardRef, useState } from 'react';

type ComponentElementType = HTMLImageElement;

export interface ImgProps extends ReactHTMLElementAttributes<
ComponentElementType, React.ImgHTMLAttributes<ComponentElementType>> {
	fallbackScr?: string;
	src: string;
	alt: string;
}

export const Img = forwardRef<ComponentElementType, ImgProps>(({
	className,
	src,
	alt,
	fallbackScr,
	onError,
	...rest
}, ref) => {
	const [imgSrc, setImgSrc] = useState(src);

	const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		if (fallbackScr) setImgSrc(fallbackScr);
		if (onError) onError(event);
	};

	return (
		<img
			className={className}
			src={imgSrc}
			alt={alt}
			onError={imageOnErrorHandler}
			ref={ref}
			{...rest}
		/>
	);
});

Img.displayName = 'Img';
