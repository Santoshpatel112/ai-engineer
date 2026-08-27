from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
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


chat_history=[
    SystemMessage(content="You are a helpful Ai Assistent ")
]

while True:
    user_input=input('You : ')
    chat_history.append(HumanMessage(content=user_input))
    if user_input.lower()=='exit':
        break
    print('AI : ', end="", flush=True)
    for chunk in model.stream(chat_history):
        print(chunk.content, end="", flush=True)
        chat_history.append(AIMessage(content=chunk.content))
    print()