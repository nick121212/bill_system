import { useEffect, useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import {
  Button,
  Collapse,
  Drawer,
  Form,
  Flex,
  Spin,
  Row,
  Col,
  Modal,
  message,
} from 'antd';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { useField, useForm } from 'uniforms';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  CustomerEntity,
  OrderCategoryEntity,
  OrderEntity,
  OrderProductEntity,
  ProductPriceEntity,
  TemplateCategoryEntity,
  TemplateCategoryProductEntity,
  TemplateEntity,
  type ProductEntity,
} from '@bill/database/esm';

import useData from '@/hooks/data/useData';
import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoField,
  AutoForm,
  EmptyField,
  ErrorsField,
  ListAddField,
  ListDelField,
  ListViewField,
  LongTextField,
  PriceField,
  TableField,
  VisibleField,
  SelectField,
  NumField,
} from '@/uniforms/fields';
import {
  convertEmptyToSearchAll,
  convertPriceToServer,
  convertPriceFromServer,
} from '@/utils';

import ComfirmDetail from './confirmDetail';
import schema from './schemas/create.json';

export type DetailFormProps = {
  onSuccess: () => void;
  onClose: () => void;
  order: OrderEntity;
  categories: (OrderCategoryEntity & {
    products: OrderProductEntity[];
  })[];
  title: string;
};

const bridge = getBridge(schema as SomeJSONSchema);

function CategorySelect({ name, id }: { name: string; id?: number }) {
  const {
    rows: categories,
    loading: categoryLoad,
    onSearch: debouncedOnCategorySearch,
  } = useData<ProductEntity[]>('product/categories', id ? { id } : {}, false);
  const [field] = useField(`${name}.productId`, {});

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <div className="w-full">
      <AutoField
        name={`${name}.productCategoryId`}
        options={categories?.map((c) => {
          return {
            label: c.name,
            value: c.id,
            data: c,
          };
        })}
        label={''}
        loading={categoryLoad}
        showSearch
        filterOption={false}
        onChangeData={(_id: number, _data: ProductEntity) => {
          field.onChange(undefined, field.name);
        }}
        onSearch={(val: string) =>
          debouncedOnCategorySearch({
            name: val === '' ? undefined : convertEmptyToSearchAll(val),
          })
        }
      ></AutoField>
    </div>
  );
}

function ProductSelect({ name, id }: { name: string; id?: number }) {
  const form = useForm();
  const [field] = useField(`${name}.productCategoryId`, {});
  const [fieldPrice] = useField(`${name}.price`, {});
  const [fieldDesc] = useField(`${name}.desc`, {});
  const [fieldProduct] = useField<any, ProductEntity>(`${name}.product`, {});
  const [filedDiscount] = useField<any, number>(
    `discount`,
    {},
    {
      absoluteName: true,
    },
  );
  const [fieldCustomerProducts] = useField<any, Record<number, ProductEntity>>(
    `customerProducts`,
    {},
    {
      absoluteName: true,
    },
  );
  const {
    rows: products,
    loading: productLoad,
    onSearch: debouncedOnProductSearch,
  } = useData<ProductEntity[]>(
    'product/categories/products/list',
    id
      ? { productId: id, categoryId: field.value }
      : { categoryId: field.value },
    false,
  );
  // const mounted = useMountedState();

  useEffect(() => {
    // if (!mounted() || !fieldPrice.changed) {
    //   return;
    // }

    if (id && fieldCustomerProducts.value[id]) {
      const price =
        (fieldCustomerProducts.value[id].price *
          fieldCustomerProducts.value[id].discount) /
        100;

      return fieldPrice.onChange(price, fieldPrice.name);
    }

    if (fieldProduct.value?.price) {
      return fieldPrice.onChange(
        (fieldProduct.value?.price * filedDiscount.value) / 100,
        fieldPrice.name,
      );
    }

    if (products?.length === 1) {
      return fieldPrice.onChange(
        (products[0].price * filedDiscount.value) / 100,
        fieldPrice.name,
      );
    }
  }, [fieldCustomerProducts.value, id, products, form.model.templateId]);

  return (
    <div className="w-full">
      <AutoField
        name={`${name}.productId`}
        options={products?.map((c) => {
          return {
            label: c.name + '- ￥' + convertPriceFromServer(c.price) + '元',
            value: c.id,
            data: c,
          };
        })}
        onChangeData={(_e: number, data: { data: ProductEntity }) => {
          fieldDesc.onChange(data.data.desc, fieldDesc.name);
          fieldPrice.onChange(
            convertPriceFromServer(data.data.price),
            fieldPrice.name,
          );
          fieldProduct.onChange(data.data, fieldProduct.name);
        }}
        label={''}
        loading={productLoad}
        showSearch
        filterOption={false}
        onSearch={(val: string) =>
          debouncedOnProductSearch({
            categoryId: field.value,
            ...{
              name: val === '' ? undefined : convertEmptyToSearchAll(val),
              productId: !val ? id : undefined,
            },
          })
        }
      ></AutoField>
    </div>
  );
}

