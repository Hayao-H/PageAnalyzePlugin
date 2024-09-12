export interface DMSResponse {
    meta: Meta
    data: Data
  }
  
  export interface Meta {
    status: number
  }
  
  export interface Data {
    contentUrl: string
    createTime: string
    expireTime: string
  }
  