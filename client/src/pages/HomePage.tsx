import { useMemo, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Moon, Sun, Sparkles, Shuffle, TrendingUp, Globe, Zap } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { type Term } from "@shared/schema";
import { useCountUp } from "@/hooks/useCountUp";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Orbs - Clean & Transparent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-400/8 to-teal-400/8 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "10%",
            left: "10%",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-400/6 to-cyan-400/6 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            bottom: "10%",
            right: "10%",
          }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-teal-400/7 to-blue-400/7 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "50%",
            right: "20%",
          }}
        />
      </div>

      {/* Glassmorphic Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <BookOpen className="h-6 w-6 text-primary" />
              <motion.div
                className="absolute inset-0 bg-primary/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DH Dictionary
            </span>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="relative overflow-hidden"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "light" ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </motion.div>
          </Button>
        </div>
      </motion.header>

      <main className="relative">
        {/* Hero Section with Digital Magic Background */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Digital Grid Background - Turquoise to Blue */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-teal-900 to-blue-950">
            {/* Animated Grid Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(103, 232, 249, 0.3)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Glowing gradient overlay */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </div>

          {/* Floating Digital Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * 600 + 600,
                }}
                animate={{
                  y: -100,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Hexagonal Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              >
                <svg width="60" height="60" viewBox="0 0 60 60" className="text-cyan-400/20">
                  <polygon points="30,5 50,15 50,35 30,45 10,35 10,15" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Digital Scanlines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.03) 2px, rgba(6, 182, 212, 0.03) 4px)",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Language Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium border border-white/30"
              >
                <Globe className="w-4 h-4" />
                <span className="text-white">RU · EN</span>
              </motion.div>

              {/* Main Title with Turquoise to Blue Gradient Animation */}
              <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="inline-block text-white/90">
                  Словарь терминов
                </span>
                <br />
                <motion.span
                  className="inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  цифровой гуманитаристики
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-white/95 max-w-2xl mx-auto font-medium"
              >
                Онлайн-словарь с определениями на русском и английском языках
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-4 flex-wrap"
            >
              <Link href="/dictionary">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-100 to-slate-200 text-slate-700 hover:from-cyan-200 hover:to-slate-300 font-semibold rounded-full px-8 shadow-2xl border border-cyan-200/50"
                    data-testid="button-browse"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Просмотреть все термины
                  </Button>
                </motion.div>
              </Link>
              {terms.length > 0 && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleRandomTerm}
                    size="lg"
                    className="bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 backdrop-blur-md rounded-full px-8"
                    data-testid="button-random"
                  >
                    <Shuffle className="h-5 w-5 mr-2" />
                    Случайный термин
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Stats Section with 3D Cards */}
        <section className="relative max-w-7xl mx-auto px-4 md:px-8 -mt-16 mb-12 z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, value: animatedTermCount, label: "Всего терминов", color: "from-teal-500 to-teal-600", testId: "text-total-terms" },
              { icon: TrendingUp, value: animatedSectionCount, label: "Разделов", color: "from-teal-500 to-teal-600", testId: "text-total-sections" },
              { icon: Globe, value: 2, label: "Языка", color: "from-teal-500 to-teal-600", testId: "text-total-languages" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="relative overflow-hidden backdrop-blur-xl bg-card/80 border-border/50 shadow-xl">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                  <CardContent className="pt-8 pb-6 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${stat.color} mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent mb-2" data-testid={stat.testId}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Term with Glow Effect */}
        {featuredTerm && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-primary/5 via-card to-secondary/5 border-primary/30 shadow-2xl">
                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-xl" />
                <div className="absolute inset-[1px] bg-card rounded-[inherit]" />
                
                <CardContent className="relative pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles className="h-5 w-5 text-primary" />
                    </motion.div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest">
                      Термин дня
                    </h3>
                  </div>
                  <Link href={`/term/${featuredTerm.id}`}>
                    <motion.div
                      className="p-6 rounded-xl bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-sm cursor-pointer"
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {featuredTerm.term}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                        {featuredTerm.definition}
                      </p>
                      {featuredTerm.englishEquivalent && (
                        <p className="text-sm text-primary font-medium italic">
                          EN: {featuredTerm.englishEquivalent}
                        </p>
                      )}
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </section>
        )}

        {/* Sections Grid */}
        {sections.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Разделы
              </h2>
              <Zap className="w-6 h-6 text-primary" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section, i) => (
                <motion.div
                  key={section.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={`/dictionary?section=${encodeURIComponent(section.name)}`}>
                    <Card
                      className="relative overflow-hidden backdrop-blur-xl bg-card/80 border-border/50 cursor-pointer group"
                      data-testid={`card-section-${section.name}`}
                    >
                      {/* Gradient accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <CardContent className="pt-6 pb-6">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {section.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {section.count} {section.count === 1 ? "термин" : section.count < 5 ? "термина" : "терминов"}
                        </p>
                      </CardContent>

                      {/* Hover glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      />
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
