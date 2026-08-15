'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SkillMatchProps {
  skills: string[]
}

export default function SkillMatch({ skills }: SkillMatchProps) {
  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">
              Skills You Already Have
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {skills.length} matching skills found in your resume
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {skills.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {skills.slice(0, 12).map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-2 text-sm font-medium border border-green-200"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-2" />
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
            
            {skills.length > 12 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-sm text-gray-600 font-medium"
              >
                + {skills.length - 12} more skills
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6"
            >
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">
                    Great foundation!
                  </h4>
                  <p className="text-sm text-green-700">
                    You already possess {skills.length} key skills mentioned in the job description. 
                    Make sure these are prominently featured in your resume to catch the recruiter's attention.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No explicit skill matches found. Consider reviewing the job requirements 
              and updating your resume to highlight relevant technical skills.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}