import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from './store/store';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import s from './index.module.scss';
import Main from './components/Main/Main';
import './18n';
import Auth from './components/Auth/Auth';
import { refreshToken } from './store/reducers/authReducer/authReducer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Iservice from './components/Iservice/Iservice';
import SignUp from './components/SignUp/SignUp';

const App: React.FC = () => {
  let location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshToken())
  })
  const [path, setPath] = useState<string>();

  const checkPath = (path: string) => {
    const pathArr = path.split('/');
    setPath(pathArr[1])
  }
  useEffect(() => {
    checkPath(location.pathname)
  }, [location.pathname])

  return (
    <>
      <TransitionGroup>
        <CSSTransition
          key={path}
          classNames={{
            enter: s.enter,
            enterActive: s.enterActive,
            enterDone: s.enterDone,
            exit: s.exit,
            exitActive: s.exitActive,
            exitDone: s.exitDone,
          }}
          timeout={500}
        >
          <Routes location={location}>
            <Route path="/" element={<Main />} />
            <Route path="auth" element={<Auth />} />
            <Route path="i-service/*" element={<Iservice />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider >

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
