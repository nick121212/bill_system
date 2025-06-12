import { useCallback, useMemo, useState } from 'react';
import { Button, Drawer, message, Table, UploadProps } from 'antd';
import type { ButtonType } from 'antd/es/button';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import {
  ApiStatusCode,
  ProductUnitEntity,
  type ProductEntity,
} from '@bill/database/esm';

import {
  axiosInstanceFile,
  axiosInstance,
  getAuthHeader,
} from '@/api/apiClient';
import { Upload } from '@/components/upload';

export type ProductModalProps = {
  btnType?: ButtonType;
  btnTxt?: string;
  formValue?: ProductEntity;
  title: string;
  onSuccess: () => void;
  onClose?: () => void;
};

function ProductUploadForm({ title, onSuccess, onClose }: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [data, setData] = useState<ProductEntity[]>([]);
  const props: UploadProps = useMemo(() => {
    return {
      name: 'file',
      action: axiosInstance.defaults.baseURL + '/products/upload',
      headers: {
        ...getAuthHeader(),
      },
      accept: '.xlsx',
      showUploadList: false,
      onChange(info) {
        setLoading(info.file.status === 'uploading');

        if (info.file.status === 'error') {
          return message.error(`${info.file.name} file upload failed.`);
        }

        if (info.file.status !== 'done') {
          return;
        }

        if (info.file.response?.code == ApiStatusCode.SUCCESS) {
          setData(info.file.response.data);
        } else if (info.file.response?.code != ApiStatusCode.SUCCESS) {
          message.error(
            info.file.response?.message ||
              `${info.file.name} file upload failed.`,
          );
        }
      },
    };
  }, []);
  const columns: ColumnsType<ProductEntity> = [
    {
      title: t('cls.com.idx'),
      dataIndex: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: t('cls.product.name'),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: t('cls.product.label'),
      dataIndex: 'label',
      align: 'center',
    },
    {
      title: t('cls.product.price'),
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: t('cls.product.cost'),
      dataIndex: 'cost',
      align: 'center',
    },
    {
      title: t('cls.product.unit'),
      dataIndex: 'unit',
      align: 'center',
      render: (obj: ProductUnitEntity) => obj?.name,
    },
    {
      title: t('cls.com.desc'),
      dataIndex: 'desc',
      align: 'center',
      width: '15%',
      ellipsis: true,
    },
  ];
  const download = () => {
    axiosInstanceFile
      .get('product.xlsx', {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'template.xlsx');
        document.body.appendChild(link);
        link.click();
      });
    // window.open("/template.xlsx");
  };

  return (
    <Drawer
      title={title}
      destroyOnClose
      width={720}
      onClose={onClose}
      open={true}
      extra={
        <Button type="primary" onClick={download}>
          下载模板
        </Button>
      }
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Upload multiple={false} {...props} />

      <Table indentSize={1000} dataSource={data} columns={columns}></Table>
    </Drawer>
  );
}

export default function ProductCreateModal({
  btnType = 'link',
  btnTxt,
  title,
  onSuccess,
}: ProductModalProps) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const onSuccessCall = useCallback(() => {
    onSuccess?.();
    setShowModal(false);
  }, [onSuccess]);

  return (
    <>
      <Button
        type={btnType}
        icon={<PlusOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {btnTxt || t('crud.upload.buttonText')}
      </Button>

      {showModal && (
        <ProductUploadForm
          title={title}
          onClose={() => setShowModal(false)}
          onSuccess={onSuccessCall}
        />
      )}
    </>
  );
}
