import { useCallback, useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Drawer, Form, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import type { RoleEntity } from '@bill/database/esm';

import usePermission from '@/hooks/data/usePermission';
import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoFields,
  AutoForm,
  ErrorsField,
  SelectField,
  TextAreaField,
  TreeField,
} from '@/uniforms/fields';

import schema from './schemas/create.json';

export type RoleModalProps = {
  formValue?: RoleEntity;
  title: string;
  onSuccess: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function PermissionModal({ title, onSuccess }: RoleModalProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { permissions } = usePermission();
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
      url: '/roles',
      method: 'POST',
    },
    onSuccessCall,
  );

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
          labelCol={{ span: 6 }}
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

              <SelectField
                name="label"
                options={[
                  { value: 'admin', label: '管理员权限' },
                  { value: 'user', label: '用户权限' },
                ]}
              />

              <AutoFields fields={['name']} />

              <TextAreaField name="desc" />

              <TreeField
                defaultExpandAll
                name="menus"
                checkable
                treeData={permissions}
                fieldNames={{
                  key: 'id',
                  children: 'children',
                  title: 'name',
                }}
              />
            </AutoForm>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
