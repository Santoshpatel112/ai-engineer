# Day 02 — LLM Fundamentals, First LLM Call & Response Structure

Welcome to **Day 02**! Today we cover what an AI Engineer does, what an LLM actually is under the hood, and how to execute your first LLM API call while dissecting every part of the request and response structure.

---

# PART I — AI Engineering Fundamentals

## 1. What is an AI Engineer?

An **AI Engineer** is a software engineer who designs, builds, deploys, and maintains AI-powered applications. Unlike a data scientist (who focuses more on research, training from scratch, and statistics), an AI engineer turns AI models into robust, scalable, real-world software products.

### Key Skillset

| Category | Skills & Tools |
| :--- | :--- |
| **Programming** | Python, SQL |
| **Machine Learning** | Scikit-learn, TensorFlow, PyTorch |
| **Generative AI** | LLMs, Prompt Engineering, RAG, AI Agents |
| **APIs & Frameworks** | LangChain, LlamaIndex, OpenAI API, Groq SDK |
| **Cloud Platforms** | AWS, Azure, Google Cloud |
| **Databases** | PostgreSQL, MongoDB, Vector Databases (Qdrant, Chroma, Pinecone) |
| **Deployment** | Docker, Kubernetes, FastAPI |
| **Version Control** | Git and GitHub |

### What AI Engineers Build & Maintain

- Conversational chatbots and intelligent virtual assistants
- Search and recommendation engines
- Multimodal applications (text, image, speech generation)
- LLM integrations into web and mobile platforms
- Production observability, monitoring, and guardrails

---

# PART II — What is an LLM?

## 1. LLM Overview

**LLM = Large Language Model**

An LLM is an AI model trained on vast amounts of text data to understand, process, and generate human-like language.

> **Simple Definition:** An LLM is a neural network that learns statistical and semantic patterns in language to predict the most likely next token given a context.

**Example:**
- **Input:** `"The capital of India is"`
- **Model Output Prediction:** `"New Delhi"`

An LLM does not simply perform a database lookup. It utilizes learned numerical weights (parameters) to predict probabilities over a vocabulary of tokens.

---

## 2. How Does an LLM Work?

The processing pipeline follows this flow:

```
Your Text ──► Tokens ──► Embeddings ──► Transformer ──► Attention ──► Predictions ──► Output
```

### 1. Tokenization
LLMs process text as **tokens** (sub-words, words, or character chunks) rather than raw sentences.
- `"I love programming"` ──► `["I", "love", "program", "ming"]`

### 2. Embeddings
Tokens are mapped to dense numerical vectors in a high-dimensional vector space:
- `"cat"` ──► `[0.21, -0.43, 0.87, ...]`
- Words with similar semantic meanings reside closer together in vector space.

### 3. Transformer Architecture & Self-Attention
Modern LLMs use the Transformer architecture powered by **Self-Attention**.
Self-attention allows the model to compute context relationships between tokens.

*Example:* In `"Santosh went to the bank because he needed money"`, self-attention helps the model resolve that `"he"` refers to `"Santosh"`.

Transformer attention uses three vector projections:
- **Query ($Q$)**: What am I searching for?
- **Key ($K$)**: What information do I hold?
- **Value ($V$)**: What representation do I pass along?

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

### 4. Next-Token Prediction & Sampling
Given an input sequence, the model computes probability distribution scores across its vocabulary for the next token:

```
"I am going to drink a cup of ____"
  ├── tea      (40%)
  ├── coffee   (30%)
  ├── water    (15%)
  └── juice    (05%)
```
The model samples a token based on decoding parameters (temperature, top-p) and appends it to the context, repeating the process token-by-token (autoregressive generation).

---

## 3. How an LLM is Trained

```
Huge Dataset ──► Tokenization ──► Neural Network ──► Prediction ──► Compare with Ground Truth ──► Loss Calculation ──► Backpropagation ──► Update Weights (Repeat Billions of Times)
```

- **Parameters:** The learned numerical weights inside the neural network (e.g., 7B, 8B, 70B, 405B parameters).
- **Parameters** dictate how the network transforms inputs into output probability distributions.

---

## 4. LLM vs Traditional Programming

```
Traditional Programming:  [Input]  ──►  [Explicit Rules] ──►  [Output]
LLM Paradigm:             [Data]   ──►  [Training/Weights] ──►  [Prompt Input] ──► [Generated Output]
```

---

## 5. AI Taxonomy Hierarchy

