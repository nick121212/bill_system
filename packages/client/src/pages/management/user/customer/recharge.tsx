import React, { useState, useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Modal, Button, Form } from 'antd';
import { MoneyCollectOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import { AutoForm, TextField, NumField } from '@/uniforms/fields';

import schema from './schemas/recharge.json';

const bridge = getBridge(schema as SomeJSONSchema);

const RechargeModal: React.FC<any> = ({ id, onCancel, onSuccess }) => {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { onSubmit, setFormData, callAjax, loadingAjax } = useFormAction(
    formRef,
    {
      url: `/charges`,
      method: 'POST',
    },
    () => {
      onSuccess();
    },
  );

  return (
    <Modal
      title={'充值'}
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
            callAjax({
              data: {
                ...formData,
                customerId: id,
                type: 0, // 0-充值 1-消费 2-退款
              },
            });
          }}
        >
          <NumField name="balance" min={1} precision={2} decimal />
          {/* <NumField name="extra" min={0} precision={2} decimal/> */}
        </AutoForm>
      </Form>
    </Modal>
  );
};

const Recharge: React.FC<{ id: number; onSuccess: () => void }> = ({
  id,
  onSuccess,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button icon={<MoneyCollectOutlined />} type="text" onClick={showModal} />
      {isModalVisible && (
        <RechargeModal
          id={id}
          onCancel={handleCancel}
          onSuccess={() => {
            onSuccess();
            handleCancel();
          }}
        />
      )}
    </div>
  );
};

export default Recharge;
