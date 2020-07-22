import React, { Suspense } from 'react';
// import {Switch} from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routesArray } from './routes';
// import Index from 'views/Index';
// import Layout from '../container/layout/index';
// const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => (
//       <Layout>
//         <Component {...props} />
//       </Layout>
//     )}
//   />
// );

const RoutesFile = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={''}>
        {/* <div className="auth-wrapper">
        <div className="auth-inner"> */}
          <Switch>
            {routesArray.map((value, index) => {
              return (
                <Route
                  exact={value.exact}
                  path={value.path}
                  component={value.component}
                  // layout={Layout}
                  key={index}
                />
              );
            })}
          </Switch>
          {/* </div>
          </div> */}
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default RoutesFile;
