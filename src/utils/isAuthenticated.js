export default function IsAuthenticated() {
  if(localStorage.getItem("token")) return true;
  else return false;
}