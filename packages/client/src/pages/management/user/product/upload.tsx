import { useCallback, useMemo, useState } from 'react';
import { Button, Drawer, message, UploadProps } from 'antd';
import type { ButtonType } from 'antd/es/button';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import {
  ApiStatusCode,
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
  // const { t } = useTranslation();
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
        // setLoading(info.file.status === 'uploading');

        if (info.file.status === 'error') {
          return message.error(`${info.file.name} file upload failed.`);
        }

        if (info.file.status !== 'done') {
          return;
        }

        if (info.file.response?.code == ApiStatusCode.SUCCESS) {
          // setData(info.file.response.data);
          onSuccess?.();
        } else if (info.file.response?.code != ApiStatusCode.SUCCESS) {
          message.error(
            info.file.response?.message ||
              `${info.file.name} file upload failed.`,
          );
        }
      },
    };
  }, []);
  const download = () => {
    axiosInstanceFile
      .get('product.xlsx', {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '商品模板.xlsx');
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

      {/* <Table indentSize={1000} dataSource={data} columns={columns}></Table> */}
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
