import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [call, setCall] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function GetToken() {
      try {
        const r = await Axios.post("http://localhost:8000/token").then((r) => {
          setCall(r.data);
        });
      } catch (err) {
        console.error(err);
      }
    }
    GetToken();
  }, []);

  async function GetByArtist(e) {
    e.preventDefault();
    try {
      const r = await Axios.get("http://localhost:8000/token/artist", {
        params: {
          accessToken: token,
        },
      }).then((r) => {
        setCall(r.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <p>Your token is {JSON.stringify(call)}</p>
      <form onSubmit={GetByArtist}>
        <input
          onChange={(e) => {
            setToken(e.target.value);
          }}
          placeholder="Enter Token"
          type="text"
        ></input>
        <button type="submit">Get Data</button>
      </form>
    </>
  );
}

export default App;
