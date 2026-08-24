import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# Load .env file properly from langchain_models directory
env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=env_path)
load_dotenv() # Fallback to current directory

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    print("⚠️  [OPENAI MODEL NOTICE] OPENAI_API_KEY is not configured in .env!")
else:
    try:
        model = ChatOpenAI(model="gpt-4o-mini", temperature=0.6)
        result = model.invoke("give me name of 5 Animals")
        print(result.content)
    except Exception as e:
        print(f"❌ Error invoking OpenAI Chat model: {e}")