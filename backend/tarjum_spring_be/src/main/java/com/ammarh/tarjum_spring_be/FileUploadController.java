package com.ammarh.tarjum_spring_be;

import com.google.cloud.storage.*;
import com.google.cloud.pubsub.v1.Publisher;
import com.google.protobuf.ByteString;
import com.google.pubsub.v1.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    @Value("${google.cloud.storage.bucket-name}")
    private String bucketName;

    @Value("${google.cloud.pubsub.topic-name}")
    private String pubsubTopic;


    @Value("${google.cloud.project-id}")
    private String projectId;


    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        System.out.println("Uploading Audio");
        try {
            // Upload file to Google Cloud Storage
            String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
            BlobId blobId = BlobId.of(bucketName, fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
            storage.create(blobInfo, file.getBytes());

            // Send message to Pub/Sub
            sendPubSubMessage(fileName);

            return ResponseEntity.ok("File uploaded and queued for transcription: " + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private void sendPubSubMessage(String fileName) throws IOException, InterruptedException {
        Publisher publisher = null;
        try {
            TopicName topicName = TopicName.of(projectId, pubsubTopic);
            publisher = Publisher.newBuilder(topicName).build();

            // Create Pub/Sub message
            PubsubMessage message = PubsubMessage.newBuilder()
                    .setData(ByteString.copyFromUtf8(fileName))
                    .build();

            // Publish message
            publisher.publish(message);
        } finally {
            if (publisher != null) {
                publisher.shutdown();
                publisher.awaitTermination(1, TimeUnit.MINUTES);
            }
        }
    }


    @GetMapping("/transcription/{fileName}")
    public ResponseEntity<String> getTranscription(@PathVariable String fileName) {
        System.out.println("Getting Transcription");

        try {
            BlobId blobId = BlobId.of(bucketName, fileName + ".json");
            Blob blob = storage.get(blobId);

            if (blob == null) {
                return ResponseEntity.status(404).body("Transcription not found.");
            }

            String transcription = new String(blob.getContent());
            return ResponseEntity.ok(transcription);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching transcription: " + e.getMessage());
        }
    }


}
