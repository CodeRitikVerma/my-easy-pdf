'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';

/* ══════════════════════════════════════════════════════════════════════
   §1  TEMPLATE DEFINITIONS  (20 templates)
══════════════════════════════════════════════════════════════════════ */
const TEMPLATES = [
  { id:'classic',   name:'Classic',       tag:'Professional', accent:'#1f2937', headerBg:'#1f2937',                                         sidebarBg:null,       layout:'single', heading:'underline',   nameColor:'#fff',    nameSize:28 },
  { id:'modern',    name:'Modern Blue',   tag:'Popular',      accent:'#2563eb', headerBg:'#2563eb',                                         sidebarBg:'#eff6ff',  layout:'left',   heading:'plain',       nameColor:'#fff',    nameSize:26 },
  { id:'minimal',   name:'Minimal',       tag:'Clean',        accent:'#111827', headerBg:null,                                              sidebarBg:null,       layout:'single', heading:'caps-line',   nameColor:'#111827', nameSize:34 },
  { id:'executive', name:'Executive',     tag:'Formal',       accent:'#1e3a5f', headerBg:'#1e3a5f',                                         sidebarBg:null,       layout:'single', heading:'underline',   nameColor:'#fff',    nameSize:26 },
  { id:'creative',  name:'Creative',      tag:'Creative',     accent:'#7c3aed', headerBg:'linear-gradient(135deg,#6d28d9,#4f46e5)',         sidebarBg:'#f5f3ff',  layout:'left',   heading:'border-left', nameColor:'#fff',    nameSize:28 },
  { id:'dev',       name:'Developer',     tag:'Tech',         accent:'#0ea5e9', headerBg:'#0f172a',                                         sidebarBg:'#f1f5f9',  layout:'right',  heading:'filled',      nameColor:'#38bdf8', nameSize:24 },
  { id:'coral',     name:'Coral',         tag:'Vibrant',      accent:'#dc4f38', headerBg:'#dc4f38',                                         sidebarBg:null,       layout:'single', heading:'underline',   nameColor:'#fff',    nameSize:28 },
  { id:'forest',    name:'Forest',        tag:'Fresh',        accent:'#065f46', headerBg:null,                                              sidebarBg:'#d1fae5',  layout:'left',   heading:'border-left', nameColor:'#065f46', nameSize:26 },
  { id:'elegant',   name:'Elegant',       tag:'Refined',      accent:'#92400e', headerBg:null,                                              sidebarBg:null,       layout:'single', heading:'caps-line',   nameColor:'#92400e', nameSize:36 },
  { id:'navy',      name:'Navy Pro',      tag:'Corporate',    accent:'#cbd5e1', headerBg:'#1e3a8a',                                         sidebarBg:'#1e3a8a',  layout:'left',   heading:'plain',       nameColor:'#fff',    nameSize:26 },
  { id:'bold',      name:'Bold',          tag:'Bold',         accent:'#be123c', headerBg:null,                                              sidebarBg:null,       layout:'single', heading:'filled',      nameColor:'#be123c', nameSize:42 },
  { id:'teal',      name:'Teal',          tag:'Modern',       accent:'#0d9488', headerBg:'#0d9488',                                         sidebarBg:'#f0fdfa',  layout:'right',  heading:'border-left', nameColor:'#fff',    nameSize:26 },
  { id:'compact',   name:'Compact',       tag:'Dense',        accent:'#374151', headerBg:'#374151',                                         sidebarBg:null,       layout:'single', heading:'plain',       nameColor:'#fff',    nameSize:22 },
  { id:'academic',  name:'Academic',      tag:'Academic',     accent:'#4c1d95', headerBg:null,                                              sidebarBg:null,       layout:'single', heading:'underline',   nameColor:'#4c1d95', nameSize:28 },
  { id:'gradient',  name:'Gradient',      tag:'Premium',      accent:'#818cf8', headerBg:'linear-gradient(135deg,#1e1b4b,#4f46e5,#7c3aed)', sidebarBg:null,      layout:'single', heading:'border-left', nameColor:'#fff',    nameSize:30 },
  { id:'burgundy',  name:'Burgundy',      tag:'Classic',      accent:'#7f1d1d', headerBg:'#7f1d1d',                                         sidebarBg:'#fef2f2',  layout:'right',  heading:'underline',   nameColor:'#fff',    nameSize:26 },
  { id:'slate',     name:'Slate',         tag:'Neutral',      accent:'#475569', headerBg:'#475569',                                         sidebarBg:null,       layout:'single', heading:'underline',   nameColor:'#fff',    nameSize:26 },
  { id:'rose',      name:'Rose',          tag:'Elegant',      accent:'#9f1239', headerBg:null,                                              sidebarBg:'#fff1f2',  layout:'left',   heading:'caps-line',   nameColor:'#9f1239', nameSize:28 },
  { id:'amber',     name:'Amber',         tag:'Warm',         accent:'#92400e', headerBg:'linear-gradient(135deg,#b45309,#d97706)',         sidebarBg:null,       layout:'single', heading:'underline',   nameColor:'#fff',    nameSize:28 },
  { id:'mono',      name:'Monochrome',    tag:'Minimal',      accent:'#000000', headerBg:null,                                              sidebarBg:null,       layout:'single', heading:'caps-line',   nameColor:'#000000', nameSize:30 },
];

/* ══════════════════════════════════════════════════════════════════════
   §2  DEFAULT DATA
══════════════════════════════════════════════════════════════════════ */
const DEFAULT_DATA = {
  personal: {
    name: 'Alex Johnson', title: 'Senior Software Engineer',
    email: 'alex@email.com', phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA', linkedin: 'linkedin.com/in/alexjohnson', website: 'alexjohnson.dev',
  },
  summary: 'Results-driven software engineer with 6+ years of experience building scalable web applications. Skilled in React, Node.js, and cloud architecture. Passionate about clean code and exceptional user experiences.',
  experience: [
    { id: 1, company: 'Google', role: 'Senior Software Engineer', location: 'Mountain View, CA', start: 'Jan 2022', end: 'Present',
      bullets: ['Led development of a high-traffic API serving 10M+ daily requests', 'Mentored 4 junior engineers and improved code review practices', 'Reduced page load time by 40% through strategic optimizations'] },
    { id: 2, company: 'Airbnb', role: 'Software Engineer', location: 'San Francisco, CA', start: 'Jun 2019', end: 'Dec 2021',
      bullets: ['Built React components used by 2M+ monthly active users', 'Implemented A/B testing framework increasing conversion by 12%'] },
  ],
  education: [{ id: 1, institution: 'UC Berkeley', degree: 'B.S. Computer Science', start: '2015', end: '2019', gpa: '3.8' }],
  skills: [
    { id: 1, category: 'Languages', items: 'JavaScript, TypeScript, Python, Go' },
    { id: 2, category: 'Frontend',  items: 'React, Next.js, Vue.js, HTML, CSS' },
    { id: 3, category: 'Backend',   items: 'Node.js, Express, FastAPI, PostgreSQL' },
    { id: 4, category: 'Tools',     items: 'Docker, AWS, Git, CI/CD, Figma' },
  ],
  projects: [{ id: 1, name: 'OpenFlow', tech: 'React, Node.js, PostgreSQL', link: 'github.com/alexj/openflow', description: 'Open-source workflow automation tool with 2k+ GitHub stars.' }],
  certifications: [
    { id: 1, name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: 'Mar 2023' },
    { id: 2, name: 'Google Cloud Professional', issuer: 'Google', date: 'Jan 2022' },
  ],
  languages: [{ id: 1, language: 'English', level: 'Native' }, { id: 2, language: 'Spanish', level: 'Conversational' }],
};

