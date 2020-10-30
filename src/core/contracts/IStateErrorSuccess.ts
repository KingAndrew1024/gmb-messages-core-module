
export interface IGmbMessagesStateError {
    after: 'GET' | 'SET_READ' | 'UNKNOWN'
    error: any
}

export interface IGmbMessagesStateSuccess {
    after: 'GET' | 'SET_READ' | 'UNKNOWN'
}
