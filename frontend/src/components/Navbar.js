import React from "react";

export function Navbar() {
  const pathname = window.location.pathname;

  return (
    <nav id="nav-wrap">
      <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
        Show navigation
      </a>
      <a className="mobile-btn" href="#home" title="Hide navigation">
        Hide navigation
      </a>

      <ul id="nav" className="nav">
        <li className="current">
          <a className={pathname === "/" ? "smoothscroll" : "external"} href="/#home">
            Home
          </a>
        </li>

        <li>
          <a className={pathname === "/" ? "smoothscroll" : "external"} href="/#about">
            About
          </a>
        </li>

        <li>
          <a className={pathname === "/" ? "smoothscroll" : "external"} href="/#resume">
            Resume
          </a>
        </li>

        <li>
          <a className={pathname === "/" ? "smoothscroll" : "external"} href="/#portfolio">
            Works
          </a>
        </li>

        <li>
          <a className={pathname === "/" ? "smoothscroll" : "external"} href="/#contact">
            Contact
          </a>
        </li>

        <li>
          <a class={pathname === "/kanban" ? "smoothscroll" : "external"} href="/kanban">
            Kanban
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
