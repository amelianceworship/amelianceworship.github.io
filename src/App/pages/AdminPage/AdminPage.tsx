import { Block } from '~/ameliance-ui/components/blocks';
import { Grid } from '~/ameliance-ui/components/Grid';

import s from './AdminPage.module.scss';

export function AdminPage() {
	return (
		<Block component="main" className={s.HomePage}>
			<Grid container component="section" className={s.container}>
				<div className={s.AdminPage}>AdminPage</div>
			</Grid>
		</Block>
	);
}
