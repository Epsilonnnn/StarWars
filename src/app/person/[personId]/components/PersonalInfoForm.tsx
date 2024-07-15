import { ReactNode } from 'react';
import { Button, Card, Form, Input, Space } from 'antd';
import { Person } from '@/api/types';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 }
};

type FormValues = Pick<Person, 'gender' | 'birth_year' | 'eye_color' | 'mass'>;

type Props = {
	title: ReactNode;
	initialValues?: Partial<FormValues>;
	onSave: (values: FormValues) => void;
};

export function PersonalInfoForm({ title, onSave, initialValues }: Props) {
	const [form] = Form.useForm();

	return (
		<Card title={title}>
			<Form
				{...layout}
				initialValues={initialValues}
				form={form}
				name="control-hooks"
				onFinish={onSave}
			>
				<Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="birth_year" label="Birth year" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="eye_color" label="Eye color" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="mass" label="Mass" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
}
