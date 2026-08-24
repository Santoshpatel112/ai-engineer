from langchain_huggingface import HuggingFacePipeline ,ChatHuggingFace
import os
from dotenv import load_dotenv
from pathlib import Path

pathenv=Path(__file__).resolve().parents[1]

load_dotenv(dotenv_path=pathenv)
load_dotenv()

llm=HuggingFacePipeline.from_model_id(
    model_id='TinyLlama/TinyLlama-1.1B-Chat-v1.0',
    task="text-generation",
    pipeline_kwargs=dict(
        temperature=0.6,
        max_new_tokens=1000
    )
    
)

model=ChatHuggingFace(llm=llm)

result=model.invoke("What is the capital of India")

print(result.content)