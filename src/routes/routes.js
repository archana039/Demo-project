import React from 'react';
import { AppRoutes } from '../Config';
const RegisterPage = React.lazy(() => import('../Container/Auth/signup'));
const Login = React.lazy(() => import('../Container/Auth/login'));
const VerifyUser =React.lazy(()=>import('../Container/Auth/verifyUser'))
const Profile =React.lazy(()=>import('../Container/Auth/profile'))
// const VerifyToekn = React.lazy(() => import('../container/Auth/verify'))

export const routesArray = [
  
  {
    exact: true,
    path: AppRoutes.LOGIN,
    component: Login,
  },
  {
    exact: true,
    path: AppRoutes.SIGNUP,
    component: RegisterPage,
  },
  {
    exact:true,
    path:AppRoutes.VERIFY,
    component:VerifyUser
  },
  {
    exact:true,
    path:AppRoutes.PROFILE,
    component:Profile
  }
];
