import { useMemo } from 'react';
import Filter from './Filter';
import { categories_detail, LEVELS_LABEL, QUERY_FILTERS } from '~/constants';
import { useRouter } from 'next/router';
import { PATHS } from '~/constants';
import { useMediaQuery } from 'usehooks-ts';
import { isEmptyObject } from '~/utils/ObjectHandler';

export default function FilterPanel() {
  const router = useRouter();

  const matchesMdScreen = useMediaQuery('(min-width: 768px)');

  const subCategory = useMemo(() => {
    const subCategories = categories_detail.find(
      (c) => c.title === router.query?.category,
    )?.fields;

    if (subCategories) return subCategories;

    return ['Tất cả'];
  }, [router.query?.category]);

  return (
    <div className="flex h-fit w-full gap-8 overflow-x-scroll px-2 md:px-0 lg:flex-wrap">
      {!matchesMdScreen && !isEmptyObject(router.query) && (
        <div className="flex min-w-[7rem] max-w-sm items-end justify-center md:min-w-[10rem]">
          <button
            onClick={() => {
              router.replace(`/${PATHS.BROWSE}`);
            }}
            className={`min-h-[4.3rem] ${
              isEmptyObject(router.query)
                ? 'animate-out zoom-out'
                : 'animate-in  zoom-in'
            } rounded-xl bg-primary py-3 px-4 text-black`}
          >
            Đặt lại
          </button>
        </div>
      )}

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
        label="Danh mục chi tiết"
        queryParams={QUERY_FILTERS.SUB_CATEGORY}
        options={[{ label: 'Tất cả', value: 'Tất cả' }].concat(
          subCategory.map((e) => ({ label: e, value: e })),
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

      {matchesMdScreen && !isEmptyObject(router.query) && (
        <div className="flex min-w-[7rem] max-w-sm items-end justify-center md:min-w-[10rem]">
          <button
            onClick={() => {
              router.replace(`/${PATHS.BROWSE}`);
            }}
            className={`min-h-[4.3rem] ${
              isEmptyObject(router.query)
                ? 'animate-out zoom-out'
                : 'animate-in  zoom-in'
            } rounded-xl bg-primary py-3 px-4 text-black`}
          >
            Đặt lại
          </button>
        </div>
      )}
    </div>
  );
}
