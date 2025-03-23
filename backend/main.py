from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from utils.youtube_scraper import fetch_youtube_comments

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:5173"] for production security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and tokenizers safely
try:
    fraud_tokenizer = pickle.load(open("Spam_tokenizer2.pkl", "rb"))
    content_tokenizer = pickle.load(open("content_tokenizer2.pkl", "rb"))
    fraud_model = tf.keras.models.load_model("spam_model.h5")
    content_model = tf.keras.models.load_model("Content_model.h5")
except Exception as e:
    print(f"Error loading models or tokenizers: {e}")
    fraud_tokenizer, content_tokenizer, fraud_model, content_model = None, None, None, None

class YouTubeRequest(BaseModel):
    video_id: str

@app.post("/rate_influencer")
async def rate_influencer(request: YouTubeRequest):
    """Analyzes YouTube video comments and rates influencer credibility."""
    try:
        if not fraud_model or not content_model:
            raise HTTPException(status_code=500, detail="Model loading failed. Please check server logs.")

        print(f"Received request for video ID: {request.video_id}")

        # Fetch comments
        comments = fetch_youtube_comments(request.video_id)
        if not comments:
            raise HTTPException(status_code=404, detail="No comments found on YouTube video.")

        # Ensure tokenizers are available
        if not fraud_tokenizer or not content_tokenizer:
            raise HTTPException(status_code=500, detail="Tokenizer loading failed.")

        # Check content quality
        comments_sequences = content_tokenizer.texts_to_sequences(comments)
        comments_padded = pad_sequences(comments_sequences, maxlen=100)
        content_quality = content_model.predict(comments_padded)
        content_score = float(np.mean(content_quality))

        # Check fraud in video title/description (assuming it's passed as a comment)
        fraud_sequences = fraud_tokenizer.texts_to_sequences(comments)
        fraud_padded = pad_sequences(fraud_sequences, maxlen=100)
        fraud_predictions = fraud_model.predict(fraud_padded)
        fraud_score = float(np.mean(fraud_predictions))

        # Calculate final credibility score
        credibility_score = (0.6 * content_score) + (0.4 * (1 - fraud_score))  # Assuming less fraud is better

        # Calculate final rating between 1 and 10
        combined_score = (credibility_score + content_score + (1 - fraud_score)) / 3
        rating = round(combined_score * 10, 1)

        return {
            "platform": "youtube",
            "credibility_score": credibility_score,
            "content_score": content_score,
            "fraud_score": fraud_score,
            "rating": rating
        }

    except HTTPException as http_err:
        raise http_err  # Re-raise known HTTP exceptions

    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error. Please try again later.")
