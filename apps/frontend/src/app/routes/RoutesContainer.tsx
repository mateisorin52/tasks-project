import React, { useEffect, useState } from 'react';
import { RouteObject, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { mainRoutes } from './routes';

const RouterContainer = () => {
  return <RouterProvider router={createBrowserRouter(mainRoutes)} />;
};

export default RouterContainer;
