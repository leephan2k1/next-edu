import VerifyWithdrawal from './VerifyWithdrawal';
import { useState } from 'react';

export default function MoneyHandling() {
  const [shouldRefetch, setShouldRefetch] = useState<string[]>([]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden pt-[7rem] pb-[10rem] md:pt-[5rem]">
      <div className="mx-auto flex w-[90%] flex-col">
        <VerifyWithdrawal
          title="Giao dịch chờ phê duyệt"
          status="PENDING"
          setShouldRefetch={setShouldRefetch}
          shouldRefetch={shouldRefetch}
          isStaticTable={false}
        />
        <VerifyWithdrawal
          title="Giao dịch đã thực hiện"
          status="SUCCESS"
          setShouldRefetch={setShouldRefetch}
          shouldRefetch={shouldRefetch}
          isStaticTable
        />
        <VerifyWithdrawal
          title="Giao dịch đã từ chôi"
          status="CANCEL"
          setShouldRefetch={setShouldRefetch}
          shouldRefetch={shouldRefetch}
          isStaticTable
        />
      </div>
    </div>
  );
}
