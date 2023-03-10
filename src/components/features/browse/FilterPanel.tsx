import React from 'react';
import Filter from './Filter';
import { categories_detail, LEVELS_LABEL, QUERY_FILTERS } from '~/constants';

export default function FilterPanel() {
  return (
    <div className="flex h-fit w-full gap-8 overflow-x-scroll lg:flex-wrap">
      <Filter
        label="Sắp xếp theo"
        queryParams={QUERY_FILTERS.SORT}
        options={[
          'Mới nhất',
          'Đánh giá nhiều',
          'Mua nhiều',
          'Được ghi danh nhiều',
        ].map((e) => ({
          label: e,
          value: e,
        }))}
      />
      <Filter
        label="Danh mục khoá học"
        queryParams={QUERY_FILTERS.CATEGORY}
        options={[{ label: 'Tất cả', value: 'Tất cả' }].concat(
          categories_detail.map((e) => ({
            value: e.title,
            label: e.title,
          })),
        )}
      />
      <Filter
        label="Đối tượng"
        queryParams={QUERY_FILTERS.OBJECT}
        options={LEVELS_LABEL.map((opt) => ({ label: opt, value: opt }))}
      />
      <Filter
        label="Giá"
        queryParams={QUERY_FILTERS.PRICE}
        options={['Tất cả', 'Miễn phí', 'Có phí'].map((e) => ({
          label: e,
          value: e,
        }))}
      />
      <Filter
        label="Trạng thái khoá học"
        queryParams={QUERY_FILTERS.COURSE_STATE}
        options={['Hoàn thiện', 'Tích luỹ'].map((e) => ({
          label: e,
          value: e,
        }))}
      />
    </div>
  );
}
