import { useRef } from 'react';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Drawer,
  Form,
  Space,
  Spin,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useField } from 'uniforms';
import { PlusOutlined } from '@ant-design/icons';
import { CustomerEntity, ProductPriceEntity, type ProductEntity } from '@bill/database/esm';

import useData from '@/hooks/data/useData';
import useDetailData from '@/hooks/data/useDetailData';
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
import { convertPriceToServer, convertPriceFromServer } from '@/utils';

import schema from './schemas/create.json';

export type CategoryDrawerProps = {
  onSuccess: () => void;
  onClose: () => void;
  customerId: number;
};

const bridge = getBridge(schema as SomeJSONSchema);

function ProductSelect({ name, id }: { name: string; id?: number }) {
  const {
    rows: products,
    loading: productLoad,
    onSearch: debouncedOnProductSearch,
  } = useData<ProductEntity[]>('products', id ? { id } : {});
  const [field] = useField(`${name}.price`, {});

  return (
    <div className="w-full">
      <AutoField
        name={`${name}.productId`}
        options={products?.map((c) => {
          return {
            label: c.name,
            value: c.id,
            data: c,
          };
        })}
        onChangeData={(e: number, data: any) => {
          field.onChange(data.data.price, field.name);
        }}
        label={undefined}
        loading={productLoad}
        showSearch
        filterOption={false}
        onSearch={(val: string) =>
          debouncedOnProductSearch({
            name: val === '' ? undefined : val,
          })
        }
      ></AutoField>
    </div>
  );
}

export default function CategoryDrawer({
  onSuccess,
  onClose: onCloseProps,
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
      onSuccess?.();
      onCloseProps();
    },
  );
  const { rows, loading } = useData<(ProductPriceEntity & { customerPrices: ProductPriceEntity[] })[]>(
    `customers/${customerId}/products`,
  );
  const { data: info } = useDetailData<CustomerEntity>(
    'customers',
    customerId,
    true,
  );

  return (
    <Drawer
      destroyOnClose
      width={'100%'}
      onClose={onCloseProps}
      open={true}
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
              prices: (rows || []).map((r: ProductPriceEntity & { customerPrices: ProductPriceEntity[] }) => {
                let price = convertPriceFromServer(r.price);
                if (r.customerPrices && r.customerPrices.length > 0) {
                  price = convertPriceFromServer(r.customerPrices[0].price);
                }
                
                return { ...r, productId: r.product?.id, price };
              }),
            }}
            onSubmit={(formData) => {
              const processedPrices = (formData as { prices: ProductEntity[] }).prices.map((price) => ({
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

            <Space size={10} direction="vertical">
              <Card variant="borderless">
                <Descriptions
                  items={[
                    {
                      key: '1',
                      label: '客户名称',
                      children: info?.fullname,
                    },
                    {
                      key: '2',
                      label: '客户邮箱',
                      children: info?.email,
                    },
                    {
                      key: '3',
                      label: '客户手机',
                      children: info?.phone,
                    },
                    {
                      key: '4',
                      label: '客户地址',
                      children: info?.address,
                    },
                    {
                      key: '5',
                      label: '客户折扣',
                      children: info?.discount,
                    },
                    {
                      key: '5',
                      label: '客户简介',
                      children: info?.desc,
                    },
                  ]}
                />
              </Card>
            </Space>

            <Divider orientation="left">商品列表</Divider>
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
                  render: (val, record, index) => {
                    return <ProductSelect name={`${index}`} id={val} />;
                  },
                },
                {
                  title: '价格',
                  dataIndex: 'price',
                  align: 'center',
                  width: 200,
                  render: (val, record, index) => {
                    return <AutoField name={`${index}.price`} />;
                  },
                },
                {
                  title: '折扣',
                  dataIndex: 'discount',
                  align: 'center',
                  width: 200,
                  render: (val, record, index) => {
                    return <AutoField name={`${index}.discount`} />;
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
    </Drawer>
  );
}
