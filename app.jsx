// Main App shell: sidebar nav + screen routing + tweaks panel.
const { useState: u_S, useEffect: u_E, useRef: u_R } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "density": "regular",
  "accent": "iris",
  "sidebar": "expanded",
  "dataset": "shipments"
}/*EDITMODE-END*/;

const ACCENTS = {
  iris:   { val:"oklch(0.62 0.18 295)", soft:"oklch(0.93 0.06 295)", name:"Iris" },
  mint:   { val:"oklch(0.62 0.12 155)", soft:"oklch(0.93 0.06 155)", name:"Mint" },
  peach:  { val:"oklch(0.72 0.14 55)",  soft:"oklch(0.94 0.06 55)",  name:"Peach" },
  sky:    { val:"oklch(0.62 0.13 230)", soft:"oklch(0.94 0.05 230)", name:"Sky" },
  rose:   { val:"oklch(0.66 0.16 15)",  soft:"oklch(0.94 0.05 15)",  name:"Rose" },
};

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = u_S("splash");
  const [hidden, setHidden] = u_S(false);

  // splash → home
  u_E(() => {
    if (screen !== "splash") return;
    const t1 = setTimeout(() => {
      document.getElementById("splash")?.classList.add("fade-out");
    }, 3000);
    const t2 = setTimeout(() => { setHidden(true); setScreen("home"); }, 3900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [screen]);

  // theme/density/accent → :root
  u_E(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t.theme || "light");
    root.setAttribute("data-density", t.density || "regular");
    const a = ACCENTS[t.accent] || ACCENTS.iris;
    root.style.setProperty("--accent", a.val);
    root.style.setProperty("--accent-soft", a.soft);
  }, [t.theme, t.density, t.accent]);

  const Sidebar = (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <a className="brand" href="#" onClick={(e)=>{e.preventDefault(); setScreen("home");}}>
          <div className="brand-mark">D</div>
          <div className="brand-name">Dash</div>
        </a>
        <div className="nav-group-label">Operations</div>
        <nav className="nav">
          <a className={screen==="home"?"active":""} onClick={() => setScreen("home")}>
            <I.dash/> <span>Overview</span><span className="nav-count">·</span>
          </a>
          <a className={screen==="status"?"active":""} onClick={() => setScreen("status")}>
            <I.ship/> <span>Status board</span><span className="nav-count">{DATASETS[t.dataset]?.csv.split('\n').length - 1 || 0}</span>
          </a>
          <a><I.fleet/> <span>Fleet</span><span className="nav-count">12</span></a>
          <a><I.warehouse/> <span>Warehouses</span><span className="nav-count">8</span></a>
          <a><I.lanes/> <span>Lanes</span><span className="nav-count">142</span></a>
          <a><I.exc/> <span>Exceptions</span><span className="nav-count">14</span></a>
        </nav>
        <div className="nav-group-label">Account</div>
        <nav className="nav">
          <a><I.carrier/> <span>Carriers</span></a>
          <a><I.report/> <span>Reports</span></a>
          <a><I.settings/> <span>Settings</span></a>
        </nav>
        <div className="sidebar-foot">
          <div className="avatar">MO</div>
          <div className="who">
            <div>Maya Okafor</div>
            <div className="role">Ops lead · Acme</div>
          </div>
        </div>
      </div>
    </aside>
  );

  const Topbar = (
    <div className="topbar">
      <button className="icon-btn" onClick={() => setTweak("sidebar", t.sidebar === "expanded" ? "collapsed" : "expanded")}>
        <I.collapse/>
      </button>
      <div className="crumbs">
        Dash <span style={{color:"var(--ink-4)"}}>/</span>
        <b style={{fontFamily:"var(--font-sans)",textTransform:"none",letterSpacing:0,fontSize:14}}>
          {screen === "home" ? "Overview" : "Status board"}
        </b>
      </div>
      <div className="spacer"/>
      <div className="search">
        <I.search/>
        <input placeholder={screen === "status" ? "Search rows…" : "Search shipments, lanes, carriers…"}/>
        <span className="kbd">⌘K</span>
      </div>
      <button className="icon-btn">
        <I.bell/>
        <span className="badge">3</span>
      </button>
      <button className="icon-btn"><I.help/></button>
      <button className="btn btn-primary"><I.sparkle/> Ask Dash</button>
    </div>
  );

  return (
    <React.Fragment>
      {screen === "splash" && <Splash onDone={() => { setScreen("home"); setHidden(true); }}/>}
      <div className={"app-mount" + (hidden ? "" : "")}>
        <div className="shell" data-sidebar={t.sidebar}>
          {Sidebar}
          <main className="main">
            {Topbar}
            <div className="content">
              {screen === "home"   && <HomeScreen t={t}/>}
              {screen === "status" && <StatusScreen t={t} dataset={t.dataset} setDataset={(v) => setTweak("dataset", v)}/>}
            </div>
          </main>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Theme"/>
        <TweakRadio  label="Mode" value={t.theme} options={["light","dark"]}
                     onChange={(v) => setTweak("theme", v)}/>
        <TweakRadio  label="Density" value={t.density} options={["compact","regular","comfy"]}
                     onChange={(v) => setTweak("density", v)}/>
        <TweakRadio  label="Sidebar" value={t.sidebar} options={["expanded","collapsed"]}
                     onChange={(v) => setTweak("sidebar", v)}/>
        <TweakSection label="Accent"/>
        <TweakColor  label="Color" value={ACCENTS[t.accent]?.val}
                     options={Object.values(ACCENTS).map(a => a.val)}
                     onChange={(v) => {
                       const key = Object.keys(ACCENTS).find(k => ACCENTS[k].val === v);
                       setTweak("accent", key || "iris");
                     }}/>
        <TweakSection label="Status data"/>
        <TweakSelect label="Sample" value={t.dataset}
                     options={Object.keys(DATASETS).map(k => ({ value:k, label:DATASETS[k].name }))}
                     onChange={(v) => { setTweak("dataset", v); setScreen("status"); }}/>
        <TweakButton
          label={`Go to ${screen === "home" ? "status board" : "overview"}`}
          onClick={() => setScreen(screen === "home" ? "status" : "home")}/>
        <TweakButton
          label="Replay splash"
          secondary
          onClick={() => { setScreen("splash"); setHidden(false); }}/>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