```
Artificial Intelligence (AI)
└── Machine Learning (ML)
    └── Deep Learning
        └── Neural Networks
            └── Transformer Architecture
                └── Large Language Models (LLMs)
```

---

## 6. Where RAG & Full-Stack Architecture Fit

LLMs possess static knowledge from pre-training but lack access to private enterprise databases or real-time data.

### Retrieval-Augmented Generation (RAG) Flow:

```
User Query ──► Vector Database Search ──► Relevant Docs Retrieved ──► Prompt + Docs ──► LLM ──► Grounded Response
```

### Full-Stack AI Application Architecture:

```
┌──────────────┐      HTTP      ┌──────────────┐
│   React UI   │ ─────────────► │ Node/FastAPI │
└──────────────┘                └──────┬───────┘
                                       │
                     ┌─────────────────┴─────────────────┐
                     ▼                                   ▼
          ┌────────────────────┐              ┌────────────────────┐
          │  Vector Database   │              │   LLM API Server   │
          │  (Qdrant, Chroma)  │              │ (Groq, OpenAI etc) │
          └────────────────────┘              └────────────────────┘
```

---

# PART III — Your First LLM Call & Response Structure

## 1. Goal of Day 2

Understand the mechanics of an LLM API call:
- Client-Server execution model
- Message role hierarchy (`system`, `user`, `assistant`)
- Token consumption & context window management
- Deconstructing response structures (`choices`, `message`, `usage`)
- Generation parameters (`temperature`, `top_p`, penalties, `logprobs`)

---

## 2. What is an LLM API Call?

An LLM call is an asynchronous HTTPS API request sent to an LLM provider endpoint.

```python
# Conceptual mental model
response = llm(messages, model_config)
```

Unlike deterministic functions (e.g., `add(a, b)`), an LLM API call is non-deterministic by default and generates text conditioned on context and sampling parameters.

---

## 3. The 3 Conceptual Inputs of an LLM Call

```
LLM API Call
├── 1. Messages Array (System, User, Assistant conversation history)
├── 2. Model Configuration (Model ID, Temperature, Top-p, Max Tokens)
└── 3. Client & Authentication (API Key, Base URL, Timeouts)
```

### Example SDK Invocation:
```python
client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Explain MongoDB in simple terms."}
    ],
    temperature=0.7
)
```

---

## 4. Client ──► Server ──► LLM Architecture

```
[Your Python App] ──(HTTPS Request + API Key)──► [Groq API Server] ──► [LLM Hardware/Model]
                                                                               │
[Your Python App] ◄───(Structured JSON Response)──── [Groq API Server] ◄────────┘
```

- **Client:** Your local script, FastAPI backend, or application server.
- **Server:** Provider API infrastructure handling authentication, rate limiting, and model routing.

---

## 5. API Key Security & Virtual Environment Setup

### API Keys
Never hard-code secret API keys into source code!

```python
# BAD PRACTICE
api_key = "gsk_123456789"

# RECOMMENDED PRACTICE
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
```

### Virtual Environment Isolation
```bash
# Create virtual environment
python3 -m venv .venv

# Activate
source .venv/bin/activate  # macOS / Linux
# .venv\Scripts\activate   # Windows

# Install SDKs
pip install groq python-dotenv
```

---

## 6. Message Roles (`role` & `content`)

An LLM chat completion request expects a list of message objects, each containing a `role` and `content`.

```json
[
  { "role": "system", "content": "You are a helpful programming tutor." },
  { "role": "user", "content": "What is a closure in JavaScript?" },
  { "role": "assistant", "content": "A closure is a function that retains access to its lexical scope..." },
  { "role": "user", "content": "Give me a quick code example." }
]
```

### Role Breakdown:
- **`system`**: Sets global persona, constraints, tone, and operational guidelines for the assistant.
- **`user`**: The prompt or query submitted by the end user.
- **`assistant`**: Previous responses generated by the model, allowing multi-turn conversation history.

---

## 7. Context & Context Window

### Context Definition
Context is the total collection of information sent to the model for a completion request:
$$\text{Context} = \text{System Prompt} + \text{Conversation History} + \text{Retrieved Docs (RAG)} + \text{Current Query}$$

### Context Window Limit
Models have a fixed token capacity (e.g., 8,192, 32,768, 128,000 tokens). Exceeding this limit causes API errors or truncation.

