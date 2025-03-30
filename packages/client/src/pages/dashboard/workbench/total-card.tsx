import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";
import { SvgIcon } from "@/components/icon";

export type IconType = 'rise' | 'decline' | 'steady';

type Props = {
	title: string;
  iconType?: IconType;
	percent: string;
	count: string;
	chartData: number[];
};

const iconColors = {
  rise: "rgb(34, 197, 94)",
  decline: "rgb(255, 86, 48)",
  steady: "rgb(255, 214, 10)",
}

const signs = {
  rise: "+",
  decline: "-",
  steady: "",
}

export default function TotalCard({
	title,
  iconType = 'rise',
	count,
	percent,
	chartData,
}: Props) {
	return (
		<Card>
			<div className="flex-grow">
				<h6 className="text-sm font-medium">{title}</h6>
				<div className="mb-2 mt-4 flex flex-row">
          <SvgIcon icon={`ic_${iconType}`} size={24} color={iconColors[iconType]} />
					<div className="ml-2">
						<span>{signs[iconType]}</span>
						<span>{percent}</span>
					</div>
				</div>
				<h3 className="text-2xl font-bold">{count}</h3>
			</div>

			<ChartLine data={chartData} />
		</Card>
	);
}

function ChartLine({ data }: { data: number[] }) {
	const series = [
		{
			name: "",
			data,
		},
	];
	const chartOptions = useChart({
		tooltip: {
			x: {
				show: false,
			},
		},
		xaxis: {
			labels: {
				show: false,
				showDuplicates: false,
			},
			tooltip: {
				enabled: false,
			},
			crosshairs: {
				show: false,
			},
		},
		yaxis: {
			labels: {
				show: false,
			},
			tooltip: {
				enabled: false,
			},
			crosshairs: {
				show: false,
			},
		},
		grid: {
			show: false,
		},
	});

	return (
		<Chart type="line" series={series} options={chartOptions} width={120} />
	);
}
