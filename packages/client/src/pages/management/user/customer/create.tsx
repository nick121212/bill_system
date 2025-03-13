import { useCallback, useRef } from 'react';
import type { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Drawer, Form, SliderSingleProps, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoField,
  AutoFields,
  AutoForm,
  ErrorsField,
  SliderField,
  TextAreaField,
} from '@/uniforms/fields';

import schema from './schemas/create.json';

export type ProductModalProps = {
  title: string;
  onSuccess: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function UnitCreateModal({
  title,
  onSuccess,
}: ProductModalProps) {
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
      url: '/customers',
      method: 'POST',
    },
    onSuccessCall,
  );
  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (
    value,
  ) => `${(value ?? 0) / 10}折`;

  return (
    <>
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
              onSubmit={(formData) => {
                setFormData(formData);
                callAjax({
                  data: formData,
                });
              }}
            >
              <ErrorsField />

              <AutoFields fields={['fullname', 'phone', 'email', 'address']} />

              <SliderField
                tooltip={{ formatter, open: true, placement:"right" }}
                step={1}
                min={10}
                max={100}
                marks={{ 10: 10, 50: 50, 100: 100 }}
                name="discount"
              />

              <TextAreaField name="desc" />
            </AutoForm>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
