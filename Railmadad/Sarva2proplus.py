import streamlit as st
import os
import pandas as pd
import re
from dotenv import load_dotenv
import google.generativeai as genai
from fuzzywuzzy import process  # or use from rapidfuzz import process if you prefer rapidfuzz

# Load environment variables from .env file
load_dotenv()

# Configure the Google Gemini API key (either load from .env or directly here)
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Load Gemini Pro model and initiate chat
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

def get_gemini_response(question):
    """Function to get a response from the Gemini model."""
    response = chat.send_message(question, stream=True)
    return response

# Initialize Streamlit app
st.set_page_config(page_title='Q&A Demo')

st.header("SarvavyAPI")

# Initialize session state variables
if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = []
if 'mode' not in st.session_state:
    st.session_state['mode'] = 'welcome'
if 'selected_category' not in st.session_state:
    st.session_state['selected_category'] = None
if 'selected_subcategory' not in st.session_state:
    st.session_state['selected_subcategory'] = None

# Load datasets from Excel files
emergency_data = pd.read_excel('crazyhogya.xlsx')
complaint_data = pd.read_excel('CatsandDogs.xlsx')

# Combine datasets for NLP categorization
combined_data = pd.concat([emergency_data, complaint_data])

# Welcome screen with options
if st.session_state['mode'] == 'welcome':
    st.write("Welcome! Please choose an option:")
    if st.button("Emergency Service"):
        st.session_state['mode'] = 'emergency'
    if st.button("Complaint"):
        st.session_state['mode'] = 'complaint'

# Handle user input for direct issue description
if st.session_state['mode'] == 'welcome':
    st.write("Or directly describe your issue:")
    user_input = st.text_input("Describe your issue:")
    
    if user_input:
        response = get_gemini_response(user_input)
        st.write("AI Response:", response)
        
        def categorize_input_with_gemini(input_text, data):
            """Categorize input based on dataset and fuzzy matching."""
            category_choices = data['Category Name'].unique()
            best_match_category, match_score_category = process.extractOne(input_text, category_choices)
            
            if match_score_category > 80:  # Set threshold for a good match
                subcategory_choices = data[data['Category Name'] == best_match_category]['Sub Category Name'].unique()
                best_match_subcategory, match_score_subcategory = process.extractOne(input_text, subcategory_choices)
                
                if match_score_subcategory > 80:  # Set threshold for a good match
                    return best_match_category, best_match_subcategory
            return "Unknown Category", "Unknown Subcategory"
        
        # Categorize the input and provide feedback
        category, subcategory = categorize_input_with_gemini(user_input, combined_data)
        if category != "Unknown Category":
            st.write(f"Predicted Category: {category}, Predicted Subcategory: {subcategory}")
            st.session_state['chat_history'].append(("Category", category))
            st.session_state['chat_history'].append(("Subcategory", subcategory))
        else:
            st.write("No matching category found. The AI will respond directly.")
            st.session_state['chat_history'].append(("You", user_input))
            st.session_state['chat_history'].append(("Bot", response))

# Emergency Service mode
if st.session_state['mode'] == 'emergency':
    st.write("You selected Emergency Service.")
    
    emergency_category = st.selectbox("Choose a category:", emergency_data['Category Name'].unique())
    emergency_subcategories = emergency_data[emergency_data['Category Name'] == emergency_category]['Sub Category Name'].unique()
    
    st.session_state['selected_category'] = emergency_category
    emergency_subcategory = st.selectbox("Choose a subcategory:", emergency_subcategories)
    st.session_state['selected_subcategory'] = emergency_subcategory
    
    st.session_state['chat_history'].append(("Category", emergency_category))
    st.session_state['chat_history'].append(("Subcategory", emergency_subcategory))
    
    emergency_input = st.text_input("Describe your emergency:")
    if emergency_input:
        category, subcategory = categorize_input_with_gemini(emergency_input, emergency_data)
        st.write(f"Category: {category}, Subcategory: {subcategory}")
        st.session_state['chat_history'].append(("You", emergency_input))
        st.session_state['chat_history'].append(("Bot", f"Category: {category}, Subcategory: {subcategory}"))

# Complaint mode
if st.session_state['mode'] == 'complaint':
    st.write("You selected Complaint.")
    
    complaint_category = st.selectbox("Choose a category:", complaint_data['Category Name'].unique())
    complaint_subcategories = complaint_data[complaint_data['Category Name'] == complaint_category]['Sub Category Name'].unique()
    
    st.session_state['selected_category'] = complaint_category
    complaint_subcategory = st.selectbox("Choose a subcategory:", complaint_subcategories)
    st.session_state['selected_subcategory'] = complaint_subcategory
    
    st.session_state['chat_history'].append(("Category", complaint_category))
    st.session_state['chat_history'].append(("Subcategory", complaint_subcategory))
    
    complaint_input = st.text_input("Describe your complaint:")
    if complaint_input:
        category, subcategory = categorize_input_with_gemini(complaint_input, complaint_data)
        st.write(f"Category: {category}, Subcategory: {subcategory}")
        st.session_state['chat_history'].append(("You", complaint_input))
        st.session_state['chat_history'].append(("Bot", f"Category: {category}, Subcategory: {subcategory}"))

# Display chat history
st.subheader("Chat History")
for role, text in st.session_state['chat_history']:
    st.write(f"{role}: {text}")

# End chat and save history
if st.button("End Chat and Save"):
    with open("chat_history.txt", "a") as file:
        file.write("\n".join([f"{role}: {text}" for role, text in st.session_state['chat_history']]))
        file.write("\n---\n")
    st.write("Chat history saved successfully!")
    st.session_state['chat_history'] = []  # Clear chat history after saving
