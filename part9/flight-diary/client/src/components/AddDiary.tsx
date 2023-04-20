import { useState } from "react";
import { NewDiaryEntry, Weather, Visibility } from "../types";

interface Props {
  onSubmit: (values: NewDiaryEntry) => void;
  error?: string;
}

const AddDiary = ({ onSubmit, error }: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState(Visibility.Good);
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [comment, setComment] = useState("");

  const addNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      visibility,
      weather,
      comment,
    });
    setDate("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p>{error}</p>}
      <form onSubmit={addNewDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility: great{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Great)}
          />
          good{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Good)}
          />
          ok{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Ok)}
          />
          poor{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </div>
        <div>
          weather: sunny{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Sunny)}
          />
          rainy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Rainy)}
          />
          cloudy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Cloudy)}
          />
          stormy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Stormy)}
          />
          windy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Windy)}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">create diary</button>
      </form>
    </div>
  );
};

export default AddDiary;
