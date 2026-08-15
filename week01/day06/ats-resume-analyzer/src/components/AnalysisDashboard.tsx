'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnalysisResult } from '@/app/page'
import ScoreCard from '@/components/ScoreCard'
import SkillMatch from '@/components/SkillMatch'
import MissingSkills from '@/components/MissingSkills'
import ExperienceMatch from '@/components/ExperienceMatch'
import ResumeStrengths from '@/components/ResumeStrengths'
import ImprovementSuggestions from '@/components/ImprovementSuggestions'
import KeywordAnalysis from '@/components/KeywordAnalysis'
import Toast from '@/components/Toast'
import { useState } from 'react'

interface AnalysisDashboardProps {
  result: AnalysisResult
  onReset: () => void
}

export default function AnalysisDashboard({ result, onReset }: AnalysisDashboardProps) {
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    isVisible: boolean
  }>({
    message: '',
    type: 'success',
    isVisible: false
  })

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setToast({ message, type, isVisible: true })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }
  const handleDownload = async () => {
    try {
      // Generate report content
      const reportContent = generateReportContent(result)
      
      // Create and download HTML report
      const blob = new Blob([reportContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ATS_Analysis_Report_${result.candidate_name || 'Resume'}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating report:', error)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'ResumeAI ATS Analysis',
      text: `My resume received an ATS match score of ${result.score}%.`,
      url: window.location.href
    }

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData)
        showToast('Successfully shared!', 'success')
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.text} Check out your ATS analysis at ${shareData.url}`
        )
        showToast('Report link copied to clipboard!', 'success')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      showToast('Failed to share report', 'error')
    }
  }

  // Generate HTML report content
  const generateReportContent = (result: AnalysisResult): string => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResumeAI ATS Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
        .score { font-size: 3em; color: #3b82f6; font-weight: bold; }
        .section { margin-bottom: 25px; padding: 20px; background: #f8fafc; border-radius: 8px; }
        .section h3 { color: #1e40af; margin-top: 0; }
        .skills { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill { background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; }
        .missing { background: #fee2e2; color: #dc2626; }
        .breakdown { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .breakdown-item { text-align: center; padding: 15px; background: white; border-radius: 6px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>ResumeAI ATS Analysis Report</h1>
        <p><strong>Candidate:</strong> ${result.candidate_name || 'Resume Analysis'}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
    </div>

    <div class="section">
        <h2>Overall ATS Match Score</h2>
        <div class="score">${result.score}%</div>
        <p>${result.summary}</p>
    </div>

    <div class="section">
        <h3>Score Breakdown</h3>
        <div class="breakdown">
            <div class="breakdown-item">
                <h4>Skills Match</h4>
                <div style="font-size: 1.5em; color: #3b82f6;">${result.breakdown.skills_match}%</div>
            </div>
            <div class="breakdown-item">
                <h4>Experience Match</h4>
                <div style="font-size: 1.5em; color: #059669;">${result.breakdown.experience_match}%</div>
            </div>
            <div class="breakdown-item">
                <h4>Keyword Match</h4>
                <div style="font-size: 1.5em; color: #7c3aed;">${result.breakdown.keyword_match}%</div>
            </div>
            <div class="breakdown-item">
                <h4>Overall ATS</h4>
                <div style="font-size: 1.5em; color: #4f46e5;">${result.breakdown.overall_match}%</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>Matching Skills</h3>
        <div class="skills">
            ${result.skills.matching.map(skill => `<span class="skill">${skill}</span>`).join('')}
        </div>
    </div>

    <div class="section">
        <h3>Missing Skills</h3>
        <div class="skills">
            ${result.skills.missing.map(skill => `<span class="skill missing">${skill}</span>`).join('')}
        </div>
    </div>

    <div class="section">
        <h3>Experience Match</h3>
        <p><strong>Required:</strong> ${result.experience.required}</p>
        <p><strong>Candidate:</strong> ${result.experience.candidate}</p>
        <p><strong>Status:</strong> ${result.experience.status}</p>
        <p>${result.experience.explanation}</p>
    </div>

    <div class="section">
        <h3>Resume Strengths</h3>
        <ul>
            ${result.strengths.map(strength => `<li>${strength}</li>`).join('')}
        </ul>
    </div>

    <div class="section">
        <h3>Resume Gaps</h3>
        ${result.gaps.map(gap => `
            <div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #f59e0b;">
                <h4 style="margin: 0 0 5px 0;">${gap.title} (${gap.priority} Priority)</h4>
                <p style="margin: 0;">${gap.description}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h3>AI Recommendations</h3>
        ${result.recommendations.map(rec => `
            <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 6px;">
                <h4 style="margin: 0 0 5px 0; color: #dc2626;">${rec.problem}</h4>
                <p style="margin: 5px 0; font-style: italic;">${rec.why_it_matters}</p>
                <p style="margin: 5px 0 0 0; font-weight: bold; color: #059669;">Action: ${rec.action}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h3>Recommended Keywords</h3>
        ${result.recommended_keywords.map(keyword => `
            <div style="margin-bottom: 10px; padding: 10px; background: white; border-radius: 6px;">
                <strong>${keyword.keyword}</strong> (${keyword.importance} importance) - Add to ${keyword.suggested_section}
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h3>Final Verdict</h3>
        <p><strong>
            ${result.score >= 80 ? '🎉 Strong Candidate Profile' : 
              result.score >= 60 ? '👍 Good Candidate Potential' : 
              '📈 Improvement Opportunities Available'}
        </strong></p>
        <p>Generated by ResumeAI - AI-Powered ATS Resume Analyzer</p>
    </div>
</body>
</html>`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onReset}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Start New Analysis</span>
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleShare}
            className="flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Results</span>
          </Button>
          <Button
            onClick={handleDownload}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </Button>
        </div>
      </motion.div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Resume Analysis
        </h1>
        <p className="text-xl text-gray-600">
          Here's how well your resume matches this job opportunity
        </p>
      </motion.div>

      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <ScoreCard result={result} />
      </motion.div>

      {/* Score Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-4 gap-6 mb-12"
      >
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Skills Match</h3>
            <div className="text-2xl font-bold text-blue-600">
              {result.breakdown.skills_match}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${result.breakdown.skills_match}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Technical skills alignment</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Experience Match</h3>
            <div className="text-2xl font-bold text-green-600">
              {result.breakdown.experience_match}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-green-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${result.breakdown.experience_match}%` }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Experience level match</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Keyword Match</h3>
            <div className="text-2xl font-bold text-purple-600">
              {result.breakdown.keyword_match}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${result.breakdown.keyword_match}%` }}
              transition={{ duration: 1, delay: 0.9 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">ATS keyword optimization</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Overall ATS</h3>
            <div className="text-2xl font-bold text-indigo-600">
              {result.breakdown.overall_match}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-indigo-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${result.breakdown.overall_match}%` }}
              transition={{ duration: 1, delay: 1.1 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">ATS compatibility score</p>
        </div>
      </motion.div>

      {/* Skills Analysis */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SkillMatch skills={result.skills.matching} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MissingSkills skills={result.skills.missing} />
        </motion.div>
      </div>

      {/* Experience Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-12"
      >
        <ExperienceMatch experience={result.experience} />
      </motion.div>

      {/* Strengths and Gaps */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <ResumeStrengths strengths={result.strengths} gaps={result.gaps} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <KeywordAnalysis keywords={result.recommended_keywords} />
        </motion.div>
      </div>

      {/* Improvement Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mb-12"
      >
        <ImprovementSuggestions recommendations={result.recommendations} />
      </motion.div>

      {/* Final Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {result.score >= 80 ? '🎉 Strong Candidate Profile' : 
           result.score >= 60 ? '👍 Good Candidate Potential' : 
           '📈 Improvement Opportunities Available'}
        </h3>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {result.summary}
        </p>
      </motion.div>
    </motion.div>
  )
}