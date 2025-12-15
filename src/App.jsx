import React, { useState, createContext, useContext } from "react";
import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button, Card, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiVideo, FiCalendar, FiMessageSquare, FiActivity } from "react-icons/fi";
import { FaHeartbeat, FaBone, FaPills, FaBaby, FaEye, FaStethoscope } from "react-icons/fa";
const PALETTES = {
  light: {
    bgPrimary: "#faf5ff",    // Very pale purple bg
    bgSecondary: "#ffffff",  // White card bg
    textMain: "#2e1065",     // Deep purple text
    textMuted: "#6b21a8",    // Medium purple text
    accent: "#7c3aed",       // Vibrant purple action color
    accentHover: "#6d28d9",
    border: "#e9d5ff",
    inputBg: "#f3e8ff",      // Light purple inputs
    cardGlow: "0 10px 30px rgba(124, 58, 237, 0.1)"
  },
  dark: {
    bgPrimary: "#0f0720",    // Deep indigo bg
    bgSecondary: "#1a103c",  // Dark violet card bg (Glassmorphism base)
    textMain: "#f3e8ff",     // Light lavender text
    textMuted: "#c4b5fd",    // Muted lavender text
    accent: "#a855f7",       // Neon purple accent
    accentHover: "#9333ea",
    border: "#2e1065",
    inputBg: "#2e1065",      // Dark inputs
    cardGlow: "0 10px 30px rgba(168, 85, 247, 0.2)"
  }
};

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? PALETTES.dark : PALETTES.light;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <div style={{ 
        backgroundColor: theme.bgPrimary, 
        color: theme.textMain,
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        transition: "background-color 0.4s ease, color 0.4s ease" 
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.03, 
    y: -8,
    boxShadow: "0 20px 40px rgba(124, 58, 237, 0.3)",
    transition: { type: "spring", stiffness: 300 } 
  }
};

