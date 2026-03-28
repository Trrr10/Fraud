import React, { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const T = {
  bg:        "#060810",
  surface:   "#0d1117",
  surface2:  "#131920",
  surface3:  "#1a2030",
  surface4:  "#1f2838",
  border:    "#ffffff08",
  border2:   "#ffffff14",
  border3:   "#ffffff22",
  text:      "#e8eaf0",
  muted:     "#7a8599",
  faint:     "#3d4a5c",
  emerald:   "#00e5a0",
  emeraldD:  "#00a070",
  emeraldBg: "#00e5a012",
  red:       "#ff4d6a",
  redBg:     "#ff4d6a12",
  amber:     "#ffb830",
  amberBg:   "#ffb83012",
  blue:      "#4d9fff",
  blueBg:    "#4d9fff12",
  violet:    "#b47fff",
  violetBg:  "#b47fff12",
  cyan:      "#00d4ff",
  cyanBg:    "#00d4ff12",
  pink:      "#ff6eb4",
  pinkBg:    "#ff6eb412",
};

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════════ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: ${T.bg}; color: ${T.text}; font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { width: 3px; height: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${T.border2}; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: ${T.border3}; }

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity:0; } to { opacity:1; }
    }
    @keyframes slideInLeft {
      from { opacity:0; transform:translateX(-20px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity:0; transform:translateX(20px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity:0; transform:scale(0.92); }
      to   { opacity:1; transform:scale(1); }
    }
    @keyframes pulse {
      0%,100% { opacity:1; } 50% { opacity:.3; }
    }
    @keyframes pulseRing {
      0%   { transform:scale(0.8); opacity:0.8; }
      100% { transform:scale(2.2); opacity:0; }
    }
    @keyframes spin {
      from { transform:rotate(0deg); } to { transform:rotate(360deg); }
    }
    @keyframes shimmer {
      0%   { background-position:-200% 0; }
      100% { background-position:200% 0; }
    }
    @keyframes scanline {
      0%   { transform:translateY(-100%); }
      100% { transform:translateY(100vh); }
    }
    @keyframes blink {
      0%,100% { opacity:1; } 49% { opacity:1; } 50% { opacity:0; } 99% { opacity:0; }
    }
    @keyframes countUp {
      from { transform:translateY(100%); opacity:0; }
      to   { transform:translateY(0); opacity:1; }
    }
    @keyframes ripple {
      0%   { transform:scale(0); opacity:0.6; }
      100% { transform:scale(4); opacity:0; }
    }
    @keyframes glow {
      0%,100% { box-shadow: 0 0 15px currentColor; }
      50%      { box-shadow: 0 0 40px currentColor, 0 0 80px currentColor; }
    }
    @keyframes float {
      0%,100% { transform:translateY(0px); }
      50%      { transform:translateY(-4px); }
    }
    @keyframes progressFill {
      from { width:0%; }
    }
    @keyframes dashOffset {
      from { stroke-dashoffset: 283; }
    }
    @keyframes typewriter {
      from { clip-path: inset(0 100% 0 0); }
      to   { clip-path: inset(0 0% 0 0); }
    }
    @keyframes hueRotate {
      from { filter: hue-rotate(0deg); }
      to   { filter: hue-rotate(360deg); }
    }
    @keyframes alertBounce {
      0%,100% { transform:translateY(0); }
      20%     { transform:translateY(-6px); }
      40%     { transform:translateY(-3px); }
    }

    .card {
      transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
      position: relative;
    }
    .card::before {
      content:'';
      position:absolute;
      inset:0;
      border-radius:inherit;
      background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%);
      pointer-events:none;
      opacity:0;
      transition: opacity 0.28s ease;
    }
    .card:hover::before { opacity:1; }
    .card:hover {
      border-color: ${T.border2} !important;
      transform: translateY(-2px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
    }
    .nav-item { transition: all 0.18s cubic-bezier(0.4,0,0.2,1); }
    .nav-item:hover { background: ${T.surface2} !important; }
    .btn { transition: all 0.15s ease; cursor: pointer; position: relative; overflow: hidden; }
    .btn::after {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%);
      opacity:0;
      transition:opacity 0.15s ease;
    }
    .btn:hover::after { opacity:1; }
    .btn:hover { filter: brightness(1.15); transform: translateY(-1px); }
    .btn:active { transform: translateY(0) scale(0.98); }
    .row-hover { transition: background 0.15s ease; }
    .row-hover:hover { background: ${T.surface2} !important; }
    .tag { transition: all 0.15s ease; cursor: pointer; }
    .tag:hover { border-color: ${T.emerald} !important; color: ${T.emerald} !important; }
    .clickable { cursor:pointer; }
    .ripple-btn {
      position: relative;
      overflow: hidden;
      transition: all 0.2s ease;
    }
    .ripple-btn:hover { transform: translateY(-1px); }
    .ripple-btn:active { transform: translateY(0); }
    .status-online {
      animation: pulse 2s ease-in-out infinite;
    }
    .alert-animate {
      animation: alertBounce 0.6s ease;
    }
    .number-tick {
      animation: countUp 0.5s cubic-bezier(0.34,1.56,0.64,1);
    }
    .modal-overlay {
      position: fixed; inset:0;
      background: rgba(6,8,16,0.85);
      backdrop-filter: blur(12px);
      z-index: 100;
      display: flex; align-items: center; justify-content: center;
      animation: fadeIn 0.2s ease;
    }
    .modal-panel {
      background: ${T.surface};
      border: 1px solid ${T.border2};
      border-radius: 20px;
      max-width: 640px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      animation: scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
      box-shadow: 0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05);
    }
    .toast-container {
      position: fixed; bottom: 24px; right: 24px;
      z-index: 200;
      display: flex; flex-direction: column; gap: 10px;
      pointer-events: none;
    }
    .toast {
      padding: 12px 18px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideInRight 0.3s cubic-bezier(0.34,1.56,0.64,1);
      pointer-events: all;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    }
    .mfa-input {
      background: ${T.surface2};
      border: 1px solid ${T.border2};
      border-radius: 10px;
      color: ${T.text};
      font-family: 'JetBrains Mono', monospace;
      font-size: 22px;
      font-weight: 700;
      text-align: center;
      width: 48px;
      height: 56px;
      outline: none;
      transition: all 0.15s ease;
    }
    .mfa-input:focus {
      border-color: ${T.emerald};
      box-shadow: 0 0 0 3px ${T.emerald}22;
    }
    .progress-ring {
      transition: stroke-dashoffset 1.2s cubic-bezier(0.25,1,0.5,1);
    }
    .shimmer-bg {
      background: linear-gradient(90deg, ${T.surface2} 25%, ${T.surface3} 50%, ${T.surface2} 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    input, select { font-family: inherit; }
    select option { background: ${T.surface2}; color: ${T.text}; }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const flaggedAccounts = [
  { id:"ACC-0042", name:"Rajesh Malhotra", region:"Mumbai North", balance:"₹8,24,500", riskScore:94, type:"Fraud", status:"Urgent", prevFlag:true, lastActivity:"Large withdrawal ₹5L", avatar:"RM", clr:"#ff4d6a" },
  { id:"ACC-1183", name:"Sunita Kapoor",   region:"Delhi NCR",    balance:"₹2,10,900", riskScore:78, type:"Bankruptcy", status:"Review", prevFlag:false, lastActivity:"Missed 3 EMI payments", avatar:"SK", clr:"#ffb830" },
  { id:"ACC-2291", name:"Aditya Verma",    region:"Bengaluru",    balance:"₹15,60,000", riskScore:71, type:"Fraud", status:"Review", prevFlag:true, lastActivity:"Unusual loan application", avatar:"AV", clr:"#ffb830" },
  { id:"ACC-3304", name:"Meera Iyer",      region:"Chennai",      balance:"₹3,40,200", riskScore:63, type:"Dormancy", status:"Monitor", prevFlag:false, lastActivity:"No activity 180 days", avatar:"MI", clr:"#4d9fff" },
  { id:"ACC-4410", name:"Farhan Sheikh",   region:"Hyderabad",    balance:"₹92,000",   riskScore:88, type:"Fraud", status:"Urgent", prevFlag:false, lastActivity:"Multiple intl transfers", avatar:"FS", clr:"#ff4d6a" },
  { id:"ACC-5521", name:"Priya Nair",      region:"Pune",         balance:"₹4,80,000", riskScore:55, type:"Bankruptcy", status:"Monitor", prevFlag:true, lastActivity:"Credit utilisation 94%", avatar:"PN", clr:"#b47fff" },
];

const kpiData = [
  { label:"Flagged Accounts", value:247,  suffix:"",  delta:"+18", dir:"up",   color:T.red,     spark:[180,188,195,200,210,215,218,222,228,234,241,247], isFloat:false },
  { label:"Avg Risk Score",   value:68.4, suffix:"",  delta:"+3.2",dir:"up",   color:T.amber,   spark:[60,62,63,65,64,66,67,66,68,67,69,68], isFloat:true },
  { label:"Cases Resolved",   value:89,   suffix:"%", delta:"+4",  dir:"up",   color:T.emerald, spark:[78,79,81,80,83,84,82,85,86,87,88,89], isFloat:false },
  { label:"Active Alerts",    value:34,   suffix:"",  delta:"-7",  dir:"down", color:T.blue,    spark:[48,45,43,44,41,42,40,39,37,36,35,34], isFloat:false },
];

const riskDistribution = [
  { label:"Critical (90-100)", count:28,  color:T.red    },
  { label:"High (70-89)",      count:74,  color:T.amber  },
  { label:"Medium (50-69)",    count:96,  color:T.blue   },
  { label:"Low (<50)",         count:49,  color:T.emerald},
];

const regionData = [
  { name:"Mumbai",    flagged:62, total:1200, pct:78, color:T.red    },
  { name:"Delhi NCR", flagged:48, total:980,  pct:65, color:T.amber  },
  { name:"Bengaluru", flagged:41, total:870,  pct:72, color:T.violet },
  { name:"Hyderabad", flagged:36, total:640,  pct:58, color:T.blue   },
  { name:"Chennai",   flagged:29, total:520,  pct:44, color:T.cyan   },
  { name:"Pune",      flagged:31, total:490,  pct:61, color:T.emerald},
];

const trendMonths = ["Oct","Nov","Dec","Jan","Feb","Mar"];
const fraudTrend  = [38, 44, 51, 46, 58, 67];
const bankruptTrend=[24, 28, 26, 31, 29, 34];
const resolvedTrend=[30, 38, 41, 44, 47, 52];

const auditLogs = [
  { user:"Arjun Sharma",  role:"Admin",   action:"Flagged ACC-4410 as Urgent",              time:"2 min ago",   ip:"10.0.1.42",  severity:"high"   },
  { user:"Priya Mehta",   role:"Analyst", action:"Added note to ACC-0042 — 'Verify ID docs'", time:"14 min ago",  ip:"10.0.1.18",  severity:"medium" },
  { user:"System",        role:"Auto",    action:"Risk model retrained — v4.2 deployed",    time:"31 min ago",  ip:"internal",   severity:"info"   },
  { user:"Vikram Rao",    role:"Manager", action:"Approved freeze on ACC-0042",             time:"1 hr ago",    ip:"10.0.1.55",  severity:"high"   },
  { user:"Ananya Singh",  role:"Analyst", action:"Escalated ACC-2291 to Manager",           time:"2 hr ago",    ip:"10.0.1.29",  severity:"medium" },
  { user:"System",        role:"Auto",    action:"Auto-flagged 3 accounts via ML model",    time:"3 hr ago",    ip:"internal",   severity:"info"   },
  { user:"Rahul Bose",    role:"Manager", action:"Assigned ACC-1183 to Ananya Singh",       time:"4 hr ago",    ip:"10.0.1.55",  severity:"low"    },
  { user:"Priya Mehta",   role:"Analyst", action:"Status changed: Pending → Under Review",  time:"Yesterday",   ip:"10.0.1.18",  severity:"low"    },
];

const tasks = [
  { id:"T-001", account:"ACC-0042", assignee:"Priya Mehta",  priority:"Urgent", status:"Under Review", due:"Today",   type:"Fraud"     },
  { id:"T-002", account:"ACC-4410", assignee:"Vikram Rao",   priority:"Urgent", status:"Pending",      due:"Today",   type:"Fraud"     },
  { id:"T-003", account:"ACC-1183", assignee:"Ananya Singh", priority:"Medium", status:"Under Review", due:"Mar 28",  type:"Bankruptcy"},
  { id:"T-004", account:"ACC-2291", assignee:"Priya Mehta",  priority:"Medium", status:"Pending",      due:"Mar 29",  type:"Fraud"     },
  { id:"T-005", account:"ACC-3304", assignee:"Rahul Bose",   priority:"Low",    status:"Action Taken", due:"Mar 30",  type:"Dormancy"  },
];

const notifications = [
  { id:1, type:"alert",   msg:"ACC-4410 triggered ML threshold — SHAP 0.94",    time:"1m",  read:false, color:T.red    },
  { id:2, type:"task",    msg:"T-002 assigned to you by Vikram Rao",             time:"8m",  read:false, color:T.blue   },
  { id:3, type:"system",  msg:"Risk model v4.2 successfully deployed to prod",  time:"31m", read:false, color:T.emerald},
  { id:4, type:"alert",   msg:"3 accounts exceeded dormancy threshold today",    time:"1hr", read:true,  color:T.amber  },
  { id:5, type:"task",    msg:"T-001 status update: moved to Under Review",      time:"2hr", read:true,  color:T.violet },
];

const roles = {
  Admin:   { color:T.violet, can:["flag","freeze","assign","delete","audit","export"] },
  Manager: { color:T.blue,   can:["flag","freeze","assign","audit","export"] },
  Analyst: { color:T.emerald,can:["flag","assign"] },
};

const analyticsMetrics = [
  { label:"True Positive Rate", value:"91.4%", delta:"+2.1%", color:T.emerald },
  { label:"False Positive Rate", value:"4.7%",  delta:"-0.8%", color:T.emerald },
  { label:"Model Confidence",    value:"88.9%", delta:"+1.4%", color:T.blue    },
  { label:"SLA Compliance",      value:"94.2%", delta:"-0.6%", color:T.amber   },
];

/* ═══════════════════════════════════════════════════════════════
   PRIMITIVE COMPONENTS
═══════════════════════════════════════════════════════════════ */
const Badge = ({ color, children, pulse=false }) => {
  const map = {
    green:  { bg:T.emeraldBg, fg:T.emerald, border:`${T.emerald}30` },
    red:    { bg:T.redBg,     fg:T.red,     border:`${T.red}30`     },
    amber:  { bg:T.amberBg,   fg:T.amber,   border:`${T.amber}30`   },
    blue:   { bg:T.blueBg,    fg:T.blue,    border:`${T.blue}30`    },
    violet: { bg:T.violetBg,  fg:T.violet,  border:`${T.violet}30`  },
    cyan:   { bg:T.cyanBg,    fg:T.cyan,    border:`${T.cyan}30`    },
  };
  const { bg, fg, border } = map[color] || map.blue;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px",
      borderRadius:100, fontSize:10, fontWeight:700, letterSpacing:"0.07em",
      textTransform:"uppercase", background:bg, color:fg, border:`1px solid ${border}`,
      whiteSpace:"nowrap" }}>
      {pulse && <span style={{width:5,height:5,borderRadius:"50%",background:fg,animation:"pulse 1.5s infinite"}}/>}
      {children}
    </span>
  );
};

