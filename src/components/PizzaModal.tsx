import { useMemo, useState } from 'react'
import { Button, Checkbox, CheckboxGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, HStack, Image, Box, VStack } from '@chakra-ui/react'
import type { Pizza } from '../entities/cart/model/CartContext'
import { useCart } from '../entities/cart'

export function PizzaModal({ isOpen, onClose, pizza }: { isOpen: boolean; onClose: () => void; pizza: Pizza }) {
  const [selected, setSelected] = useState<string[]>([])
  const { addOrIncrement } = useCart()

  const price = useMemo(() => {
    const extras = pizza.ingredients.filter((i) => selected.includes(i.id)).reduce((s, i) => s + i.price, 0)
    return pizza.basePrice + extras
  }, [pizza, selected])

  const handleAdd = () => {
    addOrIncrement({ pizza, selectedIngredientIds: selected, id: `${pizza.id}-${selected.sort().join('-')}` })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent maxW="600px" bg="gray.100">
        <ModalHeader>
          <HStack>
            <Image 
              src={pizza.imageUrl} 
              alt={pizza.name}
              boxSize="60px"
              borderRadius="md"
              objectFit="cover"
            />
            <VStack align="start" spacing={0}>
              <Text fontSize="xl" fontWeight="bold">{pizza.name}</Text>
              <Text color="gray.600">Базовая цена: {pizza.basePrice} ₽</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4} fontWeight="semibold">Выберите дополнительные ингредиенты:</Text>
          <CheckboxGroup value={selected} onChange={(v) => setSelected(v as string[])}>
            <Box 
              display="grid" 
              gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" 
              gap={3}
            >
              {pizza.ingredients.map((ing) => (
                <Checkbox key={ing.id} value={ing.id}>
                  <Box 
                    p={3} 
                    borderRadius="lg" 
                    _hover={{ 
                      bg: "gray.50", 
                      transform: "translateY(-1px)",
                      transition: "all 0.2s"
                    }}
                    _checked={{ 
                      bg: "orange.50"
                    }}
                    minH="80px"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <HStack spacing={3} width="100%">
                      {ing.imageUrl && (
                        <Box 
                          width="50px" 
                          height="50px" 
                          borderRadius="md" 
                          overflow="hidden"
                          bg="gray.100"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                        >
                          <Image 
                            src={ing.imageUrl} 
                            alt={ing.name}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNSAyMEMyNy43NjE0IDIwIDMwIDIyLjIzODYgMzAgMjVDMzAgMjcuNzYxNCAyNy43NjE0IDMwIDI1IDMwQzIyLjIzODYgMzAgMjAgMjcuNzYxNCAyMCAyNUMyMCAyMi4yMzg2IDIyLjIzODYgMjAgMjUgMjBaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0yNSAzNUMyNi4xMDQ2IDM1IDI3IDM0LjEwNDYgMjcgMzNDMjcgMzEuODk1NCAyNi4xMDQ2IDMxIDI1IDMxQzIzLjg5NTQgMzEgMjMgMzEuODk1NCAyMyAzM0MyMyAzNC4xMDQ2IDIzLjg5NTQgMzUgMjUgMzVaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo="
                          />
                        </Box>
                      )}
                      <VStack align="start" spacing={1} flex="1" minW={0}>
                        <Text 
                          fontWeight="medium" 
                          fontSize="sm" 
                          noOfLines={2}
                          lineHeight="1.2"
                          wordBreak="break-word"
                          overflow="hidden"
                        >
                          {ing.name}
                        </Text>
                        <Text fontSize="sm" color="orange.500" fontWeight="semibold">+{ing.price} ₽</Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Checkbox>
              ))}
            </Box>
          </CheckboxGroup>
          <Box mt={6} p={4} bg="orange.50" borderRadius="md" border="1px" borderColor="orange.200">
            <Text fontSize="lg" fontWeight="bold" color="orange.700">
              Итого: {price} ₽
            </Text>
            {selected.length > 0 && (
              <Text fontSize="sm" color="orange.600" mt={1}>
                Выбрано ингредиентов: {selected.length}
              </Text>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>Отмена</Button>
          <Button colorScheme="orange" onClick={handleAdd} size="lg">
            Добавить в корзину
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
