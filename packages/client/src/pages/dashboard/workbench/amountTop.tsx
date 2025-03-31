import { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import useAxios from 'axios-hooks';

import ChartColumnSingle from '@/pages/components/chart/view/chart-column-single';
import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';

import { getDateRanges, DateType } from './util';

interface Props {
  dateType: DateType;
}

type Row = { fullname: string; totalAmount: string };

const AmountTop = ({ dateType }: Props) => {
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: '/statistics/totalAmountGroupByCustomer',
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    const { currentRange } = getDateRanges(dateType);
    refresh({
      params: {
        createTimeStart: currentRange[0],
        createTimeEnd: currentRange[1],
      },
    });
  }, [dateType]);

  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: rows?.map(({ fullname }: Row) => fullname),
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value}`,
      },
    },
  });

  const series = [
    { name: '金额', data: rows?.map(({ totalAmount }: Row) => totalAmount) },
  ];

  return (
    <Card>
      <header className="flex w-full justify-between self-start">
        <Typography.Title level={5}>订单金额TOP10客户</Typography.Title>
      </header>
      <main className="w-full">
        <Chart type="bar" series={series} options={chartOptions} height={320} />
      </main>
    </Card>
  );
};

export default AmountTop;
