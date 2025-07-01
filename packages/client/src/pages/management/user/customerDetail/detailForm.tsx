import { useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Button, Flex, Form, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useField, useForm } from 'uniforms';
import { PlusOutlined } from '@ant-design/icons';
import { ProductPriceEntity, type ProductEntity } from '@bill/database/esm';

import useData from '@/hooks/data/useData';
import useFormAction from '@/hooks/form/useFormAction';
import { getBridge } from '@/uniforms/ajv';
import {
  AutoField,
  AutoForm,
  ErrorsField,
  ListAddField,
  ListDelField,
  TableField,
} from '@/uniforms/fields';
import { convertPriceToServer } from '@/utils';

import schema from './schemas/create.json';
import CustomerProductModal from './upload';

export type CategoryDrawerProps = {
  onSuccess?: () => void;
  onClose: () => void;
  customerId: number;
};

const bridge = getBridge(schema as SomeJSONSchema);

function ProductSelect({ name, id }: { name: string; id?: number }) {
  const [props] = useField(name, {});
  const [field] = useField(`${name}.price`, {});
  const form = useForm();
  const excludeIds = (form?.model?.prices as ProductPriceEntity[])
    ?.filter((p) => p?.product?.id !== props.value)
    .map((p) => p?.product?.id);
  const {
    rows: products,
    loading: productLoad,
    onSearch: debouncedOnProductSearch,
  } = useData<ProductEntity[]>('products', id ? { id } : { excludeIds });

  return (
    <div className="w-full">
      <AutoField
        name={`${name}.productId`}
        options={products?.map((c) => {
          return {
            label: c.name + '-' + c.id,
            value: c.id,
            data: c,
          };
        })}
        onChangeData={(_e: number, data: any) => {
          field.onChange(data.data.price, field.name);
        }}
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
  // onSuccess,
  // onClose: onCloseProps,
  customerId,
}: CategoryDrawerProps) {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const { onSubmit, callAjax, loadingAjax } = useFormAction(
    formRef,
    {
      url: `/customers/${customerId}/products`,
      method: 'POST',
    },
    () => {
      // onSuccess?.();
      // onCloseProps();
    },
  );
  const { rows, loading, onSearch } = useData<
    (ProductPriceEntity & { customerPrices: ProductPriceEntity[] })[]
  >(`customers/${customerId}/products`);

  return (
    <Space size={10} direction="vertical" className="w-full">
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
              prices: (rows || []).map(
                (
                  r: ProductPriceEntity & {
                    customerPrices: ProductPriceEntity[];
                  },
                ) => {
                  let price = r.price;
                  if (r.customerPrices && r.customerPrices.length > 0) {
                    price = r.customerPrices[0].price;
                  }

                  return { ...r, productId: r.product?.id, price };
                },
              ),
            }}
            onSubmit={(formData) => {
              const processedPrices = (
                formData as { prices: ProductEntity[] }
              ).prices.map((price) => ({
                ...price,
                price: convertPriceToServer(price.price),
              }));

              callAjax({
                data: {
                  ...formData,
                  prices: processedPrices,
                },
              });
            }}
          >
            <ErrorsField />

            <TableField
              size="small"
              name="prices"
              loading={loading}
              dataSource={rows}
              pagination={false}
              columns={[
                {
                  title: '名称',
                  dataIndex: 'productId',
                  align: 'center',
                  width: 200,
                  render: (val, _record, index) => {
                    return <ProductSelect name={`${index}`} id={val} />;
                  },
                },
                {
                  title: '价格',
                  dataIndex: 'price',
                  align: 'center',
                  width: 200,
                  render: (_val, _record, index) => {
                    return <AutoField name={`${index}.price`} />;
                  },
                },
                {
                  title: '折扣',
                  dataIndex: 'discount',
                  align: 'center',
                  width: 200,
                  render: (_val, _record, index) => {
                    return <AutoField name={`${index}.discount`} />;
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
                size="large"
                type="primary"
                icon={<PlusOutlined />}
              >
                添加商品
              </ListAddField>
            </TableField>
          </AutoForm>
        </Spin>
      </Form>

      <Flex className="w-full" justify="center">
        <Space>
          <CustomerProductModal customerId={customerId} title="" onSuccess={onSearch}/>
          <Button loading={loadingAjax} onClick={onSubmit} type="primary">
            {t('crud.save')}
          </Button>
        </Space>
      </Flex>
    </Space>
  );
}
