'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import headerJson from '@/json_utils/headerJson';
import MegaMenu from './MegaMenu';

const Header = () => {
  const [expanded,  setExpanded]  = useState(false);
  const [megaOpen,  setMegaOpen]  = useState(false);
  // clickDrop: { index, left, top } – set when a subMenu item is clicked
  const [clickDrop, setClickDrop] = useState(null);
  const pathname = usePathname();

  // one ref per menu item (by index) so we can read bounding rect
  const itemRefs  = useRef({});
  const navbarRef = useRef(null);
  const dropRef   = useRef(null);

  /* close everything on route change */
  useEffect(() => {
    setMegaOpen(false);
    setExpanded(false);
    setClickDrop(null);
  }, [pathname]);

  const close = () => { setExpanded(false); setMegaOpen(false); setClickDrop(null); };

  /* ── Toggle handlers (click-only, no hover) ── */
  const toggleMega = (e) => {
    e.preventDefault();
    setClickDrop(null);
    setMegaOpen(o => !o);
  };

  const toggleDrop = (e, idx) => {
    e.preventDefault();
    setMegaOpen(false);
    setClickDrop(prev => {
      if (prev?.index === idx) return null;
      const itemRect = itemRefs.current[idx]?.getBoundingClientRect();
      const navRect  = navbarRef.current?.getBoundingClientRect();
      return {
        index: idx,
        left:  itemRect?.left  ?? 0,
        top:   navRect?.bottom ?? 60,
      };
    });
  };

  /* ── Click outside to close dropdown ── */
  useEffect(() => {
    if (clickDrop === null) return;
    const onDocClick = (e) => {
      if (dropRef.current?.contains(e.target)) return;
      if (itemRefs.current[clickDrop.index]?.contains(e.target)) return;
      setClickDrop(null);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [clickDrop]);

  const isDropdownActive = (item) => item.subMenu?.some(sub => pathname === sub.href);
  const megaCategories   = headerJson.menu.find(m => m.megaMenu)?.megaMenu ?? [];

  /* active subMenu item (if any) */
  const activeDropItem = clickDrop !== null ? headerJson.menu[clickDrop.index] : null;

  return (
    <>
      <Navbar
        ref={navbarRef}
        bg="primary" variant="dark" expand="lg" sticky="top"
        className="shadow-sm" expanded={expanded} onToggle={setExpanded}
      >
        <Container>
          <Navbar.Brand as={Link} href="/" onClick={close} className="fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-file-earmark-pdf-fill" aria-hidden="true" style={{ fontSize: '1.3rem' }} />
            {headerJson.brand.name}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" aria-label="Toggle navigation" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-lg-center">
              {headerJson.menu.map((item, index) => {

                /* ── MegaMenu item: click toggles mega menu (no navigation) ── */
                if (item.megaMenu) return (
                  <Nav.Link
                    key={index}
                    href="#"
                    onClick={toggleMega}
                    active={megaOpen}
                    className="d-flex align-items-center gap-1"
                  >
                    {item.icon && <i className={`bi ${item.icon}`} aria-hidden="true" />}
                    {item.name}
                    <i
                      className={`bi bi-chevron-${megaOpen ? 'up' : 'down'} ms-1`}
                      aria-hidden="true"
                      style={{ fontSize: '0.72rem', opacity: 0.8 }}
                    />
                  </Nav.Link>
                );

                /* ── SubMenu item: click toggles dropdown (no navigation on desktop) ── */
                if (item.subMenu) return (
                  <div
                    key={index}
                    ref={el => { itemRefs.current[index] = el; }}
                  >
                    <Nav.Link
                      href="#"
                      onClick={(e) => toggleDrop(e, index)}
                      active={isDropdownActive(item) || clickDrop?.index === index}
                      className="d-flex align-items-center gap-1"
                    >
                      {item.icon && <i className={`bi ${item.icon}`} aria-hidden="true" />}
                      {item.name}
                      <i
                        className={`bi bi-chevron-${clickDrop?.index === index ? 'up' : 'down'} ms-1`}
                        aria-hidden="true"
                        style={{ fontSize: '0.72rem', opacity: 0.8 }}
                      />
                    </Nav.Link>

                    {/* Mobile: inline sub-items */}
                    <div className="d-lg-none ms-3">
                      {item.subMenu.map((sub, si) => (
                        <Nav.Link key={si} as={Link} href={sub.href} onClick={close}
                          active={pathname === sub.href}
                          className="d-flex align-items-center gap-2 py-1"
                          style={{ fontSize: '0.875rem' }}
                        >
                          <i className={`bi ${sub.icon}`} aria-hidden="true" style={{ width: 18, textAlign: 'center' }} />
                          {sub.name}
                        </Nav.Link>
                      ))}
                    </div>
                  </div>
                );

                /* ── Plain link ── */
                return (
                  <Nav.Link
                    key={index}
                    as={Link}
                    href={item.href || '#'}
                    onClick={close}
                    className={`d-flex align-items-center gap-1${item.mobileOnly ? ' d-lg-none' : ''}`}
                    active={pathname === item.href}
                  >
                    {item.icon && <i className={`bi ${item.icon}`} aria-hidden="true" />}
                    {item.name}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ── SubMenu dropdown — rendered OUTSIDE navbar, fixed below it ── */}
      {clickDrop !== null && activeDropItem?.subMenu && (
        <div
          ref={dropRef}
          className="d-none d-lg-block"
          style={{
            position: 'fixed',
            top:  clickDrop.top,
            left: clickDrop.left,
            zIndex: 1045,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(15,23,42,0.14)',
            border: '1px solid #e5e7eb',
            padding: '6px',
            minWidth: 230,
          }}
        >
          {activeDropItem.subMenu.map((sub, si) => (
            <Link
              key={si}
              href={sub.href}
              onClick={close}
              className="d-flex align-items-center gap-2 text-decoration-none rounded-2"
              style={{
                padding: '8px 12px',
                fontSize: '0.875rem',
                color: '#374151',
                transition: 'background 0.12s, color 0.12s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.color = '#4f46e5'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; }}
            >
              <i className={`bi ${sub.icon}`} aria-hidden="true" style={{ color: '#5b5ef4', fontSize: '0.9rem', width: 18, textAlign: 'center' }} />
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      {/* ── MegaMenu — rendered outside navbar ── */}
      {megaOpen && (
        <MegaMenu
          categories={megaCategories}
          onClose={() => setMegaOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
