
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './Pages/Header';
import {Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import { useState } from 'react';
import TokenContext from './Context/TokenContext';

function App() {
  const[token,setToken] = useState("")
  const[curUser,setCurUser] = useState(null)
  const [isLogged,setLogged] = useState(false);


  return (
    <div className="App">
      
      <TokenContext.Provider value={{token,setToken,curUser,setCurUser}}>
      <Header isLoggedIn={isLogged} setLoggedIn={setLogged}></Header>
              <Routes>
        <Route path="/" element = {<Register></Register>}/>
        <Route path='/login' element={<Login setLogged={setLogged}></Login>}/>
        <Route path="/MainPage" element = {<MainPage setLogged = {setLogged} isLogged = {isLogged}></MainPage>}/>
        <Route path='/register' element={<Register></Register>}/>
      </Routes>
      </TokenContext.Provider>
      
     
    </div>
  );
}

export default App;
