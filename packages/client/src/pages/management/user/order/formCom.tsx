import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Space,
  Spin,
  Input,
  Select,
  Row,
  Col,
  message,
  Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type {
  OrderEntity,
  TemplateEntity,
  TemplateCategoryEntity,
  TemplateCategoryProductEntity,
  CustomerEntity,
} from '@bill/database/esm';
import useAxios from 'axios-hooks';

import useData from '@/hooks/data/useData';
import { getRandomId } from '@/utils/utils';

import CatProd from './catProd';

const randomId = getRandomId();

export type IProps = {
  formValue?: OrderEntity;
  loadingAjax: boolean;
  form: any;
  formRef: any;
};

type TmpCategorys = TemplateCategoryEntity & {
  products: TemplateCategoryProductEntity[];
};

export default function FormCom({ formValue, loadingAjax, form, formRef }: IProps) {
  const customerId = Form.useWatch('customerId', form);
  const [templateId, setTemplateId] = useState<number | undefined>(undefined);
  const [{ loading: tempCateLoading }, fetchTmpCategories] = useAxios(
    {
      url: `/templates/${templateId}/categories`,
    },
    {
      manual: true,
    },
  );
  const [{ loading: orderCateLoading }, fetchOrderCategories] = useAxios(
    {
      url: `/orders/${formValue?.id}/categories`,
    },
    {
      manual: true,
    },
  );
  const {
    rows: customers,
    loading: loadingCustomers,
    onSearch: debouncedOnCustomerSearch,
  } = useData<CustomerEntity[]>('customers');
  const {
    rows: templates,
    loading: loadingTemplates,
    onSearch: debouncedOnTemplateSearch,
  } = useData<TemplateEntity[]>('templates');

  const [{ data: cusProductData }, fetchCustomerProduct] = useAxios(
    {
      url: `/customers/${customerId}/products`,
    },
    {
      manual: true,
    },
  );

  const [catProdKey, setCatProdKey] = useState<number>(randomId());

  useEffect(() => {
    if (formValue?.id) {
      fetchOrderCategories().then((res: { data: TmpCategorys[] }) => {
        const categories = res.data;
        const initialValues = {
          ...formValue,
          customerId: formValue.customer.id,
          categories: categories?.map((item: TmpCategorys) => ({
            name: item.name,
            productCategoryId: item.category?.id,
            products: item.products?.map((product) => ({
              ...product,
              name: product.product.name,
              label: product.product.label,
              unit: product.product.unit,
              randomId: randomId(),
            })),
          })),
        };
        form.setFieldsValue(initialValues);
      });
    }
  }, []);

  useEffect(() => {
    // 切换模板回显
    if (templateId) {
      fetchTmpCategories().then((res: { data: TmpCategorys[] }) => {
        const categories = res.data?.map((item: TmpCategorys) => ({
          id: item.id,
          name: item.name,
          productCategoryId: item.category?.id,
          products: item.products?.map((product) => ({
            ...product,
            name: product.product.name,
            label: product.product.label,
            unit: product.product.unit,
            randomId: randomId(),
          })),
        }));
        form.setFieldsValue({ categories: categories });
        setCatProdKey(randomId());
      });
    }
  }, [templateId]);

  useEffect(() => {
    if (customerId) {
      fetchCustomerProduct();
    }
  }, [customerId]);

  const handleTemplateChange = (newTemplateId: number) => {
    if (!customerId) {
      message.error('请选择客户');
      form.setFieldsValue({ templateId: '' });
      return;
    }
    if (newTemplateId === templateId) {
      return;
    }
    if (!templateId) {
      form.setFieldsValue({ templateId: newTemplateId });
      setTemplateId(newTemplateId);
      return;
    }

    Modal.confirm({
      title: '切换模板确认',
      content: '切换模板将重置已设置的产品，是否继续？',
      onOk: () => {
        form.setFieldsValue({ templateId: newTemplateId });
        setTemplateId(newTemplateId);
      },
      onCancel: () => {
        form.setFieldsValue({ templateId: templateId });
      },
    });
  };

  return (
    <Form
      preserve={false}
      layout="horizontal"
      labelAlign="right"
      ref={formRef}
      form={form}
    >
      <Spin spinning={loadingAjax}>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              label="订单编号"
              name="no"
              rules={[{ required: true, message: '请输入订单编号' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              label="客户"
              name="customerId"
              rules={[{ required: true, message: '请选择客户' }]}
            >
              <Select
                loading={loadingCustomers}
                filterOption={false}
                options={customers?.map((customer) => ({
                  label: customer.fullname,
                  value: customer.id,
                }))}
                onSearch={(val) => {
                  debouncedOnCustomerSearch({
                    name: val === '' ? undefined : val,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="模板" name="templateId">
              <Select
                loading={loadingTemplates}
                filterOption={false}
                options={templates?.map((template) => ({
                  label: template.name,
                  value: template.id,
                }))}
                value={templateId}
                showSearch
                onSearch={(val) => {
                  debouncedOnTemplateSearch({
                    name: val === '' ? undefined : val,
                  });
                }}
                onChange={handleTemplateChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="描述" name="desc">
              <Input.TextArea autoSize={{ maxRows: 2 }} />
            </Form.Item>
          </Col>
        </Row>
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
            <Form.Item required>
              <Space size={10} direction="vertical" style={{ width: '100%' }}>
                {fields.map((field, index) => (
                  <Form.Item
                    key={field.key}
                    name={[field.name]}
                    // rules={[
                    //   {
                    //     validator(_, value, callback) {
                    //       if (!value?.name) {
                    //         callback('请输入名称');
                    //       } else if (!value?.productCategoryId) {
                    //         callback('请选择产品分类');
                    //       } else
                    //       if (!value?.products?.length) {
                    //         callback('请添加产品');
                    //       }
                    //       callback();
                    //     },
                    //   },
                    // ]}
                  >
                    <CatProd
                      key={catProdKey}
                      onRemove={() => remove(field.name)}
                      index={index}
                      cusProductData={cusProductData?.[0]}
                    />
                  </Form.Item>
                ))}
              </Space>
              <Form.Item>
                <Button
                  type="primary"
                  variant="filled"
                  onClick={() => {
                    if (!customerId || !templateId) {
                      message.error('请选择客户和模板');
                      return;
                    }
                    add();
                  }}
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
  );
}
