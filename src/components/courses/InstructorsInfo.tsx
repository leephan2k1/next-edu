import Instructor from './Instructor';

export default function InstructorsInfo() {
  return (
    <section className="mx-auto w-full lg:w-[70%]">
      <h1 className="mb-6 text-2xl font-semibold md:text-3xl">
        Người hướng dẫn
      </h1>

      <Instructor />
    </section>
  );
}
