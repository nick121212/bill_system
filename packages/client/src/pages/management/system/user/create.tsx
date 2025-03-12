import { useCallback, useRef } from "react";
import type { SomeJSONSchema } from "ajv/dist/types/json-schema";
import { Button, Drawer, Form, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import type { MenuEntity ,RoleEntity} from "@bill/database/esm";

import useData from "@/hooks/data/useData";
import useFormAction from "@/hooks/form/useFormAction";
import { getBridge } from "@/uniforms/ajv";
import {
  AutoField,
  AutoForm,
  SelectField,
} from "@/uniforms/fields";

import schema from "./schemas/create.json";

export type RoleModalProps = {
  formValue?: MenuEntity;
  title: string;
  onSuccess: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function PermissionModal({ title, onSuccess }: RoleModalProps) {
  const { t } = useTranslation();
  const formRef = useRef();
  const { rows, loading } = useData<RoleEntity[]>("role");
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
      url: "/users",
      method: "POST",
    },
    onSuccessCall
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
        {t("crud.create.buttonText")}
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
              <AutoField name="company" />
              <AutoField name="password" />
              <AutoField name="phone" />
              <AutoField name="validateDate" />
              <AutoField name="isActive" />

              <SelectField
                name="role"
                loading={loading}
                options={rows?.map((r: RoleEntity) => {
                  return {
                    label: r.name,
                    value: r.id,
                  };
                })}
              />
            </AutoForm>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
