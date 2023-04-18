export interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({ parts } : { parts: CoursePart[]}) => {
  return(
    <div>
      {parts.map(({ name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content