const Card = ({ children, style={}, glowColor=null }) => (
  <div className="card" style={{
    background: T.surface, border:`1px solid ${T.border}`,
    borderRadius:18, overflow:"hidden",
    ...(glowColor ? {boxShadow:`0 0 30px ${glowColor}18`} : {}),
    ...style }}>
    {children}
  </div>
);

const CardHead = ({ title, sub, action, onAction, children }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
    padding:"18px 22px 14px", borderBottom:`1px solid ${T.border}` }}>
    <div>
      <div style={{ fontSize:13.5, fontWeight:700, color:T.text, letterSpacing:"-0.01em", fontFamily:"'Syne', sans-serif" }}>{title}</div>
      {sub && <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{sub}</div>}
    </div>
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      {children}
      {action && (
        <span className="tag" onClick={onAction} style={{ fontSize:11, color:T.muted, fontWeight:600,
          border:`1px solid ${T.border}`, borderRadius:8, padding:"4px 12px",
          cursor:"pointer", fontFamily:"'Syne',sans-serif", letterSpacing:"0.02em" }}>
          {action}
        </span>
      )}
    </div>
  </div>
);

const CountUp = ({ to, isFloat=false }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = to / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [to]);
  return <>{isFloat ? val.toFixed(1) : val.toLocaleString()}</>;
};

const AnimBar = ({ pct, color=T.emerald, height=5, delay=0, showGlow=true }) => {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), delay+150); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ height, background:T.surface3, borderRadius:100, overflow:"hidden", position:"relative" }}>
      <div style={{ height:"100%", width:`${w}%`, background:color, borderRadius:100,
        transition:"width 1.3s cubic-bezier(.25,1,.5,1)",
        boxShadow: showGlow ? `0 0 8px ${color}60` : "none" }} />
    </div>
  );
};

const RingProgress = ({ pct, color=T.emerald, size=80, stroke=7, label="" }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  useEffect(() => { const t = setTimeout(() => setOffset(circ*(1-pct/100)), 200); return ()=>clearTimeout(t); }, [pct]);
  return (
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.surface3} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          className="progress-ring" style={{filter:`drop-shadow(0 0 6px ${color})`}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center"}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:size*0.2,fontWeight:700,color,lineHeight:1}}>{pct}</span>
        {label && <span style={{fontSize:9,color:T.faint,marginTop:1}}>{label}</span>}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SVG CHARTS
═══════════════════════════════════════════════════════════════ */
const Sparkline = ({ data, color=T.emerald, height=36, width=90 }) => {
  const w=width, h=height;
  const min=Math.min(...data), max=Math.max(...data);
  const pts = data.map((v,i) => [
    (i/(data.length-1))*w,
    h-((v-min)/(max-min||1))*(h-8)-4,
  ]);
  const d = pts.map((p,i)=>(i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(" ");
  const area = d+` L${pts[pts.length-1][0]},${h} L0,${h} Z`;
  const gid = `sg${Math.random().toString(36).slice(2,7)}`;
  return (
    <svg width={w} height={h} style={{overflow:"visible"}}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`}/>
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="3" fill={color}
        style={{filter:`drop-shadow(0 0 4px ${color})`}}/>
    </svg>
  );
};

const MultiLineChart = ({ datasets, labels, height=140 }) => {
  const w=480, h=height, pad={l:42,r:14,t:14,b:28};
  const iw=w-pad.l-pad.r, ih=h-pad.t-pad.b;
  const allVals = datasets.flatMap(d=>d.data);
  const min=Math.min(...allVals)*0.9, max=Math.max(...allVals)*1.08;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{overflow:"visible"}}>
      {[0,0.5,1].map((t,i)=>(
        <g key={i}>
          <line x1={pad.l} x2={w-pad.r} y1={pad.t+t*ih} y2={pad.t+t*ih}
            stroke={T.border} strokeWidth="1" strokeDasharray="3,4"/>
          <text x={pad.l-6} y={pad.t+t*ih+4} textAnchor="end"
            fontSize="9" fill={T.faint} fontFamily="JetBrains Mono">
            {Math.round(min+(max-min)*(1-t))}
          </text>
        </g>
      ))}
      {datasets.map((ds, di)=>{
        const pts = ds.data.map((v,i)=>[
          pad.l+(i/(ds.data.length-1))*iw,
          pad.t+ih-((v-min)/(max-min))*ih,
        ]);
        const d = pts.map((p,i)=>(i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(" ");
        const area = d+` L${pts[pts.length-1][0]},${pad.t+ih} L${pad.l},${pad.t+ih} Z`;
        const gid = `ml${di}${ds.color.replace("#","")}`;
        return (
          <g key={di}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ds.color} stopOpacity="0.18"/>
                <stop offset="100%" stopColor={ds.color} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={area} fill={`url(#${gid})`}/>
            <path d={d} fill="none" stroke={ds.color} strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"/>
            {pts.map((p,i)=>(
              <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={ds.color}
                stroke={T.surface} strokeWidth="2"
                style={{filter:`drop-shadow(0 0 4px ${ds.color})`}}/>
            ))}
          </g>
        );
      })}
      {labels.map((l,i)=>{
        const x = pad.l+(i/(labels.length-1))*iw;
        return (
          <text key={i} x={x} y={h-4} textAnchor="middle"
            fontSize="9" fill={T.muted} fontFamily="JetBrains Mono">{l}</text>
        );
      })}
    </svg>
  );
};

const BarChart = ({ data, height=110 }) => {
  const [animated, setAnimated] = useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setAnimated(true),300); return()=>clearTimeout(t); },[]);
  const m = Math.max(...data.map(d=>d.count));
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:10,height,padding:"0 4px"}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,height:"100%"}}>
          <div style={{flex:1,display:"flex",alignItems:"flex-end",width:"100%"}}>
            <div style={{
              width:"100%", borderRadius:"6px 6px 0 0",
              height: animated ? `${(d.count/m)*100}%` : "0%",
              background:`linear-gradient(180deg,${d.color}dd,${d.color}44)`,
              border:`1px solid ${d.color}55`,
              transition:`height 1s cubic-bezier(.25,1,.5,1) ${i*0.09}s`,
              position:"relative",
              boxShadow:`0 -4px 12px ${d.color}30`,
            }}>
              <div style={{position:"absolute",top:-22,left:"50%",transform:"translateX(-50%)",
                fontSize:11,fontWeight:700,color:d.color,fontFamily:"JetBrains Mono",whiteSpace:"nowrap"}}>
                {d.count}
              </div>
            </div>
          </div>
          <span style={{fontSize:9,color:T.muted,fontFamily:"JetBrains Mono",textAlign:"center",lineHeight:1.2}}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const DonutChart = ({ segments, size=120 }) => {
  const r=44, cx=size/2, cy=size/2, sw=14;
  const total = segments.reduce((s,d)=>s+d.value,0);
  let angle=-90;
  const arcs = segments.map(seg=>{
    const sweep=(seg.value/total)*360;
    const start=angle; angle+=sweep;
    const r1=(start*Math.PI)/180, r2=((start+sweep)*Math.PI)/180;
    const x1=cx+r*Math.cos(r1), y1=cy+r*Math.sin(r1);
    const x2=cx+r*Math.cos(r2), y2=cy+r*Math.sin(r2);
    return {...seg, d:`M ${x1} ${y1} A ${r} ${r} 0 ${sweep>180?1:0} 1 ${x2} ${y2}`};
  });
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.surface3} strokeWidth={sw}/>
      {arcs.map((a,i)=>(
        <path key={i} d={a.d} fill="none" stroke={a.color} strokeWidth={sw}
          strokeLinecap="butt" style={{filter:`drop-shadow(0 0 6px ${a.color}70)`}}/>
      ))}
      <text x={cx} y={cy-4} textAnchor="middle" fontSize="22" fontWeight="800"
        fill={T.text} fontFamily="Syne">{total}</text>
      <text x={cx} y={cy+14} textAnchor="middle" fontSize="9" fill={T.muted} fontFamily="DM Sans">flagged</text>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════════ */
