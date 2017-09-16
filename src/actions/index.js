export const start = (startedAt) => ({
  type: 'START',
  startedAt
})

export const stop = () => ({
  type: 'STOP'
})

export const reset = () => ({
  type: 'RESET'
})
