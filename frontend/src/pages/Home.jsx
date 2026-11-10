import Hero from '../components/Hero';
import About from '../components/About';
import SpecialMenu from '../components/SpecialMenu';
import Instagram from '../components/Instagram';
import Deals from '../components/Deals';
import Location from '../components/Location';

export default function Home({ onReserve }) {
  return (
    <main>
      <Hero onReserve={onReserve} />
      <About />
      <SpecialMenu />
      <Instagram />
      <Deals />
      <Location />
    </main>
  );
}
