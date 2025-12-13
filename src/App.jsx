import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout';

function App() {
 

  return (
    <Router>
      <Routes>

      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home />} />
      </Route>


       {/* Layout بدون Navbar و Footer */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

         {/* صفحة الخطأ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
