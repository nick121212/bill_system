import { useCallback, useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Drawer, Form, Space, Spin } from 'antd';
import type { ButtonType } from 'antd/es/button';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { ProductCategoryEntity, ProductUnitEntity } from '@bill/database/esm';

import useData from '@/hooks/data/useData';
import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoFields,
  AutoForm,
  ErrorsField,
  TextAreaField,
  AutoField,
} from '@/uniforms/fields';

import schema from './schemas/create.json';

export type ProductModalProps = {
  btnType?: ButtonType;
  btnTxt?: string;
  title: string;
  onSuccess: () => void;
};

const bridge = getBridge(schema as SomeJSONSchema);

export default function ProductCreateModal({
  btnType = 'link',
  btnTxt,
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
      url: '/products',
      method: 'POST',
    },
    onSuccessCall,
  );
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

  return (
    <>
      <Button
        loading={loadingAjax}
        type={btnType}
        icon={<PlusOutlined />}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {btnTxt || t('crud.create.buttonText')}
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
              onSubmit={(formData) => {
                setFormData(formData);
                callAjax({
                  data: formData,
                });
              }}
            >
              <ErrorsField />

              <AutoFields fields={['name', 'label', 'price', 'cost']} />

              <AutoField
                name="unitId"
                options={
                  unitLoad
                    ? []
                    : units?.map((c) => {
                        return {
                          label: c.name,
                          value: c.id,
                        };
                      })
                }
                showSearch
                filterOption={false}
                onSearch={(val: string) =>
                  debouncedOnUnitSearch({ name: val === '' ? undefined : val })
                }
              />

              <AutoField
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
                onSearch={(val: string) =>
                  debouncedOnCateSearch({ name: val === '' ? undefined : val })
                }
              />

              <TextAreaField name="desc" />
            </AutoForm>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
