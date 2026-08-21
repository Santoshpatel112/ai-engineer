from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic

load_dotenv()

chatmodel=ChatAnthropic(model="claude-sonnet-5",temperature=0.5)

result=chatmodel.invoke("give me poem in 5 line")

print(result.content)