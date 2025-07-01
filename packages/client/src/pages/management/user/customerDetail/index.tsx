import { Drawer, Space, Tabs } from 'antd';

import CustomerCharges from './charges';
import CustomerInfo from './customer';
import DetailForm from './detailForm';


interface CustomerDetailProps {
  customerId: number;
  onSuccess: () => void;
  onClose: () => void;
}

export default function CustomerDetail({
  customerId,
  onSuccess,
  onClose,
}: CustomerDetailProps) {
  const items = [
    {
      label: '客户专价',
      key: '2',
      children: <DetailForm onSuccess={onSuccess} onClose={onClose} customerId={customerId} />,
    },
    {
      label: '客户充值',
      key: '3',
      children: <CustomerCharges customerId={customerId} />,
    },
  ];
  return (
    <Drawer destroyOnClose width={'100%'} onClose={onClose} open={true} title="客户信息">
      <Space size={10} direction="vertical" className="w-full">
        <CustomerInfo customerId={customerId} />
        <Tabs tabPosition={'top'} items={items} />
      </Space>
    </Drawer>
  );
}
