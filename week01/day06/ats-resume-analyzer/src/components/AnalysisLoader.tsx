'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Search, 
  Brain, 
  Target, 
  BarChart3, 
  Lightbulb,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const analysisSteps = [
  {
    id: 'reading',
    icon: FileText,
    title: 'Reading Job Description',
    message: 'Analyzing job requirements and extracting key criteria...',
    duration: 2000,
  },
  {
    id: 'extracting',
    icon: Search,
    title: 'Extracting Resume Information',
    message: 'Processing your resume and identifying skills, experience...',
    duration: 3000,
  },
  {
    id: 'matching',
    icon: Target,
    title: 'Matching Skills & Experience',
    message: 'Comparing your qualifications with job requirements...',
    duration: 4000,
  },
  {
    id: 'keywords',
    icon: Brain,
    title: 'Detecting Missing Keywords',
    message: 'Identifying ATS keywords and optimization opportunities...',
    duration: 5000,
  },
  {
    id: 'scoring',
    icon: BarChart3,
    title: 'Calculating ATS Score',
    message: 'Generating compatibility score and detailed breakdown...',
    duration: 6000,
  },
  {
    id: 'recommendations',
    icon: Lightbulb,
    title: 'Generating Recommendations',
    message: 'Preparing personalized improvement suggestions...',
    duration: 7000,
  },
]

export default function AnalysisLoader() {
  const [currentStep, setCurrentStep] = useState(0)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newStep = analysisSteps.findIndex(step => elapsed < step.duration)
      setCurrentStep(newStep === -1 ? analysisSteps.length - 1 : newStep)
    }, 100)

    return () => clearInterval(interval)
  }, [startTime])

  const progress = ((currentStep + 1) / analysisSteps.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="max-w-2xl mx-auto text-center px-4">
        {/* Main Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 border-4 border-blue-100 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Progress Ring */}
            <motion.div
              className="absolute inset-2 border-4 border-transparent border-t-blue-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Center Brain Icon */}
            <div className="absolute inset-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * 45 * Math.PI / 180) * 80],
                  y: [0, Math.sin(i * 45 * Math.PI / 180) * 80],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Analyzing Your Resume...
          </h2>
          <p className="text-lg text-gray-600">
            Our AI is comparing your resume with the job requirements.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Progress value={progress} className="h-3 bg-gray-100" />
          <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% Complete</p>
        </motion.div>

        {/* Current Step */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                {(() => {
                  const Icon = analysisSteps[currentStep]?.icon || Clock
                  return <Icon className="w-4 h-4 text-blue-600" />
                })()}
              </motion.div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {analysisSteps[currentStep]?.title || 'Processing...'}
          </h3>
          <p className="text-gray-600">
            {analysisSteps[currentStep]?.message || 'Please wait while we analyze your resume...'}
          </p>
        </motion.div>

        {/* Steps Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-6 gap-2 max-w-md mx-auto mb-8"
        >
          {analysisSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`
                flex flex-col items-center p-3 rounded-lg transition-all duration-300
                ${index < currentStep
                  ? 'bg-green-100 text-green-600'
                  : index === currentStep
                  ? 'bg-blue-100 text-blue-600 scale-105'
                  : 'bg-gray-100 text-gray-400'
                }
              `}
              animate={{
                scale: index === currentStep ? 1.05 : 1,
              }}
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                {index < currentStep ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
              </div>
              <span className="text-xs font-medium text-center">{step.title}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-blue-50/50 backdrop-blur-sm border border-blue-200 rounded-xl p-6 max-w-lg mx-auto"
        >
          <h4 className="font-semibold text-blue-800 mb-2">💡 Did you know?</h4>
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-blue-700 text-sm leading-relaxed"
          >
            {[
              'Our AI analyzes over 50 resume elements including skills, experience, education, and formatting.',
              'We check for ATS compatibility and keyword optimization to help your resume pass initial screening.',
              'The system compares your qualifications against job requirements using advanced language models.',
              'We identify missing keywords that could improve your resume\'s visibility to recruiters.',
              'Our scoring algorithm considers both technical skills and soft skills mentioned in the job description.',
              'You\'ll receive personalized recommendations based on successful candidates in similar roles.'
            ][currentStep] || 'Processing your resume with state-of-the-art AI technology...'}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}