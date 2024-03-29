import { useState } from "react";
import { NewDiaryEntry, Weather, Visibility } from "../types";

interface Props {
  onSubmit: (values: NewDiaryEntry) => Promise<void>;
  error?: string;
}

interface WeatherOption {
  value: Weather;
}

interface VisibilityOption {
  value: Visibility;
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
}));

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
  (v) => ({ value: v })
);

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
      {error && <p style={{ color: "red" }}>{error}</p>}
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
          visibility:
          {visibilityOptions.map((option) => (
            <span key={option.value}>
              {option.value}
              <input
                type="radio"
                value={option.value}
                name="visibility"
                onChange={() => setVisibility(option.value)}
              />
            </span>
          ))}
        </div>
        <div>
          weather:
          {weatherOptions.map((option) => (
            <span key={option.value}>
              {option.value}
              <input
                type="radio"
                value={option.value}
                name="weather"
                onChange={() => setWeather(option.value)}
              />
            </span>
          ))}
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