/* ══════════════════════════════════════════════════════════════════════
   §3  EDITABLE TEXT  — contentEditable element that syncs to state
══════════════════════════════════════════════════════════════════════ */
function ET({ value, field, onUpdate, tag: Tag = 'span', style, multiline, inlineEdit, children, ...rest }) {
  const ref = useRef(null);
  const editing = useRef(false);

  // Push external value changes into DOM only when not being edited
  useEffect(() => {
    if (!editing.current && ref.current) {
      const current = ref.current.textContent;
      const target = value ?? '';
      if (current !== target) ref.current.textContent = target;
    }
  }, [value]);

  if (!inlineEdit) {
    return <Tag style={style} {...rest}>{children ?? value}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={String(value || '')}
      onFocus={() => { editing.current = true; }}
      onBlur={(e) => {
        editing.current = false;
        const v = e.currentTarget.textContent.trim();
        if (v !== (value ?? '')) onUpdate(field, v);
      }}
      onKeyDown={!multiline ? (e) => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); } } : undefined}
      style={{ ...style, outline: 'none', cursor: 'text', borderRadius: 2 }}
      {...rest}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════
   §4  RESUME DOCUMENT  (printable — inline styles only)
══════════════════════════════════════════════════════════════════════ */
function ResumeDocument({ data, tpl, inlineEdit = false, onUpdate = () => {} }) {
  const p = data.personal;
  const isDarkSidebar = tpl.sidebarBg === '#1e3a8a' || tpl.sidebarBg === '#0f172a';
  const ie = inlineEdit;

  /* — Section heading — */
  function SH({ children, light }) {
    const col  = light ? '#fff' : tpl.accent;
    const bdr  = light ? 'rgba(255,255,255,0.35)' : tpl.accent;
    const line = light ? 'rgba(255,255,255,0.25)' : '#e5e7eb';
    const base = { margin: 0, marginBottom: 9, fontFamily: 'inherit' };
    if (tpl.heading === 'underline')
      return <h2 style={{ ...base, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: col, borderBottom: `2px solid ${bdr}`, paddingBottom: 4 }}>{children}</h2>;
    if (tpl.heading === 'filled')
      return <h2 style={{ ...base, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#fff', background: light ? 'rgba(255,255,255,0.22)' : tpl.accent, padding: '4px 10px', marginLeft: -10, marginRight: -10 }}>{children}</h2>;
    if (tpl.heading === 'border-left')
      return <h2 style={{ ...base, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: col, borderLeft: `3px solid ${bdr}`, paddingLeft: 8 }}>{children}</h2>;
    if (tpl.heading === 'plain')
      return <h2 style={{ ...base, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: col }}>{children}</h2>;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <h2 style={{ ...base, marginBottom: 0, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: col, whiteSpace: 'nowrap' }}>{children}</h2>
        <div style={{ flex: 1, height: 1, background: line }} />
      </div>
    );
  }

  /* — Inline contact chip — */
  function CI({ icon, val, field, light }) {
    if (!val && !ie) return null;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10.5, color: light ? 'rgba(255,255,255,0.85)' : '#6b7280', marginRight: 10, marginBottom: 2 }}>
        <i className={`bi ${icon}`} style={{ fontSize: 9.5 }} />
        <ET value={val} field={field} onUpdate={onUpdate} inlineEdit={ie} style={{ minWidth: ie ? 60 : 0 }}>{val}</ET>
      </span>
    );
  }

  /* — Contact vertical block — */
  function ContactBlock({ light }) {
    const items = [
      { icon: 'bi-envelope-fill',  val: p.email,    field: 'personal.email'    },
      { icon: 'bi-telephone-fill', val: p.phone,    field: 'personal.phone'    },
      { icon: 'bi-geo-alt-fill',   val: p.location, field: 'personal.location' },
      { icon: 'bi-linkedin',       val: p.linkedin, field: 'personal.linkedin' },
      { icon: 'bi-globe2',         val: p.website,  field: 'personal.website'  },
    ].filter(i => i.val || ie);
    return (
      <div style={{ marginBottom: 14 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5 }}>
            <i className={`bi ${it.icon}`} style={{ fontSize: 10, marginTop: 2, color: light ? 'rgba(255,255,255,0.55)' : tpl.accent, flexShrink: 0 }} />
            <ET value={it.val} field={it.field} onUpdate={onUpdate} inlineEdit={ie}
              style={{ fontSize: 10.5, color: light ? 'rgba(255,255,255,0.9)' : '#4b5563', wordBreak: 'break-all', lineHeight: 1.3, flex: 1 }} />
          </div>
        ))}
      </div>
    );
  }

  /* — Experience item — */
  function ExpItem({ exp, idx, light }) {
    return (
      <div style={{ marginBottom: 13 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 4 }}>
          <ET value={exp.role} field={`experience.${idx}.role`} onUpdate={onUpdate} inlineEdit={ie} tag="strong"
            style={{ fontSize: 12.5, color: light ? '#fff' : '#111827', lineHeight: 1.3 }} />
          <span style={{ display: 'flex', gap: 4, fontSize: 10, color: light ? 'rgba(255,255,255,0.65)' : '#9ca3af', whiteSpace: 'nowrap' }}>
            <ET value={exp.start} field={`experience.${idx}.start`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 10, color: 'inherit' }} />
            <span>–</span>
            <ET value={exp.end} field={`experience.${idx}.end`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 10, color: 'inherit' }} />
          </span>
        </div>
        <div style={{ fontSize: 11, color: light ? 'rgba(255,255,255,0.72)' : tpl.accent, marginBottom: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <ET value={exp.company} field={`experience.${idx}.company`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 11, color: 'inherit' }} />
          {(exp.location || ie) && <><span>·</span>
            <ET value={exp.location} field={`experience.${idx}.location`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 11, color: 'inherit' }} /></>}
        </div>
        <ul style={{ margin: 0, paddingLeft: 14 }}>
          {exp.bullets.map((b, bi) => (
            <li key={bi} style={{ fontSize: 11, color: light ? 'rgba(255,255,255,0.83)' : '#4b5563', marginBottom: 2, lineHeight: 1.45 }}>
              <ET value={b} field={`experience.${idx}.bullets.${bi}`} onUpdate={onUpdate} inlineEdit={ie}
                style={{ fontSize: 11, color: 'inherit', lineHeight: 1.45 }} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* — Education item — */
  function EduItem({ edu, idx, light }) {
    return (
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
          <ET value={edu.degree} field={`education.${idx}.degree`} onUpdate={onUpdate} inlineEdit={ie} tag="strong"
            style={{ fontSize: 12, color: light ? '#fff' : '#111827' }} />
          <span style={{ fontSize: 10, color: light ? 'rgba(255,255,255,0.65)' : '#9ca3af', display: 'flex', gap: 3 }}>
            <ET value={edu.start} field={`education.${idx}.start`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 10, color: 'inherit' }} />
            <span>–</span>
            <ET value={edu.end} field={`education.${idx}.end`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 10, color: 'inherit' }} />
          </span>
        </div>
        <div style={{ fontSize: 11, color: light ? 'rgba(255,255,255,0.72)' : tpl.accent, display: 'flex', gap: 4 }}>
          <ET value={edu.institution} field={`education.${idx}.institution`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 11, color: 'inherit' }} />
          {(edu.gpa || ie) && <><span>· GPA:</span>
            <ET value={edu.gpa} field={`education.${idx}.gpa`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 11, color: 'inherit' }} /></>}
        </div>
      </div>
    );
  }

  /* — Skills block — */
  function SkillsBlock({ light }) {
    return data.skills.map((s, si) => (
      <div key={s.id} style={{ marginBottom: 7 }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: light ? 'rgba(255,255,255,0.55)' : '#9ca3af', marginBottom: 1 }}>
          <ET value={s.category} field={`skills.${si}.category`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 9.5, color: 'inherit' }} />
        </div>
        <ET value={s.items} field={`skills.${si}.items`} onUpdate={onUpdate} inlineEdit={ie}
          style={{ fontSize: 11, color: light ? 'rgba(255,255,255,0.9)' : '#374151', lineHeight: 1.4 }} />
      </div>
    ));
  }

  /* — Projects block — */
  function ProjectsBlock({ light }) {
    return data.projects.map((proj, pi) => (
      <div key={proj.id} style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <ET value={proj.name} field={`projects.${pi}.name`} onUpdate={onUpdate} inlineEdit={ie} tag="strong"
            style={{ fontSize: 12, color: light ? '#fff' : '#111827' }} />
          {(proj.link || ie) && <ET value={proj.link} field={`projects.${pi}.link`} onUpdate={onUpdate} inlineEdit={ie}
            style={{ fontSize: 9.5, color: light ? 'rgba(255,255,255,0.55)' : '#9ca3af' }} />}
        </div>
        {(proj.tech || ie) && <ET value={proj.tech} field={`projects.${pi}.tech`} onUpdate={onUpdate} inlineEdit={ie}
          style={{ fontSize: 10.5, color: light ? 'rgba(255,255,255,0.65)' : tpl.accent, display: 'block', marginBottom: 2 }} />}
        {(proj.description || ie) && <ET value={proj.description} field={`projects.${pi}.description`} onUpdate={onUpdate} inlineEdit={ie}
          multiline style={{ fontSize: 11, color: light ? 'rgba(255,255,255,0.83)' : '#4b5563', lineHeight: 1.45, display: 'block' }} />}
      </div>
    ));
  }

  /* — Certs block — */
  function CertsBlock({ light }) {
    return data.certifications.map((c, ci) => (
      <div key={c.id} style={{ marginBottom: 7 }}>
        <ET value={c.name} field={`certifications.${ci}.name`} onUpdate={onUpdate} inlineEdit={ie}
          tag="div" style={{ fontSize: 11, fontWeight: 600, color: light ? '#fff' : '#111827', lineHeight: 1.3 }} />
        <div style={{ fontSize: 10, color: light ? 'rgba(255,255,255,0.65)' : '#6b7280', display: 'flex', gap: 4 }}>
          <ET value={c.issuer} field={`certifications.${ci}.issuer`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 10, color: 'inherit' }} />
          {(c.date || ie) && <><span>·</span><ET value={c.date} field={`certifications.${ci}.date`} onUpdate={onUpdate} inlineEdit={ie} style={{ fontSize: 10, color: 'inherit' }} /></>}
        </div>
      </div>
    ));
  }

  /* — Languages block — */
  function LangsBlock({ light }) {
    return data.languages.map((l, li) => (
      <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <ET value={l.language} field={`languages.${li}.language`} onUpdate={onUpdate} inlineEdit={ie}
          style={{ fontSize: 11, color: light ? '#fff' : '#374151' }} />
        <ET value={l.level} field={`languages.${li}.level`} onUpdate={onUpdate} inlineEdit={ie}
          style={{ fontSize: 10, color: light ? 'rgba(255,255,255,0.6)' : '#9ca3af' }} />
      </div>
    ));
  }

  /* — Full-width header — */
  function Header({ light }) {
    return (
      <div style={{ background: tpl.headerBg || 'transparent', padding: tpl.headerBg ? '26px 30px 18px' : '20px 30px 0' }}>
        <ET value={p.name} field="personal.name" onUpdate={onUpdate} inlineEdit={ie} tag="div"
          style={{ fontSize: tpl.nameSize, fontWeight: 800, color: tpl.nameColor, lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: 3 }} />
        <ET value={p.title} field="personal.title" onUpdate={onUpdate} inlineEdit={ie} tag="div"
          style={{ fontSize: 13, fontWeight: 400, color: light ? 'rgba(255,255,255,0.78)' : '#6b7280', marginBottom: 10 }} />
        {!tpl.sidebarBg && (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <CI icon="bi-envelope-fill"  val={p.email}    field="personal.email"    light={light} />
            <CI icon="bi-telephone-fill" val={p.phone}    field="personal.phone"    light={light} />
            <CI icon="bi-geo-alt-fill"   val={p.location} field="personal.location" light={light} />
            <CI icon="bi-linkedin"       val={p.linkedin} field="personal.linkedin" light={light} />
            <CI icon="bi-globe2"         val={p.website}  field="personal.website"  light={light} />
          </div>
        )}
      </div>
    );
  }

  /* — Main content — */
  function MainContent() {
    return (
      <>
        {data.summary && (
          <div style={{ marginBottom: 14 }}>
            <SH>Summary</SH>
            <ET value={data.summary} field="summary" onUpdate={onUpdate} inlineEdit={ie} tag="p" multiline
              style={{ fontSize: 11, color: '#4b5563', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }} />
          </div>
        )}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <SH>Experience</SH>
            {data.experience.map((e, i) => <ExpItem key={e.id} exp={e} idx={i} />)}
          </div>
        )}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <SH>Education</SH>
            {data.education.map((e, i) => <EduItem key={e.id} edu={e} idx={i} />)}
          </div>
        )}
        {data.projects.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <SH>Projects</SH>
            <ProjectsBlock />
          </div>
        )}
      </>
    );
  }

  /* — Sidebar content — */
  function SidebarContent({ noContact }) {
    const L = isDarkSidebar;
    return (
      <>
        {!noContact && (
          <div style={{ marginBottom: 14 }}>
            <SH light={L}>Contact</SH>
            <ContactBlock light={L} />
          </div>
        )}
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <SH light={L}>Skills</SH>
            <SkillsBlock light={L} />
          </div>
        )}
        {data.certifications.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <SH light={L}>Certifications</SH>
            <CertsBlock light={L} />
          </div>
        )}
        {data.languages.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <SH light={L}>Languages</SH>
            <LangsBlock light={L} />
          </div>
        )}
      </>
    );
  }

  /* — Single-column extras — */
  function SingleExtras() {
    return (
      <>
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <SH>Skills</SH>
            {data.skills.map((s, si) => (
              <div key={s.id} style={{ display: 'flex', gap: 8, marginBottom: 5, alignItems: 'flex-start' }}>
                <ET value={s.category} field={`skills.${si}.category`} onUpdate={onUpdate} inlineEdit={ie}
                  style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af', minWidth: 72, paddingTop: 1 }} />
                <ET value={s.items} field={`skills.${si}.items`} onUpdate={onUpdate} inlineEdit={ie}
                  style={{ fontSize: 11, color: '#374151', flex: 1, lineHeight: 1.4 }} />
              </div>
            ))}
          </div>
        )}
        {data.certifications.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <SH>Certifications</SH>
            <CertsBlock />
          </div>
        )}
        {data.languages.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <SH>Languages</SH>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
              {data.languages.map((l, li) => (
                <span key={l.id} style={{ fontSize: 11, color: '#374151', display: 'flex', gap: 4 }}>
                  <ET value={l.language} field={`languages.${li}.language`} onUpdate={onUpdate} inlineEdit={ie}
                    style={{ fontSize: 11, color: '#111827', fontWeight: 600 }} />
                  <span style={{ color: '#9ca3af' }}>–</span>
                  <ET value={l.level} field={`languages.${li}.level`} onUpdate={onUpdate} inlineEdit={ie}
                    style={{ fontSize: 11, color: '#9ca3af' }} />
                </span>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  const doc = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif', background: '#fff', width: '100%', minHeight: '100%', color: '#374151', lineHeight: 1.4, fontSize: 12 };

  /* ── SINGLE COLUMN ── */
  if (tpl.layout === 'single') {
    return (
      <div style={doc}>
        <Header light={!!tpl.headerBg} />
        <div style={{ padding: '18px 30px' }}>
          <MainContent />
          <SingleExtras />
        </div>
      </div>
    );
  }

  /* ── LEFT SIDEBAR ── */
  if (tpl.layout === 'left') {
    const hasHeader = !!tpl.headerBg;
    const nameInSidebar = !hasHeader;
    return (
      <div style={doc}>
        {hasHeader && <Header light />}
        <div style={{ display: 'flex', minHeight: hasHeader ? 0 : '100%' }}>
          <div style={{ width: '33%', background: tpl.sidebarBg || '#f9fafb', padding: '18px 18px', flexShrink: 0 }}>
            {nameInSidebar && (
              <div style={{ marginBottom: 16 }}>
                <ET value={p.name} field="personal.name" onUpdate={onUpdate} inlineEdit={ie} tag="div"
                  style={{ fontSize: tpl.nameSize, fontWeight: 800, color: tpl.nameColor, lineHeight: 1.1, marginBottom: 3 }} />
                <ET value={p.title} field="personal.title" onUpdate={onUpdate} inlineEdit={ie} tag="div"
                  style={{ fontSize: 11.5, color: isDarkSidebar ? 'rgba(255,255,255,0.7)' : '#6b7280', marginBottom: 12 }} />
                <SH light={isDarkSidebar}>Contact</SH>
                <ContactBlock light={isDarkSidebar} />
              </div>
            )}
            <SidebarContent noContact={nameInSidebar} />
          </div>
          <div style={{ flex: 1, padding: '18px 22px', minWidth: 0 }}>
            <MainContent />
          </div>
        </div>
      </div>
    );
  }

  /* ── RIGHT SIDEBAR ── */
  if (tpl.layout === 'right') {
    return (
      <div style={doc}>
        {tpl.headerBg ? (
          <Header light />
        ) : (
          <div style={{ padding: '22px 22px 0' }}>
            <ET value={p.name} field="personal.name" onUpdate={onUpdate} inlineEdit={ie} tag="div"
              style={{ fontSize: tpl.nameSize, fontWeight: 800, color: tpl.nameColor, lineHeight: 1.1, marginBottom: 3 }} />
            <ET value={p.title} field="personal.title" onUpdate={onUpdate} inlineEdit={ie} tag="div"
              style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 4 }}>
              <CI icon="bi-envelope-fill"  val={p.email}    field="personal.email"    />
              <CI icon="bi-telephone-fill" val={p.phone}    field="personal.phone"    />
              <CI icon="bi-geo-alt-fill"   val={p.location} field="personal.location" />
              <CI icon="bi-linkedin"       val={p.linkedin} field="personal.linkedin" />
              <CI icon="bi-globe2"         val={p.website}  field="personal.website"  />
            </div>
          </div>
        )}
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, padding: '18px 22px', minWidth: 0 }}>
            <MainContent />
          </div>
          <div style={{ width: '33%', background: tpl.sidebarBg || '#f9fafb', padding: '18px 16px', flexShrink: 0 }}>
            <div style={{ marginBottom: 14 }}>
              <SH light={isDarkSidebar}>Contact</SH>
              <ContactBlock light={isDarkSidebar} />
            </div>
            <SidebarContent noContact />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

/* ══════════════════════════════════════════════════════════════════════
   §5  EDITOR FORMS
══════════════════════════════════════════════════════════════════════ */
const inp = { fontSize: '0.82rem', borderRadius: 8, border: '1.5px solid #e5e7eb', padding: '7px 11px', background: '#fff', width: '100%', outline: 'none', color: '#111827', fontFamily: 'inherit', boxSizing: 'border-box' };
const lbl = { fontSize: '0.72rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, display: 'block' };
const grp = { marginBottom: 12 };
const r2  = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 };
const addBtn = { width: '100%', padding: '9px 0', borderRadius: 8, border: '1.5px dashed #6366f1', background: '#f5f3ff', color: '#6366f1', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' };
const rmBtn  = { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: '0 2px' };

function F({ label: lb, value, onChange, placeholder, as = 'input', rows = 3 }) {
  return (
    <div style={grp}>
      {lb && <label style={lbl}>{lb}</label>}
      {as === 'textarea'
        ? <textarea style={{ ...inp, resize: 'vertical', minHeight: rows * 28, lineHeight: 1.6 }} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        : <input style={inp} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />}
    </div>
  );
}

function PersonalForm({ data, onChange }) {
  const u = f => v => onChange(f, v);
  return (
    <div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 14 }}>Your basic info shown at the top of the resume.</p>
      <F label="Full Name" value={data.name} onChange={u('name')} placeholder="e.g. Jane Smith" />
      <F label="Job Title / Role" value={data.title} onChange={u('title')} placeholder="e.g. Product Designer" />
      <div style={r2}>
        <F label="Email" value={data.email} onChange={u('email')} placeholder="you@email.com" />
        <F label="Phone" value={data.phone} onChange={u('phone')} placeholder="+1 (555) 000-0000" />
      </div>
      <F label="Location" value={data.location} onChange={u('location')} placeholder="City, State" />
      <F label="LinkedIn" value={data.linkedin} onChange={u('linkedin')} placeholder="linkedin.com/in/yourname" />
      <F label="Website / Portfolio" value={data.website} onChange={u('website')} placeholder="yoursite.com" />
    </div>
  );
}

function SummaryForm({ value, onChange }) {
  return (
    <div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 14 }}>2–4 sentences summarising your experience and key strengths.</p>
      <label style={lbl}>Professional Summary</label>
      <textarea style={{ ...inp, resize: 'vertical', minHeight: 120, lineHeight: 1.6 }} value={value} onChange={e => onChange(e.target.value)}
        placeholder="Results-driven professional with X years of experience in..." />
      <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 6 }}>{value.length} characters</p>
    </div>
  );
}

