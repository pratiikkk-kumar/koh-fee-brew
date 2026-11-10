import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Deals.module.css';

export default function Deals() {
  const reveal = useScrollReveal();

  return (
    <section className={styles.section}>
      {/* Decorative Ambient Glows */}
      <div className={styles.ambientGlow1}></div>
      <div className={styles.ambientGlow2}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <div className={styles.headerLayout}>
          <div className={`reveal ${styles.headerText}`} ref={reveal}>
            <p className="section-label" style={{ color: 'var(--amber)' }}>Insider Perks</p>
            <h2 className="display" style={{ color: 'var(--white)', fontSize: '3.5rem' }}>Exclusive<br/>Experiences</h2>
          </div>
          <div className={`reveal reveal-delay-1 ${styles.headerInfo}`} ref={reveal}>
            <p>From private celebrations to everyday rewards, discover how we make your time at Koh-Fee Brew even more memorable.</p>
          </div>
        </div>

        <div className={styles.gridContainer}>
          
          {/* LEFT COLUMN */}
          <div className={styles.leftCol}>
            
            {/* Follow & Save - Premium Ticket Style */}
            <div className={`reveal ${styles.ticketCard}`} ref={reveal}>
              <div className={styles.ticketContent}>
                <div className={styles.ticketIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </div>
                <h3 className={styles.ticketTitle}>Follow & Save 5%</h3>
                <p className={styles.ticketSub}>Show your follow on Instagram or Facebook at checkout to instantly receive 5% off your entire order.</p>
                <div className={styles.socialLinks}>
                  <a href="https://www.instagram.com/koh.feee" target="_blank" rel="noopener noreferrer" className={styles.socialPill}>
                    <img src="/assets/insta-icon.svg" alt="Instagram" />
                    @koh.feee
                  </a>
                  <a href="#" className={styles.socialPill}>
                    <img src="/assets/fb-icon.svg" alt="Facebook" />
                    Koh-fee Brew
                  </a>
                </div>
              </div>
            </div>

            {/* Exclusive Deals */}
            <div className={`reveal reveal-delay-1 ${styles.dealsWrapper}`} ref={reveal}>
              <h3 className={styles.subHeading}>In-House Offers</h3>
              <p className={styles.dealNote}>Only one offer valid per visit.</p>
              
              <div className={styles.glassCard}>
                <div className={styles.dealRow}>
                  <div className={styles.dealText}>
                    <h4>Students & Corporates</h4>
                    <p>Enjoy 10% off on bills above ₹2,000 for students and corporate guests.</p>
                  </div>
                  <div className={styles.discountBadge}>
                    <span className={styles.discountNum}>10%</span>
                    <span className={styles.discountText}>OFF</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.rightCol}>
            
            {/* Celebration Banner */}
            <div className={`reveal reveal-delay-2 ${styles.celebrationCard}`} ref={reveal}>
              <div className={styles.celebrationBg}></div>
              <div className={styles.celebrationContent}>
                <h3>Celebrating something special?</h3>
                <p>Birthdays, anniversaries, graduations, or just a good excuse for cake.</p>
                <p className={styles.celebrationHighlight}>Text us on WhatsApp and we'll set you up with special offers to make the day truly memorable.</p>
                
                <a href="#" className={styles.whatsappBtn}>
                  <span className={styles.btnIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </span>
                  Message Us
                </a>
              </div>
            </div>

            {/* Functions Section */}
            <div className={`reveal reveal-delay-3 ${styles.functionsWrapper}`} ref={reveal}>
              <div className={styles.functionsHeader}>
                <h3 className={styles.subHeading}>A Favourite for Functions</h3>
                <a href="#" className={styles.textLink}>Reserve for groups &rarr;</a>
              </div>
              
              <div className={styles.functionCardsGrid}>
                <div className={styles.glassCardHover}>
                  <div className={styles.funcIconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  </div>
                  <h4>Loved by Students</h4>
                  <p>A hangout for college groups — great coffee, seating, and space to just be.</p>
                </div>
                
                <div className={styles.glassCardHover}>
                  <div className={styles.funcIconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  </div>
                  <h4>Trusted by Corporates</h4>
                  <p>Teams choose us for offsites and functions — reliable service at scale.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
