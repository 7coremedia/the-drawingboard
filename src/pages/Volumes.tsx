import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useVolumes } from "@/hooks/useVolumes";
import { Loader2 } from "lucide-react";

export default function Volumes() {
  const { volumes: allVolumes, isLoading } = useVolumes();
  
  // Filter for published items
  const publishedVolumes = allVolumes.filter(v => v.isPublished);
  
  // Separation of content
  const articles = publishedVolumes.filter(v => v.volumeType === 'article');
  const masterclasses = publishedVolumes.filter(v => v.volumeType === 'masterclass');
  
  // Determine feature article
  const latestArticle = articles.find(a => a.isLatest) || articles[0];
  const supportingArticles = articles.filter(a => a.id !== latestArticle?.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D0D0D]">
        <Loader2 className="h-12 w-12 animate-spin text-[#F5F0E8]" />
      </div>
    );
  }

  return (
    <main className="bg-[#0D0D0D] text-[#F5F0E8] font-display">
      <Helmet>
        <title>Volumes – ŌDEY | The Drawing Board</title>
        <meta
          name="description"
          content="Explore ŌDEY Volumes: brand intelligence essays, culture-first frameworks, and masterclass-style volumes for African founders and creators."
        />
        <link rel="canonical" href="/volumes" />
      </Helmet>

      <section className="relative">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full overflow-hidden bg-[#0D0D0D] text-white"
        >
          {latestArticle && (
          <div className="relative h-full min-h-[85vh] md:min-h-[92vh]">
            <img
              src={latestArticle.heroImageUrl || ""}
              alt={latestArticle.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0D0D0D]" aria-hidden="true" />
            <div className="relative z-10 flex h-full flex-col justify-end">
              <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-8 sm:px-10 sm:pt-32 sm:pb-10 lg:px-12 lg:pt-40 lg:pb-12">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/70">
                  <span className="rounded-md border border-white/40 px-3 py-1 backdrop-blur-sm">Latest Volume</span>
                  <span>{latestArticle.category}</span>
                </div>
                <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-[#F5F0E8] font-bold tracking-tight">
                  {latestArticle.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80">
                  {latestArticle.summary}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/65">
                  <span>{latestArticle.writer}</span>
                  <span className="h-1 w-1 rounded-full bg-white/45" aria-hidden="true" />
                  <span>{latestArticle.publishedAt}</span>
                  <span className="h-1 w-1 rounded-full bg-white/45" aria-hidden="true" />
                  <span>{latestArticle.timeToRead}</span>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    className="rounded-lg bg-white text-black hover:bg-white/80"
                  >
                    <Link to={`/volumes/${latestArticle.id}`}>Dive into the story</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          )}
        </motion.article>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.45em] text-white/55">Purpose</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F0E8] font-semibold tracking-tight">
              Insights shaped by African future-makers
            </h2>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              Volumes is our journal for founders, designers, and culture shapers. Expect warm language, deep research, and SEO-ready frameworks you can apply right away.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Editorial Rhythm</p>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">
                  Built with a magazine cadence: sharp openers, tactile storytelling, and actionable frameworks for teams shipping culture-first brands.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">What to expect</p>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">
                  Interviews, brand systems, and AI-assisted workflows shaped into ready-to-download playbooks you can drop straight into decks.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-4xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-[0.4em] text-white/55">Inside this release</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-white" aria-hidden="true" />
                Brand systems designed for global search and local pride.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-white" aria-hidden="true" />
                Color palettes that earn trust scores with accessibility bots.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-white" aria-hidden="true" />
                AI film workflows that keep production human and fast.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-white" aria-hidden="true" />
                Rituals, worksheets, and prompts you can paste into the next team sprint.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-white/55">Recent stories</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F0E8] font-semibold tracking-tight">
              Latest from the studio
            </h2>
          </div>
          <Button
            variant="outline"
            className="rounded-lg border-white/25 bg-transparent px-5 py-2 text-sm text-white hover:bg-white/10 hover:text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            View all
          </Button>
        </div>

        <div className="mt-12 space-y-12">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {[latestArticle, ...supportingArticles].filter(Boolean).map((article, index) => (
                <motion.article
                  key={article.id}
                  id={article.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#111111] transition-all duration-300 hover:-translate-y-1"
                >
                  <a href={`#${article.id}`} className="flex h-full flex-col" aria-label={`Read ${article.title} by ${article.author}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={article.heroImageUrl || ""}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d11] via-transparent to-transparent opacity-80 mix-blend-multiply" aria-hidden="true" />
                    </div>
                    <div className="flex flex-1 flex-col gap-5 p-6">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/65">
                        <span>{article.category}</span>
                        <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                        <span>{article.timeToRead}</span>
                      </div>
                      <h3 className="font-display text-xl text-[#F5F0E8] sm:text-2xl font-bold tracking-tight">
                        {article.title}
                      </h3>
                      <p className="text-sm text-white/75 leading-relaxed line-clamp-3">{article.summary}</p>
                      <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/60">
                        <span className="font-medium text-white">{article.writer}</span>
                        <span className="flex items-center gap-2 transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
                          Read
                          <span className="text-lg leading-none">→</span>
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.article>
              ))}
            </div>

          <div className="space-y-8">
            {masterclasses.map((volume, index) => (
                <Link
                  key={volume.id}
                  to={`/volumes/${volume.id}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-[#111111] transition-all duration-300 hover:bg-[#1a1a1f]"
                >
                  <div className="absolute inset-y-0 left-0 w-1 rounded-l-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[#C94A2C]" aria-hidden="true" />
                  <div className="relative grid gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[auto_1fr_auto] lg:items-end">
                    <div className="flex flex-col justify-between text-xs uppercase tracking-[0.5em] text-white/55 lg:h-full">
                      <span>{volume.volumeNumber || `Volume ${(index + 1)}`}</span>
                      <span className="mt-6 hidden lg:block">Masterclass</span>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl text-[#F5F0E8] sm:text-3xl font-bold tracking-tight">
                        {volume.title}
                      </h3>
                      <p className="text-sm text-white/75 leading-relaxed line-clamp-4">{volume.summary}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[0.75rem] text-white/60">
                        <span className="font-medium text-white">{volume.writer}</span>
                        <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                        <span className="max-w-[22ch]">{volume.goal}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
                      <span className="transition-colors duration-300 group-hover:text-white">Open</span>
                      <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-28">
        <div className="rounded-4xl border border-white/12 bg-white/[0.05] p-8 backdrop-blur-sm lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-xs uppercase tracking-[0.4em] text-white/55">Why ŌDEY Volumes</h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-white" aria-hidden="true" />
                Story-driven SEO frameworks crafted for African founders and culture teams.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-white" aria-hidden="true" />
                Actionable brand rituals, worksheets, and prompts ready to drop into decks.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-white" aria-hidden="true" />
                AI-assisted storytelling workflows that keep production quick and human.
              </li>
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
            <Button
              variant="outline"
              className="rounded-lg border-white/25 bg-transparent px-5 py-2 text-xs uppercase tracking-[0.35em] text-white hover:bg-white/10 hover:text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top
            </Button>
            <Button
              variant="gold"
              className="rounded-lg px-5 py-2 text-xs uppercase tracking-[0.35em]"
            >
              Subscribe for releases
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
