import { Card, CardProps } from 'antd';
import css from './index.module.css';

type Props = {
	title: CardProps['title'];
	extra?: CardProps['extra'];
};

export function BodilessCard({ title, extra }: Props) {
	return <Card title={title} extra={extra} className={css.card} />;
}
