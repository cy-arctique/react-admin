import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { mainRoutes } from './router/index'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'w

ReactDOM.render(
  <Router>
    <Routes>
      {/* /admin开头的路由，全部由App组件渲染 */}
      <Route key="admin" path="admin/*" element={<App />} />
      {
        mainRoutes.map(route => {
          return <Route key={route.key} path={route.path} element={route.component} />
        })
      }
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
