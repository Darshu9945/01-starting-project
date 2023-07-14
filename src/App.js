import React, { useContext, useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Authcontext from './store/auth-context';

function App() {
  const ctx=useContext(Authcontext)
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

      <Authcontext.Provider
      value={{
        isLoggedIn:isLoggedIn,
        onLogout:logoutHandler
     }}>
      <MainHeader  />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </Authcontext.Provider>
    
  );
}

export default App;
