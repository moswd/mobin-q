import {
  Alert,
  Header,
  Container,
  Flex,
  Title,
  Button,
  Group,
  Text,
  Modal
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks'
import { useAuth } from '@hooks/useAuth'
import { useUnvote } from '@/hooks/useUnvote'
import { enToFarsiNumbers } from '@utils/enToFarsiNumbers'

function AppHeader() {
  const { loading: unvoteLoading, attempt: unvote } = useUnvote()

  const [
    unvoteModalOpened,
    { open: openUnvoteModal, close: closeUnvoteModal }
  ] = useDisclosure(false)

  const { studentId, signOut } = useAuth()

  const farsiStudentId = enToFarsiNumbers(studentId ?? '')

  async function submitUnvote() {
    const res = await unvote()

    if (res) {
      notifications.show({
        message: 'رای‌های شما با موفقیت حذف شدند',
        color: 'green'
      })

      closeUnvoteModal()
    } else {
      notifications.show({
        message: 'عملیات با خطا مواجه شد',
        color: 'red'
      })
    }
  }

  return (
    <Header height={60} p="xs">
      <Modal
        opened={unvoteModalOpened}
        onClose={closeUnvoteModal}
        title="حذف رای"
        centered
        closeOnClickOutside={!unvoteLoading}
        closeOnEscape={!unvoteLoading}
        withCloseButton={false}
      >
        <Alert color="gray" variant="light" p="lg">
          با ادامه‌ی این عملیات تمام رای‌های فعلی شما حذف می‌شوند و می‌توانید
          دوباره رای دهید. ادامه می‌دهید؟
        </Alert>

        <Group position="right" spacing="xs" mt="md">
          <Button
            color="gray"
            variant="subtle"
            disabled={unvoteLoading}
            onClick={closeUnvoteModal}
          >
            منصرف شدم
          </Button>

          <Button
            color="red"
            variant="light"
            loading={unvoteLoading}
            onClick={submitUnvote}
          >
            حذف
          </Button>
        </Group>
      </Modal>

      <Container h="100%">
        <Flex justify="space-between" align="center" h="100%">
          <Title order={1} mr="auto">
            رای‌گیری
          </Title>

          {studentId && (
            <>
              <Text mr="xs">{farsiStudentId}</Text>
              <Button
                mr="xs"
                variant="subtle"
                color="red"
                onClick={openUnvoteModal}
              >
                حذف رای
              </Button>
              <Button variant="light" color="red" onClick={signOut}>
                خروج
              </Button>
            </>
          )}
        </Flex>
      </Container>
    </Header>
  )
}

export default AppHeader
