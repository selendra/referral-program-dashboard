import {
  BrowserRouter as Router,
  Route,
  Switch
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
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/updateprofile' component={UpdateProfile} />
          <Route path='/get-invite' component={GetInvite} />
          <Route path='/importaccount' component={Importaccount} />
          <Route path='/details/:id' component={Details} />
          <Route path='/successfully' component={Successfully} />
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;