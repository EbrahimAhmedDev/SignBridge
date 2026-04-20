import { Fragment, useEffect, useState } from "react";
import {
  getAllModules,
  createModule,
  updateModule,
  deleteModule,
  addSignItem,
  deleteSignItem,
} from "../../api/adminService";
import Swal from "sweetalert2";

const EMPTY_FORM = {
  title: "",
  description: "",
  isPublished: false,
};

const ModuleModal = ({ module, onClose, onSaved }) => {
  const isEdit = !!module;
  const [form, setForm] = useState(
    isEdit
      ? {
          title: module.title ?? "",
          description: module.description ?? "",
          isPublished: module.isPublished ?? false,
        }
      : { ...EMPTY_FORM },
  );
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);
    try {
      if (isEdit) {
        await updateModule(module._id, fd);
      } else {
        await createModule(fd);
      }
      onSaved();
    } catch {
      Swal.fire("Error", "Failed to save module", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{isEdit ? "Edit Module" : "Create Module"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-field">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="modal-field">
            <label>Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <div className="modal-toggle">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={form.isPublished}
              onChange={handleChange}
            />
            <label htmlFor="isPublished">Published</label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Backend stores sign items in module.signs[]
// Each sign: { _id, label, imageUrl: { url, publicId } }
const SignItemsRow = ({ module, onRefresh }) => {
  const [label, setLabel] = useState("");
  const [file, setFile] = useState(null);
  const [adding, setAdding] = useState(false);

  const signs = module.signs ?? [];

  const handleAdd = async () => {
    if (!label || !file) return;
    setAdding(true);
    const fd = new FormData();
    fd.append("label", label);
    fd.append("coverImageItem", file); // backend uses multer field name "coverImageItem"
    try {
      await addSignItem(module._id, fd);
      setLabel("");
      setFile(null);
      onRefresh();
    } catch (err) {
      const msg =
        err?.response?.data?.message ?? err?.message ?? "Unknown error";
      Swal.fire("Failed to add sign item", msg, "error");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (signId) => {
    const result = await Swal.fire({
      title: "Delete sign?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteSignItem(module._id, signId);
      onRefresh();
    } catch (err) {
      const msg =
        err?.response?.data?.message ?? err?.message ?? "Unknown error";
      Swal.fire("Failed to delete sign", msg, "error");
    }
  };

  return (
    <tr className="expanded-row">
      <td colSpan={5}>
        <div className="expanded-inner">
          <h4>Sign Items ({signs.length})</h4>
          <div className="sign-items-grid">
            {signs.map((sign) => (
              <div className="sign-item-card" key={sign._id}>
                {sign.imageUrl?.url && (
                  <img src={sign.imageUrl.url} alt={sign.label} />
                )}
                <span>{sign.label}</span>
                <button
                  className="btn-danger"
                  style={{
                    marginLeft: "auto",
                    padding: "3px 8px",
                    fontSize: "0.7rem",
                  }}
                  onClick={() => handleDelete(sign._id)}
                >
                  ✕
                </button>
              </div>
            ))}
            {signs.length === 0 && (
              <span style={{ color: "#64748b", fontSize: "0.82rem" }}>
                No signs yet
              </span>
            )}
          </div>

          <div className="add-item-form">
            <input
              placeholder="Sign label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              style={{ width: 150 }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="btn-sm" onClick={handleAdd} disabled={adding}>
              {adding ? "Adding…" : "+ Add Sign"}
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

const AdminModules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'create' | moduleObj
  const [expanded, setExpanded] = useState(null); // module._id

  const load = () => {
    setLoading(true);
    getAllModules()
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : (res.data?.data ?? []);
        setModules(data);
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ?? err?.message ?? "Unknown error";
        Swal.fire("Failed to load modules", msg, "error");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete module?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteModule(id);
      load();
    } catch {
      Swal.fire("Error", "Failed to delete module", "error");
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Modules</h1>
        <p>Manage learning modules and their sign items</p>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>All Modules</h2>
          <button className="btn-primary" onClick={() => setModal("create")}>
            + New Module
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">Loading modules…</div>
        ) : modules.length === 0 ? (
          <div className="admin-empty">No modules found.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Signs</th>
                <th>Status</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((mod) => (
                // Fragment with key to avoid React warning
                <Fragment key={mod._id}>
                  <tr>
                    <td style={{ fontWeight: 600, color: "#e2e8f0" }}>
                      {mod.title}
                    </td>
                    <td>{mod.signs?.length ?? 0}</td>
                    <td>
                      <span
                        className={`badge ${mod.isPublished ? "badge-green" : "badge-gray"}`}
                      >
                        {mod.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-expand"
                        onClick={() =>
                          setExpanded(expanded === mod._id ? null : mod._id)
                        }
                      >
                        {expanded === mod._id
                          ? "▲ Hide"
                          : `▼ Signs (${mod.signs?.length ?? 0})`}
                      </button>
                    </td>
                    <td style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn-edit"
                        onClick={() => setModal(mod)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(mod._id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                  {expanded === mod._id && (
                    <SignItemsRow module={mod} onRefresh={load} />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <ModuleModal
          module={modal === "create" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            load();
          }}
        />
      )}
    </div>
  );
};

export default AdminModules;
