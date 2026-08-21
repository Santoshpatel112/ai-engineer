import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

model = ChatGoogleGenerativeAI(
	model="gemini-2.5-flash",
	api_key=os.getenv("GenAi_API_KEY"),
)

result = model.invoke("Give me the names of five Indian children.")

print(result)
