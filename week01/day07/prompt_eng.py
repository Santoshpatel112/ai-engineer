import os
from dotenv import load_dotenv
from pathlib import Path
from groq import Groq
load_dotenv()

api_key=os.getenv("GROQ_API_KEY")

if not api_key :
    raise ValueError("Api_error")

client = Groq(api_key=api_key)
model="openai/gpt-oss-120b"

def llmanswer(prompt):
    message ={
        "role" :"user",
        "content":prompt
    }

    message=[message]

    response=client.chat.completions(model=model,messge=message)
    ans=response.choice[0].message.content
    return ans



bad_prompt="""
#Role : You are a support assistent
#task : what is the issue
#constrainet: you have to callisfy problem
#fallback : any  other issue fallback rturn question unreleted category then return
#output: your output in one word one of thr category given in constrainet
this is a user comaplain
#Example:.................
my laptop is not working
handle this
you have to callsify issue in  the laptop
"""

print(llmanswer(bad_prompt))


