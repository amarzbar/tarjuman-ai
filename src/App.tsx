import { useState } from 'react';
import './App.css'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import '@mantine/core/styles.css';

  function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //  For testing set logged in to True for UI prototyping
    const handleLogin = () => {
      setIsLoggedIn(true);
    };
    
    return (
      <div>
        {isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
      </div>
    );
  }

  export default App

