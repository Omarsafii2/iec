/**
 * Portrait block shared by chairman / director word sections.
 */
export function LeaderPortraitCard({
  portrait,
  portraitAlt,
  name,
  role,
  fallbackPortrait = '/logo.png',
}) {
  const resolvedPortrait = portrait ?? fallbackPortrait;

  return (
    <div className="relative lg:col-span-5">
      <div
        className="pointer-events-none absolute  z-0 hidden aspect-[4/5] w-full rounded-2xl border-2 border-[#897D56]/20 lg:block"
        aria-hidden
      />
      <div className="relative z-10 overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
          <img
            src={resolvedPortrait}
            alt={portraitAlt}
            className="size-full object-cover object-top"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.dataset.fallbackApplied === 'true') return;
              img.dataset.fallbackApplied = 'true';
              img.src = fallbackPortrait;
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            aria-hidden
          />
          {(name || role) && (
            <div className="absolute bottom-6 end-6 text-white">
              {name ? <p className="text-xl font-bold">{name}</p> : null}
              {role ? <p className="text-sm opacity-90">{role}</p> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderPortraitCard;
