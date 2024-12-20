import type { SvgIconProps } from '~/ameliance-ui/components/SvgIcon';
import { SvgIcon } from '~/ameliance-ui/components/SvgIcon';

export function GoogleColorIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			stroke="none"
			{...props}
		>
			<path fillRule="evenodd" clipRule="evenodd" d="M20.64 12.2045C20.64 11.5664 20.5827 10.9527 20.4764 10.3636H12V13.845H16.8436C16.635 14.97 16.0009 15.9232 15.0477 16.5614V18.8195H17.9564C19.6582 17.2527 20.64 14.9454 20.64 12.2045Z" fill="#4285F4" />
			<path fillRule="evenodd" clipRule="evenodd" d="M12 21C14.43 21 16.4673 20.1941 17.9564 18.8196L15.0477 16.5614C14.2418 17.1014 13.2109 17.4205 12 17.4205C9.65591 17.4205 7.67182 15.8373 6.96409 13.71H3.95728V16.0418C5.43818 18.9832 8.48182 21 12 21Z" fill="#34A853" />
			<path fillRule="evenodd" clipRule="evenodd" d="M6.96409 13.71C6.78409 13.17 6.68182 12.5932 6.68182 12C6.68182 11.4068 6.78409 10.83 6.96409 10.29V7.95818H3.95727C3.34773 9.17318 3 10.5477 3 12C3 13.4523 3.34773 14.8268 3.95727 16.0418L6.96409 13.71Z" fill="#FBBC05" />
			<path fillRule="evenodd" clipRule="evenodd" d="M12 6.57955C13.3214 6.57955 14.5077 7.03364 15.4405 7.92545L18.0218 5.34409C16.4632 3.89182 14.4259 3 12 3C8.48182 3 5.43818 5.01682 3.95728 7.95818L6.96409 10.29C7.67182 8.16273 9.65591 6.57955 12 6.57955Z" fill="#EA4335" />
		</SvgIcon>
	);
}