const ICONS = {
  grid:     "M3 3h7v7H3zM13 3h7v7h-7zM3 13h7v7H3zM13 13h7v7h-7z",
  accounts: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 3H8L6 7h12l-2-4z",
  bar:      "M18 20V10M12 20V4M6 20v-6",
  flag:     "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  bell:     "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  search:   "M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5zM16 16l4.5 4.5",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  log:      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  risk:     "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  tasks:    "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  lock:     "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM17 11V7a5 5 0 0 0-10 0v4",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  analytics:"M2 20h20M5 20V14M9 20V8M13 20V12M17 20V4M21 20V16",
  message:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  plus:     "M12 5v14M5 12h14",
  filter:   "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
};
const Icon = ({ name, size=16, color="currentColor", stroke=1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={ICONS[name]}/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   TOAST SYSTEM
═══════════════════════════════════════════════════════════════ */
const ToastContext = React.createContext(null);
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((msg, type="success") => {
    const id = Date.now();
    setToasts(t => [...t, {id, msg, type}]);
    setTimeout(() => setToasts(t => t.filter(x=>x.id!==id)), 3500);
  }, []);
  const colorMap = {success:T.emerald, error:T.red, warning:T.amber, info:T.blue};
  const iconMap = {success:"check", error:"x", warning:"risk", info:"bell"};
  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-container">
        {toasts.map(t=>(
          <div key={t.id} className="toast" style={{
            background:T.surface2,
            border:`1px solid ${colorMap[t.type]}40`,
            color:T.text,
            boxShadow:`0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${colorMap[t.type]}20`}}>
            <div style={{width:24,height:24,borderRadius:8,background:`${colorMap[t.type]}20`,
              display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Icon name={iconMap[t.type]} size={12} color={colorMap[t.type]} stroke={2.5}/>
            </div>
            <span style={{fontSize:13}}>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
const useToast = () => React.useContext(ToastContext);

/* ═══════════════════════════════════════════════════════════════
   LOGIN PAGE with MFA
═══════════════════════════════════════════════════════════════ */
const LoginPage = ({ onLogin }) => {
  const [step, setStep] = useState("login"); // login | mfa
  const [email, setEmail] = useState("arjun.sharma@nexusbank.in");
  const [password, setPassword] = useState("••••••••");
  const [role, setRole] = useState("Admin");
  const [mfaCode, setMfaCode] = useState(["","","","","",""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(()=>{
      setLoading(false);
      setStep("mfa");
    }, 1200);
  };

  const handleMfaChange = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...mfaCode];
    next[i] = val;
    setMfaCode(next);
    if (val && i < 5) inputRefs.current[i+1]?.focus();
    if (next.every(d=>d) && i===5) {
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
        if (next.join("") === "123456") {
          onLogin(role);
        } else {
          setError("Invalid MFA code. Try 123456.");
          setMfaCode(["","","","","",""]);
          inputRefs.current[0]?.focus();
        }
      }, 900);
    }
  };

  const handleMfaKeyDown = (i, e) => {
    if (e.key==="Backspace" && !mfaCode[i] && i>0) {
      inputRefs.current[i-1]?.focus();
    }
  };

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:T.bg, position:"relative", overflow:"hidden",
      fontFamily:"'DM Sans',sans-serif"
    }}>
      {/* Background grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:`
        linear-gradient(${T.border} 1px, transparent 1px),
        linear-gradient(90deg, ${T.border} 1px, transparent 1px)`,
        backgroundSize:"60px 60px",opacity:0.6}}/>
      {/* Glow orbs */}
      <div style={{position:"absolute",top:"20%",left:"15%",width:400,height:400,
        background:`radial-gradient(circle, ${T.emerald}08 0%, transparent 70%)`,
        pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"20%",right:"15%",width:350,height:350,
        background:`radial-gradient(circle, ${T.blue}08 0%, transparent 70%)`,
        pointerEvents:"none"}}/>

      <div style={{width:"100%",maxWidth:440,padding:"0 20px",animation:"fadeUp .5s ease",zIndex:1}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",
            width:56,height:56,borderRadius:16,marginBottom:16,
            background:`linear-gradient(135deg,${T.emerald},${T.blue})`,
            boxShadow:`0 0 40px ${T.emerald}40`}}>
            <Icon name="shield" size={24} color="#000" stroke={2.5}/>
          </div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:T.text,letterSpacing:"-0.02em"}}>
            NexusBank<span style={{color:T.emerald}}>.</span>Risk
          </div>
          <div style={{fontSize:13,color:T.muted,marginTop:4}}>Fraud Intelligence Platform</div>
        </div>

        <div style={{background:T.surface,border:`1px solid ${T.border2}`,borderRadius:20,overflow:"hidden",
          boxShadow:`0 40px 80px rgba(0,0,0,0.6)`}}>
          {step === "login" ? (
            <div style={{padding:32}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,
                marginBottom:24,color:T.text}}>Sign In</div>

              <form onSubmit={handleLogin}>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:11,fontWeight:700,color:T.muted,
                    letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:8}}>
                    Email Address
                  </label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
                    style={{width:"100%",background:T.surface2,border:`1px solid ${T.border2}`,
                      borderRadius:10,padding:"11px 14px",color:T.text,fontSize:14,outline:"none"}}/>
                </div>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:11,fontWeight:700,color:T.muted,
                    letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:8}}>
                    Password
                  </label>
                  <input value={password} onChange={e=>setPassword(e.target.value)} type="password"
                    style={{width:"100%",background:T.surface2,border:`1px solid ${T.border2}`,
                      borderRadius:10,padding:"11px 14px",color:T.text,fontSize:14,outline:"none"}}/>
                </div>
                <div style={{marginBottom:24}}>
                  <label style={{fontSize:11,fontWeight:700,color:T.muted,
                    letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:8}}>
                    Login As
                  </label>
                  <select value={role} onChange={e=>setRole(e.target.value)}
                    style={{width:"100%",background:T.surface2,border:`1px solid ${T.border2}`,
                      borderRadius:10,padding:"11px 14px",color:T.text,fontSize:14,outline:"none",cursor:"pointer"}}>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Analyst</option>
                  </select>
                </div>
                <button type="submit" className="btn" disabled={loading} style={{
                  width:"100%",padding:"13px",borderRadius:12,border:"none",cursor:"pointer",
                  background:`linear-gradient(135deg,${T.emerald},${T.emeraldD})`,
                  color:"#000",fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,
                  letterSpacing:"0.02em",
                  boxShadow:`0 8px 30px ${T.emerald}30`,
                  opacity:loading?0.7:1}}>
                  {loading ? "Authenticating…" : "Continue →"}
                </button>
              </form>
              <div style={{marginTop:20,padding:"14px",background:T.surface2,
                borderRadius:10,border:`1px solid ${T.border}`,
                display:"flex",alignItems:"center",gap:10}}>
                <Icon name="shield" size={14} color={T.emerald}/>
                <span style={{fontSize:11,color:T.muted}}>SSO · MFA · End-to-end encrypted · SOC 2 compliant</span>
              </div>
            </div>
          ) : (
            <div style={{padding:32,textAlign:"center"}}>
              <div style={{width:48,height:48,borderRadius:14,background:T.amberBg,
                border:`1px solid ${T.amber}30`,display:"flex",alignItems:"center",
                justifyContent:"center",margin:"0 auto 20px",animation:"float 3s ease-in-out infinite"}}>
                <Icon name="lock" size={20} color={T.amber}/>
              </div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,
                marginBottom:8,color:T.text}}>Two-Factor Authentication</div>
              <div style={{fontSize:13,color:T.muted,marginBottom:28,lineHeight:1.6}}>
                Enter the 6-digit code from your authenticator app.<br/>
                <span style={{color:T.emerald,fontFamily:"'JetBrains Mono',monospace",fontSize:12}}>Demo: use 123456</span>
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:24}}>
                {mfaCode.map((d,i)=>(
                  <input key={i} ref={el=>inputRefs.current[i]=el}
                    value={d} onChange={e=>handleMfaChange(i,e.target.value)}
                    onKeyDown={e=>handleMfaKeyDown(i,e)}
                    className="mfa-input" maxLength={1} inputMode="numeric"
                    autoFocus={i===0}/>
                ))}
              </div>
              {error && (
                <div style={{color:T.red,fontSize:12,marginBottom:16,
                  background:T.redBg,border:`1px solid ${T.red}30`,borderRadius:8,padding:"8px 12px"}}>
                  {error}
                </div>
              )}
              {loading && (
                <div style={{color:T.emerald,fontSize:13,display:"flex",alignItems:"center",
                  justifyContent:"center",gap:8}}>
                  <div style={{width:14,height:14,border:`2px solid ${T.emerald}40`,
                    borderTopColor:T.emerald,borderRadius:"50%",animation:"spin .7s linear infinite"}}/>
                  Verifying…
                </div>
              )}
              <button onClick={()=>setStep("login")} style={{
                background:"none",border:"none",color:T.muted,fontSize:12,
                cursor:"pointer",marginTop:8,textDecoration:"underline"}}>
                Back to login
              </button>
            </div>
          )}
        </div>

        <div style={{textAlign:"center",marginTop:16,fontSize:11,color:T.faint}}>
          Session auto-expires after 30 min of inactivity · v4.2.1
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FLAG ACCOUNT MODAL
═══════════════════════════════════════════════════════════════ */
const FlagModal = ({ account, onClose, onSubmit }) => {
  const [priority, setPriority] = useState("Urgent");
  const [reason, setReason] = useState("");
  const [action, setAction] = useState("Monitor Closely");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!reason) return;
    onSubmit({ priority, reason, action, note });
  };

  return (
    <div className="modal-overlay" onClick={e=>{ if(e.target===e.currentTarget)onClose(); }}>
      <div className="modal-panel">
        <div style={{padding:"24px 28px 18px",borderBottom:`1px solid ${T.border}`,
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:T.text,marginBottom:3}}>
              Flag Account
            </div>
            {account && <div style={{fontSize:12,color:T.muted}}>
              {account.id} · {account.name}
            </div>}
          </div>
          <button onClick={onClose} className="btn" style={{
            width:32,height:32,borderRadius:10,border:`1px solid ${T.border}`,
            background:"transparent",color:T.muted,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Icon name="x" size={14}/>
          </button>
        </div>
        <div style={{padding:"24px 28px"}}>
          <div style={{marginBottom:18}}>
            <label style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:"0.08em",
              textTransform:"uppercase",display:"block",marginBottom:10}}>Priority Tag</label>
            <div style={{display:"flex",gap:8}}>
              {["Urgent","Medium","Low"].map(p=>(
                <button key={p} className="btn" onClick={()=>setPriority(p)} style={{
                  flex:1,padding:"9px",borderRadius:10,cursor:"pointer",fontFamily:"'Syne',sans-serif",
                  fontWeight:700,fontSize:12,
                  border:`1px solid ${priority===p?(p==="Urgent"?T.red:p==="Medium"?T.amber:T.emerald):T.border}`,
                  background:priority===p?(p==="Urgent"?T.redBg:p==="Medium"?T.amberBg:T.emeraldBg):"transparent",
                  color:priority===p?(p==="Urgent"?T.red:p==="Medium"?T.amber:T.emerald):T.muted}}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:18}}>
            <label style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:"0.08em",
              textTransform:"uppercase",display:"block",marginBottom:8}}>Reason for Flag</label>
            <input value={reason} onChange={e=>setReason(e.target.value)}
              placeholder="e.g., Unusual large withdrawal pattern detected…"
              style={{width:"100%",background:T.surface2,border:`1px solid ${T.border2}`,
                borderRadius:10,padding:"10px 14px",color:T.text,fontSize:13,outline:"none"}}/>
          </div>
          <div style={{marginBottom:18}}>
            <label style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:"0.08em",
              textTransform:"uppercase",display:"block",marginBottom:8}}>Recommended Action</label>
            <select value={action} onChange={e=>setAction(e.target.value)}
              style={{width:"100%",background:T.surface2,border:`1px solid ${T.border2}`,
                borderRadius:10,padding:"10px 14px",color:T.text,fontSize:13,outline:"none",cursor:"pointer"}}>
              <option>Monitor Closely</option>
              <option>Freeze Account</option>
              <option>Escalate to Manager</option>
              <option>Request ID Verification</option>
              <option>Initiate Legal Review</option>
            </select>
          </div>
          <div style={{marginBottom:24}}>
            <label style={{fontSize:11,fontWeight:700,color:T.muted,letterSpacing:"0.08em",
              textTransform:"uppercase",display:"block",marginBottom:8}}>Notes / Observations</label>
            <textarea value={note} onChange={e=>setNote(e.target.value)}
              placeholder="Add any additional context for the audit trail…"
              rows={3} style={{width:"100%",background:T.surface2,border:`1px solid ${T.border2}`,
                borderRadius:10,padding:"10px 14px",color:T.text,fontSize:13,outline:"none",
                resize:"vertical",fontFamily:"'DM Sans',sans-serif"}}/>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={onClose} className="btn" style={{flex:1,padding:"11px",
              borderRadius:12,border:`1px solid ${T.border}`,background:"transparent",
              color:T.muted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:13}}>Cancel</button>
            <button onClick={handleSubmit} className="btn" disabled={!reason} style={{flex:2,padding:"11px",
              borderRadius:12,border:"none",cursor:reason?"pointer":"not-allowed",
              background:reason?`linear-gradient(135deg,${T.red},#cc2244)`:`${T.red}40`,
              color:reason?"#fff":T.faint,fontFamily:"'Syne',sans-serif",
              fontWeight:700,fontSize:13,letterSpacing:"0.02em",
              boxShadow:reason?`0 8px 24px ${T.red}30`:"none"}}>
              Submit Flag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════════════════════════════ */
