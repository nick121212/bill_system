import { ReactNode } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

type InfoType = Record<string, any>;

interface ItemConfig {
  label: string;
  key: keyof InfoType;
  span?: number | 'filled';
  formatter?: (value: any, info: InfoType) => ReactNode;
}

interface GenericDescriptionsProps {
  info: InfoType;
  title: string;
  itemsConfig: ItemConfig[];
  size?: DescriptionsProps['size'];
}

const GenericDescriptions = ({
  info = {},
  title,
  itemsConfig,
  size = 'small',
}: GenericDescriptionsProps) => {
  const items: DescriptionsProps['items'] = itemsConfig.map((config) => {
    const { label, key, span = 2, formatter } = config;
    const value = info[key];

    return {
      label,
      span,
      children: formatter ? formatter(value, info) : value || '--',
    };
  });

  return <Descriptions bordered title={title} size={size} items={items} />;
};

export default GenericDescriptions;
