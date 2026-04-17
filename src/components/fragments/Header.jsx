import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import headerJson from '../../json_utils/headerJson';
import MegaMenu from './MegaMenu';

const Header = () => {
  const [expanded,  setExpanded]  = useState(false);
  const [megaOpen,  setMegaOpen]  = useState(false);
  const location = useLocation();

  /* Close mega-menu on route change */
  useEffect(() => { setMegaOpen(false); setExpanded(false); }, [location.pathname]);

  const close     = ()  => { setExpanded(false); setMegaOpen(false); };
  const toggleMega = () => { setMegaOpen(o => !o); setExpanded(false); };

  const isDropdownActive = (item) =>
    item.subMenu?.some(sub => location.pathname === sub.href);

  const megaCategories = headerJson.menu.find(m => m.megaMenu)?.megaMenu ?? [];

  return (
    <>
      <Navbar
        bg="primary" variant="dark" expand="lg" sticky="top"
        className="shadow-sm" expanded={expanded} onToggle={setExpanded}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={close} className="fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-file-earmark-pdf-fill" style={{ fontSize: '1.3rem' }}></i>
            {headerJson.brand.name}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" aria-label="Toggle navigation" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-lg-center">
              {headerJson.menu.map((item, index) => {

                /* ── Mega-menu trigger ── */
                if (item.megaMenu) return (
                  <Nav.Link
                    key={index}
                    onClick={toggleMega}
                    active={megaOpen}
                    className="d-flex align-items-center gap-1"
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    {item.icon && <i className={`bi ${item.icon}`}></i>}
                    {item.name}
                    <i className={`bi bi-chevron-${megaOpen ? 'up' : 'down'} ms-1`} style={{ fontSize: '0.72rem', opacity: 0.8 }}></i>
                  </Nav.Link>
                );

                /* ── Regular sub-menu dropdown ── */
                if (item.subMenu) return (
                  <NavDropdown
                    key={index}
                    title={<span className={isDropdownActive(item) ? 'fw-semibold' : ''}>{item.name}</span>}
                    id={`nav-dropdown-${index}`}
                    className={isDropdownActive(item) ? 'active' : ''}
                  >
                    {item.subMenu.map((sub, si) => (
                      <NavDropdown.Item key={si} as={Link} to={sub.href} onClick={close} className="d-flex align-items-center gap-2">
                        <i className={`bi ${sub.icon} text-primary`}></i>
                        {sub.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                );

                /* ── Regular nav link ── */
                return (
                  <Nav.Link
                    key={index}
                    as={NavLink}
                    to={item.href || '#'}
                    onClick={close}
                    className={`d-flex align-items-center gap-1${item.mobileOnly ? ' d-lg-none' : ''}`}
                  >
                    {item.icon && <i className={`bi ${item.icon}`}></i>}
                    {item.name}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {megaOpen && <MegaMenu categories={megaCategories} onClose={() => setMegaOpen(false)} />}
    </>
  );
};

export default Header;
