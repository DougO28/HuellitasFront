import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Adopciones from "./pages/Adopciones";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import ProtectedRoute from "./routes/ProtectedRoute";
import DogDetail from "./pages/DogDetail";
import AdoptionForm from "./pages/AdoptionForm";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="noticias" element={<News />} />
        {/* CAMBIO: :id → :slug */}
        <Route path="noticias/:slug" element={<NewsDetail />} />
        <Route path="adopciones" element={<Adopciones />} />
        <Route path="adopciones/:id" element={<DogDetail />} />
        <Route path="adopciones/:id/formulario" element={<AdoptionForm />} />
        <Route path="ayudanos" element={<Help />} />
        <Route path="contacto" element={<Contact />} />
      </Route>

      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}