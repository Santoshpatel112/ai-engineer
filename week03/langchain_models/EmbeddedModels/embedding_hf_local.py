from langchain_huggingface import HuggingFaceEmbeddings
from dotenv import load_dotenv, find_dotenv
import os
from pathlib import Path

envpath=Path(__file__).resolve().parent/"../.."
load_dotenv(find_dotenv(envpath))
huggging_token=os.getenv("HUGGINGFACEHUB_API_TOKEN")



embedding=HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L12-v2")

vector = embedding.embed_query("Delhi is the Capital of India")

print(vector)