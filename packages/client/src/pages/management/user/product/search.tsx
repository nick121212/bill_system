import { useCallback, useRef } from 'react';
import type { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Form, Space } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { useTranslation } from 'react-i18next';

import { getBridge } from '@/uniforms/ajv';
import { AutoForm, AutoFields, AutoField } from '@/uniforms/fields';

import schema from './schemas/search.json';

export type SearchFormProps = {
  onSuccess: (data: unknown) => void;
  loading?: boolean;
  units: DefaultOptionType[];
  categories: DefaultOptionType[];
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function SearchForm({
  onSuccess,
  loading,
  units = [],
  categories = [],
}: SearchFormProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const onSuccessCall = useCallback(() => {
    formRef.current?.submit();
  }, []);

  return (
    <>
      <AutoForm
        ref={formRef as any}
        showInlineError
        schema={bridge}
        onSubmit={(formData) => {
          for (const key in formData) {
            if (formData[key] === '') {
              delete formData[key];
            }
          }
          console.log(11122, formData);
          const res = onSuccess?.(formData);
          console.log(222, res)
        }}
      >
        <Form preserve={false} layout="inline">
          <AutoFields fields={['name', 'label', 'price', 'cost']} />

          <AutoField name="unitId" options={units} />

          <AutoField name="categoryId" options={categories} />

          <Space size={'small'} align="start">
            <Button type="link" loading={loading} onClick={onSuccessCall}>
              {t('crud.search')}
            </Button>
            <Button
              type="text"
              loading={loading}
              onClick={() => {
                formRef.current?.reset();
                onSuccessCall();
              }}
            >
              {t('crud.reset')}
            </Button>
          </Space>
        </Form>
      </AutoForm>
    </>
  );
}
