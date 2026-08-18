import os
from time import sleep

from dotenv import load_dotenv
from groq import Groq


# ============================================================
# 1. Load Environment Variables
# ============================================================

load_dotenv()

my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API key Kaha hai Bhai 😄")


# ============================================================
# 2. Groq Client
# ============================================================

client = Groq(api_key=my_api_key)

model="openai/gpt-oss-120b",


# ============================================================
# 3. Job Description
# ============================================================

job_description =f"""
Role:
Software Developer / Software Engineer

Responsibilities:
- Develop, maintain, and deploy scalable web applications.
- Build frontend interfaces using React.js / Next.js.
- Develop backend services and REST APIs using Node.js / Express.js.
- Design and manage databases using MongoDB / PostgreSQL / MySQL.
- Implement authentication, authorization, and secure API workflows.
- Debug production issues and optimize application performance.
- Integrate third-party APIs and services.
- Write clean, maintainable, and reusable code.
- Use Git/GitHub for version control and collaborative development.
- Participate in code reviews, testing, deployment, and technical discussions.
- Work with cloud and deployment platforms such as AWS / Vercel.
- Understand basic system design, scalability, caching, and API architecture.

Required Skills:
- JavaScript / TypeScript
- React.js / Next.js
- Node.js / Express.js
- REST APIs
- MongoDB / PostgreSQL
- HTML5 / CSS3
- Git / GitHub
- OOP & DSA
- Authentication / JWT
- Problem-solving and debugging

Good to Have:
- Prisma ORM
- Redis
- Docker
- AWS
- System Design
- AI-assisted development
- Microservices
- Message Queues
- API Gateway
"""


# ============================================================
# 4. Resume
# ============================================================

resume =f"""
Software Developer / Full-Stack Developer with hands-on experience
in React.js, Next.js, Node.js, Express.js, TypeScript, MongoDB,
PostgreSQL, REST APIs, JWT authentication, Git, Docker, and AWS.

Built and deployed full-stack projects including AAHAAR, EasyStay,
and ByteCode, with experience in API development, database design,
authentication, payments, dashboards, and performance optimization.

Strong in DSA, problem-solving, and AI-assisted development.
"""


# ============================================================
# 5. Generic LLM Function
# ============================================================

def ask_llm(system_prompt, user_prompt):

    system_message = {
        "role": "system",
        "content": system_prompt
    }

    user_message = {
        "role": "user",
        "content": user_prompt
    }

    messages = [
        system_message,
        user_message
    ]

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0
    )

    result = response.choices[0].message.content

    return result


# ============================================================
# 6. STEP 1
# Extract Skills From Resume
# ============================================================

def extract_resume_skills():

    system_prompt =f"""
You are a professional HR assistant.

Your task is to extract skills from the candidate's resume.

Rules:
1. Extract only skills explicitly mentioned in the resume.
2. Do not invent any skills.
3. Do not assume skills based on job titles.
4. Return only the extracted skills.
"""

    user_prompt = f"""
Extract all technical skills from this resume:

--- RESUME ---

{resume}

--- END RESUME ---
"""

    return ask_llm(
        system_prompt,
        user_prompt
    )


# ============================================================
# 7. STEP 2
# Extract Skills From Job Description
# ============================================================

def extract_jd_skills():

    system_prompt =f"""
You are a professional HR assistant.

Your task is to extract the technical skills
required by the Job Description.

Rules:
1. Extract only skills explicitly mentioned in the JD.
2. Do not invent any skills.
3. Separate required skills and good-to-have skills.
4. Return the extracted skills clearly.
"""

    user_prompt = f"""
Extract all technical skills from this Job Description:

--- JOB DESCRIPTION ---

{job_description}

--- END JOB DESCRIPTION ---
"""

    return ask_llm(
        system_prompt,
        user_prompt
    )


# ============================================================
# 8. STEP 3
# Compare Candidate Skills With JD Skills
# ============================================================

def match_skills(candidate_skills, jd_skills):

    system_prompt =f"""
You are a professional technical recruiter.

Compare the candidate's skills with the skills
required by the Job Description.

Give the following:

1. Match Score between 1 and 100.
2. Matching Skills.
3. Missing Skills.
4. Candidate strengths.
5. Short conclusion:
   - FIT
   - PARTIALLY FIT
   - NOT FIT

Do not invent information.
Use only the provided candidate skills and JD skills.
"""

    user_prompt = f"""
Compare the candidate and Job Description.

--- CANDIDATE SKILLS ---

{candidate_skills}

--- JOB DESCRIPTION SKILLS ---

{jd_skills}

--- END DATA ---

Now calculate the candidate's match score
and provide the analysis.
"""

    return ask_llm(
        system_prompt,
        user_prompt
    )


# ============================================================
# 9. PROMPT CHAIN
# ============================================================

print("\n========================================")
print("STEP 1: Extracting Resume Skills")
print("========================================\n")

candidate_skills = extract_resume_skills()

print(candidate_skills)


sleep(2)


print("\n========================================")
print("STEP 2: Extracting JD Skills")
print("========================================\n")

jd_skills = extract_jd_skills()

print(jd_skills)


sleep(2)


print("\n========================================")
print("STEP 3: Matching Candidate With JD")
print("========================================\n")

score = match_skills(
    candidate_skills,
    jd_skills
)

print(score)


print("\n========================================")
print("PROMPT CHAIN COMPLETED")
print("========================================")