import torchaudio
import torch
from transformers import WhisperForConditionalGeneration, WhisperProcessor

# Load the model and processor
model_name = "MohamedRashad/Arabic-Whisper-CodeSwitching-Edition"
processor = WhisperProcessor.from_pretrained(model_name)
model = WhisperForConditionalGeneration.from_pretrained(model_name)
model.eval()

# Function to load and convert WAV file
def load_audio(file_path):
    waveform, sample_rate = torchaudio.load(file_path)

    # Convert to 16kHz if needed
    if sample_rate != 16000:
        waveform = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)(waveform)

    # Convert stereo to mono if needed
    if waveform.shape[0] > 1:
        waveform = waveform.mean(dim=0, keepdim=True)

    return waveform.squeeze(0), 16000  # Return 1D tensor

# Function to transcribe in chunks
def transcribe_in_chunks(waveform, processor, model, chunk_size=30):
    # Split the waveform into chunks (each chunk will be 30 seconds long)
    num_chunks = waveform.size(0) // (chunk_size * 16000) + 1
    transcriptions = []

    for i in range(num_chunks):
        start = i * chunk_size * 16000
        end = (i + 1) * chunk_size * 16000
        chunk = waveform[start:end]

        # Preprocess audio for Whisper
        input_features = processor(chunk.numpy(), sampling_rate=16000, return_tensors="pt").input_features

        # Transcribe using the model
        with torch.no_grad():
            predicted_ids = model.generate(input_features)

        # Decode transcription
        transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]
        transcriptions.append(transcription)

    return " ".join(transcriptions)

# Load your WAV file (replace 'your_audio.wav' with your actual file path)
audio_path = "data/Abdel-Test-Data.wav"
waveform, sample_rate = load_audio(audio_path)

# Transcribe the entire file in chunks
full_transcription = transcribe_in_chunks(waveform, processor, model)

print("Full Transcription:", full_transcription)
