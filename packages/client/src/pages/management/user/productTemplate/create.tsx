import { useCallback, useRef, useEffect } from 'react';
import { Button, Drawer, Form, Space, Spin, Input } from 'antd';
import type { ButtonType } from 'antd/es/button';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import type {
  TemplateEntity,
  TemplateCategoryEntity,
  TemplateCategoryProductEntity,
} from '@bill/database/esm';

import useFormAction from '@/hooks/form/useFormAction';

import CatProd from './catProd';

export type ProductModalProps = {
  btnType?: ButtonType;
  btnTxt?: string;
  formValue?: TemplateEntity;
  title: string;
  onSuccess: () => void;
};

type TmpCategorys = TemplateCategoryEntity & {
  products: TemplateCategoryProductEntity[];
};

export default function TemplateCreateModal({
  btnType = 'link',
  btnTxt,
  formValue,
  title,
  onSuccess,
}: ProductModalProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const [{ loading: loadingCategories }, fetchCategories] = useAxios(
    {
      url: `/templates/${formValue?.id}/categories`,
    },
    {
      manual: true,
    },
  );
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
      url: formValue?.id ? `/templates/${formValue?.id}` : '/templates',
      method: formValue?.id ? 'PUT' : 'POST',
    },
    onSuccessCall,
  );

  useEffect(() => {
    if (showModal && formValue?.id) {
      fetchCategories().then((res: { data: TmpCategorys[] }) => {
        const categories = res.data;
        const initialValues = {
          ...formValue,
          categories: categories?.map((item: TmpCategorys) => ({
            name: item.name,
            productCategoryId: item.category?.id,
            products: item.products?.map((product) => ({
              ...product,
              id: product.product?.id || product.id,
              name: product.product.name,
              label: product.product.label,
              unit: product.product.unit,
            })),
          })),
        };
        formRef.current.setFieldsValue(initialValues);
      });
    }
  }, [showModal]);

  return (
    <>
      {formValue?.id ? (
        <Button
          type={btnType}
          shape="circle"
          loading={loadingAjax}
          icon={<EditOutlined />}
          onClick={() => {
            setShowModal(true);
          }}
        />
      ) : (
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
      )}

      <Drawer
        title={title}
        destroyOnClose
        width={'100%'}
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
            <Button
              loading={loadingAjax}
              onClick={async () => {
                const res = await formRef.current.validateFields();
                callAjax({
                  data: { ...res, status: 1 },
                });
                onSubmit();
              }}
              type="primary"
            >
              {t('crud.confirm')}
            </Button>
          </Space>
        }
      >
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
          preserve={false}
          layout="horizontal"
          labelAlign="right"
          ref={formRef}
        >
          <Spin spinning={loadingAjax || loadingCategories}>
            <Form.Item
              label="模板名称"
              name="name"
              rules={[{ required: true, message: '请输入模板名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="描述" name="desc">
              <Input.TextArea />
            </Form.Item>
            <Form.List
              name="categories"
              rules={[
                {
                  validator(_, value, callback) {
                    if (!value?.length) {
                      callback('请添加产品');
                    }
                    callback();
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <Form.Item label="产品" required>
                  <Space
                    size={10}
                    direction="vertical"
                    style={{ width: '100%' }}
                  >
                    {fields.map((field, index) => (
                      <Form.Item
                        key={field.key}
                        name={[field.name]}
                        rules={[
                          {
                            validator(_, value, callback) {
                              if (!value?.name) {
                                callback('请输入名称');
                              } else if (!value?.productCategoryId) {
                                callback('请选择产品分类');
                              } else if (!value?.products?.length) {
                                callback('请添加产品');
                              }
                              callback();
                            },
                          },
                        ]}
                      >
                        <CatProd
                          onRemove={() => remove(field.name)}
                          index={index}
                        />
                      </Form.Item>
                    ))}
                  </Space>
                  <Form.Item>
                    <Button
                      type="primary"
                      variant="filled"
                      onClick={() => add()}
                      style={{ width: '100%', marginTop: 10 }}
                      icon={<PlusOutlined />}
                    >
                      新增
                    </Button>
                  </Form.Item>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              )}
            </Form.List>
          </Spin>
        </Form>
      </Drawer>
    </>
  );
}
