import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_xai import ChatXAI

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

llm = ChatXAI(
	model="grok-4.6",
	api_key=os.getenv("ChatXAI_API_KEY"),
)

result = llm.invoke("What is the capital of India?")
print(result)
