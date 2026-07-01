'use client'

import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion'

export function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  className,
}: {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const mv = useMotionValue(value)
  const spring = useSpring(mv, { stiffness: 120, damping: 20, mass: 0.6 })
  const text = useTransform(
    spring,
    (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`,
  )

  useEffect(() => {
    mv.set(value)
  }, [mv, value])

  return <motion.span className={className}>{text}</motion.span>
}
