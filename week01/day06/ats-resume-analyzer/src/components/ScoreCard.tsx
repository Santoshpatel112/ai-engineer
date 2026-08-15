'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, TrendingUp } from 'lucide-react'
import { AnalysisResult } from '@/app/page'

interface ScoreCardProps {
  result: AnalysisResult
}

export default function ScoreCard({ result }: ScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const finalScore = result.score

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayScore(prev => {
          if (prev >= finalScore) {
            clearInterval(interval)
            return finalScore
          }
          return Math.min(prev + 1, finalScore)
        })
      }, 30)
      return () => clearInterval(interval)
    }, 500)

    return () => clearTimeout(timer)
  }, [finalScore])

  const getScoreLabel = (score: number) => {
    if (score >= 90) return { label: 'Excellent Match', color: 'text-green-600', icon: Trophy }
    if (score >= 80) return { label: 'Strong Match', color: 'text-blue-600', icon: Star }
    if (score >= 70) return { label: 'Good Match', color: 'text-indigo-600', icon: TrendingUp }
    if (score >= 60) return { label: 'Moderate Match', color: 'text-yellow-600', icon: TrendingUp }
    return { label: 'Needs Improvement', color: 'text-red-600', icon: TrendingUp }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-indigo-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-indigo-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const scoreInfo = getScoreLabel(finalScore)
  const Icon = scoreInfo.icon

  // Calculate stroke dash array for circle animation
  const radius = 120
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-12 shadow-xl text-center">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12 space-y-8 lg:space-y-0">
        {/* Circular Score */}
        <div className="relative">
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            className="transform -rotate-90"
          >
            {/* Background Circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="currentColor"
              strokeWidth="16"
              fill="transparent"
              className="text-gray-200"
            />
            
            {/* Progress Circle */}
            <motion.circle
              cx="140"
              cy="140"
              r={radius}
              stroke="currentColor"
              strokeWidth="16"
              fill="transparent"
              strokeLinecap="round"
              className={getProgressColor(finalScore)}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: strokeDashoffset }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
            />
          </svg>
          
          {/* Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className={`text-6xl font-bold ${getScoreColor(finalScore)}`}
              animate={displayScore === finalScore ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, delay: 2 }}
            >
              {displayScore}
            </motion.div>
            <div className="text-2xl text-gray-500 font-medium mt-2">/ 100</div>
            <div className="text-lg text-gray-600 mt-1">ATS SCORE</div>
          </div>
        </div>

        {/* Score Details */}
        <div className="text-left lg:max-w-md">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                finalScore >= 80 ? 'bg-green-100' : 
                finalScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <Icon className={`w-6 h-6 ${scoreInfo.color}`} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${scoreInfo.color}`}>
                  {scoreInfo.label}
                </h3>
                <p className="text-gray-600">
                  ATS Compatibility Score
                </p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Your resume matches <strong>{finalScore}%</strong> of this job description. 
              {finalScore >= 80 
                ? " You're well-positioned for this role!" 
                : finalScore >= 60 
                ? " You have a good foundation with room for improvement." 
                : " Focus on the recommendations below to strengthen your application."}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {result.skills.matching.length}
                </div>
                <div className="text-sm text-blue-700">Matching Skills</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-600">
                  {result.skills.missing.length}
                </div>
                <div className="text-sm text-red-700">Missing Skills</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}