import { useState, useEffect, useCallback } from "react";
import styles from "./AdminPage.module.css";

// ── Simple PIN gate ───────────────────────────────────────────────────────────
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN ?? "1234";
const SESSION_KEY = "kfb_admin_auth";

function PinGate({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className={styles.page} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className={styles.orb1} aria-hidden />
      <div className={styles.orb2} aria-hidden />
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative", zIndex: 2,
          background: "var(--surface, #1a1a1a)",
          border: "1px solid var(--border, #333)",
          borderRadius: "1rem",
          padding: "2.5rem 2rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem",
          minWidth: "280px",
          animation: shake ? "shake 0.5s ease" : "none",
        }}
      >
        <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
        <p className="section-label" style={{ margin: 0 }}>Staff Only</p>
        <h2 className="display" style={{ margin: 0, fontSize: "1.6rem" }}>Admin Access</h2>
        <p style={{ color: "var(--muted, #888)", fontSize: "0.85rem", margin: 0, textAlign: "center" }}>
          Enter your PIN to continue
        </p>
        <input
          type="password"
          inputMode="numeric"
          maxLength={8}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••"
          autoFocus
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid var(--border, #333)",
            background: "transparent",
            color: "inherit",
            fontSize: "1.25rem",
            letterSpacing: "0.4em",
            textAlign: "center",
            outline: "none",
          }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", padding: "0.75rem" }}
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_LABELS = { pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled" };
const STATUS_COLORS = { pending: "amber", confirmed: "green", cancelled: "red" };

function StatCard({ label, value, sub, accent }) {
  return (
    <div className={`${styles.statCard} ${styles["accent_" + accent]}`}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      {sub && <span className={styles.statSub}>{sub}</span>}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${styles["badge_" + STATUS_COLORS[status]]}`}>
      <span className={styles.badgeDot} />
      {STATUS_LABELS[status]}
    </span>
  );
}

function ReservationRow({ res, onStatusChange, onDelete, loading, deleteConfirm }) {
  const [expanded, setExpanded] = useState(false);
  const formatted = new Date(res.date + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
  return (
    <>
      <tr className={`${styles.row} ${expanded ? styles.rowExpanded : ""}`} onClick={() => setExpanded((p) => !p)}>
        <td className={styles.td}>
          <div className={styles.nameCell}>
            <div className={styles.avatar}>{res.name.charAt(0).toUpperCase()}</div>
            <div>
              <div className={styles.guestName}>{res.name}</div>
              <div className={styles.guestContact}>{res.email || res.phone || "—"}</div>
            </div>
          </div>
        </td>
        <td className={styles.td}>
          <div className={styles.dateCell}>
            <span className={styles.dateMain}>{formatted}</span>
            <span className={styles.dateTime}>{res.time}</span>
          </div>
        </td>
        <td className={styles.td}>
          <span className={styles.guestsTag}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            {res.guests}
          </span>
        </td>
        <td className={styles.td}><StatusBadge status={res.status} /></td>
        <td className={styles.td} onClick={(e) => e.stopPropagation()}>
          <div className={styles.actions}>
            {res.status !== "confirmed" && (
              <button className={`${styles.actionBtn} ${styles.confirmBtn}`} onClick={() => onStatusChange(res.id, "confirmed")} disabled={loading === res.id} title="Confirm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </button>
            )}
            {res.status !== "cancelled" && (
              <button className={`${styles.actionBtn} ${styles.cancelBtn}`} onClick={() => onStatusChange(res.id, "cancelled")} disabled={loading === res.id} title="Cancel">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
            {res.status !== "pending" && (
              <button className={`${styles.actionBtn} ${styles.pendingBtn}`} onClick={() => onStatusChange(res.id, "pending")} disabled={loading === res.id} title="Reset to pending">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </button>
            )}
            <button
              className={`${styles.actionBtn} ${styles.deleteBtn} ${deleteConfirm === res.id ? styles.deleteBtnActive : ""}`}
              onClick={() => onDelete(res.id)} disabled={loading === res.id} title={deleteConfirm === res.id ? "Confirm delete" : "Delete"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
            </button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className={styles.expandedRow}>
          <td colSpan={5} className={styles.expandedCell}>
            <div className={styles.expandedContent}>
              <div className={styles.expandedGrid}>
                <div className={styles.expandedItem}><span className={styles.expandedLabel}>Phone</span><span className={styles.expandedValue}>{res.phone || "—"}</span></div>
                <div className={styles.expandedItem}><span className={styles.expandedLabel}>Email</span><span className={styles.expandedValue}>{res.email || "—"}</span></div>
                <div className={styles.expandedItem}><span className={styles.expandedLabel}>Booked On</span><span className={styles.expandedValue}>{new Date(res.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span></div>
                <div className={styles.expandedItem}><span className={styles.expandedLabel}>Booking ID</span><span className={styles.expandedValue}>{res.id}</span></div>
              </div>
              {res.notes && (
                <div className={styles.notesBlock}>
                  <span className={styles.expandedLabel}>Special Requests</span>
                  <p className={styles.notesText}>{res.notes}</p>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  if (!authed) return <PinGate onUnlock={() => setAuthed(true)} />;
  return <AdminDashboard />;
}

function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [fetchState, setFetchState] = useState("loading");
  const [actionLoading, setActionLoading] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchReservations = useCallback(async () => {
    try {
      const res = await fetch("/api/reservations");
      const data = await res.json();
      setReservations(data.reservations || []);
      setLastRefresh(new Date());
      setFetchState("ok");
    } catch {
      setFetchState("error");
    }
  }, []);

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 30000);
    return () => clearInterval(interval);
  }, [fetchReservations]);

  const handleStatusChange = async (id, status) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setReservations((prev) => prev.map((r) => (r.id === id ? data.reservation : r)));
        showToast(`Marked as ${status}.`);
      } else {
        showToast(data.error || "Update failed.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }
    setDeleteConfirm(null);
    setActionLoading(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== id));
        showToast("Reservation deleted.");
      } else {
        showToast("Delete failed.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = reservations.filter((r) => {
    const matchStatus = filter === "all" || r.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.phone.toLowerCase().includes(q) || r.date.includes(q);
    return matchStatus && matchSearch;
  });

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
    guests: reservations.filter((r) => r.status !== "cancelled").reduce((sum, r) => sum + r.guests, 0),
  };

  return (
    <div className={styles.page}>
      <div className={styles.orb1} aria-hidden />
      <div className={styles.orb2} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className="section-label">Operations Centre</p>
            <h1 className={`display ${styles.title}`}>Reservations</h1>
            {lastRefresh && <span className={styles.refreshed}>Updated {lastRefresh.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>}
          </div>
          <button className={styles.refreshBtn} onClick={fetchReservations}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>
            Refresh
          </button>
        </header>

        <div className={styles.stats}>
          <StatCard label="Total Bookings" value={stats.total} accent="neutral" />
          <StatCard label="Pending" value={stats.pending} sub="Awaiting confirmation" accent="amber" />
          <StatCard label="Confirmed" value={stats.confirmed} sub="Ready to seat" accent="green" />
          <StatCard label="Cancelled" value={stats.cancelled} accent="red" />
          <StatCard label="Expected Guests" value={stats.guests} sub="Excl. cancellations" accent="neutral" />
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input className={styles.search} type="text" placeholder="Search by name, email, date…" value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch("")}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
          </div>
          <div className={styles.filters}>
            {["all", "pending", "confirmed", "cancelled"].map((f) => (
              <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className={styles.filterCount}>{f === "all" ? reservations.length : reservations.filter((r) => r.status === f).length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tableWrap}>
          {fetchState === "loading" && (
            <div className={styles.stateMsg}><div className={styles.spinner} /><p>Loading reservations…</p></div>
          )}
          {fetchState === "error" && (
            <div className={styles.stateMsg}><p className={styles.errorText}>Could not reach the server.</p><button className={styles.retryBtn} onClick={fetchReservations}>Retry</button></div>
          )}
          {fetchState === "ok" && filtered.length === 0 && (
            <div className={styles.stateMsg}>
              <div className={styles.emptyIcon}>☕</div>
              <p className={styles.emptyText}>No reservations found.</p>
              {(filter !== "all" || search) && <button className={styles.retryBtn} onClick={() => { setFilter("all"); setSearch(""); }}>Clear filters</button>}
            </div>
          )}
          {fetchState === "ok" && filtered.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Guest</th>
                  <th className={styles.th}>Date &amp; Time</th>
                  <th className={styles.th}>Guests</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((r) => (
                  <ReservationRow key={r.id} res={r} onStatusChange={handleStatusChange} onDelete={handleDelete} loading={actionLoading} deleteConfirm={deleteConfirm} />
                ))}
              </tbody>
            </table>
          )}
        </div>

        {deleteConfirm && (
          <div className={styles.deleteHint}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            Click the trash icon again to confirm permanent deletion.
          </div>
        )}

        <footer className={styles.adminFooter}>
          <a href="/" className={styles.backLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Back to site
          </a>
          <span className={styles.footNote}>Koh-Fee Brew · Admin Panel · {new Date().getFullYear()}</span>
        </footer>
      </div>

      {toast && (
        <div className={`${styles.toast} ${styles["toast_" + toast.type]}`}>
          {toast.type === "success"
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
