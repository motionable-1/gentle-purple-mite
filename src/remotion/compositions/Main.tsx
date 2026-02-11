import React from "react";
import {
  AbsoluteFill,
  Artifact,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";

// Components
import {
  FadeInWords,
  FadeInChars,
  BlurReveal,
} from "../library/components/text/TextAnimation";
import { Counter } from "../library/components/text/Counter";
import { Zoom } from "../library/components/layout/Camera";
import { BrowserMockup } from "../library/components/mockups/BrowserMockup";
import { Cursor } from "../library/components/ui/Cursor";
import { Particles } from "../library/components/effects/Particles";

// ============================================
// Brand Colors - Outrank.so
// ============================================
const COLORS = {
  primary: "#9D5FF2", // Vibrant purple/lilac
  primaryLight: "#B87FFF",
  secondary: "#10B981", // Success green
  accent: "#FFD700", // Star yellow
  dark: "#0A0A0F",
  darkCard: "#141419",
  text: "#FFFFFF",
  textMuted: "#A1A1AA",
  gradient: "linear-gradient(135deg, #9D5FF2 0%, #7C3AED 50%, #6366F1 100%)",
};

// ============================================
// Outrank Logo Component
// ============================================
const OutrankLogo: React.FC<{ size?: number; animate?: boolean }> = ({
  size = 48,
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = animate
    ? spring({ frame, fps, config: { damping: 12, stiffness: 100 } })
    : 1;

  const rotation = animate
    ? interpolate(frame, [0, 30], [0, 360], {
        easing: Easing.out(Easing.cubic),
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.3,
        transform: `scale(${scale})`,
      }}
    >
      {/* Logo Icon - Four-pointed star/diamond */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B87FFF" />
            <stop offset="100%" stopColor="#9D5FF2" />
          </linearGradient>
        </defs>
        <path
          d="M24 4L28 20L44 24L28 28L24 44L20 28L4 24L20 20L24 4Z"
          fill="url(#logoGradient)"
          opacity="0.9"
        />
        <path
          d="M24 10L26.5 20L36 24L26.5 28L24 38L21.5 28L12 24L21.5 20L24 10Z"
          fill="url(#logoGradient)"
        />
      </svg>
      {/* Wordmark */}
      <span
        style={{
          fontSize: size * 0.7,
          fontWeight: 700,
          color: COLORS.text,
          letterSpacing: "-0.02em",
        }}
      >
        Outrank
      </span>
    </div>
  );
};

// ============================================
// Floating Shapes Background
// ============================================
const FloatingShapes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const shapes = [
    { x: "10%", y: "20%", size: 120, delay: 0, color: COLORS.primary },
    { x: "85%", y: "15%", size: 80, delay: 0.5, color: COLORS.primaryLight },
    { x: "70%", y: "70%", size: 100, delay: 1, color: COLORS.primary },
    { x: "15%", y: "75%", size: 60, delay: 1.5, color: COLORS.secondary },
    { x: "50%", y: "85%", size: 90, delay: 2, color: COLORS.primaryLight },
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {shapes.map((shape, i) => {
        const floatY = Math.sin((time + shape.delay) * 0.8) * 20;
        const floatX = Math.cos((time + shape.delay) * 0.5) * 10;
        const scale = 0.9 + Math.sin((time + shape.delay) * 0.6) * 0.1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${shape.color}20 0%, transparent 70%)`,
              filter: "blur(40px)",
              transform: `translate(${floatX}px, ${floatY}px) scale(${scale})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ============================================
// Grid Background
// ============================================
const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 0.4], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                     linear-gradient(180deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        opacity,
      }}
    />
  );
};

// ============================================
// Scene 1: Opening Hook
// ============================================
const OpeningHook: React.FC = () => {
  const frame = useCurrentFrame();

  // Staggered reveals
  const logoOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineStart = 35;
  const subtitleStart = 55;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <FloatingShapes />
      <GridBackground />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          zIndex: 10,
          padding: 60,
        }}
      >
        {/* Logo */}
        <div style={{ opacity: logoOpacity }}>
          <OutrankLogo size={64} animate={frame > 10} />
        </div>

        {/* Main Tagline */}
        <FadeInWords
          startFrom={taglineStart}
          stagger={0.08}
          duration={0.6}
          ease="power3.out"
          className="text-center"
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.text,
            maxWidth: 900,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Grow Organic Traffic on{" "}
          <span style={{ color: COLORS.primary }}>Auto-Pilot</span>
        </FadeInWords>

        {/* Subtitle */}
        <BlurReveal
          startFrom={subtitleStart}
          stagger={0.03}
          duration={0.5}
          style={{
            fontSize: 28,
            color: COLORS.textMuted,
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          AI-powered SEO content that ranks on Google and gets recommended by
          ChatGPT
        </BlurReveal>

        {/* Stats Row */}
        {frame > 80 && (
          <div
            style={{
              display: "flex",
              gap: 60,
              marginTop: 20,
              opacity: interpolate(frame, [80, 100], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <StatItem
              value={50000}
              suffix="+"
              label="Articles Created"
              startFrame={85}
            />
            <StatItem
              value={5}
              suffix="★"
              label="User Rating"
              startFrame={90}
            />
            <StatItem
              value={10}
              suffix="x"
              label="Faster Publishing"
              startFrame={95}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// Stat Item Component
const StatItem: React.FC<{
  value: number;
  suffix: string;
  label: string;
  startFrame: number;
}> = ({ value, suffix, label, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (frame < startFrame) return null;

  // Use fps for counter delay calculation
  const counterDelay = (startFrame - 80) / fps;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        transform: `scale(${Math.min(1, scale)})`,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.primary,
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <Counter
          from={0}
          to={value}
          duration={1.2}
          delay={counterDelay}
          abbreviate={value > 1000}
        />
        <span style={{ fontSize: 32, marginLeft: 4 }}>{suffix}</span>
      </div>
      <span style={{ fontSize: 16, color: COLORS.textMuted }}>{label}</span>
    </div>
  );
};

// ============================================
// Scene 2: Problem / Pain Point
// ============================================
const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  const items = [
    { icon: "⏰", text: "Hours spent on keyword research", delay: 15 },
    { icon: "📝", text: "Writing SEO content from scratch", delay: 30 },
    { icon: "🔄", text: "Manual publishing to multiple platforms", delay: 45 },
    { icon: "📊", text: "Tracking rankings and optimizing", delay: 60 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 50,
      }}
    >
      <FloatingShapes />
      <GridBackground />

      <FadeInWords
        startFrom={0}
        stagger={0.1}
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
        }}
      >
        SEO is time-consuming.
      </FadeInWords>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        {items.map((item, i) => {
          const itemOpacity = interpolate(
            frame,
            [item.delay, item.delay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const itemX = interpolate(
            frame,
            [item.delay, item.delay + 15],
            [-30, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            },
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
              }}
            >
              <span style={{ fontSize: 32 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: 26,
                  color: COLORS.textMuted,
                  textDecoration:
                    frame > item.delay + 40 ? "line-through" : "none",
                  transition: "text-decoration 0.3s",
                }}
              >
                {item.text}
              </span>
              {frame > item.delay + 40 && (
                <span
                  style={{
                    color: COLORS.secondary,
                    fontSize: 24,
                    opacity: interpolate(
                      frame,
                      [item.delay + 40, item.delay + 50],
                      [0, 1],
                      { extrapolateRight: "clamp" },
                    ),
                  }}
                >
                  ✓ Automated
                </span>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 3: Solution Introduction
// ============================================
const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <FloatingShapes />
      <GridBackground />

      <FadeInChars
        startFrom={0}
        stagger={0.02}
        duration={0.5}
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
        }}
      >
        One Platform. Complete Automation.
      </FadeInChars>

      {/* Feature Cards */}
      {frame > 25 && (
        <div
          style={{
            display: "flex",
            gap: 30,
            transform: `scale(${Math.min(1, cardScale)})`,
          }}
        >
          <FeatureCard
            icon="🔍"
            title="Keyword Research"
            description="AI finds high-opportunity keywords"
            delay={30}
          />
          <FeatureCard
            icon="📈"
            title="SERP Analysis"
            description="Understand what ranks and why"
            delay={40}
          />
          <FeatureCard
            icon="✍️"
            title="Content Creation"
            description="SEO-optimized articles instantly"
            delay={50}
          />
          <FeatureCard
            icon="🚀"
            title="Auto Publishing"
            description="Direct to WordPress & Webflow"
            delay={60}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const y = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 240,
        padding: 30,
        background: `linear-gradient(145deg, ${COLORS.darkCard} 0%, ${COLORS.dark} 100%)`,
        borderRadius: 20,
        border: `1px solid ${COLORS.primary}30`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        opacity,
        transform: `translateY(${(1 - Math.min(1, y)) * 30}px)`,
      }}
    >
      <span style={{ fontSize: 48 }}>{icon}</span>
      <span style={{ fontSize: 20, fontWeight: 600, color: COLORS.text }}>
        {title}
      </span>
      <span
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {description}
      </span>
    </div>
  );
};

// ============================================
// Scene 4: UI Demo with Browser Mockup
// ============================================
const UIDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mockupScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const tiltX = interpolate(frame, [0, 150], [8, 3], {
    extrapolateRight: "clamp",
  });
  const tiltY = interpolate(frame, [0, 150], [-5, -2], {
    extrapolateRight: "clamp",
  });

  // Cursor path for UI interaction demo
  const cursorPath = [
    { x: 400, y: 200, frame: 30 },
    { x: 500, y: 280, frame: 50, cursor: "pointer" as const },
    { x: 500, y: 280, frame: 65, click: true },
    { x: 600, y: 350, frame: 90, cursor: "text" as const },
    { x: 700, y: 350, frame: 110 },
    { x: 750, y: 420, frame: 130, cursor: "pointer" as const },
    { x: 750, y: 420, frame: 145, click: true },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <FloatingShapes />

      <FadeInWords
        startFrom={0}
        stagger={0.08}
        style={{
          fontSize: 42,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Powerful AI Dashboard
      </FadeInWords>

      {/* Browser Mockup */}
      <div
        style={{
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${Math.min(1, mockupScale)})`,
          transformStyle: "preserve-3d",
        }}
      >
        <BrowserMockup
          browser="chrome"
          theme="dark"
          url="app.outrank.so/dashboard"
          tabTitle="Outrank - Dashboard"
          width={900}
          height={520}
          shadow
        >
          {/* Mock Dashboard UI */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: COLORS.dark,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <OutrankLogo size={28} animate={false} />
              <div
                style={{
                  display: "flex",
                  gap: 12,
                }}
              >
                <MockButton active>Dashboard</MockButton>
                <MockButton>Articles</MockButton>
                <MockButton>Keywords</MockButton>
                <MockButton>Settings</MockButton>
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: "flex", gap: 16 }}>
              <DashboardCard
                title="Total Articles"
                value="247"
                change="+12 this week"
                icon="📝"
              />
              <DashboardCard
                title="Organic Traffic"
                value="45.2K"
                change="+23% vs last month"
                icon="📈"
              />
              <DashboardCard
                title="Keywords Ranking"
                value="1,892"
                change="+156 new"
                icon="🎯"
              />
              <DashboardCard
                title="SEO Score"
                value="94"
                change="Excellent"
                icon="⭐"
              />
            </div>

            {/* Content Area */}
            <div
              style={{
                flex: 1,
                background: COLORS.darkCard,
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: 8,
                }}
              >
                Recent Articles
              </div>
              <ArticleRow
                title="10 Best AI Tools for Content Marketing in 2025"
                score={96}
                status="Published"
              />
              <ArticleRow
                title="How to Optimize Your Website for Voice Search"
                score={92}
                status="Published"
              />
              <ArticleRow
                title="Complete Guide to Technical SEO"
                score={88}
                status="Draft"
              />
            </div>
          </div>
        </BrowserMockup>

        {/* Cursor */}
        {frame > 25 && <Cursor path={cursorPath} size={24} color="#000" />}
      </div>
    </AbsoluteFill>
  );
};

const MockButton: React.FC<{ children: React.ReactNode; active?: boolean }> = ({
  children,
  active,
}) => (
  <div
    style={{
      padding: "8px 16px",
      borderRadius: 8,
      background: active ? COLORS.primary : "transparent",
      color: active ? COLORS.text : COLORS.textMuted,
      fontSize: 13,
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);

const DashboardCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: string;
}> = ({ title, value, change, icon }) => (
  <div
    style={{
      flex: 1,
      background: COLORS.darkCard,
      borderRadius: 12,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 12, color: COLORS.textMuted }}>{title}</span>
      <span style={{ fontSize: 18 }}>{icon}</span>
    </div>
    <span style={{ fontSize: 24, fontWeight: 700, color: COLORS.text }}>
      {value}
    </span>
    <span style={{ fontSize: 11, color: COLORS.secondary }}>{change}</span>
  </div>
);

const ArticleRow: React.FC<{
  title: string;
  score: number;
  status: string;
}> = ({ title, score, status }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      background: `${COLORS.dark}80`,
      borderRadius: 8,
    }}
  >
    <span style={{ fontSize: 14, color: COLORS.text, flex: 1 }}>{title}</span>
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `conic-gradient(${COLORS.secondary} ${score * 3.6}deg, ${COLORS.darkCard} 0deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: COLORS.darkCard,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 600,
              color: COLORS.text,
            }}
          >
            {score}
          </div>
        </div>
      </div>
      <span
        style={{
          padding: "4px 12px",
          borderRadius: 20,
          background:
            status === "Published"
              ? `${COLORS.secondary}20`
              : `${COLORS.primary}20`,
          color: status === "Published" ? COLORS.secondary : COLORS.primary,
          fontSize: 11,
          fontWeight: 500,
        }}
      >
        {status}
      </span>
    </div>
  </div>
);

// ============================================
// Scene 5: Integrations
// ============================================
const IntegrationsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const integrations = [
    { name: "WordPress", icon: "🔷", delay: 20 },
    { name: "Webflow", icon: "🌐", delay: 30 },
    { name: "Shopify", icon: "🛒", delay: 40 },
    { name: "Ghost", icon: "👻", delay: 50 },
    { name: "Medium", icon: "📰", delay: 60 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 50,
      }}
    >
      <FloatingShapes />
      <GridBackground />

      <FadeInWords
        startFrom={0}
        stagger={0.08}
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
        }}
      >
        Publish Everywhere, Instantly
      </FadeInWords>

      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {/* Center Logo */}
        <div
          style={{
            position: "relative",
            width: 400,
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Connection Lines */}
          {integrations.map((int, i) => {
            const angle = (i / integrations.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 130;
            const x = Math.cos(angle) * radius + 200;
            const y = Math.sin(angle) * radius + 150;

            const lineOpacity = interpolate(
              frame,
              [int.delay, int.delay + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );

            const pulse = 0.5 + Math.sin((frame / fps) * 3 + i) * 0.5;

            return (
              <React.Fragment key={i}>
                {/* Connection Line */}
                <svg
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                >
                  <line
                    x1="200"
                    y1="150"
                    x2={x}
                    y2={y}
                    stroke={COLORS.primary}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity={lineOpacity * 0.6}
                  />
                  {/* Animated dot on line */}
                  <circle
                    cx={200 + (x - 200) * pulse}
                    cy={150 + (y - 150) * pulse}
                    r="4"
                    fill={COLORS.primary}
                    opacity={lineOpacity}
                  />
                </svg>

                {/* Integration Icon */}
                <IntegrationBadge
                  name={int.name}
                  icon={int.icon}
                  x={x}
                  y={y}
                  delay={int.delay}
                />
              </React.Fragment>
            );
          })}

          {/* Center Outrank Logo */}
          <div
            style={{
              position: "absolute",
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: COLORS.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 40px ${COLORS.primary}50`,
            }}
          >
            <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
              <path
                d="M24 4L28 20L44 24L28 28L24 44L20 28L4 24L20 20L24 4Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>

      <BlurReveal
        startFrom={70}
        style={{
          fontSize: 22,
          color: COLORS.textMuted,
          textAlign: "center",
        }}
      >
        One click publishing to all your platforms
      </BlurReveal>
    </AbsoluteFill>
  );
};

const IntegrationBadge: React.FC<{
  name: string;
  icon: string;
  x: number;
  y: number;
  delay: number;
}> = ({ name, icon, x, y, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x - 40,
        top: y - 40,
        width: 80,
        height: 80,
        borderRadius: 16,
        background: COLORS.darkCard,
        border: `1px solid ${COLORS.primary}30`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        opacity,
        transform: `scale(${Math.min(1, scale)})`,
      }}
    >
      <span style={{ fontSize: 28 }}>{icon}</span>
      <span style={{ fontSize: 11, color: COLORS.textMuted }}>{name}</span>
    </div>
  );
};

// ============================================
// Scene 6: Closing CTA
// ============================================
const ClosingCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buttonScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const buttonGlow = 0.5 + Math.sin((frame / fps) * 4) * 0.3;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <FloatingShapes />
      <GridBackground />
      <Particles
        type="stars"
        count={30}
        speed={0.3}
        colors={[COLORS.primary, COLORS.primaryLight, "#FFFFFF"]}
      />

      <FadeInWords
        startFrom={0}
        stagger={0.1}
        duration={0.6}
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.text,
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.2,
        }}
      >
        Ready to Outrank Your Competition?
      </FadeInWords>

      <BlurReveal
        startFrom={30}
        style={{
          fontSize: 24,
          color: COLORS.textMuted,
          textAlign: "center",
          maxWidth: 600,
        }}
      >
        Join thousands of marketers scaling their organic traffic with AI
      </BlurReveal>

      {/* CTA Button */}
      {frame > 55 && (
        <div
          style={{
            transform: `scale(${Math.min(1, buttonScale)})`,
            marginTop: 20,
          }}
        >
          <div
            style={{
              padding: "20px 50px",
              background: COLORS.gradient,
              borderRadius: 50,
              fontSize: 22,
              fontWeight: 600,
              color: COLORS.text,
              boxShadow: `0 0 ${30 + buttonGlow * 20}px ${COLORS.primary}${Math.round(buttonGlow * 99)}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            Start for Free
            <span style={{ fontSize: 20 }}>→</span>
          </div>
        </div>
      )}

      {/* Logo */}
      {frame > 75 && (
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(frame, [75, 90], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <OutrankLogo size={40} animate={false} />
        </div>
      )}

      {/* URL */}
      {frame > 85 && (
        <FadeInChars
          startFrom={85}
          stagger={0.03}
          style={{
            fontSize: 18,
            color: COLORS.textMuted,
            letterSpacing: "0.05em",
          }}
        >
          outrank.so
        </FadeInChars>
      )}
    </AbsoluteFill>
  );
};

// ============================================
// Main Composition
// ============================================
export const Main: React.FC = () => {
  loadSpaceGrotesk(); // Load heading font
  const { fontFamily: bodyFont } = loadInter();
  const frame = useCurrentFrame();

  // Scene durations (in frames at 30fps)
  const SCENE_DURATIONS = {
    opening: 150, // 5 seconds
    problem: 120, // 4 seconds
    solution: 120, // 4 seconds
    uiDemo: 180, // 6 seconds
    integrations: 120, // 4 seconds
    closing: 150, // 5 seconds
  };

  const TRANSITION_DURATION = 15; // 0.5 second transitions

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill
        style={{
          fontFamily: bodyFont,
          backgroundColor: COLORS.dark,
        }}
      >
        <Zoom from={1} to={1.02}>
          <TransitionSeries>
            {/* Scene 1: Opening Hook */}
            <TransitionSeries.Sequence
              durationInFrames={SCENE_DURATIONS.opening}
            >
              <OpeningHook />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
            />

            {/* Scene 2: Problem */}
            <TransitionSeries.Sequence
              durationInFrames={SCENE_DURATIONS.problem}
            >
              <ProblemScene />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition
              presentation={slide({ direction: "from-right" })}
              timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
            />

            {/* Scene 3: Solution */}
            <TransitionSeries.Sequence
              durationInFrames={SCENE_DURATIONS.solution}
            >
              <SolutionScene />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
            />

            {/* Scene 4: UI Demo */}
            <TransitionSeries.Sequence
              durationInFrames={SCENE_DURATIONS.uiDemo}
            >
              <UIDemoScene />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition
              presentation={slide({ direction: "from-bottom" })}
              timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
            />

            {/* Scene 5: Integrations */}
            <TransitionSeries.Sequence
              durationInFrames={SCENE_DURATIONS.integrations}
            >
              <IntegrationsScene />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
            />

            {/* Scene 6: Closing CTA */}
            <TransitionSeries.Sequence
              durationInFrames={SCENE_DURATIONS.closing}
            >
              <ClosingCTA />
            </TransitionSeries.Sequence>
          </TransitionSeries>
        </Zoom>
      </AbsoluteFill>
    </>
  );
};
