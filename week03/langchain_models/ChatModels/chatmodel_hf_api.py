import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint

env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=env_path)
load_dotenv()

hf_token = os.getenv("HUGGINGFACEHUB_API_TOKEN") or os.getenv("HUGGINGFACEHUB_ACESS_TOKEN")

if not hf_token:
    print("⚠️  [HUGGINGFACE MODEL NOTICE] HUGGINGFACEHUB_API_TOKEN is not configured in .env!")
    print("💡 Hinglish Tip: HuggingFace endpoint chalaney ke liye .env file me HUGGINGFACEHUB_API_TOKEN set karein.")
else:
    try:
        endpoint = HuggingFaceEndpoint(
            repo_id="HuggingFaceH4/zephyr-7b-beta",
            temperature=0.6,
            huggingfacehub_api_token=hf_token,
            task="text-generation"
        )
        llm = ChatHuggingFace(llm=endpoint)
        result = llm.invoke("What is the capital of India?")
        print("\n--- HuggingFace Response ---")
        print(result.content)
    except Exception as e:
        print(f"❌ Error invoking HuggingFace model: {e}")