# Day 04 — Tokens, Tokenization Mechanics & Token Tracking

Welcome to **Day 04**! Today we cover the fundamental atomic unit of Large Language Models: **Tokens**. You will learn why computers require tokenization, how tokenizers break text into reusable sub-words, how unknown words are handled, and how to track token usage (`prompt_tokens`, `completion_tokens`, `total_tokens`) in code.

---

# PART I — Why Do LLMs Need Tokens?

## 1. The Core Problem: Computers Only Understand Numbers

Computers and neural networks do not natively understand words, letters, or human languages. They only process binary data ($0$ and $1$) and perform numerical linear algebra calculations.

```
Human Text ────────► Tokenization (Mapping) ────────► Numerical Token IDs ────────► Neural Network (LLM)
```

To feed text into an LLM, we must convert words into numbers. But *how* should we convert text into numbers?

---

## 2. Evolution of Text-to-Number Representations

Over the history of computer science and NLP, three main approaches were tried:

```
1. Character-Level Encoding (ASCII/Unicode)
   └── High sequence length, no semantic context per character.

2. Full Word-Level Dictionary (Oxford Dictionary)
   └── Infinite vocabulary problem, fails on new words & names.

3. Sub-Word Tokenization (Modern LLM Approach)  <-- WINNER
   └── Reusable sub-word chunks, finite vocabulary, handles any word!
```

### Approach 1: Character-Level Encoding (ASCII / Unicode)
- Assign numbers to each character: `'H' = 72`, `'e' = 101`, `'l' = 108`, `'o' = 111`.
- **Drawback:** Sentences become extremely long sequences of numbers. Single characters carry almost no semantic meaning by themselves (e.g., `'t'` vs `'h'` vs `"the"`).

### Approach 2: Full Word-Level Dictionary
- Assign a unique ID to every full word in the dictionary (e.g. 600,000 words in Oxford Dictionary: `"apple" = 1042`, `"banana" = 1043`).
- **Drawbacks:**
  - **Out-of-Vocabulary (OOV) Error:** Language is infinite and dynamic! New slang, technical jargon, or custom names (e.g., `"Santosh"`, `"pratyucification"`) will fail or return unknown word errors.
  - **Memory Overhead:** Storing millions of full-word vectors requires massive memory lookup tables.

---

## 3. The Solution: Sub-Word Tokens

A **Token** is a **common, reusable chunk of text** (a word, sub-word, punctuation, or byte).

Instead of storing full words or individual characters, tokenizers scan massive datasets (the Internet) and discover the most frequently occurring character combinations.

```
Example Word: "unbelievable"
Tokenized Sub-words: ["un", "believ", "able"]
```

### Why Sub-Word Tokens Win:
1. **Finite Vocabulary Size:** Typically around $32,000$ to $128,000$ tokens.
2. **Handles Any Unseen Word:** If an LLM sees a brand new word like `"pratyucification"`, it breaks it down into familiar sub-tokens: `["praty", "uci", "fication"]`.
3. **High Efficiency:** Common words like `"the"`, `"in"`, `"Google"` are single tokens, while rare words are assembled from sub-token pieces.

---

# PART II — How Tokenizers Work

## 1. The Tokenizer Pipeline

A **Tokenizer** is a deterministic algorithm that converts raw text string into a list of integer Token IDs and vice-versa.

```
┌──────────────┐    Tokenize    ┌──────────────────┐    Lookup    ┌─────────────────────┐
│ "Hello world"│ ─────────────► │ ["Hello", "world"]│ ──────────► │ Token IDs: [15496, 995]│
└──────────────┘                └──────────────────┘              └─────────────────────┘
                                                                             │
                                                                             ▼
┌──────────────┐   Detokenize   ┌──────────────────┐  Embeddings  ┌─────────────────────┐
│ "Hello world"│ ◄───────────── │ ["Hello", "world"]│ ◄────────── │ Dense Vectors       │
└──────────────┘                └──────────────────┘              └─────────────────────┘
```

---

## 2. Common Tokenization Algorithms

Modern LLMs use variants of sub-word tokenization:

