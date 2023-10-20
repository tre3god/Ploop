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
import RecordHistoryPage from "../RecordHistoryPage/RecordHistoryPage";

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
						<Route path="/user" element={<UserProfilePage user={user} setUser={updateUser}/>} />
						<Route path="/user/addrecord" element={<AddRecordPage user={user}/>} />
						<Route path="/user/recordhistory" element={<RecordHistoryPage user={user}/>} />
						<Route path="/calender" element={<CalenderPage />} />
						<Route path="/analysis" element={<AnalysisPage user={user}/>} />
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
