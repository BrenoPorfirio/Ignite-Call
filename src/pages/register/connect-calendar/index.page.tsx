import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight, Check } from "phosphor-react";
import { ConnectBox, ConnectItem } from "./styles";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function ConnectCalendarContent() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("@ignitecall:google-token");
    if (savedToken) setIsConnected(true);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      localStorage.setItem(
        "@ignitecall:google-token",
        tokenResponse.access_token,
      );
      localStorage.setItem("@ignitecall:google-connected", "true");
      setIsConnected(true);
    },
    scope: "https://www.googleapis.com/auth/calendar.readonly",
  });

  async function handleNavigateToNextStep() {
    await router.push("/register/time-intervals");
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>Conecte seu calendário para verificar as horas ocupadas.</Text>
          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isConnected ? (
              <Button size="sm" disabled>
                {" "}
                Conectado <Check />{" "}
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => login()}>
                Conectar <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          <Button onClick={handleNavigateToNextStep} disabled={!isConnected}>
            Próximo passo <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  );
}

export default function ConnectCalendar() {
  return (
    <GoogleOAuthProvider clientId="697476511265-eq6hhc3rg06vd93vuhjpq5vk7blu3ps8.apps.googleusercontent.com">
      <ConnectCalendarContent />
    </GoogleOAuthProvider>
  );
}
