from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
import os
load_dotenv()
hugging_key = os.getenv("HUGGINGFACEHUB_API_TOKEN")



llm=HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.1-8B-Instruct",
    task="text-generation",
    temperature=0.9,
    huggingfacehub_api_token=hugging_key
)

chat_prompt=ChatPromptTemplate([
   ('system','you are a helpful {domain} expert'),
    ('human','explain in a better way what is {topic}')
])


result=chat_prompt.invoke({'domain':'cricket','topic':'dusra'})

print(result)