function TemplateSelect() {
  const [field] = useField(`categories`, {});
  const {
    rows: templates,
    loading: tempLoading,
    onSearch: debouncedOnTemplateSearch,
  } = useData<TemplateEntity[]>('templates', { useDefaultData: true });
  const [{ data: categories, loading: categoriesLoading }, fetchCategories] =
    useAxios<
      (TemplateCategoryEntity & {
        products: TemplateCategoryProductEntity[];
      })[]
    >(``, { manual: true });

  useEffect(() => {
    if (!categories && !categoriesLoading) {
      return;
    }

    let categroirsCopy =
      categories?.map((cate) => {
        return {
          name: cate.name,
          products: cate.products
            ? cate.products.map((product) => {
                return {
                  productId: product?.product?.id,
                  productCategoryId: product?.productCategory?.id,
                  product: product.product,
                  count: product.count,
                  times: product.times,
                  desc: product?.product?.desc,
                  price: product.price,
                };
              })
            : [],
        };
      }) || [];

    field.onChange(categroirsCopy, field.name);
  }, [categories]);

  return (
    <AutoField
      name="templateId"
      options={templates?.map((c) => {
        return {
          label: c.name,
          value: c.id,
          data: c,
        };
      })}
      loading={tempLoading}
      onChangeData={(value: number) => {
        fetchCategories({
          url: `templates/${value}/categories`,
        });
      }}
      showSearch
      filterOption={false}
      onSearch={(val: string) =>
        debouncedOnTemplateSearch({
          name: val === '' ? undefined : convertEmptyToSearchAll(val),
        })
      }
    ></AutoField>
  );
}

function CategoryItem(props: any) {
  return (
    <>
      <Collapse
        className="w-full"
        defaultActiveKey={[props.name]}
        expandIconPosition="start"
        items={[
          {
            key: props.name,
            classNames: {
              body: 'p-0',
            },
            label: (
              <div onClick={(e) => e.stopPropagation()}>
                <AutoField name={`${props.name}.name`} />
              </div>
            ),
            extra: (
              <ListDelField
                color="danger"
                className="ml-2"
                name={`${props.name}`}
              />
            ),
            children: (
              <TableField
                size="small"
                name={`${props.name}.products`}
                pagination={false}
                columns={[
                  // 分类， 名称，描述，价格，单位，数量，分数，操作
                  {
                    title: '分类',
                    dataIndex: 'productCategoryId',
                    render: (val, _record, index) => {
                      return <CategorySelect name={`${index}`} id={val || 0} />;
                    },
                  },
                  {
                    title: '商品',
                    dataIndex: 'productId',
                    render: (val, _record, index) => {
                      return <ProductSelect name={`${index}`} id={val || 0} />;
                    },
                  },
                  {
                    title: '描述',
                    dataIndex: 'desc',
                    align: 'center',
                  },
                  {
                    title: '价格',
                    dataIndex: 'price',
                    render: (_val, _record, index) => {
                      return <PriceField label="" name={`${index}.price`} />;
                    },
                  },
                  {
                    title: '数量',
                    dataIndex: 'count',
                    render: (_val, _record, index) => {
                      return (
                        <AutoField step={1} label="" name={`${index}.count`} />
                      );
                    },
                  },
                  {
                    title: '份数',
                    dataIndex: 'times',
                    render: (_val, _record, index) => {
                      return (
                        <AutoField step={1} label="" name={`${index}.times`} />
                      );
                    },
                  },
                  {
                    title: '',
                    width: 100,
                    render: (_val, _record, index) => {
                      return <ListDelField name={`${index}`} />;
                    },
                  },
                ]}
              >
                <ListAddField
                  name="$"
                  shape="default"
                  ghost
                  size="small"
                  type="primary"
                  variant="link"
                  icon={<PlusOutlined />}
                >
                  添加商品
                </ListAddField>
              </TableField>
            ),
          },
        ]}
      />
    </>
  );
}

