import { useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Collapse, Drawer, Form, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useField } from 'uniforms';
import { PlusOutlined } from '@ant-design/icons';
import {
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
} from '@/uniforms/fields';
import {
  convertEmptyToSearchAll,
  convertPriceToServer,
  convertPriceFromServer,
} from '@/utils';

import schema from './schemas/create.json';

export type DetailFormProps = {
  onSuccess: () => void;
  onClose: () => void;
  template: TemplateEntity;
  categories: (TemplateCategoryEntity & {
    products: TemplateCategoryProductEntity[];
  })[];
  title: string;
};

const bridge = getBridge(schema as SomeJSONSchema);

function CategorySelect({ name, id }: { name: string; id?: number }) {
  const {
    rows: categories,
    loading: categoryLoad,
    onSearch: debouncedOnCategorySearch,
  } = useData<ProductEntity[]>('product/categories', id ? { id } : {});
  const [field] = useField(`${name}.productId`, {});

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
        onChangeData={(id: number, data: ProductEntity) => {
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
  const [field] = useField(`${name}.productCategoryId`, {});
  const [fieldPrice] = useField(`${name}.price`, {});
  const [fieldDesc] = useField(`${name}.desc`, {});
  const {
    rows: products,
    loading: productLoad,
    onSearch: debouncedOnProductSearch,
  } = useData<ProductEntity[]>(
    'product/categories/products/list',
    id
      ? { productId: id, categoryId: field.value }
      : { categoryId: field.value },
    field.value,
  );

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
        onChangeData={(e: number, data: { data: ProductEntity }) => {
          fieldDesc.onChange(data.data.desc, fieldDesc.name);
          fieldPrice.onChange(data.data.price, fieldPrice.name);
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
            extra: <ListDelField color="danger" className="ml-2" name={`${props.name}`} />,
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
                    render: (val, record, index) => {
                      return <CategorySelect name={`${index}`} id={val || 0} />;
                    },
                  },
                  {
                    title: '商品',
                    dataIndex: 'productId',
                    render: (val, record, index) => {
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
                    render: (val, record, index) => {
                      return <PriceField label="" name={`${index}.price`} />;
                    },
                  },
                  {
                    title: '数量',
                    dataIndex: 'count',
                    render: (val, record, index) => {
                      return (
                        <AutoField step={1} label="" name={`${index}.count`} />
                      );
                    },
                  },
                  {
                    title: '份数',
                    dataIndex: 'times',
                    render: (val, record, index) => {
                      return (
                        <AutoField step={1} label="" name={`${index}.times`} />
                      );
                    },
                  },
                  {
                    title: '',
                    width: 100,
                    render: (val, record, index) => {
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

export default function DetailForm({
  onSuccess,
  onClose: onCloseProps,
  template,
  categories,
  title,
}: DetailFormProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { onSubmit, callAjax, loadingAjax } = useFormAction(
    formRef,
    {
      url: template?.id ? `/templates/${template?.id}` : '/templates',
      method: template?.id ? 'PUT' : 'POST',
    },
    () => {
      onSuccess?.();
      onCloseProps();
    },
  );

  return (
    <Drawer
      destroyOnClose
      width={'100%'}
      onClose={onCloseProps}
      open={true}
      title={title}
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
            model={{
              ...template,
              categories: categories?.map((cate) => {
                return {
                  name: cate.name,
                  products: cate.products?.map((product) => {
                    return {
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
            }}
            onSubmit={(formData) => {
              const processedCategories = formData.categories?.map(
                (category) => ({
                  ...category,
                  products: category.products?.map((product) => ({
                    ...product,
                    price: convertPriceToServer(product.price),
                  })),
                }),
              );

              callAjax({
                data: {
                  ...formData,
                  categories: processedCategories,
                },
              });
            }}
          >
            <ErrorsField />

            <AutoField name="name" />

            <EmptyField name="categories">
              <ListViewField
                label=""
                name="categories"
                rowKey={(item) => {
                  return item;
                }}
                addButton={
                  <ListAddField
                    name="$"
                    shape="default"
                    ghost
                    size="large"
                    color="danger"
                    variant="text"
                    icon={<PlusOutlined />}
                  >
                    添加分类
                  </ListAddField>
                }
              >
                <CategoryItem name="$" />
              </ListViewField>
            </EmptyField>

            <LongTextField name="desc" />
          </AutoForm>
        </Spin>
      </Form>
    </Drawer>
  );
}
