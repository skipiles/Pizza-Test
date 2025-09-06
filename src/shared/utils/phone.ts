export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  const normalizedDigits = digits.startsWith('8') ? '7' + digits.slice(1) : digits
  
  if (normalizedDigits.startsWith('7') && normalizedDigits.length >= 11) {
    const phone = normalizedDigits.slice(1)
    return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`
  }
  
  if (normalizedDigits.startsWith('7')) {
    const phone = normalizedDigits.slice(1)
    let formatted = '+7'
    
    if (phone.length > 0) {
      formatted += ` (${phone.slice(0, 3)}`
      if (phone.length > 3) {
        formatted += `) ${phone.slice(3, 6)}`
        if (phone.length > 6) {
          formatted += `-${phone.slice(6, 8)}`
          if (phone.length > 8) {
            formatted += `-${phone.slice(8, 10)}`
          }
        }
      }
    }
    
    return formatted
  }
  
  if (digits.length > 0) {
    let formatted = '+7'
    formatted += ` (${digits.slice(0, 3)}`
    if (digits.length > 3) {
      formatted += `) ${digits.slice(3, 6)}`
      if (digits.length > 6) {
        formatted += `-${digits.slice(6, 8)}`
        if (digits.length > 8) {
          formatted += `-${digits.slice(8, 10)}`
        }
      }
    }
    return formatted
  }
  
  return value
}
export const isValidPhoneNumber = (phone: string): boolean => {
  return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)
}
