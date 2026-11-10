import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Instagram.module.css';

const posts = [
  { id: 1, src: '/assets/interior-4-DcTFBCIT.jpg', alt: 'Lush botanical interior' },
  { id: 2, src: '/assets/interior-5-B8079u3r.jpg', alt: 'Warm Edison lighting' },
  { id: 3, src: '/assets/interior-6-CpmFIVOl.jpg', alt: 'Evening ambiance' },
  { id: 4, src: '/assets/interior-7-D771WoGW.jpg', alt: 'Dining experience' },
  { id: 5, src: '/assets/interior-8-CMxvPJKD.jpg', alt: 'Interior detail' },
  { id: 6, src: '/assets/interior-3-C1biMpM1.jpg', alt: 'Night view' },
];

export default function Instagram() {
  const reveal = useScrollReveal();

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className={`section-label reveal ${styles.label}`} ref={reveal}>Follow Along</p>
          <h2 className={`display reveal reveal-delay-1 ${styles.heading}`} ref={reveal}>
            @koh.feee
          </h2>
          <p className={`reveal reveal-delay-2 ${styles.subtext}`} ref={reveal}>
            Tag us in your moments — we love seeing Koh-Fee Brew through your eyes.
          </p>
        </div>

        {/* Post Grid */}
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <a
              key={post.id}
              href="https://www.instagram.com/koh.feee"
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal reveal-delay-${(i % 4) + 1} ${styles.post}`}
              ref={reveal}
              aria-label={post.alt}
            >
              <img src={post.src} alt={post.alt} className={styles.postImg} />
              <div className={styles.overlay}>
                <span className={styles.instagramIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className={`reveal ${styles.cta}`} ref={reveal}>
          <a
            href="https://www.instagram.com/koh.feee"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-outline-dark ${styles.followBtn}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
