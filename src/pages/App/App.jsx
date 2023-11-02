import debug from "debug";
import AuthPage from "../AuthPage/AuthPage";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import CalenderPage from "../CalenderPage/CalenderPage";
import AnalysisPage from "../AnalysisPage/AnalysisPage";
import LearnPage from "../LearnPage/LearnPage";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import { getUser } from "../../utilities/users-service";
import HcProfPage from "../HcProfPage/HcProfPage";
import ErrorPage from "../ErrorPage.jsx/ErrorPage";
import SearchUserPage from "../SearchUserPage/SearchUserPage";
import HcCommentPage from "../HcCommentPage/HcCommentPage";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start app");

export default function App() {
  const [queryUser, setQueryUser] = useState();
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
  <>
  <main className="App">
    {user ? (
      <>
        {user.role === 'users' && (
          <>
            <NavBar user={user} setUser={updateUser} />
            <Routes>
              <Route path="/" element={<UserProfilePage user={user} setUser={updateUser} />} />
              <Route path="/user/analysis" element={<AnalysisPage user={user} setUser={updateUser} />} />
              <Route path="/calender" element={<CalenderPage user={user} setUser={updateUser} />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/search/:recordId/comment" element={<HcCommentPage user={user} queryUser={queryUser} setQueryUser={setQueryUser}/>} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </>
        )}

        {user.role === 'hcprof' && (
          <>
            <NavBar user={user} setUser={updateUser} />
            <Routes>
              <Route path="/hcprof" element={<HcProfPage user={user} setUser={updateUser} />} />
              <Route path="/search/:userId" element={<SearchUserPage user={user} queryUser={queryUser} setQueryUser={setQueryUser}/>} />
              <Route path="/search/:recordId/comment" element={<HcCommentPage user={user} queryUser={queryUser} />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </>
        )}
      </>
    ) : (
      <>
		<Routes>
			<Route path="/" element={<AuthPage setUser={updateUser} />} />
			<Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    )}
  </main>
  <br />
			<hr />
      <footer className="text-center text-dark text-opacity-50">
				<small>
					Ploop&trade; (est 2023)
					<br />A project by{" "}
					<a
						className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
						href="https://github.com/tre3god">
						tre3god
					</a>
				</small>
			</footer>
			<br />
  </>
);

}
