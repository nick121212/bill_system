import { Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

import { axiosInstanceFile } from '@/api/apiClient';

export type ModalProps = {
  // onSuccess: () => void;
  orderIds?: number[];
  selectAll?: boolean;
  query?: unknown;
};

export default function PermissionModal({ orderIds, selectAll, query }: ModalProps) {
  const exportFile = async () => {
    const data = await axiosInstanceFile('/orders/export', {
      responseType: 'blob',
      method: 'PATCH',
      data: {
        selectAll: selectAll,
        orderIds: orderIds,
        query
      },
    });

    const url = window.URL.createObjectURL(data.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button
        icon={<ExportOutlined />}
        type="link"
        onClick={() => {
          exportFile();
        }}
      >
        导出账单
      </Button>
    </>
  );
}