const StyledButton = ({ children, onClick, variant = "primary", ...props }) => {
  const { theme } = useTheme();
  const isOutline = variant === "outline";

  const bg = isOutline ? "transparent" : theme.accent;
  const textColor = isOutline ? theme.textMain : "#fff";
  const border = isOutline ? `2px solid ${theme.accent}` : "none";

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={onClick}
        {...props}
        style={{
          backgroundColor: bg,
          color: textColor,
          border: border,
          borderRadius: "50px",
          padding: "0.7rem 2rem",
          fontWeight: "700",
          boxShadow: variant === 'primary' ? theme.cardGlow : 'none',
          transition: "all 0.3s ease",
          ...props.style
        }}
        onMouseOver={(e) => { 
          if(!isOutline) e.currentTarget.style.backgroundColor = theme.accentHover;
        }}
        onMouseOut={(e) => { 
          if(!isOutline) e.currentTarget.style.backgroundColor = theme.accent;
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};
const Navigation = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  return (
    <Navbar expand="md" sticky="top" style={{ backgroundColor: theme.bgSecondary, padding: "1rem 0", boxShadow: theme.cardGlow, transition: "background-color 0.4s ease" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: theme.textMain, fontWeight: "900", fontSize: '1.8rem', letterSpacing: '-1px' }}>
        <motion.span 
            initial={{ color: theme.accent }}
            animate={{ color: theme.accent, rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            style={{ display: 'inline-block' }}
          >⚡</motion.span> Healix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" style={{ backgroundColor: isDarkMode ? theme.accent : 'transparent', border: 'none' }} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto" style={{ fontWeight: "600" }}>
            {['Home', 'Services', 'Doctors'].map((item) => (
               <Nav.Link as={NavLink} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} key={item} style={{ color: theme.textMain, margin: '0 10px' }}>
                 {item}
               </Nav.Link>
            ))}
          </Nav>
          <Nav className="d-flex align-items-center gap-3">
            <motion.div whileTap={{ rotate: 360, scale: 0.8 }} transition={{ duration: 0.5 }}>
              <Button onClick={toggleTheme} variant="link" style={{ color: theme.accent, fontSize: '1.5rem', padding: '5px' }}>
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </Button>
            </motion.div>
             
             <Nav.Link as={NavLink} to="/login" style={{ color: theme.textMain, fontWeight: "bold" }}>
              Log In
            </Nav.Link>
            <StyledButton as={Link} to="/book">
              Get Started
            </StyledButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const Home = () => {
  const { theme, isDarkMode } = useTheme();
  const glassStyle = isDarkMode ? {
    backdropFilter: "blur(16px) saturate(180%)",
    backgroundColor: "rgba(26, 16, 60, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.125)"
  } : {
    backgroundColor: theme.bgSecondary
  };
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      <Container fluid className="px-0 px-md-4 mt-3 mb-5">
        <motion.div 
          variants={fadeUp}
          style={{ 
            background: isDarkMode 
              ? `linear-gradient(135deg, ${theme.accent}20 0%, ${theme.bgPrimary} 100%)` 
              : `linear-gradient(135deg, ${theme.accent}15 0%, #ffffff 100%)`,
            borderRadius: "40px", 
            padding: "4rem 2rem", 
            position: "relative",
            overflow: "hidden",
            border: `1px solid ${theme.border}`
          }}>
            <motion.div 
            animate={{ 
              scale: [1, 1.2, 1], rotate: [0, 90, 0],
              x: [0, 100, 0], y: [0, -50, 0] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px',
              background: theme.accent, opacity: isDarkMode ? 0.15 : 0.08, borderRadius: '40%', filter: 'blur(80px)', zIndex: 0
            }}
          />

          <Row className="align-items-center" style={{ position: 'relative', zIndex: 1 }}>
            <Col md={6} className="pb-5">
              <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: "800", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                Future of <br />
                <span style={{ color: theme.accent, textShadow: theme.cardGlow }}>Healthcare</span>
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: theme.textMuted, fontSize: "1.2rem", maxWidth: "500px", marginBottom: "2.5rem" }}>
                  Experience smart, accessible, and personalized medicine. Your journey to better health starts here.
              </motion.p>
              <motion.div variants={fadeUp} className="d-flex gap-3">
                <StyledButton as={Link} to="/book">Book Now →</StyledButton>
                <StyledButton variant="outline" as={Link} to="/services">Learn More</StyledButton>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>

      
      <Container className="mb-5">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Row className="g-4">
            {[
              { title: "Instant Video Consult", icon: <FiVideo />, color: "#a855f7", link: "/book" },
              { title: "Schedule Appointment", icon: <FiCalendar />, color: "#ec4899", link: "/book" },
              { title: "Live Chat Support", icon: <FiMessageSquare />, color: "#3b82f6", link: "/contact" },
              { title: "Health Tracking", icon: <FiActivity />, color: "#14b8a6", desc: "Coming Soon", link: "#" }
            ].map((item, idx) => (
              <Col md={3} sm={6} key={idx}>
                <Link to={item.link} style={{ textDecoration: 'none' }}>
                  <motion.div variants={fadeUp} initial="rest" whileHover="hover" animate="rest">
                    <Card style={{ 
                        ...glassStyle,
                        border: isDarkMode ? glassStyle.border : "none", 
                        borderRadius: "30px", 
                        padding: "1.5rem",
                        height: "100%",
                        color: theme.textMain,
                        boxShadow: isDarkMode ? 'none' : theme.cardGlow,
                        overflow: "hidden",
                        position: "relative"
                      }}
                    >
                      <div style={{ position: "absolute", top: "-20%", left: "-20%", width: "150px", height: "150px", background: item.color, opacity: 0.2, borderRadius: "50%", filter: "blur(50px)" }}></div>
                      
                      <Card.Body className="d-flex flex-column align-items-center text-center" style={{ zIndex: 1 }}>
                        <motion.div 
                          variants={cardHover}
                          style={{ fontSize: "3rem", color: item.color, marginBottom: "1rem", filter: `drop-shadow(0 0 10px ${item.color})` }}>
                          {item.icon}
                        </motion.div>
                        <h5 style={{ fontWeight: "700" }}>{item.title}</h5>
                        {item.desc && <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>{item.desc}</p>}
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Link>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </motion.div>
  );
};

const useFormStyles = () => {
  const { theme, isDarkMode } = useTheme();
  return {
    padding: '1rem', 
    borderRadius: '15px', 
    backgroundColor: theme.inputBg, 
    border: isDarkMode ? '1px solid transparent' : `1px solid ${theme.border}`,
    color: theme.textMain,
    boxShadow: 'none',
    transition: 'all 0.3s ease'
  };
};


const Book = () => {
  const { theme, isDarkMode } = useTheme();
  const formStyle = useFormStyles();
  const [submitted, setSubmitted] = useState(false);

 const glassCard = isDarkMode ? {
  backdropFilter: "blur(20px)",
  backgroundColor: "rgba(46, 16, 101, 0.4)",
  border: "1px solid rgba(168, 85, 247, 0.2)",
  color: "#ffffff"   
} : {
  backgroundColor: theme.bgSecondary,
  border: "none",
  boxShadow: theme.cardGlow,
  color: theme.textPrimary
};

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <Container className="py-5" style={{ maxWidth: "800px" }}>
      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
           <h2 style={{ fontWeight: "800", fontSize: "2.5rem" }}>
             Book Your <span style={{ color: theme.accent }}>Session</span>
           </h2>
           <p style={{ color: theme.textMuted }}>Instant confirmation. Flexible scheduling.</p>
        </div>

        <Card style={{ ...glassCard, padding: "2rem", borderRadius: "30px" }}>
          <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <Form onSubmit={handleSubmit}>
              <Row className="g-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{fontWeight: '700'}}>Patient Name</Form.Label>
                    <Form.Control type="text" required style={formStyle} onFocus={(e) => e.target.style.borderColor = theme.accent} onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'transparent' : theme.border} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{fontWeight: '700'}}>Phone</Form.Label>
                    <Form.Control type="tel" required style={formStyle} onFocus={(e) => e.target.style.borderColor = theme.accent} onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'transparent' : theme.border} />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label style={{fontWeight: '700'}}>Specialization</Form.Label>
                    <Form.Select style={formStyle} onFocus={(e) => e.target.style.borderColor = theme.accent} onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'transparent' : theme.border}>
                      <option>Cardiology</option>
                      <option>General Medicine</option>
                      <option>Neurology</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                   <Form.Group>
                    <Form.Label style={{fontWeight: '700'}}>Date</Form.Label>
                    <Form.Control type="date" required style={formStyle} onFocus={(e) => e.target.style.borderColor = theme.accent} onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'transparent' : theme.border} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                   <Form.Group>
                    <Form.Label style={{fontWeight: '700'}}>Time</Form.Label>
                    <Form.Control type="time" required style={formStyle} onFocus={(e) => e.target.style.borderColor = theme.accent} onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'transparent' : theme.border} />
                  </Form.Group>
                </Col>
                <Col md={12} className="mt-5">
                  <StyledButton type="submit" className="w-100" style={{fontSize: '1.2rem', padding: '1rem'}}>
                    Confirm Booking
                  </StyledButton>
                </Col>
              </Row>
            </Form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{scale: 0.8, opacity: 0}} animate={{scale: 1, opacity: 1}} className="text-center py-5">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7 }} style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</motion.div>
              <h3 style={{ fontWeight: "800", color: theme.accent }}>Booking Confirmed!</h3>
              <p style={{ color: theme.textMuted }}>We have sent the details to your phone.</p>
              <StyledButton variant="outline" onClick={() => setSubmitted(false)}>Book Another</StyledButton>
            </motion.div>
          )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </Container>
  );
};

