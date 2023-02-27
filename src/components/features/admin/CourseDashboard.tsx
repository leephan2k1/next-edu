import VerifyCourses from '~/components/features/admin/VerifyCourses';
import { useState } from 'react';

export default function CourseDashboard() {
  const [shouldRefetch, setShouldRefetch] = useState({
    pending: false,
    approved: false,
    reject: false,
  });

  return (
    <>
      <VerifyCourses
        shouldRefetch={shouldRefetch.pending}
        setShouldRefetch={setShouldRefetch}
        queryKeys={{ published: true, verified: 'PENDING' }}
        title="Khoá học chờ phê duyệt"
      />
      <VerifyCourses
        shouldRefetch={shouldRefetch.approved}
        setShouldRefetch={setShouldRefetch}
        queryKeys={{ published: true, verified: 'APPROVED' }}
        title="Khoá học đã phê duyệt"
      />
      <VerifyCourses
        shouldRefetch={shouldRefetch.reject}
        setShouldRefetch={setShouldRefetch}
        queryKeys={{ published: true, verified: 'REJECT' }}
        title="Khoá học đã từ chối"
      />
    </>
  );
}
