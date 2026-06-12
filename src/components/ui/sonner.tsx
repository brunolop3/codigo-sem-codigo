"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'hsl(240 6% 10%)',
          border: '1px solid hsl(240 4% 16%)',
          color: 'hsl(0 0% 98%)',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
