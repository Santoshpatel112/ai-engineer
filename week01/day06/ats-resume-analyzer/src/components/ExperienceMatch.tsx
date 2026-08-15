'use client'

import { motion } from 'framer-motion'
import { Briefcase, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ExperienceMatchProps {
  experience: {
    required: string
    candidate: string
    status: string
    explanation: string
  }
}

export default function ExperienceMatch({ experience }: ExperienceMatchProps) {
  const getStatusInfo = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes('meets') || statusLower.includes('exceeds')) {
      return { 
        icon: CheckCircle2, 
        color: 'text-green-600', 
        bgColor: 'bg-green-50', 
        borderColor: 'border-green-200',
        progress: 100
      }
    }
    if (statusLower.includes('partial')) {
      return { 
        icon: Clock, 
        color: 'text-yellow-600', 
        bgColor: 'bg-yellow-50', 
        borderColor: 'border-yellow-200',
        progress: 60
      }
    }
    return { 
      icon: AlertTriangle, 
      color: 'text-red-600', 
      bgColor: 'bg-red-50', 
      borderColor: 'border-red-200',
      progress: 20
    }
  }

  const statusInfo = getStatusInfo(experience.status)
  const StatusIcon = statusInfo.icon

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">
              Experience Analysis
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              How your experience matches the job requirements
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Experience Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Required Experience</h4>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-gray-600" />
              <span className="text-lg font-medium text-gray-800">{experience.required}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Your Experience</h4>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span className="text-lg font-medium text-blue-800">{experience.candidate}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-xl p-6`}
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 ${statusInfo.bgColor} rounded-xl flex items-center justify-center border ${statusInfo.borderColor}`}>
              <StatusIcon className={`w-6 h-6 ${statusInfo.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-semibold ${statusInfo.color}`}>
                  {experience.status}
                </h4>
                <span className={`text-sm font-medium ${statusInfo.color}`}>
                  {statusInfo.progress}% Match
                </span>
              </div>
              
              <Progress 
                value={statusInfo.progress} 
                className="mb-4"
              />
              
              <p className={`text-sm ${statusInfo.color.replace('600', '700')} leading-relaxed`}>
                {experience.explanation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recommendations based on status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-indigo-50 border border-indigo-200 rounded-xl p-4"
        >
          <h4 className="font-semibold text-indigo-800 mb-3 flex items-center space-x-2">
            <span>💡</span>
            <span>Experience Tips</span>
          </h4>
          
          <div className="space-y-3 text-sm text-indigo-700">
            {experience.status.toLowerCase().includes('meets') ? (
              <>
                <p>✅ Your experience level aligns well with the job requirements.</p>
                <p>🎯 Highlight specific achievements and quantifiable results from your experience.</p>
                <p>📈 Consider mentioning leadership or mentorship roles to stand out.</p>
              </>
            ) : experience.status.toLowerCase().includes('partial') ? (
              <>
                <p>⚡ You're close to meeting the experience requirements.</p>
                <p>🔍 Emphasize relevant projects, internships, or freelance work that adds to your experience.</p>
                <p>📚 Consider highlighting transferable skills from other roles or industries.</p>
              </>
            ) : (
              <>
                <p>🎯 Focus on highlighting the quality and relevance of your existing experience.</p>
                <p>📚 Emphasize rapid learning ability and passion for growth in your field.</p>
                <p>🤝 Consider mentioning any relevant side projects, certifications, or volunteer work.</p>
              </>
            )}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}