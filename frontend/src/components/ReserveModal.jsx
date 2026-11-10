import { useState } from 'react';
import styles from './ReserveModal.module.css';

export default function ReserveModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to connect. Please call us directly.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className={styles.close} onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.header}>
          <p className="section-label">Reserve Your Spot</p>
          <h2 className={`display ${styles.title}`}>Book a Table</h2>
          <p className={styles.subtitle}>We'll confirm your reservation within 2 hours.</p>
        </div>

        {status === 'success' ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={`display ${styles.successTitle}`}>You're all set!</h3>
            <p className={styles.successMsg}>{message}</p>
            <button className={`btn btn-primary ${styles.doneBtn}`} onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={styles.input}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={today}
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Time *</label>
                <select name="time" value={form.time} onChange={handleChange} required className={styles.input}>
                  <option value="">Select time</option>
                  {['10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM',
                    '5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Guests *</label>
                <select name="guests" value={form.guests} onChange={handleChange} className={styles.input}>
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Special Requests</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Dietary requirements, occasion, seating preferences..."
                rows={3}
                className={`${styles.input} ${styles.textarea}`}
              />
            </div>

            {status === 'error' && (
              <p className={styles.errorMsg}>{message}</p>
            )}

            <button
              type="submit"
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Reserving...' : 'Confirm Reservation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
