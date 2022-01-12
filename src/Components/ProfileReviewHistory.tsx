import React, { PureComponent } from "react";
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Review } from "@/src/Components/ReviewPage";

export default function ProfileReviewHistory(props: { reviews?: Review[] }) {
	const data = props.reviews?.map((r) => {
		return { succ: r.value, fail: !r.value, name: r.created_on.toDate().toLocaleString() };
	});

	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="succ" stackId="a" fill="#8884d8" />
				<Bar dataKey="fail" stackId="a" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer>
	);
}
