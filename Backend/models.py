import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API Key from .env
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

# Configure API Key
genai.configure(api_key=API_KEY)

# List available models
models = genai.list_models()
for model in models:
    print(model.name)
