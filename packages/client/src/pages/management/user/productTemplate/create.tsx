import { useCallback, useRef, useEffect } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Drawer, Form, Space, Spin, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';
import { PlusOutlined } from '@ant-design/icons';
import type { ProductCategoryEntity } from '@bill/database/esm';
import useAxios from 'axios-hooks';

import useFormAction from '@/hooks/form/useFormAction';
import useData from '@/hooks/data/useData';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoFields,
  AutoForm,
  ErrorsField,
  TextAreaField,
  AutoField,
  SelectField,
} from '@/uniforms/fields';

import schema from './schemas/create.json';
import { where } from 'ramda';

export type ProductModalProps = {
  formValue?: ProductCategoryEntity;
  title: string;
  onSuccess: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function TemplateCreateModal({
  formValue,
  title,
  onSuccess,
}: ProductModalProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
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
    callAjax,
    loadingAjax,
  } = useFormAction(
    formRef,
    {
      url: '/product/templates',
      method: 'POST',
    },
    onSuccessCall,
  );
  const {
    rows: categories,
    loading: cateLoad,
    onSearch: onCateSearch,
  } = useData<ProductCategoryEntity[]>('product/categories');

  const debouncedOnCateSearch = debounce((val) => {
    onCateSearch({ name: val });
  }, 800);

  const [{ data: productList }, productFetch] = useAxios(
    {
      url: `products`,
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    console.log(111666, productList);
  }, [productList]);

  return (
    <>
      <Button
        loading={loadingAjax}
        type="link"
        icon={<PlusOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {t('crud.create.buttonText')}
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
                setFormData(formData);
                callAjax({
                  data: formData,
                });
              }}
            >
              <ErrorsField />

              <AutoFields fields={['name']} />

              <SelectField
                loading={cateLoad}
                name="categoryId"
                options={
                  cateLoad
                    ? []
                    : categories?.map((c) => {
                        return {
                          label: c.name,
                          value: c.id,
                        };
                      })
                }
                showSearch
                filterOption={false}
                notFoundContent={!cateLoad ? <Spin size="small" /> : null}
                onSearch={debouncedOnCateSearch}
                onChange={(val) => {
                  if (!val) return;
                  productFetch({
                    params: {
                      skip: 0,
                      take: 99,
                      where: {
                        category: {
                          id: val,
                        },
                      },
                    },
                  });
                }}
              />

              {
                // categoryId有值时，product字段才会显示
                // !!productList?.count && <ListItemField name="product" />
              }
              <TextAreaField name="desc" />
            </AutoForm>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
