export const handleErrors = (res, error) => {
  let message = 'Error en el servidor'

  if (error.errors) {
    message = error.errors[0].message
  }

  if (error.message) {
    message = error.message
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ message: error?.errors[0]?.message })
  }

  return res.status(500).json({ message: error?.errors[0]?.message ?? message })
}
