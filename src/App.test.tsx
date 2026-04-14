import { render, screen } from '@testing-library/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import App from './App'

test('renders app', () => {
  render(
    <TooltipProvider>
      <App />
    </TooltipProvider>
  )
  expect(screen.getByText(/case converter/i)).toBeInTheDocument()
})
