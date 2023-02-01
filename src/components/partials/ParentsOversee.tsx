import { LockClosedIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { HiOutlineMail } from 'react-icons/hi';
import DateSelect from '../shared/DateSelect';
import { useState } from 'react';

export default function ParentsOversee() {
  return (
    <div className="mt-4 flex w-full flex-col space-y-6 px-4 py-6 md:mt-0">
      <section className="flex flex-col px-2 md:px-0">
        <h1 className="flex space-x-4 text-3xl">
          <LockClosedIcon className="h-8 w-8" />{' '}
          <span>Thiết lập mật khẩu phụ huynh</span>
        </h1>
        <p className="my-2 text-xl italic">
          Mật khẩu giúp bảo vệ các cài đặt của phụ huynh không bị thay đổi tuỳ
          ý!
        </p>

        <div className="my-4 flex space-x-4">
          <button className="btn-follow-theme btn">Thiết lập mới</button>
          <button className="btn-follow-theme btn">Đổi mật khẩu</button>
        </div>
      </section>

      <section className="flex flex-col px-2 md:px-0">
        <h1 className="flex space-x-4 text-3xl">
          <HiOutlineMail className="h-8 w-8" />{' '}
          <span>Thiết lập email phụ huynh</span>
        </h1>
        <p className="my-2 text-xl italic">
          Email giúp nhận thông báo về tình trạng học tập của tài khoản trên
          Next Edu!
        </p>

        <div className="my-4 flex space-x-4">
          <button className="btn-follow-theme btn">Thiết lập mới</button>
          <button className="btn-follow-theme btn">Đổi email</button>
        </div>
      </section>

      <ReminderSection />
    </div>
  );
}

function ReminderSection() {
  const [reminderType, setReminderType] = useState<'day' | 'month'>('day');

  return (
    <section className="flex flex-col px-2 md:px-0">
      <h1 className="flex space-x-4 text-3xl">
        <SpeakerWaveIcon className="h-8 w-8" /> <span>Nhắc nhở học tập</span>
      </h1>
      <p className="my-2 text-xl italic">
        Hệ thống sẽ gửi thông báo về email phụ huynh về tình trạng hoạt động của
        tài khoản trên Next Edu!
      </p>

      <div className="my-4 flex flex-col space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setReminderType('day')}
            className={`${
              reminderType === 'day' ? 'bg-yellow-400 dark:text-gray-600' : ''
            } btn-follow-theme smooth-effect btn `}
          >
            Các ngày trong tuần
          </button>
          <button
            onClick={() => setReminderType('month')}
            className={`${
              reminderType === 'month' ? 'bg-yellow-400 dark:text-gray-600' : ''
            } btn-follow-theme smooth-effect btn`}
          >
            Các tuần trong tháng
          </button>
        </div>

        <div className="flex space-x-4">
          <DateSelect
            data={
              reminderType === 'day'
                ? [
                    { timeLabel: 'T2', selected: true },
                    { timeLabel: 'T3', selected: true },
                    { timeLabel: 'T4', selected: true },
                    { timeLabel: 'T5', selected: true },
                    { timeLabel: 'T6', selected: true },
                    { timeLabel: 'T7', selected: false },
                    { timeLabel: 'CN', selected: false },
                  ]
                : [
                    { timeLabel: 'chẵn', selected: true },
                    { timeLabel: 'lẻ', selected: true },
                  ]
            }
          />
        </div>
      </div>
    </section>
  );
}
