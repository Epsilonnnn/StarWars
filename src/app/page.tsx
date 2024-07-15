'use client';

import { useCallback, useMemo, useState } from 'react';
import { Input, Row, Col } from 'antd';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getPersons } from '@/api/getPersons';
import { PersonsGrid } from '@/app/_components/PersonsGrid';
import css from './page.module.css';
import { useAppStore } from '@/app/providers/store';
import { getPersonId } from '@/api/utils';

const { Search } = Input;

export default function Home() {
	const [page, setPage] = useState(1);
	const [searchValue, setSearchValue] = useState('');

	const { data, isLoading } = useQuery({
		queryKey: ['persons', page, searchValue],
		queryFn: () => getPersons(page, searchValue),
		placeholderData: keepPreviousData
	});

	const { overridenPersonsData } = useAppStore();

	const persons = useMemo(() => {
		if (!Array.isArray(data?.results)) {
			return [];
		}

		return data.results.map((person) => {
			const personId = getPersonId(person);
			if (personId && overridenPersonsData[personId]) {
				return overridenPersonsData[personId];
			}

			return person;
		});
	}, [data?.results, overridenPersonsData]);

	const onSearch = useCallback(
		(value: string) => {
			setSearchValue(value);
		},
		[setSearchValue]
	);

	const onPageChange = useCallback(
		(page: number) => {
			setPage(page);
		},
		[setPage]
	);

	return (
		<Row gutter={[16, 32]}>
			<Col span={24}>
				<h1 className={css.title}>Star Wars Chars List</h1>
			</Col>
			<Col span={24}>
				<Search
					placeholder="Search character"
					enterButton="Search"
					size="large"
					loading={isLoading}
					onSearch={onSearch}
				/>
			</Col>
			<Col span={24}>
				<PersonsGrid
					isLoading={isLoading}
					items={persons}
					currentPage={page}
					totalItems={data?.count ?? 0}
					onPageChange={onPageChange}
				/>
			</Col>
		</Row>
	);
}
