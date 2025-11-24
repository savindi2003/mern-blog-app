import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home';
import SingleView from './Components/Pages/SingleView';
import Author from './Components/Pages/Author';
import Account from './Components/Pages/Account';
import CreateBlog from './Components/Pages/CreateBlog';
import UpdateBlog from './Components/Pages/UpdateBlog';
import AuthForms from './Components/Pages/AuthForms';
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <div>

     <GoogleOAuthProvider clientId="1085977086406-okt2q50rd5b5k37081vcev6m6a0j3rm9.apps.googleusercontent.com">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mainhome' element={<Home />} />
        <Route path='/blog/:id' element={<SingleView />} />
        <Route path='/author/:authorId' element={<Author />} />
        <Route path='/account' element={<Account />} />
        <Route path='/new' element={<CreateBlog />} />
        <Route path='/update' element={<UpdateBlog />} />
        <Route path='/auth' element={<AuthForms />} />
      </Routes>

    </GoogleOAuthProvider>
      
    </div>


  );
}

export default App;
