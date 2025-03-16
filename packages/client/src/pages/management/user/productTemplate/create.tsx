import { useCallback, useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Drawer, Form, Space, Spin, Card, Input } from 'antd';

import { useTranslation } from 'react-i18next';
import { PlusOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import type { TemplateEntity } from '@bill/database/esm';

import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';

import schema from './schemas/create.json';
import CatProd from './catProd';

export type ProductModalProps = {
  formValue?: TemplateEntity;
  title: string;
  onSuccess: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function TemplateCreateModal({
  formValue,
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
      url: '/templates',
      method: formValue?.id ? 'PUT' : 'POST',
    },
    onSuccessCall,
  );

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
            <Button
              loading={loadingAjax}
              onClick={async () => {
                const res = await formRef.current.validateFields();
                callAjax({
                  data: { ...res, status: 1 },
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
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          preserve={false}
          layout="horizontal"
          labelAlign="right"
          ref={formRef}
        >
          <Spin spinning={loadingAjax}>
            <Form.Item label="模板名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="描述" name="desc">
              <Input.TextArea />
            </Form.Item>
            <Form.List name="categories">
              {(fields, { add, remove }) => (
                <Form.Item label="产品">
                  <Space size={10} direction="vertical">
                    {fields.map((field, index) => (
                      <Card
                        key={field.key}
                        title={`分类${index + 1}`}
                        extra={
                          fields.length > 1 && (
                            <Button
                              type="text"
                              icon={<CloseOutlined />}
                              onClick={() => remove(field.name)}
                            />
                          )
                        }
                      >
                        <Form.Item key={field.key} name={[field.name]}>
                          <CatProd />
                        </Form.Item>
                      </Card>
                    ))}
                  </Space>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: '100%', marginTop: 10 }}
                      icon={<PlusOutlined />}
                    >
                      新增
                    </Button>
                  </Form.Item>
                </Form.Item>
              )}
            </Form.List>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
