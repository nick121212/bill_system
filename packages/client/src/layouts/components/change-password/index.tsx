import React, { useState, useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Modal, Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import useFormAction from '@/hooks/form/useFormAction';
import { useLogout, useUserInfo } from '@/store/userStore';
import { getBridge } from '@/uniforms/ajv';
import { AutoForm, TextField } from '@/uniforms/fields';

import schema from './form.json';

interface ChangePasswordModalProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const bridge = getBridge(schema as SomeJSONSchema);

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onCancel,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { id } = useUserInfo();
  const logoutAction = useLogout();
  const { onSubmit, setFormData, callAjax, loadingAjax } = useFormAction(
    formRef,
    {
      url: `/users/${id}/password`,
      method: 'PATCH',
    },
    () => {
      onSuccess();
      logoutAction();
    },
  );

  return (
    <Modal
      title={t('changePassword.title')}
      open={true}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t('crud.cancel')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loadingAjax}
          onClick={onSubmit}
        >
          {t('crud.confirm')}
        </Button>,
      ]}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        preserve={false}
        layout="horizontal"
        labelAlign="right"
      >
        <AutoForm
          ref={formRef as any}
          showInlineError
          schema={bridge}
          onSubmit={(formData) => {
            setFormData(formData);
            callAjax({ data: formData });
          }}
        >
          {/* <AutoFields
            fields={['password', 'passwordNew', 'passwordNewAgain']}
          /> */}

          <TextField type="password" name="password" />
          <TextField type="password" name="passwordNew" />
          <TextField type="password" name="passwordNewAgain" />
        </AutoForm>
      </Form>
    </Modal>
  );
};

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div onClick={showModal}>{t('changePassword.buttonText')}</div>
      {isModalVisible && (
        <ChangePasswordModal onCancel={handleCancel} onSuccess={handleCancel} />
      )}
    </div>
  );
};

export default ChangePassword;
