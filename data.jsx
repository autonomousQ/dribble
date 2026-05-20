// Operations / logistics datasets.

const SAMPLE_SHIPMENTS = `Shipment,Origin,Destination,Carrier,Mode,Status,ETA,Progress,Updated
SHP-48201,Chicago IL,Dallas TX,Ridgeline Freight,Truck,In transit,2026-05-22,68,12m ago
SHP-48199,Long Beach CA,Phoenix AZ,Pacific Lanes,Truck,On time,2026-05-21,84,28m ago
SHP-48197,Newark NJ,Atlanta GA,Eastline Logistics,Truck,Delayed,2026-05-23,42,1h ago
SHP-48195,Seattle WA,Denver CO,Cascade Cargo,Rail,In transit,2026-05-25,55,2h ago
SHP-48193,Memphis TN,Miami FL,Southwind Freight,Truck,On time,2026-05-20,92,38m ago
SHP-48190,Kansas City MO,Houston TX,Heartland Haul,Truck,At dock,2026-05-19,12,4h ago
SHP-48188,Boston MA,Charlotte NC,Eastline Logistics,Truck,In transit,2026-05-22,71,1h ago
SHP-48186,Oakland CA,Las Vegas NV,Pacific Lanes,Truck,Exception,2026-05-24,30,3h ago
SHP-48183,Detroit MI,Pittsburgh PA,Great Lakes Co,Truck,Delivered,2026-05-18,100,1d ago
SHP-48180,Portland OR,Salt Lake City UT,Cascade Cargo,Truck,On time,2026-05-21,76,52m ago
SHP-48177,Minneapolis MN,St. Louis MO,Heartland Haul,Rail,In transit,2026-05-23,48,2h ago
SHP-48175,Tampa FL,Nashville TN,Southwind Freight,Truck,Delayed,2026-05-22,38,3h ago
SHP-48172,Baltimore MD,Cleveland OH,Eastline Logistics,Truck,On time,2026-05-20,88,1h ago
SHP-48170,San Antonio TX,Oklahoma City OK,Ridgeline Freight,Truck,At dock,2026-05-19,8,5h ago
SHP-48167,Indianapolis IN,Louisville KY,Great Lakes Co,Truck,Delivered,2026-05-17,100,2d ago
SHP-48164,Reno NV,Boise ID,Pacific Lanes,Truck,In transit,2026-05-24,62,4h ago
SHP-48160,Richmond VA,Raleigh NC,Eastline Logistics,Truck,On time,2026-05-21,80,1h ago
SHP-48157,Albuquerque NM,El Paso TX,Ridgeline Freight,Truck,Exception,2026-05-23,25,6h ago
SHP-48154,Sacramento CA,Reno NV,Cascade Cargo,Truck,On time,2026-05-20,95,18m ago
SHP-48150,Buffalo NY,Cincinnati OH,Great Lakes Co,Rail,In transit,2026-05-25,52,3h ago`;

const SAMPLE_FLEET = `Vehicle,Driver,Region,Type,Status,Fuel,Next service,Updated
TRK-104,Maria Alvarez,Southwest,Class 8,On route,72,2026-06-04,18m ago
TRK-088,Daniel Cho,Northeast,Class 8,On route,58,2026-06-12,42m ago
TRK-072,Priya Nair,Midwest,Reefer,At dock,84,2026-05-30,2h ago
TRK-061,Theo Park,West,Class 7,Idle,90,2026-06-18,1d ago
TRK-058,Jordan Reed,South,Class 8,Maintenance,40,2026-05-21,5h ago
TRK-052,Lin Chen,Pacific,Reefer,On route,66,2026-06-22,1h ago
TRK-049,Hana Mori,Mountain,Class 7,On route,52,2026-06-08,2h ago
TRK-044,Sasha Vidal,Northeast,Class 8,Idle,88,2026-07-02,1d ago
TRK-037,Ravi Shah,Southeast,Class 8,On route,61,2026-06-30,30m ago
TRK-029,Devon Cole,Central,Reefer,Maintenance,28,2026-05-25,8h ago
TRK-021,Amelie Roux,Mountain,Class 7,At dock,76,2026-07-15,4h ago
TRK-014,Maya Okafor,Pacific,Class 8,On route,69,2026-06-14,55m ago`;

