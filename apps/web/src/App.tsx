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
