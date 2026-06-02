import heroImg from '../assets/images/hero_lake_kivu_1779890198904.png';

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHero({ label, title, subtitle, image }: PageHeroProps) {
  const bg = image || heroImg;

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden flex items-end">
      <img
        src={bg}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 pb-10 md:pb-14 text-[#F5F1EB]">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D9D3C7]/80 block mb-2">
          {label}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm text-[#D9D3C7]/90 font-sans font-light max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
