Deoploy the function on GCP Using:

```sh
gcloud functions deploy transcribe_audio \
  --runtime python310 \
  --trigger-resource YOUR_TRIGGER_RESOURCE \
  --trigger-event google.storage.object.finalize \
  --entry-point transcribe_audio \
  --memory 512MB \
  --region YOUR_REGION
  ```
