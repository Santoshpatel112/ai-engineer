'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t border-border bg-muted/30 mt-32"
    >
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-medium text-foreground mb-2">ResumeAI</h3>
            <p className="text-caption max-w-md">
              AI-powered resume analysis to help you understand how well your resume matches specific job descriptions.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-caption">
            Built with AI technology
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-caption max-w-3xl mx-auto">
            This tool analyzes resumes based on job descriptions. Results are for guidance only and should not be the sole basis for hiring decisions.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}