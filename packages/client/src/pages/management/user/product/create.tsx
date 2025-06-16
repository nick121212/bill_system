import { useCallback, useRef, useState } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Drawer, Form, Space, Spin } from 'antd';
import type { ButtonType } from 'antd/es/button';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import type { ProductEntity } from '@bill/database/esm';
import { ProductUnitEntity } from '@bill/database/esm';

import useData from '@/hooks/data/useData';
import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoFields,
  AutoForm,
  ErrorsField,
  TextAreaField,
  AutoField,
} from '@/uniforms/fields';
import { convertPriceToServer } from '@/utils';

import schema from './schemas/create.json';

export type ProductModalProps = {
  btnType?: ButtonType;
  btnTxt?: string;
  formValue?: ProductEntity;
  title: string;
  onSuccess: () => void;
  onClose?: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

function ProductCreateForm({ title, onSuccess, onClose }: ProductModalProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { onSubmit, setFormData, callAjax, loadingAjax } = useFormAction(
    formRef,
    {
      url: '/products',
      method: 'POST',
    },
    onSuccess,
  );
  const {
    rows: units,
    loading: unitLoad,
    onSearch: debouncedOnUnitSearch,
  } = useData<ProductUnitEntity[]>('product/units');

  return (
    <Drawer
      title={title}
      destroyOnClose
      width={720}
      onClose={onClose}
      open={true}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button loading={loadingAjax} onClick={onClose}>
            {t('crud.cancel')}
          </Button>
          <Button loading={loadingAjax} onClick={onSubmit} type="primary">
            {t('crud.confirm')}
          </Button>
        </Space>
      }
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        preserve={false}
        layout="horizontal"
        labelAlign="right"
      >
        <Spin spinning={loadingAjax}>
          <AutoForm
            ref={formRef as any}
            showInlineError
            schema={bridge}
            onSubmit={(formData) => {
              setFormData(formData);
              const processedFormData = {
                ...formData,
                price: convertPriceToServer(formData.price as number),
              };
              callAjax({
                data: processedFormData,
              });
            }}
          >
            <ErrorsField />

            <AutoFields fields={['name', 'price', 'cost']} />

            <AutoField
              name="unitId"
              options={
                unitLoad
                  ? []
                  : units?.map((c) => {
                      return {
                        label: c.name,
                        value: c.id,
                      };
                    })
              }
              showSearch
              filterOption={false}
              onSearch={(val: string) =>
                debouncedOnUnitSearch({ name: val === '' ? undefined : val })
              }
            />
            <TextAreaField name="desc" />
          </AutoForm>
        </Spin>
      </Form>
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
        {btnTxt || t('crud.create.buttonText')}
      </Button>

      {showModal && (
        <ProductCreateForm
          title={title}
          onClose={() => setShowModal(false)}
          onSuccess={onSuccessCall}
        />
      )}
    </>
  );
}
