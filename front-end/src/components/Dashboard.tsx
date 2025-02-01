import { AppShell, Burger, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FileUploader from "./FileInput";
import { useState } from "react";
import axios from "axios";
const Dashboard = () => {
  const [opened, { toggle }] = useDisclosure();
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [transcription, setTranscription] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleFileUpload = async (event : any) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      try {
        // Upload file to backend
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post('/api/upload', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setFileUploaded(true);
        setIsTranscribing(true);
        setFile(file);

        // Now poll for the transcription
        pollForTranscription(response.data.fileName);

      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const pollForTranscription = (fileName : any) => {
    // Poll the server every 5 seconds for transcription status
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`/api/transcription/${fileName}`);
        if (response.status === 200) {
          setTranscription(response.data.transcription);
          setIsTranscribing(false);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching transcription:", error);
      }
    }, 5000); // Poll every 5 seconds
  };
    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        
        padding="md"
        
      >
        <AppShell.Header>
          <div className="px-3 py-2 flex" onClick={toggle}>
            
            <div className="flex items-center space-x-4">
            <Burger opened={opened} onClick={toggle} className="md:hidden scale-85"/>

              <img src="/arabic-logo.svg" className="w-10 md:animate-spin md:[animation-duration:15s]" />
              <p>Tarjumān</p>

            </div>
    
          </div>
          
        </AppShell.Header>
  
        <AppShell.Navbar p="lg" className="shadow-lg bg-amber-950">
            {/* Navbar
                Should have an onhover effect that shows a retract button. 
            */}
        <div className="flex flex-col gap-11 my-20">
          <FileUploader uploadHandler={handleFileUpload} />
        </div>
        </AppShell.Navbar>
  
        <AppShell.Main>
        

        {/*  TODO: Output UI */
        // Skeleton if API data has not returned.
        {
        !fileUploaded  ? <></> : <div className="skeleton-loading">
          <div className="h-12 w-135" />
          <Skeleton height={8} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="75%" radius="xl" />

          <Skeleton mt={20} height={8} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="50%" radius="xl" />
          
          <Skeleton mt={20} height={8} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />

          <Skeleton height={8} mt={6} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />

          <Skeleton height={8} mt={6} width="35%" radius="xl" />

          <Skeleton mt={20} height={8} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="35%" radius="xl" />

          <Skeleton mt={20} height={8} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />

          <Skeleton height={8} mt={6} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />

          <Skeleton height={8} mt={6} width="35%" radius="xl" />

          <Skeleton mt={20} height={8} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />

          <Skeleton height={8} mt={6} width="100%" radius="xl" />
          <Skeleton height={8} mt={6} width="100%" radius="xl" />

          <Skeleton height={8} mt={6} width="35%" radius="xl" />
        </div>
        }
        }

        </AppShell.Main>
      </AppShell>
    );
}
 
export default Dashboard;