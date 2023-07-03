import React, { useState } from "react";
import { authService } from "../services/AuthService";
import useAuth from "../hooks/useAuth";
import { ErrorMessage } from "../components/ErrorMessage";

export default function RegisterPage() {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    accepted_terms: false,
  });
  const [areCredentialsInvalid, setAreCredentialsInvalid] = useState(false);
  const [errors, setErrors] = useState({});

  const { user, register } = useAuth();

  const handleOnRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    const response = await register(newUser);

    if (response.status === 401) {
      setAreCredentialsInvalid(true);
    }

    if (response.status === 422) {
      setErrors(response.data.errors);
    }
  };

  const renderErrors = (fieldKey) => {
    if (!errors[fieldKey]) {
      return;
    }

    return errors[fieldKey].map((error) => {
      return <ErrorMessage message={error} />;
    });
  };

  const isRegisterDisabled = !newUser.accepted_terms;

  return (
    <div className="App">
      <h3>Welcome to Galleries register page</h3>
      <form
        onSubmit={handleOnRegister}
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
          placeholder="first name"
          type="text"
          value={newUser.first_name}
          onChange={({ target }) =>
            setNewUser({ ...newUser, first_name: target.value })
          }
        />
        {renderErrors("first_name")}

        <input
          required
          placeholder="last name"
          type="text"
          value={newUser.last_name}
          onChange={({ target }) =>
            setNewUser({ ...newUser, last_name: target.value })
          }
        />
        {renderErrors("last_name")}

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

        <input
          required
          placeholder="confirm password"
          type="password"
          value={newUser.password_confirmation}
          onChange={({ target }) =>
            setNewUser({ ...newUser, password_confirmation: target.value })
          }
        />
        {renderErrors("password_confirmation")}

        <span>
          <label>I accept terms and conditions </label>
          <input
            type="checkbox"
            name="accepted_terms"
            checked={newUser.accepted_terms}
            onChange={({ target }) => {
              setNewUser({ ...newUser, accepted_terms: target.checked });
            }}
          />
        </span>

        <button type="submit" disabled={isRegisterDisabled}>
          Register
        </button>
        {areCredentialsInvalid && (
          <ErrorMessage message="Invalid credentials" />
        )}
      </form>
    </div>
  );
}
