import { useState } from 'react'
import { Box, Button, Card, CardBody, Heading, Image, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import { pizzas } from '../data/pizzas'
import { PizzaModal } from './PizzaModal'
import type { Pizza } from '../entities/cart/model/CartContext'

export function PizzaGrid() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activePizza, setActivePizza] = useState<Pizza | null>(null)

  const openModal = (p: Pizza) => {
    setActivePizza(p)
    onOpen()
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
        {pizzas.map((p) => (
          <Card 
            key={p.id} 
            variant="outline" 
            _hover={{ 
              boxShadow: 'lg',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s'
            }}
            borderRadius="xl"
            overflow="hidden"
            height="280px"
            display="flex"
            flexDirection="column"
          >
            <Box position="relative" height="140px" overflow="hidden" bg="gray.50">
              <Image 
                src={p.imageUrl} 
                alt={p.name} 
                height="100%" 
                width="100%"
                objectFit="contain"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Box>
            <CardBody p={3} flex="1" display="flex" flexDirection="column" justifyContent="space-between">
              <Box>
                <Heading size="sm" mb={1} noOfLines={1}>{p.name}</Heading>
                <Text color="gray.600" fontSize="lg" fontWeight="semibold">
                  {p.basePrice} ₽
                </Text>
              </Box>
              <Button 
                colorScheme="orange" 
                size="sm"
                width="100%"
                onClick={() => openModal(p)}
                borderRadius="md"
                mt={2}
              >
                Выбрать
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      {activePizza && (
        <PizzaModal isOpen={isOpen} onClose={onClose} pizza={activePizza} />
      )}
    </>
  )
}
