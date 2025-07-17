import { useCallback, useRef, useState } from 'react';
import type { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Drawer, Form, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import type { CompanyEntity, MenuEntity, RoleEntity } from '@bill/database/esm';

import useData from '@/hooks/data/useData';
import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import { AutoField, AutoForm, DateField } from '@/uniforms/fields';

import schema from './schemas/create.json';

export type UserModalProps = {
  formValue?: MenuEntity;
  onClose?: () => void;
  title: string;
  onSuccess: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

export function UserCreateModal({ title, onSuccess, onClose }: UserModalProps) {
  const { t } = useTranslation();
  const formRef = useRef();
  const {
    rows: roles,
    loading: roleLoad,
    onSearch: debouncedOnRoleSearch,
  } = useData<RoleEntity[]>('roles');
  const {
    rows: company,
    loading: comLoad,
    onSearch: debouncedOnCompanySearch,
  } = useData<CompanyEntity[]>('companies');
  const {
    onSubmit,
    setFormData,
    callAjax,
    loadingAjax,
  } = useFormAction(
    formRef,
    {
      url: '/users',
      method: 'POST',
    },
    onSuccess,
  );

  return (
    <>
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
              <AutoField name="fullname" />
              <AutoField name="email" />
              <AutoField name="avatar" />
              <AutoField name="address" />
              <AutoField
                name="company"
                options={company?.map((c) => {
                  return {
                    label: c.name,
                    value: c.id,
                  };
                })}
                loading={comLoad}
                showSearch
                filterOption={false}
                onSearch={(val: string) =>
                  debouncedOnCompanySearch({
                    name: val === '' ? undefined : val,
                  })
                }
              />
              <AutoField name="password" />
              <AutoField name="phone" />
              <DateField name="validateDate" showTime={false} />
              {/* <AutoField name="isActive" /> */}
              <AutoField
                name="role"
                options={roles?.map((c) => {
                  return {
                    label: c.name,
                    value: c.id,
                  };
                })}
                loading={roleLoad}
                showSearch
                filterOption={false}
                onSearch={(val: string) =>
                  debouncedOnRoleSearch({
                    name: val === '' ? undefined : val,
                  })
                }
              />
            </AutoForm>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}

export default function UserCreateButton({ title, onSuccess, formValue }: UserModalProps) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const onSuccessCall = useCallback(() => {
    onSuccess?.();
    setShowModal(false);
  }, [onSuccess]);

  return (
    <>
      <Button
        type="link"
        icon={<PlusOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {t('crud.create.buttonText')}
      </Button>

      {showModal && (
        <UserCreateModal
          title={title}
          formValue={formValue}
          onClose={() => setShowModal(false)}
          onSuccess={onSuccessCall}
        />
      )}
    </>
  );
}
