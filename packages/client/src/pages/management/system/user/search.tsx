import { useCallback, useRef } from "react";
import type { SomeJSONSchema } from "ajv/dist/types/json-schema";
import { Button, Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import type { RoleEntity } from "@bill/database/esm";

import useRole from "@/hooks/data/useRole";
import { getBridge } from "@/uniforms/ajv";
import {
  AutoField,
  AutoForm,
  SelectField,
} from "@/uniforms/fields";

import schema from "./schemas/search.json";

export type PermissionModalProps = {
  onSuccess: (data: unknown) => void;
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
        ref={formRef}
        showInlineError
        schema={bridge}
        onSubmit={(formData) => {
          onSuccess?.(formData);
        }}
      >
        <Form preserve={false} layout="inline">
          <AutoField name="fullname" />

          <SelectField
            name="isActive"
            options={[
              { label: "停用", value: 0 },
              { label: "启用", value: 1 },
            ]}
          />

          <SelectField
            name="role.id"
            loading={roleLoading}
            options={roles?.rows?.map((r: RoleEntity) => {
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
