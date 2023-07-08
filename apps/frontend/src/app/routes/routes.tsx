import { RouteObject } from 'react-router';
import Layout from '../Layouts/Layout';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import Register from '../Pages/RegisterPage';
import WrongPage from '../Pages/WrongPage';

export const mainRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/home', element: <HomePage /> }],
  },
  { path: '*', element: <WrongPage /> },
];
