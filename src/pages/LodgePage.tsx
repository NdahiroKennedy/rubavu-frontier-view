import PageHero from '../components/PageHero';
import LodgeOverview from '../components/LodgeOverview';
import TheSetting from '../components/TheSetting';
import Sustainability from '../components/Sustainability';
import ReservationCTA from '../components/ReservationCTA';
import exteriorImg from '../assets/images/lodge_exterior_1779890222114.png';

interface LodgePageProps {
  onReserveClick: () => void;
}

export default function LodgePage({ onReserveClick }: LodgePageProps) {
  return (
    <div>
      <PageHero
        label="The Lodge"
        title="Rwanda's Western Retreat"
        subtitle="Built not to interrupt the landscape, but to inhabit it."
        image={exteriorImg}
      />
      <LodgeOverview />
      <TheSetting />
      <Sustainability />
      <ReservationCTA onReserveClick={onReserveClick} />
    </div>
  );
}