const SAMPLE_EXCEPTIONS = `Ref,Shipment,Lane,Type,Severity,Owner,Status,Opened
EXC-2204,SHP-48197,NJ → GA,Customs hold,High,Eastline Ops,In progress,2h ago
EXC-2202,SHP-48186,CA → NV,Driver delay,Med,Pacific Ops,Review,3h ago
EXC-2199,SHP-48190,MO → TX,Dock congestion,Med,Heartland,On hold,4h ago
EXC-2196,SHP-48157,NM → TX,Damaged pallet,High,Ridgeline,In progress,6h ago
EXC-2191,SHP-48175,FL → TN,Weather reroute,Low,Southwind,Done,1d ago
EXC-2188,SHP-48177,MN → MO,Rail interchange,Med,Heartland,In progress,12h ago
EXC-2185,SHP-48170,TX → OK,Equipment fail,High,Ridgeline,Blocked,1d ago
EXC-2180,SHP-48160,VA → NC,Late pickup,Low,Eastline Ops,Done,2d ago
EXC-2176,SHP-48150,NY → OH,Rail delay,Med,Great Lakes,In progress,5h ago
EXC-2172,SHP-48193,TN → FL,Address change,Low,Southwind,Done,2d ago`;

const DATASETS = {
  shipments:  { name: "Shipments — last 7 days", file: "shipments-2026-05.csv", csv: SAMPLE_SHIPMENTS },
  fleet:      { name: "Fleet status",            file: "fleet-live.csv",        csv: SAMPLE_FLEET },
  exceptions: { name: "Open exceptions",         file: "exceptions-open.csv",   csv: SAMPLE_EXCEPTIONS },
};

// Bubble chart data — stalled shipments by stage (echoes D4).
const STALLED = [
  { stage: "Pickup",        items: [ {v:54, d:18}, {v:34, d:22} ] },
  { stage: "In transit",    items: [ {v:64, d:42}, {v:28, d:34}, {v:152, d:48} ] },
  { stage: "Customs",       items: [ {v:30, d:28}, {v:34, d:36} ] },
  { stage: "At dock",       items: [ {v:57, d:24}, {v:64, d:46} ] },
  { stage: "Out for del.",  items: [ {v:52, d:30}, {v:54, d:26} ] },
];

// Donut — SLA achieved (echoes D4 goal-achieved donut).
const SLA = { onTime: 71, delayed: 29 };

// Horizontal bars — top lanes (echoes D4 upcoming renewals bars).
const TOP_LANES = [
  { lane: "Chicago → Dallas",   on: 64, total: 100 },
  { lane: "Long Beach → Phx",   on: 58, total: 95  },
  { lane: "Newark → Atlanta",   on: 71, total: 92  },
  { lane: "Seattle → Denver",   on: 41, total: 80  },
  { lane: "Memphis → Miami",    on: 66, total: 78  },
  { lane: "Oakland → Vegas",    on: 32, total: 70  },
  { lane: "Boston → Charlotte", on: 49, total: 64  },
  { lane: "Portland → SLC",     on: 38, total: 60  },
];

// 7-day trend for sparklines
const TREND_VOLUME    = [142, 168, 154, 188, 176, 204, 198];
const TREND_ON_TIME   = [86, 88, 84, 89, 91, 87, 92];
const TREND_TRANSIT   = [3.4, 3.2, 3.3, 3.1, 3.0, 3.0, 2.9];
const TREND_EXC       = [22, 18, 25, 19, 21, 17, 14];

// Tiny CSV parser
function parseCSV(text){
  const lines = text.replace(/\r/g,'').split('\n').filter(l => l.trim().length);
  if (!lines.length) return { headers: [], rows: [] };
  const parseLine = (l) => {
    const out = []; let cur = ''; let q = false;
    for (let i = 0; i < l.length; i++){
      const c = l[i];
      if (q){
        if (c === '"' && l[i+1] === '"'){ cur += '"'; i++; }
        else if (c === '"') q = false;
        else cur += c;
      } else {
        if (c === ',') { out.push(cur); cur = ''; }
        else if (c === '"') q = true;
        else cur += c;
      }
    }
    out.push(cur);
    return out;
  };
  const headers = parseLine(lines[0]).map(h => h.trim());
  const rows = lines.slice(1).map(l => {
    const cells = parseLine(l);
    const r = {};
    headers.forEach((h,i) => r[h] = (cells[i] ?? '').trim());
    return r;
  });
  return { headers, rows };
}

Object.assign(window, {
  DATASETS, parseCSV,
  STALLED, SLA, TOP_LANES,
  TREND_VOLUME, TREND_ON_TIME, TREND_TRANSIT, TREND_EXC,
});
