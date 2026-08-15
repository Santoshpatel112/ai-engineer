'use client'

import { motion } from 'framer-motion'
import { Zap, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ResumeStrengthsProps {
  strengths: string[]
  gaps: Array<{
    title: string
    description: string
    priority: string
  }>
}

export default function ResumeStrengths({ strengths, gaps }: ResumeStrengthsProps) {
  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return { icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
      case 'medium':
        return { icon: TrendingUp, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' }
      default:
        return { icon: CheckCircle2, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
    }
  }

  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">
              Resume Analysis
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Your strengths and areas for improvement
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Strengths Section */}
        {strengths.length > 0 && (
          <div>
            <h3 className="font-semibold text-green-800 mb-4 flex items-center space-x-2">
              <span>💪</span>
              <span>Resume Strengths</span>
            </h3>
            <div className="space-y-3">
              {strengths.slice(0, 6).map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex items-start space-x-3 bg-green-50 border border-green-200 rounded-lg p-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-green-800 text-sm leading-relaxed">{strength}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Gaps Section */}
        {gaps.length > 0 && (
          <div>
            <h3 className="font-semibold text-orange-800 mb-4 flex items-center space-x-2">
              <span>⚠️</span>
              <span>Resume Gaps</span>
            </h3>
            <div className="space-y-4">
              {gaps.slice(0, 4).map((gap, index) => {
                const priorityInfo = getPriorityIcon(gap.priority)
                const PriorityIcon = priorityInfo.icon
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (strengths.length * 0.1) + (index * 0.2), duration: 0.3 }}
                    className={`${priorityInfo.bgColor} ${priorityInfo.borderColor} border rounded-lg p-4`}
                  >
                    <div className="flex items-start space-x-3">
                      <PriorityIcon className={`w-5 h-5 ${priorityInfo.color} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-semibold ${priorityInfo.color}`}>
                            {gap.title}
                          </h4>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityInfo.bgColor} ${priorityInfo.color} border ${priorityInfo.borderColor}`}>
                            {gap.priority} Priority
                          </span>
                        </div>
                        <p className={`text-sm ${priorityInfo.color.replace('600', '700')} leading-relaxed`}>
                          {gap.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Overall Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4"
        >
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Quick Assessment</span>
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-green-700">
              <strong>Strengths:</strong> {strengths.length} areas
            </div>
            <div className="text-orange-700">
              <strong>Improvements:</strong> {gaps.length} areas
            </div>
          </div>
          <p className="text-blue-700 text-sm mt-3 leading-relaxed">
            {strengths.length > gaps.length 
              ? "Your resume has a strong foundation. Focus on addressing the key gaps to maximize your potential."
              : gaps.length > strengths.length
              ? "There are several areas for improvement. Prioritize the high-priority gaps for maximum impact."
              : "You have a balanced profile with good strengths and manageable areas for improvement."}
          </p>
        </motion.div>

        {/* Empty States */}
        {strengths.length === 0 && gaps.length === 0 && (
          <div className="text-center py-8">
            <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Analysis complete. Check other sections for detailed insights.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}