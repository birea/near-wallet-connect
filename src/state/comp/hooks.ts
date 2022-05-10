import { useCallback } from 'react'
import { useAppDispatch } from 'state/hooks'
import { changeStatus } from './reducer'

// const compoundLenAddress = '0xdCbDb7306c6Ff46f77B349188dC18cEd9DF30299'

// const provider = ethers.getDefaultProvider()

export function useAddCompData(): (account: string) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    async () => {
      dispatch(changeStatus(true))
    },
    [dispatch]
  )
}
