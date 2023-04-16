import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './css/tarjetas.css';

const CardComponent = ({ image,category, title, content }) => {
  return (
    <Card border="light" className='card text-center bg-dark shadow-longer cardEventos' style={{ width: '18rem' }}>
      <Card.Header className='text-light'>{category}</Card.Header>
      <Card.Img variant="top" src={image} className='imgCard'/>
      <Card.Body className='text-light'>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <Button variant="primary" className=''>¡Compra ahora!</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;