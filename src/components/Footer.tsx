import React from "react";
import { Github } from "react-bootstrap-icons";

export default function Footer() {
  return (
    <footer className="d-flex flex-column align-items-center mt-5 border-top">
      <p>Author: Szymon Abramowski</p>
      <p>
        <Github className="icon icon-github" />
        &nbsp;
        <a href="https://github.com/szymAbr" target="_blank" rel="noreferrer">
          szymAbr
        </a>
      </p>
    </footer>
  );
}
