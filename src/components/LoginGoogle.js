import { google } from 'googleapis'
import { Button } from 'antd'

export default function LoginGoogle() {
  function createConnection() {
    return new google.auth.OAuth2(
      '920463513406-u4gunghahalt1d2liskum7j8ksqsbpfc.apps.googleusercontent.com'
    );
  }
  function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: defaultScope
    });
  }
  function urlGoogle() {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
  }

  const Login = () => {
    const url = urlGoogle();
    console.log(url)
  }

  return (
    <div>
      <Button onClick={Login}>Login with gmail</Button>
    </div>
  )
}