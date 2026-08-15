# Day 05: Structured Output with JSON & Pydantic 🏗️📋

## 🎯 Learning Objectives
- Understand the importance of structured output in AI applications
- Learn to use Pydantic for data validation and schema definition
- Implement JSON-formatted responses from LLMs
- Build a customer complaint extraction system

## 🚀 Why Structured Output Matters

### The Problem with String Responses
```
User Input: "I bought an iPhone from your shop, it stopped working after 2 days. Please contact me on example@gmail.com. Regards, Santosh 91*****"

Traditional LLM Output: "The customer Santosh has an issue with their iPhone that stopped working after 2 days. You can contact them at example@gmail.com or phone 91*****."
```

**Issues with String Output:**
- ❌ Hard for computers to parse
- ❌ Inconsistent format
- ❌ Requires complex string manipulation
- ❌ Error-prone data extraction
- ❌ Not suitable for automation

### The Solution: Structured JSON Output
```json
{
  "name": "Santosh",
  "email": "example@gmail.com", 
  "phone": "91*****",
  "product": "iPhone",
  "issue": "stopped working after 2 days"
}
```

**Benefits of Structured Output:**
- ✅ Easy for computers to parse
- ✅ Consistent data format
- ✅ Direct field access (`data.name`, `data.email`)
- ✅ Perfect for automation and AI agents
- ✅ Validated data integrity

## 📊 Real-World Applications

### Business Use Cases
1. **Customer Support Automation**: Extract customer details and issues
2. **Resume Parsing**: Structure candidate information  
3. **Email Processing**: Extract key information from emails
4. **Document Analysis**: Convert unstructured text to structured data
5. **AI Agent Integration**: Provide clean data for decision-making

### Why JSON?
- **Universal Format**: Works across all programming languages
- **Human Readable**: Easy to understand and debug
- **Machine Parseable**: Direct object access
- **Industry Standard**: Used by APIs worldwide
- **Lightweight**: Minimal overhead

## 🛠️ Technical Implementation

### Method 1: Basic JSON Output
```python
# Simple approach - request JSON format
response = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    response_format={"type": "json_object"},  # Force JSON output
    messages=[
        {"role": "system", "content": "Return response in JSON format"},
        {"role": "user", "content": "Extract customer info: ..."}
    ]
)
```

### Method 2: Pydantic Schema Validation
```python
from pydantic import BaseModel

class CustomerTicket(BaseModel):
    name: str
    email: str
    phone: str
    issue: str
    product: str

# Generate schema and validate response
schema = CustomerTicket.model_json_schema()
validated_data = CustomerTicket(**json_response)
```

## 🏗️ Project Structure

### Core Components

#### 1. **Pydantic Models** 📐
```python
class CustomerTicket(BaseModel):
    name: str
    email: str  
    phone: str
    issue: str
    product: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Santosh Patel",
                "email": "santosh@gmail.com",
                "phone": "9999999999",
                "issue": "Phone stopped working",
                "product": "iPhone 17 Pro"
            }
        }
```

#### 2. **LLM Integration** 🤖
```python
def extract_customer_info(complaint_text: str) -> CustomerTicket:
    """Extract structured customer information from complaint text"""
    
    system_prompt = f"""
    You are an expert at extracting customer information.
    Return ONLY valid JSON matching this schema:
    {json.dumps(schema, indent=2)}
    """
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        temperature=0,  # Consistent results
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Extract info from: {complaint_text}"}
        ]
    )
    
    return CustomerTicket(**json.loads(response.choices[0].message.content))
```

#### 3. **Error Handling & Validation** ⚡
```python
try:
    # Parse JSON response
    json_data = json.loads(response.choices[0].message.content)
    
    # Validate with Pydantic
    ticket = CustomerTicket(**json_data)
    
    # Success - use validated data
    print(f"Customer: {ticket.name}")
    print(f"Issue: {ticket.issue}")
    
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
except ValidationError as e:
    print(f"Data validation failed: {e}")
```

## 💡 Key Concepts