function CustomerSelect() {
  const {
    rows: customers,
    loading: cusLoading,
    onSearch: debouncedOnCustomerSearch,
  } = useData<CustomerEntity[]>('customers', {});
  const [{}, fetchProducts] = useAxios<{
    rows: ProductPriceEntity[];
    count: number;
    map: Record<number, ProductPriceEntity>;
  }>(``, {
    manual: true,
  });
  const [field] = useField(`customerProducts`, {}, { absoluteName: true });
  const [discountField] = useField(`discount`, {}, { absoluteName: true });
  const [customerField] = useField(`customer`, {}, { absoluteName: true });

  return (
    <AutoField
      name="customerId"
      options={customers?.map((c) => {
        return {
          label: c.fullname,
          value: c.id,
          data: c,
        };
      })}
      onChangeData={(id: number, data: { data: CustomerEntity }) => {
        fetchProducts({
          url: `customers/${id}/products`,
        }).then(({ data }) => {
          field.onChange(data.map, field.name);
        });

        customerField.onChange(data.data, customerField.name);
        discountField.onChange(data.data.discount, discountField.name);
      }}
      loading={cusLoading}
      showSearch
      filterOption={false}
      onSearch={(val: string) =>
        debouncedOnCustomerSearch({
          name: val === '' ? undefined : convertEmptyToSearchAll(val),
        })
      }
    ></AutoField>
  );
}

function TotalPrice() {
  const [field] = useField<
    {},
    (OrderCategoryEntity & { products: OrderProductEntity[] })[]
  >(`categories`, {});
  const [realTotalPriceField] = useField<any, number>(
    `realTotalPrice`,
    {},
    {
      absoluteName: true,
    },
  );

  let totalPrice = 0;

  field.value?.forEach((category) => {
    category?.products?.forEach((product) => {
      if (product?.count && product?.price && product?.times)
        totalPrice += product.count * product.price * product.times;
    });
  });

  // totalPrice = (totalPrice * (filedDiscount.value || 100)) / 100;

  useEffect(() => {
    realTotalPriceField.onChange(
      (totalPrice.toFixed(2) as any) * 1,
      realTotalPriceField.name,
    );
  }, [totalPrice]);

  return (
    <div style={{ color: 'red', fontSize: 18 }} className="text-red-600 mb-2">
      <Row gutter={24}>
        <Col
          span={5}
          style={{ textAlign: 'right', padding: 0, marginLeft: 10 }}
        >
          应收总价：
        </Col>
        <Col span={18}>{totalPrice.toFixed(2)}</Col>
      </Row>
    </div>
  );
}

