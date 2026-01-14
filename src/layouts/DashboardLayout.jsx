import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh" }}>
      <aside style={{ borderRight: "1px solid #eee", padding: 16 }}>
        <h3>Panel</h3>
        <nav style={{ display: "grid", gap: 8 }}>
          <NavLink to="/dashboard" end>Inicio</NavLink>
          <NavLink to="/dashboard/settings">Configuración</NavLink>
        </nav>
      </aside>
      <section style={{ padding: 24 }}>
        <Outlet />
      </section>
    </div>
  );
}