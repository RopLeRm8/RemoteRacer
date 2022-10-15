import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../content/racing.png";
import { RefreshFonts } from "../providers/FontProvider";
import "../css/NavBar.css";
import { Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import Dashboard from "../components/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";

export default function NavBar() {
  const auth = getAuth();
  RefreshFonts();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="nav">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          <span className="mainLabel ms-3">RemoteRacer</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Icons.PeopleFill className="mt-2" />
            <Nav.Link className="labels">LeaderBoard</Nav.Link>
          </Nav>
          <Nav>
            <Icons.PaletteFill className="mt-3" />
            <Nav.Link className="mt-2 labels">Customize</Nav.Link>
            <Icons.QuestionCircleFill className="mt-3" />
            <Nav.Link className="mt-2 labels">About us</Nav.Link>
            <Nav.Link>
              <Button
                onClick={() => {
                  localStorage.setItem("firstTime", "false");
                  auth.signOut();
                }}
                className="btn btn-danger labels"
              >
                <Icons.PersonDashFill className="me-2" />
                Sign out
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
