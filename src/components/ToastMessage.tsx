interface ToastMessageProps {
  message: string
  visible: boolean
  /** 'left' = compassion (heart), 'right' = mercantile (coin) */
  choiceType?: 'left' | 'right'
}

export function ToastMessage({ message, visible, choiceType }: ToastMessageProps) {
  if (!message) return null

  return (
    <div
      className={`toast-message ${visible ? 'toast-message--visible' : ''} ${choiceType ? `toast-message--${choiceType}` : ''}`}
      aria-live="polite"
      role="status"
    >
      {choiceType === 'left' && (
        <span className="toast-message__icon toast-message__icon--heart" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </span>
      )}
      {choiceType === 'right' && (
        <span className="toast-message__icon toast-message__icon--coin" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v3.35c-1.84.42-2.69 1.5-2.69 2.77 0 1.72 1.39 2.84 3.21 2.84 1.63 0 2.61-.95 2.69-2.4h1.71c-.08 1.7-1.12 3.08-2.84 3.42V19h2.31v-3.44c1.43-.27 2.51-1.2 2.51-2.61 0-1.25-.97-2.18-2.49-2.5z"/></svg>
        </span>
      )}
      <span className="toast-message__text">{message}</span>
    </div>
  )
}