| Algorithm | Used By | Mechanics |
| :--- | :--- | :--- |
| **Byte-Pair Encoding (BPE)** | GPT-2, GPT-3, GPT-4, LLaMA | Starts with individual bytes/characters and iteratively merges the most frequent adjacent pairs. |
| **WordPiece** | BERT | Greedy longest-match search using likelihood maximization. |
| **SentencePiece / Unigram** | T5, LLaMA, Gemma | Treats input as raw byte stream without requiring pre-tokenization whitespace. |

---

## 3. Concrete Tokenization Example

Let's take a sample input string:

```
Sentence: "The tokenizer converts text into numbers."
```

| Sub-Word Token | Token ID | Type |
| :--- | :--- | :--- |
| `"The"` | `464` | Common Word |
| `" token"` | `11241` | Word Prefix (includes space) |
| `"izer"` | `2467` | Common Suffix |
| `" converts"` | `18423` | Full Word |
| `" text"` | `2420` | Full Word |
| `" into"` | `661` | Common Word |
| `" numbers"` | `3896` | Full Word |
| `"."` | `13` | Punctuation |

> **Rule of Thumb:** In English text, **1 Token $\approx$ 0.75 Words** (or 100 Tokens $\approx$ 75 Words).

---

# PART III — Token Accounting (Input vs Output vs Total Tokens)

When you make an LLM API call, the request and response are broken down into **Tokens**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          TOTAL TOKEN WINDOW                            │
├──────────────────────────────────────┬─────────────────────────────────┤
│         Prompt (Input) Tokens        │     Completion (Output) Tokens  │
│  (System prompt + User prompt +      │   (Response generated by model) │
│   Conversation History)              │                                 │
└──────────────────────────────────────┴─────────────────────────────────┘
```

---

## 1. Token Metrics Breakdown

$$\text{Total Tokens} = \text{Prompt (Input) Tokens} + \text{Completion (Output) Tokens}$$

1. **Prompt Tokens (`prompt_tokens`):**
   - The total number of tokens sent in your request.
   - Includes `system` prompt + `user` message + past `assistant` conversation history.

2. **Completion Tokens (`completion_tokens`):**
   - The number of tokens generated by the LLM in its output response.

3. **Total Tokens (`total_tokens`):**
   - The sum of prompt tokens and completion tokens.

---

## 2. Why Token Counting Matters for AI Engineers

1. **Cost & Billing:** API providers (OpenAI, Groq, Anthropic) charge per **1 Million Tokens** (Input rates are typically lower than Output generation rates).
2. **Context Window Limits:** Models have fixed context limits (e.g., 8K, 32K, 128K tokens). Exceeding this limit causes API errors.
3. **Latency & Speed:** Time to First Token (TTFT) and throughput depend on token generation length.

---

# PART IV — Hands-On Implementation (`tokens.py`)

Here is the complete Python implementation to inspect token usage using the Groq SDK:

```python
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

# 3. Send Chat Completion Request
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

# 4. Print Response Content
print("=== GENERATED RESPONSE ===")
print(response.choices[0].message.content)

# 5. Extract & Print Token Usage Metrics
print("\n=== TOKEN USAGE METRICS ===")
usage = response.usage
print(f"Input/Prompt Tokens      : {usage.prompt_tokens}")
print(f"Output/Completion Tokens : {usage.completion_tokens}")
print(f"Total Tokens Used        : {usage.total_tokens}")
```

---

## 🧠 Master Takeaways Checklist

1. [x] **Why Tokens Exist**: Computers process numbers; sub-word tokens bridge human text and neural net vectors without infinite dictionary limits.
2. [x] **Sub-Word Flexibility**: Tokenizers break complex or unseen words (`"pratyucification"`) into known sub-units.
3. [x] **Token Formula**: $\text{Total Tokens} = \text{Prompt Tokens} + \text{Completion Tokens}$.
4. [x] **SDK Inspection**: Always audit `response.usage.prompt_tokens`, `response.usage.completion_tokens`, and `response.usage.total_tokens` for production observability.
