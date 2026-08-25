import os
from dotenv import load_dotenv, find_dotenv
import streamlit as st
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq

load_dotenv(find_dotenv())



st.header("Research Tools")
user_input=st.text_input("Enter Your Prompt")
model=ChatGroq(model="llama-3.2-70b-instruct")

if st.button("Sumrize"):
    result=model.invoke(user_input)
    st.write(result.content)
