import { useEffect } from 'react';
import { Card, Typography } from 'antd';
import useAxios from 'axios-hooks';

import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';
import { convertPriceFromServer } from '@/utils';

import { getDateRanges, DateType } from './util';

type Row = { fullname: string; totalAmount: string };

const AmountTop = () => {
  const [{ data: rows }, refresh] = useAxios(
    {
      url: '/statistics/totalAmountGroupByCustomer',
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
    {
      name: '金额',
      data: rows?.map(({ totalAmount }: Row) =>
        convertPriceFromServer(parseFloat(totalAmount)),
      ),
    },
  ];

  return (
    <Card>
      <header className="flex w-full justify-between self-start">
        <Typography.Title level={5}>本月订单金额TOP10客户</Typography.Title>
      </header>
      <main className="w-full">
        <Chart type="bar" series={series} options={chartOptions} height={320} />
      </main>
    </Card>
  );
};

export default AmountTop;
