import { useEffect, useRef, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Activity, ArrowUpRight, BarChart3, CalendarDays, Clapperboard, Compass, Download, Film, Globe2, LayoutDashboard, Menu, MessageCircle, Moon, RotateCcw, Scissors, Settings, Sparkles, Sun, Trash2, Type, Upload, Users, Volume2, VolumeX, WandSparkles } from 'lucide-react';
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



function VideoEditor() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState(0);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [title, setTitle] = useState('');
  const [speed, setSpeed] = useState('1');
  const [aspect, setAspect] = useState('original');
  const [muted, setMuted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('Import a video to begin. Your file stays in this browser and is not uploaded.');

  useEffect(() => () => { if (videoUrl) URL.revokeObjectURL(videoUrl); }, [videoUrl]);

  function importVideo(nextFile?: File) {
    if (!nextFile) return;
    if (!nextFile.type.startsWith('video/')) { setNotice('Please choose a video file.'); return; }
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    const url = URL.createObjectURL(nextFile);
    setFile(nextFile); setVideoUrl(url); setDuration(0); setTrimStart(0); setTrimEnd(0); setNotice('Video loaded. Set your trim points and optional title, then export.');
  }

  function onMetadata() {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    setDuration(v.duration); setTrimEnd(v.duration);
  }


  async function exportClip() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !file) { setNotice('Import a video first.'); return; }
    if (trimEnd <= trimStart) { setNotice('End time must be after start time.'); return; }
    if (typeof MediaRecorder === 'undefined' || !canvas.captureStream) { setNotice('Export is not supported in this browser. Try the latest Chrome or Edge.'); return; }
    setBusy(true); setNotice('Preparing your clip… keep this tab open until export finishes.');
    try {
      const sourceWidth = video.videoWidth || 1280;
      const sourceHeight = video.videoHeight || 720;
      let width = sourceWidth; let height = sourceHeight;
      if (aspect === 'portrait') { width = 720; height = 1280; }
      else if (aspect === 'square') { width = 1080; height = 1080; }
      else if (aspect === 'landscape') { width = 1280; height = 720; }
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas is not available.');
      const canvasStream = canvas.captureStream(30);
      const videoWithCapture = video as HTMLVideoElement & { captureStream?: () => MediaStream; mozCaptureStream?: () => MediaStream };
      const mediaStream = videoWithCapture.captureStream?.() ?? videoWithCapture.mozCaptureStream?.();
      if (!muted && mediaStream) mediaStream.getAudioTracks().forEach(track => canvasStream.addTrack(track));
      const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
      const recorder = new MediaRecorder(canvasStream, { mimeType: mime });
      recorderRef.current = recorder; chunksRef.current = [];
      recorder.ondataavailable = event => { if (event.data.size) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const outUrl = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = outUrl; a.download = `${file.name.replace(/\.[^.]+$/, '')}-edited.webm`;
        document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(outUrl);
        canvasStream.getTracks().forEach(track => track.stop());
        mediaStream?.getTracks().forEach(track => track.stop());
        setBusy(false); setNotice('Export complete. Your edited clip was downloaded as a WebM file.');
      };
      recorder.onerror = () => { setBusy(false); setNotice('Export failed. Try a shorter clip or a supported video format.'); };
      video.pause(); video.muted = muted; video.playbackRate = Number(speed); video.currentTime = trimStart;
      await new Promise<void>(resolve => { if (video.readyState >= 2) resolve(); else video.addEventListener('loadeddata', () => resolve(), { once: true }); });
      const draw = () => {
        if (!ctx) return;
        ctx.fillStyle = '#111'; ctx.fillRect(0, 0, width, height);
        const scale = Math.min(width / video.videoWidth, height / video.videoHeight);
        const dw = video.videoWidth * scale; const dh = video.videoHeight * scale;
        ctx.drawImage(video, (width - dw) / 2, (height - dh) / 2, dw, dh);
        if (title.trim()) {
          const fontSize = Math.max(26, Math.round(width * 0.045));
          ctx.font = \`700 \${fontSize}px system-ui, sans-serif\`; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
          const text = title.trim().slice(0, 100); const maxWidth = width * 0.88;
          const lines: string[] = []; let line = '';
          for (const word of text.split(/\s+/)) { const test = line ? \`\${line} \${word}\` : word; if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; } else line = test; }
          if (line) lines.push(line);
          const lineHeight = fontSize * 1.2; const bottom = height * 0.09;
          lines.slice(-3).forEach((item, index, arr) => { const y = height - bottom - (arr.length - 1 - index) * lineHeight; ctx.lineWidth = Math.max(3, fontSize * 0.16); ctx.strokeStyle = 'rgba(0,0,0,.78)'; ctx.fillStyle = '#fff'; ctx.strokeText(item, width / 2, y, maxWidth); ctx.fillText(item, width / 2, y, maxWidth); });
        }
      };
      draw();
      recorder.start(200);
      await video.play();
      const tick = () => {
        if (!recorderRef.current || recorderRef.current.state !== 'recording') return;
        draw();
        if (video.currentTime >= trimEnd || video.ended) { video.pause(); recorderRef.current.stop(); return; }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } catch (error) {
      setBusy(false); setNotice(error instanceof Error ? \`Export failed: \${error.message}\` : 'Export failed. Try again in Chrome.');
    }
  }

  function resetEdits() {
    setTrimStart(0); setTrimEnd(duration); setTitle(''); setSpeed('1'); setAspect('original'); setMuted(false);
    if (videoRef.current) { videoRef.current.playbackRate = 1; videoRef.current.muted = false; videoRef.current.currentTime = 0; }
    setNotice('Edits reset. Your original video is unchanged.');
  }

  const timeLabel = (seconds: number) => \`\${Math.floor(seconds / 60).toString().padStart(2, '0')}:\${Math.floor(seconds % 60).toString().padStart(2, '0')}\`;

  return <div className="tool-page video-editor-page">
    <div className="tool-page-heading"><div><div className="eyebrow"><Film size={15}/> CREATOR WORKSPACE</div><h1>Video Editor</h1><p className="page-intro">Trim a clip, add a title overlay and export a short video locally — no paid API required.</p></div><span className="status-pill">Local editor preview</span></div>
    <div className="video-editor-grid">
      <section className="panel video-preview-panel">
        <div className="video-panel-head"><div><span className="result-kicker">PREVIEW</span><h2>Your video</h2></div><label className="video-import-button"><Upload size={15}/> Import video<input type="file" accept="video/*" onChange={e => importVideo(e.target.files?.[0])}/></label></div>
        <div className="video-stage">
          {videoUrl ? <><video ref={videoRef} src={videoUrl} controls onLoadedMetadata={onMetadata} onTimeUpdate={() => { const v = videoRef.current; if (v && v.currentTime >= trimEnd && !busy) v.pause(); }} style={{ aspectRatio: aspect === 'portrait' ? '9 / 16' : aspect === 'square' ? '1 / 1' : aspect === 'landscape' ? '16 / 9' : 'auto' }} /><canvas ref={canvasRef} className="video-export-canvas"/><div className="preview-title-overlay">{title}</div></> : <div className="video-empty"><div className="video-empty-icon"><Film size={28}/></div><strong>Bring your video to life</strong><p>Choose a video from your device to start editing.</p><label className="generate-button video-empty-upload"><Upload size={15}/> Choose video<input type="file" accept="video/*" onChange={e => importVideo(e.target.files?.[0])}/></label><span>Video remains on your device.</span></div>}
        </div>
        {file && <div className="video-file-row"><Film size={16}/><span title={file.name}>{file.name}</span><span>{duration ? \`\${timeLabel(duration)} · \${(file.size / 1024 / 1024).toFixed(1)} MB\` : \`\${(file.size / 1024 / 1024).toFixed(1)} MB\`}</span><button className="icon-button" aria-label="Remove video" onClick={() => { if (videoUrl) URL.revokeObjectURL(videoUrl); setVideoUrl(''); setFile(null); setDuration(0); setTrimStart(0); setTrimEnd(0); setNotice('Video removed. Import another clip to continue.'); }}><Trash2 size={16}/></button></div>}
      </section>
      <section className="panel video-controls-panel"><div className="video-panel-head"><div><span className="result-kicker">EDIT CLIP</span><h2>Quick edits</h2></div><button className="copy-button" onClick={resetEdits} disabled={!file}><RotateCcw size={13}/> Reset</button></div>
        <label className="field-label" htmlFor="video-title"><Type size={13} className="inline-label-icon"/> Title overlay</label><input id="video-title" className="tool-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a title to your video" maxLength={100}/><p className="video-help">Preview shows your title. Export burns it into the video.</p>
        <div className="trim-heading"><label className="field-label"><Scissors size={13} className="inline-label-icon"/> Trim range</label><span>{timeLabel(trimEnd > trimStart ? (trimEnd - trimStart) / Number(speed) : 0)} output</span></div>
        <div className="trim-controls"><label>Start <strong>{timeLabel(trimStart)}</strong><input type="range" min="0" max={Math.max(duration, 0.1)} step="0.1" value={Math.min(trimStart, duration)} disabled={!file} onChange={e => { const next = Number(e.target.value); setTrimStart(Math.min(next, Math.max(0, trimEnd - 0.1))); if (videoRef.current) videoRef.current.currentTime = next; }}/></label><label>End <strong>{timeLabel(trimEnd)}</strong><input type="range" min="0" max={Math.max(duration, 0.1)} step="0.1" value={Math.min(trimEnd, duration)} disabled={!file} onChange={e => setTrimEnd(Math.max(Number(e.target.value), trimStart + 0.1))}/></label></div>
        <div className="field-row"><div><label className="field-label" htmlFor="video-aspect">Output format</label><select id="video-aspect" className="tool-input" value={aspect} onChange={e => setAspect(e.target.value)}><option value="original">Original size</option><option value="portrait">Portrait · 9:16</option><option value="square">Square · 1:1</option><option value="landscape">Landscape · 16:9</option></select></div><div><label className="field-label" htmlFor="video-speed">Playback speed</label><select id="video-speed" className="tool-input" value={speed} onChange={e => { setSpeed(e.target.value); if (videoRef.current) videoRef.current.playbackRate = Number(e.target.value); }}><option value="0.5">0.5× slow</option><option value="0.75">0.75×</option><option value="1">1× normal</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2× fast</option></select></div></div>
        <button className={muted ? 'sound-toggle muted' : 'sound-toggle'} onClick={() => { setMuted(v => !v); if (videoRef.current) videoRef.current.muted = !muted; }} disabled={!file}>{muted ? <VolumeX size={15}/> : <Volume2 size={15}/>} {muted ? 'Audio muted for export' : 'Keep source audio when supported'}</button>
        <button className="generate-button video-export-button" onClick={exportClip} disabled={!file || busy}><Download size={16}/>{busy ? 'Exporting clip…' : 'Export edited video'}</button>
        <p className="tool-disclaimer">Export creates a WebM file in your browser. Audio capture depends on browser support; long clips may take time. This is a basic editor, not a full multi-track timeline.</p>
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
        <Route path="/video" element={<VideoEditor/>}/>
        <Route path="/auto-dm" element={<Placeholder title="Instagram Auto-DM · Demo" description="Demo mode only. No Instagram account is connected and no messages are sent."/>}/>
        <Route path="/marketplace" element={<Placeholder title="Brand Marketplace" description="Campaigns, applications and creator-brand workflows will be implemented in a later approved phase."/>}/>
        <Route path="/analytics" element={<Placeholder title="Analytics" description="No live social metrics or earnings are shown in this foundation preview."/>}/>
        <Route path="/settings" element={<Placeholder title="Settings" description="Branding and locale foundations are present. Account settings will follow after authentication is approved."/>}/>
        <Route path="*" element={<Placeholder title="Page not found" description="Choose a section from the navigation to continue."/>}/>
      </Routes><footer className="page-footer"><span>© {new Date().getFullYear()} {branding.name}</span><span><span className="footer-status"/> Foundation preview · No live integrations</span></footer></div>
    </main>
  </div>;
}
