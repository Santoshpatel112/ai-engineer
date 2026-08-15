'use client'

import { motion } from 'framer-motion'
import { Brain, FileText, Upload, ArrowRight } from 'lucide-react'

interface EmptyStateProps {
  hasJobDescription: boolean
  hasResume: boolean
}

export default function EmptyState({ hasJobDescription, hasResume }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="text-center py-16"
    >
      {/* Illustration */}
      <motion.div
        className="mb-8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative w-24 h-24 mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center">
            <Brain className="w-12 h-12 text-blue-600" />
          </div>
          
          {/* Floating icons */}
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <FileText className="w-4 h-4 text-green-600" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center"
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Upload className="w-4 h-4 text-purple-600" />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Ready to analyze your resume?
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Paste a Job Description and upload your Resume to get your personalized ATS score and detailed improvement suggestions.
      </p>

      {/* Steps */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 max-w-2xl mx-auto">
        <motion.div
          className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
            hasJobDescription ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            hasJobDescription ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            <FileText className={`w-4 h-4 ${hasJobDescription ? 'text-green-600' : 'text-gray-500'}`} />
          </div>
          <span className={`font-medium ${hasJobDescription ? 'text-green-700' : 'text-gray-600'}`}>
            Job Description
          </span>
          {hasJobDescription && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </motion.div>

        <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block" />

        <motion.div
          className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
            hasResume ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            hasResume ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            <Upload className={`w-4 h-4 ${hasResume ? 'text-green-600' : 'text-gray-500'}`} />
          </div>
          <span className={`font-medium ${hasResume ? 'text-green-700' : 'text-gray-600'}`}>
            Resume Upload
          </span>
          {hasResume && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </motion.div>

        <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block" />

        <motion.div
          className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
            hasJobDescription && hasResume ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            hasJobDescription && hasResume ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <Brain className={`w-4 h-4 ${hasJobDescription && hasResume ? 'text-blue-600' : 'text-gray-500'}`} />
          </div>
          <span className={`font-medium ${hasJobDescription && hasResume ? 'text-blue-700' : 'text-gray-600'}`}>
            AI Analysis
          </span>
        </motion.div>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 bg-blue-50/50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto"
      >
        <h4 className="font-semibold text-blue-800 mb-3">🚀 Pro Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <strong>Job Description:</strong> Include the complete job posting with requirements, responsibilities, and qualifications for best results.
          </div>
          <div>
            <strong>Resume Format:</strong> Both PDF and DOCX formats work perfectly. Ensure your resume is well-structured and ATS-friendly.
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}