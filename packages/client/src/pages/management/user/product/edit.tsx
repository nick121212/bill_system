import { useCallback, useRef, useState } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Drawer, Form, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';
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

import schema from './schemas/create.json';

export type ProductModalProps = {
  formValue?: ProductEntity;
  title: string;
  onSuccess: () => void;
  onClose?: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

function ProductCreateForm({
  title,
  onSuccess,
  onClose,
  formValue,
}: ProductModalProps) {
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
            model={
              {
                ...formValue,
                unitId: formValue?.unit?.id,
              } as any
            }
            onSubmit={(formData) => {
              setFormData(formData);
              callAjax({
                data: formData,
              });
            }}
          >
            <ErrorsField />

            <AutoFields fields={['name', 'label', 'price', 'cost']} />

            <AutoField
              name="unitId"
              options={units?.map((c) => {
                return {
                  label: c.name,
                  value: c.id,
                };
              })}
              loading={unitLoad}
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
  title,
  onSuccess,
  formValue,
}: ProductModalProps) {
  const [showModal, setShowModal] = useState(false);
  const onSuccessCall = useCallback(() => {
    onSuccess?.();
    setShowModal(false);
  }, [onSuccess]);

  return (
    <>
      <Button
        type="text"
        shape="circle"
        icon={<EditOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      />

      {showModal && (
        <ProductCreateForm
          title={title}
          formValue={formValue}
          onClose={() => setShowModal(false)}
          onSuccess={onSuccessCall}
        />
      )}
    </>
  );
}
