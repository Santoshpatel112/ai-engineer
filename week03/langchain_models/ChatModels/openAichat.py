from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
load_dotenv()

model=ChatOpenAI(model="gpt-5.6",temperature=0.6)

result=model.invoke("give me name of the 5 Animal")

print(result.content)