const Services = () => {
  const { theme, isDarkMode } = useTheme();
    const serviceList =  [ {
    id: "01",
    title: "Cardiology",
    icon: <FaHeartbeat />,
    text: "Comprehensive heart care including diagnosis, treatment, and prevention of cardiovascular diseases by experienced specialists."
  },
  {
    id: "02",
    title: "Orthopedics",
    icon: <FaBone />,
    text: "Advanced care for bones, joints, muscles, and spine conditions, helping patients regain mobility and reduce pain."
  },
  {
    id: "03",
    title: "Gastroenterology",
    icon: <FaPills />,
    text: "Expert diagnosis and treatment of digestive system disorders, including stomach, liver, and intestinal conditions."
  },
  {
    id: "04",
    title: "Pediatrics",
    icon: <FaBaby />,
    text: "Specialized healthcare services for infants, children, and adolescents, ensuring healthy growth and development."
  },
  {
    id: "05",
    title: "Ophthalmology",
    icon: <FaEye />,
    text: "Complete eye care services including vision exams, eye disease treatment, and advanced diagnostic procedures."
  },
  {
    id: "06",
    title: "Pulmonology",
    icon: <FaStethoscope />,
    text: "Diagnosis and management of lung and respiratory conditions such as asthma, bronchitis, and chronic breathing disorders."
  },
];
   

  return (
    <Container className="py-5">
      <Row className="mb-5 align-items-center">
        <Col md={8}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h6 style={{ color: theme.accent, letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase' }}>Our Services</h6>
             <h2 style={{ fontWeight: "900", fontSize: "3rem", lineHeight: "1.2" }}>
                Medical specialities <br /> available in Hospital
             </h2>
          </motion.div>
        </Col>
      
      </Row>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <Row>
          {serviceList.map((s, i) => (
            <Col md={4} key={s.id} className="mb-4">
              <motion.div variants={fadeUp} whileHover={{ y: -5 }}>
                <Card className="h-100 border-0 shadow-sm p-4" 
                  style={{ 
                    borderRadius: "20px", 
                    backgroundColor: theme.bgSecondary,
                    color: theme.textMain,
                    transition: '0.3s'
                  }}>
                  <div className="mb-4" style={{ fontSize: "2.5rem", color: theme.accent }}>
                    {s.icon}
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 style={{ fontWeight: "800", margin: 0 }}>{s.title}</h4>
                    <span style={{ fontSize: "1.5rem", fontWeight: "900", color: theme.accent, opacity: 0.5 }}>{s.id}</span>
                  </div>
                  
                  <p style={{ color: theme.textMuted, fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    {s.text}
                  </p>
                  
                  <div className="mt-auto">
                    <Link to="/book" style={{ 
                      textDecoration: "none", 
                      color: "#ef4444", 
                      fontWeight: "700", 
                      fontSize: "0.85rem",
                      letterSpacing: "1px",
                      borderBottom: "2px solid #ef4444",
                      paddingBottom: "2px"
                    }}>
                      LEARN MORE
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  );
};
const Login = () => {
  const { theme, isDarkMode } = useTheme();
  const formStyle = useFormStyles();

  const glassCard = isDarkMode ? {
    backdropFilter: "blur(20px)",
    backgroundColor: "rgba(46, 16, 101, 0.6)",
    border: "1px solid rgba(168, 85, 247, 0.3)"
  } : {
    backgroundColor: theme.bgSecondary,
    border: 'none',
    boxShadow: theme.cardGlow
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5}} style={{width: '100%', maxWidth: '450px'}}>
      <Card style={{ ...glassCard, padding: "2.5rem", borderRadius: "35px" }}>
        <div className="text-center mb-4">
          <span style={{fontSize: '3rem'}}>👋</span>
          <h2 style={{ fontWeight: "800" }}>Welcome Back</h2>
        </div>
        <Form>
          <Form.Group className="mb-4">
            <Form.Control type="email" placeholder="Email address" style={formStyle} onFocus={(e) => e.target.style.borderColor = theme.accent} onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'transparent' : theme.border} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control type="password" placeholder="Password" style={formStyle} onFocus={(e) => e.target.style.borderColor = theme.accent} onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'transparent' : theme.border} />
          </Form.Group>
          <StyledButton type="submit" className="w-100" style={{padding: '1rem', fontSize: '1.1rem'}}>
            Sign In
          </StyledButton>
        </Form>
      </Card>
      </motion.div>
    </Container>
  );
};

const Doctors = () => {
  const { theme, isDarkMode } = useTheme();
  const doctors = [
    { name: "Dr. Helena Vance", spec: "Neurologist", price: "$180", img: "👩‍⚕️" },
    { name: "Dr. Amir Fayed", spec: "Cardiologist", price: "$150", img: "👨‍⚕️" },
    { name: "Dr. Sarah Lee", spec: "Psychiatrist", price: "$200", img: "👩‍⚕️" },
  ];

const cardStyle = isDarkMode
  ? {
      backgroundColor: theme.bgSecondary,
      border: `1px solid ${theme.border}`,
      color: "#ffffff",            
    }
  : {
      backgroundColor: theme.bgSecondary,
      border: "none",
      boxShadow: theme.cardGlow,
      color: "#111827",           
    };
  return (
    <Container className="my-5">
        <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="text-center mb-5">
         <h2 style={{ fontWeight: "800", fontSize: "2.5rem" }}>World-Class <span style={{color: theme.accent}}>Experts</span></h2>
      </motion.div>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <Row>
          {doctors.map((d, i) => (
            <Col md={4} key={i} className="mb-4">
              <motion.div variants={fadeUp} whileHover={{ y: -10 }}>
                <Card className="text-center p-4 h-100" style={{ ...cardStyle, borderRadius: "30px", transition: 'all 0.3s ease' }}>
                  <motion.div whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }} style={{ fontSize: '4rem', marginBottom: '1rem' }}>{d.img}</motion.div>
                  <h4 style={{ fontWeight: "800" }}>{d.name}</h4>
                  <p style={{ color: theme.accent, fontWeight: "600" }}>{d.spec}</p>
                  <h5 style={{ color: theme.textMuted, fontWeight: "700", margin: '1rem 0' }}>{d.price} <small>/ visit</small></h5>
                  <StyledButton as={Link} to="/book" variant="outline" className="mt-auto w-100">Book now</StyledButton>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  );
};
const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer style={{ backgroundColor: theme.bgSecondary, padding: "3rem 0", marginTop: "auto", textAlign: "center", borderTop: `1px solid ${theme.border}`, transition: "background-color 0.4s ease" }}>
      <Container>
        <h4 style={{ fontWeight: "900", letterSpacing: '-1px' }}><span style={{ color: theme.accent }}>⚡</span> HEALIX</h4>
        <p style={{ opacity: 0.6 }}>The future of digital medicine.</p>
      </Container>
    </footer>
  );
}
export default function App() {

  return (
    <ThemeProvider>
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} /> 
            <Route path="/book" element={<Book />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctors" element={<Doctors />} />
          </Routes>
        </AnimatePresence>
        <Footer />
    </ThemeProvider>
  );
}