import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
	return (
		<>
			<h1 className="text-3xl font-bold underline">User AuthPage</h1>
			<SignUpForm setUser={setUser} />
			<LoginForm setUser={setUser} />
		</>
	);
}
