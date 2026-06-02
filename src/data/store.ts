import heroImg from '../assets/images/hero_lake_kivu_1779890198904.png';
import exteriorImg from '../assets/images/lodge_exterior_1779890222114.png';
import suiteImg from '../assets/images/rooms_suite_1779890241779.png';
import restaurantImg from '../assets/images/restaurant_dining_1779890263671.png';
import trailImg from '../assets/images/lodge_trail_view_1779892627012.png';
import detailsImg from '../assets/images/artisan_details_1779892647213.png';

export interface Room {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capacity: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  category: string;
  title: string;
  desc: string;
}

export interface Experience {
  id: string;
  roman: string;
  title: string;
  iconName: string;
  description: string;
  duration: string;
  nature: string;
}

export interface MenuItem {
  id: string;
  section: 'menu' | 'drinks';
  course: string;
  name: string;
  description: string;
}

export interface GuestQuote {
  id: string;
  text: string;
  attribution: string;
}

export interface StoreData {
  rooms: Room[];
  gallery: GalleryItem[];
  experiences: Experience[];
  menuItems: MenuItem[];
  quotes: GuestQuote[];
}

const STORAGE_KEY = 'rfv_data_v1';

export const DEFAULT_DATA: StoreData = {
  rooms: [
    {
      id: 'frontier-suite',
      name: 'Frontier Suite',
      tagline: 'The Ultimate Lakeside Sanctuary',
      description:
        'A single-room retreat with a private terrace extending over the hillside. Floor-to-ceiling glazing frames the lake. A freestanding bath sits beside the window.',
      capacity: '2 Adults',
      features: [
        'Private cantilevered terrace',
        'Freestanding window bath',
        'Volcanic stone fireplace',
        'West-facing sunset views',
      ],
    },
    {
      id: 'lake-view',
      name: 'Lake View Room',
      tagline: 'Handcrafted Organic Solitude',
      description:
        'Spacious, calm, and crafted entirely from locally sourced materials. A private terrace with two chairs and a low table — the only furniture you will need.',
      capacity: '2 Adults',
      features: [
        'Hand-loomed linen linens',
        'Locally carved cedar frames',
        'Outdoor lounging terrace',
        'Direct shoreline vistas',
      ],
    },
    {
      id: 'ridge-room',
      name: 'Ridge Room',
      tagline: 'Elevated Double Perspective',
      description:
        'Positioned slightly higher on the property, the Ridge Rooms offer an elevated perspective across both the lake and the town below. Intimate and deeply private.',
      capacity: '2 Adults',
      features: [
        'Elevated panoramic tier',
        'Private mountain-view garden',
        'Open timber rafters',
        'Writing desk facing Virunga',
      ],
    },
  ],
  gallery: [
    {
      id: 'g1',
      src: heroImg,
      category: 'Landscape',
      title: 'Lake Kivu Horizon',
      desc: 'Warm copper ripples and volcanic mountain ridges visible over the rift valley as the sun dips below the horizon.',
    },
    {
      id: 'g2',
      src: detailsImg,
      category: 'Details',
      title: 'Artisanal Textures',
      desc: 'Hand-loomed native linen fabrics, volcanic basalt bowls, and a fragrant, freshly ground cup of Rwandan coffee.',
    },
    {
      id: 'g3',
      src: exteriorImg,
      category: 'Architecture',
      title: 'The Volcanic Stone Lodge',
      desc: 'Our structural lines mimic the hillside, constructed sequentially using basalt hewn directly by Rubavu stone masons.',
    },
    {
      id: 'g4',
      src: suiteImg,
      category: 'Interiors',
      title: 'Frontier Suite Sanctum',
      desc: 'Calm mornings filtered through floor-to-ceiling glass, opening directly over a wide private cedar terrace.',
    },
    {
      id: 'g5',
      src: trailImg,
      category: 'Experiences',
      title: 'The Congo-Nile Ridge Trail',
      desc: 'Fleshy green tea plantations falling down the Lakeside shores through centuries-old farming villages.',
    },
    {
      id: 'g6',
      src: restaurantImg,
      category: 'Dining',
      title: 'Lounge Sunset Terrace',
      desc: 'Fireside gathering overlooking the water, holding a glass of regional wine as twilight covers Lake Kivu.',
    },
  ],
  experiences: [
    {
      id: 'boat-trip',
      roman: 'I',
      title: 'Lake Kivu by Boat',
      iconName: 'Ship',
      description:
        "A private vessel, a cooler of wine, and two hours on one of Africa's most beautiful bodies of water. Morning departures available. Sunset sailings by arrangement.",
      duration: '2 Hours',
      nature: 'Private Outing',
    },
    {
      id: 'congo-nile',
      roman: 'II',
      title: 'The Congo-Nile Trail',
      iconName: 'Trees',
      description:
        "One of East Africa's finest long-distance trails. Walk sections of the 227-kilometre route through hillside villages, tea estates, and ridge-top forests. We arrange guides, transfers, and packed lunches.",
      duration: 'Half or Full Day',
      nature: 'Active Exploration',
    },
    {
      id: 'town-walk',
      roman: 'III',
      title: 'Rubavu Town Walk',
      iconName: 'Compass',
      description:
        'The town is older than most realize. A working fishing harbour, lakeside markets, and colonial-era architecture make for a walk that is as much history as landscape. We take you through all of it.',
      duration: '3 Hours',
      nature: 'Heritage Walk',
    },
    {
      id: 'community-visit',
      roman: 'IV',
      title: 'Visits to Nearby Communities',
      iconName: 'Users',
      description:
        'The hills behind Rubavu are farmed by generations of families. We arrange visits to local cooperatives — tea, coffee, and cassava — and direct your spending where it matters.',
      duration: '3 - 4 Hours',
      nature: 'Responsible Travel',
    },
    {
      id: 'lodge-evening',
      roman: 'V',
      title: 'In-Lodge Evenings',
      iconName: 'Wine',
      description:
        'Fireside conversation. A tasting of locally brewed drinks from the Kivu region. Nothing scheduled. Nothing performed. Simply good company and a very clear sky.',
      duration: 'Evenings',
      nature: 'Social Gathering',
    },
  ],
  menuItems: [
    {
      id: 'm1',
      section: 'menu',
      course: 'First Course',
      name: 'Lake Tilapia Tartare',
      description:
        'Delicately cured from the morning catch, paired with hillside avocados, crisp wild radishes, and native lemon-grass vinaigrette.',
    },
    {
      id: 'm2',
      section: 'menu',
      course: 'Second Course',
      name: 'Millet-Crusted Volcanic Duck',
      description:
        'Tender local duck breast roasted over volcanic embers, rested on a bed of slow-cooked cassava greens and local honey-infused beets.',
    },
    {
      id: 'm3',
      section: 'menu',
      course: 'Third Course',
      name: 'Rubavu Coffee Parfait',
      description:
        'Smooth mousse highlighting dark single-origin coffee beans grown right across the bay, alongside wild mountain cape gooseberries.',
    },
    {
      id: 'd1',
      section: 'drinks',
      course: '',
      name: 'Kivu Sundowner',
      description: 'locally distilled spirit, fresh citrus, lake-water ice, dried hibiscus',
    },
    {
      id: 'd2',
      section: 'drinks',
      course: '',
      name: 'Hillside Sour',
      description: 'small-batch Rwandan whisky, honey from Rubavu farms, lemon',
    },
    {
      id: 'd3',
      section: 'drinks',
      course: '',
      name: 'The Long Table',
      description: 'a communal wine served only at dinner, selected each week by the kitchen team',
    },
  ],
  quotes: [
    {
      id: 'q1',
      text: 'There is nowhere else in Rwanda with a view like this, and nowhere that makes you feel less like a visitor and more like you belong.',
      attribution: '— A guest, 2025',
    },
  ],
};

export function loadStore(): StoreData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoreData;
  } catch {}
  return DEFAULT_DATA;
}

export function saveStore(data: StoreData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetStore(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
