"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import data from '@/data/data.json'

export default function Intro() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mouvementCounter = useRef(0);
  const [displayedImages, setDisplayedImages] = useState<Array<{
    id: number,
    src: string,
    x: number,
    y: number
  }>>([])
  const imageIdCounter = useRef(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouvementCounter.current++;

    if (mouvementCounter.current >= 10) {
      const newImage = {
        id: imageIdCounter.current++,
        src: data[currentIndex].image,
        x: event.clientX,
        y: event.clientY
      }

      setDisplayedImages(prev => {
        const newImages = [...prev, newImage]

        if (newImages.length > 8) {
          return newImages.slice(-8)
        }
        return newImages
      })

      setCurrentIndex((prev) => (prev + 1) % data.length)
      mouvementCounter.current = 0;
    }
  }

  return (
    <div
      className="w-screen h-screen cursor-none relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {displayedImages.map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="absolute pointer-events-none"
            style={{
              left: img.x - 100,
              top: img.y - 75,
              zIndex: img.id
            }}
          >
            <Image
              src={img.src}
              alt="Gallery image"
              width={270}
              height={270}
              className="object-cover rounded-lg"
              priority
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
