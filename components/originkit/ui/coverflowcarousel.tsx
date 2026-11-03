/* eslint-disable */
// Originkit — props baked into the default export.
"use client"

import {
    useState,
    useEffect,
    useCallback,
    useRef,
    type CSSProperties,
    type ReactNode,
} from "react"

export interface CarouselItem {
    id?: string | number
    title: string
    category?: string
    description?: string
    image?: string
    tags?: string[]
    link?: string
    stats?: { label: string; value: string }
    accentColor?: string
}

export interface CoverflowCarouselProps {
    items?: CarouselItem[]
    cardWidth?: number
    cardHeight?: number
    gap?: number
    tilt?: number
    depth?: number
    scaleStep?: number
    autoplay?: boolean
    autoplayInterval?: number
    showArrows?: boolean
    showDots?: boolean
    className?: string
    style?: CSSProperties
    onSelect?: (index: number, item: CarouselItem) => void
}

const DEFAULT_ITEMS: CarouselItem[] = [
    {
        id: 1,
        title: "FinFlow Nexus",
        category: "FinTech & Web3",
        description: "High-frequency decentralized trading terminal & real-time telemetry dashboard with sub-millisecond execution.",
        tags: ["Next.js 15", "Rust", "Tailwind CSS", "WebSockets"],
        link: "#contact",
        stats: { label: "Performance", value: "99.99% Uptime" },
        accentColor: "#0284c7",
    },
    {
        id: 2,
        title: "Omnix Agentic AI",
        category: "Enterprise AI & Multi-Agent",
        description: "Autonomous multi-agent orchestration platform integrating customized LLMs with enterprise resource planning.",
        tags: ["Python", "FastAPI", "LangChain", "Gemini API"],
        link: "#contact",
        stats: { label: "Automation", value: "85% Tasks" },
        accentColor: "#7c3aed",
    },
    {
        id: 3,
        title: "Aura Design System",
        category: "Product Design & Tokens",
        description: "Comprehensive unified design system and multi-brand component library powering 14 global product lines.",
        tags: ["Figma", "React", "Storybook", "Tailwind"],
        link: "#contact",
        stats: { label: "Dev Velocity", value: "4.5x Faster" },
        accentColor: "#e11d48",
    },
    {
        id: 4,
        title: "CloudVanguard",
        category: "Cloud Architecture & DevOps",
        description: "Zero-downtime multi-cloud Kubernetes deployment pipeline with automated telemetry and auto-scaling.",
        tags: ["Docker", "Kubernetes", "AWS", "Terraform"],
        link: "#contact",
        stats: { label: "Scalability", value: "Zero Jitter" },
        accentColor: "#059669",
    },
    {
        id: 5,
        title: "SwiftPulse Health",
        category: "Mobile & HealthTech",
        description: "Cross-platform biometric monitoring application with offline-first synchronization and BLE sensor integration.",
        tags: ["React Native", "TypeScript", "Node.js", "Supabase"],
        link: "#contact",
        stats: { label: "Adoption", value: "500k+ Users" },
        accentColor: "#d97706",
    },
    {
        id: 6,
        title: "HyperScale Commerce",
        category: "Headless E-Commerce",
        description: "Ultra-fast headless commerce platform with dynamic SSR, instant checkout, and localized edge CDN caching.",
        tags: ["Next.js", "Shopify Plus", "PostgreSQL", "Stripe"],
        link: "#contact",
        stats: { label: "Conversion", value: "+48% Lift" },
        accentColor: "#4f46e5",
    },
]

