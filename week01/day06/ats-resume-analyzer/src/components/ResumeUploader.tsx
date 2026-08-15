'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Check, File } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ResumeUploaderProps {
  file: File | null
  onFileSelect: (file: File | null) => void
}

export default function ResumeUploader({ file, onFileSelect }: ResumeUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  })

  const removeFile = () => {
    onFileSelect(null)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    return extension === 'pdf' ? File : FileText
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <AnimatePresence>
        {!file ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
              ${isDragActive && !isDragReject
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : isDragReject
                ? 'border-destructive bg-destructive/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }
            `}
          >
            <input {...getInputProps()} />
            
            <motion.div
              animate={{ 
                y: isDragActive ? -2 : 0,
                scale: isDragActive ? 1.02 : 1
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
                <Upload className={`w-8 h-8 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              
              {isDragActive ? (
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-primary">
                    Drop your resume here
                  </h3>
                  <p className="text-primary/70">We'll analyze it instantly</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">
                    Drop your resume here
                  </h3>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      or <span className="font-medium text-foreground">browse files</span>
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-caption">
                      <span>PDF, DOCX</span>
                      <span>•</span>
                      <span>Max 10MB</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
                  {(() => {
                    const Icon = getFileIcon(file.name)
                    return <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  })()}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-foreground truncate">{file.name}</h4>
                  <p className="text-caption text-muted-foreground">
                    {formatFileSize(file.size)} • Ready to analyze
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 interactive-element"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Requirements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="text-center p-4 bg-muted/50 rounded-xl">
          <FileText className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
          <h4 className="font-medium text-sm mb-1">Supported Formats</h4>
          <p className="text-caption">PDF, DOCX files</p>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-xl">
          <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
          <h4 className="font-medium text-sm mb-1">Max File Size</h4>
          <p className="text-caption">Up to 10MB</p>
        </div>
      </motion.div>
    </motion.div>
  )
}