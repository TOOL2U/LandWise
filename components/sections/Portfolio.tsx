'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export default function Portfolio() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [shuffledSlides, setShuffledSlides] = useState<typeof projectData.slides>([]);

    const projectData = {
        title: "",
        subtitle: "",
        slides: [
            {
                src: "/assets/portfolio/project_overview.png",
                alt: "Project Overview",
                title: "Project Overview",
                caption: "High-resolution aerial survey showing verified boundaries and terrain context."
            },
            {
                src: "/assets/portfolio/dem_analysis.png",
                alt: "DEM Analysis",
                title: "Digital Elevation Model",
                caption: "Digital Elevation Model used for slope, drainage, and buildability assessment."
            },
            {
                src: "/assets/portfolio/slope_analysis.png",
                alt: "Slope Analysis",
                title: "Slope & Gradient Map",
                caption: "Cross-section analysis used to determine platform feasibility and access planning."
            },
            {
                src: "/assets/portfolio/3d_terrain.png",
                alt: "3D Terrain Model",
                title: "3D Terrain Visualization",
                caption: "Photorealistic terrain model for visualization and development planning."
            },
            {
                src: "/assets/portfolio/buildability.png",
                alt: "Buildability Study",
                title: "Buildability Analysis",
                caption: "Combined terrain analysis and site modelling used to evaluate development potential."
            },
            {
                src: "/assets/portfolio/Drainage New.png",
                alt: "Drainage Flow Analysis",
                title: "Drainage Flow Analysis – Surface Water Movement",
                caption: "Surface water movement analysis derived from orthomosaic and terrain interpretation showing water flow patterns and drainage recommendations."
            },
            {
                src: "/assets/portfolio/Topo.png",
                alt: "Site Location & Topographic Survey",
                title: "Site Location & Land Context Analysis",
                caption: "Comprehensive site location mapping and high-precision topographic boundary survey for accurate design, engineering, and construction planning."
            },
            {
                src: "/assets/portfolio/slide_9.png",
                alt: "Detailed Analysis View",
                title: "Site Analysis Detail",
                caption: "In-depth terrain and vegetation analysis for development planning."
            },
            {
                src: "/assets/portfolio/slide_10.png",
                alt: "Site Context",
                title: "Environmental Context",
                caption: "Analysis of surrounding environment and site conditions."
            },
            {
                src: "/assets/portfolio/slide_12.png",
                alt: "Development Planning",
                title: "Development Feasibility",
                caption: "Visualizing potential development zones and infrastructure capability."
            },
            {
                src: "/assets/portfolio/slide_13.png",
                alt: "Terrain Data",
                title: "Topographic Data",
                caption: "Precise topographic data mapped for accurate engineering."
            },
            {
                src: "/assets/portfolio/18.png",
                alt: "Project Documentation",
                title: "Project Documentation",
                caption: "Complete project documentation and analysis deliverables."
            },
            {
                src: "/assets/portfolio/11.png",
                alt: "Advanced Analysis",
                title: "Advanced Site Analysis",
                caption: "Detailed analysis of site characteristics and development potential."
            },
            {
                src: "/assets/portfolio/12.png",
                alt: "Development Study",
                title: "Development Planning Study",
                caption: "Comprehensive development planning and feasibility assessment."
            },
            {
                src: "/assets/portfolio/Haad Yao Project.png",
                alt: "Drainage Analysis - Haad Yao Project",
                title: "Drainage Analysis – Haad Yao Project",
                caption: "Detailed drainage analysis and surface water assessment for the Haad Yao development project."
            }
        ]
    };

    // Shuffle array using Fisher-Yates algorithm
    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Initialize shuffled slides on mount
    useEffect(() => {
        setShuffledSlides(shuffleArray(projectData.slides));
    }, []);

    // Reshuffle when slideshow finishes a complete cycle
    const nextSlide = () => {
        const nextIndex = (currentSlide + 1) % shuffledSlides.length;
        if (nextIndex === 0 && shuffledSlides.length > 0) {
            // Reshuffle when we complete a cycle
            setShuffledSlides(shuffleArray(projectData.slides));
        }
        setCurrentSlide(nextIndex);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + shuffledSlides.length) % shuffledSlides.length);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && shuffledSlides.length > 0) {
            interval = setInterval(() => {
                nextSlide();
            }, 3000); // Change slide every 3 seconds
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying, nextSlide, shuffledSlides.length]);

    return (
        <section className="relative h-[70vh] bg-charcoal overflow-hidden group">
            {/* Background Slides */}
            {shuffledSlides.length > 0 && (
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-black/20 z-10" /> {/* Overlay */}
                        <motion.div
                            className="relative w-full h-full"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }}
                            transition={{ duration: 10, ease: "linear" }}
                        >
                            {/* Blurred Background Layer */}
                            <Image
                                src={shuffledSlides[currentSlide].src}
                                alt={shuffledSlides[currentSlide].alt}
                                fill
                                className="object-cover blur-xl opacity-50 scale-110"
                                priority
                                quality={50}
                            />

                            {/* Main Content Layer - No Cropping */}
                            <Image
                                src={shuffledSlides[currentSlide].src}
                                alt={shuffledSlides[currentSlide].alt}
                                fill
                                className="object-contain relative z-10"
                                priority
                                quality={100}
                            />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Interactive Navigation Zones */}
            <button
                className="absolute inset-y-0 left-0 w-1/2 z-20 cursor-w-resize outline-none focus:bg-white/5 transition-colors"
                onClick={prevSlide}
                aria-label="Previous Slide"
            />
            <button
                className="absolute inset-y-0 right-0 w-1/2 z-20 cursor-e-resize outline-none focus:bg-white/5 transition-colors"
                onClick={nextSlide}
                aria-label="Next Slide"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 container-custom flex flex-col justify-end pb-24 pointer-events-none">
                <div className="max-w-4xl text-white pointer-events-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mb-6"
                    >
                        <p className="text-sand/80 font-bold tracking-widest text-xs uppercase mb-2">
                            {projectData.subtitle}
                        </p>
                        <h2 className="heading-md md:heading-lg text-white mb-2 leading-tight">
                            {projectData.title}
                        </h2>
                    </motion.div>

                    {/* Current Slide Info */}
                    {shuffledSlides.length > 0 && (
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="border-l-2 border-sand pl-6"
                            >
                                <h3 className="text-2xl font-bold text-sand mb-2">
                                    {shuffledSlides[currentSlide].title}
                                </h3>
                                <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                                    {shuffledSlides[currentSlide].caption}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4 text-white pointer-events-auto">
                <div className="flex gap-2 mr-4">
                    {shuffledSlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-sand' : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors backdrop-blur-sm"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors backdrop-blur-sm"
                        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>

                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors backdrop-blur-sm"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            {isPlaying && (
                <motion.div
                    key={currentSlide}
                    className="absolute bottom-0 left-0 h-1 bg-sand z-40"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                />
            )}

        </section>
    );
}
