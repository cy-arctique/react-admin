import { Button, Result } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PageNotFound extends Component {
    render() {
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary"><Link to="/admin/dashboard">Back Home</Link></Button>}
                />
            </div>
        )
    }
}
