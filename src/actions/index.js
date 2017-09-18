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

export const countUp = () => ({
  type: 'COUNT_UP'
})

export const edit = () => ({
  type: 'EDIT'
})

export const save = () => ({
  type: 'SAVE'
})

export const updateForm = (key, value) => ({
  type: 'UPDATE_FORM',
  key,
  value
})
