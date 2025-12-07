import React, { useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button, Card, Row, Col, Form, ListGroup } from "react-bootstrap";

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [session, setSession] = useState("Cardiology");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking details:", { name, phone, session, date, time });
    setSubmitted(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "test@healix.com" && password === "password") {
        setLoginMessage("Login Successful! Welcome back.");
    } else {
        setLoginMessage("Invalid email or password. Try 'test@healix.com' and 'password'.");
    }
  };

  const PRIMARY_COLOR = "#178f6a";
  const ACCENT_COLOR = "#0b4f41";
  const TEXT_MUTED = "#6b7280"; 
  const BG_LIGHT = "#f8f9fa";

  const navbar = (
    <Navbar expand="md" style={{ backgroundColor: '#fff' }} className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: ACCENT_COLOR, fontWeight: "bold", fontSize: '1.5rem' }}>
          <span style={{ color: PRIMARY_COLOR }}>H</span>EALIX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" className="d-flex align-items-center me-3" style={{ backgroundColor: BG_LIGHT, borderRadius: '6px', color: PRIMARY_COLOR }}>
              🏠 Home
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login" className="me-2" style={{ color: ACCENT_COLOR }}>
              ➡️ Login
            </Nav.Link>
            <Button as={Link} to="/book" style={{ backgroundColor: PRIMARY_COLOR, border: 'none', fontWeight: 500 }}>
              Get Started
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  const footer = (
    <footer style={{ marginTop: "3rem", padding: "2rem", borderTop: "1px solid #eee", textAlign: "center", color: TEXT_MUTED, backgroundColor: '#fff' }}>
      © {new Date().getFullYear()} HEALIX — All rights reserved.
    </footer>
  );

  const Login = () => (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2 style={{ color: ACCENT_COLOR, fontWeight: "bold", marginBottom: "1.5rem", textAlign: 'center' }}>
            Sign In to Your Account
        </h2>
        <Card style={{ padding: "1.5rem", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0,0,0,0.06)", border: 'none' }}>
            <Card.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {loginMessage && (
                        <p style={{ color: loginMessage.includes('Successful') ? PRIMARY_COLOR : 'red', textAlign: 'center', fontWeight: 'bold' }}>
                            {loginMessage}
                        </p>
                    )}

                    <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100" 
                        style={{ backgroundColor: PRIMARY_COLOR, border: "none", fontWeight: 600 }}
                    >
                        Login
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    <Link to="/register" style={{ color: PRIMARY_COLOR, textDecoration: 'none' }}>
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </Card.Body>
        </Card>
    </div>
  );

  const Home = () => {
    const QuickAppointmentCard = () => (
      <Card style={{ 
          borderRadius: "20px", 
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)", 
          border: 'none', 
          backgroundColor: '#fff',
          padding: '1.5rem 1rem'
      }}>
        <Card.Body>
          <Card.Title className="d-flex align-items-center" style={{ color: ACCENT_COLOR }}>
            <span style={{ color: PRIMARY_COLOR, fontSize: '1.5rem', marginRight: '0.5rem' }}>🩺</span>
            Quick Appointment
          </Card.Title>
          <Card.Subtitle className="mb-3 text-muted" style={{ fontSize: '0.9rem' }}>Book in 2 minutes</Card.Subtitle>

          <ListGroup variant="flush" style={{ border: 'none' }}>
            <ListGroup.Item className="d-flex align-items-center" style={{ border: 'none', padding: '0.75rem 0' }}>
              <span style={{ color: '#dc3545', fontSize: '1.25rem', marginRight: '0.75rem' }}>❤️</span> Cardiology
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center" style={{ border: 'none', padding: '0.75rem 0' }}>
              <span style={{ color: PRIMARY_COLOR, fontSize: '1.25rem', marginRight: '0.75rem' }}>⚕️</span> General Medicine
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center" style={{ border: 'none', padding: '0.75rem 0' }}>
              <span style={{ color: '#0dcaf0', fontSize: '1.25rem', marginRight: '0.75rem' }}>📉</span> Orthopedics
            </ListGroup.Item>
          </ListGroup>
          
          <div 
            className="d-flex justify-content-between align-items-center mt-4 p-3" 
            style={{ 
              backgroundColor: PRIMARY_COLOR, 
              borderRadius: "12px", 
              color: 'white' 
            }}
          >
            <div>
              <p className="mb-0" style={{ fontSize: '0.8rem', opacity: 0.8 }}>Next Available</p>
              <p className="mb-0" style={{ fontWeight: 'bold' }}>Today, 2:00 PM</p>
            </div>
            <Button as={Link} to="/book" style={{ backgroundColor: '#fff', color: PRIMARY_COLOR, border: 'none', fontWeight: 600 }}>
              Book Now
            </Button>
          </div>
        </Card.Body>
      </Card>
    );

    return (
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <p style={{ color: PRIMARY_COLOR, fontWeight: 500, fontSize: '1rem' }}>
              <span style={{ 
                display: 'inline-block', 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: PRIMARY_COLOR, 
                marginRight: '8px' 
              }}></span>
              Your Health, Our Priority
            </p>
            <h1 style={{ 
              color: ACCENT_COLOR, 
              fontWeight: "bold", 
              fontSize: '3.5rem', 
              lineHeight: '1.1' 
            }}>
              Healthcare Made 
              <br />
              <span style={{ color: PRIMARY_COLOR }}>Simple & Accessible</span>
            </h1>
            <p className="mt-3" style={{ color: TEXT_MUTED, fontSize: '1.1rem', maxWidth: '450px' }}>
              Book appointments with top doctors in minutes. HEALIX provides a seamless 
              healthcare experience with our modern booking platform.
            </p>

            <div className="mt-4 d-flex align-items-center">
              <Button as={Link} to="/book" style={{ 
                backgroundColor: PRIMARY_COLOR, 
                border: "none", 
                marginRight: "1rem", 
                padding: '0.75rem 1.5rem', 
                fontSize: '1.1rem',
                fontWeight: 600
              }}>
                Get Started →
              </Button>
              <Button as={Link} to="/login" variant="outline-dark" style={{ 
                borderColor: '#ccc', 
                color: '#333',
                padding: '0.75rem 1.5rem',
                fontSize: '1.1rem'
              }}>
                Sign In
              </Button>
            </div>

            <div className="mt-5 d-flex">
              <div className="me-5">
                <h3 style={{ color: ACCENT_COLOR, fontWeight: "bold" }}>500+</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Patients Served</p>
              </div>
              <div className="me-5">
                <h3 style={{ color: ACCENT_COLOR, fontWeight: "bold" }}>50+</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Expert Doctors</p>
              </div>
              <div>
                <h3 style={{ color: ACCENT_COLOR, fontWeight: "bold" }}>4.9</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>User Rating</p>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <QuickAppointmentCard />
          </Col>
        </Row>
      </Container>
    );
  };
  
  const Services = () => {
    const services = [
      { title: "Cardiology", desc: "Expert heart health assessments and treatment plans." },
      { title: "General Medicine", desc: "Comprehensive primary care and preventative health." },
      { title: "Orthopedics", desc: "Specialized care for bones, joints, and muscles." },
      { title: "Dermatology", desc: "Consultations for skin, hair, and nail conditions." },
      { title: "Pediatrics", desc: "Healthcare for infants, children, and adolescents." },
    ];

    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ color: ACCENT_COLOR, fontWeight: "bold", marginBottom: "1.5rem" }}>Our Specialized Services</h2>
        <Row xs={1} md={3} className="g-4">
          {services.map((s, i) => (
            <Col key={i}>
              <Card style={{ padding: "1rem", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0,0,0,0.06)", border: `1px solid ${PRIMARY_COLOR}30` }}>
                <h5 style={{ color: ACCENT_COLOR, fontWeight: "bold" }}>{s.title}</h5>
                <p style={{ color: TEXT_MUTED, fontSize: '0.9rem' }}>{s.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const Book = () => (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ color: ACCENT_COLOR, fontWeight: "bold", marginBottom: "1rem" }}>Book an Appointment</h2>
      <div style={{ padding: "1.5rem", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
        {!submitted ? (
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}><Form.Control placeholder="Patient name" value={name} onChange={e => setName(e.target.value)} required /></Col>
              <Col md={6}><Form.Control placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} required /></Col>
              <Col md={12}>
                <Form.Select value={session} onChange={e => setSession(e.target.value)} required>
                  <option>Cardiology</option>
                  <option>General Medicine</option>
                  <option>Orthopedics</option>
                  <option>Dermatology</option>
                  <option>Pediatrics</option>
                </Form.Select>
              </Col>
              <Col md={6}><Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} required /></Col>
              <Col md={6}><Form.Control type="time" value={time} onChange={e => setTime(e.target.value)} required /></Col>
              <Col md={12}><Button type="submit" className="w-100" style={{ backgroundColor: PRIMARY_COLOR, border: "none" }}>Confirm Booking</Button></Col>
            </Row>
          </Form>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <h3 style={{ color: ACCENT_COLOR, fontWeight: "bold" }}>Booking Confirmed! ✅</h3>
            <p style={{ marginTop: ".5rem", color: TEXT_MUTED }}>{name} — {session}</p>
            <p style={{ marginTop: ".25rem", color: TEXT_MUTED }}>{date} at {time}</p>
            <Button className="mt-4" style={{ backgroundColor: PRIMARY_COLOR, border: "none" }} onClick={() => setSubmitted(false)}>Make another</Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: BG_LIGHT, minHeight: '100vh' }}>
      {navbar}
      <main style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<Book />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Login />} /> 
        </Routes>
      </main>
      {footer}
    </div>
  );
}