### Schema-Driven Development
1. **Define Structure First**: Create Pydantic models
2. **Generate Schema**: Use `model_json_schema()`
3. **Instruct LLM**: Include schema in system prompt
4. **Validate Output**: Parse and validate with Pydantic

### Best Practices
- **Temperature = 0**: For consistent structured output
- **Clear Instructions**: Specify "JSON only" in prompts
- **Schema Documentation**: Include examples in prompts
- **Error Handling**: Always validate JSON parsing
- **Field Validation**: Use Pydantic validators for complex rules

## 🎯 Assignment: Customer Support Ticket Extractor

### Requirements
Build a system that processes customer complaints and extracts:
- Customer name
- Contact email
- Phone number  
- Product mentioned
- Issue description

### Input Example
```
"Hello my name is Santosh Patel my email santosh@gmail.com from Delhi. I bought iPhone 17 Pro from Delhi OMAX mall. After 3 days it stopped working. Please resolve this issue quickly. Contact me on 9999999999"
```

### Expected Output
```json
{
  "name": "Santosh Patel",
  "email": "santosh@gmail.com",
  "phone": "9999999999", 
  "product": "iPhone 17 Pro",
  "issue": "iPhone stopped working after 3 days"
}
```

## 🔧 Implementation Steps

### Step 1: Setup Environment
```bash
pip install groq python-dotenv pydantic
```

### Step 2: Create Pydantic Model
```python
from pydantic import BaseModel, validator

class CustomerTicket(BaseModel):
    name: str
    email: str
    phone: str
    issue: str
    product: str
    
    @validator('email')
    def validate_email(cls, v):
        if '@' not in v:
            raise ValueError('Invalid email format')
        return v
```

### Step 3: Build LLM Integration
- Configure Groq client
- Create system prompt with schema
- Set `response_format={"type": "json_object"}`

### Step 4: Add Validation & Error Handling
- JSON parsing validation
- Pydantic model validation
- User-friendly error messages

### Step 5: Test with Real Data
- Multiple complaint formats
- Edge cases (missing information)
- Various product types

## 📈 Advanced Features (Optional)

### 1. **Multiple Schema Support**
```python
class ProductIssue(BaseModel):
    category: Literal["hardware", "software", "warranty"]
    severity: Literal["low", "medium", "high", "critical"]
    
class EnhancedTicket(CustomerTicket):
    issue_details: ProductIssue
    timestamp: datetime
    priority: int
```

### 2. **Batch Processing**
```python
def process_multiple_tickets(complaints: List[str]) -> List[CustomerTicket]:
    """Process multiple complaints in batch"""
    results = []
    for complaint in complaints:
        try:
            ticket = extract_customer_info(complaint)
            results.append(ticket)
        except Exception as e:
            print(f"Failed to process: {e}")
    return results
```

### 3. **Data Export**
```python
def export_to_csv(tickets: List[CustomerTicket], filename: str):
    """Export tickets to CSV for analysis"""
    df = pd.DataFrame([ticket.dict() for ticket in tickets])
    df.to_csv(filename, index=False)
```

## 🏆 Success Metrics
- ✅ Extract 5 fields correctly from customer complaints
- ✅ Handle various complaint formats
- ✅ Validate JSON output structure
- ✅ Process complaints in under 2 seconds
- ✅ Handle errors gracefully

## 🔄 Real-World Impact

### Before Structured Output
```
"Customer Santosh from Delhi has iPhone issue..."
↓ (Manual parsing required)
- Name: ??? 
- Email: ???
- Issue: ???
```

### After Structured Output  
```json
{"name": "Santosh Patel", "email": "santosh@gmail.com", "issue": "..."}
↓ (Direct field access)
customer.name → "Santosh Patel"
customer.email → "santosh@gmail.com" 
```

## 📚 Key Takeaways
1. **Structured output is essential** for AI automation
2. **JSON + Pydantic** = Powerful data validation
3. **Schema-first approach** ensures consistency
4. **Error handling** is crucial for production systems
5. **Temperature = 0** for consistent structured responses

---

**Next**: Day 06 - Build a complete Resume Evaluator using these structured output concepts! 🚀

