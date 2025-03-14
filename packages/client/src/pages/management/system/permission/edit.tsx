import { useCallback, useRef } from "react";
import type { SomeJSONSchema } from "ajv/dist/types/json-schema";
import { Button, Drawer, Form, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import type { MenuEntity } from "@bill/database/esm";

import usePermission from "@/hooks/data/usePermission";
import useFormAction from "@/hooks/form/useFormAction";
import { getBridge } from "@/uniforms/ajv";
import {
  AutoCompleteField,
  AutoField,
  AutoFields,
  AutoForm,
  ErrorsField,
  SelectField,
  TreeSelect,
} from "@/uniforms/fields";
import { PAGE_SELECT_OPTIONS } from "@/utils/compnent";

import schema from "./schemas/create.json";

export type ModalProps = {
  formValue?: MenuEntity;
  title: string;
  onSuccess: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function PermissionModal({
  title,
  formValue,
  onSuccess,
}: ModalProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { permissions, loading } = usePermission();
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
      url: `/menus/${formValue?.id}`,
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

              <AutoFields fields={["label", "name", "icon", "route"]} />
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

              <SelectField
                name="type"
                options={[
                  { label: "Catalogue", value: 0 },
                  { label: "Menu", value: 1 },
                  { label: "Button", value: 2 },
                ]}
              />

              <TreeSelect
                name="parentId"
                treeData={permissions}
                loading={loading}
                treeDefaultExpandAll
                fieldNames={{
                  label: "name",
                  value: "id",
                  children: "children",
                }}
              />
              <AutoField name={"order"} info="数字越大越靠后" />
            </AutoForm>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
