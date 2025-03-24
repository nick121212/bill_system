import { useCallback, useRef } from 'react';
import type { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Form, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { CustomerEntity } from '@bill/database/esm';
import dayjs from 'dayjs';

import useData from '@/hooks/data/useData';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoForm,
  AutoFields,
  SelectField,
  RangeFields,
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
    rows: customers,
    loading: customerLoad,
    onSearch: debouncedOnCustomerSearch,
  } = useData<CustomerEntity[]>('customers');
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
            if (key === 'time') {
              formData.startTime = dayjs((formData[key] as Date[])[0]).format(
                'YYYY-MM-DD',
              );
              formData.startend = dayjs((formData[key] as Date[])[1]).format(
                'YYYY-MM-DD',
              );
              delete formData[key];
            }
          }
          onSuccess?.(formData);
        }}
      >
        <Form preserve={false} layout="inline">
          <AutoFields fields={['no']} />

          <SelectField
            loading={customerLoad}
            name="customer.id"
            options={
              customers?.map((c) => {
                return {
                  label: c.fullname,
                  value: c.id,
                };
              }) ?? []
            }
            showSearch
            filterOption={false}
            onSearch={(val: string) =>
              debouncedOnCustomerSearch({
                fullname: val === '' ? undefined : val,
              })
            }
          />

          <RangeFields name="time" showTime={false} />

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
