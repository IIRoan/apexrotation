'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image';
import Link from 'next/link';
import type { RotationData } from './types'
import axios from "axios"
import RotationCard from './RotationCard'
import BackgroundImage from './BackgroundImage'
import LTMButton from './LTMButton'
import LoadingSpinner from './LoadingSpinner'

export default function MapRotation() {
    const [showLTM, setShowLTM] = useState(false)
    const [data, setData] = useState<RotationData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [leftBgImage, setLeftBgImage] = useState('')
    const [rightBgImage, setRightBgImage] = useState('')
    const [reloadTrigger, setReloadTrigger] = useState(0)
    const [imagesLoaded, setImagesLoaded] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        setError(null)
        setImagesLoaded(false)
        try {
            const response = await axios.get(`https://api.mozambiquehe.re/maprotation?version=2&auth=${process.env.NEXT_PUBLIC_AL_API_KEY}`)
            setData(response.data)
            setLeftBgImage(response.data.battle_royale.current.asset)
            setRightBgImage(response.data.ranked.current.asset)
            await preloadImages([response.data.battle_royale.current.asset, response.data.ranked.current.asset])
            setImagesLoaded(true)
            setIsLoading(false)
        } catch (error) {
            console.error("API error:", error)
            setError("API error: too many requests")
            setIsLoading(false)
        }
    }

    const preloadImages = (urls: string[]) => {
        return Promise.all(
            urls.map((url) => {
                return new Promise((resolve, reject) => {
                    const img = document.createElement('img')
                    img.onload = resolve
                    img.onerror = reject
                    img.src = url
                })
            })
        )
    }

    useEffect(() => {
        fetchData()
    }, [reloadTrigger])

    useEffect(() => {
        if (data) {
            const timers = [
                data.battle_royale.current.remainingSecs,
                data.ranked.current.remainingSecs,
                data.ltm?.current.remainingSecs
            ].filter(Boolean) as number[]

            const minTimer = Math.min(...timers)

            const timer = setTimeout(() => {
                setReloadTrigger(prev => prev + 1)
            }, minTimer * 1000)

            return () => clearTimeout(timer)
        }
    }, [data])

    const titleVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    };

    const iconVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    };

    if (isLoading || !imagesLoaded) {
        return <LoadingSpinner />
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <p className="text-red-500 text-xl">{error}</p>
            </div>
        )
    }

    if (!data) {
        return null
    }

    return (
        <div className="relative min-h-screen w-full bg-black">
            {/* Split Backgrounds */}
            <div className="fixed inset-0 flex">
                <AnimatePresence>
                    <BackgroundImage imageUrl={leftBgImage} side="left" />
                </AnimatePresence>
                <div className="absolute inset-0 right-1/2 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <AnimatePresence>
                    <BackgroundImage imageUrl={rightBgImage} side="right" />
                </AnimatePresence>
                <div className="absolute inset-0 left-1/2 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative min-h-screen w-full p-4">
                <div className="mx-auto max-w-full space-y-6 px-4 lg:px-8">
                    {/* Header */}
                    <motion.div
                        className="mb-8 flex items-center justify-between"
                        initial="hidden"
                        animate="visible"
                        variants={titleVariants}
                    >
                        <div className="flex items-center gap-3">
                            <motion.div variants={iconVariants}>
                                <Image
                                    src="/apex.svg"
                                    alt="Apex Legends Logo"
                                    width={28}
                                    height={28}
                                />
                            </motion.div>
                        </div>
                        <LTMButton
                            showLTM={showLTM}
                            onClick={() => setShowLTM(!showLTM)}
                        />
                    </motion.div>

                    {/* Map Rotations */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <RotationCard
                            current={data.battle_royale.current}
                            next={data.battle_royale.next}
                            type="Normal Battle Royale"
                        />
                        <RotationCard
                            current={data.ranked.current}
                            next={data.ranked.next}
                            type="Ranked Battle Royale"
                        />
                    </div>

                    {/* LTM Section */}
                    <AnimatePresence>
                        {showLTM && data.ltm && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                className="relative z-10"
                            >
                                <div className="absolute inset-0 -z-10">
                                    <motion.div
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.7 }}
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                                        style={{
                                            backgroundImage: `url(${data.ltm.current.asset})`,
                                            backgroundPosition: '50% 50%'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                </div>
                                <RotationCard
                                    current={data.ltm.current}
                                    next={data.ltm.next}
                                    type="Limited Time Mode"
                                    showEventName
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* GitHub Link */}
                <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        href="https://github.com/iiroan/apexrotation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                        style={{ color: '#8fbc8f' }}
                    >
                    Made with ❤️
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}