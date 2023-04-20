import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import Diares from "./components/Diares";
import AddDiary from "./components/AddDiary";

import diaryServices from "./services/diaries";
import toNewDiaryEntry from "./utils";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryServices.getAll();
      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);

  const submitNewDiary = async (values: NewDiaryEntry) => {
    try {
      const newDiary = toNewDiaryEntry(values);
      const diary = await diaryServices.create(newDiary);
      setDiaries(diaries.concat(diary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setErrorMessage(message);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        } else {
          setErrorMessage("Unrecognized axios error");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      } else {
        console.error("Unknown error", e);
        setErrorMessage("Unknown error");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    }
  };

  return (
    <div className="App">
      <AddDiary onSubmit={submitNewDiary} error={errorMessage} />
      <Diares diaries={diaries} />
    </div>
  );
}

export default App;
