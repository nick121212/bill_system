import { Upload as AntdUpload, Typography } from 'antd';
import type { UploadProps } from 'antd';
import type { ItemRender } from 'antd/es/upload/interface';

import { StyledUpload } from './styles';
import UploadIllustration from './upload-illustration';
import UploadListItem from './upload-list-item';

const { Dragger } = AntdUpload;
const { Text, Title } = Typography;

interface Props extends UploadProps {
  thumbnail?: boolean;
}

const itemRender: (thumbnail: boolean) => ItemRender = (thumbnail) => {
  return function temp(...args) {
    const [, file, , actions] = args;
    return (
      <UploadListItem file={file} actions={actions} thumbnail={thumbnail} />
    );
  };
};
export function Upload({ thumbnail = false, ...other }: Props) {
  return (
    <StyledUpload $thumbnail={thumbnail}>
      <Dragger {...other} itemRender={itemRender(thumbnail)}>
        <div className="opacity-100 hover:opacity-80">
          <p className="m-auto max-w-[200px]">
            <UploadIllustration />
          </p>
          <Typography>
            <Title level={5} className="mt-4">
              拖拽文件到这儿
            </Title>
            <Text type="secondary">
              拖拽文件到这儿或者点击
              <Text className="mx-2 !text-primary" underline>
                选择文件
              </Text>
            </Text>
          </Typography>
        </div>
      </Dragger>
    </StyledUpload>
  );
}
