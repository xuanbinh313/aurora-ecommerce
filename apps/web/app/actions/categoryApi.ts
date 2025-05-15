import { queryOptions } from '@tanstack/react-query'

export const pokemonOptions = queryOptions({
  queryKey: ['categories'],
  queryFn: async () => {
    const response = await fetch('/proxy/categories')
    return response.json()
  },
})