import aiml
import os

kernel = aiml.Kernel()
BASE = os.path.dirname(os.path.abspath(__file__))
AIML_PATH = os.path.join(BASE, "basic_chat.aiml")

try:
    if os.path.exists(AIML_PATH):
        kernel.learn(AIML_PATH)
    else:
        print(f"[WARNING] AIML file not found at {AIML_PATH}")
except Exception as e:
    print(f"[ERROR] Failed to load AIML: {e}")

def get_bot_response(label):
    try:
        response = kernel.respond(label)
        if not response:
            return f"I recognized the sign for '{label}'."
        return response
    except:
        return f"Sign: {label}"
