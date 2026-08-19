# WEEK03 — Learning Log

Daily exercises and implementations for week03.

🧠 RAG — Retrieval-Augmented Generation
Simple definition

RAG is a technique where an LLM retrieves relevant information from an external knowledge source and uses that information as context to generate a more accurate and grounded response.

Normally LLM:

User Question
     ↓
    LLM
     ↓
Answer

Problem: LLM ke paas tumhare private/company/latest documents ki knowledge nahi ho sakti.

RAG:

                    ┌──────────────────┐
                    │ External Knowledge│
                    │ PDF / DB / Docs   │
                    └────────┬─────────┘
                             ↓
                         Retrieval
                             ↓
User Question ───────→ Relevant Context
                             ↓
                    ┌────────┴────────┐
                    │      LLM        │
                    └────────┬────────┘
                             ↓
                          Answer



🔥 RAG — 6 Steps, Correct & Easy Way
Overall Flow
📚 Documents / Knowledge
          ↓
1️⃣ Pre-processing
          ↓
2️⃣ Store in Vector Database
          ↓
👤 User asks a question
          ↓
3️⃣ Query Processing
          ↓
4️⃣ Find Closest / Relevant Data
          ↓
5️⃣ Add Relevant Data as Context
          ↓
6️⃣ LLM / Chatbot Generates Answer
1️⃣ Pre-processing
What happens?

Sabse pehle hum apne raw data ko RAG ke liye prepare karte hain.

Data sources:

PDF
DOCX
TXT
Website
Database
Company documents
Code files
Knowledge base
Flow
PDF / Documents
      ↓
   Load Data
      ↓
Clean Text
      ↓
   Chunking
      ↓
  Embedding
Chunking

Large document ko small meaningful pieces mein divide karte hain.

Document
   ↓
┌───────────────┐
│ Chunk 1       │
├───────────────┤
│ Chunk 2       │
├───────────────┤
│ Chunk 3       │
├───────────────┤
│ Chunk 4       │
└───────────────┘
Embedding

Har chunk ko vector mein convert karte hain.

"Employees get 20 leaves"
             ↓
      Embedding Model
             ↓
[0.21, -0.45, 0.72, ...]

So Step 1 = Prepare the knowledge.

2️⃣ Store Data in a Special Database

Tumne bola:

"Store code in a Special database"

Correct terminology:

Store embeddings and their associated text/metadata in a Vector Database.

Examples:

Pinecone
Qdrant
Chroma
FAISS
Weaviate
pgvector
Database mein kya store hota hai?
┌─────────────────────────────────────┐
│ Vector Database                     │
├─────────────────────────────────────┤
│ Vector                              │
│ Original Text / Chunk               │
│ Metadata                            │
│ Source / Page / Document ID         │
└─────────────────────────────────────┘

Example:

Vector:
[0.21, -0.45, 0.72, ...]


Text:
"Employees get 20 paid leaves."


Metadata:
{
  source: "company_policy.pdf",
  page: 10
}

So:

Step 2 = Store the prepared knowledge for fast semantic retrieval.

3️⃣ User Asks a Question

Ab user chatbot ko question deta hai.

Example:

"How many paid leaves do employees get?"

User
 ↓
Question

But system directly Vector DB mein text search nahi karta.

Question ko bhi embedding mein convert karta hai.

User Question
      ↓
Embedding Model
      ↓
Query Vector

Example:

"How many paid leaves?"
          ↓
[0.19, -0.42, 0.70, ...]

So:

Step 3 = Convert the user's question into a searchable representation.

4️⃣ Find the Closest / Relevant Data

Tumne bola:

"Finding the closest path"

Yahan path nahi bolna. Correct term hai:

Similarity Search

Question ka vector Vector Database mein stored vectors ke saath compare hota hai.

Query Vector
     ↓
Vector Database
     ↓
Similarity Search
     ↓
Most Relevant Chunks

Example:

Question
   ↓
Query Vector
   ↓
┌──────────────────────────────┐
│ Vector Database              │
│                              │
│ Chunk A → 95% ✅             │
│ Chunk B → 87%                │
│ Chunk C → 64%                │
│ Chunk D → 31%                │
└──────────────────────────────┘

