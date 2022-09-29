import { Container } from "react-bootstrap";

export default function Centered({ children, style }) {
  return (
    <Container
      className="mt-3 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={style}>
        {children}
      </div>
    </Container>
  );
}
