// Shared components: icons, charts (bubble / donut / hbar / spark), pills.
const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ── Icon set (inline SVG, stroke-based) ─────────────────────────────
const I = {
  dash:    (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>,
  ship:    (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 17l1.5 3h15L21 17"/><path d="M5 17V9h10l4 4v4"/><circle cx="8" cy="20" r="1.5"/><circle cx="16" cy="20" r="1.5"/></svg>,
  fleet:   (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 17V7h10v10"/><path d="M13 11h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>,
  warehouse:(p)=> <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 10l9-5 9 5v10H3z"/><path d="M8 20v-6h8v6"/><path d="M8 14h8"/></svg>,
  lanes:   (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h7a4 4 0 0 1 4 4v6"/></svg>,
  exc:     (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l10 18H2z"/><path d="M12 10v5"/><circle cx="12" cy="18" r=".8" fill="currentColor"/></svg>,
  carrier: (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><path d="M9 6V4M15 6V4"/></svg>,
  report:  (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13l3 3 4-5"/></svg>,
  settings:(p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>,
  help:    (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4"/><circle cx="12" cy="17" r=".9" fill="currentColor"/></svg>,
  search:  (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>,
  bell:    (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2H4.5z"/><path d="M10 20a2 2 0 1 0 4 0"/></svg>,
  filter:  (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 5h16l-6 8v6l-4-2v-4z"/></svg>,
  download:(p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>,
  upload:  (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20V8"/><path d="M7 13l5-5 5 5"/><path d="M4 4h16"/></svg>,
  plus:    (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M5 12h14"/></svg>,
  more:    (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/></svg>,
  chev:    (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 9l6 6 6-6"/></svg>,
  arrow:   (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  collapse:(p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>,
  sparkle: (p) => <svg className={p.className||"nav-ico"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4"/></svg>,
};

// ── Sparkline ──────────────────────────────────────────────────────
function Sparkline({ data, color="var(--accent)", fill=true }){
  const w = 100, h = 32, p = 2;
  const max = Math.max(...data), min = Math.min(...data);
  const range = (max - min) || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (w - p*2) + p;
    const y = h - p - ((v - min) / range) * (h - p*2);
    return [x, y];
  });
  const d = pts.map((pt, i) => `${i===0?'M':'L'}${pt[0].toFixed(1)},${pt[1].toFixed(1)}`).join(' ');
  const area = d + ` L${w-p},${h-p} L${p},${h-p} Z`;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {fill && <path d={area} fill={color} opacity="0.14"/>}
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.2" fill={color}/>
    </svg>
  );
}

// ── KPI card ───────────────────────────────────────────────────────
function Kpi({ tint="lilac", label, value, unit, trend, trendDir="up", spark, sparkColor }){
  return (
    <div className={`kpi tint-${tint}`}>
      <div className="lbl">
        <span>{label}</span>
      </div>
      <div className="val num">{value}{unit && <small>{unit}</small>}</div>
      {spark && <Sparkline data={spark} color={sparkColor || `var(--c-${tint})`}/>}
      <div className="foot">
        <span className={`trend ${trendDir}`}>
          {trendDir==="up" ? "↑" : trendDir==="down" ? "↓" : "·"} {trend}
        </span>
        <span>vs. last 7 days</span>
      </div>
    </div>
  );
}

// ── Bubble chart (D4 style) ────────────────────────────────────────
function BubbleChart({ data }){
  const w = 720, h = 280;
  const padL = 30, padR = 16, padT = 14, padB = 36;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const stages = data.length;
  const stageW = innerW / stages;
  const yMax = 60, yMin = 0;       // days
  const yTicks = [20, 30, 40, 50];
  const colorFor = (i) => i % 2 === 0 ? "var(--c-lilac)" : "var(--c-mint)";

  return (
    <div className="bubble-wrap">
      <svg className="bubble-svg" viewBox={`0 0 ${w} ${h}`}>
        <g className="grid">
          {yTicks.map(t => {
            const y = padT + (1 - (t - yMin)/(yMax - yMin)) * innerH;
            return <line key={t} x1={padL} x2={w - padR} y1={y} y2={y}/>;
          })}
        </g>
        <g className="ax">
          {yTicks.map(t => {
            const y = padT + (1 - (t - yMin)/(yMax - yMin)) * innerH;
            return <text key={t} x={padL - 8} y={y + 3} textAnchor="end">{t}</text>;
          })}
          <text x={padL - 8} y={padT + 3} textAnchor="end" opacity=".6">Days</text>
        </g>
        {data.map((s, i) => {
          const cx = padL + stageW * (i + 0.5);
          return (
            <g key={s.stage}>
              {s.items.map((it, j) => {
                const r = 8 + Math.sqrt(it.v) * 3.4;
                const cy = padT + (1 - (it.d - yMin)/(yMax - yMin)) * innerH;
                const ox = (j - (s.items.length-1)/2) * (r * 1.7);
                const fillC = colorFor(i + j);
                return (
                  <g key={j} className="bubble" style={{ transitionDelay: `${(i*150 + j*60)}ms`}}>
                    <circle cx={cx + ox} cy={cy} r={r} fill={fillC} opacity="0.92"/>
                    <text className={`bubble-lbl ${j%2 ? '' : ''}`} x={cx + ox} y={cy}>{it.v}k</text>
                  </g>
                );
              })}
              <text className="stage-lbl" x={cx} y={h - 12}>{s.stage}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Donut chart (D4 style) ─────────────────────────────────────────
function Donut({ onTime, delayed }){
  const total = onTime + delayed;
  const r = 64, cx = 88, cy = 88, sw = 22;
  const C = 2 * Math.PI * r;
  const a = (onTime / total) * C;
  return (
    <div className="donut-wrap">
      <svg className="donut-svg" width="176" height="176" viewBox="0 0 176 176">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--tint-pink)" strokeWidth={sw}/>
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke="url(#donutG)" strokeWidth={sw}
          strokeDasharray={`${a} ${C-a}`} strokeDashoffset={C/4}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}/>
        <defs>
          <linearGradient id="donutG" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--c-lilac)"/>
            <stop offset="100%" stopColor="var(--c-mint)"/>
          </linearGradient>
        </defs>
        <text className="donut-center" x={cx} y={cy - 4}>{onTime}%</text>
        <text className="donut-center-sub" x={cx} y={cy + 22}>On-time</text>
      </svg>
      <div className="donut-legend">
        <div className="item">
          <span className="sw" style={{background:"linear-gradient(135deg, var(--c-lilac), var(--c-mint))"}}/>
          <span className="lbl">On-time deliveries</span>
          <span className="val">{onTime}%</span>
        </div>
        <div className="item">
          <span className="sw" style={{background:"var(--c-pink)"}}/>
          <span className="lbl">Delayed</span>
          <span className="val">{delayed}%</span>
        </div>
        <div className="item" style={{marginTop:6,paddingTop:10,borderTop:"1px solid var(--line)"}}>
          <span className="lbl">SLA target</span>
          <span className="val">85%</span>
        </div>
      </div>
    </div>
  );
}

// ── Horizontal bars (D4 style) ─────────────────────────────────────
function HBars({ rows }){
  const max = Math.max(...rows.map(r => r.total));
  return (
    <div className="hbars">
      {rows.map((r, i) => {
        const w = Math.round((r.on / max) * 100);
        const warn = r.on / r.total < 0.6;
        return (
          <div key={r.lane} className={`hbar ${warn ? 'warn' : ''}`}>
            <span className="lane">{r.lane}</span>
            <span className="track"><span className="fill" style={{ "--w": w + "%" }}/></span>
            <span className="pct">{Math.round(r.on / r.total * 100)}%</span>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { I, Sparkline, Kpi, BubbleChart, Donut, HBars });
