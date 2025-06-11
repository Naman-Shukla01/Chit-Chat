import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import server from "./environment";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  let [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
        setLoading(false);
        return
      }
        const response = await axios.get(`${server.dev}/api/group`, {
          headers: {
            Authorization: token,
          }
        });
        console.log(response.data);
        setUser({id:response.data.userId, name:response.data.username});
        setGroups(response.data.groups)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }  finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage user={user}/>}></Route>
        <Route
          path="/api/auth"
          element={<AuthPage user={user} setUser={setUser} />}
        ></Route>
        <Route path="/api/home" element={<HomePage user={user} groups={groups} setGroups={setGroups}   />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
