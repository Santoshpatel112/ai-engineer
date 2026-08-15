'use client'

import { motion } from 'framer-motion'
import { Zap, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnalyzeButtonProps {
  onAnalyze: () => void
  canAnalyze: boolean
  jobDescription: string
  resumeFile: File | null
  error: string | null
}

export default function AnalyzeButton({ 
  onAnalyze, 
  canAnalyze, 
  jobDescription, 
  resumeFile, 
  error 
}: AnalyzeButtonProps) {
  const getValidationMessage = () => {
    if (!jobDescription.trim() && !resumeFile) {
      return "Please enter a Job Description and upload your Resume."
    }
    if (!jobDescription.trim()) {
      return "Please enter a Job Description."
    }
    if (!resumeFile) {
      return "Please upload your Resume."
    }
    return null
  }

  const validationMessage = getValidationMessage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col items-center space-y-6"
    >
      {/* Main Analyze Button */}
      <motion.div
        whileHover={{ y: canAnalyze ? -2 : 0 }}
        whileTap={{ scale: canAnalyze ? 0.98 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <Button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          size="lg"
          className={`
            px-12 py-4 text-lg font-medium rounded-xl transition-all duration-200 focus-ring
            ${canAnalyze
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant hover-lift'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
            }
          `}
        >
          <Zap className={`w-5 h-5 mr-2 ${canAnalyze ? '' : 'opacity-50'}`} />
          <span>Analyze Resume</span>
        </Button>
      </motion.div>

      {/* Validation Message */}
      {validationMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-2 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-4 py-3 rounded-lg border border-amber-200 dark:border-amber-800"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">{validationMessage}</span>
        </motion.div>
      )}

      {/* Ready State */}
      {canAnalyze && !error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-caption text-center max-w-md"
        >
          Ready to analyze! Our AI will compare your resume against the job description 
          and provide detailed insights to help you improve your match.
        </motion.p>
      )}
    </motion.div>
  )
}