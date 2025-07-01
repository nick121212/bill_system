import { Card, Descriptions } from 'antd';
import useAxios from 'axios-hooks';

export type CustomerInfoProps = {
  customerId: number;
};

export default function CustomerInfo({ customerId }: CustomerInfoProps) {
  const [{ data: info }] = useAxios({
    url: `/customers/${customerId}`,
  });

  return (
    <Card title="客户信息" variant="borderless">
      <Descriptions
        items={[
          {
            key: '1',
            label: '客户名称',
            children: info?.fullname,
          },
          {
            key: '2',
            label: '客户邮箱',
            children: info?.email,
          },
          {
            key: '3',
            label: '客户手机',
            children: info?.phone,
          },
          {
            key: '4',
            label: '客户地址',
            children: info?.address,
          },
          {
            key: '5',
            label: '客户折扣',
            children: info?.discount,
          },
          {
            key: '6',
            label: '余额',
            children: info?.balance,
          },
          {
            key: '7',
            label: '客户简介',
            children: info?.desc,
          },
        ]}
      />
    </Card>
  );
}
