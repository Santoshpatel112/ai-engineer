from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
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
# chat Tmplate
chat_prompt=ChatPromptTemplate([
   ('system','you are a helpful customer support agent'),
   MessagesPlaceholder(variable_name='chat_history'),
    ('human','{query}')
])


# load chat history
chat_history=[]
with open('chat_history.txt') as f:
   chat_history.extend(
       HumanMessage(content=line.strip())
       for line in f
       if line.strip()
   )

print(chat_history)
# create Prompt
result = chat_prompt.invoke(
    {'chat_history': chat_history, 'query': "where is my refund"}
)
print(result)
