/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route, Navigate } from "react-router-dom"
import { adminRoutes, IRouter } from "./router"
import Frame from './components/frame/Frame'
import { Fragment, ReactNode } from "react"

/**
 * 动态生成路由
 */
const generateRouter = (routerList: IRouter[]): ReactNode => {
  return (
    <>
      {
        // Only do this if items have no stable IDs
        routerList?.map(r => {
          if (r.children) {
            return (
              <Fragment key={r.key}>
                {generateRouter(r.children)}
              </Fragment>
            )
          }
          // 一级路由已经带上/admin，所以需要使用key填充完整路由
          return <Route key={r.path} path={r.key} element={r.component} />
        })
      }
    </>
  )
}

const App = () => {
  return (
    <Frame>
      <Routes>
        {
          generateRouter(adminRoutes)
        }
        {/* 找不到匹配的路由，则重定向到404 */}
        <Route path="*" key="404" element={<Navigate to="/404" />} />
      </Routes>
    </Frame>
  )
}

export default App