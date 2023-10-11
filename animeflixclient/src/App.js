import './App.css';
import Navbar from './components/Navbar.js';
import Main from './components/Main';
import {Routes, Route } from 'react-router-dom';
import About from "./components/About";
import Login from './components/Login';
import Signup from './components/Signup';
import Mylist from './components/Mylist';



function App() {
  return (
    <>
    <Navbar title='AnimeFlix'/>
    <Routes>
    <Route path= "/" element = {
        <Main/>
      }/>
      <Route path= "/about" element = {
        <About/>
      }/>
      <Route path= "/list" element = {
        <Mylist/>
      }/>
      <Route path='/login' element={
        <Login/>
      }/>
      <Route path='/signup' element={
        <Signup/>
      }/>
    </Routes>
    </>
  );
}

export default App;
