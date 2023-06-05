import {
  Alert,
  Box,
  Flex,
  Button,
  Text,
  LoadingOverlay,
  MultiSelect,
  Progress
} from '@mantine/core'
import { IconChecks } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { useTarinsList } from '@/hooks/useTarinsList'
import { useEffect, useState } from 'react'
import { enToFarsiNumbers } from '@/utils/enToFarsiNumbers'
import { useSubmitAnswer } from '@/hooks/useSubmitAnswer'

function Questions() {
  const { loading, failed, list, attempt } = useTarinsList()
  const {
    loading: submitLoading,
    failed: submitFailed,
    votedBefore,
    attempt: submitAnswer,
    resetState
  } = useSubmitAnswer()

  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    setCurrentQuestionId(list?.[0]?.ID || 1)
  }, [list])

  const currentQuestionIndex = list.findIndex((q) => q.ID === currentQuestionId)

  const currentQuestion = list?.[currentQuestionIndex]
  const currentQuestionStudents = currentQuestion
    ? [...new Set(currentQuestion.studentNames)]
    : []
  const currentTarinName = currentQuestion ? currentQuestion.tarinName : ''

  const questionsLength = list.length
  const progressPercent = Math.ceil((currentQuestionId / questionsLength) * 100)

  const isLastQuestion = list.length === currentQuestionIndex - 1

  async function submitQuestion() {
    if (!selectedStudents.length) return

    const submitted = await submitAnswer({
      tarinId: currentQuestionId,
      studentNames: selectedStudents
    })

    if (submitted) {
      notifications.show({
        message: 'رای شما با موفقیت ثبت شد',
        color: 'green'
      })

      nextQuestion()
    }
  }

  function prevQuestion() {
    if (!currentQuestionIndex) return

    const prevQuestion = list?.[currentQuestionIndex - 1]

    if (prevQuestion) {
      setCurrentQuestionId(prevQuestion.ID)
      setSelectedStudents([])
      resetState()
    }
  }

  function nextQuestion() {
    if (list.length === currentQuestionIndex + 1) {
      setDone(true)
      return
    }

    const nextQuestion = list?.[currentQuestionIndex + 1]

    if (nextQuestion) {
      setCurrentQuestionId(nextQuestion.ID)
      setSelectedStudents([])
      resetState()
    }
  }

  let res

  if (failed) {
    res = (
      <Alert
        sx={() => ({ backgroundColor: 'transparent' })}
        variant="light"
        p="lg"
      >
        <Text color="red.9" align="center" size="xs">
          مشکلی در دریافت اطلاعات پیش‌آمده است. لطفا مجددا تلاش کنید.
        </Text>

        <Button
          onClick={attempt}
          variant="filled"
          color="gray"
          mx="auto"
          mt="md"
          size="xs"
          display="block"
        >
          بارگزاری مجدد
        </Button>
      </Alert>
    )
  } else if (done) {
    res = (
      <>
        <Box
          sx={(theme) => ({
            width: '3.2rem',
            height: '3.2rem',
            margin: '2rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: `2px solid ${theme.colors.green[6]}`,
            color: theme.colors.green[6]
          })}
        >
          <IconChecks />
        </Box>

        <Text align="center">رای شما با موفقیت ثبت شد</Text>
      </>
    )
  } else {
    res = (
      <>
        <MultiSelect
          data={currentQuestionStudents}
          label={currentTarinName}
          onChange={(students) => setSelectedStudents(students)}
          value={selectedStudents}
          maxSelectedValues={5}
          searchable
        />

        <Progress
          mt="xl"
          mb="md"
          color="cyan"
          value={progressPercent}
          size="lg"
        />

        <Flex align="center">
          <Text>
            سوال {enToFarsiNumbers((currentQuestionIndex + 1).toString())} از{' '}
            {enToFarsiNumbers(questionsLength.toString())}
          </Text>

          <Button
            ml="auto"
            color="cyan"
            variant="light"
            disabled={!currentQuestionIndex || submitLoading}
            onClick={prevQuestion}
          >
            قبلی
          </Button>

          <Button
            ml="xs"
            color="cyan"
            variant="light"
            disabled={
              isLastQuestion ||
              submitLoading ||
              !selectedStudents.length ||
              !votedBefore
            }
            onClick={nextQuestion}
          >
            {isLastQuestion ? 'اتمام' : 'بعدی'}
          </Button>

          <Button
            ml="xs"
            color="cyan"
            disabled={!selectedStudents.length}
            loading={submitLoading}
            onClick={submitQuestion}
          >
            ثبت
          </Button>
        </Flex>

        {submitFailed && (
          <Alert
            color="red"
            variant="light"
            title="خطا در ثبت رای"
            mt="md"
            p="lg"
          >
            {votedBefore
              ? 'شما قبلا رای خود برای این سوال را ثبت کرده‌اید. برای ویرایش رای ابتدا پاسخ‌های فعلی خود را حذف کنید.'
              : 'مشکلی در ثبت رای پیش‌آمده است. لطفا مجددا تلاش کنید.'}
          </Alert>
        )}
      </>
    )
  }

  return (
    <Box maw="50rem" mx="auto" mt="lg" pos="relative">
      <LoadingOverlay visible={loading} overlayBlur={2} />
      {res}
    </Box>
  )
}

export default Questions
