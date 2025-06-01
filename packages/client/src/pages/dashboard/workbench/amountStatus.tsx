import { useEffect, useState, memo, useMemo } from 'react';
import { Col, Row, Space, Select } from 'antd';
import useAxios from 'axios-hooks';
import type { OrderEntity } from '@bill/database/esm';

import { themeVars } from '@/theme/theme.css';
import { convertPriceFromServer } from '@/utils';

import Conversion from './conversion_applications';
import { getDateRanges, DateType } from './util';

interface Props {
  dateType: DateType;
}

type Row = { status: OrderEntity['status']; totalAmount: string };

const AmountStatus = ({ dateType }: Props) => {
  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: '/statistics/totalAmountGroupByStatus',
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    const { currentRange } = getDateRanges(dateType);
    refresh({
      params: {
        where: {
          createTimeStart: currentRange[0],
          createTimeEnd: currentRange[1],
        },
      },
    });
  }, [dateType]);

  const amountSummary = useMemo(() => {
    const receivedAmount = +(
      rows?.find((item: Row) => item.status == 1)?.totalAmount ?? 0
    );
    const pendingAmount = +(
      rows?.find((item: Row) => item.status == 0)?.totalAmount ?? 0
    );
    return {
      received: {
        percent: (
          (receivedAmount / (receivedAmount + pendingAmount)) *
          100
        ).toFixed(2),
        amount: receivedAmount,
      },
      pending: {
        percent: (
          (pendingAmount / (receivedAmount + pendingAmount)) *
          100
        ).toFixed(2),
        amount: pendingAmount,
      },
    };
  }, [rows]);

  return (
    <Space
      direction="vertical"
      size="large"
      className="h-full w-full justify-center"
    >
      <Conversion
        percent={100}
        title={`${convertPriceFromServer(amountSummary.received.amount + amountSummary.pending.amount)}`}
        subtitle="总金额"
        iconify="tabler:user-filled"
        bg={themeVars.colors.palette.primary.default}
        strokeColor={themeVars.colors.palette.primary.light}
      />
      <Conversion
        percent={+amountSummary.pending.percent}
        title={`${convertPriceFromServer(amountSummary.pending.amount)}`}
        subtitle="未回款金额"
        iconify="ic:round-email"
        bg={themeVars.colors.palette.info.default}
        strokeColor={themeVars.colors.palette.info.light}
      />
    </Space>
  );
};

export default memo(AmountStatus);
