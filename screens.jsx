// Screens: Splash, Home (D4-style ops dashboard), Status (CSV import + table).
const { useState: uS, useEffect: uE, useMemo: uM, useRef: uR, useCallback: uC } = React;

// ── Splash ─────────────────────────────────────────────────────────
function Splash({ onDone }){
  uE(() => {
    const t = setTimeout(onDone, 3800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="splash" id="splash">
      <div className="splash-stage">
        <div className="splash-ribbon" aria-hidden="true">
          <svg viewBox="-420 -200 840 400">
            <defs>
              <linearGradient id="rib1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="var(--c-lilac)"/>
                <stop offset="45%"  stopColor="var(--accent)"/>
                <stop offset="100%" stopColor="var(--c-sky)"/>
              </linearGradient>
              <linearGradient id="rib2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="var(--c-peach)"/>
                <stop offset="100%" stopColor="var(--c-pink)"/>
              </linearGradient>
            </defs>
            {/* Big ribbon path that orbits the wordmark */}
            <path className="ribbon-path r1" pathLength="100"
              d="M -390,80
                 C -320,-170 -120,-200 -20,-50
                 C  60, 90  240, 130 340,20
                 C 410,-60  400,-170 290,-180
                 C 130,-200  40,-60 100,60
                 C 160,170  320,180 390,90" />
            <path className="ribbon-path r2" pathLength="100"
              d="M -380,-30
                 C -260, 150  -20, 180 100, 80
                 C 220,-10   340,-40 380,-120
                 C 410,-180  330,-210 220,-160
                 C  90,-100   20, 70  -80, 80" />
            <path className="ribbon-path r3" pathLength="100"
              d="M -390,80
                 C -320,-170 -120,-200 -20,-50
                 C  60, 90  240, 130 340,20
                 C 410,-60  400,-170 290,-180
                 C 130,-200  40,-60 100,60
                 C 160,170  320,180 390,90" />
          </svg>
        </div>
        <div className="splash-word" aria-label="Dash">
          <span>D</span><span>a</span><span>s</span><span><i>h</i></span>
        </div>
      </div>
      <div className="splash-tag">Operations <span className="dot"/> Synced & ready</div>
    </div>
  );
}

// ── Home (D4-style dashboard) ──────────────────────────────────────
function HomeScreen({ t }){
  const ACTIVITY = [
    { who:"MA", tint:"pink",  ttl:"SHP-48201 reassigned to lane CHI → DAL", sub:"Ridgeline Freight · ETA 22 May", time:"4m ago" },
    { who:"LC", tint:"sky",   ttl:"Exception EXC-2204 escalated to High",   sub:"Customs hold on NJ → GA",         time:"18m ago" },
    { who:"RS", tint:"mint",  ttl:"SLA target met for Pacific region",      sub:"Weekly window closed at 92%",     time:"1h ago" },
    { who:"PN", tint:"peach", ttl:"New rate card from Pacific Lanes",       sub:"38 lanes, 2 expired carriers",    time:"3h ago" },
    { who:"JR", tint:"lilac", ttl:"Audit log retention bumped to 90 days",  sub:"Security policy v3 published",    time:"6h ago" },
  ];

  return (
    <React.Fragment>
      <div className="page-hd">
        <div>
          <div className="head-sm">Operations · Tuesday, May 20</div>
          <h1>Good afternoon, <i>Maya</i></h1>
          <p>14 shipments in transit, 3 exceptions need a look, and on-time rate is trending up across the Pacific region.</p>
        </div>
        <div className="right">
          <div className="seg" role="tablist">
            <button className="on">7d</button>
            <button>14d</button>
            <button>30d</button>
            <button>QTD</button>
          </div>
          <button className="btn"><I.download/> Export</button>
          <button className="btn btn-primary"><I.plus/> New shipment</button>
        </div>
      </div>

      {/* KPI row */}
      <div className="kpis">
        <Kpi tint="lilac"
             label="Active shipments"
             value="1,284"
             trend="+8.2%" trendDir="up"
             spark={TREND_VOLUME}/>
        <Kpi tint="mint"
             label="On-time rate"
             value="92" unit="%"
             trend="+1.4 pp" trendDir="up"
             spark={TREND_ON_TIME}/>
        <Kpi tint="peach"
             label="Avg transit"
             value="2.9" unit="days"
             trend="−0.3 d" trendDir="down"
             spark={TREND_TRANSIT}
             sparkColor="var(--c-peach)"/>
        <Kpi tint="pink"
             label="Open exceptions"
             value="14"
             trend="−18%" trendDir="down"
             spark={TREND_EXC}
             sparkColor="var(--c-pink)"/>
      </div>

      {/* Stalled bubble chart — D4 hero widget */}
      <div className="row-2">
        <div className="card chart-card">
          <div className="card-hd">
            <h3>SLA achievement</h3>
            <span className="card-hd sub" style={{padding:0,margin:0}}>This week</span>
            <div className="right">
              <button className="icon-btn"><I.more/></button>
            </div>
          </div>
          <Donut onTime={SLA.onTime} delayed={SLA.delayed}/>
        </div>
        <div className="card chart-card">
          <div className="card-hd">
            <h3>Stalled shipments by stage</h3>
            <span className="card-hd sub" style={{padding:0,margin:0}}>62 shipments · $1.4M at risk</span>
            <div className="right">
              <div className="seg" style={{padding:2}}>
                <button className="on">Volume</button>
                <button>Cost</button>
              </div>
              <button className="icon-btn"><I.more/></button>
            </div>
          </div>
          <BubbleChart data={STALLED}/>
        </div>
      </div>

      {/* Lanes + activity */}
      <div className="row-2">
        <div className="card">
          <div className="card-hd">
            <h3>Top lanes by volume</h3>
            <span className="card-hd sub" style={{padding:0,margin:0}}>On-time vs total</span>
            <div className="right"><button className="btn btn-ghost">View all <I.arrow/></button></div>
          </div>
          <HBars rows={TOP_LANES}/>
        </div>
        <div className="card">
          <div className="card-hd">
            <h3>Activity</h3>
            <span className="card-hd sub" style={{padding:0,margin:0}}>Last 24 hours</span>
            <div className="right"><button className="icon-btn"><I.more/></button></div>
          </div>
          <div className="activity">
            {ACTIVITY.map((a,i) => (
              <div key={i} className="row">
                <div className={`act-dot t-${a.tint}`}>{a.who}</div>
                <div>
                  <div className="ttl">{a.ttl}</div>
                  <div className="sub">{a.sub}</div>
                </div>
                <div className="time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// ── Status (CSV import + table) ────────────────────────────────────
function StatusScreen({ t, dataset, setDataset }){
  const [csvText, setCsvText]   = uS(DATASETS[dataset].csv);
  const [fileName, setFileName] = uS(DATASETS[dataset].file);
  const [paste, setPaste]       = uS("");
  const [over, setOver]         = uS(false);
  const [search, setSearch]     = uS("");
  const [filter, setFilter]     = uS("all");
  const [sortBy, setSortBy]     = uS(null);
  const [sortDir, setSortDir]   = uS("asc");
  const fileRef = uR(null);

  // when dataset changes externally (tweaks panel), load it
  uE(() => {
    setCsvText(DATASETS[dataset].csv);
    setFileName(DATASETS[dataset].file);
    setPaste("");
    setFilter("all");
    setSortBy(null);
  }, [dataset]);

  const { headers, rows } = uM(() => parseCSV(csvText), [csvText]);

  // Status column detection (last column that looks status-ish)
  const statusKey = uM(() => {
    return headers.find(h => /status/i.test(h)) || headers.find(h => /stage/i.test(h)) || null;
  }, [headers]);

  // Summary buckets
  const buckets = uM(() => {
    if (!statusKey) return [];
    const counts = {};
    rows.forEach(r => { const v = r[statusKey] || "—"; counts[v] = (counts[v]||0) + 1; });
    return Object.entries(counts).map(([k,v]) => ({ name:k, n:v }));
  }, [rows, statusKey]);

  // Filter + sort
  const display = uM(() => {
    let out = rows;
    if (filter !== "all" && statusKey) out = out.filter(r => r[statusKey] === filter);
    if (search.trim()){
      const q = search.toLowerCase();
      out = out.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
    }
    if (sortBy){
      out = [...out].sort((a,b) => {
        const av = a[sortBy], bv = b[sortBy];
        const an = parseFloat(av), bn = parseFloat(bv);
        const cmp = (!isNaN(an) && !isNaN(bn)) ? (an - bn) : String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return out;
  }, [rows, filter, search, statusKey, sortBy, sortDir]);

  const onDrop = (e) => {
    e.preventDefault(); setOver(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { setCsvText(String(r.result)); setFileName(f.name); };
    r.readAsText(f);
  };
  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { setCsvText(String(r.result)); setFileName(f.name); };
    r.readAsText(f);
  };
  const usePaste = () => {
    if (!paste.trim()) return;
    // accept TSV from spreadsheets too
    const csv = paste.includes('\t') && !paste.includes(',')
      ? paste.split('\n').map(l => l.split('\t').map(c => /[,"]/.test(c) ? `"${c.replace(/"/g,'""')}"` : c).join(',')).join('\n')
      : paste;
    setCsvText(csv); setFileName("pasted.csv");
  };
  const sortClick = (h) => {
    if (sortBy === h){ setSortDir(d => d === "asc" ? "desc" : "asc"); }
    else { setSortBy(h); setSortDir("asc"); }
  };

  // Pill classifier
  const pillClass = (v) => {
    const s = String(v).toLowerCase();
    if (/on time|delivered|done|closed won|active|on route/.test(s)) return "s-ok";
    if (/in transit|in progress|negotiation/.test(s))                 return "s-transit";
    if (/at dock|review|proposal/.test(s))                             return "s-info";
    if (/delayed|warning|warn|maintenance/.test(s))                   return "s-warn";
    if (/exception|blocked|closed lost/.test(s))                       return "s-danger";
    if (/on hold|idle|discovery/.test(s))                              return "s-mute";
    return "s-iris";
  };

  const isProgressCol = (h) => /progress/i.test(h);
  const isFuelCol = (h) => /^fuel$/i.test(h);
  const isAmountCol = (h) => /^amount$/i.test(h);
  const isIdCol = (h, i) => i === 0 || /id$|^(ref|shipment|deal|ticket|vehicle|task)$/i.test(h);

  const fmtCell = (h, v, i) => {
    if (h === statusKey) return <span className={`pill ${pillClass(v)}`}><span className="pip"/>{v}</span>;
    if (/priority/i.test(h)) {
      const m = v.match(/p(\d)/i);
      const n = m ? m[1] : 4;
      return <span className={`mono prio p${n}`}>{v}</span>;
    }
    if (isProgressCol(h) || isFuelCol(h)) {
      const n = Math.max(0, Math.min(100, parseFloat(v) || 0));
      return <div className="progress"><span className="bar"><i style={{ width: n + "%" }}/></span><span className="pct">{n}%</span></div>;
    }
    if (isAmountCol(h)){
      const n = parseFloat(v) || 0;
      return <span className="mono">${n.toLocaleString()}</span>;
    }
    if (isIdCol(h, i)) return <span className="name mono">{v}</span>;
    if (/updated|opened/i.test(h)) return <span className="mono">{v}</span>;
    if (/^owner$|driver/i.test(h)) return <span><span className="avatar" style={{display:"inline-grid",width:22,height:22,fontSize:9,marginRight:8,verticalAlign:"middle"}}>{v.split(" ").map(w=>w[0]).slice(0,2).join("")}</span>{v}</span>;
    return v;
  };

  return (
    <React.Fragment>
      <div className="page-hd">
        <div>
          <div className="head-sm">Status · From spreadsheet</div>
          <h1>Live <i>status</i> board</h1>
          <p>Drop a CSV, paste from your spreadsheet, or pick a sample. We'll detect the status column and group everything for you.</p>
        </div>
        <div className="right">
          <button className="btn"><I.filter/> Filters</button>
          <button className="btn"><I.download/> Export</button>
          <button className="btn btn-primary"><I.upload/> Replace data</button>
        </div>
      </div>

      <div className="import-row">
        <div className={`drop ${over ? 'over' : ''}`}
             onDragOver={(e) => { e.preventDefault(); setOver(true); }}
             onDragLeave={() => setOver(false)}
             onDrop={onDrop}>
          <h4><I.upload/> Drop a CSV here</h4>
          <p>or pick one from disk. Loaded: <span className="mono" style={{color:"var(--ink-2)"}}>{fileName}</span> — <span className="num">{rows.length}</span> rows · <span className="num">{headers.length}</span> cols</p>
          <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={onFile} className="hide"/>
          <div className="actions">
            <button className="btn" onClick={() => fileRef.current?.click()}><I.upload/> Choose file</button>
            <button className="btn btn-ghost" onClick={() => { setCsvText(DATASETS[dataset].csv); setFileName(DATASETS[dataset].file); }}>Reset to sample</button>
          </div>
        </div>

        <div className="paste">
          <p className="head-sm" style={{margin:0}}>Paste from spreadsheet</p>
          <textarea
            placeholder={"Paste rows (CSV or tab-separated)…\nShipment\tStatus\tETA"}
            value={paste}
            onChange={(e) => setPaste(e.target.value)}/>
          <div style={{display:"flex",gap:8}}>
            <button className="btn btn-primary" onClick={usePaste} disabled={!paste.trim()}><I.upload/> Load paste</button>
            <button className="btn btn-ghost" onClick={() => setPaste("")}>Clear</button>
          </div>
        </div>

        <div className="samples">
          <p className="head-sm" style={{margin:0}}>Use a sample</p>
          {Object.entries(DATASETS).map(([k, ds], i) => {
            const tints = ["pink","mint","sky"];
            const tint = tints[i % tints.length];
            return (
              <div key={k} className={`opt ${dataset===k ? 'on':''}`} onClick={() => setDataset(k)}>
                <div className={`ico t-${tint}`}>{ds.file.match(/\.([a-z]+)$/i)?.[1].toUpperCase() || "CSV"}</div>
                <div>
                  <div className="ttl">{ds.name}</div>
                  <div className="sub">{ds.file}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary strip */}
      {buckets.length > 0 && (
        <div className="summary">
          <div className={`sum-cell ${filter==="all" ? 'active':''}`} onClick={() => setFilter("all")}>
            <div className="n num">{rows.length}<small>total</small></div>
            <div className="lab"><span className="pip" style={{background:"var(--ink-4)"}}/>All rows</div>
          </div>
          {buckets.slice(0, 4).map((b, i) => {
            const tints = ["var(--ok)","var(--c-sky)","var(--warn)","var(--danger)"];
            return (
              <div key={b.name} className={`sum-cell ${filter===b.name ? 'active':''}`} onClick={() => setFilter(b.name)}>
                <div className="n num">{b.n}<small>{Math.round(b.n/rows.length*100)}%</small></div>
                <div className="lab"><span className="pip" style={{background:tints[i % tints.length]}}/>{b.name}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table */}
      <div className="table-wrap">
        <div className="table-toolbar">
          <span style={{color:"var(--ink-2)",fontWeight:500}}>{display.length} of {rows.length} rows</span>
          {filter !== "all" && (
            <span className="chip active" onClick={() => setFilter("all")}>
              {statusKey}: {filter} ✕
            </span>
          )}
          <span style={{flex:1}}/>
          <span className="search" style={{minWidth:200,padding:"4px 10px"}}>
            <I.search/>
            <input placeholder="Search rows…" value={search} onChange={(e) => setSearch(e.target.value)}/>
          </span>
        </div>
        <div style={{maxHeight:520, overflow:"auto"}}>
          <table className="data">
            <thead>
              <tr>
                {headers.map(h => (
                  <th key={h} className={sortBy===h ? 'sorted':''} onClick={() => sortClick(h)}>
                    {h}<span className="sort-ico">{sortBy===h ? (sortDir==="asc"?'↑':'↓') : '↕'}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {display.map((r, i) => (
                <tr key={i}>
                  {headers.map((h, j) => (
                    <td key={h}>{fmtCell(h, r[h], j)}</td>
                  ))}
                </tr>
              ))}
              {!display.length && (
                <tr><td colSpan={headers.length} style={{textAlign:"center",padding:"40px 0",color:"var(--ink-4)"}}>No rows match the current filter</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Splash, HomeScreen, StatusScreen });
