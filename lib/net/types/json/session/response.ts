export interface Response {
    meta: Meta
    data: Data
  }
  
  export interface Meta {
    status: number
    message: string
  }
  
  export interface Data {
    session: Session
  }
  
  export interface Session {
    id: string
    content_uri: string
  }