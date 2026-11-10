import { useEffect } from 'react';
import styles from './GalleryPage.module.css';

const images = [
  { id: 1, src: '/assets/interior-1-Cw0K3cW9.jpg', alt: 'Exterior view at night' },
  { id: 2, src: '/assets/interior-2-CHr77HmG.jpg', alt: 'Exterior view daytime' },
  { id: 3, src: '/assets/interior-3-C1biMpM1.jpg', alt: 'Night ambiance' },
  { id: 4, src: '/assets/interior-4-DcTFBCIT.jpg', alt: 'Hanging botanicals and seating' },
  { id: 5, src: '/assets/interior-5-B8079u3r.jpg', alt: 'Cozy corners with floral decor' },
  { id: 6, src: '/assets/interior-6-CpmFIVOl.jpg', alt: 'Industrial chic lighting' },
  { id: 7, src: '/assets/interior-7-D771WoGW.jpg', alt: 'Dining experience' },
  { id: 8, src: '/assets/interior-8-CMxvPJKD.jpg', alt: 'Detailed interior elements' },
];

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <p className="section-label">Aesthetic & Ambiance</p>
          <h1 className="display">Our Gallery</h1>
          <p className={styles.subtext}>Take a virtual tour of Koh-Fee Brew.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {images.map((img) => (
            <div key={img.id} className={styles.imgCard}>
              <img src={img.src} alt={img.alt} className={styles.image} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
