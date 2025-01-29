import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FileUploader from "./FileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
const Dashboard = () => {
    const [opened, { toggle }] = useDisclosure();

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
            
        {/*  TODO: Output UI */}

        </AppShell.Main>
      </AppShell>
    );
}
 
export default Dashboard;