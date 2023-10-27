import { Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
	const handleLogout = () => {
		logOut();
		setUser(null);
	};
	return (
		<>
			<nav>
				<Link to="/calender">Calender</Link>
				&nbsp; | &nbsp;
				<Link to="/user/analysis">Analysis</Link>
				&nbsp; | &nbsp;
				<Link to="/learn">Learn</Link>
				&nbsp; | &nbsp;
				<span>Welcome, {user.name}</span>
				&nbsp; | &nbsp;
				<Link to="" onClick={handleLogout}>
					Log Out
				</Link>
			</nav>
		</>
	);
}
