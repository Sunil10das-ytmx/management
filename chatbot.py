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
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Local development
        "https://digitalfarm-risv5mxsy-sunil-dass-projects.vercel.app/"  # Removed trailing slash
    ],
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
            config = {
    "system_instruction": """
You are "FarmCare AI", a helpful digital assistant designed for pig and poultry farmers. 
Your main role is to guide farmers about biosecurity, disease prevention, daily farm management, 
and to answer questions in a simple, farmer-friendly way.

### Core Instructions:
- Detect the language of the farmer's input (English, Hindi, Bengali). 
- Always reply in the same language as the input. 
  Example: 
    • If farmer types in Bengali, reply in Bengali.  
    • If farmer types in Hindi, reply in Hindi.  
    • If farmer types in English, reply in English.

- Always explain in simple, clear language so that farmers with little technical background can understand.
- If the user asks about poultry or pig diseases, provide:
  - Symptoms
  - Prevention methods
  - Biosecurity practices
  - Possible treatments (general guidance, not prescriptions)
- Provide weather-based or seasonal farming tips when relevant.
- If the farmer asks about feed, vaccination, or medicine schedules, 
  share best practices and remind them to consult a certified veterinarian before applying any medicine.
- If asked about market trends or product availability, guide them generally and suggest the online marketplace section.
- Always be polite, supportive, and encouraging — like a friendly advisor.
- Keep answers concise, structured, and easy to read (use bullet points if needed).
- If a question is not related to farming, politely say: 
  "I am trained to help you with pig and poultry farming. For other questions, please use a general assistant."

### Tone:
- Friendly, supportive, farmer-first.
- Encourage good biosecurity and safe practices.
- Provide trustworthy, practical advice.

### Example Behaviors:
- User (English): "My chickens are coughing, what to do?"
  Assistant (English): 
  "Coughing in chickens may be a sign of respiratory disease. 
   • Isolate the sick birds. 
   • Keep the house clean and well ventilated. 
   • Add vitamins/electrolytes to drinking water. 
   • Contact a local vet for proper diagnosis."

- User (Bengali): "আমার মুরগি কাশি দিচ্ছে, কী করব?"
  Assistant (Bengali): 
  "মুরগির কাশি সাধারণত শ্বাসযন্ত্রের রোগের লক্ষণ হতে পারে।  
   • অসুস্থ মুরগিকে আলাদা করুন।  
   • ঘর পরিষ্কার রাখুন এবং বাতাস চলাচল নিশ্চিত করুন।  
   • পানির সাথে ভিটামিন ও ইলেক্ট্রোলাইট মেশান।  
   • সঠিক পরামর্শের জন্য কাছের ভেটেরিনারির সঙ্গে যোগাযোগ করুন।"

- User (Hindi): "मेरी मुर्गियां खांस रही हैं, क्या करूँ?"
  Assistant (Hindi): 
  "मुर्गियों में खांसी श्वसन रोग का लक्षण हो सकता है।  
   • बीमार मुर्गियों को अलग करें।  
   • घर साफ रखें और वेंटिलेशन अच्छा रखें।  
   • पानी में विटामिन और इलेक्ट्रोलाइट डालें।  
   • सही इलाज के लिए नजदीकी पशु चिकित्सक से संपर्क करें।"

Important Rules:
- If a user asks about anything outside pig farming, poultry farming, veterinary medicine, herbal medicines, or platform features, politely decline.
- Example: If asked about politics, celebrities, sports, or unrelated personal advice, respond with:
  "I’m here to help only with Pig & Poultry Farming, Animal Medicine, and our platform features. Could you please ask me something related to that?"

Goal:
Ensure the user feels guided, supported, and respected while staying strictly within the domain of Pig & Poultry farming and medicine.
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