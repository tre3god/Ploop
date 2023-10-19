import debug from "debug";
import AuthPage from "../AuthPage/AuthPage";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import CalenderPage from "../CalenderPage/CalenderPage";
import AnalysisPage from "../AnalysisPage/AnalysisPage";
import GraphPage from "../GraphPage/GraphPage";
import LearnPage from "../LearnPage/LearnPage";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import AddRecordPage from "../AddRecordPage/AddRecordPage"

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start app");

export default function App() {
	const [user, setUser] = useState(null);

	const updateUser = (user) => setUser(user);

	return (
		<main className="App">

			{user ? (
				<>
					<NavBar user={user} setUser={updateUser} />
					<Routes>
						<Route path="/addrecord" element={<AddRecordPage user={user}/>} />
						<Route path="/user" element={<UserProfilePage />} />
						<Route path="/calender" element={<CalenderPage />} />
						<Route path="/analysis" element={<AnalysisPage />} />
						<Route path="/graph" element={<GraphPage />} />
						<Route path="/learn" element={<LearnPage />} />
					</Routes>
				</>
			) : (
				<>
				<AuthPage setUser={updateUser} />
				
				</>
			)}
		</main>
	);
}
