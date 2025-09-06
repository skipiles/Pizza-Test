import { Box, Container, Heading, HStack, Spacer } from '@chakra-ui/react'
import { PizzaGrid } from '../components/PizzaGrid'
import { CartStepper } from '../components/CartStepper'
import { CartProvider } from '../entities/cart'

export default function App() {
  return (
    <CartProvider>
      <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
        <Container maxW="6xl" py={4}>
          <HStack>
            <Heading size="md" color="brand.700">Pizza Test</Heading>
            <Spacer />
          </HStack>
        </Container>
      </Box>
      <Container maxW="6xl" py={6}>
        <Box mb={10}>
          <CartStepper />
        </Box>
        <PizzaGrid />
      </Container>
    </CartProvider>
  )
}