System top relevant chunks select karega.

This is generally based on measures such as:

Cosine similarity
Dot product
Euclidean distance

So:

Step 4 = Find the most semantically relevant information from the Vector Database.

5️⃣ Add Relevant Data to the Question

Tumne bola:

"Adding relevant data into the questions"

Conceptually correct 👍

Better terminology:

Context Augmentation

Retrieved information ko user question ke saath combine karke LLM ko diya jata hai.

Example:

Retrieved Context
Employees receive 20 paid leaves per year.
User Question
How many paid leaves do employees get?
LLM Prompt
Use the following context to answer the question.


Context:
Employees receive 20 paid leaves per year.


Question:
How many paid leaves do employees get?

So:

Relevant Data
      +
User Question
      ↓
Augmented Prompt

That's why it's called:

Retrieval-Augmented Generation

6️⃣ Chatbot Gives the Answer

Ab augmented prompt LLM ko diya jata hai.

Augmented Prompt
       ↓
      LLM
       ↓
   Final Answer

Example:

"Employees receive 20 paid leaves per year."

So:

Step 6 = LLM uses the retrieved context to generate the final answer.

🧠 Complete RAG Flow

Ab tumhare exact 6 steps ko technically correct form mein dekho:

┌─────────────────────────────────────────────┐
│              RAG PIPELINE                   │
└─────────────────────────────────────────────┘


1️⃣ PRE-PROCESSING
   Documents
      ↓
   Load
      ↓
   Chunk
      ↓
   Embedding
      ↓


2️⃣ VECTOR DATABASE
   Store:
   Vector + Text + Metadata
      ↓


3️⃣ USER QUERY
   User asks question
      ↓
   Query Embedding
      ↓


4️⃣ RETRIEVAL
   Similarity Search
      ↓
   Relevant Chunks
      ↓


5️⃣ AUGMENTATION
   Question + Relevant Context
      ↓
   Augmented Prompt
      ↓


6️⃣ GENERATION
   LLM
      ↓
   Final Answer
🔥 Ek Real Example

Suppose company ke paas ye document hai:

Employee Handbook.pdf

Usme likha hai:

Employees receive 20 paid leaves per year.
Sick leave is provided separately.
Step 1 — Pre-processing
PDF
 ↓
Text
 ↓
Chunks
 ↓
Embeddings
Step 2 — Store
Embeddings
 ↓
Vector DB
Step 3 — User Question
"How many paid leaves do I get?"
Step 4 — Retrieval
Question
 ↓
Query Vector
 ↓
Similarity Search
 ↓
Relevant Chunk


"Employees receive 20 paid leaves per year."
Step 5 — Augmentation
Context:
Employees receive 20 paid leaves per year.


Question:
How many paid leaves do I get?
Step 6 — Generation
LLM
 ↓
"Employees receive 20 paid leaves per year."
🎯 Interview Mein Aise Bolna

Agar interviewer kahe:

"Explain RAG in 6 steps."

Tum ye answer de sakte ho:

RAG has two major phases: indexing and querying.

Step 1 — Pre-processing: We load documents, clean the text, split it into chunks, and generate embeddings.

Step 2 — Storage: We store the embeddings along with the original chunks and metadata in a vector database.

Step 3 — User Query: When the user asks a question, the query is converted into an embedding.

Step 4 — Retrieval: We perform similarity search in the vector database to find the most relevant chunks.

Step 5 — Augmentation: The retrieved chunks are added to the user's question as context to create an augmented prompt.

Step 6 — Generation: The LLM receives the question and retrieved context and generates the final answer.

🧩 6 Keywords Yaad Rakho
Step	Keyword	Meaning
1	🧹 Pre-processing	Load → Clean → Chunk → Embed
2	🗄️ Storage	Store in Vector DB
3	❓ Query	User asks question
4	🔍 Retrieval	Similarity search
5	🧩 Augmentation	Add relevant context
6	🤖 Generation	LLM generates answer
Shortcut:

Prepare → Store → Ask → Retrieve → Augment → Generate