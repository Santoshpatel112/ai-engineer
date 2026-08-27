import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

chatmodel = ChatOpenAI(
    model="gpt-5.5",
    api_key=os.getenv("AGENTROUTER_API_KEY"),
    base_url="https://co.agentrouter.org/v1",
    temperature=0.5
)

result = chatmodel.invoke("Give me a poem in 5 lines")

print(result.content)