function ExperienceForm({ items, onAdd, onRemove, onUpdate }) {
  return (
    <div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 14 }}>List your jobs — most recent first.</p>
      {items.map((exp, idx) => (
        <div key={exp.id} style={{ background: '#f9fafb', borderRadius: 10, border: '1.5px solid #e5e7eb', padding: '14px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>Position {idx + 1}</span>
            {items.length > 1 && <button onClick={() => onRemove(exp.id)} style={rmBtn} title="Remove">×</button>}
          </div>
          <F label="Job Title" value={exp.role} onChange={v => onUpdate(exp.id, 'role', v)} placeholder="e.g. Software Engineer" />
          <div style={r2}>
            <F label="Company" value={exp.company} onChange={v => onUpdate(exp.id, 'company', v)} placeholder="e.g. Google" />
            <F label="Location" value={exp.location} onChange={v => onUpdate(exp.id, 'location', v)} placeholder="City, State" />
          </div>
          <div style={r2}>
            <F label="Start Date" value={exp.start} onChange={v => onUpdate(exp.id, 'start', v)} placeholder="Jan 2022" />
            <F label="End Date" value={exp.end} onChange={v => onUpdate(exp.id, 'end', v)} placeholder="Present" />
          </div>
          <div style={grp}>
            <label style={lbl}>Achievements (one per line)</label>
            <textarea style={{ ...inp, resize: 'vertical', minHeight: 90, lineHeight: 1.6 }} value={exp.bullets.join('\n')}
              onChange={e => onUpdate(exp.id, 'bullets', e.target.value.split('\n'))}
              placeholder={'Led a team of 5 engineers...\nIncreased performance by 30%...'} />
          </div>
        </div>
      ))}
      <button onClick={onAdd} style={addBtn}>+ Add Position</button>
    </div>
  );
}

