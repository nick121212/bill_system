import { useCallback, useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Drawer, Form, Space, Spin } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';
import type { ProductEntity } from '@bill/database/esm';

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
  record: ProductEntity;
  title: string;
  onSuccess: () => void;
  units: DefaultOptionType[];
  categories: DefaultOptionType[];
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function ProductEditModal({
  record,
  title,
  onSuccess,
  units,
  categories,
}: ProductModalProps) {
  const processedRecord = {
    ...record,
    categoryId: record.category?.id,
    unitId: record.unit?.id,
  };
  const { t } = useTranslation();
  const formRef = useRef<any>();
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
      url: `/products/${record.id}`,
      method: 'PUT',
    },
    onSuccessCall,
  );

  return (
    <>
      <Button
        type="text"
        shape="circle"
        loading={loadingAjax}
        icon={<EditOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      />

      <Drawer
        title={title}
        destroyOnClose
        width={720}
        onClose={onClose}
        open={showModal}
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
              model={processedRecord as any}
              onSubmit={(formData) => {
                setFormData(formData);
                callAjax({
                  data: formData,
                });
              }}
            >
              <ErrorsField />

              <AutoFields fields={['name', 'label', 'price', 'cost']} />

              <AutoField name="unitId" options={units} />

              <AutoField name="categoryId" options={categories} />

              <TextAreaField name="desc" />
            </AutoForm>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
