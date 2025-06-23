import { useRef, useState, useEffect, Children } from 'react';
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
  Tabs,
  Table,
} from 'antd';
import type { TabsProps, DescriptionsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useField, useForm } from 'uniforms';
import dayjs from 'dayjs';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import {
  CustomerEntity,
  ProductPriceEntity,
  type ProductEntity,
  ChargeEntity,
} from '@bill/database/esm';

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
import { convertPriceToServer } from '@/utils';
import GenericDescriptions from '@/pages/components/genericDescriptions';

import schema from './schemas/create.json';

export type CategoryDrawerProps = {
  onSuccess: () => void;
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
  const { rows, loading } = useData<
    (ProductPriceEntity & { customerPrices: ProductPriceEntity[] })[]
  >(`customers/${customerId}/products`);
  const { data: info } = useDetailData<CustomerEntity>(
    'customers',
    customerId,
    true,
  );
  // 充值记录
  const {
    rows: rowsCharge,
    loading: loadingCharge,
    onSearch: getCharges,
  } = useData<ChargeEntity[]>(`charges`, { customerId });

  const [activeKey, setActiveKey] = useState('1');

  const TabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '商品列表',
      forceRender: true,
      children: (
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

              {/* <Divider orientation="left">商品列表</Divider> */}
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
      ),
    },
    {
      key: '2',
      label: '充值记录',
      forceRender: true,
      children: (
        <Table
          size="small"
          loading={loadingCharge}
          dataSource={rowsCharge}
          pagination={false}
          columns={[
            {
              title: '充值金额',
              dataIndex: 'balance',
              align: 'center',
            },
            {
              title: '赠送金额',
              dataIndex: 'extra',
              align: 'center',
            },
            {
              title: '充值时间',
              dataIndex: 'createTime',
              align: 'center',
              render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
            },
          ]}
        />
      ),
    },
  ];

  useEffect(() => {
    if (activeKey === '2') {
      getCharges();
    }
  }, [activeKey]);

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
      <Space size={10} direction="vertical" className="w-full">
        <GenericDescriptions
          info={info}
          title="基本信息"
          itemsConfig={[
            { label: '客户名称', key: 'fullname' },
            { label: '账户余额', key: 'balance' },
            { label: '客户邮箱', key: 'email' },
            { label: '客户手机', key: 'phone' },
            { label: '客户地址', key: 'address' },
            { label: '客户折扣', key: 'discount' },
            { label: '客户简介', key: 'desc' },
          ]}
        />
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => setActiveKey(key)}
          items={TabItems}
          tabBarExtraContent={{
            right: activeKey === '2' && (
              <Button
                icon={<ReloadOutlined />}
                loading={loadingCharge}
                variant="outlined"
                onClick={() => getCharges()}
              >
                {t('common.redo')}
              </Button>
            ),
          }}
        />
      </Space>
    </Drawer>
  );
}
