import { useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, Shuffle, TrendingUp, Globe, ArrowRight } from "lucide-react";
import { type Term } from "@shared/schema";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

export default function HomePage() {
  const [, setLocation] = useLocation();

  const { data: terms = [] } = useQuery<Term[]>({
    queryKey: ["/api/terms"],
  });

  const sections = Array.from(
    terms.reduce((acc, term) => {
      acc.set(term.section, (acc.get(term.section) || 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const animatedTermCount = useCountUp(terms.length);
  const animatedSectionCount = useCountUp(sections.length);

  const featuredTerm = useMemo(() => {
    if (terms.length === 0) return null;
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % terms.length;
    return terms[index];
  }, [terms]);

  const handleRandomTerm = () => {
    if (terms.length > 0) {
      const randomIndex = Math.floor(Math.random() * terms.length);
      setLocation(`/term/${terms[randomIndex].id}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-400/5 to-teal-400/5 blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "5%",
            left: "5%",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/4 to-cyan-400/4 blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            bottom: "5%",
            right: "5%",
          }}
        />
      </div>

      <main className="relative bg-white">
        {/* Hero Section with Magical Teal Ocean */}
        <section className="relative py-32 md:py-40 overflow-visible">
          {/* Rich teal-cyan digital ocean background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-teal-800/70 to-blue-900/60 dark:from-cyan-900/80 dark:via-teal-800/90 dark:to-blue-900/80" />
          
          {/* Animated grid with more visibility */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.15]">
            <defs>
              <pattern id="minimalist-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-300"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#minimalist-grid)" />
          </svg>

          {/* Animated teal waves */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/15 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Stronger glowing orb */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 40%, rgba(20, 184, 166, 0.25) 0%, transparent 60%)",
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Magical floating sparkles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-200/50 rounded-full shadow-lg shadow-cyan-400/60"
                animate={{
                  x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  scale: [0, 2, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
            {/* Larger magical teal particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`large-${i}`}
                className="absolute w-3 h-3 bg-teal-300/40 rounded-full blur-[2px]"
                animate={{
                  x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  scale: [0, 1.8, 0],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
          
          <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
            {/* Logo at top of hero */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-12"
            >
              <BookOpen className="h-6 w-6 text-white drop-shadow-[0_2px_8px_rgba(6,182,212,0.8)]" />
              <span className="text-xl font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(6,182,212,0.6)]">
                DH Dictionary
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-cyan-200 via-teal-100 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)] leading-tight pb-2">
                Словарь цифровых
                <br />
                гуманитарных наук
              </h1>
              <p className="text-lg md:text-xl text-cyan-50/90 max-w-2xl mx-auto mb-12 leading-relaxed">
                Двуязычный справочник терминов, методов и технологий для исследователей в области digital humanities
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center gap-4 flex-wrap"
            >
              <Link href="/dictionary">
                <Button
                  size="lg"
                  className="rounded-full px-8"
                  data-testid="button-browse"
                >
                  Просмотреть словарь
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              {terms.length > 0 && (
                <Button
                  onClick={handleRandomTerm}
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 backdrop-blur-xl text-white border-white/40 hover:bg-white/10"
                  data-testid="button-random"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Случайный термин
                </Button>
              )}
            </motion.div>
          </div>
        </section>

        {/* Smooth Gradient Transition Zone - Extended for smoother flow */}
        <div className="relative h-64 bg-gradient-to-b from-cyan-900/60 via-teal-700/35 via-teal-600/20 via-teal-500/10 to-white" />

        {/* Floating Stats Cards */}
        <section className="relative max-w-6xl mx-auto px-6 md:px-12 -mt-40 mb-24 z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, value: animatedTermCount, label: "Терминов", testId: "text-total-terms" },
              { icon: TrendingUp, value: animatedSectionCount, label: "Разделов", testId: "text-total-sections" },
              { icon: Globe, value: 2, label: "Языка", testId: "text-total-languages" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="relative overflow-hidden backdrop-blur-2xl bg-card/50 border-border/40 shadow-xl shadow-black/5 rounded-2xl">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/10 to-teal-500/10 mb-4">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-4xl font-bold mb-1" data-testid={stat.testId}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Term - Floating Card */}
        {featuredTerm && (
          <section className="max-w-4xl mx-auto px-6 md:px-12 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Термин дня
                </h3>
              </div>
              <Link href={`/term/${featuredTerm.id}`}>
                <motion.div whileHover={{ y: -4, scale: 1.01 }}>
                  <Card className="relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-card/80 to-card/50 border-border/40 shadow-2xl shadow-black/5 rounded-2xl cursor-pointer">
                    <CardContent className="p-10">
                      <h4 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                        {featuredTerm.term}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
                        {featuredTerm.definition.length > 200
                          ? featuredTerm.definition.substring(0, 200) + "..."
                          : featuredTerm.definition}
                      </p>
                      {featuredTerm.englishEquivalent && (
                        <p className="text-sm text-primary font-medium">
                          English: {featuredTerm.englishEquivalent}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          </section>
        )}

        {/* Clean Sections Grid */}
        {sections.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 md:px-12 pb-32">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold tracking-tight">Разделы</h2>
              <p className="text-muted-foreground mt-2">Исследуйте термины по категориям</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sections.map((section, i) => (
                <motion.div
                  key={section.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <Link href={`/dictionary?section=${encodeURIComponent(section.name)}`}>
                    <Card
                      className="relative overflow-hidden backdrop-blur-2xl bg-card/50 border-border/40 shadow-lg shadow-black/5 rounded-2xl cursor-pointer group h-full min-h-[140px] flex flex-col transition-all hover:shadow-xl hover:shadow-cyan-500/10"
                      data-testid={`card-section-${section.name}`}
                    >
                      <CardContent className="p-8 flex-1 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {section.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {section.count} {section.count === 1 ? "термин" : section.count < 5 ? "термина" : "терминов"}
                        </p>
                      </CardContent>
                      
                      {/* Subtle hover accent */}
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
