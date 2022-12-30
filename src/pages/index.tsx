import { type NextPage } from 'next';
import Container from '~/components/shared/Container';
import Banner from '~/components/partials/Banner';
import PopularCourses from '~/components/partials/PopularCourses';
import TeacherBanner from '~/components/partials/TeacherBanner';
import TopCategories from '~/components/partials/TopCategories';
import Achievement from '~/components/partials/Achievement';
import Testimonial from '~/components/partials/Testimonial';

const Home: NextPage = () => {
  return (
    <>
      <Banner />

      <Container>
        <PopularCourses />
      </Container>

      <Achievement />

      <Container>
        <TeacherBanner />
        <TopCategories />

        <Testimonial />
      </Container>
    </>
  );
};

export default Home;
