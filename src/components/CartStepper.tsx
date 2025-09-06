import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Input,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { useCart } from '../entities/cart'
import { useOrderForm } from '../shared/hooks/useOrderForm'
import type { CartItem } from '../entities/cart/model/CartContext'

const steps = [
  { title: 'Заказ', description: 'Просмотр корзины' },
  { title: 'Данные', description: 'Контакты и адрес' },
  { title: 'Подтверждение', description: 'Проверка и отправка' }
]

const calculateItemPrice = (item: CartItem) => {
  const ingredientsPrice = item.pizza.ingredients
    .filter((i) => item.selectedIngredientIds.includes(i.id))
    .reduce((s, i) => s + i.price, 0)
  return item.pizza.basePrice + ingredientsPrice
}

export function CartStepper() {
  const { state, removeItem, clear, getTotal, increment, decrement } = useCart()
  const total = useMemo(() => getTotal(), [state, getTotal])
  const toast = useToast()
  const { form, errors, updateForm, handlePhoneChange, validateForm, isFormValid, clearForm } = useOrderForm()

  const sessionStep = Number(sessionStorage.getItem('step') ?? '0')
  const [activeStep, setActiveStep] = useState(Number.isNaN(sessionStep) ? 0 : sessionStep)

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      const newStep = activeStep + 1
      setActiveStep(newStep)
      sessionStorage.setItem('step', String(newStep))
    }
  }

  const prevStep = () => {
    if (activeStep > 0) {
      const newStep = activeStep - 1
      setActiveStep(newStep)
      sessionStorage.setItem('step', String(newStep))
    }
  }

  useEffect(() => {
    sessionStorage.setItem('step', String(activeStep))
  }, [activeStep])

  const handleConfirm = async () => {
    if (!validateForm()) {
      toast({
        title: 'Ошибка валидации',
        description: 'Пожалуйста, проверьте правильность заполнения полей',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Заказ успешно оформлен!',
        description: 'Ваша пицца готовится и скоро будет доставлена',
        status: 'success',
        duration: 5000,
        isClosable: true
      })

      clear()
      clearForm()
      setActiveStep(0)
      sessionStorage.removeItem('step')
      
    } catch (error) {
      toast({
        title: 'Ошибка при оформлении заказа',
        description: 'Попробуйте еще раз или свяжитесь с нами',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <Box borderWidth="1px" rounded="md" p={4} bg="white">
      <Stepper index={activeStep} colorScheme="orange">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepNumber />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>
            <Box flexShrink={0}>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Divider my={4} />

      {activeStep === 0 && (
        <Box>
          {state.items.length === 0 ? (
            <Text color="gray.500">Корзина пуста</Text>
          ) : (
            <Box as="ul" pl={5} style={{ listStyleType: 'disc' }}>
              {state.items.map((item) => (
                <Box as="li" key={item.id} mb={2}>
                  <HStack justify="space-between">
                    <Box>
                      <Text fontWeight="bold">{item.pizza.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        Ингредиенты: {item.pizza.ingredients.filter(i => item.selectedIngredientIds.includes(i.id)).map(i => i.name).join(', ') || 'нет'}
                      </Text>
                    </Box>
                    <HStack>
                      <Text>
                        {(() => {
                          const price = calculateItemPrice(item)
                          return `${price} ₽ × ${item.quantity} = ${price * item.quantity} ₽`
                        })()}
                      </Text>
                      <HStack>
                        <Button size="xs" onClick={() => decrement(item.id)}>-</Button>
                        <Text w="20px" textAlign="center">{item.quantity}</Text>
                        <Button size="xs" onClick={() => increment(item.id)}>+</Button>
                      </HStack>
                      <Button size="sm" variant="ghost" colorScheme="red" onClick={() => removeItem(item.id)}>Удалить</Button>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </Box>
          )}
          <HStack mt={4} justify="space-between">
            <Text fontWeight="bold">Итого: {total} ₽</Text>
            <Button 
              colorScheme="orange" 
              onClick={nextStep}
              isDisabled={state.items.length === 0}
            >
              Далее
            </Button>
          </HStack>
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <FormControl mb={3} isRequired isInvalid={!!errors.name}>
            <FormLabel>Имя</FormLabel>
            <Input 
              value={form.name} 
              onChange={(e) => updateForm({ name: e.target.value })} 
              placeholder="Иван" 
            />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormControl>
          
          <FormControl mb={3} isRequired isInvalid={!!errors.phone}>
            <FormLabel>Телефон</FormLabel>
            <Input 
              value={form.phone} 
              onChange={(e) => handlePhoneChange(e.target.value)} 
              placeholder="+7 (XXX) XXX-XX-XX" 
            />
            {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
          </FormControl>
          
          <FormControl mb={3} isRequired isInvalid={!!errors.address}>
            <FormLabel>Адрес доставки</FormLabel>
            <Input 
              value={form.address} 
              onChange={(e) => updateForm({ address: e.target.value })} 
              placeholder="Город, улица, дом" 
            />
            {errors.address && <FormErrorMessage>{errors.address}</FormErrorMessage>}
          </FormControl>
          
          <FormControl mb={3}>
            <FormLabel>Комментарий</FormLabel>
            <Input 
              value={form.comment || ''} 
              onChange={(e) => updateForm({ comment: e.target.value })} 
              placeholder="Опционально" 
            />
          </FormControl>
          
          <HStack justify="space-between">
            <Button variant="ghost" onClick={prevStep}>Назад</Button>
            <HStack>
              <Text fontWeight="bold">Итого: {total} ₽</Text>
              <Button 
                colorScheme="orange" 
                onClick={nextStep} 
                isDisabled={!isFormValid()}
              >
                Далее
              </Button>
            </HStack>
          </HStack>
        </Box>
      )}

      {activeStep === 2 && (
        <Box>
          <Text fontWeight="bold" mb={4} fontSize="lg">Проверьте данные заказа:</Text>
          
          <Box mb={4}>
            <Text fontWeight="bold" mb={2}>Состав заказа:</Text>
            <Box as="ol" pl={5} style={{ listStyleType: 'decimal' }} mb={3}>
              {state.items.map((item) => (
                <Box as="li" key={item.id} mb={1}>
                  {item.pizza.name} × {item.quantity} — {calculateItemPrice(item)} ₽
                </Box>
              ))}
            </Box>
            <Text fontWeight="bold" fontSize="lg">Итого: {total} ₽</Text>
          </Box>
          
          <Box mb={4} p={3} bg="gray.50" rounded="md">
            <Text fontWeight="bold" mb={2}>Контактные данные:</Text>
            <Text>Имя: {form.name}</Text>
            <Text>Телефон: {form.phone}</Text>
            <Text>Адрес: {form.address}</Text>
            {form.comment && <Text>Комментарий: {form.comment}</Text>}
          </Box>
          
          <Alert status="info" mb={4}>
            <AlertIcon />
            <Box>
              <AlertTitle>Подтверждение заказа</AlertTitle>
              <AlertDescription>
                После подтверждения заказ будет отправлен в обработку. 
                Время доставки: 30-60 минут.
              </AlertDescription>
            </Box>
          </Alert>
          
          <HStack justify="space-between">
            <Button variant="ghost" onClick={prevStep}>Назад</Button>
            <Button 
              colorScheme="orange" 
              size="lg"
              onClick={handleConfirm}
            >
              Подтвердить заказ
            </Button>
          </HStack>
        </Box>
      )}
    </Box>
  )
}
