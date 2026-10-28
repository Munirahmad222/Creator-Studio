import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Activity, ArrowUpRight, BarChart3, CalendarDays, Clapperboard, Compass, Globe2, LayoutDashboard, Menu, MessageCircle, Moon, Settings, Sparkles, Sun, Users, WandSparkles } from 'lucide-react';
import { branding, directionFor, isSupportedLocale, translate, type SupportedLocale } from '@creator-platform/shared';
import { Button } from '@creator-platform/ui';

const nav = [
  { to: '/', key: 'overview' as const, icon: LayoutDashboard },
  { to: '/studio', key: 'creatorStudio' as const, icon: WandSparkles },
  { to: '/video', key: 'videoEditor' as const, icon: Clapperboard },
  { to: '/auto-dm', key: 'autoDm' as const, icon: MessageCircle },
  { to: '/marketplace', key: 'marketplace' as const, icon: Users },
  { to: '/analytics', key: 'analytics' as const, icon: BarChart3 },
  { to: '/settings', key: 'settings' as const, icon: Settings },
];

function Placeholder({ title, description }: { title: string; description: string }) {
  return <section className="panel empty-panel"><div className="empty-icon"><Sparkles size={23}/></div><h2>{title}</h2><p>{description}</p><span className="status-pill">Foundation preview</span></section>;
}


function CreatorStudio() {
  const [tool, setTool] = useState<'caption' | 'hashtags' | 'bio' | 'ideas'>('caption');
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [tone, setTone] = useState('Friendly');
  const [result, setResult] = useState('');
  const [notice, setNotice] = useState('');

  function generate() {
    const subject = topic.trim();
    if (!subject) { setNotice('Please enter a topic first.'); setResult(''); return; }
    const tag = subject.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean).slice(0, 4).join('');
    const tags = [...new Set([tag, 'creator', 'contentcreator', 'dailyinspiration', 'creatortips'].filter(Boolean))].map(x => '#' + x.replace(/\s/g, '')).join(' ');
    if (tool === 'caption') {
      const openers = tone === 'Professional' ? [`A closer look at ${subject}.`, `Here is one practical way to approach ${subject}.`] : tone === 'Energetic' ? [`Let's talk about ${subject}! ✨`, `Ready to level up your ${subject}? 🚀`] : [`A little reminder about ${subject} 💜`, `Sharing something I’ve been thinking about: ${subject}.`];
      setResult(`${openers[0]}

${tone === 'Professional' ? 'Save this post for your next step and share your thoughts below.' : 'What do you think? Save this for later and tell me your favourite tip in the comments!'}

${tags}`);
    } else if (tool === 'hashtags') {
      setResult(tags + ' #' + tag + 'ideas #explorepage #smallcreator #socialmediatips');
    } else if (tool === 'bio') {
      setResult(`✨ Sharing ${subject} ideas
💡 Tips, inspiration & behind the scenes
🌱 Creating, learning and growing
📩 Let’s connect`);
    } else {
      setResult(`Content ideas for ${subject}:

1. A beginner’s guide to ${subject}
2. 3 common mistakes people make with ${subject}
3. My personal ${subject} routine
4. Before and after: a ${subject} transformation
5. Answer 5 frequently asked questions about ${subject}
6. One quick tip about ${subject} in 30 seconds
7. Myth vs fact: ${subject}
8. Tools I use for ${subject}
9. React to a common ${subject} misconception
10. A weekly challenge around ${subject}`);
    }
    setNotice('Generated locally using built-in templates. No paid AI API is used.');
  }

  async function copyResult() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); setNotice('Copied to clipboard.'); }
    catch { setNotice('Select the generated text and copy it manually.'); }
  }

  return <div className="tool-page">
    <div className="tool-page-heading"><div><div className="eyebrow"><Sparkles size={15}/> CREATOR WORKSPACE</div><h1>Creator Studio</h1><p className="page-intro">Create a first draft for your next post. Free, local template tools — no paid API required.</p></div><span className="status-pill">Working preview</span></div>
    <div className="studio-layout">
      <section className="panel tool-card"><h2>What would you like to create?</h2><p className="tool-subtitle">Choose a tool, add your topic and generate a draft.</p>
        <div className="tool-tabs" role="group" aria-label="Creator tools">
          {[['caption','Caption'],['hashtags','Hashtags'],['bio','Bio'],['ideas','Content ideas']].map(([value,label]) => <button key={value} className={tool === value ? 'tool-tab active' : 'tool-tab'} onClick={() => { setTool(value as typeof tool); setResult(''); setNotice(''); }}>{label}</button>)}
        </div>
        <label className="field-label" htmlFor="topic">Topic or niche</label><input id="topic" className="tool-input" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. fitness, skincare, travel, gaming" />
        <div className="field-row"><div><label className="field-label" htmlFor="platform">Platform</label><select id="platform" className="tool-input" value={platform} onChange={e => setPlatform(e.target.value)}><option>Instagram</option><option>TikTok</option><option>YouTube</option><option>LinkedIn</option><option>Facebook</option></select></div><div><label className="field-label" htmlFor="tone">Tone</label><select id="tone" className="tool-input" value={tone} onChange={e => setTone(e.target.value)}><option>Friendly</option><option>Professional</option><option>Energetic</option></select></div></div>
        <button className="generate-button" onClick={generate}><WandSparkles size={16}/> Generate {tool === 'ideas' ? 'ideas' : tool}</button>
        <p className="tool-disclaimer">Drafts are generated from built-in templates and should be reviewed before publishing. Platform selection is for your planning only.</p>
      </section>
      <section className="panel result-card"><div className="result-heading"><div><span className="result-kicker">YOUR DRAFT</span><h2>{tool === 'caption' ? 'Caption draft' : tool === 'hashtags' ? 'Hashtag suggestions' : tool === 'bio' ? 'Bio draft' : 'Content ideas'}</h2></div><button className="copy-button" onClick={copyResult} disabled={!result}>Copy text</button></div>
        {result ? <textarea className="result-output" aria-label="Generated result" value={result} onChange={e => setResult(e.target.value)} rows={12}/> : <div className="result-empty"><div className="empty-icon"><Sparkles size={22}/></div><strong>Your draft will appear here</strong><p>Enter a topic and select Generate to get started.</p></div>}
        {notice && <p className="tool-notice" role="status">{notice}</p>}
      </section>
    </div>
  </div>;
}

