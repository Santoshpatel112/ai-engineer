import os
from dotenv import load_dotenv
from groq import Groq

# 1. Load environment variables
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY is not set in environment variables.")

# 2. Initialize Groq client
client = Groq(api_key=api_key)

# 3. Create chat completion
response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    temperature=0.7,
    messages=[
        {
            "role": "system",
            "content": "You are an expert AI Engineer explaining LLM concepts clearly."
        },
        {
            "role": "user",
            "content": "Explain what tokens are in LLMs, why they are required, and how tokenizers work with an example."
        }
    ]
)

# 4. Output generated response
print("=== GENERATED RESPONSE ===")
print(response.choices[0].message.content)

# 5. Extract and print Token Usage metrics
print("\n=== TOKEN USAGE METRICS ===")
usage = response.usage
print(f"Input/Prompt Tokens      : {usage.prompt_tokens}")
print(f"Output/Completion Tokens : {usage.completion_tokens}")
print(f"Total Tokens Used        : {usage.total_tokens}")
