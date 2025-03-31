import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

type CourseProps = {
  course: {
    name: string;
    parts: { name: string; exercises: number }[];
  };
};

const Course = ({ course }: CourseProps) => {
  return (
    <>
      <Header text={course.name} />
      <Content contents={course.parts} />
      <Total contents={course.parts} />
    </>
  );
};

export default Course;
