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
    messages=[
        {
            "role" : "system",
            "content" : "You are a helpful assistant."
        },
        {
            "role" : "user",
            "content" : "who is virat kohali"
        }
    ]
)

print(response.choices[0].message.content)