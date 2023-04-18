import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
    case "group":
      return <div>project exercises {part.exerciseCount}</div>;
    case "background":
      return (
        <div>
          <i>{part.description}</i>
          <div>{part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <i>{part.description}</i>
          <div>
            Required skills:{" "}
            {part.requirements.map((skill) => skill).join(", ")}
          </div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
