import React, { useState } from "react";
import { authService } from "../services/AuthService";
import useAuth from "../hooks/useAuth";
import { ErrorMessage } from "../components/ErrorMessage";

export default function LoginPage() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });
  const [areCredentialsInvalid, setAreCredentialsInvalid] = useState(false);
  const [errors, setErrors] = useState({});

  const { user, login } = useAuth();

  const handleOnLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    const response = await login(newUser);

    if (response.status === 401) {
      setAreCredentialsInvalid(true);
    }

    if (response.status === 422) {
      setErrors(response.data.errors);
    }
  };

  const handleRefresh = async () => {
    await authService.refresh();
  };

  const renderErrors = (fieldKey) => {
    if (!errors[fieldKey]) {
      return;
    }

    return errors[fieldKey].map((error) => {
      return <ErrorMessage message={error} />;
    });
  };

  return (
    <div className="App">
      <h3>Welcome to Galleries login page</h3>
      <form
        onSubmit={handleOnLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <input
          required
          placeholder="email"
          type="email"
          name="name"
          value={newUser.email}
          onChange={({ target }) =>
            setNewUser({ ...newUser, email: target.value })
          }
        />
        {renderErrors("email")}

        <input
          required
          placeholder="password"
          type="password"
          value={newUser.password}
          onChange={({ target }) =>
            setNewUser({ ...newUser, password: target.value })
          }
        />
        {renderErrors("password")}

        <button type="submit">Login</button>
        {areCredentialsInvalid && (
          <ErrorMessage message="Invalid credentials" />
        )}
      </form>
      <button onClick={handleRefresh} style={{ marginTop: "12px" }}>
        Refresh
      </button>
    </div>
  );
}