function EducationForm({ items, onAdd, onRemove, onUpdate }) {
  return (
    <div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 14 }}>Add your degrees, diplomas, or academic qualifications.</p>
      {items.map((edu, idx) => (
        <div key={edu.id} style={{ background: '#f9fafb', borderRadius: 10, border: '1.5px solid #e5e7eb', padding: '14px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>Degree {idx + 1}</span>
            {items.length > 1 && <button onClick={() => onRemove(edu.id)} style={rmBtn}>×</button>}
          </div>
          <F label="Degree / Qualification" value={edu.degree} onChange={v => onUpdate(edu.id, 'degree', v)} placeholder="B.S. Computer Science" />
          <F label="Institution" value={edu.institution} onChange={v => onUpdate(edu.id, 'institution', v)} placeholder="e.g. MIT" />
          <div style={r2}>
            <F label="Start Year" value={edu.start} onChange={v => onUpdate(edu.id, 'start', v)} placeholder="2018" />
            <F label="End Year" value={edu.end} onChange={v => onUpdate(edu.id, 'end', v)} placeholder="2022" />
          </div>
          <F label="GPA (optional)" value={edu.gpa} onChange={v => onUpdate(edu.id, 'gpa', v)} placeholder="3.9" />
        </div>
      ))}
      <button onClick={onAdd} style={addBtn}>+ Add Degree</button>
    </div>
  );
}

