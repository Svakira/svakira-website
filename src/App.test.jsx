import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('renders the compact landing layout with custom region labels', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /svakira/i })).toBeInTheDocument()
    expect(screen.getByText(/sector colombia/i)).toBeInTheDocument()
    expect(screen.getByText(/red zone/i)).toBeInTheDocument()
    expect(screen.getByText(/primary user/i)).toBeInTheDocument()
    expect(screen.getByText(/スヴァキラ/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/control telemetry/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /project records/i })).toBeInTheDocument()
    expect(screen.getByText(/brary ai/i)).toBeInTheDocument()
    expect(screen.getByText(/tu casa linda/i)).toBeInTheDocument()
    expect(screen.getByText(/spotify artist/i)).toBeInTheDocument()
    expect(screen.getByText(/infermatic ai engineer/i)).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })[0]).toHaveTextContent(/infermatic ai engineer/i)
    expect(screen.getAllByRole('link', { name: /open record/i }).length).toBeGreaterThanOrEqual(3)
    expect(screen.getByLabelText(/cable cat feed/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cable cat feed/i).querySelector('video')).not.toHaveAttribute('loop')
    expect(screen.queryByText(/record link stable/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/personal projects/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/independent systems operator/i)).not.toBeInTheDocument()
  })

  test('toggles the power audio state label', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /system audio/i })

    expect(button).toHaveTextContent(/offline/i)

    fireEvent.click(button)

    expect(button).toHaveTextContent(/armed/i)
  })

  test('returns to offline when an armed control is clicked again', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /system audio/i })

    fireEvent.click(button)
    expect(button).toHaveTextContent(/armed/i)

    fireEvent.click(button)
    expect(button).toHaveTextContent(/offline/i)
  })
})
