from typing import TypedDict
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from dotenv import load_dotenv
import os
load_dotenv()
hugging_key = os.getenv("HUGGINGFACEHUB_API_TOKEN")


llm=HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.1-8B-Instruct",
    task="text-generation",
    temperature=0.9,
    huggingfacehub_api_token=hugging_key
)


model=ChatHuggingFace(llm=llm)
class Review(TypedDict):
    summery:str
    sentiment:str



structre_output=model.with_structured_output(Review)
result=structre_output.invoke("The hardware is greate but the software feels. bloted there are to many pre install app . I can't Remove but alos Ui looks Outdated Comapre to the other brand . hoping for the software update to fix this")

print(result)
print(result['summery'])
print(result['sentiment'])