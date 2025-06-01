import { useCallback, useRef } from 'react';
import type { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Form, Space } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { CustomerEntity } from '@bill/database/esm';

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
          const modifiedData = { ...formData };
          for (const key in modifiedData) {
            if (modifiedData[key] === '') {
              delete modifiedData[key];
            }
            if (key === 'time' && (modifiedData[key] as [])?.length > 0) {
              modifiedData.startDate = dayjs((modifiedData[key] as Date[])[0]).format(
                'YYYY-MM-DD',
              );
              modifiedData.endDate = dayjs((modifiedData[key] as Date[])[1]).format(
                'YYYY-MM-DD',
              );
              delete modifiedData[key];
            }
          }
          onSuccess?.(modifiedData);
        }}
      >
        <Form preserve={false} layout="inline" onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSuccessCall();
          }
        }}>
          <AutoFields fields={['no']} />

          <AutoFields fields={['phone']} />

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

          <SelectField
            loading={customerLoad}
            name="status"
            options={[
              { label: t('cls.order.statusStr.0'), value: 0 },
              { label: t('cls.order.statusStr.1'), value: 1 },
              { label: t('cls.order.statusStr.2'), value: 2 },
            ]}
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
