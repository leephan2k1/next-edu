import { Inter, Nunito, Preahvihear } from '@next/font/google';
import { i18n } from 'dateformat';

// Fonts
export const nunito = Nunito({ subsets: ['vietnamese'], weight: '400' });
export const inter = Inter({ subsets: ['vietnamese'], weight: '700' });
export const preahvihear = Preahvihear({ weight: '400' });

export const dInVietnamese = new Map([
  [i18n.dayNames[1], 'Thứ 2'],
  [i18n.dayNames[2], 'Thứ 3'],
  [i18n.dayNames[3], 'Thứ 4'],
  [i18n.dayNames[4], 'Thứ 5'],
  [i18n.dayNames[5], 'Thứ 6'],
  [i18n.dayNames[6], 'Thứ 7'],
  [i18n.dayNames[0], 'Chủ nhật'],
]);

export const mInVietnamese = Array.from(new Array(12).keys()).map(
  (e) => `Tháng ${e + 1}`,
);

export const PATHS = {
  USER: 'user',
  USER_PROFILE: 'profile',
  LEARNING: 'learning',
  COURSE: 'course',
  TEACHING: 'teaching',
  DASHBOARD: 'dashboard',
  LOGIN: 'login',
  CREATE_COURSE: 'create',
  EDIT_COURSE: 'edit',
  ADMIN: 'admin',
  CART: 'cart',
  BROWSE: 'browse',
  PAYMENT_STATUS: 'payment_status',
  MY_LEARNING: 'my-learning',
};

export const QUERY_FILTERS = {
  SORT: 'sortBy',
  CATEGORY: 'category',
  SUB_CATEGORY: 'subCategory',
  OBJECT: 'object',
  PRICE: 'price',
  COURSE_STATE: 'courseState',
};

import { Uploader } from 'uploader';
export const UPLOADER_PB_KEY = process.env.NEXT_PUBLIC_UPLOADER_KEY as string;
// Initialize once (at the start of your app).
export const uploader = Uploader({ apiKey: UPLOADER_PB_KEY });

export const LEVELS_LABEL = ['Sơ cấp', 'Trung cấp', 'Chuyên gia', 'Tất cả'];

export const MAPPING_PUBLISH_MODE_LANGUAGE = {
  'Công khai': 'PUBLIC',
  'Riêng tư': 'PRIVATE',
};

export const MAPPING_COURSE_STATE_LANGUAGE = {
  'Hoàn thiện': 'FINALIZATION',
  'Tích luỹ': 'ACCUMULATION',
};

export const MAPPING_LEVEL_LANGUAGE = {
  [LEVELS_LABEL[0] as string]: 'BEGINNER',
  [LEVELS_LABEL[1] as string]: 'INTERMEDIATE',
  [LEVELS_LABEL[2] as string]: 'EXPERT',
  [LEVELS_LABEL[3] as string]: 'ALL',
};

export const playerOptions = {
  theme: '#ffad00',
  setting: true,

  autoPlayback: true,

  screenshot: true,
  moreVideoAttr: {
    crossOrigin: '*',
  },

  hotkey: true,

  // fullscreenWeb: true,

  fullscreen: true,

  // pip: true,

  playbackRate: true,

  autoSize: true,
  // autoMini: true,
  // poster:
  //   'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
};

export const categories = [
  { title: 'Khoá học', url: `/${PATHS.BROWSE}` },
  { title: 'Chứng chỉ', url: `/` },
  { title: 'Hỏi đáp', url: `/` },
  { title: 'Giáo viên', url: `/` },
  { title: 'Tổ chức', url: `/` },
];

export const swiperBreakPoints = {
  1: {
    slidesPerView: 2,
    spaceBetween: 2,
  },
  320: {
    spaceBetween: 5,
    slidesPerView: 3,
  },
  480: {
    slidesPerView: 4,
  },
  640: {
    slidesPerView: 5,
    spaceBetween: 10,
  },
  1300: {
    spaceBetween: 20,
    slidesPerView: 7,
  },
};

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
