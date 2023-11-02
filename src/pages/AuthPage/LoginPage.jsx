import { useState } from "react";
import { login } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";

export default function LoginPage({ setUser }) {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = (evt) => {
		setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
		setError("");
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const user = await login(credentials);
			setUser(user);
			if (user.role === 'users') {
				navigate("/")
			} else {
				navigate("/hcprof")
			}
			
		} catch (error) {
			setError("Log In Failed - Try Again");
		}
	};

	return (
    <Container>
      <div>
        <Typography variant="h4">
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            LOG IN
          </Button>
        </form>
      </div>
      <Typography color="error">
        {error}
      </Typography>
    </Container>
  );
}