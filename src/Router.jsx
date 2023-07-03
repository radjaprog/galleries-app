import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import useAuth from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import AppGalleries from "./pages/AppGalleries";
import AppMyGalleries from "./pages/AppMyGalleries";
import CreateGallery from "./pages/CreateGallery";
import SingleGalleryPage from "./pages/SingleGalleryPage";
import EditGallery from "./pages/EditGallery";

const AuthRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  return <Route {...rest}>{token ? children : <Redirect to="/login" />}</Route>;
};

const GuestRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  return (
    <Route {...rest}>
      {user.first_name ? <Redirect to="/register" /> : children}
    </Route>
  );
};

export default function Router() {
  return (
    <Switch>
      <GuestRoute path="/register">
        <RegisterPage />
      </GuestRoute>
      <GuestRoute path="/login">
        <LoginPage />
      </GuestRoute>

      <Route exact path="/">
        <AppGalleries />
      </Route>

      <AuthRoute path="/my-galleries">
        <AppMyGalleries />
      </AuthRoute>
      <AuthRoute path="/create">
        <CreateGallery />
      </AuthRoute>
      <AuthRoute path="/edit-gallery/:id">
        <EditGallery />
      </AuthRoute>
      <AuthRoute path="/galleries/:id">
        <SingleGalleryPage />
      </AuthRoute>
    </Switch>
  );
}