function SkillsForm({ items, onAdd, onRemove, onUpdate }) {
  return (
    <div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 14 }}>Group skills by category. Separate items with commas.</p>
      {items.map((sk) => (
        <div key={sk.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
          <div style={{ flex: '0 0 110px' }}>
            <label style={lbl}>Category</label>
            <input style={inp} value={sk.category} onChange={e => onUpdate(sk.id, 'category', e.target.value)} placeholder="Frontend" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={lbl}>Skills</label>
            <input style={inp} value={sk.items} onChange={e => onUpdate(sk.id, 'items', e.target.value)} placeholder="React, Vue, CSS" />
          </div>
          {items.length > 1 && <button onClick={() => onRemove(sk.id)} style={{ ...rmBtn, marginBottom: 2 }}>×</button>}
        </div>
      ))}
      <button onClick={onAdd} style={addBtn}>+ Add Category</button>
    </div>
  );
}

function ProjectsForm({ items, onAdd, onRemove, onUpdate }) {
  return (
    <div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 14 }}>Showcase personal, open-source, or freelance projects.</p>
      {items.map((proj, idx) => (
        <div key={proj.id} style={{ background: '#f9fafb', borderRadius: 10, border: '1.5px solid #e5e7eb', padding: '14px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>Project {idx + 1}</span>
            {items.length > 1 && <button onClick={() => onRemove(proj.id)} style={rmBtn}>×</button>}
          </div>
          <div style={r2}>
            <F label="Project Name" value={proj.name} onChange={v => onUpdate(proj.id, 'name', v)} placeholder="My Project" />
            <F label="Link (optional)" value={proj.link} onChange={v => onUpdate(proj.id, 'link', v)} placeholder="github.com/..." />
          </div>
          <F label="Tech Stack" value={proj.tech} onChange={v => onUpdate(proj.id, 'tech', v)} placeholder="React, Node.js, PostgreSQL" />
          <F label="Description" value={proj.description} onChange={v => onUpdate(proj.id, 'description', v)} placeholder="What it does and your impact..." as="textarea" rows={2} />
        </div>
      ))}
      <button onClick={onAdd} style={addBtn}>+ Add Project</button>
    </div>
  );
}

