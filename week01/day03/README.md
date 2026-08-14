# Day 03 — LLM System Roles, Personas & Temperature (Degree of Randomness)

Welcome to **Day 03**! Today we dive deep into **System Roles** and **Temperature**. You will learn how to customize an LLM's personality, control its operational constraints, and tune its sampling randomness (creativity) to suit specific real-world engineering use cases.

---

# PART I — Message Roles & System Prompting Deep Dive

## 1. The 3 Core Message Roles Recap

Every chat-based LLM API call accepts a `messages` array made of structured message objects. Each object specifies a `role` and `content`.

```
┌─────────────────────────────────────────────────────────────┐
│                    LLM MESSAGES ARRAY                       │
├───────────────┬─────────────────────────────────────────────┤
│  system       │ Sets global guidelines, persona, tone, rules│
├───────────────┼─────────────────────────────────────────────┤
│  user         │ Query/prompt submitted by the human user    │
├───────────────┼─────────────────────────────────────────────┤
│  assistant    │ Model's previous responses (history context)│
└───────────────┴─────────────────────────────────────────────┘
```

---

## 2. Understanding the System Role (`system`)

The **System Role** is the most powerful control knob for developer instructions. It establishes the baseline rules, identity, behavior, response format, and boundaries before any user input is processed.

### Why is the System Prompt Essential?
- **Identity & Persona:** Defines *who* the model is acting as (e.g., Senior Architect, Financial Advisor, Support Agent).
- **Behavioral Boundaries:** Restricts what the model *can* or *cannot* talk about (e.g., "Only answer python questions").
- **Tone & Style:** Dictates whether responses should be formal, concise, humorous, or technical.
- **Output Formatting:** Forces output into specific structures (Markdown, JSON, bullet points).

---

## 3. Real-World Analogy: Organizational Personas

Think of an LLM as a multi-talented professional. Without a system prompt, it acts as a generic generalist. By applying a system prompt, you assign a specific corporate job title and domain expertise.

| Persona / Job Role | System Prompt Example | Expected Output Behavior |
| :--- | :--- | :--- |
| **Senior Software Engineer** | `"You are a Senior Software Engineer. Provide clean, modular code with unit tests and time complexity analysis."` | Technical, structured, code-first with best practices. |
| **Solutions Architect** | `"You are a Solutions Architect. Focus on system design, security, scalability, and maintainability."` | High-level system diagrams, trade-off analysis, tech stack choices. |
| **Data Analyst** | `"You are a Data Analyst. Analyze input facts, identify patterns, and present insights objectively using tables."` | Fact-based, data-driven, analytical, tabular summaries. |
| **Casual Friend / Companion** | `"You are a supportive, warm, and friendly companion."` | Empathetic, conversational, casual language. |

---

## 4. Code Comparison: Changing Personas for the Same User Query

Given the user prompt: `"I want to build an application like Instagram."`

### Scenario A: System Role = "Senior Software Engineer"
```python
messages = [
    {"role": "system", "content": "You are a Senior Software Engineer."},
    {"role": "user", "content": "I want to build an application like Instagram."}
]
```
> **Output Focus:** Tech stack breakdown (React Native/Flutter frontend, Node.js/Go backend, PostgreSQL, AWS S3 for media storage, CDN, WebSocket for chat), architecture layers, and data schema design.

### Scenario B: System Role = "Product Manager"
```python
messages = [
    {"role": "system", "content": "You are an Agile Product Manager."},
    {"role": "user", "content": "I want to build an application like Instagram."}
]
```
> **Output Focus:** MVP feature list (User Profiles, Photo Feed, Like/Comment, Direct Messages), user stories, roadmapping phases, and target audience analytics.

---

# PART II — Temperature & Controlling LLM Randomness

## 1. What is Temperature?

**Temperature** ($\text{Temperature}$ or $T$) is a hyperparameter that controls the degree of **randomness** or **creativity** in the LLM's next-token selection process.

> **Definition:** Temperature adjusts the probability distribution over the model's vocabulary before sampling the next token.

$$\text{Probability}(w_i) = \frac{\exp(z_i / T)}{\sum_j \exp(z_j / T)}$$

Where $z_i$ represents the raw model logits (scores) for token $i$, and $T$ is the temperature parameter.

---

## 2. How LLM Predictions Work Under the Hood

LLMs are autoregressive probability engines. Given a prompt like `"Sunday, Monday, "` the model evaluates the likelihood of every word in its vocabulary for the next slot:

```
Unscaled Logits ──► Apply Temperature (T) ──► Softmax ──► Token Sampling
```

### Next Token Probabilities Example:
```
Context: "I want to drink a cup of ____"

Tokens       Raw Logits     T = 0.2 (Focused)     T = 1.0 (Balanced)     T = 1.8 (Random)
──────       ──────────     ─────────────────     ──────────────────     ────────────────
tea          4.0            75.0%                 50.0%                  28.0%
coffee       3.5            22.0%                 30.0%                  24.0%
water        2.0             2.9%                 12.0%                  18.0%
juice        1.0             0.1%                  5.0%                  15.0%
gasoline    -2.0             0.0%                  0.01%                  3.0%
```

