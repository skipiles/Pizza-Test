import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

export type Ingredient = { id: string; name: string; price: number; imageUrl?: string }
export type Pizza = { id: string; name: string; basePrice: number; imageUrl: string; ingredients: Ingredient[] }
export type CartItem = { id: string; pizza: Pizza; selectedIngredientIds: string[]; quantity: number }

type CartState = { items: CartItem[] }

type CartAction =
  | { type: 'ADD_OR_INCREMENT'; item: Omit<CartItem, 'quantity'> }
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'CLEAR' }

const initialState: CartState = { items: [] }

function areSamePosition(a: Omit<CartItem, 'quantity'>, b: CartItem): boolean {
  return a.pizza.id === b.pizza.id &&
    a.selectedIngredientIds.length === b.selectedIngredientIds.length &&
    a.selectedIngredientIds.every((id) => b.selectedIngredientIds.includes(id))
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_OR_INCREMENT': {
      const index = state.items.findIndex((i) => areSamePosition(action.item, i))
      if (index >= 0) {
        const next = [...state.items]
        next[index] = { ...next[index], quantity: next[index].quantity + 1 }
        return { items: next }
      }
      return { items: [...state.items, { ...action.item, id: `${action.item.pizza.id}-${Date.now()}`, quantity: 1 }] }
    }
    case 'INCREMENT':
      return { items: state.items.map(i => i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i) }
    case 'DECREMENT':
      return { items: state.items.flatMap(i => i.id === action.id ? (i.quantity > 1 ? [{ ...i, quantity: i.quantity - 1 }] : []) : [i]) }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.id) }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem('cart')
    if (!raw) return initialState
    return JSON.parse(raw) as CartState
  } catch {
    return initialState
  }
}

function saveCart(state: CartState) {
  try {
    localStorage.setItem('cart', JSON.stringify(state))
  } catch {}
}

type CartContextValue = {
  state: CartState
  addOrIncrement: (item: Omit<CartItem, 'quantity'>) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  removeItem: (id: string) => void
  clear: () => void
  getTotal: () => number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    saveCart(state)
  }, [state])

  const value = useMemo<CartContextValue>(() => ({
    state,
    addOrIncrement: (item) => dispatch({ type: 'ADD_OR_INCREMENT', item }),
    increment: (id) => dispatch({ type: 'INCREMENT', id }),
    decrement: (id) => dispatch({ type: 'DECREMENT', id }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    getTotal: () => {
      return state.items.reduce((sum, item) => {
        const ingredientsPrice = item.pizza.ingredients
          .filter((ing) => item.selectedIngredientIds.includes(ing.id))
          .reduce((s, ing) => s + ing.price, 0)
        const itemPrice = item.pizza.basePrice + ingredientsPrice
        return sum + itemPrice * item.quantity
      }, 0)
    }
  }), [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
