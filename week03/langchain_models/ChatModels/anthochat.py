import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic

env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=env_path)
load_dotenv()

api_key = os.getenv("ANTHROPIC_API_KEY")

if not api_key:
    print("⚠️  [ANTHROPIC MODEL NOTICE] ANTHROPIC_API_KEY is not configured in .env!")
else:
    try:
        chatmodel = ChatAnthropic(model="claude-3-haiku-20240307", temperature=0.5)
        result = chatmodel.invoke("give me poem in 5 line")
        print(result.content)
    except Exception as e:
        print(f"❌ Error invoking Anthropic Chat model: {e}")