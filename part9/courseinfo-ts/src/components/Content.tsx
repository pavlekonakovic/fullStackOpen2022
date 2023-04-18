import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.name} style={{ marginTop: 16 }}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