const DashboardPage = ({ userRole, onFlagAccount }) => {
  const toast = useToast();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [flagModal, setFlagModal] = useState(null);
  const [freezeConfirm, setFreezeConfirm] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = flaggedAccounts.filter(a=>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.region.toLowerCase().includes(search.toLowerCase())
  );

  const handleFlag = (data) => {
    setFlagModal(null);
    toast(`${selectedAccount?.id || "Account"} flagged as ${data.priority} — ${data.action}`, "error");
  };

  const handleFreeze = (acc) => {
    setFreezeConfirm(null);
    toast(`ACC ${acc.id} frozen successfully`, "success");
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"fadeUp .4s ease"}}>
      {/* Alert Banner */}
      <div style={{
        background:`linear-gradient(135deg, ${T.red}12, ${T.amber}08)`,
        border:`1px solid ${T.red}30`,
        borderRadius:14,padding:"14px 20px",
        display:"flex",alignItems:"center",gap:14,
        animation:"fadeUp .3s ease"
      }}>
        <div style={{width:40,height:40,borderRadius:12,background:T.redBg,
          border:`1px solid ${T.red}30`,display:"flex",alignItems:"center",
          justifyContent:"center",flexShrink:0,animation:"float 3s ease-in-out infinite"}}>
          <Icon name="risk" size={18} color={T.red}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:T.red,
            marginBottom:3,fontSize:14}}>
            2 Urgent Fraud Signals Require Immediate Action
          </div>
          <div style={{fontSize:12,color:T.muted}}>
            ML model v4.2 · Confidence ≥ 88% · Last scan: 2 minutes ago
          </div>
        </div>
        <button className="btn" onClick={()=>toast("Reviewing urgent cases…","warning")} style={{
          padding:"8px 18px",borderRadius:10,
          background:T.red,color:"#fff",border:"none",cursor:"pointer",
          fontSize:12,fontFamily:"'Syne',sans-serif",fontWeight:700,
          boxShadow:`0 4px 16px ${T.red}40`,whiteSpace:"nowrap"}}>
          Review Now
        </button>
      </div>

      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        {kpiData.map((k,i)=>(
          <div key={i} className="card" style={{
            background:T.surface, border:`1px solid ${T.border}`,
            borderRadius:16, padding:"20px 20px 16px",
            animation:`fadeUp .4s ease ${i*0.07}s both`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",
                textTransform:"uppercase",color:T.muted,fontFamily:"'Syne',sans-serif"}}>{k.label}</span>
              <Sparkline data={k.spark} color={k.color} height={30} width={80}/>
            </div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:34,
              fontWeight:700,letterSpacing:"-0.04em",lineHeight:1,marginBottom:12,color:k.color}}>
              <CountUp to={k.value} isFloat={k.isFloat}/>{k.suffix}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",
                borderRadius:100,fontSize:10,fontWeight:700,
                background:k.color+"18",color:k.color,border:`1px solid ${k.color}30`}}>
                {k.delta}
              </span>
              <span style={{fontSize:11,color:T.faint}}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mid row: trend + risk dist */}
      <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:14}}>
        <Card>
          <CardHead title="Fraud & Risk Trends" sub="6-month rolling · by type">
            <div style={{display:"flex",gap:12}}>
              {[{l:"Fraud",c:T.red},{l:"Bankruptcy",c:T.amber},{l:"Resolved",c:T.emerald}].map(({l,c})=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:T.muted}}>
                  <div style={{width:8,height:3,borderRadius:2,background:c}}/>
                  {l}
                </div>
              ))}
            </div>
          </CardHead>
          <div style={{padding:"18px 20px 14px"}}>
            <MultiLineChart
              datasets={[
                {data:fraudTrend,   color:T.red,    label:"Fraud"},
                {data:bankruptTrend,color:T.amber,  label:"Bankruptcy"},
                {data:resolvedTrend,color:T.emerald,label:"Resolved"},
              ]}
              labels={trendMonths} height={140}/>
          </div>
        </Card>
        <Card>
          <CardHead title="Risk Distribution" sub="All flagged accounts"/>
          <div style={{padding:"20px",display:"flex",alignItems:"center",gap:20}}>
            <DonutChart segments={riskDistribution.map(d=>({value:d.count,color:d.color}))} size={130}/>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:10}}>
              {riskDistribution.map((d,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:8,height:8,borderRadius:2,background:d.color,
                    boxShadow:`0 0 5px ${d.color}`,flexShrink:0}}/>
                  <span style={{fontSize:11,color:T.muted,flex:1,whiteSpace:"nowrap",
                    overflow:"hidden",textOverflow:"ellipsis"}}>{d.label}</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,
                    color:d.color,fontWeight:700}}>{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Flagged Accounts Table */}
      <Card>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"18px 22px 14px",borderBottom:`1px solid ${T.border}`,flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:13.5,fontWeight:700,color:T.text}}>
              Flagged Accounts
            </div>
            <div style={{fontSize:11,color:T.muted,marginTop:2}}>
              {filtered.length} accounts · Click to expand details
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,
              background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,
              padding:"0 12px",height:34}}>
              <Icon name="search" size={12} color={T.muted}/>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search accounts…" style={{background:"none",border:"none",
                outline:"none",fontSize:12,color:T.text,fontFamily:"inherit",
                width:140,caretColor:T.emerald}}/>
            </div>
            {roles[userRole]?.can.includes("export") && (
              <button className="btn" onClick={()=>toast("Export started…","info")} style={{
                display:"flex",alignItems:"center",gap:6,padding:"7px 14px",
                borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",
                color:T.muted,fontSize:12,cursor:"pointer"}}>
                <Icon name="download" size={12} color={T.muted}/>
                Export
              </button>
            )}
            <button className="btn" onClick={()=>{setSelectedAccount(null);setFlagModal({});}} style={{
              display:"flex",alignItems:"center",gap:6,padding:"7px 14px",
              borderRadius:10,border:`1px solid ${T.red}40`,background:T.redBg,
              color:T.red,fontSize:12,cursor:"pointer",fontWeight:600}}>
              <Icon name="plus" size={12} color={T.red}/>
              Flag New
            </button>
          </div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{background:T.surface2}}>
                {["Account","Region","Balance","Risk Score","Type","Status","Actions"].map(h=>(
                  <th key={h} style={{textAlign:"left",fontSize:10,fontWeight:700,
                    letterSpacing:"0.08em",textTransform:"uppercase",
                    color:T.faint,padding:"10px 18px",borderBottom:`1px solid ${T.border}`,
                    fontFamily:"'Syne',sans-serif",whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((acc,i)=>(
                <React.Fragment key={i}>
                  <tr className="row-hover clickable"
                    onClick={()=>setSelectedAccount(selectedAccount?.id===acc.id?null:acc)}
                    style={{background:selectedAccount?.id===acc.id?T.surface2:"transparent"}}>
                    <td style={{padding:"13px 18px",borderBottom:`1px solid ${T.border}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{position:"relative",flexShrink:0}}>
                          <div style={{width:34,height:34,borderRadius:10,
                            background:`${acc.clr}22`,border:`1.5px solid ${acc.clr}44`,
                            display:"flex",alignItems:"center",justifyContent:"center",
                            fontSize:11,fontWeight:700,color:acc.clr}}>{acc.avatar}</div>
                          {acc.prevFlag && (
                            <div style={{position:"absolute",top:-3,right:-3,width:10,height:10,
                              borderRadius:"50%",background:T.amber,border:`1.5px solid ${T.surface}`,
                              fontSize:6,display:"flex",alignItems:"center",justifyContent:"center",color:"#000"}}
                              title="Previously flagged">!</div>
                          )}
                        </div>
                        <div>
                          <div style={{fontWeight:600,color:T.text,fontSize:13}}>{acc.name}</div>
                          <div style={{fontSize:10,color:T.faint,fontFamily:"'JetBrains Mono',monospace"}}>{acc.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:"13px 18px",borderBottom:`1px solid ${T.border}`,
                      color:T.muted,fontSize:12}}>{acc.region}</td>
                    <td style={{padding:"13px 18px",borderBottom:`1px solid ${T.border}`}}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:T.text,fontWeight:600}}>
                        {acc.balance}
                      </span>
                    </td>
                    <td style={{padding:"13px 18px",borderBottom:`1px solid ${T.border}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <RingProgress pct={acc.riskScore} color={acc.riskScore>=80?T.red:acc.riskScore>=60?T.amber:T.blue} size={36} stroke={4}/>
                      </div>
                    </td>
                    <td style={{padding:"13px 18px",borderBottom:`1px solid ${T.border}`}}>
                      <Badge color={acc.type==="Fraud"?"red":acc.type==="Bankruptcy"?"amber":"blue"}>{acc.type}</Badge>
                    </td>
                    <td style={{padding:"13px 18px",borderBottom:`1px solid ${T.border}`}}>
                      <Badge color={acc.status==="Urgent"?"red":acc.status==="Review"?"amber":"blue"}
                        pulse={acc.status==="Urgent"}>{acc.status}</Badge>
                    </td>
                    <td style={{padding:"13px 18px",borderBottom:`1px solid ${T.border}`}}>
                      <div style={{display:"flex",gap:6}}>
                        {roles[userRole]?.can.includes("flag") && (
                          <button className="btn" onClick={e=>{e.stopPropagation();setSelectedAccount(acc);setFlagModal(acc);}}
                            style={{padding:"5px 10px",borderRadius:8,border:`1px solid ${T.red}40`,
                              background:T.redBg,color:T.red,fontSize:11,cursor:"pointer",fontWeight:600}}>
                            Flag
                          </button>
                        )}
                        {roles[userRole]?.can.includes("freeze") && (
                          <button className="btn" onClick={e=>{e.stopPropagation();setFreezeConfirm(acc);}}
                            style={{padding:"5px 10px",borderRadius:8,border:`1px solid ${T.border}`,
                              background:"transparent",color:T.muted,fontSize:11,cursor:"pointer"}}>
                            Freeze
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {selectedAccount?.id===acc.id && (
                    <tr>
                      <td colSpan={7} style={{padding:0,borderBottom:`1px solid ${T.border}`}}>
                        <div style={{padding:"18px 22px",background:T.surface2,
                          animation:"fadeUp .2s ease"}}>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:16}}>
                            <div style={{padding:"14px",background:T.surface,borderRadius:12,
                              border:`1px solid ${T.border}`}}>
                              <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",
                                textTransform:"uppercase",color:T.faint,marginBottom:8}}>Last Activity</div>
                              <div style={{fontSize:13,color:T.text,fontWeight:500}}>{acc.lastActivity}</div>
                            </div>
                            <div style={{padding:"14px",background:T.surface,borderRadius:12,
                              border:`1px solid ${T.border}`}}>
                              <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",
                                textTransform:"uppercase",color:T.faint,marginBottom:8}}>Previously Flagged</div>
                              <div style={{fontSize:13,color:acc.prevFlag?T.amber:T.emerald,fontWeight:600}}>
                                {acc.prevFlag?"Yes — 1 prior incident":"No prior incidents"}
                              </div>
                            </div>
                            <div style={{padding:"14px",background:T.surface,borderRadius:12,
                              border:`1px solid ${T.border}`}}>
                              <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",
                                textTransform:"uppercase",color:T.faint,marginBottom:8}}>ML Recommendation</div>
                              <div style={{fontSize:12,color:acc.riskScore>=80?T.red:T.amber,fontWeight:600}}>
                                {acc.riskScore>=80?"Freeze Account":"Monitor Closely"}
                              </div>
                            </div>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{flex:1,height:6,background:T.surface3,borderRadius:100,overflow:"hidden"}}>
                              <div style={{height:"100%",width:`${acc.riskScore}%`,borderRadius:100,
                                background:`linear-gradient(90deg,${acc.riskScore>=80?T.red:T.amber},${acc.clr})`,
                                animation:"progressFill 1.2s ease",
                                boxShadow:`0 0 10px ${acc.clr}50`}}/>
                            </div>
                            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,
                              color:acc.clr,fontWeight:700,flexShrink:0}}>{acc.riskScore}/100</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Region Breakdown */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <Card>
          <CardHead title="Risk by Region" sub="Flagged accounts by branch"/>
          <div style={{padding:"12px 0"}}>
            {regionData.map((r,i)=>(
              <div key={i} className="row-hover" style={{display:"flex",alignItems:"center",gap:12,
                padding:"10px 22px"}}>
                <div style={{width:7,height:7,borderRadius:2,background:r.color,
                  boxShadow:`0 0 5px ${r.color}`,flexShrink:0}}/>
                <span style={{fontSize:12.5,fontWeight:500,color:T.text,flex:1}}>{r.name}</span>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:T.faint,width:32,textAlign:"right"}}>
                  {r.flagged}
                </span>
                <div style={{width:100}}>
                  <AnimBar pct={r.pct} color={r.color} height={5} delay={i*70}/>
                </div>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,
                  color:r.color,fontWeight:700,width:32,textAlign:"right"}}>{r.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHead title="Recent Flag Activity" sub="Last 24 hours"/>
          <div style={{padding:"8px 0"}}>
            {auditLogs.slice(0,5).map((a,i)=>(
              <div key={i} className="row-hover" style={{display:"flex",alignItems:"flex-start",gap:12,
                padding:"11px 22px",borderBottom:i<4?`1px solid ${T.border}`:"none"}}>
                <div style={{width:8,height:8,borderRadius:"50%",
                  background:a.severity==="high"?T.red:a.severity==="medium"?T.amber:
                    a.severity==="info"?T.blue:T.emerald,
                  flexShrink:0,marginTop:4,
                  boxShadow:`0 0 5px currentColor`}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,color:T.text,fontWeight:500,marginBottom:2,
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.action}</div>
                  <div style={{fontSize:10,color:T.faint,fontFamily:"'JetBrains Mono',monospace"}}>
                    {a.user} · {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Modals */}
      {flagModal && (
        <FlagModal account={selectedAccount} onClose={()=>setFlagModal(null)} onSubmit={handleFlag}/>
      )}
      {freezeConfirm && (
        <div className="modal-overlay" onClick={()=>setFreezeConfirm(null)}>
          <div className="modal-panel" style={{maxWidth:420}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:"28px",textAlign:"center"}}>
              <div style={{width:56,height:56,borderRadius:16,background:T.redBg,
                border:`1px solid ${T.red}30`,display:"flex",alignItems:"center",
                justifyContent:"center",margin:"0 auto 16px"}}>
                <Icon name="lock" size={24} color={T.red}/>
              </div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,
                color:T.text,marginBottom:8}}>Freeze Account?</div>
              <div style={{fontSize:13,color:T.muted,marginBottom:24,lineHeight:1.6}}>
                You are about to freeze <strong style={{color:T.text}}>{freezeConfirm.id}</strong> ({freezeConfirm.name}).
                All transactions will be blocked immediately.
              </div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setFreezeConfirm(null)} className="btn" style={{
                  flex:1,padding:"11px",borderRadius:12,border:`1px solid ${T.border}`,
                  background:"transparent",color:T.muted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                  Cancel
                </button>
                <button onClick={()=>handleFreeze(freezeConfirm)} className="btn" style={{
                  flex:1,padding:"11px",borderRadius:12,border:"none",cursor:"pointer",
                  background:`linear-gradient(135deg,${T.red},#bb2233)`,
                  color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,
                  boxShadow:`0 6px 20px ${T.red}40`}}>
                  Freeze Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ANALYTICS PAGE
═══════════════════════════════════════════════════════════════ */
const AnalyticsPage = () => {
  const toast = useToast();
  return (
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"fadeUp .4s ease"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        {analyticsMetrics.map((m,i)=>(
          <div key={i} className="card" style={{
            background:T.surface,border:`1px solid ${T.border}`,
            borderRadius:16,padding:"20px",animation:`fadeUp .3s ease ${i*0.07}s both`}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",
              color:T.muted,marginBottom:12,fontFamily:"'Syne',sans-serif"}}>{m.label}</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:28,fontWeight:700,color:m.color,marginBottom:8}}>
              {m.value}
            </div>
            <div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 9px",
              borderRadius:100,fontSize:10,fontWeight:700,background:`${m.color}18`,
              color:m.color,border:`1px solid ${m.color}30`}}>{m.delta}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14}}>
        <Card>
          <CardHead title="Fraud vs Bankruptcy Trend" sub="6-month comparative"/>
          <div style={{padding:"18px 20px 14px"}}>
            <MultiLineChart
              datasets={[
                {data:fraudTrend,   color:T.red,  label:"Fraud"},
                {data:bankruptTrend,color:T.amber,label:"Bankruptcy"},
              ]}
              labels={trendMonths} height={160}/>
          </div>
          <div style={{padding:"14px 22px",borderTop:`1px solid ${T.border}`,
            display:"flex",gap:20,flexWrap:"wrap"}}>
            {[{l:"Peak fraud month",v:"March 2026",c:T.red},{l:"YoY change",v:"+22.4%",c:T.amber},{l:"Predicted Apr",v:"72",c:T.blue}].map((s,i)=>(
              <div key={i}>
                <div style={{fontSize:10,color:T.faint,marginBottom:3,fontFamily:"'Syne',sans-serif",
                  textTransform:"uppercase",letterSpacing:"0.07em"}}>{s.l}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,color:s.c}}>{s.v}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Risk Score Distribution" sub="Histogram · All accounts"/>
          <div style={{padding:"24px 24px 20px"}}>
            <BarChart data={riskDistribution.map(d=>({...d,count:d.count}))} height={120}/>
          </div>
        </Card>
      </div>

      <Card>
        <CardHead title="Region Performance Overview" sub="Fraud rate per 1000 accounts" action="Export CSV"
          onAction={()=>toast("Exporting CSV…","info")}/>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{background:T.surface2}}>
                {["Region","Total Accounts","Flagged","Fraud Rate","Resolution","Trend"].map(h=>(
                  <th key={h} style={{textAlign:"left",fontSize:10,fontWeight:700,
                    letterSpacing:"0.08em",textTransform:"uppercase",color:T.faint,
                    padding:"10px 22px",borderBottom:`1px solid ${T.border}`,
                    fontFamily:"'Syne',sans-serif",whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {regionData.map((r,i)=>(
                <tr key={i} className="row-hover">
                  <td style={{padding:"12px 22px",borderBottom:`1px solid ${T.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:8,height:8,borderRadius:2,background:r.color,
                        boxShadow:`0 0 5px ${r.color}`}}/>
                      <span style={{fontWeight:600,color:T.text}}>{r.name}</span>
                    </div>
                  </td>
                  <td style={{padding:"12px 22px",borderBottom:`1px solid ${T.border}`,
                    fontFamily:"'JetBrains Mono',monospace",color:T.muted}}>{r.total.toLocaleString()}</td>
                  <td style={{padding:"12px 22px",borderBottom:`1px solid ${T.border}`,
                    fontFamily:"'JetBrains Mono',monospace",color:r.color,fontWeight:700}}>{r.flagged}</td>
                  <td style={{padding:"12px 22px",borderBottom:`1px solid ${T.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:60}}><AnimBar pct={r.pct} color={r.color} height={4} delay={i*60}/></div>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:r.color,fontWeight:700}}>
                        {r.pct}%
                      </span>
                    </div>
                  </td>
                  <td style={{padding:"12px 22px",borderBottom:`1px solid ${T.border}`}}>
                    <Badge color={r.pct<=50?"green":r.pct<=70?"amber":"red"}>
                      {r.pct<=50?"On Track":r.pct<=70?"Moderate":"Critical"}
                    </Badge>
                  </td>
                  <td style={{padding:"12px 22px",borderBottom:`1px solid ${T.border}`}}>
                    <Sparkline data={[r.flagged-8,r.flagged-5,r.flagged-3,r.flagged-6,r.flagged-2,r.flagged]}
                      color={r.color} height={24} width={60}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   RISK SIGNALS PAGE
═══════════════════════════════════════════════════════════════ */
const RiskSignalsPage = () => {
  const toast = useToast();
  const [filter, setFilter] = useState("All");
  const filtered = filter==="All" ? flaggedAccounts : flaggedAccounts.filter(a=>a.status===filter);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"fadeUp .4s ease"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {[
          {title:"Urgent Cases",value:"2",color:T.red,desc:"Require action within 24hr",icon:"risk"},
          {title:"Under Review",value:"3",color:T.amber,desc:"Assigned to analysts",icon:"eye"},
          {title:"Monitored",value:"8",color:T.blue,desc:"Low risk, passively tracked",icon:"shield"},
        ].map((s,i)=>(
          <div key={i} className="card" style={{
            background:T.surface,border:`1px solid ${T.border}`,
            borderRadius:16,padding:"22px",animation:`fadeUp .3s ease ${i*0.07}s both`,
            borderTop:`2px solid ${s.color}60`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,alignItems:"flex-start"}}>
              <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",
                color:T.muted,fontFamily:"'Syne',sans-serif"}}>{s.title}</span>
              <div style={{width:34,height:34,borderRadius:10,background:`${s.color}18`,
                border:`1px solid ${s.color}30`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={s.icon} size={15} color={s.color}/>
              </div>
            </div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:36,fontWeight:700,color:s.color,lineHeight:1,marginBottom:8}}>
              <CountUp to={parseInt(s.value)} isFloat={false}/>
            </div>
            <div style={{fontSize:12,color:T.muted}}>{s.desc}</div>
          </div>
        ))}
      </div>

      <Card>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"16px 22px 14px",borderBottom:`1px solid ${T.border}`,flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:13.5,fontWeight:700,color:T.text}}>
              Active Risk Signals
            </div>
            <div style={{fontSize:11,color:T.muted,marginTop:2}}>ML model v4.2 · Real-time</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            {["All","Urgent","Review","Monitor"].map(f=>(
              <button key={f} className="btn" onClick={()=>setFilter(f)} style={{
                padding:"5px 14px",borderRadius:9,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,
                border:`1px solid ${filter===f?T.emerald:T.border}`,fontSize:11,
                background:filter===f?T.emeraldBg:"transparent",
                color:filter===f?T.emerald:T.muted}}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{padding:"8px 0"}}>
          {filtered.map((acc,i)=>(
            <div key={i} className="row-hover" style={{
              display:"flex",alignItems:"center",gap:14,padding:"16px 22px",
              borderBottom:i<filtered.length-1?`1px solid ${T.border}`:"none",
              animation:`slideInLeft .3s ease ${i*0.06}s both`}}>
              <div style={{position:"relative",flexShrink:0}}>
                <RingProgress pct={acc.riskScore}
                  color={acc.riskScore>=80?T.red:acc.riskScore>=60?T.amber:T.blue} size={48} stroke={5}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:700,color:T.text}}>{acc.name}</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:T.faint}}>{acc.id}</span>
                  {acc.prevFlag && <Badge color="amber">Repeat</Badge>}
                </div>
                <div style={{fontSize:12,color:T.muted}}>{acc.lastActivity}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <Badge color={acc.status==="Urgent"?"red":acc.status==="Review"?"amber":"blue"}
                  pulse={acc.status==="Urgent"}>{acc.status}</Badge>
                <div style={{fontSize:10,color:T.faint,marginTop:4}}>{acc.region}</div>
              </div>
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                <button className="btn" onClick={()=>toast(`Assigned ${acc.id} for investigation`,"success")}
                  style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${T.border}`,
                    background:"transparent",color:T.muted,fontSize:11,cursor:"pointer"}}>
                  Assign
                </button>
                <button className="btn" onClick={()=>toast(`${acc.id} escalated to Manager`,"warning")}
                  style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${T.amber}40`,
                    background:T.amberBg,color:T.amber,fontSize:11,cursor:"pointer",fontWeight:600}}>
                  Escalate
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   AUDIT TRAIL PAGE
═══════════════════════════════════════════════════════════════ */
const AuditTrailPage = () => {
  const toast = useToast();
  const [filterRole, setFilterRole] = useState("All");
  const filtered = filterRole==="All" ? auditLogs : auditLogs.filter(a=>a.role===filterRole);

  const severityColor = {high:T.red, medium:T.amber, info:T.blue, low:T.emerald};
  const roleColor = {Admin:T.violet, Manager:T.blue, Analyst:T.emerald, Auto:T.cyan};

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"fadeUp .4s ease"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        {[
          {label:"Total Actions",value:"1,284",color:T.blue},
          {label:"High Severity",value:"47",color:T.red},
          {label:"Auto Events",value:"312",color:T.cyan},
          {label:"Unique Users",value:"8",color:T.emerald},
        ].map((s,i)=>(
          <div key={i} className="card" style={{background:T.surface,border:`1px solid ${T.border}`,
            borderRadius:14,padding:"18px 20px",animation:`fadeUp .3s ease ${i*0.06}s both`}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",
              color:T.muted,marginBottom:10,fontFamily:"'Syne',sans-serif"}}>{s.label}</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:26,fontWeight:700,color:s.color}}>{s.value}</div>
          </div>
        ))}
      </div>

      <Card>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"16px 22px 14px",borderBottom:`1px solid ${T.border}`,flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:13.5,fontWeight:700,color:T.text}}>
              System Audit Trail
            </div>
            <div style={{fontSize:11,color:T.muted,marginTop:2}}>
              Every action tracked · Immutable log
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {["All","Admin","Manager","Analyst","Auto"].map(r=>(
              <button key={r} className="btn" onClick={()=>setFilterRole(r)} style={{
                padding:"5px 12px",borderRadius:9,cursor:"pointer",fontWeight:700,
                border:`1px solid ${filterRole===r?T.emerald:T.border}`,fontSize:11,
                background:filterRole===r?T.emeraldBg:"transparent",
                color:filterRole===r?T.emerald:T.muted,fontFamily:"'Syne',sans-serif"}}>
                {r}
              </button>
            ))}
            <button className="btn" onClick={()=>toast("Exporting audit log…","info")} style={{
              display:"flex",alignItems:"center",gap:6,padding:"6px 12px",
              borderRadius:9,border:`1px solid ${T.border}`,background:"transparent",
              color:T.muted,fontSize:11,cursor:"pointer"}}>
              <Icon name="download" size={11} color={T.muted}/>
              Export
            </button>
          </div>
        </div>
        {filtered.map((log,i)=>(
          <div key={i} className="row-hover" style={{
            display:"flex",alignItems:"flex-start",gap:14,padding:"14px 22px",
            borderBottom:i<filtered.length-1?`1px solid ${T.border}`:"none",
            animation:`slideInLeft .25s ease ${i*0.05}s both`}}>
            <div style={{width:8,height:8,borderRadius:"50%",flexShrink:0,marginTop:6,
              background:severityColor[log.severity],
              boxShadow:`0 0 8px ${severityColor[log.severity]}`}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:500,color:T.text,marginBottom:4}}>{log.action}</div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <span style={{fontSize:10,color:T.faint,fontFamily:"'JetBrains Mono',monospace"}}>
                  {log.user}
                </span>
                <Badge color={log.role==="Admin"?"violet":log.role==="Manager"?"blue":
                  log.role==="Analyst"?"green":"cyan"}>{log.role}</Badge>
                <span style={{fontSize:10,color:T.faint,fontFamily:"'JetBrains Mono',monospace"}}>
                  IP: {log.ip}
                </span>
              </div>
            </div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:T.faint,
              flexShrink:0,marginTop:2}}>{log.time}</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   WORKFLOW/TASKS PAGE
═══════════════════════════════════════════════════════════════ */
const WorkflowPage = ({ userRole }) => {
  const toast = useToast();
  const [tasks_, setTasks] = useState(tasks);
  const [showAssign, setShowAssign] = useState(null);

  const updateStatus = (id, newStatus) => {
    setTasks(prev => prev.map(t=>t.id===id?{...t,status:newStatus}:t));
    toast(`Task ${id} moved to ${newStatus}`,"success");
  };

  const statusConfig = {
    "Pending":       {color:T.faint,  bg:T.surface3},
    "Under Review":  {color:T.amber,  bg:T.amberBg},
    "Action Taken":  {color:T.emerald,bg:T.emeraldBg},
  };

  const columns = ["Pending","Under Review","Action Taken"];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"fadeUp .4s ease"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {columns.map((col,ci)=>{
          const colTasks = tasks_.filter(t=>t.status===col);
          const cfg = statusConfig[col];
          return (
            <div key={col} style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                padding:"12px 16px",background:T.surface,border:`1px solid ${T.border}`,
                borderRadius:14,borderTop:`2px solid ${cfg.color}60`}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:cfg.color,
                    boxShadow:`0 0 6px ${cfg.color}`}}/>
                  <span style={{fontFamily:"'Syne',sans-serif",fontSize:12.5,fontWeight:700,color:T.text}}>{col}</span>
                </div>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,
                  color:cfg.color,fontWeight:700,
                  background:cfg.bg,padding:"2px 8px",borderRadius:100,border:`1px solid ${cfg.color}30`}}>
                  {colTasks.length}
                </span>
              </div>
              {colTasks.map((task,ti)=>(
                <div key={task.id} className="card" style={{
                  background:T.surface,border:`1px solid ${T.border}`,
                  borderRadius:14,padding:"16px",
                  animation:`scaleIn .25s ease ${ti*0.07}s both`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:T.faint}}>{task.id}</span>
                    <Badge color={task.priority==="Urgent"?"red":task.priority==="Medium"?"amber":"green"}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div style={{fontSize:13,fontWeight:600,color:T.text,marginBottom:4}}>{task.account}</div>
                  <div style={{fontSize:11,color:T.muted,marginBottom:10}}>
                    <Badge color={task.type==="Fraud"?"red":task.type==="Bankruptcy"?"amber":"blue"}>
                      {task.type}
                    </Badge>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:22,height:22,borderRadius:6,background:T.surface3,
                        border:`1px solid ${T.border}`,display:"flex",alignItems:"center",
                        justifyContent:"center",fontSize:8,fontWeight:700,color:T.muted}}>
                        {task.assignee.split(" ").map(w=>w[0]).join("")}
                      </div>
                      <span style={{fontSize:11,color:T.muted}}>{task.assignee.split(" ")[0]}</span>
                    </div>
                    <span style={{fontSize:10,color:T.faint,fontFamily:"'JetBrains Mono',monospace"}}>
                      Due: {task.due}
                    </span>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    {col !== "Action Taken" && (
                      <button className="btn" onClick={()=>updateStatus(task.id,
                        col==="Pending"?"Under Review":"Action Taken"
                      )} style={{
                        flex:1,padding:"7px",borderRadius:9,border:`1px solid ${T.emerald}40`,
                        background:T.emeraldBg,color:T.emerald,fontSize:11,cursor:"pointer",fontWeight:600,
                        fontFamily:"'Syne',sans-serif"}}>
                        {col==="Pending"?"→ Review":"→ Close"}
                      </button>
                    )}
                    {roles[userRole]?.can.includes("assign") && col !== "Action Taken" && (
                      <button className="btn" onClick={()=>setShowAssign(task)} style={{
                        padding:"7px 10px",borderRadius:9,border:`1px solid ${T.border}`,
                        background:"transparent",color:T.muted,fontSize:11,cursor:"pointer"}}>
                        <Icon name="users" size={11} color={T.muted}/>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {colTasks.length === 0 && (
                <div style={{textAlign:"center",padding:"24px",color:T.faint,fontSize:12,
                  border:`1px dashed ${T.border}`,borderRadius:14}}>
                  No tasks
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAssign && (
        <div className="modal-overlay" onClick={()=>setShowAssign(null)}>
          <div className="modal-panel" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:"24px 28px"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,
                color:T.text,marginBottom:18}}>Assign Task — {showAssign.id}</div>
              {["Priya Mehta","Vikram Rao","Ananya Singh","Rahul Bose"].map(name=>(
                <div key={name} className="row-hover clickable" style={{
                  display:"flex",alignItems:"center",gap:12,padding:"12px",
                  borderRadius:10,marginBottom:6}}
                  onClick={()=>{
                    setTasks(prev=>prev.map(t=>t.id===showAssign.id?{...t,assignee:name}:t));
                    toast(`${showAssign.id} assigned to ${name}`,"success");
                    setShowAssign(null);
                  }}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:T.surface3,
                    border:`1px solid ${T.border}`,display:"flex",alignItems:"center",
                    justifyContent:"center",fontSize:11,fontWeight:700,color:T.text}}>
                    {name.split(" ").map(w=>w[0]).join("")}
                  </div>
                  <span style={{fontSize:13,color:T.text,fontWeight:500}}>{name}</span>
                </div>
              ))}
              <button onClick={()=>setShowAssign(null)} style={{
                width:"100%",marginTop:8,padding:"10px",borderRadius:10,
                border:`1px solid ${T.border}`,background:"transparent",
                color:T.muted,cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   USER MANAGEMENT PAGE (RBAC)
═══════════════════════════════════════════════════════════════ */
const UsersPage = ({ userRole }) => {
  const toast = useToast();
  const [users] = useState([
    { name:"Arjun Sharma",  email:"arjun@nexusbank.in",  role:"Admin",   status:"Active",  lastLogin:"Just now",   mfa:true  },
    { name:"Vikram Rao",    email:"vikram@nexusbank.in", role:"Manager", status:"Active",  lastLogin:"1 hr ago",   mfa:true  },
    { name:"Priya Mehta",   email:"priya@nexusbank.in",  role:"Analyst", status:"Active",  lastLogin:"3 hr ago",   mfa:true  },
    { name:"Ananya Singh",  email:"ananya@nexusbank.in", role:"Analyst", status:"Active",  lastLogin:"Yesterday",  mfa:false },
    { name:"Rahul Bose",    email:"rahul@nexusbank.in",  role:"Manager", status:"Inactive",lastLogin:"3 days ago", mfa:true  },
  ]);

  const roleInfo = {
    Admin:   {color:T.violet,perms:["Flag","Freeze","Assign","Delete","Audit","Export"]},
    Manager: {color:T.blue,  perms:["Flag","Freeze","Assign","Audit","Export"]},
    Analyst: {color:T.emerald,perms:["Flag","Assign"]},
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"fadeUp .4s ease"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {Object.entries(roleInfo).map(([role,info],i)=>(
          <div key={role} className="card" style={{background:T.surface,border:`1px solid ${T.border}`,
            borderRadius:16,padding:"20px",animation:`fadeUp .3s ease ${i*0.07}s both`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:36,height:36,borderRadius:10,background:`${info.color}18`,
                border:`1px solid ${info.color}30`,display:"flex",alignItems:"center",
                justifyContent:"center"}}>
                <Icon name="shield" size={16} color={info.color}/>
              </div>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:T.text}}>{role}</div>
                <div style={{fontSize:10,color:T.muted}}>{users.filter(u=>u.role===role).length} users</div>
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {info.perms.map(p=>(
                <span key={p} style={{fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:6,
                  background:`${info.color}12`,color:info.color,border:`1px solid ${info.color}25`,
                  letterSpacing:"0.06em",textTransform:"uppercase"}}>{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Card>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"16px 22px 14px",borderBottom:`1px solid ${T.border}`}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:13.5,fontWeight:700,color:T.text}}>
              User Accounts
            </div>
            <div style={{fontSize:11,color:T.muted,marginTop:2}}>Role-based access control</div>
          </div>
          {userRole==="Admin" && (
            <button className="btn" onClick={()=>toast("Invite user flow coming soon","info")} style={{
              display:"flex",alignItems:"center",gap:6,padding:"7px 14px",
              borderRadius:10,border:`1px solid ${T.emerald}40`,background:T.emeraldBg,
              color:T.emerald,fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"'Syne',sans-serif"}}>
              <Icon name="plus" size={12} color={T.emerald}/>
              Invite User
            </button>
          )}
        </div>
        {users.map((u,i)=>{
          const rc = roleInfo[u.role];
          return (
            <div key={i} className="row-hover" style={{
              display:"flex",alignItems:"center",gap:14,padding:"14px 22px",
              borderBottom:i<users.length-1?`1px solid ${T.border}`:"none"}}>
              <div style={{width:36,height:36,borderRadius:10,
                background:`${rc.color}18`,border:`1.5px solid ${rc.color}40`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:11,fontWeight:800,color:rc.color,flexShrink:0,fontFamily:"'Syne',sans-serif"}}>
                {u.name.split(" ").map(w=>w[0]).join("")}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:T.text}}>{u.name}</div>
                <div style={{fontSize:11,color:T.faint,fontFamily:"'JetBrains Mono',monospace"}}>{u.email}</div>
              </div>
              <Badge color={u.role==="Admin"?"violet":u.role==="Manager"?"blue":"green"}>{u.role}</Badge>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:6,height:6,borderRadius:"50%",
                  background:u.status==="Active"?T.emerald:T.faint,
                  boxShadow:u.status==="Active"?`0 0 5px ${T.emerald}`:"none"}}/>
                <span style={{fontSize:11,color:T.muted}}>{u.status}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <Icon name={u.mfa?"lock":"x"} size={12} color={u.mfa?T.emerald:T.red}/>
                <span style={{fontSize:10,color:u.mfa?T.emerald:T.red,fontWeight:600}}>MFA</span>
              </div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:T.faint}}>{u.lastLogin}</div>
              {userRole==="Admin" && (
                <button className="btn" onClick={()=>toast(`Session revoked for ${u.name}`,"warning")} style={{
                  padding:"5px 10px",borderRadius:8,border:`1px solid ${T.border}`,
                  background:"transparent",color:T.muted,fontSize:10,cursor:"pointer"}}>
                  Revoke
                </button>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SETTINGS PAGE
═══════════════════════════════════════════════════════════════ */
const SettingsPage = ({ userRole, onLogout }) => {
  const toast = useToast();
  const [toggles, setToggles] = useState({
    emailAlerts:true, smsAlerts:false, mlAutoFlag:true,
    autoFreeze:false, auditLog:true, darkMode:true,
    sessionTimeout:true, mfaRequired:true,
  });
  const flip = k => setToggles(t=>({...t,[k]:!t[k]}));

  const Toggle = ({k, label, desc, locked=false}) => (
    <div className="row-hover" style={{display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"14px 22px",borderBottom:`1px solid ${T.border}`}}>
      <div>
        <div style={{fontSize:13,fontWeight:600,color:locked?T.faint:T.text,marginBottom:3}}>{label}</div>
        <div style={{fontSize:11,color:T.faint}}>{desc}</div>
      </div>
      <div onClick={()=>{ if(!locked){flip(k);toast(`${label} ${!toggles[k]?"enabled":"disabled"}`,"success"); }}}
        style={{width:46,height:26,borderRadius:100,cursor:locked?"not-allowed":"pointer",
          background:toggles[k]&&!locked?T.emerald:T.surface3,
          border:`1px solid ${toggles[k]&&!locked?T.emerald:T.border}`,
          position:"relative",transition:"all .25s ease",
          boxShadow:toggles[k]&&!locked?`0 0 14px ${T.emerald}44`:"none",
          opacity:locked?0.4:1}}>
        <div style={{position:"absolute",width:19,height:19,borderRadius:"50%",background:"#fff",
          top:3,left:toggles[k]&&!locked?23:3,transition:"left .25s ease",
          boxShadow:"0 2px 6px rgba(0,0,0,0.4)"}}/>
      </div>
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"fadeUp .4s ease"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <Card>
          <CardHead title="Notification Preferences" sub="Alert delivery settings"/>
          <Toggle k="emailAlerts" label="Email Alerts" desc="High-risk flags sent via email"/>
          <Toggle k="smsAlerts" label="SMS Alerts" desc="Critical urgency via SMS"/>
          <Toggle k="mlAutoFlag" label="ML Auto-Flag" desc="Automatic flagging on model threshold breach"/>
          <Toggle k="autoFreeze" label="Auto Freeze (ML)" desc="Automatically freeze on score ≥ 95" locked={userRole!=="Admin"}/>
        </Card>
        <Card>
          <CardHead title="Security Settings" sub="Session & authentication"/>
          <Toggle k="auditLog" label="Audit Logging" desc="Log all user actions to immutable trail" locked={true}/>
          <Toggle k="sessionTimeout" label="Session Timeout" desc="Auto-logout after 30 min inactivity"/>
          <Toggle k="mfaRequired" label="MFA Required" desc="Two-factor for all logins" locked={userRole!=="Admin"}/>
          <Toggle k="darkMode" label="Dark Mode" desc="Current interface theme"/>
        </Card>
      </div>
      <Card>
        <CardHead title="Account" sub={`${userRole} · NexusBank Risk Platform`}/>
        <div style={{padding:"22px"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:22}}>
            <div style={{width:60,height:60,borderRadius:16,
              background:`linear-gradient(135deg,${T.emerald},${T.blue})`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:20,fontWeight:800,color:"#000",fontFamily:"'Syne',sans-serif"}}>AR</div>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:T.text}}>Arjun Sharma</div>
              <div style={{fontSize:12,color:T.muted}}>{userRole} · NexusBank Risk Intelligence</div>
              <div style={{fontSize:11,color:T.emerald,marginTop:3,fontFamily:"'JetBrains Mono',monospace"}}>
                arjun.sharma@nexusbank.in
              </div>
            </div>
            <div style={{marginLeft:"auto",display:"flex",gap:8}}>
              <Badge color="green" pulse>Session Active</Badge>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            {["Edit Profile","Change Password","Export My Data","2FA Settings"].map((l,i)=>(
              <button key={i} className="btn" onClick={()=>toast(`${l} — coming soon`,"info")} style={{
                padding:"10px",borderRadius:10,border:`1px solid ${T.border}`,
                background:"transparent",color:T.muted,fontSize:12,cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif"}}>
                {l}
              </button>
            ))}
          </div>
          <div style={{marginTop:18,paddingTop:18,borderTop:`1px solid ${T.border}`,
            display:"flex",justifyContent:"flex-end"}}>
            <button className="btn" onClick={onLogout} style={{
              display:"flex",alignItems:"center",gap:8,padding:"9px 18px",
              borderRadius:10,border:`1px solid ${T.red}40`,background:T.redBg,
              color:T.red,fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"'Syne',sans-serif"}}>
              <Icon name="logout" size={14} color={T.red}/>
              Sign Out
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   NOTIFICATION PANEL
═══════════════════════════════════════════════════════════════ */
const NotificationPanel = ({ notifications: notifs, onClose, onMarkRead }) => (
  <div style={{
    position:"absolute",top:"100%",right:0,marginTop:8,
    width:340,background:T.surface,border:`1px solid ${T.border2}`,
    borderRadius:16,overflow:"hidden",zIndex:50,
    boxShadow:`0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)`,
    animation:"scaleIn .2s cubic-bezier(0.34,1.56,0.64,1)"
  }}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"14px 18px",borderBottom:`1px solid ${T.border}`}}>
      <span style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:T.text}}>
        Notifications
      </span>
      <button onClick={onMarkRead} style={{background:"none",border:"none",
        color:T.emerald,fontSize:11,cursor:"pointer",fontWeight:600}}>Mark all read</button>
    </div>
    {notifs.map((n,i)=>(
      <div key={n.id} className="row-hover" style={{
        display:"flex",gap:10,padding:"12px 18px",
        borderBottom:i<notifs.length-1?`1px solid ${T.border}`:"none",
        background:n.read?"transparent":`${n.color}05`,
        opacity:n.read?0.6:1}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:n.read?T.faint:n.color,
          flexShrink:0,marginTop:5,boxShadow:n.read?"none":`0 0 6px ${n.color}`}}/>
        <div style={{flex:1}}>
          <div style={{fontSize:12,color:T.text,marginBottom:3,lineHeight:1.4}}>{n.msg}</div>
          <div style={{fontSize:10,color:T.faint,fontFamily:"'JetBrains Mono',monospace"}}>{n.time} ago</div>
        </div>
      </div>
    ))}
    <div style={{padding:"12px 18px",borderTop:`1px solid ${T.border}`,textAlign:"center"}}>
      <button onClick={onClose} style={{background:"none",border:"none",color:T.muted,fontSize:12,cursor:"pointer"}}>
        View all notifications →
      </button>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════ */
export default function BankingDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("Admin");
  const [page, setPage] = useState("Dashboard");
  const [liveTime, setLiveTime] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifList, setNotifList] = useState(notifications);
  const [sessionWarning, setSessionWarning] = useState(false);
  const notifRef = useRef(null);

  const unread = notifList.filter(n=>!n.read).length;

  useEffect(() => {
    const now = new Date();
    setDateStr(now.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"}));
    const tick = () => setLiveTime(new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Session timeout warning (demo: shows after 25s)
  useEffect(() => {
    if (!loggedIn) return;
    const t = setTimeout(()=>setSessionWarning(true), 25000);
    return () => clearTimeout(t);
  }, [loggedIn]);

  // Close notif on outside click
  useEffect(() => {
    const handler = (e) => { if(notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPage("Dashboard");
    setSessionWarning(false);
  };

  const markAllRead = () => setNotifList(n=>n.map(x=>({...x,read:true})));

  const navItems = [
    {section:"Overview"},
    {icon:"grid",     label:"Dashboard",   badge: unread > 0 ? unread : null},
    {icon:"analytics",label:"Analytics"},
    {section:"Risk Management"},
    {icon:"flag",     label:"Flagged Accounts"},
    {icon:"risk",     label:"Risk Signals"},
    {icon:"log",      label:"Audit Trail"},
    {section:"Workflow"},
    {icon:"tasks",    label:"Task Board"},
    {section:"Administration"},
    {icon:"users",    label:"User Management"},
    {icon:"settings", label:"Settings"},
  ];

  const pageMeta = {
    Dashboard:           {title:"Risk Overview",         sub:"Live fraud intelligence · March 2026"},
    Analytics:           {title:"Analytics",             sub:"Statistical insights · Predictive models"},
    "Flagged Accounts":  {title:"Flagged Accounts",      sub:"All accounts under review"},
    "Risk Signals":      {title:"Risk Signals",          sub:"ML-powered threat detection · v4.2"},
    "Audit Trail":       {title:"Audit Trail",           sub:"Immutable system log"},
    "Task Board":        {title:"Workflow Board",        sub:"Task assignment · Status tracking"},
    "User Management":   {title:"User Management",       sub:"RBAC · Access control"},
    Settings:            {title:"Settings",              sub:"Preferences · Security · Session"},
  };

  const renderPage = () => {
    switch(page) {
      case "Dashboard":          return <DashboardPage userRole={userRole}/>;
      case "Analytics":          return <AnalyticsPage/>;
      case "Flagged Accounts":   return <DashboardPage userRole={userRole}/>;
      case "Risk Signals":       return <RiskSignalsPage/>;
      case "Audit Trail":        return <AuditTrailPage/>;
      case "Task Board":         return <WorkflowPage userRole={userRole}/>;
      case "User Management":    return <UsersPage userRole={userRole}/>;
      case "Settings":           return <SettingsPage userRole={userRole} onLogout={handleLogout}/>;
      default: return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",
          justifyContent:"center",height:300,gap:12,animation:"fadeUp .4s ease"}}>
          <div style={{fontSize:40}}>🚧</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,color:T.text}}>{page}</div>
          <div style={{fontSize:13,color:T.muted}}>Coming soon</div>
        </div>
      );
    }
  };

  if (!loggedIn) return (
    <ToastProvider>
      <GlobalStyle/>
      <LoginPage onLogin={handleLogin}/>
    </ToastProvider>
  );

  const info = pageMeta[page] || {title:page, sub:""};
  const roleColor = {Admin:T.violet, Manager:T.blue, Analyst:T.emerald}[userRole];

  return (
    <ToastProvider>
      <GlobalStyle/>
      <div style={{fontFamily:"'DM Sans',sans-serif",
        display:"grid",gridTemplateColumns:"230px 1fr",
        minHeight:"100vh",background:T.bg,color:T.text,fontSize:14}}>

        {/* Sidebar */}
        <aside style={{background:T.surface,borderRight:`1px solid ${T.border}`,
          display:"flex",flexDirection:"column",
          position:"sticky",top:0,height:"100vh",overflowY:"auto"}}>

          {/* Logo */}
          <div style={{padding:"22px 18px 18px",borderBottom:`1px solid ${T.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:10,flexShrink:0,
                background:`linear-gradient(135deg,${T.emerald},${T.blue})`,
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:`0 0 20px ${T.emerald}40`}}>
                <Icon name="shield" size={18} color="#000" stroke={2.5}/>
              </div>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:14.5,fontWeight:800,
                  color:T.text,letterSpacing:"-0.02em"}}>NexusBank</div>
                <div style={{fontSize:9,color:T.faint,letterSpacing:"0.12em",
                  textTransform:"uppercase",fontFamily:"'Syne',sans-serif"}}>Risk Intelligence</div>
              </div>
            </div>
          </div>

          {/* Role indicator */}
          <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`,
            background:`${roleColor}08`}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:roleColor,
                boxShadow:`0 0 6px ${roleColor}`,animation:"pulse 2s infinite"}}/>
              <span style={{fontSize:10,fontWeight:700,color:roleColor,letterSpacing:"0.1em",
                textTransform:"uppercase",fontFamily:"'Syne',sans-serif"}}>{userRole}</span>
              <span style={{fontSize:10,color:T.faint,marginLeft:2}}>session active</span>
            </div>
          </div>

          {/* Nav */}
          <nav style={{flex:1,padding:"12px 10px",display:"flex",flexDirection:"column",gap:1}}>
            {navItems.map((item,i)=>{
              if(item.section) return (
                <div key={i} style={{fontSize:9,fontWeight:700,letterSpacing:"0.14em",
                  textTransform:"uppercase",color:T.faint,padding:"14px 10px 5px",
                  fontFamily:"'Syne',sans-serif"}}>{item.section}</div>
              );
              const isActive = page===item.label;
              return (
                <button key={i} className="nav-item" onClick={()=>setPage(item.label)} style={{
                  display:"flex",alignItems:"center",gap:9,padding:"9px 12px",
                  borderRadius:10,fontSize:12.5,fontWeight:isActive?700:400,
                  color:isActive?T.text:T.muted,
                  background:isActive?T.surface2:"transparent",
                  border:isActive?`1px solid ${T.border2}`:"1px solid transparent",
                  cursor:"pointer",width:"100%",textAlign:"left",fontFamily:"inherit"}}>
                  <Icon name={item.icon} size={14}
                    color={isActive?T.emerald:T.faint} stroke={isActive?2.2:1.6}/>
                  <span style={{flex:1}}>{item.label}</span>
                  {item.badge && (
                    <span style={{background:T.red,borderRadius:100,fontSize:9,
                      padding:"1px 7px",fontWeight:700,color:"#fff",
                      animation:"pulse 1.5s infinite"}}>{item.badge}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User */}
          <div className="nav-item" style={{padding:"12px 14px",borderTop:`1px solid ${T.border}`,
            display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}
            onClick={()=>setPage("Settings")}>
            <div style={{width:34,height:34,borderRadius:10,flexShrink:0,
              background:`linear-gradient(135deg,${T.emerald},${T.blue})`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:12,fontWeight:800,color:"#000",fontFamily:"'Syne',sans-serif"}}>AR</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12.5,fontWeight:700,color:T.text,fontFamily:"'Syne',sans-serif",
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Arjun Sharma</div>
              <div style={{fontSize:10,color:T.faint}}>Head of Risk Analytics</div>
            </div>
            <div style={{width:7,height:7,borderRadius:"50%",background:T.emerald,
              boxShadow:`0 0 6px ${T.emerald}`,animation:"pulse 2s ease-in-out infinite"}}/>
          </div>
        </aside>

        {/* Main */}
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>

          {/* Topbar */}
          <header style={{background:T.surface,borderBottom:`1px solid ${T.border}`,
            display:"flex",alignItems:"center",gap:14,padding:"0 28px",
            height:58,position:"sticky",top:0,zIndex:20}}>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,
                color:T.text,letterSpacing:"-0.02em"}}>{info.title}</div>
              <div style={{fontSize:10,color:T.faint,marginTop:1}}>{info.sub}</div>
            </div>

            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:T.faint,
              background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,
              padding:"4px 10px",letterSpacing:"0.04em"}}>{liveTime}</div>

            <div style={{display:"flex",alignItems:"center",gap:8,
              background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,
              padding:"0 12px",height:34,width:200}}>
              <Icon name="search" size={13} color={T.faint}/>
              <input value={globalSearch} onChange={e=>setGlobalSearch(e.target.value)}
                placeholder="Search accounts…"
                style={{background:"none",border:"none",outline:"none",fontSize:12,
                  color:T.text,fontFamily:"inherit",width:"100%",caretColor:T.emerald}}/>
            </div>

            {/* Notifications */}
            <div ref={notifRef} style={{position:"relative"}}>
              <button className="btn" onClick={()=>setNotifOpen(o=>!o)} style={{
                position:"relative",width:36,height:36,borderRadius:10,
                border:`1px solid ${notifOpen?T.border2:T.border}`,
                background:notifOpen?T.surface2:T.surface2,
                display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                <Icon name="bell" size={15} color={unread>0?T.amber:T.muted}/>
                {unread>0 && (
                  <>
                    <span style={{position:"absolute",top:7,right:7,width:7,height:7,
                      borderRadius:"50%",background:T.red,border:`1.5px solid ${T.surface}`,
                      animation:"pulse 1.5s ease-in-out infinite"}}/>
                    <span style={{position:"absolute",inset:-2,borderRadius:12,
                      border:`2px solid ${T.red}`,animation:"pulseRing 1.5s ease-out infinite",
                      pointerEvents:"none"}}/>
                  </>
                )}
              </button>
              {notifOpen && (
                <NotificationPanel notifications={notifList}
                  onClose={()=>setNotifOpen(false)} onMarkRead={markAllRead}/>
              )}
            </div>
          </header>

          {/* Session Warning */}
          {sessionWarning && (
            <div style={{
              background:`${T.amber}14`,border:`1px solid ${T.amber}40`,
              padding:"10px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",
              animation:"slideInLeft .3s ease"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <Icon name="lock" size={14} color={T.amber}/>
                <span style={{fontSize:12,color:T.amber,fontWeight:600}}>
                  Session expiring in 5 minutes due to inactivity
                </span>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button className="btn" onClick={()=>setSessionWarning(false)} style={{
                  padding:"5px 14px",borderRadius:8,border:`1px solid ${T.amber}40`,
                  background:T.amberBg,color:T.amber,fontSize:11,cursor:"pointer",fontWeight:600}}>
                  Extend Session
                </button>
                <button className="btn" onClick={handleLogout} style={{
                  padding:"5px 14px",borderRadius:8,border:`1px solid ${T.border}`,
                  background:"transparent",color:T.muted,fontSize:11,cursor:"pointer"}}>
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Page */}
          <main style={{padding:"24px 28px 48px",flex:1}}>
            {renderPage()}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}