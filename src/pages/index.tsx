import { type NextPage } from 'next';
import Container from '~/components/shared/Container';
import Banner from '~/components/partials/Banner';

const Home: NextPage = () => {
  return (
    <>
      <Banner />
      <Container>
        <h1 className="min-h-[2000px]"> </h1>
      </Container>
    </>
  );
};

export default Home;
