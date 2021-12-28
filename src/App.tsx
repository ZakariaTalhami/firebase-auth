import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignOutForm from "./components/SignOutForm";
import UserList from "./components/UserLIst";
import { getCurrentUser } from "./firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const user = getCurrentUser();

  return (
    <div className="App">
      {!user && <LoginForm onStatusChange={() => setIsLoggedIn(true)} />}
      {user && <h1>Current User ID: {user.uid}</h1>}
      {user && <SignOutForm onStatusChange={() => setIsLoggedIn(false)} />}
      {user && <UserList />}
    </div>
  );
}

export default App;
