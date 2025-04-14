import { useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Divider, Drawer, Form, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useField, useForm } from 'uniforms';
import type { ProductCategoryEntity, ProductEntity } from '@bill/database/esm';

import useData from '@/hooks/data/useData';
import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoField,
  AutoFields,
  AutoForm,
  ErrorsField,
  ListAddField,
  ListDelField,
  ListField,
  ListViewField,
  TableField,
  TextAreaField,
} from '@/uniforms/fields';

import schema from './schemas/create.json';

export type CategoryDrawerProps = {
  formValue?: ProductCategoryEntity;
  title: string;
  onSuccess: () => void;
  open: boolean;
  onClose: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

function ProductSelect({ name }: { name: string }) {
  const [props] = useField(name, {});
  const form = useForm();
  const excludeIds = (form?.model?.products as number[])?.filter(
    (id) => id !== props.value,
  );
  const {
    rows: products,
    loading: productLoad,
    onSearch: debouncedOnProductSearch,
  } = useData<ProductEntity[]>(
    'products',
    props.value
      ? {
          id: props.value,
        }
      : {
          excludeIds,
        },
  );

  return (
    <div className="w-full">
      <AutoField
        name={name}
        options={products?.map((c) => {
          return {
            label: c.name ,
            value: c.id,
          };
        })}
        label={undefined}
        loading={productLoad}
        showSearch
        filterOption={false}
        onSearch={(val: string) =>
          debouncedOnProductSearch({
            excludeIds,
            name: val === '' ? undefined : val,
          })
        }
      ></AutoField>
    </div>
  );
}

export default function CategoryDrawer({
  formValue,
  title,
  onSuccess,
  open,
  onClose: onCloseProps,
}: CategoryDrawerProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { onSubmit, callAjax, loadingAjax } = useFormAction(
    formRef,
    {
      url: '/product/categories',
      method: 'POST',
    },
    () => {
      onSuccess?.();
      onCloseProps();
    },
  );

  return (
    <Drawer
      title={title}
      destroyOnClose
      width={720}
      onClose={onCloseProps}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button loading={loadingAjax} onClick={onCloseProps}>
            {t('crud.cancel')}
          </Button>
          <Button loading={loadingAjax} onClick={onSubmit} type="primary">
            {t('crud.confirm')}
          </Button>
        </Space>
      }
    >
      <Form
        labelCol={{ span: 5 }}
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
              callAjax({
                data: formData,
              });
            }}
          >
            <ErrorsField />
            <AutoFields fields={['name']} />
            <TextAreaField name="desc" />
            <Divider>商品列表</Divider>
            <ListViewField
              rowKey={(item) => {
                return item;
              }}
              size="small"
              name="products"
              label=" "
              addButton={
                <ListAddField
                  type="primary"
                  size="middle"
                  shape="default"
                  name="$"
                >
                  添加商品
                </ListAddField>
              }
            >
              <ProductSelect name="$" />
              <ListDelField name="$" />
            </ListViewField>
          </AutoForm>
        </Spin>
      </Form>
    </Drawer>
  );
}
