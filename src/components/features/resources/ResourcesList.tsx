import { memo, useMemo } from 'react';
import useLecture from '~/contexts/LearningContext';
import ResourceItem from './ResourceItem';

function ResourcesList() {
  const lectureCtx = useLecture();

  const documentResources = useMemo(() => {
    if (lectureCtx?.currentLecture?.resources) {
      return lectureCtx?.currentLecture.resources.filter(
        (rsc) => rsc.type === 'document',
      );
    }

    return [];
  }, [lectureCtx?.currentLecture]);

  return (
    <div className="w-full px-4">
      <h1 className="mb-4 text-center text-2xl capitalize md:text-3xl">
        Tài nguyên học liệu
      </h1>

      <ul className="mx-auto mt-6 flex flex-col space-y-6 lg:w-3/4">
        {documentResources.length > 0 ? (
          documentResources.map((rsc) => {
            return <ResourceItem key={rsc.id} resource={rsc} />;
          })
        ) : (
          <li className="text-center">Bài học không có tài nguyên tải xuống</li>
        )}
      </ul>
    </div>
  );
}

export default memo(ResourcesList);
