import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { App } from './App';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { PrivateRoute } from './features/auth/PrivateRoute';
import { SignIn } from './features/auth/SignIn';
import { SignUp } from './features/auth/SignUp';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  </BrowserRouter>
  </Provider>
);
