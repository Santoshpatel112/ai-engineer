import os
import sys
import logging
import warnings
from pathlib import Path
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

warnings.filterwarnings("ignore")
logging.disable(logging.WARNING)

env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=env_path)
load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("Google_API_KEY") or os.getenv("GenAi_API_KEY")

if not api_key:
    print("⚠️  [GEMINI MODEL NOTICE] GOOGLE_API_KEY is not configured in .env!")
else:
    try:
        model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=api_key,
            temperature=0.7
        )
        result = model.invoke("Give me the names of five Indian children.")
        print(result.content)
    except Exception as e:
        print(f"❌ Error invoking Gemini Chat model: {e}")


