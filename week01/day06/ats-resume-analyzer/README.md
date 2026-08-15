# 🤖 AI ATS Resume Analyzer

A modern, production-quality web application that analyzes resumes against job descriptions using AI to provide detailed ATS compatibility reports.

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Analysis**: Advanced LLM technology analyzes resume content against job descriptions
- **ATS Compatibility Scoring**: Detailed scoring (0-100) based on multiple criteria
- **File Upload Support**: PDF and DOCX resume formats
- **Real-time Processing**: Instant analysis with animated progress indicators
- **Detailed Insights**: Comprehensive breakdown of skills, experience, and recommendations

### 🎨 Premium UI/UX
- **Modern Design**: Glass morphism and gradient effects
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Interactive Elements**: Drag & drop file upload, animated score displays
- **Professional Feel**: Premium SaaS-quality interface

### 📊 Analysis Features
- **Skills Matching**: Identifies matching and missing skills with priority levels
- **Experience Evaluation**: Assesses experience requirements compatibility
- **Keyword Analysis**: ATS keyword optimization recommendations
- **Resume Strengths**: AI-generated strengths and improvement areas
- **Actionable Recommendations**: Specific, concrete suggestions for improvement

## 🛠️ Technology Stack

- **Framework**: Next.js 16.3.1 with TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI/LLM**: Groq API with Llama 3.1 8B model
- **File Processing**: pdf-parse (PDF), mammoth (DOCX)
- **Drag & Drop**: react-dropzone

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Groq API key ([Get one here](https://console.groq.com/keys))

### Installation

1. **Clone the repository**:
```bash
cd /Users/santoshpatel/ai-engineer/week01/day06/ats-resume-analyzer
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env.local
# Edit .env.local and add your Groq API key
```

4. **Run the development server**:
```bash
npm run dev
```

5. **Open your browser**:
Navigate to `http://localhost:3000`

## 📱 How to Use

### 1. Enter Job Description
- Paste the complete job description in the left panel
- Include requirements, responsibilities, and qualifications
- Character count and clear/paste buttons available

### 2. Upload Resume
- Drag & drop your resume (PDF/DOCX) or click to browse
- Maximum file size: 10MB
- Supported formats: PDF, DOCX only

### 3. AI Analysis
- Click "Analyze My Resume" to start the process
- Watch the animated progress as AI processes your resume
- Real-time status updates with beautiful animations

### 4. View Results
- **Overall ATS Score**: Animated circular progress display
- **Score Breakdown**: Skills, experience, keyword, and overall compatibility
- **Skills Analysis**: Matching vs missing skills with priority levels
- **Experience Match**: Requirements compatibility assessment
- **Improvement Suggestions**: Detailed, actionable recommendations
- **Keyword Optimization**: ATS keyword suggestions by section

## 🎯 Scoring System

### Overall Score (0-100)
- **Skills Match**: 40% weight
- **Experience Level**: 25% weight  
- **Preferred Skills**: 20% weight
- **Education Match**: 15% weight

### Score Interpretation
- **90-100**: Excellent Match 🏆
- **80-89**: Strong Match ⭐
- **70-79**: Good Match 👍
- **60-69**: Moderate Match ⚠️
- **0-59**: Needs Improvement 📈

## 🔧 API Endpoints

### `POST /api/analyze`
Analyzes resume against job description
- **Input**: `multipart/form-data` with `jobDescription` and `resume` file
- **Output**: JSON with detailed analysis results

## 📊 Response Structure

```json
{
  "score": 87,
  "candidate_name": "John Doe",
  "summary": "Strong match for the position...",
  "skills": {
    "matching": ["React", "JavaScript", "Node.js"],
    "missing": ["AWS", "Docker", "PostgreSQL"]
  },
  "experience": {
    "required": "3+ years",
    "candidate": "5 years", 
    "status": "Exceeds Requirements",
    "explanation": "Candidate has sufficient experience..."
  },
  "breakdown": {
    "skills_match": 90,
    "experience_match": 85,
    "keyword_match": 80,
    "overall_match": 87
  },
  "strengths": ["Strong technical background", "Relevant project experience"],
  "gaps": [
    {
      "title": "Missing Cloud Experience",
      "description": "Job requires AWS but not mentioned in resume", 
      "priority": "High"
    }
  ],
  "recommendations": [
    {
      "problem": "Missing required skill X",
      "why_it_matters": "This skill is essential for the role",
      "action": "Add this skill to your skills section if you have experience"
    }
  ],
  "recommended_keywords": [
    {
      "keyword": "AWS",
      "importance": "High",
      "suggested_section": "Skills"
    }
  ]
}
```

## 🔒 Security & Privacy

- **No Data Storage**: Files are processed in memory only
- **Temporary Processing**: Files are automatically cleaned up after analysis
- **Environment Variables**: API keys are securely stored and never exposed to the client
- **Input Validation**: Comprehensive validation for file types, sizes, and content

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3B82F6 to #6366F1)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale (#F8FAFC to #1E293B)

### Typography
- **Headings**: Bold, large scale
- **Body**: Medium weight, readable
- **Captions**: Small, muted

### Components
- **Glass Morphism**: Semi-transparent backgrounds with blur
- **Rounded Corners**: Consistent border radius
- **Soft Shadows**: Subtle depth without harsh lines
- **Smooth Transitions**: 200-300ms ease transitions

## 🚀 Deployment

### Environment Variables Required
```bash
GROQ_API_KEY=your_groq_api_key_here
```

### Build Commands
```bash
npm run build
npm run start
```

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── page.tsx                    # Main application page
│   ├── globals.css                 # Global styles
│   └── api/analyze/route.ts        # Analysis API endpoint
├── components/
│   ├── Header.tsx                  # Application header
│   ├── JobDescriptionInput.tsx     # Job description form
│   ├── ResumeUploader.tsx         # File upload component
│   ├── AnalyzeButton.tsx          # Analysis trigger button
│   ├── AnalysisLoader.tsx         # Loading animation
│   ├── AnalysisDashboard.tsx      # Results dashboard
│   ├── ScoreCard.tsx              # Main score display
│   ├── SkillMatch.tsx             # Matching skills display
│   ├── MissingSkills.tsx          # Missing skills display
│   ├── ExperienceMatch.tsx        # Experience analysis
│   ├── ResumeStrengths.tsx        # Strengths and gaps
│   ├── KeywordAnalysis.tsx        # Keyword recommendations
│   ├── ImprovementSuggestions.tsx # Actionable recommendations
│   └── EmptyState.tsx             # Empty state display
└── components/ui/                  # shadcn/ui components
```

### Key Features Implementation
- **File Processing**: Real PDF/DOCX text extraction
- **LLM Integration**: Structured prompts with JSON schema validation
- **Error Handling**: Comprehensive error states and user feedback
- **Responsive Design**: Mobile-first approach with grid layouts
- **Animations**: Framer Motion for smooth transitions and micro-interactions

## 📈 Future Enhancements

- [ ] Batch resume processing
- [ ] Resume template suggestions  
- [ ] Multiple job description comparison
- [ ] Historical analysis tracking
- [ ] PDF report generation
- [ ] Integration with job boards
- [ ] Advanced ATS simulation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name` 
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Next.js, TypeScript, and AI**