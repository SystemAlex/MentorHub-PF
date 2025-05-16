import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import  { useState } from 'react';

import Home from './views/Home/home';
import Login from './views/Login/Login';
import Usuario from './views/Usuario/Usuario';
import CrearClase from './views/Clases/CrearClase';
import UnirmeClase from './views/Clases/UnirmeClase'; 
import AboutUs from './views/AboutUs/AboutUs';
import NavBar from './components/Navbar/Navbar';
import Landing from './views/Landing/Landing';
import Register from './views/Register/Register';
import Dashboard from './views/Dashboard/Dashboard';

import Terminos from './views/terminos-condiciones/Terminos';
import Layout from './components/layout/Layout';

const AppWrapper = () => {
  //esto es de prueba , cambia role a 'profesor' o 'alumno'
  const [user, setUser] = useState<{ role: 'profesor' | 'alumno' | 'otro'; nombre: string } | null>({
    role: 'alumno',
    nombre: 'Juan Pérez',
  });

  const location = useLocation();
  const noNavFooter = ['/login', '/register', '/'].includes(location.pathname);

  return (
    <>
     
      {!noNavFooter && <NavBar user={user} />}

      {noNavFooter ? (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/usuario" element={<Usuario />} />

            {user?.role === 'profesor' && (
              <Route path="/clases/crear" element={<CrearClase />} />
            )}
            {user?.role === 'alumno' && (
              <Route path="/clases/unirme" element={<UnirmeClase />} />
            )}

            

            <Route path="/panel" element={<Dashboard />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terminos" element={<Terminos />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
