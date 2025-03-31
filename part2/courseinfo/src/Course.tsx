import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

type CourseProps = {
  course: {
    id: number;
    name: string;
    parts: { exercises: number; id: number; name: string }[];
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
