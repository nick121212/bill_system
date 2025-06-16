import { useCallback, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import type { ReportEntity } from '@bill/database/esm';

import TablePage from '@/components/table';
import usePagination from '@/hooks/data/usePagination';

import Remove from './remove';

export default function Report() {
  const { t } = useTranslation();

  const [{ data: rows, loading }, refresh] = useAxios(
    {
      url: '/reports',
    },
    {
      manual: true,
    },
  );
  const onSuccess = useCallback(
    (formData?: unknown) => {
      refresh({
        params: formData,
      });
    },
    [refresh],
  );

  const pag = usePagination(onSuccess);

  const columns: ColumnsType<ReportEntity> = [
    {
      title: t('cls.com.idx'),
      dataIndex: 'index',
      align: 'center',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: t('cls.report.name'),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: t('cls.report.type'),
      dataIndex: 'type',
      align: 'center',
    },
    // {
    //   title: t('cls.report.createTime'),
    //   dataIndex: 'createTime',
    //   align: 'center',
    // },
    {
      title: t('cls.report.desc'),
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: t('cls.com.operation'),
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <Remove
            title={'删除记录'}
            record={record}
            onSuccess={pag.refresh}
          />
        </div>
      ),
    },
  ];


  useEffect(() => {}, []);

  return (
    <TablePage
      tableProps={{
        size: 'small',
        rowKey: 'id',
        pagination: {
          pageSize: pag.pageSize,
          current: pag.page,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            pag.setPage(page);
            pag.setPageSize(pageSize);
          },
          total: rows?.count,
        },
        loading,
        dataSource: rows?.rows || [],
        columns,
        scroll: { x: 1200 },
      }}
    ></TablePage>
  );
}
