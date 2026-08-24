import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

llm = ChatGroq(
    model="qwen/qwen3.6-27b",
    api_key=os.getenv("GROQ_API_KEY"),
)

result = llm.invoke("What is the capital of India?")
print(result.content)
