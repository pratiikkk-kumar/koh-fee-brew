import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReserveModal from './components/ReserveModal';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';

function AppShell() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <>
      {!isAdmin && <Navbar onReserve={() => setReserveOpen(true)} />}
      <Routes>
        <Route path="/" element={<Home onReserve={() => setReserveOpen(true)} />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <ReserveModal
          isOpen={reserveOpen}
          onClose={() => setReserveOpen(false)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
