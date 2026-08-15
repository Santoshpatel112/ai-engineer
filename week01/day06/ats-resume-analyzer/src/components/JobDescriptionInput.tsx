'use client'

import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Clipboard, X, Check } from 'lucide-react'

interface JobDescriptionInputProps {
  value: string
  onChange: (value: string) => void
}

export default function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  const [showPastedFeedback, setShowPastedFeedback] = useState(false)

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
      setShowPastedFeedback(true)
      setTimeout(() => setShowPastedFeedback(false), 2000)
    } catch (error) {
      console.error('Failed to read clipboard:', error)
    }
  }

  const handleClear = () => {
    onChange('')
  }

  const characterCount = value.length
  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="relative">
        <Textarea
          placeholder="Paste the complete job description here...

We are looking for a Senior Frontend Developer with 3+ years of experience in React, TypeScript, and modern web technologies.

Requirements:
• React.js and Next.js experience
• TypeScript and JavaScript proficiency  
• CSS frameworks (Tailwind, styled-components)
• State management (Redux, Zustand)
• Testing (Jest, Cypress)
• Version control (Git)

Qualifications:
- Bachelor's degree in Computer Science or equivalent
- 3+ years of frontend development experience
- Strong problem-solving skills
- Excellent communication skills"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[400px] resize-none bg-card border border-border rounded-xl p-6 text-base leading-relaxed focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-caption">
            {characterCount.toLocaleString()} characters • {wordCount.toLocaleString()} words
          </div>
          {characterCount > 0 && (
            <div className="flex items-center space-x-1 text-emerald-600">
              <Check className="w-3 h-3" />
              <span className="text-caption">Ready for analysis</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePaste}
            className="interactive-element focus-ring"
            disabled={showPastedFeedback}
          >
            {showPastedFeedback ? (
              <>
                <Check className="w-3 h-3 mr-1.5" />
                <span>Pasted!</span>
              </>
            ) : (
              <>
                <Clipboard className="w-3 h-3 mr-1.5" />
                <span>Paste</span>
              </>
            )}
          </Button>
          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="interactive-element focus-ring hover:border-destructive/50 hover:text-destructive"
            >
              <X className="w-3 h-3 mr-1.5" />
              <span>Clear</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}