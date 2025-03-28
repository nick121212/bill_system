import { useCallback, useRef, useMemo } from 'react';
import {
  Button,
  Drawer,
  Form,
  Space,
} from 'antd';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import type {
  OrderEntity,
} from '@bill/database/esm';

import useFormAction from '@/hooks/form/useFormAction';
import { fNumberTwoDecimal } from '@/utils/format-number';

import { IValue } from './catProd';
import FormCom from './formCom';


export type ProductModalProps = {
  formValue?: OrderEntity;
  title: string;
  onSuccess: () => void;
};

export default function OrderCreateModal({
  formValue,
  title,
  onSuccess,
}: ProductModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const formRef = useRef<any>();
  const categoriesData = Form.useWatch('categories', form);

  const onSuccessCall = useCallback(() => {
    onSuccess?.();
    setShowModal(false);
  }, [onSuccess]);
  const {
    onSubmit,
    showModal,
    setShowModal,
    setFormData,
    onClose,
    callAjax,
    loadingAjax,
  } = useFormAction(
    formRef,
    {
      url: formValue?.id ? `/orders/${formValue?.id}` : '/orders',
      method: formValue?.id ? 'PUT' : 'POST',
    },
    onSuccessCall,
  );

  const totalPrices = useMemo(() => {
    if (!categoriesData?.length) return 0;
    return categoriesData.reduce((pre: number, cur: IValue) => {
      return pre + Number(cur?.totalPrice || 0);
    }, 0);
  }, [categoriesData]);

  return (
    <>
      {formValue?.id ? (
        <Button
          type="text"
          shape="circle"
          loading={loadingAjax}
          icon={<EditOutlined />}
          onClick={() => {
            setShowModal(true);
          }}
        />
      ) : (
        <Button
          loading={loadingAjax}
          type="link"
          icon={<PlusOutlined />}
          onClick={() => {
            setShowModal(true);
          }}
        >
          {t('crud.create.buttonText')}
        </Button>
      )}

      <Drawer
        title={title}
        destroyOnClose
        width={'100%'}
        onClose={onClose}
        open={showModal}
        extra={
          <Space>
            <div
              style={{ marginRight: 30, color: '#e84118', fontWeight: '600' }}
            >
              总价: {fNumberTwoDecimal(totalPrices)}
            </div>

            <Button loading={loadingAjax} onClick={onClose}>
              {t('crud.cancel')}
            </Button>
            <Button
              loading={loadingAjax}
              onClick={async () => {
                const res = await formRef.current.validateFields();
                let { categories, templateId, ...restVal } = res;
                let total = 0;
                categories = categories.map((item: IValue) => {
                  const { totalPrice = 0, ...rest } = item;
                  total += totalPrice;
                  return {
                    ...rest,
                  };
                });
                callAjax({
                  data: { ...restVal, categories, totalPrice: total },
                });
                onSubmit();
              }}
              type="primary"
            >
              {t('crud.confirm')}
            </Button>
          </Space>
        }
      >
        <FormCom
          formValue={formValue}
          loadingAjax={loadingAjax}
          form={form}
          formRef={formRef}
        />
      </Drawer>
    </>
  );
}