export default function CoverflowCarousel({
    items = DEFAULT_ITEMS,
    cardWidth = 440,
    cardHeight = 460,
    gap = 140,
    tilt = 35,
    depth = 220,
    scaleStep = 0.14,
    autoplay = true,
    autoplayInterval = 4500,
    showArrows = true,
    showDots = true,
    className = "",
    style = {},
    onSelect,
}: CoverflowCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const touchStartX = useRef<number | null>(null)
    const list = items && items.length > 0 ? items : DEFAULT_ITEMS
    const count = list.length

    const goTo = useCallback(
        (index: number) => {
            const next = ((index % count) + count) % count
            setActiveIndex(next)
            if (onSelect) onSelect(next, list[next])
        },
        [count, list, onSelect]
    )

    const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
    const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

    // Autoplay
    useEffect(() => {
        if (!autoplay || isHovered) return
        const timer = setInterval(() => {
            goTo(activeIndex + 1)
        }, autoplayInterval)
        return () => clearInterval(timer)
    }, [autoplay, autoplayInterval, isHovered, activeIndex, goTo])

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") prev()
        if (e.key === "ArrowRight") next()
    }

    // Touch support
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return
        const diff = e.changedTouches[0].clientX - touchStartX.current
        touchStartX.current = null
        if (Math.abs(diff) > 40) {
            if (diff > 0) prev()
            else next()
        }
    }

    return (
        <div
            className={`originkit-coverflow-carousel ${className}`}
            style={{
                position: "relative",
                width: "100%",
                perspective: "1600px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                outline: "none",
                userSelect: "none",
                touchAction: "pan-y",
                ...style,
            }}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 3D Stage */}
            <div
                style={{
                    position: "relative",
                    width: cardWidth,
                    height: cardHeight,
                    transformStyle: "preserve-3d",
                    margin: "0 auto",
                }}
            >
                {list.map((item, idx) => {
                    let offset = idx - activeIndex
                    if (offset > count / 2) offset -= count
                    if (offset < -count / 2) offset += count

                    const absOffset = Math.abs(offset)
                    const isActive = offset === 0
                    const isVisible = absOffset <= 2

                    const translateX = offset * gap
                    const translateZ = isActive ? 0 : -Math.min(absOffset, 2) * depth
                    const rotateY = isActive ? 0 : offset > 0 ? -tilt : tilt
                    const scale = isActive ? 1 : Math.max(0.7, 1 - absOffset * scaleStep)
                    const opacity = isActive ? 1 : Math.max(0.2, 1 - absOffset * 0.35)
                    const zIndex = 20 - absOffset

                    return (
                        <div
                            key={item.id ?? idx}
                            onClick={() => goTo(idx)}
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                width: cardWidth,
                                height: cardHeight,
                                transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                transformOrigin: "center center",
                                transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                                opacity: isVisible ? opacity : 0,
                                pointerEvents: isVisible ? "auto" : "none",
                                zIndex,
                                cursor: "pointer",
                                borderRadius: "24px",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "24px",
                                    background: "rgba(255, 255, 255, 0.9)",
                                    backdropFilter: "blur(28px)",
                                    border: isActive
                                        ? `2px solid ${item.accentColor || "#6366f1"}`
                                        : "1.5px solid rgba(255, 255, 255, 0.95)",
                                    boxShadow: isActive
                                        ? `0 24px 50px -10px rgba(0,0,0,0.12), 0 0 35px -2px ${item.accentColor || "rgba(99,102,241,0.3)"}44`
                                        : "0 14px 35px -8px rgba(15, 23, 42, 0.08)",
                                    padding: "2rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            display: "inline-block",
                                            padding: "6px 14px",
                                            borderRadius: "9999px",
                                            fontSize: "0.78rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.04em",
                                            textTransform: "uppercase",
                                            background: `${item.accentColor || "#6366f1"}15`,
                                            color: item.accentColor || "#6366f1",
                                            marginBottom: "1.2rem",
                                        }}
                                    >
                                        {item.category}
                                    </div>

                                    <h3
                                        style={{
                                            fontSize: "1.5rem",
                                            fontWeight: 800,
                                            color: "#0f172a",
                                            marginBottom: "0.85rem",
                                            lineHeight: 1.25,
                                        }}
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        style={{
                                            fontSize: "0.95rem",
                                            lineHeight: 1.6,
                                            color: "#475569",
                                            marginBottom: "1.4rem",
                                        }}
                                    >
                                        {item.description}
                                    </p>

                                    {item.tags && (
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                            {item.tags.map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    style={{
                                                        fontSize: "0.76rem",
                                                        fontWeight: 650,
                                                        padding: "4px 10px",
                                                        borderRadius: "8px",
                                                        background: "rgba(241, 245, 249, 0.8)",
                                                        color: "#334155",
                                                        border: "1px solid rgba(226, 232, 240, 0.8)",
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderTop: "1px solid rgba(226, 232, 240, 0.7)",
                                        paddingTop: "1.2rem",
                                        marginTop: "1.2rem",
                                    }}
                                >
                                    {item.stats && (
                                        <div>
                                            <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", display: "block" }}>
                                                {item.stats.label}
                                            </span>
                                            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: item.accentColor || "#0f172a" }}>
                                                {item.stats.value}
                                            </span>
                                        </div>
                                    )}
                                    <a
                                        href={item.link || "#contact"}
                                        style={{
                                            fontSize: "0.9rem",
                                            fontWeight: 700,
                                            color: item.accentColor || "#6366f1",
                                            textDecoration: "none",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                        }}
                                    >
                                        Case Study &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Controls */}
            {(showArrows || showDots) && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1.5rem",
                        marginTop: "2.75rem",
                        zIndex: 25,
                    }}
                >
                    {showArrows && (
                        <button
                            type="button"
                            onClick={prev}
                            aria-label="Previous slide"
                            style={{
                                width: "46px",
                                height: "46px",
                                borderRadius: "50%",
                                background: "#ffffff",
                                border: "1px solid rgba(15, 23, 42, 0.1)",
                                color: "#0f172a",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                            }}
                        >
                            &larr;
                        </button>
                    )}

                    {showDots && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {list.map((_, dIdx) => (
                                <button
                                    key={dIdx}
                                    type="button"
                                    onClick={() => goTo(dIdx)}
                                    aria-label={`Go to slide ${dIdx + 1}`}
                                    style={{
                                        width: dIdx === activeIndex ? "28px" : "10px",
                                        height: "10px",
                                        borderRadius: "9999px",
                                        background: dIdx === activeIndex ? "linear-gradient(135deg, #0284c7, #9333ea)" : "rgba(148, 163, 184, 0.45)",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "all 0.35s ease",
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {showArrows && (
                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next slide"
                            style={{
                                width: "46px",
                                height: "46px",
                                borderRadius: "50%",
                                background: "#ffffff",
                                border: "1px solid rgba(15, 23, 42, 0.1)",
                                color: "#0f172a",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                            }}
                        >
                            &rarr;
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