export default function App() {
  const [locale, setLocale] = useState<SupportedLocale>(() => {
    const saved = window.localStorage.getItem('cp-locale') ?? 'en';
    return isSupportedLocale(saved) ? saved : 'en';
  });
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = (key: keyof ReturnType<typeof getEnglishKeys>) => translate(locale, key);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = directionFor(locale);
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('cp-locale', locale);
  }, [locale, dark]);

  const englishKeys = { overview: '', creatorStudio: '', videoEditor: '', autoDm: '', marketplace: '', analytics: '', settings: '', demoMode: '' };
  function getEnglishKeys() { return englishKeys; }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
      <div className="brand-lockup"><div className="brand-mark"><Sparkles size={21}/></div><div><strong>{branding.name}</strong><small>CREATE · CONNECT · GROW</small></div></div>
      <div className="workspace-label">WORKSPACE <span className="online-dot"/></div>
      <nav className="main-nav" aria-label="Main navigation">
        {nav.map(({to,key,icon:Icon}) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setMobileMenu(false)} className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`}><Icon size={18}/><span>{t(key)}</span>{key === 'autoDm' && <span className="demo-mini">DEMO</span>}</NavLink>)}
      </nav>
      <div className="sidebar-bottom"><div className="upgrade-card"><div className="upgrade-spark"><Sparkles size={16}/></div><strong>Your creative space</strong><p>Plan content and organize your next big idea.</p><button onClick={() => window.location.assign('/studio')}>Explore Studio <ArrowUpRight size={14}/></button></div><div className="profile-row"><div className="avatar">CP</div><div className="profile-meta"><strong>Creator account</strong><span>Local preview</span></div><button className="icon-button" aria-label="Open settings" onClick={() => window.location.assign('/settings')}><Settings size={17}/></button></div></div>
    </aside>
    {mobileMenu && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)}/>}
    <main className="main-area">
      <header className="topbar"><div className="topbar-start"><button className="icon-button menu-toggle" aria-label="Open navigation" onClick={() => setMobileMenu(true)}><Menu size={20}/></button><div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>Creator Platform</strong></div></div><div className="topbar-actions"><span className="demo-banner"><span className="demo-dot"/> Instagram demo</span><label className="locale-select"><Globe2 size={16}/><span className="sr-only">Language</span><select aria-label="Language" value={locale} onChange={e => setLocale(e.target.value as SupportedLocale)}><option value="en">English</option><option value="ur">اردو</option><option value="ar">العربية</option></select></label><button className="icon-button theme-toggle" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setDark(v => !v)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button></div></header>
      <div className="page-content"><Routes>
        <Route path="/" element={<><div className="welcome-row"><div><div className="eyebrow"><Compass size={15}/> YOUR CREATOR WORKSPACE</div><h1>Make room for <span>what’s next.</span></h1><p className="page-intro">Your content workflow, creative tools and brand opportunities—together in one place.</p></div><Button onClick={() => window.location.assign('/studio')}><Sparkles size={16}/> Open Creator Studio</Button></div><section className="hero-panel"><div className="hero-copy"><span className="hero-tag"><Sparkles size={14}/> THE CREATOR WORKSPACE</span><h2>Ideas become impact<br/>when everything connects.</h2><p>Organize your content, shape your next video and discover collaboration opportunities in a calmer, more focused workspace.</p><div className="hero-actions"><Button onClick={() => window.location.assign('/studio')}>Start creating <ArrowUpRight size={16}/></Button><Button variant="secondary" onClick={() => window.location.assign('/marketplace')}>Explore brands</Button></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="art-center"><WandSparkles size={35}/></div><div className="float-card float-card-top"><Sparkles size={16}/><span>Creative ideas</span></div><div className="float-card float-card-bottom"><CalendarDays size={16}/><span>Content planner</span></div><div className="float-card float-card-side"><Activity size={16}/><span>Grow steadily</span></div></div></section><div className="section-heading"><div><h2>Your workspace</h2><p>A quick route to the tools you’ll use most.</p></div><span className="muted-label">PHASE 1 FOUNDATION</span></div><div className="feature-grid">{[{title:'Creator Studio',desc:'Shape captions, concepts and content plans.',icon:WandSparkles,to:'/studio',tone:'purple'},{title:'Video Editor',desc:'A dedicated home for your short-form workflow.',icon:Clapperboard,to:'/video',tone:'pink'},{title:'Brand Marketplace',desc:'Keep collaboration opportunities organized.',icon:Users,to:'/marketplace',tone:'blue'}].map(item => <NavLink className="feature-card" to={item.to} key={item.title}><div className={`feature-icon ${item.tone}`}><item.icon size={20}/></div><div className="feature-title">{item.title}<ArrowUpRight size={15}/></div><p>{item.desc}</p><span className="feature-link">Open workspace <span>→</span></span></NavLink>)}</div><div className="foundation-note"><div className="note-icon"><Activity size={18}/></div><div><strong>Foundation preview</strong><p>Navigation, language switching and the design system are active. Product workflows will be implemented in later approved phases. No live Instagram account is connected.</p></div></div></>}/>
        <Route path="/studio" element={<CreatorStudio/>}/>
        <Route path="/video" element={<Placeholder title="Video Editor" description="Video import, editing and export are not implemented in this foundation phase."/>}/>
        <Route path="/auto-dm" element={<Placeholder title="Instagram Auto-DM · Demo" description="Demo mode only. No Instagram account is connected and no messages are sent."/>}/>
        <Route path="/marketplace" element={<Placeholder title="Brand Marketplace" description="Campaigns, applications and creator-brand workflows will be implemented in a later approved phase."/>}/>
        <Route path="/analytics" element={<Placeholder title="Analytics" description="No live social metrics or earnings are shown in this foundation preview."/>}/>
        <Route path="/settings" element={<Placeholder title="Settings" description="Branding and locale foundations are present. Account settings will follow after authentication is approved."/>}/>
        <Route path="*" element={<Placeholder title="Page not found" description="Choose a section from the navigation to continue."/>}/>
      </Routes><footer className="page-footer"><span>© {new Date().getFullYear()} {branding.name}</span><span><span className="footer-status"/> Foundation preview · No live integrations</span></footer></div>
    </main>
  </div>;
}
