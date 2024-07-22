import { isUserHasId } from 'grammy-guard'

export const isAdmin = (ids: number[]) => isUserHasId(...ids)
