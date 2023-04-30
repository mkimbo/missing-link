"use client";

import React, { useState, useEffect } from "react";
import { DiJqueryLogo } from "react-icons/di";
import { FiMenu } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { clientConfig } from "../../config/client-config";
import classNames from "classnames";
export function Navbar() {
  const [click, setClicked] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const navMenuClasses = classNames(styles.navMenu, styles.navMenuActive);

  const navBarClasses = classNames(
    styles.navbarContainer,
    styles.navbarContainerActive
  );

  const handleClick = () => {
    setClicked(!click);
  };

  const handleCloseMobileMenu = () => {
    setClicked(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    });
  }, []);

  return (
    <nav className={showNav ? styles.navbarContainer : navBarClasses}>
      <Link href="/" className={styles.navbarLogo}>
        <DiJqueryLogo />
        {/* <span>React Navbar</span> */}
      </Link>
      <div className={styles.menuIcon} onClick={handleClick}>
        {click ? <GrClose /> : <FiMenu />}
      </div>
      <ul className={click ? navMenuClasses : styles.navMenu}>
        <li className={styles.navLinkItems} onClick={handleClick}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navLinkItems} onClick={handleCloseMobileMenu}>
          <Link href="/profile" className={styles.navLink}>
            Profile
          </Link>
        </li>
        <li className={styles.navLinkItems} onClick={handleCloseMobileMenu}>
          <Link href="/register" className={styles.navLink}>
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
