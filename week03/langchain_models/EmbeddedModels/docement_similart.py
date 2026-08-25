import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import OpenAIEmbeddings
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

load_dotenv(find_dotenv())

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    print("OPENAI_API_KEY is missing or empty in your .env file!")
else:
    embedding = OpenAIEmbeddings(model="text-embedding-3-large")

    documents = [
        "What is the Capital of Paris",
        "Who is Narendra Modi",
        "Spiderman is more powerful than Hulk",
        "What is the capital of India?",
        "Who is Narendra Modi",
        "Spiderman is stronger than Hulk",
        "Who is the PM of India?"
    ]
    query = "Who is PM of India"

    doc_embeddings = embedding.embed_documents(documents)
    query_embedding = embedding.embed_query(query)

    # Compute similarity between query vector (1 x dim) and doc vectors (N x dim)
    similarity = cosine_similarity([query_embedding], doc_embeddings)[0]

    # Find index and score of highest similarity match
    index, score = sorted(list(enumerate(similarity)), key=lambda x: x[1])[-1]

    print(f"Query: {query}")
    print(f"Most Similar Document (Index {index}, Score: {score:.4f}):")
    print(f"-> {documents[index]}")