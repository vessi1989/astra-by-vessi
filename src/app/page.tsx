"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap, Target, BarChart3, MessageSquare, TrendingUp,
  Users, DollarSign, Activity, Cpu, Globe, Shield,
  ArrowRight, CheckCircle, Mail, Search, Bot,
  LineChart, Rocket, Network, Star,
} from "lucide-react";
import { WovenLightHero }   from "@/components/ui/woven-light-hero";
import { ShinyButton }       from "@/components/ui/shiny-button";
import ShaderBackground      from "@/components/ui/shader-background";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

/* ── Contact ─────────────────────────────────────────────────────────────── */
const CONTACT = "https://www.instagram.com/vessi_minev/";
const openContact = () => window.open(CONTACT, "_blank");

/* ── helpers ────────────────────────────────────────────────────────────── */

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.68, 0.3, 0.9] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, end);
      setCount(cur);
      if (cur >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* Section label above headings */
function Label({ children, align = "center" }: { children: React.ReactNode; align?: "left" | "center" }) {
  return (
    <div className={`flex items-center gap-2 mb-5 ${align === "center" ? "justify-center" : ""}`}>
      <div className="w-1.5 h-1.5 rounded-full bg-sky-400/70 flex-shrink-0" />
      <p className="text-[12px] text-[#b4bcd0] font-medium tracking-wide">
        {children}
      </p>
    </div>
  );
}

/* Thin horizontal rule between sections */
function Divider() {
  return (
    <div className="wrap">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const NAV_LINKS = ["Services", "How It Works", "Results", "Pricing"];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? "backdrop-blur-2xl border-b border-white/[0.08]" : ""
      }`}
      style={{ background: scrolled || menuOpen ? 'rgba(0,2,18,0.85)' : 'transparent' }}
    >
      <div className="wrap h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center shadow-[0_0_16px_rgba(56,189,248,0.5)]">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-[17px] font-black tracking-wider text-white">ASTRA</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[14px] text-[#b4bcd0] hover:text-white transition-colors duration-150 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        <ShinyButton onClick={openContact} className="hidden md:block text-[12px] px-5 py-2.5 cursor-pointer">
          Free Audit
        </ShinyButton>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 rounded-lg border border-white/[0.08] items-center"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-4 h-[1.5px] bg-white/60 transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-4 h-[1.5px] bg-white/60 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-4 h-[1.5px] bg-white/60 transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06]">
          <div className="wrap py-4 flex flex-col">
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="py-3.5 text-[15px] text-[#b4bcd0] hover:text-white transition-colors border-b border-white/[0.04] last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-4">
              <ShinyButton onClick={openContact} className="text-[12px] px-5 py-3 w-full cursor-pointer">Free Audit</ShinyButton>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}

/* ── Services ───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Search,
    title: "AI Lead Generation",
    desc: "Our AI scrapes, enriches, and qualifies thousands of ideal prospects daily — delivering verified decision-makers straight to your pipeline.",
    tags: ["ICP Targeting", "Data Enrichment", "Intent Signals"],
  },
  {
    icon: Mail,
    title: "Intelligent Outreach",
    desc: "Hyper-personalized email and LinkedIn sequences powered by GPT-4 — written for each prospect, sent at the perfect moment.",
    tags: ["Email Automation", "LinkedIn AI", "A/B Testing"],
  },
  {
    icon: Bot,
    title: "Conversational AI Agents",
    desc: "24/7 AI sales assistants that qualify leads, book demos, and handle objections — indistinguishable from your best SDR.",
    tags: ["Chatbots", "Voice AI", "Lead Scoring"],
  },
  {
    icon: LineChart,
    title: "Sales Intelligence",
    desc: "Real-time dashboards tracking every touchpoint, conversion, and revenue opportunity — with AI-driven recommendations.",
    tags: ["CRM Sync", "Analytics", "Forecasting"],
  },
  {
    icon: Network,
    title: "Pipeline Acceleration",
    desc: "Map your entire sales funnel to AI workflows that eliminate bottlenecks, automate follow-ups, and close deals faster.",
    tags: ["Workflow AI", "Auto Follow-up", "Deal Scoring"],
  },
  {
    icon: Rocket,
    title: "Revenue Scaling",
    desc: "From Series A to enterprise — we build scalable AI sales infrastructure that grows with your revenue targets.",
    tags: ["Scale Strategy", "GTM AI", "RevOps"],
  },
];

function ServicesSection() {
  return (
    <section id="services" className="relative section-pad">
      <div className="wrap">
        {/* heading */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <Label>What We Do</Label>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f7f8f8] leading-[1.08]" style={{ letterSpacing: '-0.022em' }}>
            AI That Sells While
            <br />
            <span className="shimmer-text">You Sleep</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed" style={{ maxWidth: '512px', margin: '20px auto 0', color: '#b4bcd0' }}>
            Every service is designed around one goal: filling your calendar with
            qualified, ready-to-close leads — automatically.
          </p>
        </FadeIn>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="card-premium group h-full p-9">
                  {/* icon */}
                  <div className="w-11 h-11 rounded-xl border border-sky-500/20 bg-sky-500/[0.08] flex items-center justify-center mb-6" style={{ boxShadow: '0 0 20px rgba(56,189,248,0.08)' }}>
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-[16px] font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-[14px] text-[#b4bcd0] leading-relaxed mb-6">{s.desc}</p>
                  {/* tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] px-3 py-1 rounded-full border border-white/[0.08] text-[rgba(180,188,208,0.6)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: 500, suffix: "+",  label: "Clients Scaled",      icon: Users },
  { value: 10,  suffix: "x",  label: "Average ROI",         icon: TrendingUp },
  { value: 98,  suffix: "%",  label: "Deliverability Rate",  icon: Activity },
  { value: 2,   prefix: "$",  suffix: "M+", label: "Pipeline Generated", icon: DollarSign },
];

function StatsSection() {
  return (
    <section className="relative" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="wrap">
        <div className="stats-inner rounded-2xl border border-white/[0.08] bg-[rgba(255,255,255,0.025)] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={stat.label} delay={i * 0.08} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-9 h-9 rounded-full border border-sky-500/20 bg-sky-500/5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-sky-400" />
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-1">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix ?? ""}
                    prefix={stat.prefix ?? ""}
                  />
                </div>
                <div className="text-[13px] text-[rgba(180,188,208,0.65)] tracking-wide">{stat.label}</div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ───────────────────────────────────────────────────────── */
const PROCESS_STEPS = [
  {
    id: 1, title: "Discovery & Audit", date: "Week 1",
    content: "We deep-dive into your ICP, existing pipeline, tech stack, and competition to identify the highest-leverage AI opportunities.",
    category: "Strategy", icon: Search, relatedIds: [2, 3], status: "completed" as const, energy: 100,
  },
  {
    id: 2, title: "AI Infrastructure", date: "Week 2",
    content: "We build your custom AI stack: lead databases, enrichment pipelines, outreach sequences, and CRM integrations.",
    category: "Build", icon: Cpu, relatedIds: [1, 3], status: "completed" as const, energy: 90,
  },
  {
    id: 3, title: "Launch & Generate", date: "Week 3",
    content: "Your AI agents go live — generating leads, personalizing outreach, and booking meetings around the clock.",
    category: "Launch", icon: Rocket, relatedIds: [2, 4], status: "in-progress" as const, energy: 75,
  },
  {
    id: 4, title: "Optimize & Scale", date: "Ongoing",
    content: "Continuous A/B testing, conversion analysis, and model refinement to push your results further each week.",
    category: "Growth", icon: TrendingUp, relatedIds: [3, 5], status: "in-progress" as const, energy: 60,
  },
  {
    id: 5, title: "Revenue Reporting", date: "Monthly",
    content: "Full transparency: weekly dashboards, monthly reviews, and ROI breakdowns tied directly to closed revenue.",
    category: "Reporting", icon: BarChart3, relatedIds: [4, 1], status: "pending" as const, energy: 40,
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative section-pad" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56,189,248,0.04) 0%, transparent 100%)' }}>
      <div className="wrap">
        <FadeIn className="text-center mb-10 md:mb-16">
          <Label>The Process</Label>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f7f8f8] leading-[1.08]" style={{ letterSpacing: '-0.022em' }}>
            From Zero to Pipeline
            <br />
            <span className="shimmer-text">in 21 Days</span>
          </h2>
          <p className="mt-5 text-[15px]" style={{ maxWidth: '420px', margin: '20px auto 0', color: '#b4bcd0' }}>
            Click any node to explore each phase of your AI-powered growth journey.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <RadialOrbitalTimeline timelineData={PROCESS_STEPS} />
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Testimonials ───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quoteStrong: "ASTRA generated 3× more qualified leads in the first month than our entire SDR team did in Q1.",
    quoteWeak: "The ROI is unreal — we stopped hiring SDRs after month two.",
    name: "Marcus Chen", role: "VP of Sales", company: "TechForge SaaS", avatar: "MC",
  },
  {
    quoteStrong: "We went from 40 meetings/month to 180 — all booked automatically.",
    quoteWeak: "Our team now only talks to warm, ready-to-buy prospects. It changed how we think about sales.",
    name: "Sarah Okafor", role: "Co-Founder", company: "DataBridge.io", avatar: "SO",
  },
  {
    quoteStrong: "The AI agents they built respond faster than any SDR I've ever hired.",
    quoteWeak: "Closed $400K pipeline in month two. This is the best investment we've made in go-to-market.",
    name: "James Rivera", role: "CRO", company: "ScaleUp Ventures", avatar: "JR",
  },
];

function TestimonialsSection() {
  return (
    <section id="results" className="relative section-pad" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(56,189,248,0.035) 0%, transparent 100%)' }}>
      <div className="wrap">
        <FadeIn className="text-center mb-10 md:mb-14">
          <Label>Client Results</Label>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f7f8f8] leading-[1.08]" style={{ letterSpacing: '-0.022em' }}>
            <span className="shimmer-text">Real Numbers.</span> Real Growth.
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/[0.08] bg-[rgba(255,255,255,0.025)] overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Left — company badge */}
                  <div className="md:w-64 flex-shrink-0 flex flex-col items-center justify-center gap-3 px-6 py-8 md:px-10 md:py-10 border-b md:border-b-0 md:border-r border-white/[0.06]" style={{ background: 'rgba(56,189,248,0.03)' }}>
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-300 text-[18px] font-bold">
                      {t.avatar}
                    </div>
                    <div className="text-center">
                      <div className="text-[14px] font-semibold text-[#f7f8f8]">{t.name}</div>
                      <div className="text-[12px] text-[#b4bcd0] mt-0.5">{t.role}</div>
                      <div className="text-[11px] text-sky-400/70 mt-0.5">{t.company}</div>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-sky-400 text-sky-400" />
                      ))}
                    </div>
                  </div>

                  {/* Right — quote */}
                  <div className="flex-1 px-6 py-8 md:px-10 md:py-10 flex flex-col justify-center">
                    <p className="text-[18px] md:text-[22px] lg:text-[26px] font-semibold text-[#f7f8f8] leading-snug" style={{ letterSpacing: '-0.015em' }}>
                      &ldquo;{t.quoteStrong}{" "}
                      <span style={{ color: '#b4bcd0', fontWeight: 400 }}>{t.quoteWeak}&rdquo;</span>
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Tech Stack ─────────────────────────────────────────────────────────── */
const TECH = [
  { name: "GPT-4o",         category: "Language Model" },
  { name: "Claude 3.5",     category: "Language Model" },
  { name: "Apollo.io",      category: "Lead Database"  },
  { name: "Clay",           category: "Enrichment"     },
  { name: "Instantly",      category: "Email Outreach" },
  { name: "HubSpot",        category: "CRM"            },
  { name: "Salesforce",     category: "CRM"            },
  { name: "Zapier",         category: "Automation"     },
  { name: "Phantom Buster", category: "LinkedIn AI"    },
  { name: "Lemlist",        category: "Outreach"       },
  { name: "OpenAI API",     category: "AI Core"        },
  { name: "Make.com",       category: "Automation"     },
];

function TechSection() {
  return (
    <section className="relative section-pad">
      <div className="wrap">
        <FadeIn className="text-center mb-10 md:mb-14">
          <Label>Powered By</Label>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ letterSpacing: '-0.022em' }}>
            <span className="text-[#f7f8f8]">Best-in-Class </span>
            <span className="shimmer-text">AI Stack</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {TECH.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-white/[0.08] bg-[rgba(255,255,255,0.03)] px-3 py-5 text-center hover:border-sky-500/20 hover:bg-[rgba(255,255,255,0.055)] transition-all duration-200"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)' }}
              >
                <div className="text-[13px] font-semibold text-white/75 mb-1">{tech.name}</div>
                <div className="text-[11px] text-white/30">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Pricing ────────────────────────────────────────────────────────────── */
const PRICING = [
  {
    name: "Starter",
    price: "3,500",
    desc: "For early-stage B2B companies ready to test AI-driven outreach.",
    features: [
      "500 AI-qualified leads/month",
      "Email + LinkedIn sequences",
      "Basic CRM integration",
      "Monthly performance report",
      "Dedicated account manager",
    ],
    highlight: false,
  },
  {
    name: "Scale",
    price: "8,500",
    desc: "For growth-stage companies that need consistent, high-volume pipeline.",
    features: [
      "2,000 AI-qualified leads/month",
      "Multi-channel AI outreach",
      "Conversational AI agent",
      "Real-time analytics dashboard",
      "A/B testing & optimization",
      "Weekly strategy calls",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Full-stack AI sales infrastructure for companies with $10M+ ARR targets.",
    features: [
      "Unlimited lead generation",
      "Custom AI agents & workflows",
      "White-glove onboarding",
      "Full CRM + RevOps buildout",
      "Dedicated AI engineering team",
      "SLA-backed performance",
    ],
    highlight: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="relative section-pad">
      <div className="wrap">
        <FadeIn className="text-center mb-12 md:mb-16">
          <Label>Investment</Label>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f7f8f8] leading-[1.08]" style={{ letterSpacing: '-0.022em' }}>
            Plans That Scale
            <br />
            <span className="shimmer-text">With Your Revenue</span>
          </h2>
        </FadeIn>

        {/* 3-column grid with equal heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PRICING.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.08} className="flex">
              <div
                className={`relative w-full rounded-[20px] p-10 flex flex-col transition-all duration-300 ${
                  plan.highlight
                    ? "border border-sky-500/35 bg-[#060914]"
                    : "border border-white/[0.08] bg-[rgba(255,255,255,0.03)]"
                }`}
                style={plan.highlight ? {
                  boxShadow: '0 0 0 1px rgba(56,189,248,0.12), 0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(56,189,248,0.07), inset 0 1px 0 rgba(56,189,248,0.15)',
                  background: 'linear-gradient(160deg, rgba(56,189,248,0.07) 0%, rgba(6,9,20,1) 40%)',
                } : {
                  boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-sky-500 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-[0_0_16px_rgba(56,189,248,0.5)]">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-[13px] font-semibold text-white/55 uppercase tracking-widest mb-3">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    {plan.price !== "Custom" && (
                      <span className="text-white/30 text-lg">$</span>
                    )}
                    <span className="text-5xl font-black text-white tracking-tight">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-white/30 text-sm">/mo</span>
                    )}
                  </div>
                  <p className="text-[14px] text-[rgba(180,188,208,0.6)] leading-relaxed">{plan.desc}</p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-9 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[14px] text-white/55">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={openContact}
                  className={`w-full py-3 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    plan.highlight
                      ? "bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_32px_rgba(56,189,248,0.5)]"
                      : "border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/15"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Shader fills the section */}
      <div className="absolute inset-0">
        <ShaderBackground />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="cta-inner relative z-10 flex flex-col items-center text-center" style={{ maxWidth: '960px', margin: '0 auto' }}>
        <FadeIn className="w-full flex flex-col items-center text-center">
          <Label>Ready to Scale?</Label>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f7f8f8] leading-[1.08] text-center" style={{ letterSpacing: '-0.022em' }}>
            Your Competitors Are Already
            <br />
            <span className="shimmer-text">Using AI.</span>
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-center" style={{ maxWidth: '560px', margin: '24px auto 0', color: '#b4bcd0' }}>
            Every day without an AI sales system is pipeline left on the table. Book your
            free audit and see exactly how ASTRA can 10× your revenue in 90 days.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative inline-flex">
              <div className="absolute -inset-[16px] rounded-full bg-sky-500/25 blur-2xl pointer-events-none" />
              <div className="absolute -inset-[6px] rounded-full bg-sky-400/15 blur-md pointer-events-none" />
              <button onClick={openContact} className="group relative flex items-center gap-2.5 px-10 py-4 rounded-full text-[13px] font-bold text-white uppercase tracking-widest bg-sky-500 hover:bg-sky-400 transition-all duration-200 shadow-[0_0_36px_rgba(56,189,248,0.55)] hover:shadow-[0_0_60px_rgba(56,189,248,0.8)] cursor-pointer">
                Book Your Free AI Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <button onClick={() => document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 rounded-full text-[13px] font-semibold text-white/40 uppercase tracking-widest border border-white/[0.08] hover:border-white/20 hover:text-[#b4bcd0] transition-all duration-200 cursor-pointer">
              See Case Studies
            </button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-[12px] text-white/25">
            <span className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-sky-500/60" />
              No contracts. Cancel anytime.
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-sky-500/60" />
              Results in 21 days or full refund.
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-sky-500/60" />
              Works for any B2B industry.
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-12 md:py-16">
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-[17px] font-black tracking-wider text-white">ASTRA</span>
            </div>
            <p className="text-[14px] text-white/35 leading-relaxed" style={{ maxWidth: '280px' }}>
              AI-powered B2B sales agency. We build autonomous lead generation and outreach
              systems that fill your pipeline while you close.
            </p>
          </div>

          <div>
            <h4 className="text-[12px] text-white/35 uppercase tracking-widest font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {["AI Lead Generation", "Outreach Automation", "Conversational AI", "Sales Analytics", "Pipeline Scaling"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-[14px] text-white/30 hover:text-white/55 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] text-white/35 uppercase tracking-widest font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Case Studies", "Blog", "Careers", "Contact"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-[14px] text-white/30 hover:text-white/55 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/25">© 2025 ASTRA AI Agency. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((s) => (
              <a key={s} href="#" className="text-[13px] text-white/25 hover:text-white/45 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ background: '#000212' }}>
      <Navbar />
      <WovenLightHero />
      <Divider />
      <ServicesSection />
      <Divider />
      <StatsSection />
      <Divider />
      <HowItWorksSection />
      <Divider />
      <TestimonialsSection />
      <Divider />
      <TechSection />
      <Divider />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
