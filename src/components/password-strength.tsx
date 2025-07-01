"use client"

import { Check, X } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import { cn } from '@/lib/utils'

interface PasswordStrengthProps {
  password?: string
}

export function PasswordStrength({ password = '' }: PasswordStrengthProps) {
  const { t } = useTranslation()

  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  }

  const validationMessages = [
    { key: 'length', text: t('passwordValidationLength') },
    { key: 'lowercase', text: t('passwordValidationLowercase') },
    { key: 'uppercase', text: t('passwordValidationUppercase') },
    { key: 'digit', text: t('passwordValidationDigit') },
    { key: 'special', text: t('passwordValidationSpecial') },
  ]

  if (!password) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
      {validationMessages.map((msg) => (
        <div key={msg.key} className="flex items-center gap-2">
          {checks[msg.key as keyof typeof checks] ? (
            <Check className="h-4 w-4 text-green-500 shrink-0" />
          ) : (
            <X className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
          <span
            className={cn(
              'text-muted-foreground',
              checks[msg.key as keyof typeof checks] && 'line-through'
            )}
          >
            {msg.text}
          </span>
        </div>
      ))}
    </div>
  )
}
