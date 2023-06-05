import {
  TextInput,
  Title,
  Button,
  Group,
  Box,
  Alert,
  Text
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAuth } from '@hooks/useAuth'
import { useSignIn } from '@/hooks/useSignIn'

function SignIn() {
  const { signIn } = useAuth()

  const {
    failed: signInFailed,
    loading: signInLoading,
    attempt: attemptToSignIn
  } = useSignIn(signIn)

  function onSubmit({ studentId }: { studentId: string }) {
    attemptToSignIn(Number(studentId))
  }

  const form = useForm({
    initialValues: {
      studentId: ''
    },

    validate: {
      studentId: (value) => {
        if (!value) return 'لطفا شماره‌ی دانشجویی خود را وارد کنید'
        if (!/^[0-9]*$/.test(value) || value.length > 10)
          return 'شماره دانشجویی نامعتبر'
        return null
      }
    }
  })

  return (
    <Box maw="20rem" mx="auto">
      <Title order={2} my="xl" align="center">
        ورود
      </Title>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="شماره‌ی دانشجویی"
          sx={() => ({ '& input': { direction: 'rtl', textAlign: 'right' } })}
          {...form.getInputProps('studentId')}
        />

        {signInFailed && (
          <Alert color="red" variant="light" mt="md">
            <Text
              size="xs"
              sx={(theme) => ({
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[1]
                    : theme.colors.red[9]
              })}
            >
              اطلاعات ورود نامعتبر
            </Text>
          </Alert>
        )}

        <Group position="right" mt="md">
          <Button type="submit" variant="light" loading={signInLoading}>
            ورود
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default SignIn
