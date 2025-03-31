import { Select, Typography } from 'antd';
import { useState } from 'react';
import useAxios from 'axios-hooks';

import Card from '@/components/card';
import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';

import { getDateRanges, DateType } from './util';

export default function OrderChart() {
  const chartOptions = useChart({
    xaxis: {
      type: 'category',
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jut',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    tooltip: {},
  });
  const series: ApexAxisChartSeries = [
    { name: '订单', data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 35, 51] },
    { name: '金额', data: [56, 13, 34, 10, 77, 99, 88, 45, 13, 56, 77] },
  ];
  return (
    <Card className="flex-col">
      <header className="flex w-full justify-between self-start">
        <Typography.Title level={5}>本月订单金额&订单量统计</Typography.Title>
      </header>
      <main className="w-full">
        <Chart
          type="area"
          series={series}
          options={chartOptions}
          height={300}
        />
      </main>
    </Card>
  );
}
