export default function IsAuth() {
  if(localStorage.getItem('token')) return true;
  else return false;
}