import { useState, useEffect, useRef } from 'react';
import styles from './SpecialMenu.module.css';

export default function SpecialMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardRefs = useRef([]);

  // Fallback items (always have images)
  const FALLBACK = [
    {
      id: 1,
      name: 'Chicken Malai Tikka',
      category: 'Starter',
      price: 349,
      description: 'Tender chicken marinated in cream and aromatic spices, slow-charred in a clay oven. Served with mint chutney.',
      tag: "Chef's Pick",
      image: '/assets/menu/menu_item_1.png',
    },
    {
      id: 2,
      name: 'Truffle Mushroom Risotto',
      category: 'Main Course',
      price: 499,
      description: 'Creamy Italian-style arborio rice with wild mushrooms, black truffle shavings, parmesan foam & truffle oil drizzle.',
      tag: 'Bestseller',
      image: '/assets/menu/menu_item_2.png',
    },
    {
      id: 3,
      name: 'Dark Chocolate Fondant',
      category: 'Dessert',
      price: 279,
      description: 'Warm Belgian chocolate lava cake with a molten heart, served with vanilla bean ice cream and raspberry coulis.',
      tag: 'Must Try',
      image: '/assets/menu/menu_item_3.png',
    },
    {
      id: 4,
      name: 'Signature Cold Brew',
      category: 'Beverages',
      price: 199,
      description: '18-hour slow-steeped dark roast, served over a crystal ice sphere with a touch of cream. Our signature pour.',
      tag: 'Signature',
      image: '/assets/menu/menu_item_4.png',
    },
  ];

  useEffect(() => {
    fetch('/api/menu')
      .then((r) => r.json())
      .then((data) => {
        const all = data.menu || [];
        // Only show items that have an image (the "specials")
        const specials = all.filter((item) => item.image && item.image !== null);
        setMenuItems(specials.length > 0 ? specials : FALLBACK);
      })
      .catch(() => setMenuItems(FALLBACK));
  }, []);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    if (headRef.current) observer.observe(headRef.current);
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });

    return () => observer.disconnect();
  }, [menuItems]);

  return (
    <section id="menu" className={styles.section} ref={sectionRef}>
      {/* Decorative background elements */}
      <div className={styles.bgAccent1} />
      <div className={styles.bgAccent2} />
      <div className={styles.bgLine} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Header ── */}
        <div className={`${styles.header} ${styles.revealEl}`} ref={headRef}>
          <div className={styles.labelRow}>
            <span className={styles.labelDash} />
            <p className={styles.label}>Chef's Table</p>
            <span className={styles.labelDash} />
          </div>
          <h2 className={styles.heading}>Our Specials</h2>
          <p className={styles.subtext}>
            Handpicked signatures from our kitchen — each dish crafted with intention.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className={styles.grid}>
          {menuItems.map((item, i) => (
            <article
              key={item.id}
              className={`${styles.card} ${styles.revealEl}`}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className={styles.imageWrap}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className={styles.imageShine} />

                {/* Floating badges */}
                {item.tag && (
                  <span className={styles.tagBadge}>{item.tag}</span>
                )}
                <span className={styles.categoryBadge}>{item.category}</span>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <div className={styles.topRow}>
                  <h3 className={styles.name}>{item.name}</h3>
                  <div className={styles.priceWrap}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.price}>{item.price}</span>
                  </div>
                </div>
                <p className={styles.desc}>{item.description}</p>

                {/* Hover CTA */}
                <div className={styles.cardCta}>
                  <span className={styles.ctaDash} />
                  <span className={styles.ctaText}>Order this dish</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View full menu CTA */}
        <div className={styles.footerCta}>
          <a href="/menu" className={styles.menuLink}>
            <span>Explore Full Menu</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
