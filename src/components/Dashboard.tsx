import { AppShell, Burger, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FileUploader from "./FileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
const Dashboard = () => {
    const [opened, { toggle }] = useDisclosure();
    const [fileUploaded, setFileUploaded] = useState(true);
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
          <FileUploader />
        </div>
        </AppShell.Navbar>
  
        <AppShell.Main>
        

        {/*  TODO: Output UI */
        // Skeleton if API data has not returned.
        
        fileUploaded ? <></> : <div className="skeleton-loading">
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

        </AppShell.Main>
      </AppShell>
    );
}
 
export default Dashboard;