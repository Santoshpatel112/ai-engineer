import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint

env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=env_path)
load_dotenv()

hf_token = os.getenv("HUGGINGFACEHUB_API_TOKEN") or os.getenv("HUGGINGFACEHUB_ACESS_TOKEN")

llm=HuggingFaceEndpoint(
    repo_id="ornith-ai/Ornith-1.5-35B-A3B",
    huggingfacehub_api_token=hf_token,
    task="text-generation"
)

chatmodel=ChatHuggingFace(llm=llm)

result=chatmodel.invoke("who is the prime minister of india?")

print(result.content)
