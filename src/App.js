import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("Loggedin","1")
    console.log("kb")
    setIsLoggedIn(true);
  };
  useEffect(()=>{
    const  loggedindata=localStorage.getItem("Loggedin")
    console.log(loggedindata)
  if (loggedindata==1){
      setIsLoggedIn(true)
  }
  },[])
 
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("Loggedin")
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
