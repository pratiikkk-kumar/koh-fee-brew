import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './About.module.css';

export default function About() {
  const reveal = useScrollReveal();

  return (
    <section id="about" className={styles.about}>
      <div className={`container ${styles.inner}`}>
        {/* Text side */}
        <div className={styles.textSide}>
          <p className={`section-label reveal ${styles.label}`} ref={reveal}>Our Story</p>
          <h2 className={`display reveal reveal-delay-1 ${styles.heading}`} ref={reveal}>
            A Place Born<br />from Passion
          </h2>
          <p className={`reveal reveal-delay-2 ${styles.body}`} ref={reveal}>
            Nestled in the heart of the city, Koh-Fee Brew is more than a restaurant — it's an experience. 
            Our industrial-chic space, dressed with hanging botanicals, warm Edison lights, and marble 
            tables, was designed to make every visit feel like an occasion.
          </p>
          <p className={`reveal reveal-delay-3 ${styles.body}`} ref={reveal}>
            We serve a carefully crafted multi-cuisine menu — from aromatic Indian signatures to 
            contemporary European classics — paired with specialty brews and handcrafted desserts. 
            Every dish carries the fingerprint of our kitchen's obsession with quality.
          </p>
          <div className={`reveal reveal-delay-4 ${styles.pillars}`} ref={reveal}>
            <div className={styles.pillar}>
              <span className={styles.pillarIcon}>☕</span>
              <span className={styles.pillarLabel}>Specialty Brews</span>
            </div>
            <div className={styles.pillar}>
              <span className={styles.pillarIcon}>🍽️</span>
              <span className={styles.pillarLabel}>Multi Cuisine</span>
            </div>
            <div className={styles.pillar}>
              <span className={styles.pillarIcon}>🌿</span>
              <span className={styles.pillarLabel}>Ambient Setting</span>
            </div>
          </div>
        </div>

        {/* Image side */}
        <div className={`reveal ${styles.imageSide}`} ref={reveal}>
          <div className={styles.imageFrame}>
            <img
              src="/assets/interior-4-DcTFBCIT.jpg"
              alt="Koh-Fee Brew interior with hanging botanical decor"
              className={styles.mainImage}
            />
          </div>
          <div className={styles.accentCard}>
            <img
              src="/assets/interior-5-B8079u3r.jpg"
              alt="Koh-Fee Brew cozy corner"
              className={styles.accentImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
