'use client'

import { motion } from 'framer-motion'
import { Target, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ImprovementSuggestionsProps {
  recommendations: Array<{
    problem: string
    why_it_matters: string
    action: string
  }>
}

export default function ImprovementSuggestions({ recommendations }: ImprovementSuggestionsProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">
              🎯 How To Improve Your Resume
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {recommendations.length} actionable recommendations to boost your score
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="space-y-6">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    {/* Problem */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <h4 className="font-semibold text-red-800">Problem</h4>
                      </div>
                      <p className="text-red-700 text-sm leading-relaxed bg-red-50 border border-red-200 rounded-lg p-3">
                        {recommendation.problem}
                      </p>
                    </div>

                    {/* Why it matters */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                        <h4 className="font-semibold text-yellow-800">Why It Matters</h4>
                      </div>
                      <p className="text-yellow-700 text-sm leading-relaxed bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        {recommendation.why_it_matters}
                      </p>
                    </div>

                    {/* Action */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <h4 className="font-semibold text-green-800">What To Do</h4>
                      </div>
                      <p className="text-green-700 text-sm leading-relaxed bg-green-50 border border-green-200 rounded-lg p-3">
                        {recommendation.action}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Summary Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: recommendations.length * 0.2 + 0.3, duration: 0.5 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-900">
                  Implementation Roadmap
                </h3>
              </div>
              
              <div className="space-y-3 text-sm text-indigo-800">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <div>
                    <strong>Start with high-impact changes:</strong> Focus on recommendations that address missing required skills first.
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div>
                    <strong>Update systematically:</strong> Work through each recommendation, updating the relevant resume sections.
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <div>
                    <strong>Re-analyze:</strong> Upload your updated resume to see how your match score improves.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Great Job!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Your resume is well-optimized for this position. The AI couldn't find any 
                major areas that need immediate improvement.
              </p>
            </motion.div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}