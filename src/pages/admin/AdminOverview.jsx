import { useEffect, useState } from "react";
import { getStats } from "../../api/adminService";

const statCards = [
  { key: "totalUsers", label: "Total Users", icon: "👥", color: "blue" },
  { key: "totalModules", label: "Total Modules", icon: "📚", color: "purple" },
  { key: "totalSigns", label: "Total Signs", icon: "🤟", color: "green" },
];

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <h1>Overview</h1>
        <p>Platform statistics at a glance</p>
      </div>

      {loading ? (
        <div className="admin-loading">Loading stats…</div>
      ) : (
        <div className="admin-stats-grid">
          {statCards.map(({ key, label, icon, color }) => (
            <div className="admin-stat-card" key={key}>
              <div className={`admin-stat-icon ${color}`}>{icon}</div>
              <div>
                <div className="admin-stat-value">
                  {stats?.[key] ?? "—"}
                </div>
                <div className="admin-stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
