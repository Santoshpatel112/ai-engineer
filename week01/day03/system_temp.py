import os
from dotenv import load_dotenv
from pathlib import Path
from groq import Groq
load_dotenv()

api_key=os.getenv("GROQ_API_KEY")

if not api_key :
    raise ValueError("Api_error")

client = Groq(api_key=api_key)

response=client.chat.completions.create(
    model="openai/gpt-oss-120b",
    temperature=1,
    messages=[
        {
            "role": "system",
            "content": "You are sinor software engineer"
        },
        {
            "role": "user",
            "content": "i want to buid an application like instagram"
        }
    ]
)

print(response.choices[0].message.content)