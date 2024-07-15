'use client';

import { useCallback, useMemo, useState } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getPerson } from '@/api/getPerson';
import {
	getPersonFilmsIds,
	getPersonHomeworldId,
	getPersonId,
	getPersonStarshipsIds
} from '@/api/utils';
import { getPlanet } from '@/api/getPlanet';
import { getFilm } from '@/api/getFilm';
import { Film, Person, Starship } from '@/api/types';
import { getStarship } from '@/api/getStarship';
import { BodilessCard } from '@/app/_components/BodilessCard';
import { useBreakpoint } from '@/app/_hooks/useBreakpoint';
import { useAppStore } from '@/app/providers/store';
import { PersonalInfoForm } from '@/app/person/[personId]/components/PersonalInfoForm';
import Link from 'next/link';

import css from './person.module.css';

type Props = {
	id: string;
};

export default function PersonComponent({ id }: Props) {
	const { data: personData, isLoading } = useQuery({
		queryKey: ['person', id],
		queryFn: async () => getPerson(id)
	});

	const { setPerson, overridenPersonsData } = useAppStore();

	const person = useMemo(() => {
		if (!personData) {
			return personData;
		}

		const personId = getPersonId(personData);

		if (personId && overridenPersonsData[personId]) {
			return {
				...personData,
				...overridenPersonsData[personId]
			};
		}

		return personData;
	}, [personData, overridenPersonsData]);

	const homeworldId = useMemo(() => {
		if (!person || isLoading) {
			return null;
		}

		return getPersonHomeworldId(person);
	}, [person, isLoading]);

	const filmsIds = useMemo(() => {
		if (!person || isLoading) {
			return [];
		}

		return getPersonFilmsIds(person);
	}, [person, isLoading]);

	const starshipsIds = useMemo(() => {
		if (!person || isLoading) {
			return [];
		}

		return getPersonStarshipsIds(person);
	}, [person, isLoading]);

	const { data: homeworld, isLoading: homeworldIsLoading } = useQuery({
		queryKey: ['homeworld', homeworldId],
		queryFn: () => getPlanet(homeworldId as string),
		enabled: Boolean(homeworldId)
	});

	const { data: films, isLoading: filmsIsLoading } = useQueries({
		queries: filmsIds.map((id) => ({
			queryKey: ['film', id],
			queryFn: () => getFilm(id),
			staleTime: Infinity
		})),
		combine: (results) => {
			return {
				data: results
					.reduce((res, result) => {
						if (result.data) {
							res.push(result.data);
						}

						return res;
					}, [] as Film[])
					.sort((a, b) => Number(a.episode_id) - Number(b.episode_id)),
				isLoading: results.some((result) => result.isLoading)
			};
		}
	});

	const { data: starships, isLoading: starshipsIsLoading } = useQueries({
		queries: starshipsIds.map((id) => ({
			queryKey: ['starship', id],
			queryFn: () => getStarship(id),
			staleTime: Infinity
		})),
		combine: (results) => {
			return {
				data: results.reduce((res, result) => {
					if (result.data) {
						res.push(result.data);
					}

					return res;
				}, [] as Starship[]),
				isLoading: results.some((result) => result.isLoading)
			};
		}
	});

	const [editMode, setEditMode] = useState<boolean>(false);

	const onSave = useCallback(
		(values: Partial<Person>) => {
			setPerson({ ...person, ...values } as Person);
			setEditMode(false);
		},
		[setPerson, setEditMode, person]
	);

	const formInitialData = useMemo(() => {
		if (!person) {
			return {};
		}

		const personId = getPersonId(person);

		if (personId && overridenPersonsData[personId]) {
			return overridenPersonsData[personId];
		}

		return person;
	}, [person, overridenPersonsData]);

	const enableEdit = useCallback(() => {
		setEditMode(true);
	}, [setEditMode]);

	const screen = useBreakpoint();

	const gridSpan = screen === 'sm' || screen === 'xs' ? 24 : 12;

	if (isLoading || !person) {
		return <span>Loading...</span>;
	}

	return (
		<main>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<BodilessCard
						title={<h1>{person.name}</h1>}
						extra={
							<Link href="/">
								<Button type="link">Back</Button>
							</Link>
						}
					/>
				</Col>
				<Col span={gridSpan}>
					{editMode ? (
						<PersonalInfoForm
							title="Personal info"
							onSave={onSave}
							initialValues={formInitialData}
						/>
					) : (
						<Card title="Personal info" extra={<Button onClick={enableEdit}>Edit</Button>}>
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
						</Card>
					)}
				</Col>
				<Col span={gridSpan}>
					<Card title="Home world" loading={homeworldIsLoading}>
						<p>
							<span className={css.dataTitle}>Name:</span> {homeworld?.name}
						</p>
						<p>
							<span className={css.dataTitle}>Population:</span> {homeworld?.population}
						</p>
						<p>
							<span className={css.dataTitle}>Climate:</span> {homeworld?.climate}
						</p>
						<p>
							<span className={css.dataTitle}>Diameter:</span> {homeworld?.diameter}
						</p>
						<p>
							<span className={css.dataTitle}>Terrain:</span> {homeworld?.terrain}
						</p>
						<p>
							<span className={css.dataTitle}>Gravity:</span> {homeworld?.gravity}
						</p>
					</Card>
				</Col>
				<Col span={gridSpan}>
					<Card title="Films" loading={filmsIsLoading}>
						{(films ?? []).map((film, i) => (
							<Card
								type="inner"
								style={{ marginTop: i === 0 ? 0 : 16 }}
								key={film.title}
								title={film.title}
							>
								<p>
									<span className={css.dataTitle}>Episode:</span> {film.episode_id}
								</p>
								<p>
									<span className={css.dataTitle}>Release date:</span>{' '}
									{new Date(film.release_date).toLocaleDateString('en-US', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</p>
								<p>
									<span className={css.dataTitle}>Director:</span> {film.director}
								</p>
								<p>
									<span className={css.dataTitle}>Producers:</span> {film.producer}
								</p>
							</Card>
						))}
					</Card>
				</Col>
				<Col span={gridSpan}>
					<Card title="Starships" loading={starshipsIsLoading}>
						{(starships ?? []).map((starship, i) => (
							<Card
								type="inner"
								style={{ marginTop: i === 0 ? 0 : 16 }}
								key={starship.name}
								title={starship.name}
							>
								<p>
									<span className={css.dataTitle}>Model:</span> {starship.model}
								</p>
								<p>
									<span className={css.dataTitle}>Starship class:</span> {starship.starship_class}
								</p>
								<p>
									<span className={css.dataTitle}>Passengers:</span> {starship.passengers}
								</p>
								<p>
									<span className={css.dataTitle}>Hyperdrive rating:</span>{' '}
									{starship.hyperdrive_rating}
								</p>
								<p>
									<span className={css.dataTitle}>Max speed:</span>{' '}
									{starship.max_atmosphering_speed}
								</p>
								<p>
									<span className={css.dataTitle}>Cost:</span> {starship.cost_in_credits} credits
								</p>
							</Card>
						))}
					</Card>
				</Col>
			</Row>
		</main>
	);
}
