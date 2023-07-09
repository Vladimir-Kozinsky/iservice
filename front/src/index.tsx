import React, { createRef, ReactNode, RefObject, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from './store/store';
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from "react-router-dom";
import SignUp from './components/SignUp/SignUp';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import s from './index.module.scss';
import Main from './components/Main/Main';
import './18n';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import { refreshToken } from './store/reducers/authReducer/authReducer';

interface IRoutes {
  path: string;
  name: string;
  element: ReactNode;
  nodeRef: RefObject<any>
}

const routes: IRoutes[] = [
  { path: '/', name: 'Main', element: <Main />, nodeRef: createRef() },
  { path: '/auth', name: 'Auth', element: <Auth />, nodeRef: createRef() },
  { path: '/signup', name: 'SignUp', element: <SignUp />, nodeRef: createRef() },
  { path: '/dashboard/*', name: 'Dashboard', element: <Dashboard />, nodeRef: createRef() },
  // { path: '/dashboard/aircrafts', name: 'Aircrafts', element: <Aircrafts />, nodeRef: createRef() },
  // { path: '/dashboard/engines', name: 'Engines', element: <Engines />, nodeRef: createRef() },
  // { path: '/dashboard/apus', name: 'Apus', element: <Apus />, nodeRef: createRef() },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Example />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
], { basename: '/i-service' })


function Example() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}
  useEffect(() => {
    dispatch(refreshToken())
  }, [])
  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames={{
          enter: s.enter,
          enterActive: s.enterActive,
          enterDone: s.enterDone,
          exit: s.exit,
          exitActive: s.exitActive,
          exitDone: s.exitDone,
        }}
        unmountOnExit
      >
        {(state) => (
          <div ref={nodeRef} className={s.container}>
            {currentOutlet}
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  )
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
