import React from 'react';
import { DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function Instructions() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden pt-[7rem] pb-[10rem] md:pt-[5rem]">
      <div className="mx-auto flex w-[90%] flex-col md:w-[80%]">
        <h1 className="flex space-x-4 text-3xl">
          <DocumentTextIcon className="h-8 w-8" />{' '}
          <span className="font-bold">
            Hướng dẫn upload và giảng dạy trên Next Edu
          </span>
        </h1>

        <ul className="my-8 list-inside list-decimal space-y-4 md:max-w-[80%] md:space-y-8 md:text-3xl">
          <li>
            <span className="text-rose-500">
              Hãy lưu tiến trình thường xuyên khi soạn bài học để tránh mất dữ
              liệu đã đăng tải (upload) không mong muốn!
            </span>
          </li>
          <li>
            Tên khoá học trên hệ thống là duy nhất (Hãy chọn tên khác nếu
            trùng).
          </li>
          <li>Mỗi bài học phải có ít nhất 1 video để được phê duyệt.</li>
          <li>
            Phải điền đầy đủ thông tin của phần bắt buộc (Tên khoá học, ảnh đại
            diện khoá học, mô tả chi tiết và mô tả ngắn).
          </li>
          <li>
            Phải có ít nhất một bài học trong số tất cả các chương được chọn
            (tick) là xem trước (preview). Các bài giảng này có thể là bài mở
            đầu, giới thiệu cho chương học. Mục đích giúp người học có thể xem
            trước nhanh khi quyết định ghi danh hoặc mua khoá học.
          </li>
          <li>
            Tốc độ xử lý upload và lưu tiến trình phụ thuộc vài dung lượng tài
            nguyên của khoá học (Video, Tài liệu,...).
          </li>
          <li>
            Khi khoá học ở trạng thái &quot;Tích luỹ&quot; có nghĩa trong tương
            lai gần bạn phải bổ sung thêm bài giảng.
          </li>
          <li>
            Khi khoá học ở tuỳ chọn &quot;Học theo trình tự&quot; có nghĩa tất
            cả các bài giảng người học phải học theo thứ tự mà không được tuỳ ý
            xem các bài giảng bất kỳ.
          </li>
          <li>
            Đối với khoá học có phí, sau khi người học thanh toán thành công, số
            dư sẽ được cộng vào &quot;Ví của tôi&quot; có thể rút về số dư theo
            mong muốn thủ công.
          </li>
          <li>Tốc độ phê duyệt tuỳ vào độ dài và nội dung khoá học.</li>
        </ul>

        <h1 className="mt-6 flex space-x-4 text-3xl">
          <ShieldCheckIcon className="h-8 w-8" />{' '}
          <span className="font-bold">Quy định</span>
        </h1>

        <ul className="my-8 list-inside list-decimal space-y-4 md:max-w-[80%] md:space-y-8 md:text-3xl">
          <li>
            Không đăng tải (upload) các khoá học có nội dung vi phạm pháp luật
            và luật an ninh mạng!
          </li>
          <li>Không đăng tải lại (re-up) các khoá học của giáo viên khác.</li>
          <li>
            Không trực tiếp so sánh với các khoá học khác cùng thể loại trên
            Next Edu.
          </li>
          <li>
            Không xoá nội dung sau khi khoá học đã được phê duyệt (Nếu khoá học
            mất nội dung sẽ quay về trạng thái chờ phê duyệt hoặc bị từ chối
            vĩnh viễn).{' '}
          </li>
        </ul>
      </div>
    </div>
  );
}
