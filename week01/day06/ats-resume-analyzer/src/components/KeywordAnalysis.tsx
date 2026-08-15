'use client'

import { motion } from 'framer-motion'
import { Key, Target, FileText, Briefcase, Code } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface KeywordAnalysisProps {
  keywords: Array<{
    keyword: string
    importance: string
    suggested_section: string
  }>
}

export default function KeywordAnalysis({ keywords }: KeywordAnalysisProps) {
  const getSectionIcon = (section: string) => {
    const sectionLower = section.toLowerCase()
    if (sectionLower.includes('skill')) return Code
    if (sectionLower.includes('experience')) return Briefcase
    if (sectionLower.includes('project')) return Target
    return FileText
  }

  const getImportanceColor = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const groupedKeywords = keywords.reduce((acc, keyword) => {
    const section = keyword.suggested_section
    if (!acc[section]) {
      acc[section] = []
    }
    acc[section].push(keyword)
    return acc
  }, {} as Record<string, typeof keywords>)

  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Key className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">
              Recommended Keywords
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {keywords.length} keywords to boost your ATS score
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {keywords.length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedKeywords).map(([section, sectionKeywords], sectionIndex) => {
              const SectionIcon = getSectionIcon(section)
              
              return (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.2, duration: 0.4 }}
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <SectionIcon className="w-4 h-4 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">
                      Add to {section}
                    </h4>
                    <span className="text-xs text-gray-500">
                      ({sectionKeywords.length} keywords)
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {sectionKeywords.map((keyword, index) => (
                      <motion.div
                        key={keyword.keyword}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: (sectionIndex * 0.2) + (index * 0.1), 
                          duration: 0.3 
                        }}
                        className="group"
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <Badge 
                            variant="secondary" 
                            className={`${getImportanceColor(keyword.importance)} hover:scale-105 transition-transform px-3 py-2 text-sm font-medium border cursor-pointer`}
                          >
                            {keyword.keyword}
                          </Badge>
                          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            {keyword.importance} priority
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-purple-50 border border-purple-200 rounded-xl p-4"
            >
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center space-x-2">
                <Key className="w-4 h-4" />
                <span>Keyword Optimization Tips</span>
              </h4>
              
              <div className="space-y-3 text-sm text-purple-700">
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-red-600">High Priority:</span>
                  <span>These are essential keywords mentioned in job requirements. Include them naturally in your resume.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-yellow-600">Medium Priority:</span>
                  <span>Important skills that would strengthen your application. Add if you have experience.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-blue-600">Low Priority:</span>
                  <span>Nice-to-have skills that could give you an edge over other candidates.</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                <p className="text-sm text-purple-800 font-medium">
                  💡 Pro Tip: Only add keywords for skills you actually possess. 
                  Be prepared to discuss any skill mentioned in your resume during interviews.
                </p>
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">
                  {keywords.filter(k => k.importance.toLowerCase() === 'high').length}
                </div>
                <div className="text-xs text-red-700">High Priority</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">
                  {keywords.filter(k => k.importance.toLowerCase() === 'medium').length}
                </div>
                <div className="text-xs text-yellow-700">Medium Priority</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {keywords.filter(k => k.importance.toLowerCase() === 'low').length}
                </div>
                <div className="text-xs text-blue-700">Low Priority</div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Your resume already contains all the important keywords from the job description.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}