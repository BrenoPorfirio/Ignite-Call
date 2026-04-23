import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

const updateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    avatar_url: "",
    username: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("@ignitecall:user-data");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  async function handleUpdateProfile(data: UpdateProfileData) {
    const updatedData = {
      ...userData,
      bio: data.bio,
    };
    localStorage.setItem("@ignitecall:user-data", JSON.stringify(updatedData));

    await router.push(`/schedule/${userData.username || "usuario"}`);
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Quase lá!</Heading>
          <Text>Fale um pouco sobre você para finalizar seu perfil.</Text>
          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Foto de perfil</Text>
            <Avatar src={userData.avatar_url} alt={userData.name} />
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register("bio")} />
            <FormAnnotation size="sm">
              Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  );
}
