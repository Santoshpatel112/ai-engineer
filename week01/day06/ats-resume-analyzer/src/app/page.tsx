'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import JobDescriptionInput from '@/components/JobDescriptionInput'
import ResumeUploader from '@/components/ResumeUploader'
import AnalyzeButton from '@/components/AnalyzeButton'
import AnalysisLoader from '@/components/AnalysisLoader'
import AnalysisDashboard from '@/components/AnalysisDashboard'
import EmptyState from '@/components/EmptyState'
import Footer from '@/components/Footer'

export interface AnalysisResult {
  score: number
  candidate_name: string
  summary: string
  skills: {
    matching: string[]
    missing: string[]
  }
  experience: {
    required: string
    candidate: string
    status: string
    explanation: string
  }
  breakdown: {
    skills_match: number
    experience_match: number
    keyword_match: number
    overall_match: number
  }
  strengths: string[]
  gaps: Array<{
    title: string
    description: string
    priority: string
  }>
  recommendations: Array<{
    problem: string
    why_it_matters: string
    action: string
  }>
  recommended_keywords: Array<{
    keyword: string
    importance: string
    suggested_section: string
  }>
}

export default function HomePage() {
  const [jobDescription, setJobDescription] = useState('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !resumeFile) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('jobDescription', jobDescription)
      formData.append('resume', resumeFile)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const result: AnalysisResult = await response.json()
      setAnalysisResult(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      // Add user-friendly error handling
      if (errorMessage.includes('401') || errorMessage.includes('Invalid API Key')) {
        setError('Service temporarily unavailable. Please try again later.')
      } else if (errorMessage.includes('rate limit')) {
        setError('Too many requests. Please wait a moment and try again.')
      } else if (errorMessage.includes('network')) {
        setError('Network error. Please check your connection and try again.')
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setJobDescription('')
    setResumeFile(null)
    setAnalysisResult(null)
    setError(null)
  }

  const canAnalyze = jobDescription.trim().length > 0 && resumeFile !== null

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <AnalysisLoader key="loading" />
          ) : analysisResult ? (
            <AnalysisDashboard 
              key="dashboard" 
              result={analysisResult} 
              onReset={handleReset}
            />
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Hero Section - Editorial Style */}
              <section id="analyze" className="scroll-mt-20 px-6 lg:px-8">
                <div className="container mx-auto max-w-5xl">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center py-24 lg:py-32"
                  >
                    <h1 className="text-display mb-8">
                      Know how well your resume
                      <br />
                      matches the job.
                    </h1>
                    <p className="text-body-large text-muted-foreground max-w-2xl mx-auto mb-12">
                      Upload your resume, add the job description, and get an evidence-based ATS analysis.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button 
                        onClick={() => {
                          const analyzeSection = document.getElementById('analyze-interface')
                          analyzeSection?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover-lift focus-ring interactive-element"
                      >
                        Analyze Resume
                      </button>
                      <button 
                        onClick={() => scrollToSection('how-it-works')}
                        className="px-8 py-4 border border-border rounded-xl font-medium hover:bg-muted interactive-element focus-ring"
                      >
                        How It Works
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Analysis Interface */}
              <section id="analyze-interface" className="scroll-mt-20 px-6 lg:px-8 py-16 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-12"
                  >
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-title mb-4">Job Description</h2>
                        <p className="text-body text-muted-foreground mb-6">
                          Paste the complete job description you're applying for.
                        </p>
                      </div>
                      <JobDescriptionInput
                        value={jobDescription}
                        onChange={setJobDescription}
                      />
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h2 className="text-title mb-4">Your Resume</h2>
                        <p className="text-body text-muted-foreground mb-6">
                          Upload your resume in PDF or DOCX format for analysis.
                        </p>
                      </div>
                      <ResumeUploader
                        file={resumeFile}
                        onFileSelect={setResumeFile}
                      />
                    </div>
                  </motion.div>

                  {/* Analyze Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                  >
                    <AnalyzeButton
                      onAnalyze={handleAnalyze}
                      canAnalyze={canAnalyze}
                      jobDescription={jobDescription}
                      resumeFile={resumeFile}
                      error={error}
                    />
                    
                    {/* Error Display */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl"
                      >
                        <p className="text-destructive font-medium">{error}</p>
                      </motion.div>
                    )}

                    {/* Empty State */}
                    {!canAnalyze && !error && (
                      <EmptyState 
                        hasJobDescription={jobDescription.trim().length > 0}
                        hasResume={resumeFile !== null}
                      />
                    )}
                  </motion.div>
                </div>
              </section>

              {/* How It Works Section */}
              <section id="how-it-works" className="scroll-mt-20 px-6 lg:px-8 py-24">
                <div className="container mx-auto max-w-5xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                  >
                    <h2 className="text-headline mb-6">
                      How ResumeAI works
                    </h2>
                    <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                      Get your ATS compatibility report in four simple steps.
                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        number: "01",
                        title: "Paste the Job Description",
                        description: "Add the complete job description you want to apply for."
                      },
                      {
                        number: "02", 
                        title: "Upload your Resume",
                        description: "Upload your PDF or DOCX resume for analysis."
                      },
                      {
                        number: "03",
                        title: "AI compares both", 
                        description: "Our AI extracts information and compares it against job requirements."
                      },
                      {
                        number: "04",
                        title: "Get your ATS report",
                        description: "Receive your score, matching skills, gaps, and recommendations."
                      }
                    ].map((step, index) => (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="text-6xl font-light text-primary/20 mb-4">
                          {step.number}
                        </div>
                        <h3 className="text-xl font-medium mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="scroll-mt-20 px-6 lg:px-8 py-24 bg-muted/30">
                <div className="container mx-auto max-w-5xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                  >
                    <h2 className="text-headline mb-6">
                      Built for better applications.
                    </h2>
                    <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
                      ResumeAI uses AI-powered analysis to help candidates understand how well their resume matches specific job descriptions.
                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-3 gap-12">
                    {[
                      {
                        number: "01",
                        title: "Evidence-Based Analysis",
                        description: "Results are generated only from your uploaded resume and the provided job description."
                      },
                      {
                        number: "02",
                        title: "ATS Compatibility",
                        description: "Understand how well your resume matches important job requirements and keywords." 
                      },
                      {
                        number: "03",
                        title: "Actionable Recommendations",
                        description: "Get specific suggestions for improving your resume before applying."
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.number}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border rounded-2xl p-8 shadow-soft"
                      >
                        <div className="text-3xl font-light text-primary/40 mb-4">
                          {feature.number}
                        </div>
                        <h3 className="text-xl font-medium mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )

  // Helper function to scroll to sections
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}