function CertificationsForm({ items, onAdd, onRemove, onUpdate }) {
  return (
    <div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 14 }}>Professional certificates, licences, or awards.</p>
      {items.map((cert, idx) => (
        <div key={cert.id} style={{ background: '#f9fafb', borderRadius: 10, border: '1.5px solid #e5e7eb', padding: '12px', marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>Cert {idx + 1}</span>
            {items.length > 1 && <button onClick={() => onRemove(cert.id)} style={rmBtn}>×</button>}
          </div>
          <F label="Certification Name" value={cert.name} onChange={v => onUpdate(cert.id, 'name', v)} placeholder="AWS Solutions Architect" />
          <div style={r2}>
            <F label="Issuer" value={cert.issuer} onChange={v => onUpdate(cert.id, 'issuer', v)} placeholder="Amazon" />
            <F label="Date" value={cert.date} onChange={v => onUpdate(cert.id, 'date', v)} placeholder="Mar 2023" />
          </div>
        </div>
      ))}
      <button onClick={onAdd} style={addBtn}>+ Add Certification</button>
    </div>
  );
}

function LanguagesForm({ items, onAdd, onRemove, onUpdate }) {
  const levels = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];
  return (
    <div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 14 }}>Languages and proficiency levels.</p>
      {items.map((lang, idx) => (
        <div key={lang.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            {idx === 0 && <label style={lbl}>Language</label>}
            <input style={inp} value={lang.language} onChange={e => onUpdate(lang.id, 'language', e.target.value)} placeholder="Spanish" />
          </div>
          <div style={{ flex: 1 }}>
            {idx === 0 && <label style={lbl}>Proficiency</label>}
            <select style={{ ...inp, cursor: 'pointer' }} value={lang.level} onChange={e => onUpdate(lang.id, 'level', e.target.value)}>
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          {items.length > 1 && <button onClick={() => onRemove(lang.id)} style={{ ...rmBtn, marginBottom: 2 }}>×</button>}
        </div>
      ))}
      <button onClick={onAdd} style={addBtn}>+ Add Language</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   §6  MAIN COMPONENT
══════════════════════════════════════════════════════════════════════ */
const SECTIONS = [
  { id: 'personal',       icon: 'bi-person-fill',     label: 'Personal'   },
  { id: 'summary',        icon: 'bi-card-text',        label: 'Summary'    },
  { id: 'experience',     icon: 'bi-briefcase-fill',   label: 'Experience' },
  { id: 'education',      icon: 'bi-mortarboard-fill', label: 'Education'  },
  { id: 'skills',         icon: 'bi-lightning-fill',   label: 'Skills'     },
  { id: 'projects',       icon: 'bi-code-slash',       label: 'Projects'   },
  { id: 'certifications', icon: 'bi-patch-check-fill', label: 'Certs'      },
  { id: 'languages',      icon: 'bi-translate',        label: 'Languages'  },
];

export default function ResumeBuilderClient() {
  const [data, setData]           = useState(DEFAULT_DATA);
  const [tplId, setTplId]         = useState('modern');
  const [activeSection, setSection] = useState('personal');
  const [mobileTab, setMobileTab] = useState('editor');    // 'editor' | 'preview'
  const [inlineEdit, setInlineEdit] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [scale, setScale]         = useState(0.75);
  const panelRef  = useRef(null);

  const tpl = TEMPLATES.find(t => t.id === tplId) || TEMPLATES[0];

  /* — Scale preview to fit panel — */
  useEffect(() => {
    if (!panelRef.current) return;
    const update = () => {
      const w = panelRef.current.offsetWidth - 48;
      setScale(Math.min(w / 794, 1));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(panelRef.current);
    return () => ro.disconnect();
  }, []);

  /* — Data helpers — */
  const updatePersonal = useCallback((field, val) =>
    setData(d => ({ ...d, personal: { ...d.personal, [field]: val } })), []);

  const updateSummary = useCallback((val) =>
    setData(d => ({ ...d, summary: val })), []);

  const addItem = (section, template) =>
    setData(d => ({ ...d, [section]: [...d[section], { ...template, id: Date.now() }] }));

  const removeItem = (section, id) =>
    setData(d => ({ ...d, [section]: d[section].filter(i => i.id !== id) }));

  const updateItem = (section, id, field, val) =>
    setData(d => ({ ...d, [section]: d[section].map(i => i.id === id ? { ...i, [field]: val } : i) }));

  /* — Inline edit path-based update — */
  const onInlineUpdate = useCallback((field, value) => {
    const parts = field.split('.');
    setData(prev => {
      const d = JSON.parse(JSON.stringify(prev));
      const section = parts[0];
      if (section === 'personal')  { d.personal[parts[1]] = value; }
      else if (section === 'summary') { d.summary = value; }
      else {
        const idx = parseInt(parts[1]);
        if (parts[2] === 'bullets') { d[section][idx].bullets[parseInt(parts[3])] = value; }
        else { d[section][idx][parts[2]] = value; }
      }
      return d;
    });
  }, []);

  /* — Download PDF (html2canvas → pdf-lib) — */
  const downloadPDF = useCallback(async () => {
    setDownloading(true);
    // Turn off inline edit mode so contentEditable borders don't appear in PDF
    const wasInline = inlineEdit;
    setInlineEdit(false);

    try {
      await new Promise(r => setTimeout(r, 80)); // let React re-render without inline outlines
      const html2canvas = (await import('html2canvas')).default;
      const el = document.getElementById('resume-print-target');
      if (!el) throw new Error('Resume element not found');

      const canvas = await html2canvas(el, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: el.scrollHeight,
        windowWidth: 794,
      });

      // Convert canvas to JPEG bytes
      const imgData = canvas.toDataURL('image/jpeg', 0.96);
      const base64  = imgData.split(',')[1];
      const bytes   = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

      // Build PDF with pdf-lib
      const pdfDoc = await PDFDocument.create();
      const jpgImg = await pdfDoc.embedJpg(bytes);

      // Page size matches A4 width; height scaled proportionally
      const A4_W   = 595.28;
      const A4_H   = 841.89;
      const imgH   = (canvas.height / canvas.width) * A4_W;

      if (imgH <= A4_H * 1.1) {
        // Single page — fit to A4
        const page = pdfDoc.addPage([A4_W, A4_H]);
        page.drawImage(jpgImg, { x: 0, y: A4_H - imgH, width: A4_W, height: imgH });
      } else {
        // Multi-page — slice image across pages
        const pages = Math.ceil(imgH / A4_H);
        for (let p = 0; p < pages; p++) {
          const page = pdfDoc.addPage([A4_W, A4_H]);
          page.drawImage(jpgImg, { x: 0, y: A4_H - imgH + p * A4_H, width: A4_W, height: imgH });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `resume-${(data.personal.name || 'myresume').replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('PDF generation failed — please try again or use Ctrl+P to print.');
    } finally {
      setDownloading(false);
      if (wasInline) setInlineEdit(true);
    }
  }, [data.personal.name, inlineEdit]);

  /* — Template thumbnail — */
  function TplThumb({ t }) {
    const selected = tplId === t.id;
    return (
      <button onClick={() => setTplId(t.id)} title={`${t.name} (${t.tag})`}
        style={{ flexShrink: 0, border: 'none', background: 'none', padding: 0, cursor: 'pointer', outline: 'none' }}>
        <div style={{ width: 54, height: 70, borderRadius: 5, border: selected ? '2.5px solid #6366f1' : '2px solid #e5e7eb', overflow: 'hidden', background: '#fff', boxShadow: selected ? '0 0 0 3px rgba(99,102,241,0.2)' : 'none', transition: 'all 0.12s' }}>
          <div style={{ height: 17, background: t.headerBg || '#f3f4f6' }} />
          <div style={{ display: 'flex', height: 'calc(100% - 17px)' }}>
            {t.layout !== 'single' && (
              <div style={{ width: t.layout === 'left' ? '33%' : '67%', background: t.sidebarBg || '#f3f4f6', padding: '2px 2px' }}>
                {[50,80,60,70,55].map((w,i) => <div key={i} style={{ height: 2, background: i===0?t.accent:'#e5e7eb', borderRadius:1, marginBottom:2, width:`${w}%` }} />)}
              </div>
            )}
            <div style={{ flex: 1, padding: '2px 3px' }}>
              {[85,55,90,65,75,50,80].map((w,i) => <div key={i} style={{ height: 2, background: i===0?t.accent:'#e5e7eb', borderRadius:1, marginBottom:2, width:`${w}%` }} />)}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 8.5, textAlign: 'center', color: selected?'#6366f1':'#9ca3af', marginTop:3, fontWeight: selected?700:400, maxWidth:54, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {t.name}
        </div>
      </button>
    );
  }

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        /* Inline edit hover/focus highlight */
        .rb-inline-edit [contenteditable]:hover { background: rgba(99,102,241,0.06) !important; border-radius: 2px; }
        .rb-inline-edit [contenteditable]:focus  { background: rgba(99,102,241,0.1)  !important; border-radius: 2px; box-shadow: 0 0 0 1px rgba(99,102,241,0.4); }
        /* Responsive layout */
        @media (max-width: 767px) {
          .rb-split { flex-direction: column !important; height: auto !important; }
          .rb-editor { width: 100% !important; height: 55vh !important; border-right: none !important; border-bottom: 1.5px solid #e5e7eb !important; }
          .rb-preview { min-height: 90vw !important; padding: 16px !important; }
          .rb-header-actions { flex-wrap: wrap !important; gap: 6px !important; }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .rb-editor { width: 320px !important; }
          .rb-split { height: calc(100vh - 140px) !important; }
        }
        @media (min-width: 1200px) {
          .rb-editor { width: 390px !important; }
          .rb-split { height: calc(100vh - 140px) !important; }
        }
        .rb-section-btn:hover { background: #f5f3ff !important; color: #6366f1 !important; }
      `}</style>

      {/* ── Page header ── */}
      <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#4338ca)', padding: '14px 20px' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(1.1rem,3vw,1.4rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
              <i className="bi bi-file-person-fill me-2" aria-hidden="true" />Resume Builder
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', margin: 0, fontSize: '0.8rem', marginTop: 2 }}>
              Pick a template · Fill your details · Download PDF
            </p>
          </div>

          <div className="rb-header-actions" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Mobile editor/preview toggle */}
            <div className="d-flex d-md-none gap-1">
              {['editor','preview'].map(tab => (
                <button key={tab} onClick={() => setMobileTab(tab)}
                  style={{ padding: '6px 12px', borderRadius: 7, border: 'none', background: mobileTab===tab?'#fff':'rgba(255,255,255,0.18)', color: mobileTab===tab?'#4f46e5':'#fff', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', textTransform: 'capitalize' }}>
                  <i className={`bi ${tab==='editor'?'bi-pencil-fill':'bi-eye-fill'} me-1`} />{tab}
                </button>
              ))}
            </div>

            {/* Inline edit toggle */}
            <button onClick={() => setInlineEdit(v => !v)}
              style={{ padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${inlineEdit?'#818cf8':'rgba(255,255,255,0.35)'}`, background: inlineEdit?'rgba(99,102,241,0.25)':'transparent', color: '#fff', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
              <i className={`bi ${inlineEdit ? 'bi-pencil-fill' : 'bi-pencil'}`} />
              <span className="d-none d-sm-inline">{inlineEdit ? 'Editing' : 'Inline Edit'}</span>
            </button>

            {/* Download PDF */}
            <button onClick={downloadPDF} disabled={downloading}
              style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: downloading?'#9ca3af':'#fbbf24', color: '#1c1917', fontWeight: 700, fontSize: '0.85rem', cursor: downloading?'not-allowed':'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
              {downloading
                ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> <span>Generating…</span></>
                : <><i className="bi bi-download" /> Download PDF</>}
            </button>
          </div>
        </div>
      </div>

      {/* ── Template strip ── */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ display: 'flex', gap: 8, padding: '10px 20px', alignItems: 'center', width: 'max-content', minWidth: '100%' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap', marginRight: 4 }}>Templates</span>
          <div style={{ width: 1, height: 38, background: '#e5e7eb', flexShrink: 0 }} />
          {TEMPLATES.map(t => <TplThumb key={t.id} t={t} />)}
        </div>
      </div>

      {/* ── Split layout ── */}
      <div className="rb-split" style={{ display: 'flex', overflow: 'hidden' }}>

        {/* ── EDITOR PANEL ── */}
        <div className={`rb-editor${mobileTab === 'preview' ? ' d-none d-md-flex' : ''}`}
          style={{ flexShrink: 0, borderRight: '1.5px solid #e5e7eb', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>

          {/* Section nav */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {SECTIONS.map(s => (
              <button key={s.id} className="rb-section-btn" onClick={() => setSection(s.id)}
                style={{ border: 'none', background: activeSection===s.id?'#eef2ff':'transparent', color: activeSection===s.id?'#4f46e5':'#6b7280', fontWeight: activeSection===s.id?700:400, borderRadius: 7, padding: '5px 9px', fontSize: '0.73rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'all 0.1s' }}>
                <i className={`bi ${s.icon}`} style={{ fontSize: '0.68rem' }} />{s.label}
              </button>
            ))}
          </div>

          {/* Section title bar */}
          <div style={{ padding: '10px 14px 6px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className={`bi ${SECTIONS.find(s=>s.id===activeSection)?.icon}`} style={{ color:'#6366f1', fontSize:'1rem' }} />
            <strong style={{ fontSize:'0.88rem', color:'#111827' }}>{SECTIONS.find(s=>s.id===activeSection)?.label}</strong>
          </div>

          {/* Form area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px' }}>
            {activeSection === 'personal'       && <PersonalForm data={data.personal} onChange={updatePersonal} />}
            {activeSection === 'summary'        && <SummaryForm value={data.summary} onChange={updateSummary} />}
            {activeSection === 'experience'     && <ExperienceForm items={data.experience}
              onAdd={() => addItem('experience', { company:'', role:'', location:'', start:'', end:'', bullets:[''] })}
              onRemove={id => removeItem('experience', id)}
              onUpdate={(id,f,v) => updateItem('experience',id,f,v)} />}
            {activeSection === 'education'      && <EducationForm items={data.education}
              onAdd={() => addItem('education', { institution:'', degree:'', start:'', end:'', gpa:'' })}
              onRemove={id => removeItem('education', id)}
              onUpdate={(id,f,v) => updateItem('education',id,f,v)} />}
            {activeSection === 'skills'         && <SkillsForm items={data.skills}
              onAdd={() => addItem('skills', { category:'', items:'' })}
              onRemove={id => removeItem('skills', id)}
              onUpdate={(id,f,v) => updateItem('skills',id,f,v)} />}
            {activeSection === 'projects'       && <ProjectsForm items={data.projects}
              onAdd={() => addItem('projects', { name:'', tech:'', link:'', description:'' })}
              onRemove={id => removeItem('projects', id)}
              onUpdate={(id,f,v) => updateItem('projects',id,f,v)} />}
            {activeSection === 'certifications' && <CertificationsForm items={data.certifications}
              onAdd={() => addItem('certifications', { name:'', issuer:'', date:'' })}
              onRemove={id => removeItem('certifications', id)}
              onUpdate={(id,f,v) => updateItem('certifications',id,f,v)} />}
            {activeSection === 'languages'      && <LanguagesForm items={data.languages}
              onAdd={() => addItem('languages', { language:'', level:'Intermediate' })}
              onRemove={id => removeItem('languages', id)}
              onUpdate={(id,f,v) => updateItem('languages',id,f,v)} />}
          </div>

          {/* Bottom bar */}
          <div style={{ padding: '8px 14px', borderTop: '1px solid #f3f4f6', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => { if (window.confirm('Reset to sample resume?')) { setData(DEFAULT_DATA); setInlineEdit(false); } }}
              style={{ background: 'none', border: '1.5px solid #e5e7eb', borderRadius: 7, padding: '5px 12px', fontSize: '0.76rem', color: '#6b7280', cursor: 'pointer', fontWeight: 500 }}>
              <i className="bi bi-arrow-counterclockwise me-1" />Reset
            </button>
            {inlineEdit && (
              <span style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="bi bi-pencil-fill" style={{ fontSize: '0.68rem' }} />Click text in preview to edit
              </span>
            )}
          </div>
        </div>

        {/* ── PREVIEW PANEL ── */}
        <div ref={panelRef}
          className={`rb-preview${mobileTab === 'editor' ? ' d-none d-md-flex' : ' d-flex'}`}
          style={{ flex: 1, background: '#64748b', overflowY: 'auto', padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={{ transformOrigin: 'top center', transform: `scale(${scale})`, width: 794, minHeight: 1123, marginBottom: scale < 1 ? `${(1123 * scale - 1123)}px` : 0 }}>
            <div id="resume-print-target"
              className={inlineEdit ? 'rb-inline-edit' : ''}
              style={{ width: 794, minHeight: 1123, background: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.3)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
              {inlineEdit && (
                <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 10, background: 'rgba(99,102,241,0.9)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 100, letterSpacing: 0.5, pointerEvents: 'none' }}>
                  ✏ INLINE EDIT ON
                </div>
              )}
              <ResumeDocument data={data} tpl={tpl} inlineEdit={inlineEdit} onUpdate={onInlineUpdate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
