import { useCallback, useRef } from "react";
import { SomeJSONSchema } from "ajv/dist/types/json-schema";
import { Button, Form, Space } from "antd";
import { useTranslation } from "react-i18next";

import useRole from "@/hooks/data/useRole";
import { getBridge } from "@/uniforms/ajv";
import {
  AutoCompleteField,
  AutoForm,
  SelectField,
  TreeSelect,
} from "@/uniforms/fields";

import schema from "./schemas/search.json";
import { Role } from "#/entity";

export type PermissionModalProps = {
  onSuccess: (data: any) => void;
  loading?: boolean;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function PermissionModal({
  onSuccess,
  loading,
}: PermissionModalProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { roles, loading: roleLoading } = useRole();
  const onSuccessCall = useCallback(() => {
    formRef.current?.submit();
  }, []);

  return (
    <>
      <AutoForm
        ref={formRef as any}
        showInlineError
        schema={bridge as any}
        onSubmit={(formData) => {
          onSuccess?.(formData);
        }}
      >
        <Form preserve={false} layout="inline">
          <SelectField
            name="status"
            options={[
              { label: "停用", value: 0 },
              { label: "启用", value: 1 },
            ]}
          />

          <SelectField
            name="roleId"
            loading={roleLoading}
            options={roles?.rows?.map((r: Role) => {
              return { label: r.name, value: r.id };
            })}
          />

          <Space size={"small"} align="start">
            <Button type="link" loading={loading} onClick={onSuccessCall}>
              {t("crud.search")}
            </Button>
            <Button
              type="text"
              loading={loading}
              onClick={() => {
                formRef.current?.reset();
                onSuccessCall();
              }}
            >
              {t("crud.reset")}
            </Button>
          </Space>
        </Form>
      </AutoForm>
    </>
  );
}
