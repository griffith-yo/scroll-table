import { Table, notification } from 'antd'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootReducer, IAppColumns } from './interfaces'
import { fetchUsers, plusPage } from './redux/actions'

const App = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootReducer) => state.app.loading)
  const alert = useSelector((state: IRootReducer) => state.app.alert)
  const fetchedUsers = useSelector(
    (state: IRootReducer) => state.data.fetchedUsers
  )
  const page = useSelector((state: IRootReducer) => state.data.page)
  const openNotification = useCallback((): void => {
    const args = {
      message: 'Ошибка',
      description: alert,
      duration: 3,
    }
    notification.open(args)
  }, [alert])

  const columns: Array<IAppColumns> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: 'firstName',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: {
        compare: (a, b) => a.firstName.length - b.firstName.length,
        multiple: 2,
      },
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: {
        compare: (a, b) => a.lastName.length - b.lastName.length,
        multiple: 2,
      },
    },
    {
      title: 'profession',
      dataIndex: 'profession',
      key: 'profession',
      sorter: {
        compare: (a, b) => a.profession.length - b.profession.length,
        multiple: 3,
      },
    },
  ]

  // Получаем ключи колонок таблицы
  // const columns: Array<IColumns> | undefined = fetchedUsers.data.length
  //   ? Object.keys(fetchedUsers.data[0]).map((info, key) => ({
  //       title: info,
  //       dataIndex: info,
  //       key: info,
  //     }))
  //   : undefined

  // Обработка notifications
  useEffect(() => {
    if (alert) openNotification()
  }, [alert, openNotification])

  // Получение списка пользователей с бекенда
  useEffect(() => {
    dispatch(fetchUsers(page))
  }, [page, dispatch])

  // Прослушиваем событие скролла колеса мыши
  useEffect(() => {
    const scrollHandler = () => {
      dispatch(plusPage())
    }
    document.addEventListener('wheel', scrollHandler)

    // Отключим событие на unmount компонента
    return () => document.removeEventListener('wheel', scrollHandler)
  })

  return (
    <div className="container">
      <Table
        rowKey="id"
        dataSource={fetchedUsers.data}
        columns={columns}
        loading={isLoading}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  )
}

export default App
