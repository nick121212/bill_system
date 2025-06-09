import { useCallback, useRef } from "react";
import type { SomeJSONSchema } from "ajv/dist/types/json-schema";
import { Button, Form, Space } from "antd";
import { useTranslation } from "react-i18next";

import { getBridge } from "@/uniforms/ajv";
import {
  AutoField,
  AutoForm,
} from "@/uniforms/fields";

import schema from "./schemas/search.json";

export type ModalProps = {
  onSuccess: (data: unknown) => void;
  loading?: boolean;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function PermissionModal({
  onSuccess,
  loading,
}: ModalProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
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
        <Form preserve={false} layout="inline" onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSuccessCall();

            e.stopPropagation();
            e.preventDefault();
          }
        }}>
          <AutoField name="name" />

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
