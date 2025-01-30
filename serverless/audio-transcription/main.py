import os
import json
from google.cloud import storage
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import torch
import torchaudio

# Set the bucket name from environment variable
BUCKET_NAME = os.getenv("BUCKET_NAME", "your-bucket-name")

# Load the Whisper model
model_name = "MohamedRashad/Arabic-Whisper-CodeSwitching-Edition"
processor = WhisperProcessor.from_pretrained(model_name)
model = WhisperForConditionalGeneration.from_pretrained(model_name)
model.eval()

# Initialize Google Cloud Storage client
storage_client = storage.Client()

def transcribe_audio(event, context):
    """Triggered by Pub/Sub message when a new file is uploaded to Cloud Storage."""
    
    # Extract the bucket name and file name from the event data
    bucket_name = event['bucket']
    file_name = event['name']

    # Download the file from Google Cloud Storage to a temporary location
    bucket = storage_client.bucket(bucket_name)  # Use bucket_name from event
    blob = bucket.blob(file_name)
    local_path = f"/tmp/{file_name}"
    blob.download_to_filename(local_path)

    # Load the audio file using torchaudio
    waveform, sample_rate = torchaudio.load(local_path)

    # Preprocess audio for Whisper model
    input_features = processor(waveform.numpy(), sampling_rate=16000, return_tensors="pt").input_features

    # Transcribe the audio using Whisper model
    with torch.no_grad():
        predicted_ids = model.generate(input_features)
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]

    # Save transcription result back to Google Cloud Storage as a JSON file
    transcription_blob = bucket.blob(file_name + ".json")
    transcription_blob.upload_from_string(json.dumps({"transcription": transcription}))

    print(f"Transcription saved for {file_name}")

