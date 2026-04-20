import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/adminService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data?.data ?? res.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <h1>Users</h1>
        <p>All registered users on the platform</p>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>All Users</h2>
          <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
            {users.length} total
          </span>
        </div>

        {loading ? (
          <div className="admin-loading">Loading users…</div>
        ) : users.length === 0 ? (
          <div className="admin-empty">No users found.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Completed Modules</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td style={{ color: "#64748b" }}>{i + 1}</td>
                  <td style={{ fontWeight: 600, color: "#e2e8f0" }}>{user.name}</td>
                  <td style={{ color: "#94a3b8" }}>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin" ? "badge-purple" : "badge-blue"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{user.completedModules?.length ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
