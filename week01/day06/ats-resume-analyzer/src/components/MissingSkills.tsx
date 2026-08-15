'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Target, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MissingSkillsProps {
  skills: string[]
}

const getPriorityInfo = (index: number, total: number) => {
  const ratio = index / total
  if (ratio <= 0.3) return { label: 'High Priority', color: 'bg-red-100 text-red-800 border-red-200' }
  if (ratio <= 0.6) return { label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
  return { label: 'Low Priority', color: 'bg-blue-100 text-blue-800 border-blue-200' }
}

export default function MissingSkills({ skills }: MissingSkillsProps) {
  const highPrioritySkills = skills.slice(0, Math.ceil(skills.length * 0.3))
  const mediumPrioritySkills = skills.slice(Math.ceil(skills.length * 0.3), Math.ceil(skills.length * 0.6))
  const lowPrioritySkills = skills.slice(Math.ceil(skills.length * 0.6))

  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">
              Skills Missing From Your Resume
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {skills.length} skills could strengthen your application
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {skills.length > 0 ? (
          <div className="space-y-6">
            {/* High Priority Skills */}
            {highPrioritySkills.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="w-4 h-4 text-red-600" />
                  <h4 className="font-semibold text-red-800">High Priority</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {highPrioritySkills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-2 text-sm font-medium border border-red-200"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Medium Priority Skills */}
            {mediumPrioritySkills.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-800">Medium Priority</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mediumPrioritySkills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (highPrioritySkills.length + index) * 0.1, duration: 0.3 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-2 text-sm font-medium border border-yellow-200"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Low Priority Skills */}
            {lowPrioritySkills.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                  <h4 className="font-semibold text-blue-800">Nice to Have</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lowPrioritySkills.slice(0, 8).map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (highPrioritySkills.length + mediumPrioritySkills.length + index) * 0.1, duration: 0.3 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-2 text-sm font-medium border border-blue-200"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                {lowPrioritySkills.length > 8 && (
                  <p className="text-sm text-gray-600 mt-2">
                    + {lowPrioritySkills.length - 8} more skills
                  </p>
                )}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6"
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-800 mb-1">
                    Focus on High Priority Skills
                  </h4>
                  <p className="text-sm text-orange-700">
                    Start with the high-priority skills to maximize your impact. 
                    These are typically required qualifications that could significantly 
                    improve your match score and chances of getting an interview.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Great! Your resume covers all the key skills mentioned in the job description.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}