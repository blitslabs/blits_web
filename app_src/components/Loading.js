import React from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import ReactLoading from 'react-loading';

import './styles.css'

function Loading(props) {
    return (
        <Row style={{ marginTop:'100px', height: '200px', }}>
            <Col md={{ span: 8, offset: 2 }} style={{ textAlign: 'center' }}>                
                    <ReactLoading className="preloader" type='spin' color='#274d00' height={40} width={40} />                
            </Col>
        </Row>
    )
}

export default Loading