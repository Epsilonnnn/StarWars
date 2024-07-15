import { useMemo } from 'react';
import Link from 'next/link';
import { Card, Col, Row, Pagination, Empty } from 'antd';
import { Person } from '@/api/types';
import { getPersonId } from '@/api/utils';
import { useBreakpoint } from '@/app/_hooks/useBreakpoint';
import css from './index.module.css';

const { Meta } = Card;

const GUTTER: [number, number] = [16, 24];
const PAGE_SIZE = 10;
const IMG = 'https://i.pinimg.com/736x/f5/a6/3b/f5a63b21abcff3981552f84a20f68b95.jpg';

type Props = {
	isLoading: boolean;
	items: Person[];
	totalItems: number;
	currentPage: number;
	onPageChange: (page: number) => void;
};

export function PersonsGrid({ isLoading, items, currentPage, totalItems, onPageChange }: Props) {
	const screen = useBreakpoint();

	const gridSpan = useMemo(() => {
		if (screen === 'xl') {
			return 6;
		}

		if (screen === 'lg') {
			return 8;
		}

		if (screen === 'md' || screen === 'sm') {
			return 12;
		}

		return 24;
	}, [screen]);

	if (isLoading) {
		return (
			<Row gutter={GUTTER}>
				{Array.from(Array(4), () => null).map((_, i) => {
					return (
						<Col key={i} span={gridSpan}>
							<Card cover={<img alt="loading" src={IMG} className={css.picture} />} loading={true}>
								<Meta title="Loading" description="Loading..." />
							</Card>
						</Col>
					);
				})}
			</Row>
		);
	}

	if (!items.length) {
		return <Empty />;
	}

	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<Row gutter={[16, 24]}>
					{items.map((person, idx) => {
						const personId = getPersonId(person);

						const card = (
							<Card
								hoverable
								cover={
									<img alt="example" width={200} height={400} src={IMG} className={css.picture} />
								}
							>
								<Meta
									title={person.name}
									description={
										<>
											<p>
												<span className={css.dataTitle}>Gender:</span> {person.gender}
											</p>
											<p>
												<span className={css.dataTitle}>Birth year:</span> {person.birth_year}
											</p>
											<p>
												<span className={css.dataTitle}>Eye color:</span> {person.eye_color}
											</p>
											<p>
												<span className={css.dataTitle}>Mass:</span> {person.mass} kg
											</p>
										</>
									}
								/>
							</Card>
						);

						return (
							<Col span={gridSpan} key={idx}>
								{personId ? <Link href={`/person/${personId}`}>{card}</Link> : null}
							</Col>
						);
					})}
				</Row>
			</Col>
			{totalItems > PAGE_SIZE ? (
				<Col span={24}>
					<Pagination
						align="center"
						current={currentPage}
						total={totalItems}
						pageSize={PAGE_SIZE}
						onChange={onPageChange}
						showSizeChanger={false}
						showQuickJumper={false}
					/>
				</Col>
			) : null}
		</Row>
	);
}
