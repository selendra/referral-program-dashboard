import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './pages'
import GetInvite from './pages/get-invite'
import Importaccount from './pages/importaccount'
import Login from './pages/login'
import Profile from './pages/profile'
import Successfully from './pages/successfully'
import Details from './pages/detail/_id'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
        <Route path='/get-invite' component={GetInvite} />
        <Route path='/importaccount' component={Importaccount} />
        <Route path='/details/:id' component={Details} />
        <Route path='/successfully' component={Successfully} />
      </Switch>
    </Router>
  );
}

export default App;