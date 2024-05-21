import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Image } from 'react-bootstrap';
import Logo from '../images/Potologo.png';
import Button from 'react-bootstrap/Button';

const Login = () => {
  return (
    <div className='d-flex justify-content-center '>
      <Card className='login_card p-4'>
        <Image src={Logo} width={150} className='mx-auto'/>
        <h3 className='text-center'>Soporte Tecnico</h3>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
            >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Button type="submit" className='mt-3 mx-auto px-5'>Entrar</Button>
        </Form>
      </Card>
    </div>
  )
}

export default Login