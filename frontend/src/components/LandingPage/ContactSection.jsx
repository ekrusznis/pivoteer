const ContactSection = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    padding: "60px 20px",
  };

  const inputStyle = {
    width: "350px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "none",
    fontSize: "1rem",
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "8px",
    backgroundColor: "#9D76F9",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    transition: "0.3s ease-in-out",
  };

  return (
    <section style={containerStyle}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Contact Us</h2>
      <input type="text" placeholder="Your Name" style={inputStyle} />
      <input type="email" placeholder="Your Email" style={inputStyle} />
      <input type="text" placeholder="Subject" style={inputStyle} />
      <textarea placeholder="Your Message" style={{ ...inputStyle, height: "120px" }}></textarea>
      <button style={buttonStyle}>Send Message</button>
    </section>
  );
};

export default ContactSection;
