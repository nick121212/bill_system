import { Select, Typography } from "antd";
import { useState } from "react";
import useAxios from 'axios-hooks';

import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

import { getDateRanges, DateType } from './util';

interface Props {
  dateType: DateType;
}

export default function OrderChart({ dateType }: Props) {
	const [year, setYear] = useState("2023");
	const series: Record<string, ApexAxisChartSeries> = {
		"2022": [
			{ name: "China", data: [10, 41, 35, 51, 49, 61, 69, 91, 148, 35, 51] },
			{ name: "America", data: [10, 34, 13, 56, 77, 88, 99, 45, 13, 56, 77] },
		],

		"2023": [
			{ name: "China", data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 35, 51] },
			{ name: "America", data: [56, 13, 34, 10, 77, 99, 88, 45, 13, 56, 77] },
		],
	};
	return (
		<Card className="flex-col">
			<header className="flex w-full justify-between self-start">
				<Typography.Title level={5}>订单金额/订单量统计</Typography.Title>
			</header>
			<main className="w-full">
				<ChartArea series={series[year]} />
			</main>
		</Card>
	);
}

function ChartArea({ series }: { series: ApexAxisChartSeries }) {
	const chartOptions = useChart({
		xaxis: {
			type: "category",
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jut",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			],
		},
		tooltip: {},
	});

	return (
		<Chart type="area" series={series} options={chartOptions} height={300} />
	);
}