- **Low Temperature ($T \to 0$):** Sharpens the distribution. The model almost always picks the top probability token (**Greedy Decoding** / Deterministic).
- **High Temperature ($T \gg 1$):** Flattens the distribution. Lower-probability tokens get a higher chance of being picked (**High Randomness** / Creative / Unpredictable).

---

## 3. The Temperature Scale ($0.0$ to $2.0$)

```
0.0                0.3                 0.7                 1.0                 1.5                 2.0
├─── Deterministic ───┼─── Fact-based ────┼──── Balanced ─────┼─── Creative ─────┼──── Experimental ─┤
│    (Pure Logic)     │    (Strict Data)  │    (Default Chat) │    (Storytelling) │    (Wild/Chaos)   │
```

### Breakdown by Range:

| Temperature Range | Behavior Characteristics | Ideal Use Cases |
| :--- | :--- | :--- |
| **`0.0` – `0.2`** | **Deterministic & Focused:** Minimal variance. Re-running the prompt yields nearly identical output. | Code generation, math solving, SQL query generation, JSON data extraction, legal document parsing. |
| **`0.3` – `0.6`** | **Fact-Based & Consistent:** Low randomness, highly reliable adherence to facts with slight phrasing variety. | Customer support bots, Q&A systems, technical documentation summaries, medical/financial queries. |
| **`0.7` – `1.0`** | **Balanced & Conversational:** Standard default. Good blend of accuracy and natural conversational variety. | General chatbots, email drafting, blog writing, personal assistance. |
| **`1.1` – `1.5`** | **Creative & Expressive:** High diversity of word choice, novel ideas, imaginative phrasing. | Brainstorming start-up ideas, creative writing, poetry, marketing slogans, fiction storytelling. |
| **`1.6` – `2.0`** | **Extreme Randomness:** High risk of nonsense, incoherence, or extreme hallucination. | Experimental art generation, generating non-traditional word combinations. |

---

## 4. Matching Temperature to Real-World Domain Use Cases

Choosing the right temperature depends entirely on your application domain and the cost of an incorrect or unexpected answer.

```
                  CRITICAL DOMAIN USE CASES
┌─────────────────────────────────────────────────────────────┐
│ Medical / Healthcare AI Agent                               │
│ ❌ High Creativity = Dangerous Hallucinations               │
│ ✅ Required Temp: 0.0 - 0.1 (Strict facts, verified data)  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ Media & Storytelling / Advertising Agency                   │
│ ❌ Low Temperature = Boring, repetitive, generic copy       │
│ ✅ Required Temp: 0.8 - 1.2 (Unique metaphors, catchy copy)│
└─────────────────────────────────────────────────────────────┘
```

### Practical Domain Matrix:

| Domain | Required Temperature | Reason / Risk Profile |
| :--- | :--- | :--- |
| **Healthcare / Diagnostics** | `0.0` | Zero tolerance for made-up symptoms or drug dosages. |
| **Financial / Tax Compliance** | `0.0` – `0.1` | Must calculate exact numbers and cite strict tax codes. |
| **Software Engineering / Code** | `0.1` – `0.2` | Syntax rules are rigid; invalid tokens cause compilation errors. |
| **Customer Support Agent** | `0.3` – `0.5` | Needs friendly phrasing while maintaining accurate policy facts. |
| **Marketing Copywriter** | `0.8` – `1.1` | Benefits from fresh vocabulary, punchy taglines, and creative angles. |

---

# PART III — Hands-On Code Walkthrough (`system_temp.py`)

Here is the complete reference implementation used in today's lab:

```python
import os
from dotenv import load_dotenv
from groq import Groq

# 1. Environment Setup
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is missing in environment variables.")

# 2. Initialize Groq Client
client = Groq(api_key=api_key)

# 3. Create Chat Completion with System Prompt & Temperature Tuning
response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    temperature=1.0,  # Degree of randomness (0.0 = deterministic, 1.0 = creative)
    messages=[
        {
            "role": "system",
            "content": "You are a Senior Software Engineer."
        },
        {
            "role": "user",
            "content": "I want to build an application like Instagram."
        }
    ]
)

# 4. Print Generated Response
print(response.choices[0].message.content)
```

---

## 🧠 Master Takeaways Checklist

1. [x] **System Role Purpose**: Use `system` messages to lock down AI personas, rules, and behavioral boundaries.
2. [x] **Temperature Mechanics**: Controls next-token probability distribution ($T \to 0$ for greedy deterministic outputs, $T > 1$ for creative diverse outputs).
3. [x] **Domain Alignment**: Low temp (`0.0`–`0.2`) for Code/Math/Medical; High temp (`0.8`–`1.2`) for Creative writing & Brainstorming.
4. [x] **SDK Syntax**: Pass `temperature` as a top-level parameter alongside `model` and `messages`.
