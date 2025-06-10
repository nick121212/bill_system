import React, { useState, useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Modal, Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import { AutoForm, TextField, SelectField, TextAreaField } from '@/uniforms/fields';

import schema from './schemas/report.json';

interface ChangePasswordModalProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const bridge = getBridge(schema as SomeJSONSchema);

const ReportModal: React.FC<ChangePasswordModalProps> = ({
  onCancel,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { onSubmit, setFormData, callAjax, loadingAjax } = useFormAction(
    formRef,
    {
      url: `/reports`,
      method: 'POST',
    },
    () => {
      onSuccess();
    },
  );

  return (
    <Modal
      title={t('report.title')}
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
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
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
          <TextField name="name" />
          <SelectField
            name="type"
            options={[
              // { label: 'BUG', value: 0 },
              { label: 'VOC', value: 1 },
            ]}
          />
          <TextAreaField name="desc" />
        </AutoForm>
      </Form>
    </Modal>
  );
};

const Report: React.FC = () => {
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
      <div onClick={showModal}>{t('report.buttonText')}</div>
      {isModalVisible && (
        <ReportModal onCancel={handleCancel} onSuccess={handleCancel} />
      )}
    </div>
  );
};

export default Report;
