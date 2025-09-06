import { useState, useEffect, useCallback } from 'react'
import { clientFormSchema, type ClientForm } from '../validation/schemas'
import { formatPhoneNumber, isValidPhoneNumber } from '../utils/phone'
import { ZodError } from 'zod'

const FORM_STORAGE_KEY = 'pizza-order-form'

export const useOrderForm = () => {
  const [form, setForm] = useState<ClientForm>(() => {
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          name: parsed.name || '',
          phone: parsed.phone || '',
          address: parsed.address || '',
          comment: parsed.comment || ''
        }
      }
    } catch (error) {
    }
    return { name: '', phone: '', address: '', comment: '' }
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ClientForm, string>>>({})

  useEffect(() => {
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form))
    } catch (error) {
    }
  }, [form])

  const updateForm = useCallback((updates: Partial<ClientForm>) => {
    setForm(prev => ({ ...prev, ...updates }))
    if (updates.name) setErrors(prev => ({ ...prev, name: undefined }))
    if (updates.phone) setErrors(prev => ({ ...prev, phone: undefined }))
    if (updates.address) setErrors(prev => ({ ...prev, address: undefined }))
  }, [])

  const handlePhoneChange = useCallback((value: string) => {
    const formatted = formatPhoneNumber(value)
    updateForm({ phone: formatted })
  }, [updateForm])

  const validateForm = useCallback((): boolean => {
    try {
      clientFormSchema.parse(form)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Partial<Record<keyof ClientForm, string>> = {}
        
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as keyof ClientForm] = issue.message
          }
        })
        
        setErrors(newErrors)
      }
      return false
    }
  }, [form])

  const isFormValid = useCallback((): boolean => {
    return form.name.trim() !== '' && 
           form.address.trim() !== '' && 
           isValidPhoneNumber(form.phone)
  }, [form])

  const clearForm = useCallback(() => {
    setForm({ name: '', phone: '', address: '', comment: '' })
    setErrors({})
    try {
      localStorage.removeItem(FORM_STORAGE_KEY)
    } catch (error) {
    }
  }, [])

  return {
    form,
    errors,
    updateForm,
    handlePhoneChange,
    validateForm,
    isFormValid,
    clearForm
  }
}