export default function DetailForm({
  onSuccess,
  onClose: onCloseProps,
  order,
  categories,
  title,
}: DetailFormProps) {
  const { t } = useTranslation();
  const [modal, contextHolder] = Modal.useModal();
  const formRef = useRef<any>();
  const { onSubmit, callAjax, loadingAjax } = useFormAction(
    formRef,
    {
      url: order?.id ? `/orders/${order?.id}` : '/orders',
      method: order?.id ? 'PUT' : 'POST',
    },
    () => {
      onCloseProps();
      onSuccess?.();
    },
  );

  const confirm = () => {
    const data = formRef.current.getModel();
    modal.confirm({
      title: '确认提交',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <ComfirmDetail formData={data} />
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        if (data.categories?.length === 0) {
          message.error('请至少添加一个分类');
          return;
        }

        if (data.categories?.some((cate: any) => cate.products?.length === 0)) {
          message.error('请至少添加一个商品');
          return;
        }

        onSubmit();
      },
      width: window.innerWidth * 0.75,
      style: { maxWidth: '75vw' },
    });
  };

  return (
    <Drawer
      destroyOnClose
      width={'100%'}
      onClose={onCloseProps}
      open={true}
      title={title}
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
            model={
              {
                templateId: order?.templateId || -1,
                ...order,
                customerId: order?.customer?.id,
                categories: categories?.map((cate) => {
                  return {
                    name: cate.name,
                    products: cate.products.map((product) => {
                      return {
                        product: product.product,
                        product1: product.product,
                        productId: product.product.id,
                        productCategoryId: product.productCategory.id,
                        count: product.count,
                        times: product.times,
                        desc: product.product.desc,
                        price: product.price,
                      };
                    }),
                  };
                }),
              } as any
            }
            onSubmit={(formData: {
              categories: {
                name: string;
                products: {
                  productId: number;
                  productCategoryId: number;
                  count: number;
                  times: number;
                  desc: string;
                  price: number;
                }[];
              }[];
              no: string;
              customerId: number;
              templateId: number;
              realTotalPrice: number;
              desc: string;
            }) => {
              // 转换价格为整数后提交
              const processedCategories = formData.categories.map(
                (category) => ({
                  ...category,
                  products: category.products.map((product) => ({
                    ...product,
                    price: convertPriceToServer(product.price),
                  })),
                }),
              );

              callAjax({
                data: {
                  no: formData.no,
                  customerId: formData.customerId,
                  templateId: formData.templateId,
                  categories: processedCategories,
                  desc: formData.desc,
                  realTotalPrice: formData.realTotalPrice,
                },
              });
            }}
          >
            <ErrorsField />

            <CustomerSelect />

            <TemplateSelect />

            <VisibleField
              name="categories"
              condition={(model) => {
                return model.templateId;
              }}
            >
              <EmptyField name="categories">
                <ListViewField
                  label=""
                  name="categories"
                  rowKey={(item) => {
                    if (item.key) {
                      return item.key;
                    }
                    item.key = Date.now();
                    return item.key;
                  }}
                  addButton={
                    <ListAddField
                      name="$"
                      shape="default"
                      ghost
                      size="large"
                      color="danger"
                      variant="text"
                      value={(cates: any) => {
                        return {
                          key: Date.now(),
                          name: `分类${cates?.length ? cates?.length + 1 : 1}`,
                        };
                      }}
                      icon={<PlusOutlined />}
                    >
                      添加分类
                    </ListAddField>
                  }
                >
                  <CategoryItem name="$" />
                </ListViewField>
              </EmptyField>
            </VisibleField>

            <LongTextField name="desc" />

            <SelectField
              name="status"
              options={[
                { label: '未结款', value: 0 },
                { label: '已结款', value: 1 },
                { label: '已取消', value: 2 },
              ]}
            />
            <TotalPrice />

            <NumField name="realTotalPrice" />
          </AutoForm>
        </Spin>
      </Form>

      <Flex justify="center" gap={10}>
        <Button loading={loadingAjax} onClick={onCloseProps}>
          {t('crud.cancel')}
        </Button>
        <Button type="primary" onClick={confirm}>
          {t('crud.confirm')}
        </Button>
      </Flex>

      {contextHolder}
    </Drawer>
  );
}
