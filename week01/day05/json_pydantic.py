import os
import json
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel

# 1. Load environment variables
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY is not set in environment variables.")

# 2. Initialize Groq client
client = Groq(api_key=api_key)

# 3. Define Pydantic model for structured output
class CustomerTicket(BaseModel):
    name: str
    email: str
    phone: str
    issue: str
    product: str

# 4. Get the JSON schema for the model
schema = CustomerTicket.model_json_schema()

# 5. Define customer complaint text
text = "Hello my name is Santosh patel my email santosh@gmail.com from delhi am buy i phone 17 pro from delhi OMAX mall after 3 day it stop working pls resolve this issue quickly contact me on 9999999999"

# 6. Create system prompt with schema
system_prompt = f"""
You are an expert at extracting customer information from complaint tickets.
Extract the following information and return ONLY valid JSON matching this schema:

{json.dumps(schema, indent=2)}

Important:
- Return ONLY the JSON object, no additional text
- If information is not available, use "Not provided"
- Ensure all fields are strings
"""

# 7. Create chat completion with structured output
response = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    temperature=0,
    response_format={"type": "json_object"},
    messages=[
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user", 
            "content": f"Extract customer information from this complaint: {text}"
        }
    ]
)

# 8. Parse and validate the response
try:
    json_response = json.loads(response.choices[0].message.content)
    
    # Validate using Pydantic model
    ticket = CustomerTicket(**json_response)
    
    print("✅ Successfully extracted customer information:")
    print("=" * 50)
    print(f"Name: {ticket.name}")
    print(f"Email: {ticket.email}")
    print(f"Phone: {ticket.phone}")
    print(f"Product: {ticket.product}")
    print(f"Issue: {ticket.issue}")
    print("=" * 50)
    
    print("\n📋 Raw JSON Output:")
    print(json.dumps(json_response, indent=2))
    
except json.JSONDecodeError as e:
    print(f"❌ JSON parsing error: {e}")
    print("Raw response:", response.choices[0].message.content)
except Exception as e:
    print(f"❌ Validation error: {e}")
    print("Raw response:", response.choices[0].message.content)