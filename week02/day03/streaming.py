import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

my_api_key=os.getenv("GROQ_API_KEY")
if not my_api_key:
    raise ValueError("Api key kah ahai bhai")

client=Groq(api_key=my_api_key)
model="openai/gpt-oss-120b",
prompt="Explainhow Internet work"


message={
    "role":"user",
    "content":prompt
}

message=[message]
# without streaming
response=client.chat.completions.create(messages=message,model=model)
answer=response.choices[0]
print(answer)

# streaming

streaming=client.chat.completions.create(messages=message,model=model ,stream=True)

for chunk in streaming:
    content=chunk.choice[0].delta.content
    if content:
        print(content,end="",flush=True)