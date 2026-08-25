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

# for chunk in model.stream("Who is Narendra Modi"):
#     print(chunk.content, end="", flush=True)




while True:
    user_input=input('You : ')
    if user_input.lower()=='exit':
        break
    response=model.invoke(user_input)
    print('AI : ' + response.content)
