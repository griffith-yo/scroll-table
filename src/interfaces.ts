import { SortOrder } from 'antd/lib/table/interface'
import { TableData, UserInfo } from './users-api.service'

export interface IAppColumns {
  title: string
  dataIndex: string
  key: string
  defaultSortOrder?: SortOrder | undefined
  sorter: {
    compare(a: UserInfo, b: UserInfo): number
    multiple: number
  }
}

export interface IAppState {
  loading: boolean
  alert: string | null
}

export interface IDataState {
  page: number
  fetchedUsers: TableData<UserInfo>
}

export interface IActionType {
  type: string
}

export interface IPageAction extends IActionType {
  payload: number
}

export interface IDataReducer extends IActionType {
  payload: IDataState
}

export interface IAppReducer extends IActionType {
  payload: IAppState
}

export interface IRootReducer {
  data: IDataState
  app: IAppState
}
