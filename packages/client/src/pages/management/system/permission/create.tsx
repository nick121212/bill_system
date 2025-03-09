import { useEffect, useRef, useState } from "react";
import { SomeJSONSchema } from "ajv/dist/types/json-schema";
import {
  Alert,
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  notification,
  Space,
  Spin,
} from "antd";
import useAxios from "axios-hooks";
import { useTranslation } from "react-i18next";

import useFormAction from "@/hooks/form/useFormAction";
import { getBridge } from "@/uniforms/ajv";
import {
  AutoCompleteField,
  AutoFields,
  AutoForm,
  ErrorsField,
  SelectField,
  SubmitField,
  TreeSelect,
  ValidatedForm,
} from "@/uniforms/fields";
import { PAGE_SELECT_OPTIONS } from "@/utils/compnent";

import usePermission from "./hooks/usePermission";
import schema from "./schemas/create.json";
import type { Permission } from "#/entity";

export type PermissionModalProps = {
  formValue?: Permission;
  title: string;
  onOk?: VoidFunction;
  onCancel?: VoidFunction;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function PermissionModal({ title }: PermissionModalProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { permissions, loading } = usePermission();
  const [{ data, loading: loadingAjax, error }, callAjax] = useAxios(
    {
      url: "/menus",
      method: "POST",
    },
    { manual: true }
  );
  const {
    onReset,
    onSubmit,
    showModal,
    setShowModal,
    formData,
    setFormData,
    onClose,
  } = useFormAction(formRef, error);

  return (
    <>
      <Button
        loading={loading || loadingAjax}
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
              schema={bridge as any}
              onSubmit={(formData) => {
                setFormData(formData);
                callAjax({
                  data: formData,
                });
              }}
            >
			  <ErrorsField />

              <AutoFields />

              <SelectField
                name="type"
                options={[
                  { label: "Catalogue", value: 0 },
                  { label: "Menu", value: 1 },
                  { label: "Button", value: 2 },
                ]}
              />

              <AutoCompleteField
                name="component"
                allowClear
                options={PAGE_SELECT_OPTIONS}
                filterOption={(input, option) =>
                  ((option?.label || "") as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />

              <TreeSelect
                name="parentId"
                treeData={permissions}
                loading={loading}
                fieldNames={{
                  label: "name",
                  value: "id",
                  children: "children",
                }}
              />

            </AutoForm>
          </Spin>
        </Form>
      </Drawer>

      {/* <Modal
        title={title}
        open={showModal}
        maskClosable={false}
		closeIcon={false}
        destroyOnClose={true}
		centered
        footer={
          <Space align="center">
            <Button
              key="back"
              loading={loadingAjax}
              onClick={() => {
                setShowModal(false);
              }}
            >
              {t("crud.cancel")}
            </Button>
            <Button
              key="submit"
              type="primary"
              loading={loadingAjax}
              onClick={() => {
                onSubmit();
              }}
            >
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
              schema={bridge as any}
              onSubmit={(formData) => {
                setFormData(formData);
                callAjax({
                  data: formData,
                });
              }}
            >
              <AutoFields />

              <SelectField
                name="type"
                options={[
                  { label: "Catalogue", value: "0" },
                  { label: "Menu", value: "1" },
                  { label: "Button", value: "2" },
                ]}
              />

              <AutoCompleteField
                name="component"
                allowClear
                options={PAGE_SELECT_OPTIONS}
                filterOption={(input, option) =>
                  ((option?.label || "") as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />

              <TreeSelect
                name="parentId"
                treeData={permissions}
                loading={loading}
                fieldNames={{
                  label: "name",
                  value: "id",
                  children: "children",
                }}
              />

              <TreeSelect
                name="parentId"
                treeData={permissions}
                loading={loading}
                fieldNames={{
                  label: "name",
                  value: "id",
                  children: "children",
                }}
              />

              <ErrorsField />
            </AutoForm>
          </Spin>
        </Form>
      </Modal> */}
    </>
  );
}
