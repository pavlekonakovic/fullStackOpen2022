import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import Diares from "./components/Diares";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3002/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      });
  }, []);

  return (
    <div className="App">
      <h2>Diary entries</h2>
      <Diares diaries={diaries} />
    </div>
  );
}

export default App;
