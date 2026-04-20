import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const navItems = [
  { to: "/admin/overview", label: "Overview", icon: "📊" },
  { to: "/admin/modules", label: "Modules", icon: "📚" },
  { to: "/admin/users", label: "Users", icon: "👥" },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : "AD";

  return (
    <div className="admin-root">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <h2>SignBridge</h2>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `admin-nav-link${isActive ? " active" : ""}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="admin-main">
        <div className="admin-topbar">
          <span className="admin-topbar-title">Admin Dashboard</span>
          <div className="admin-topbar-user">
            <div className="admin-topbar-avatar">{initials}</div>
            <span className="admin-topbar-name">
              {user?.name ?? "Administrator"}
            </span>
          </div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
