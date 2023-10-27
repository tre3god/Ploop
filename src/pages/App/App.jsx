import debug from "debug";
import AuthPage from "../AuthPage/AuthPage";
import LoginPage from "../AuthPage/LoginPage"
import SignupPage from "../AuthPage/SignupPage"
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import CalenderPage from "../CalenderPage/CalenderPage";
import AnalysisPage from "../AnalysisPage/AnalysisPage";
import GraphPage from "../GraphPage/GraphPage";
import LearnPage from "../LearnPage/LearnPage";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import AddRecordPage from "../AddRecordPage/AddRecordPage"
import RecordHistoryPage from "../RecordHistoryPage/RecordHistoryPage";
import { getUser } from "../../utilities/users-service";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start app");

export default function App() {
	const [user, setUser] = useState(() => {
		const storedUser = window.sessionStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : getUser();
	});

	const updateUser = (user) => {
		setUser(user);
	};

	useEffect(() => {
		window.sessionStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	return (
		<main className="App">

			{user ? (
				<>
					<NavBar user={user} setUser={updateUser} />
					<Routes>
						<Route path="/user" element={<UserProfilePage user={user} setUser={updateUser}/>} />
						<Route path="/user/addrecord" element={<AddRecordPage user={user} setUser={updateUser}/>} />
						<Route path="/user/recordhistory" element={<RecordHistoryPage user={user} setUser={updateUser}/>} />
						<Route path="/calender" element={<CalenderPage />} />
						<Route path="/analysis" element={<AnalysisPage user={user}/>} />
						<Route path="/graph" element={<GraphPage />} />
						<Route path="/learn" element={<LearnPage />} />
					</Routes>
				</>
			) : (
				<>
				<AuthPage setUser={updateUser} />
				<Routes>
					<Route path="/signuppage" element={<SignupPage setUser={setUser}/>} />
				</Routes>
				</>
			)}
		</main>
	);
}
