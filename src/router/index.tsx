import * as React from 'react';
import Loadable from 'react-loadable';
// import '@/css/base.scss';
// import Home from '../pages/Home';
// import RunModel from '../pages/RunModel';
import { Route, Router } from 'react-router-dom';
import history from './history';
import PortalHome from '../pages/portal';

// const SignIn = Loadable({
//     loader: () => import('../pages/SignIn'),
//     loading: () =>  <div className='loadingPage'><div className='sk-rotating-plane'></div></div>
// });
// const SignUp = Loadable({
//     loader: () => import('../pages/SignUp'),
//     loading: () => <div className='loadingPage'><div className='sk-rotating-plane'></div></div>
// });

// const width_100 = {
//     width: '100%'
// };

export default (
    <Router history={history}>
        <div style={{width: '100%', height: '100%'}}>
            <Route exact path='/' component={PortalHome} />
            {/* <Route exact path="/" component={Home}/>
            <Route path="/runModel" component={RunModel}/> */}
        </div>
    </Router>
);