```
┌────────────────────────────────────────────────────────┐
│ TOTAL CONTEXT WINDOW                                  │
│ ┌───────────────────────┬────────────────────────────┐ │
│ │ Input Tokens (Prompt) │ Output Tokens (Completion) │ │
│ └───────────────────────┴────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## 8. End-to-End Python Code Example

Here is the complete script to execute an LLM call and parse the response:

```python
import os
from dotenv import load_dotenv
from groq import Groq

# 1. Load environment variables from .env
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY is not set in environment variables.")

# 2. Instantiate API Client
client = Groq(api_key=api_key)

# 3. Send Completion Request
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "system",
            "content": "You are a concise programming tutor."
        },
        {
            "role": "user",
            "content": "Explain what an API is in 2 sentences."
        }
    ],
    temperature=0.3
)

# 4. Extract generated answer and metadata
answer = response.choices[0].message.content
role = response.choices[0].message.role
usage = response.usage

print("--- GENERATED RESPONSE ---")
print(answer)

print("\n--- METADATA ---")
print(f"Role: {role}")
print(f"Prompt Tokens: {usage.prompt_tokens}")
print(f"Completion Tokens: {usage.completion_tokens}")
print(f"Total Tokens: {usage.total_tokens}")
```

---

## 9. Deconstructing the Response Structure

When the API returns a response, it is a structured object (or JSON):

```json
{
  "id": "chatcmpl-12345",
  "object": "chat.completion",
  "created": 1700000000,
  "model": "llama-3.3-70b-versatile",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "An API (Application Programming Interface) allows..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 30,
    "total_tokens": 55
  }
}
```

### Accessing Key Fields:
- **Generated Text:** `response.choices[0].message.content`
- **Assistant Role:** `response.choices[0].message.role`
- **Token Metrics:** `response.usage.prompt_tokens`, `response.usage.completion_tokens`, `response.usage.total_tokens`

---

## 10. Generation Parameters Reference

| Parameter | Type | Range | Description |
| :--- | :--- | :--- | :--- |
| **`temperature`** | Float | `0.0` – `2.0` | Controls sampling randomness. `0.0` is deterministic/focused; higher values increase variety. |
| **`top_p`** | Float | `0.0` – `1.0` | Nucleus sampling: considers tokens making up top $p$ cumulative probability mass. |
| **`frequency_penalty`** | Float | `-2.0` – `2.0` | Penalizes tokens based on their frequency in text so far (prevents repeating phrases). |
| **`presence_penalty`** | Float | `-2.0` – `2.0` | Penalizes tokens if they have appeared at all (encourages introducing new topics). |
| **`logprobs`** | Boolean | `true/false` | Returns log probabilities of generated tokens for confidence auditing. |

### Parameter Summary:
```
Frequency Penalty  ──► "Stop repeating the same words over and over."
Presence Penalty   ──► "Introduce new topics and vocabulary."
Temperature        ──► "Control overall randomness of sampling."
Top-p              ──► "Restrict sampling to the top cumulative probability threshold."
```

---

## 11. Logprobs & Top-logprobs

- **Log Probability (`logprob`)**: Logarithmic probability assigned to a token by the model: $\log(P(\text{token}))$.
- Because $0 \le P \le 1$, log probabilities are zero or negative.
- Higher (closer to 0) log probability = higher model confidence for that token.

*Example Token Logprobs Output:*
```
Token: "coffee"  │ Logprob: -0.51  │ Probability: ~60%
Token: "tea"     │ Logprob: -1.39  │ Probability: ~25%
```

---

## 12. Interview Q&A & Key Takeaways

### Sample Interview Question:
> **"How do you execute an LLM API call and extract the response safely in Python?"**

**Model Answer:**
> "I initialize the provider client using an API key loaded securely from environment variables. I construct a payload containing the target model ID and a list of message dictionaries with system, user, or assistant roles. I configure parameters like temperature based on whether the task demands determinism or creativity. When the SDK receives the response object, I extract the generated text from `response.choices[0].message.content` and log usage metrics from `response.usage` for monitoring costs and token latency."

---

## 🧠 Master Principles Checklist

1. [x] **API Call Mechanics**: Client ──► Provider Server ──► LLM ──► Structured Response.
2. [x] **Message Hierarchy**: `system` for instructions, `user` for queries, `assistant` for history.
3. [x] **Response Parsing**: Access text via `response.choices[0].message.content`.
4. [x] **Token & Cost Optimization**: Track `usage.prompt_tokens` vs `usage.completion_tokens`.
5. [x] **Sampling Controls**: Tune `temperature`, `top_p`, `frequency_penalty`, and `presence_penalty` for desired generation characteristics.