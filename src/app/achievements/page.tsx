import { achievementsData } from "@/data/achievements";

export default function Achievements() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 mt-32 min-h-screen">
      <section className="py-12 space-y-16 pb-24" id="achievements">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black">Achievements</h2>
          <p className="text-base text-text-light-secondary dark:text-text-dark-secondary">
            A showcase of my honors, awards, and certifications.
          </p>
        </div>
        
        {achievementsData.length > 0 ? (
          <div className="space-y-8">
            {achievementsData.map((item) => (
              <div key={item.id} className="glass-card rounded-3xl p-8 md:p-10 flex gap-6 items-start">
                <div className="shrink-0 size-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {item.icon ?? "emoji_events"}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  {item.organization && <p className="text-primary text-base font-bold mt-1">{item.organization}</p>}
                  {item.date && <p className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mt-1">{item.date}</p>}
                  {item.description && <p className="mt-3 text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-24 px-6 glass-card rounded-3xl max-w-4xl mx-auto">
            <p className="text-xl font-medium text-text-light-secondary dark:text-text-dark-secondary">
              Coming soon...
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
