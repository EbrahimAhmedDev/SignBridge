import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createAdminSign,
  deleteAdminSign,
  getAdminSigns,
  updateAdminSign,
} from "../../api/adminService";

const EMPTY_FORM = { label: "", videoUrl: "" };

const AdminSigns = () => {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);

  const loadSigns = () => {
    setLoading(true);
    getAdminSigns()
      .then((res) => setSigns(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        const msg =
          err?.response?.data?.message ?? err?.message ?? "Unknown error";
        Swal.fire("Failed to load signs", msg, "error");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSigns();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!form.label.trim() || !form.videoUrl.trim()) {
      Swal.fire("Missing data", "Please enter both label and video URL.", "warning");
      return;
    }

    try {
      setSubmitting(true);
      await createAdminSign({
        label: form.label.trim(),
        videoUrl: form.videoUrl.trim(),
      });
      setForm(EMPTY_FORM);
      loadSigns();
    } catch (err) {
      const msg =
        err?.response?.data?.message ?? err?.message ?? "Unknown error";
      Swal.fire("Failed to create sign", msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (sign) => {
    setEditingId(sign._id);
    setEditForm({
      label: sign.label ?? "",
      videoUrl: sign.videoUrl ?? "",
    });
  };

  const handleUpdate = async (id) => {
    if (!editForm.label.trim() || !editForm.videoUrl.trim()) {
      Swal.fire("Missing data", "Please enter both label and video URL.", "warning");
      return;
    }

    try {
      await updateAdminSign(id, {
        label: editForm.label.trim(),
        videoUrl: editForm.videoUrl.trim(),
      });
      setEditingId(null);
      setEditForm(EMPTY_FORM);
      loadSigns();
    } catch (err) {
      const msg =
        err?.response?.data?.message ?? err?.message ?? "Unknown error";
      Swal.fire("Failed to update sign", msg, "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete sign?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;

    try {
      await deleteAdminSign(id);
      if (editingId === id) {
        setEditingId(null);
        setEditForm(EMPTY_FORM);
      }
      loadSigns();
    } catch (err) {
      const msg =
        err?.response?.data?.message ?? err?.message ?? "Unknown error";
      Swal.fire("Failed to delete sign", msg, "error");
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Text to Sign</h1>
        <p>Manage words/phrases and their YouTube video links</p>
      </div>

      <div className="admin-table-wrapper" style={{ marginBottom: 18 }}>
        <div className="admin-table-header">
          <h2>Add New Sign Entry</h2>
        </div>
        <form className="admin-signs-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Word or phrase"
            value={form.label}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, label: event.target.value }))
            }
            disabled={submitting}
          />
          <input
            type="text"
            placeholder="YouTube URL"
            value={form.videoUrl}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, videoUrl: event.target.value }))
            }
            disabled={submitting}
          />
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Adding…" : "+ Add"}
          </button>
        </form>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>All Text-to-Sign Entries</h2>
          <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
            {signs.length} total
          </span>
        </div>

        {loading ? (
          <div className="admin-loading">Loading entries…</div>
        ) : signs.length === 0 ? (
          <div className="admin-empty">No entries found.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Video URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {signs.map((sign) => {
                const isEditing = editingId === sign._id;
                return (
                  <tr key={sign._id}>
                    <td style={{ minWidth: 220 }}>
                      {isEditing ? (
                        <input
                          className="admin-inline-input"
                          value={editForm.label}
                          onChange={(event) =>
                            setEditForm((prev) => ({
                              ...prev,
                              label: event.target.value,
                            }))
                          }
                        />
                      ) : (
                        <span style={{ fontWeight: 600, color: "#e2e8f0" }}>
                          {sign.label}
                        </span>
                      )}
                    </td>
                    <td style={{ maxWidth: 560 }}>
                      {isEditing ? (
                        <input
                          className="admin-inline-input"
                          value={editForm.videoUrl}
                          onChange={(event) =>
                            setEditForm((prev) => ({
                              ...prev,
                              videoUrl: event.target.value,
                            }))
                          }
                        />
                      ) : (
                        <span
                          style={{
                            color: "#94a3b8",
                            display: "inline-block",
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={sign.videoUrl}
                        >
                          {sign.videoUrl}
                        </span>
                      )}
                    </td>
                    <td style={{ display: "flex", gap: 8 }}>
                      {isEditing ? (
                        <>
                          <button
                            className="btn-primary"
                            style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                            onClick={() => handleUpdate(sign._id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn-cancel"
                            style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                            onClick={() => {
                              setEditingId(null);
                              setEditForm(EMPTY_FORM);
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn-edit"
                            onClick={() => startEdit(sign)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn-danger"
                            onClick={() => handleDelete(sign._id)}
                          >
                            🗑 Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSigns;

