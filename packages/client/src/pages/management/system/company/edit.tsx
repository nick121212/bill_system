import { useCallback, useRef } from "react";
import type { SomeJSONSchema } from "ajv/dist/types/json-schema";
import { Button, Drawer, Form, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import type { CompanyEntity } from "@bill/database/esm";

import useFormAction from "@/hooks/form/useFormAction";
import { getBridge } from "@/uniforms/ajv";
import {
  AutoField,
  AutoForm,
  ErrorsField,
} from "@/uniforms/fields";

import schema from "./schemas/create.json";

export type UserModalProps = {
  formValue?: Partial<CompanyEntity>;
  title: string;
  onSuccess: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function PermissionModal({
  title,
  formValue,
  onSuccess,
}: UserModalProps) {
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
    loadingAjax,
    callAjax,
  } = useFormAction(
    formRef,
    {
      url: `/companies/${formValue?.id}`,
      method: "PUT",
    },
    onSuccessCall
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
              {t("crud.cancel")}
            </Button>
            <Button loading={loadingAjax} onClick={onSubmit} type="primary">
              {t("crud.confirm")}
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
              model={formValue as any}
              onSubmit={(formData) => {
                setFormData(formData);
                callAjax({
                  data: formData,
                });
              }}
            >
              <ErrorsField />

              <AutoField name="name" />
              <AutoField name="address" />
              <AutoField name="phone" />

            </AutoForm>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
