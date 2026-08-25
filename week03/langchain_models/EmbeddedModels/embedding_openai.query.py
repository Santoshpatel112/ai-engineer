from dotenv import load_dotenv, find_dotenv
from langchain_openai import OpenAIEmbeddings
import os
from pathlib import Path

envpath=Path(__file__).resolve().parent/"../.."
load_dotenv(find_dotenv(envpath))

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    print("OPENAI_API_KEY is missing or empty in your .env file!")
else:
    embedding = OpenAIEmbeddings(model="text-embedding-3-large", dimensions=32)
    result = embedding.embed_query("Delhi is the Capital of India")
    print(result)