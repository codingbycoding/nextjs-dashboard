import {
  Card, CardBody, Col, Row,
} from 'react-bootstrap'
import Register from '@/app/(authentication)/register/register'

export default function Page() {
  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card className="mb-4 rounded-0">
          <CardBody className="p-4">
            <h1>注册账户</h1>
            <p className="text-black-50">请创建您的账户</p>
            <Register />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
