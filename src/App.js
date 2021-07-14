import { useContext, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Home from './pages'
import GetInvite from './pages/get-invite'
import Importaccount from './pages/importaccount'
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'
import UpdateProfile from './pages/updateprofile'
import Successfully from './pages/successfully'
import Details from './pages/detail/_id'
import { ProtectedRoute } from './helper/routes';
import { AuthProvider } from './context/AuthContext'


export default function App() { 
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute path='/profile' component={Profile} />
          <ProtectedRoute path='/updateprofile' component={UpdateProfile} />
          <ProtectedRoute path='/get-invite' component={GetInvite} />
          <ProtectedRoute path='/importaccount' component={Importaccount} />
          <ProtectedRoute path='/details/:id' component={Details} />
          <ProtectedRoute path='/successfully' component={Successfully} />
        </AuthProvider>
      </Switch>
    </Router>
  );
}