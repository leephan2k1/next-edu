import { Nunito, Preahvihear } from '@next/font/google';

// Fonts
export const nunito = Nunito({ subsets: ['vietnamese'], weight: '400' });
export const preahvihear = Preahvihear({ weight: '400' });

export const categories = [
  'Khoá học',
  'Chứng chỉ',
  'Hỏi đáp',
  'Giáo viên',
  'Tổ chức',
];

export const development_ctg = {
  title: 'Lập trình',
  fields: [
    'Lập trình web',
    'Lập trình di động',
    'Lập trình game',
    'Lập trình nhúng',
    'Ngôn ngữ lập trình',
    'Blockchain',
    'Khoa học dữ liệu',
    'Khoa học máy tính',
    'Mạng máy tính',
    'Kiểm thử phần mềm',
    'Phát triển và thiết kế CSDL',
    'Quản trị hệ thống',
  ],
};

export const business_ctg = {
  title: 'Doanh nghiệp',
  fields: [
    'Khởi nghiệp',
    'Kỹ năng giao tiếp',
    'Quản lý',
    'Bán hàng',
    'Chiến lược kinh doanh',
    'Vận hành doanh nghiệp',
    'Luật doanh nghiệp',
    'Phân tích',
    'Quản lý nhân sự',
    'Thương mại điện tử',
    'Truyền thông',
    'Bất động sản',
  ],
};

export const finance_accounting_ctg = {
  title: 'Tài chính & kế toán',
  fields: [
    'Kiểm toán',
    'Kế toán',
    'Thuế',
    'Tiền điện tử & Blockchain',
    'Công cụ quản lý tiền tệ',
    'Quản lý tài chính',
    'Chứng chỉ tài chính',
  ],
};

export const personal_development = {
  title: 'Phát triển cá nhân',
  fields: [
    'Quản lý thời gian',
    'Quản lý cảm xúc',
    'Quản lý căng thẳng',
    'Kỹ năng lãnh đạo',
    'Kỹ năng tìm việc',
    'Truyền cảm hứng',
    'Rèn luyện sự tự tin',
    'Rèn luyện trí nhớ',
  ],
};

export const design_ctg = {
  title: 'Thiết kế',
  fields: [
    'Thiết kế web',
    'Thiết kế đồ hoạ',
    'Thiết kế trải nghiệm người dùng',
    'Công cụ thiết kế',
    'Thiết kế 3D & Animation',
    'Thiết kế kiến trúc',
    'Thiết kế nội thất',
  ],
};

export const marketing_ctg = {
  title: 'Tiếp thị',
  fields: [
    'Digital marketing',
    'Search engine optimization',
    'Social media marketing',
    'Thương hiệu',
    'Quan hệ công chúng',
    'Marketing cơ bản',
    'Tiếp thị sản phẩm',
    'Tiếp thị liên kết',
    'Content marketing',
  ],
};

export const health_fitness_ctg = {
  title: 'Sức khoẻ và thể chất',
  fields: [
    'Thể thao',
    'Yoga',
    'Khiêu vũ',
    'Dinh dưỡng và chế độ ăn',
    'Sơ cứu',
    'Sức khoẻ tinh thần',
  ],
};

export const artistic_ctg = {
  title: 'Nghệ thuật',
  fields: ['Âm nhạc', 'Nhạc cụ', 'Vẽ', 'Nhiếp ảnh', 'Biên tập video'],
};

export const academics_ctg = {
  title: 'Học thuật',
  fields: [
    'Toán học',
    'Vật lý',
    'Hoá học',
    'Sinh học',
    'Ngoại ngữ',
    'Địa lý',
    'Lịch sử',
    'Văn học',
  ],
};

export const lifestyle_ctg = {
  title: 'Phong cách sống',
  fields: [
    'Làm đẹp',
    'Nấu ăn',
    'Du lịch',
    'Trò chơi điện tử',
    'Đồ thủ công',
    'Huấn luyện thú cưng',
    'Làm vườn',
    'Sửa chữa đồ dùng gia dụng',
  ],
};

export const categories_detail = [
  development_ctg,
  design_ctg,
  academics_ctg,
  marketing_ctg,
  business_ctg,
  finance_accounting_ctg,
  personal_development,
  health_fitness_ctg,
  artistic_ctg,
  lifestyle_ctg,
];