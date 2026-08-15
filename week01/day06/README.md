# Day 06: LLM Resume Evaluator 📄✨

## 🎯 Project Overview
Build an intelligent resume evaluation system that automatically analyzes resumes against job descriptions using LLMs and structured output. The system will extract information from both job descriptions and resumes, then provide scoring and matching analysis.

## 🚀 Features
- **Automated Resume Processing**: Extract data from PDF and DOCX files
- **Job Description Analysis**: Parse job requirements into structured format
- **AI-Powered Matching**: Score resumes based on job fit (0-100%)
- **Batch Processing**: Evaluate multiple resumes simultaneously
- **Structured Output**: JSON-based results using Pydantic models

## 📋 System Architecture

### Part 1: Job Description Processing

#### 1.1 Job Description Schema
```python
class JobDescription(BaseModel):
    role: str
    required_skills: List[str]
    preferred_skills: List[str]
    minimum_experience: int  # years
    education_required: str
    responsibilities: List[str]
    company_name: str = "Not specified"
    location: str = "Not specified"
```

#### 1.2 Job Description Extraction
- **Input**: Raw job description text
- **Process**: Use LLM to extract structured information
- **Output**: JSON object matching JobDescription schema

**System Prompt Template**:
```
You are an expert HR assistant. Extract job information from the provided job description and return it in the specified JSON schema format. Be precise and comprehensive in your extraction.
```

**User Prompt**:
```
Analyze the following job description and extract all relevant information: {job_description_text}
```

### Part 2: Resume Schema Design

#### 2.1 Experience Model
```python
class Experience(BaseModel):
    company: str
    role: str
    duration: str  # e.g., "2020-2022" or "6 months"
    description: str
    skills_used: List[str]
```

#### 2.2 Project Model
```python
class Project(BaseModel):
    name: str
    description: str
    technologies: List[str]
    duration: str
    role: str
```

#### 2.3 Resume Model
```python
class Resume(BaseModel):
    name: str
    email: str
    phone: str
    total_experience_years: float
    skills: List[str]
    experiences: List[Experience]
    projects: List[Project]
    certifications: List[str]
    education: str
    summary: str = ""
```

### Part 3: Resume File Processing

#### 3.1 File Readers
```python
def read_pdf(file_path: str) -> str:
    """Extract text from PDF resume"""
    # Implementation using PyPDF2 or pdfplumber
    pass

def read_docx(file_path: str) -> str:
    """Extract text from DOCX resume"""
    # Implementation using python-docx
    pass

def read_resume(file_path: str) -> str:
    """Universal resume reader based on file extension"""
    if file_path.endswith('.pdf'):
        return read_pdf(file_path)
    elif file_path.endswith('.docx'):
        return read_docx(file_path)
    else:
        return None
```

#### 3.2 Resume Text Processing
- **Input**: Raw resume text
- **Process**: Use LLM to extract structured information
- **Output**: JSON object matching Resume schema

### Part 4: Batch Resume Processing

#### 4.1 Folder Processing
```python
def process_resumes_folder(folder_path: str) -> List[Resume]:
    """Process all resumes in a folder"""
    resumes = []
    for file_name in os.listdir(folder_path):
        if file_name.endswith(('.pdf', '.docx')):
            file_path = os.path.join(folder_path, file_name)
            resume_text = read_resume(file_path)
            if resume_text:
                parsed_resume = parse_resume(resume_text)
                resumes.append(parsed_resume)
    return resumes
```

### Part 5: Resume Matching & Scoring

#### 5.1 Scoring Model
```python
class MatchingResult(BaseModel):
    score: float  # 0-100
    matching_skills: List[str]
    missing_skills: List[str]
    experience_match: float  # 0-1
    overall_percentage: float  # 0-100
    summary: str
    recommendations: List[str]
```

#### 5.2 Scoring Algorithm
```python
def calculate_match_score(job: JobDescription, resume: Resume) -> MatchingResult:
    """
    Calculate matching score based on:
    - Required skills match (40% weight)
    - Experience level (25% weight) 
    - Preferred skills (20% weight)
    - Education match (15% weight)
    """
    pass
```

## 🛠️ Implementation Steps

### Step 1: Setup Dependencies
```bash
pip install pydantic groq python-dotenv PyPDF2 python-docx
```

### Step 2: Create Pydantic Models
- Define all schema classes
- Add validation rules

### Step 3: Implement File Processors
- PDF text extraction
- DOCX text extraction
- Error handling

### Step 4: Build LLM Integration
- Job description parser
- Resume parser
- Structured output validation

### Step 5: Develop Scoring Engine
- Matching algorithm
- Score calculation
- Result generation

### Step 6: Create Main Application
- Batch processing
- Result ranking
- Top candidates selection

## 📊 Expected Output

```json
{
  "job_title": "Senior Python Developer",
  "total_resumes_processed": 50,
  "top_candidates": [
    {
      "name": "John Doe",
      "score": 87.5,
      "matching_skills": ["Python", "Django", "PostgreSQL"],
      "missing_skills": ["Docker", "AWS"],
      "summary": "Strong Python background with 5+ years experience"
    },
    // ... top 5 candidates
  ],
  "processing_time": "2.3 seconds"
}
```

## 🎯 Success Criteria
- ✅ Parse job descriptions with 90%+ accuracy
- ✅ Extract resume data from PDF/DOCX files
- ✅ Generate meaningful match scores
- ✅ Process batch of resumes efficiently
- ✅ Provide actionable insights for HR teams

## 🔧 Technical Requirements
- **Python 3.8+**
- **Groq API Key** (for LLM processing)
- **File Processing Libraries** (PyPDF2, python-docx)
- **Pydantic** (for data validation)
- **dotenv** (for environment management)

## 📝 Next Steps
1. Implement basic file readers
2. Create Pydantic models
3. Build LLM integration
4. Develop scoring algorithm
5. Add batch processing
6. Create user interface (optional)

---

**Note**: This project demonstrates practical application of LLMs for business automation, structured data extraction, and intelligent document processing.


