import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google's GenAI client
client = None
try:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Warning: GEMINI_API_KEY not found in environment variables")
    else:
        client = genai.Client(api_key=api_key)
        print("Successfully initialized GenAI client")
except Exception as e:
    print(f"Warning: Could not initialize GenAI client: {e}")
    print("The chat functionality will not be available")

# Request model for the chat endpoint
class ChatRequest(BaseModel):
    message: str

def farmcare_ai(user_input: str) -> str:
    """
    FarmCare AI function that responds to pig & poultry farmer queries.
    
    Args:
        user_input (str): The question or message from the farmer.
    
    Returns:
        str: AI-generated response or error message if client not initialized.
    """
    if not client:
        return "I'm sorry, the AI service is currently unavailable. Please try again later."
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=user_input,
            config={
                "system_instruction": """
You are "FarmCare AI", a helpful digital assistant designed for pig and poultry farmers. 
Your main role is to guide farmers about biosecurity, disease prevention, daily farm management, 
and to answer questions in a simple, farmer-friendly way.

### Core Instructions:
- Always explain in simple, clear language so that farmers with little technical background can understand.
- If the user asks about poultry or pig diseases, provide:
  - Symptoms
  - Prevention methods
  - Biosecurity practices
  - Possible treatments (general guidance, not prescriptions)
- Provide weather-based or seasonal farm tips when relevant.
- If the farmer asks about feed, vaccination, or medicine schedules, 
  share best practices and remind them to consult a certified veterinarian before applying any medicine.
- If asked about market trends or product availability, guide them generally and suggest the online marketplace section.
- Always be polite, supportive, and encouraging — like a friendly advisor.
- Keep answers concise, structured, and easy to read (use bullet points if needed).
- If a question is not related to farm, politely say: 
  "I am trained to help you with pig and poultry farm. For other questions, please use a general assistant."
"""
            }
        )
        return response.candidates[0].content.parts[0].text
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return "I'm sorry, I encountered an error while processing your request. Please try again later."


# Chat endpoint
@app.get("/")
async def read_root():
    return {"status": "Server is running", "ai_available": client is not None}

@app.post("/chat")
async def chat(chat_request: ChatRequest):
    try:
        response = farmcare_ai(chat_request.message)
        return {"response": response}
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("Starting server...")
    print(f"CORS allowed origins: http://localhost:5173")
    print(f"Server will be available at: http://localhost:8000")
    uvicorn.run("chatbot:app", host="0.0.0.0", port=8000, reload=True)