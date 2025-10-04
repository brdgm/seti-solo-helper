import ObjectiveStack from '@/services/ObjectiveStack'

export default function mockObjectiveStack(params?: MockObjectiveStackParams) : ObjectiveStack {  
  return ObjectiveStack.fromPersistence({
    pile: params?.pile ?? [],
    current: params?.current ?? [],
    currentItemCheck: params?.currentItemCheck ?? (params?.current ?? []).map(() => []),
    complete: params?.complete ?? [],
    discard: params?.discard ?? [],
  })
}

export interface MockObjectiveStackParams {
  pile?: number[]
  current?: number[]
  currentItemCheck?: boolean[][]
  complete?: number[]
  discard?: number[]
}
