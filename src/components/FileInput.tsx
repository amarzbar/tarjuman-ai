import { useState, useCallback } from 'react';
import { FileInput, Button, Group } from '@mantine/core';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const handleUpload = () => {
        if (file) {
            // Handle file upload logic here
            console.log('Uploading file:', file);
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive: dropzoneIsDragActive } = useDropzone({
        onDrop,
        accept: {
            "audio/mpeg": [".mp3"],
            "audio/wav": [".wav"],
            "audio/x-m4a": [".m4a"],
        },
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
    });

    return (
        <>
        <div {...getRootProps()} style={{ border: isDragActive || dropzoneIsDragActive ? '2px dashed #1c7ed6' : '2px dashed #ced4da', padding: '20px', borderRadius: '8px' }} className='[&>*]:cursor-pointer'>
            <input {...getInputProps()} />
            <div className='flex justify-center pb-5'>
            <FontAwesomeIcon icon={faCloudUploadAlt} size="5x" pulse/>
            </div>
            <FileInput
            disabled
                variant="filled"
                size="sm"
                radius=""
                label="Upload your audio file"
                withAsterisk
                description="Formats: m4a · mp3 · webm · mp4 · mpga · wav · mpeg"
                placeholder="Input placeholder"
                value={file}
                className='pb-5'
            />
            {isDragActive || dropzoneIsDragActive ? (
                <p className='text-sm'>Drop the files here ...</p>
            ) : (
                <p className='text-sm'>Drag & drop some files here, or click to select files</p>
            )}
            
            
        </div>

        <Group mt="lg" className='flex float-right'>
        <Button onClick={handleUpload} disabled={!file}>
            Upload
        </Button>
    </Group>
    </>
    );
}