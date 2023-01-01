import type { NextPage } from 'next';
import CourseHeader from '~/components/partials/CourseHeader';
import BuyOnly from '~/components/partials/BuyOnly';

const CoursePage: NextPage = () => {
  return (
    <div className=" min-h-screen">
      <CourseHeader />

      <div className="min-h-[1000px]">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo nulla
        recusandae exercitationem nisi unde et veniam inventore nostrum! Maxime
        id doloribus exercitationem nobis et iusto incidunt vitae aperiam
        laudantium assumenda!
      </div>

      <BuyOnly />
    </div>
  );
};

export default CoursePage;
