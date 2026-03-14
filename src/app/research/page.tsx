import { researchData } from "@/data/research";

export default function Research() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 mt-32 min-h-screen">
      <section className="py-12 space-y-16 pb-24" id="research">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black">Research & Publications</h2>
          <p className="text-base text-text-light-secondary dark:text-text-dark-secondary">
            My academic research and published papers.
          </p>
        </div>
        
        <div className="space-y-8">
          {researchData.map((item) => (
            <div key={item.id} className="glass-card rounded-3xl p-8 md:p-12 transition-transform hover:-translate-y-1">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {(item.institution || item.period) && (
                      <p className="text-base text-text-light-secondary dark:text-text-dark-secondary font-medium mt-2">
                        {item.institution} {item.institution && item.period && " | "} {item.period}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed space-y-3 mt-2">
                  {item.description.map((desc, i) => (
                    <p key={i}>
                      {item.description.length > 1 && "• "}
                      {desc}
                    </p>
                  ))}
                </div>
                
                {item.link && (
                  <div className="flex gap-4 mt-4">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-base font-bold text-primary hover:text-primary-hover transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">description</span>
                      {item.linkLabel || "View Paper"}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
