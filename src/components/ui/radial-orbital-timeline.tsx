"use client";

import { useState, useEffect, useRef, type ElementType } from "react";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulse: Record<number, boolean> = {};
        relatedItems.forEach((rId) => { newPulse[rId] = true; });
        setPulseEffect(newPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    if (!autoRotate) return;
    let rafId: number;
    let lastTime: number | null = null;
    const FRAME_MS = 1000 / 30; // cap at 30fps to stay smooth on mobile

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      if (lastTime !== null && now - lastTime < FRAME_MS) return;
      const delta = lastTime !== null ? Math.min(now - lastTime, 100) : FRAME_MS;
      lastTime = now;
      setRotationAngle((prev) => (prev + delta * 0.006) % 360);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const total = timelineData.length;
    const targetAngle = (nodeIndex / total) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 180;
    const radian = (angle * Math.PI) / 180;
    const x = Math.round(radius * Math.cos(radian) * 100) / 100;
    const y = Math.round(radius * Math.sin(radian) * 100) / 100;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.3, Math.min(1, 0.3 + 0.7 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusColor = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "bg-sky-500 border-sky-400";
      case "in-progress": return "bg-blue-600 border-blue-500";
      case "pending": return "bg-gray-800 border-gray-700";
    }
  };

  return (
    <div
      className="w-full h-[600px] flex items-center justify-center relative overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-3xl h-full flex items-center justify-center" ref={orbitRef}>
        {/* Center orb */}
        <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-600 animate-pulse flex items-center justify-center z-20 shadow-[0_0_40px_rgba(56,189,248,0.6)]">
          <div className="absolute w-20 h-20 rounded-full border border-sky-500/30 animate-ping opacity-60" />
          <div className="absolute w-28 h-28 rounded-full border border-sky-500/20 animate-ping opacity-40" style={{ animationDelay: "0.5s" }} />
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md" />
        </div>

        {/* Orbit ring */}
        <div className="absolute w-[380px] h-[380px] rounded-full border border-white/5" />

        {/* Nodes */}
        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              ref={(el) => { nodeRefs.current[item.id] = el; }}
              className="absolute transition-all duration-500 cursor-pointer"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Node button */}
              <div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isExpanded
                    ? "bg-sky-500 border-sky-400 scale-125 shadow-[0_0_25px_rgba(56,189,248,0.8)]"
                    : isRelated
                    ? "bg-blue-500 border-blue-400 scale-110"
                    : `${getStatusColor(item.status)} opacity-80`
                } ${isPulsing ? "animate-pulse" : ""}`}
              >
                <Icon className="w-5 h-5 text-white" />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white/50 whitespace-nowrap font-medium">
                  {item.title.split(" ")[0]}
                </span>
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <div
                  className="absolute top-14 left-1/2 -translate-x-1/2 w-64 bg-black/90 border border-purple-500/30 rounded-xl p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-sky-400" />
                    <span className="text-white font-semibold text-sm">{item.title}</span>
                  </div>
                  <Badge
                    className="mb-2 text-xs"
                    style={{ background: "rgba(56,189,248,0.1)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.2)" }}
                  >
                    {item.category}
                  </Badge>
                  <p className="text-white/60 text-xs leading-relaxed">{item.content}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sky-400 text-xs">{item.date}</span>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 bg-gray-800 rounded-full w-16 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-blue-400 rounded-full"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                      <span className="text-white/40 text-xs">{item.energy}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
