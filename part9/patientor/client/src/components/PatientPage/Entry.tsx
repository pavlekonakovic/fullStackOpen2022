import { Entry } from "../../types";

const EntryItem = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <p>
        {entry.date} {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((diagnosis) => (
          <li key={diagnosis}>{diagnosis}</li>
        ))}
      </ul>
    </div>
  );
};

export default EntryItem;
