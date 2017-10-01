export const start = (startedAt) => ({
  type: 'START',
  startedAt,
})

export const stop = () => ({
  type: 'STOP'
})

export const finish = () => ({
  type: 'FINISH'
})

export const setCount = (count) => ({
  type: 'SET_COUNT',
  count,
})

export const edit = () => ({
  type: 'EDIT'
})

export const save = () => ({
  type: 'SAVE'
})

export const cancel = () => ({
  type: 'CANCEL'
})

export const updateForm = (key, value) => ({
  type: 'UPDATE_FORM',
  key,
  value
})
