import ObjectiveStack from '@/services/ObjectiveStack'

export default function (params?: MockObjectiveStackParams) : ObjectiveStack {  
  return ObjectiveStack.fromPersistence({
    pile: params?.pile ?? [],
    current: params?.current ?? [],
    complete: params?.complete ?? [],
    discard: params?.discard ?? [],
  })
}

export interface MockObjectiveStackParams {
  pile?: number[]
  current?: number[]
  complete?: number[]
  discard?: number[]
}
