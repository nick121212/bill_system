import { useEffect, useState } from 'react';
import { Col, Row, Space, Select } from 'antd';
import BannerCard from './banner-card';
import AmountStatus from './amountStatus';
import TotalCard, { IconType } from './total-card';
import AmountTop from './amountTop';
import OrderChart from './orderChart';

import { getTotalAmount } from '@/api/services/statistics';

import { getDateRanges, DateType } from './util';
import { themeVars } from '@/theme/theme.css';

type DataItem = {
  iconType: IconType;
  count:  string;
  percent: string;
  chartData: number[];
};

const processData = (cur: any, pre: any, key: string): DataItem => {
  const currentValue = +cur[key];
  const previousValue = +pre[key];
  const iconType =
    currentValue > previousValue
      ? 'rise'
      : currentValue === previousValue
        ? 'steady'
        : 'decline';
  const percent = previousValue === 0 ? '0.00' : (
    ((currentValue - previousValue) / previousValue) *
    100
  ).toFixed(2);
  return {
    iconType,
    count: cur[key],
    percent: `${percent}%`,
    chartData: [previousValue, currentValue],
  };
};

function Workbench() {
  const [dateType, setDaeType] = useState<DateType>(DateType.Day);

  const [customerData, setCustomerData] = useState<DataItem>();
  const [orderCount, setOrderCount] = useState<DataItem>();
  const [amountData, setAmountData] = useState<DataItem>();

  useEffect(() => {
    const { currentRange, previousRange } = getDateRanges(dateType);
    Promise.all([
      getTotalAmount({
        createTimeStart: currentRange[0],
        createTimeEnd: currentRange[1],
      }),
      getTotalAmount({
        createTimeStart: previousRange[0],
        createTimeEnd: previousRange[1],
      }),
    ]).then(([current, previous]) => {
      const cur = current.data[0];
      const pre = previous.data[0];
      setCustomerData(processData(cur, pre, 'customerCount'));
      setOrderCount(processData(cur, pre, 'totalCount'));
      setAmountData(processData(cur, pre, 'totalAmount'));
    });
  }, [dateType]);

  return (
    <div className="p-2">
      <Row gutter={[16, 16]} justify="center">
        <Col span={24} lg={16}>
          <BannerCard>
            <div className="absolute right-10 top-6 c">
              <span style={{ color: themeVars.colors.palette.primary.dark }}>
                数据维度：
              </span>
              <Select
                style={{ width: 100, opacity: 0.9 }}
                value={dateType}
                options={[
                  { value: DateType.Day, label: '天' },
                  { value: DateType.Week, label: '周' },
                  { value: DateType.Month, label: '月' },
                ]}
                onChange={setDaeType}
              />
            </div>
          </BannerCard>
        </Col>
        <Col span={24} lg={8}>
          <AmountStatus dateType={dateType} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={8}>
          <TotalCard
            title="客户数量"
            iconType={customerData?.iconType}
            count={customerData?.count || '0'}
            percent={customerData?.percent || '0%'}
            chartData={customerData?.chartData || []}
          />
        </Col>

        <Col span={24} md={8}>
          <TotalCard
            title="订单数量"
            iconType={orderCount?.iconType}
            count={orderCount?.count || '0'}
            percent={orderCount?.percent || '0%'}
            chartData={orderCount?.chartData || []}
          />
        </Col>

        <Col span={24} md={8}>
          <TotalCard
            title="订单总金额"
            iconType={amountData?.iconType}
            count={amountData?.count || '0'}
            percent={amountData?.percent || '0%'}
            chartData={amountData?.chartData || []}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12} lg={8}>
          <AmountTop dateType={dateType} />
        </Col>
        <Col span={24} md={12} lg={16}>
          <OrderChart />
        </Col>
      </Row>
    </div>
  );
}

export default Workbench;
