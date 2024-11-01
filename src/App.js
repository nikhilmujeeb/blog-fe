import { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import Home from './components/home/Home';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView'; // Ensure this import is correct
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/account/Login';

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to='/account' />
  );
};

function App() {
  const [isAuthenticated, setIsUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          <Routes>
            <Route 
              path='/account' 
              element={<Login setIsUserAuthenticated={setIsUserAuthenticated} />} 
            />
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route index element={<Home />} />
              <Route path='create' element={<CreatePost />} />
              <Route path='details/:id' element={<DetailView />} /> {/* Ensure this matches */}
              <Route path='update/:id' element={<Update />} />
              <Route path='about' element={<About />} />
              <Route path='contact' element={<Contact />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
