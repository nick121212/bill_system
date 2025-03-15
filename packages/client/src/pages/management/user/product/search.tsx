import { useCallback, useRef } from 'react';
import type { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Form, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { ProductCategoryEntity, ProductUnitEntity } from '@bill/database/esm';

import useData from '@/hooks/data/useData';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoForm,
  AutoFields,
  SelectField,
} from '@/uniforms/fields';

import schema from './schemas/search.json';

export type SearchFormProps = {
  onSuccess: (data: unknown) => void;
  loading?: boolean;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function SearchForm({ onSuccess, loading }: SearchFormProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const {
    rows: categories,
    loading: cateLoad,
    onSearch: debouncedOnCateSearch,
  } = useData<ProductCategoryEntity[]>('product/categories');
  const {
    rows: units,
    loading: unitLoad,
    onSearch: debouncedOnUnitSearch,
  } = useData<ProductUnitEntity[]>('product/units');
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
          onSuccess?.(formData);
        }}
      >
        <Form preserve={false} layout="inline">
          <AutoFields fields={['name']} />

          <SelectField
            loading={unitLoad}
            name="unit.id"
            options={units?.map((c) => {
              return {
                label: c.name,
                value: c.id,
              };
            })??[]}
            showSearch
            filterOption={false}
            onSearch={debouncedOnUnitSearch}
          />

          <SelectField
            loading={cateLoad}
            name="category.id"
            options={categories?.map((c) => {
              return {
                label: c.name,
                value: c.id,
              };
            })??[]}
            showSearch
            filterOption={false}
            onSearch={debouncedOnCateSearch}
          />

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
