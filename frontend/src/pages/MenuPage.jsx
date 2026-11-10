import { useState, useEffect } from 'react';
import styles from './MenuPage.module.css';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    fetch('/api/menu')
      .then((r) => r.json())
      .then((data) => {
        setMenuItems(data.menu || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['Starter', 'Main Course', 'Dessert', 'Beverages'];

  if (loading) {
    return <div className={styles.loading}>Loading Menu...</div>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <p className="section-label">Culinary Excellence</p>
          <h1 className="display">Our Full Menu</h1>
          <p className={styles.subtext}>Explore our entire selection of handcrafted dishes and beverages.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          {categories.map((category) => {
            const items = menuItems.filter((item) => item.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className={styles.categorySection}>
                <h2 className={`display ${styles.categoryTitle}`}>{category}s</h2>
                <div className={styles.grid}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.itemCard}>
                      <div className={styles.itemInfo}>
                        <div className={styles.topRow}>
                          <h3 className={styles.name}>{item.name}</h3>
                          <span className={styles.price}>₹{item.price}</span>
                        </div>
                        <p className={styles.desc}>{item.description}</p>
                        {item.tag && <span className={styles.tag}>{item.tag}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
