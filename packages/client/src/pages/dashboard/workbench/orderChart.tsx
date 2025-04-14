import { useEffect } from 'react';
import { Typography } from 'antd';
import useAxios from 'axios-hooks';
import dayjs from 'dayjs';

import Card from '@/components/card';
import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';
import { convertPriceFromServer } from '@/utils';

import { getDateRanges, DateType } from './util';

interface DataItem {
  createTime: Date;
  totalCount: number;
  totalAmount: string;
}

export default function OrderChart() {
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: '/statistics/totalAmountGroupByTime',
    },
    {
      manual: true,
    },
  );
  useEffect(() => {
    const { currentRange } = getDateRanges(DateType.Month);
    refresh({
      params: {
        where: {
          createTimeStart: currentRange[0],
          createTimeEnd: currentRange[1],
        },
      },
    });
  }, []);

  const chartOptions = useChart({
    xaxis: {
      type: 'category',
      categories: rows?.map(({ createTime }: DataItem) =>
        dayjs(createTime).format('MM/DD'),
      ),
    },
    tooltip: {},
  });
  const series: ApexAxisChartSeries = [
    { name: '订单', data: rows?.map(({ totalCount }: DataItem) => totalCount) },
    {
      name: '金额',
      data: rows?.map(({ totalAmount }: DataItem) =>
        convertPriceFromServer(parseFloat(totalAmount)),
      ),
    },
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
