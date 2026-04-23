import { Avatar, Heading, Text } from "@ignite-ui/react";
import { Container, UserHeader } from "./styles";
import { ScheduleForm } from "./ScheduleForm";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  bio: string;
  avatar_url: string;
}

export default function Schedule() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("@ignitecall:user-data");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser({
        name: "Usuário Convidado",
        bio: "Bem-vindo ao meu calendário de agendamentos.",
        avatar_url: "",
      });
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Ignite Call`} />

      <Container>
        <UserHeader>
          <Avatar src={user.avatar_url} alt={user.name} />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  );
}
