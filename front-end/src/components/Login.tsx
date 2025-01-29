import { GoogleLogin } from "@react-oauth/google";
import { Box, Text, Container } from "@mantine/core";

export default function Login({ onLogin }: { onLogin: () => void }) {
    return (
        <Container size="sm" className="">
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh'
                }}
            >
                <Text size="xl"  mb="md">
                    Welcome! Please log in.
                </Text>
                <GoogleLogin
                    onSuccess={(response) => {
                        console.log("Successful Login", response);
                        onLogin();
                    }}
                    onError={() => console.log("Login Failed")}
                    useOneTap
                />
            </Box>
        </Container>
    );
}
