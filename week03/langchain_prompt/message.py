from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_huggingface import ChatHuggingFace , HuggingFaceEndpoint
from dotenv import load_dotenv
import os

load_dotenv()
hf_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")

if not hf_token:
    raise RuntimeError("HUGGINGFACEHUB_API_TOKEN is not set in the environment or .env file")

llm=HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.1-8B-Instruct",
    huggingfacehub_api_token=hf_token,
    task="text-generation"
)

model=ChatHuggingFace(llm=llm)

message=[
    SystemMessage(content='Yor are helpful assistent'),
    HumanMessage(content='tell me about langchain')
]


result=model.invoke(message)
message.append(AIMessage(content=result.content))

print(message)