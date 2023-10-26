import { Button } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignupPage";

export default function AuthPage({ setUser }) {
	return (
		<>
			<h1 className="text-3xl font-bold underline">User AuthPage</h1>
			{/* <SignUpForm setUser={setUser} /> */}
			<LoginPage setUser={setUser}/>
			
			<SignUpPage setUser={setUser} />
			{/* <LoginForm setUser={setUser} /> */}

			<Button>Log In</Button>
			<Button>Sign Up</Button>
		</>
	);
}
