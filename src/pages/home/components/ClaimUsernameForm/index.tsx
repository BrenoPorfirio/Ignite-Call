import { Button, TextInput } from '@ignite-ui/react'
import { Form } from './styles'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'

const claimUsernameFormSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  async function handleclaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleclaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
