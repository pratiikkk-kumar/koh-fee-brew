import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Location.module.css';

export default function Location() {
  const reveal = useScrollReveal();

  const hours = [
    { day: 'Monday – Thursday', time: '10:00 AM – 10:30 PM' },
    { day: 'Friday – Saturday', time: '10:00 AM – 11:30 PM' },
    { day: 'Sunday', time: '10:00 AM – 10:00 PM' },
  ];

  return (
    <section id="location" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className={`section-label reveal ${styles.label}`} ref={reveal}>Find Us</p>
          <h2 className={`display reveal reveal-delay-1 ${styles.heading}`} ref={reveal}>
            Come Visit Us
          </h2>
        </div>

        <div className={styles.inner}>
          {/* Info panel */}
          <div className={styles.info}>
            <div className={`reveal ${styles.infoBlock}`} ref={reveal}>
              <div className={styles.iconRow}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <span className={styles.infoTitle}>Address</span>
              </div>
              <p className={styles.infoText}>
                Koh-Fee Brew, Multi Cuisine Restaurant<br />
                PLOT NO A/62, Saheed Nagar,<br />
                Bhubaneswar, Odisha 751007
              </p>
            </div>

            <div className={`reveal reveal-delay-1 ${styles.infoBlock}`} ref={reveal}>
              <div className={styles.iconRow}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className={styles.infoTitle}>Opening Hours</span>
              </div>
              <div className={styles.hours}>
                {hours.map((h) => (
                  <div key={h.day} className={styles.hourRow}>
                    <span className={styles.day}>{h.day}</span>
                    <span className={styles.time}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`reveal reveal-delay-2 ${styles.infoBlock}`} ref={reveal}>
              <div className={styles.iconRow}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.87 13 19.79 19.79 0 0 1 1.77 4.37 2 2 0 0 1 3.73 2.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className={styles.infoTitle}>Reservations</span>
              </div>
              <p className={styles.infoText}>
                Call us at <a href="tel:+910000000000" className={styles.link}>+91 00000 00000</a><br />
                or use the Reserve Table button above.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className={`reveal ${styles.mapWrap}`} ref={reveal}>
            <iframe
              title="Koh-Fee Brew Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.054534!2d85.844!3d20.2759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19090e2b578b0d%3A0x23c36aaaa6b1de7!2sKoh-Fee+Brew!5e0!3m2!1sen!2sin!4v1698000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className={styles.mapOverlayBadge}>
              <span>📍 Koh-Fee Brew</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
