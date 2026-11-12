import { useState } from "react"

type Role = "admin" | "usuario"
type View = "panel" | "registro" | "asignacion" | "custodia" | "detalle" | "usuarios" | "reportes" | "incidencias" | "avance" | "historial"
type Section = "Propiedad" | "Gravamen" | "Sentencias" | "Varios" | "Cancelaciones"

const sections: Section[] = [
  "Propiedad",
  "Gravamen",
  "Sentencias",
  "Varios",
  "Cancelaciones",
]
type Tome = { id: number; number: number; section: Section; records: number | null; recordStart: number | null; recordEnd: number | null; images: number; employee: string; assigned: string; status: string; custody: string }

const initialTomes: Tome[] = [
  {
    id: 1,
    number: 1340,
    section: "Gravamen",
    records: null,
    recordStart: null,
    recordEnd: null,
    images: 1100,
    employee: "Lucía Herrera",
    assigned: "20 Oct 2026",
    status: "En proceso",
    custody: "Entregado",
  },
  {
    id: 2,
    number: 32,
    section: "Propiedad",
    records: null,
    recordStart: null,
    recordEnd: null,
    images: 2450,
    employee: "Mateo Silva",
    assigned: "22 Oct 2026",
    status: "En proceso",
    custody: "Entregado",
  },
  {
    id: 3,
    number: 1230,
    section: "Sentencias",
    records: 12,
    recordStart: 11,
    recordEnd: 22,
    images: 860,
    employee: "Lucía Herrera",
    assigned: "18 Oct 2026",
    status: "Completado",
    custody: "Devuelto",
  },
  {
    id: 27,
    number: 40,
    section: "Varios",
    records: null,
    recordStart: null,
    recordEnd: null,
    images: 1740,
    employee: "Diego Morales",
    assigned: "25 Oct 2026",
    status: "Con incidencia",
    custody: "Entregado",
  },
  {
    id: 28,
    number: 1340,
    section: "Cancelaciones",
    records: null,
    recordStart: null,
    recordEnd: null,
    images: 0,
    employee: "Sin asignar",
    assigned: "—",
    status: "Pendiente",
    custody: "Disponible",
  },
]

const navAdmin = [
  ["panel", "Panel general", "grid"],
  ["registro", "Registro de tomos", "book"],
  ["asignacion", "Asignación", "book"],
  ["custodia", "Custodia", "archive"],
  ["incidencias", "Incidencias", "alert"],
  ["reportes", "Reportes", "chart"],
  ["usuarios", "Usuarios", "users"],
] as const
const navUser = [
  ["panel", "Mi panel", "grid"],
  ["asignacion", "Mis tomos", "book"],
  ["avance", "Registrar avance", "plus"],
  ["historial", "Mi historial", "clock"],
] as const

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),
    archive: (
      <>
        <path d="M3 6h18v15H3zM2 3h20v3H2z" />
        <path d="M9 10h6" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 16 4-5 4 3 5-7" />
      </>
    ),
    alert: (
      <>
        <path d="M10.3 2.9 1.8 17a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 2.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
        <path d="M4 19h16" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.grid}
    </svg>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  const tone = [
    "Completado",
    "Devuelto",
    "Disponible",
    "Activo",
    "Resuelta",
  ].includes(String(children))
    ? "green"
    : ["Con incidencia", "Abierta"].includes(String(children))
      ? "red"
      : ["Pendiente", "Pendiente de asignación"].includes(String(children))
        ? "gray"
        : "blue"
  return <span className={`badge ${tone}`}>{children}</span>
}
function Progress({ value }: { value: number }) {
  return (
    <div className="progress">
      <span style={{ width: `${value}%` }} />
    </div>
  )
}

function Header({ title, onMenu }: { title: string; onMenu: () => void }) {
  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenu} aria-label="Abrir menú">
        <span />
        <span />
        <span />
      </button>
      <img
        className="institution-logo"
        src="/ircm-logo.png"
        alt="Instituto Registral y Catastral del Estado de Michoacán"
      />
      <div className="system-title">
        <p>SISTEMA DE CONTROL DE DIGITALIZACIÓN</p>
        <h1>{title}</h1>
      </div>
      <div className="header-spacer" />
    </header>
  )
}

function Sidebar({
  role,
  view,
  setView,
  setRole,
  open,
  close,
}: {
  role: Role
  view: View
  setView: (v: View) => void
  setRole: (r: Role) => void
  open: boolean
  close: () => void
}) {
  const nav = role === "admin" ? navAdmin : navUser
  return (
    <>
      {open && (
        <button className="scrim" onClick={close} aria-label="Cerrar menú" />
      )}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <span />
            <span />
            <span />
          </div>
          <div>
            <strong>DigiTrack</strong>
            <small>Gestión documental</small>
          </div>
        </div>
        <nav>
          {nav.map(([id, label, icon]) => (
            <button
              key={id}
              className={view === id ? "active" : ""}
              onClick={() => {
                setView(id as View)
                close()
              }}
            >
              <Icon name={icon} />
              <span>{label}</span>
              {view === id && <i />}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="role-switch">
            <label>Vista de demostración</label>
            <div>
              <button
                className={role === "admin" ? "selected" : ""}
                onClick={() => {
                  setRole("admin")
                  setView("panel")
                }}
              >
                Administrador
              </button>
              <button
                className={role === "usuario" ? "selected" : ""}
                onClick={() => {
                  setRole("usuario")
                  setView("panel")
                }}
              >
                Usuario
              </button>
            </div>
          </div>
          <button className="logout">
            <Icon name="logout" />
            Cerrar sesión
          </button>
          <div className="profile">
            <div className="avatar">LM</div>
            <div>
              <strong>
                {role === "admin" ? "Laura Méndez" : "Lucía Herrera"}
              </strong>
              <small>
                {role === "admin"
                  ? "Administradora"
                  : "Usuario (Digitalizador)"}
              </small>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

function Filters({ query, setQuery, section, setSection }: { query: string; setQuery: (v:string)=>void; section: string; setSection: (v:string)=>void }) {
  return <div className="card filters tome-filters">
    <div className="search"><Icon name="search" /><input placeholder="Buscar por ID o número de tomo..." value={query} onChange={e=>setQuery(e.target.value)} /></div>
    <select value={section} onChange={e=>setSection(e.target.value)}><option value="">Todas las secciones</option>{sections.map(s=><option key={s}>{s}</option>)}</select>
  </div>
}

function TomeTable({ go, tomes, selectTome, employeeOnly=false }: { go:(v:View)=>void; tomes:Tome[]; selectTome:(id:number)=>void; employeeOnly?:boolean }) {
  const rows = employeeOnly ? tomes.filter(t=>t.employee === "Lucía Herrera") : tomes
  return <section className="card table-card books-table"><div className="table-meta"><b>{rows.length} tomos en control</b><span>Datos de demostración</span></div>
    <div style={{overflowX:"auto"}}><table className="tome-table"><thead><tr><th>ID único</th><th>Número de tomo</th><th>Sección</th><th>Total de registros</th><th>Rango de registros</th><th>Imágenes digitalizadas</th><th>Empleado asignado</th><th>Digitalización</th><th>Custodia</th><th>Acciones</th></tr></thead>
    <tbody>{rows.map(t=><tr key={t.id}><td><b>{t.id}</b></td><td><b>{t.number}</b></td><td>{t.section}</td><td>{t.records ?? "Pendiente"}</td><td>{t.recordStart!==null&&t.recordEnd!==null?`${t.recordStart}–${t.recordEnd}`:"Pendiente"}</td><td>{t.images.toLocaleString("es-MX")}</td><td>{t.employee}</td><td><Badge>{t.status}</Badge></td><td><Badge>{t.custody}</Badge></td><td><div className="table-actions"><button onClick={()=>{selectTome(t.id);go("detalle")}}>Ver detalle</button>{employeeOnly && t.status!=="Completado" && <button onClick={()=>{selectTome(t.id);go("avance")}}>Registrar avance</button>}</div></td></tr>)}</tbody></table></div></section>
}

function AdminDashboard({ go, tomes, selectTome }: { go:(v:View)=>void; tomes:Tome[]; selectTome:(id:number)=>void }) {
 const [query,setQuery]=useState("")
 const [filterSection,setFilterSection]=useState("")
 const rows=tomes.filter(t=>(!filterSection||t.section===filterSection)&&(!query||String(t.id).includes(query)||String(t.number).includes(query)))
 return <div className="page"><div className="page-lead"><div><p>Control documental</p><h2>Panel general</h2><span>Consulta el estado operativo de todos los tomos registrados.</span></div></div>
 <Filters query={query} setQuery={setQuery} section={filterSection} setSection={setFilterSection}/>
 <TomeTable go={go} tomes={rows} selectTome={selectTome}/>
 </div>
}

function TomeRegistrationPage({tomes,onCreate}:{tomes:Tome[];onCreate:(number:number,section:Section)=>void}) {
 const [number,setNumber]=useState("")
 const [section,setSection]=useState<Section>("Propiedad")
 const [message,setMessage]=useState("")
 const [error,setError]=useState("")
 const submit=(e:React.FormEvent)=>{
   e.preventDefault()
   const value=Number(number)
   if(!Number.isSafeInteger(value)||value<=0){setError("Introduce un número de tomo válido.");return}
   if(tomes.some(t=>t.number===value&&t.section===section)){
     setError("Ya existe un tomo con ese número y sección. Revisa el listado antes de registrarlo.")
     return
   }
   onCreate(value,section)
   setNumber("")
   setError("")
   setMessage(`Tomo ${value} registrado correctamente en ${section}.`)
 }
 return <div className="page">
   <div className="page-lead"><div><p>Administración</p><h2>Registro de tomos</h2><span>Da de alta los tomos físicos antes de asignarlos a un digitalizador.</span></div></div>
   {message&&<div className="success"><b>{message}</b><button onClick={()=>setMessage("")} aria-label="Cerrar mensaje">×</button></div>}
   {error&&<div className="card" style={{padding:16,color:"#b91c1c"}} role="alert">{error}</div>}
   <form className="card progress-form assignment-form" onSubmit={submit}>
     <div className="form-section"><span className="step">1</span><div><h3>Nuevo tomo</h3><p>El ID único se generará automáticamente al guardar.</p></div></div>
     <div className="form-grid three">
       <label>Número de tomo<input type="number" min="1" step="1" required value={number} onChange={e=>setNumber(e.target.value)} placeholder="Ej. 1340"/></label>
       <label>Sección documental<select value={section} onChange={e=>setSection(e.target.value as Section)}>{sections.map(s=><option key={s}>{s}</option>)}</select></label>
       <label>ID único<input readOnly value="Automático al guardar"/></label>
     </div>
     <p>El total de registros todavía no se conoce. El digitalizador lo indicará cuando finalice el tomo.</p>
     <div className="form-actions"><span>Registrar un tomo no lo asigna ni registra su entrega física.</span><button className="primary large" type="submit">Registrar tomo</button></div>
   </form>
   <section className="card table-card recent-table"><div className="card-head"><div><h3>Tomos registrados</h3><p>Inventario de tomos disponibles y asignados</p></div></div>
   <div style={{overflowX:"auto"}}><table><thead><tr><th>ID único</th><th>Número de tomo</th><th>Sección</th><th>Total de registros</th><th>Empleado asignado</th><th>Estado</th></tr></thead><tbody>
   {[...tomes].reverse().map(t=><tr key={t.id}><td><b>{t.id}</b></td><td>{t.number}</td><td>{t.section}</td><td>{t.records??"Pendiente"}</td><td>{t.employee}</td><td><Badge>{t.status}</Badge></td></tr>)}
   </tbody></table></div></section>
 </div>
}

function AssignmentPage({tomes,onAssign}:{tomes:Tome[];onAssign:(id:number,employee:string,date:string,note:string)=>void}) {
 const available=tomes.filter(t=>t.employee==="Sin asignar" && t.status!=="Completado")
 const [selected,setSelected]=useState(""),[employee,setEmployee]=useState("Lucía Herrera"),[date,setDate]=useState("2026-11-06"),[note,setNote]=useState(""),[saved,setSaved]=useState(false)
 const tome=available.find(t=>t.id===Number(selected))
 return <div className="page"><div className="page-lead"><div><p>Administración</p><h2>Asignación de tomos</h2><span>Asigna tomos registrados sin modificar su estado de custodia física.</span></div></div>
 {saved&&<div className="success"><b>Tomo asignado correctamente</b><button onClick={()=>setSaved(false)}>×</button></div>}
 <form className="card progress-form assignment-form" onSubmit={e=>{e.preventDefault();if(!tome)return;onAssign(tome.id,employee,date,note);setSelected("");setSaved(true)}}><div className="form-section"><span className="step">1</span><div><h3>Nueva asignación</h3><p>Solo se muestran tomos sin asignación activa.</p></div></div>
 <div className="form-grid three"><label>Seleccionar tomo disponible<select required value={selected} onChange={e=>setSelected(e.target.value)}><option value="">Selecciona un tomo</option>{available.map(t=><option value={t.id} key={t.id}>{t.number} — {t.section}</option>)}</select></label><label>ID único<input readOnly value={tome?.id??""}/></label><label>Sección<input readOnly value={tome?.section??""}/></label><label>Empleado responsable<select value={employee} onChange={e=>setEmployee(e.target.value)}>{["Lucía Herrera","Mateo Silva","Diego Morales"].map(n=><option key={n}>{n}</option>)}</select></label><label>Fecha de asignación<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><label>Observaciones opcionales<input value={note} onChange={e=>setNote(e.target.value)} placeholder="Indicaciones para el digitalizador"/></label></div><div className="form-actions"><span>La entrega física se registra desde Custodia.</span><button className="primary large" type="submit" disabled={!tome}>Asignar tomo</button></div></form>
 <section className="card table-card recent-table"><div className="card-head"><div><h3>Asignaciones actuales</h3><p>Tomos con empleado responsable</p></div></div><div style={{overflowX:"auto"}}><table><thead><tr><th>ID único</th><th>Número</th><th>Sección</th><th>Empleado</th><th>Fecha</th></tr></thead><tbody>{tomes.filter(t=>t.employee!=="Sin asignar").map(t=><tr key={t.id}><td>{t.id}</td><td>{t.number}</td><td>{t.section}</td><td>{t.employee}</td><td>{t.assigned}</td></tr>)}</tbody></table></div></section>
 </div>
}

function CustodyPage({tomes,onCustody}:{tomes:Tome[];onCustody:(id:number,mode:"entrega"|"devolucion")=>void}) {
 const [mode,setMode]=useState<"entrega"|"devolucion">("entrega"),[selected,setSelected]=useState(""),[message,setMessage]=useState("")
 const eligible=tomes.filter(t=>mode==="entrega"?t.custody!=="Entregado"&&t.employee!=="Sin asignar":t.custody==="Entregado")
 const chosen=eligible.find(t=>t.id===Number(selected))
 return <div className="page"><div className="page-lead"><div><p>Control físico</p><h2>Custodia</h2><span>Registra la entrega y devolución física de los tomos.</span></div><div className="segmented"><button className={mode==="entrega"?"selected":""} onClick={()=>{setMode("entrega");setSelected("")}}>Registrar entrega</button><button className={mode==="devolucion"?"selected":""} onClick={()=>{setMode("devolucion");setSelected("")}}>Registrar devolución</button></div></div>
 {message&&<div className="success"><b>{message}</b><button onClick={()=>setMessage("")}>×</button></div>}

 <form className="card progress-form custody-form" onSubmit={e=>{e.preventDefault();if(!chosen)return;onCustody(chosen.id,mode);setSelected("");setMessage(mode==="entrega"?"Entrega registrada (demo)":"Devolución registrada (demo)")}}><div className="form-section"><span className="step"><Icon name="archive" size={15}/></span><div><h3>{mode==="entrega"?"Registrar entrega física":"Registrar devolución física"}</h3><p>La custodia es independiente del avance de digitalización.</p></div></div><div className="form-grid three"><label>Tomo<select value={selected} required onChange={e=>setSelected(e.target.value)}><option value="">Selecciona un tomo</option>{eligible.map(t=><option value={t.id} key={t.id}>{t.number} — {t.section}</option>)}</select></label><label>ID único<input readOnly value={chosen?.id??""}/></label><label>Empleado responsable<input readOnly value={chosen?.employee??""}/></label><label>Administrador<input readOnly value="Laura Méndez"/></label></div><div className="form-actions"><button className="primary large" type="submit" disabled={!chosen}>{mode==="entrega"?"Confirmar entrega":"Confirmar devolución"}</button></div></form>
 <section className="card table-card recent-table"><div className="card-head"><div><h3>Estado actual de custodia</h3><p>Datos de demostración; historial detallado pendiente de backend</p></div></div><div style={{overflowX:"auto"}}><table><thead><tr><th>ID único</th><th>Número</th><th>Empleado</th><th>Estado</th></tr></thead><tbody>{tomes.map(t=><tr key={t.id}><td>{t.id}</td><td>{t.number}</td><td>{t.employee}</td><td><Badge>{t.custody}</Badge></td></tr>)}</tbody></table></div></section>
 </div>
}

function UserDashboard({go,tomes,selectTome}:{go:(v:View)=>void;tomes:Tome[];selectTome:(id:number)=>void}) {
 const [tab,setTab]=useState<"activos"|"historial">("activos")
 const mine=tomes.filter(t=>t.employee==="Lucía Herrera")
 const rows=mine.filter(t=>tab==="historial"?t.status==="Completado":t.status!=="Completado")
 return <div className="page"><div className="page-lead"><div><p>Área de digitalización</p><h2>Mis tomos</h2><span>Consulta únicamente los tomos que tienes asignados.</span></div><div className="segmented"><button className={tab==="activos"?"selected":""} onClick={()=>setTab("activos")}>Tomos activos</button><button className={tab==="historial"?"selected":""} onClick={()=>setTab("historial")}>Historial</button></div></div>
 <section className="card table-card books-table"><div className="table-meta"><b>{rows.length} tomos {tab==="activos"?"activos":"finalizados"}</b><span>Lucía Herrera</span></div><div style={{overflowX:"auto"}}><table><thead><tr><th>ID único</th><th>Número de tomo</th><th>Sección</th><th>Total de registros</th><th>Imágenes acumuladas</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{rows.map(t=><tr key={t.id}><td>{t.id}</td><td>{t.number}</td><td>{t.section}</td><td>{t.records??"Pendiente"}</td><td>{t.images.toLocaleString("es-MX")}</td><td><Badge>{t.status}</Badge></td><td><div className="table-actions">{tab==="activos"&&<button onClick={()=>{selectTome(t.id);go("avance")}}>Registrar avance</button>}<button onClick={()=>{selectTome(t.id);go("detalle")}}>Ver detalle</button></div></td></tr>)}</tbody></table></div></section>
 </div>
}

function TomeDetail({go,tome,selectTome}:{go:(v:View)=>void;tome:Tome;selectTome:(id:number)=>void}) {
 return <div className="page"><button className="back" onClick={()=>go("panel")}>‹ Volver al control de tomos</button><div className="page-lead"><div><p>ID ÚNICO {tome.id}</p><h2>Detalle del tomo {tome.number}</h2><span>Sección: {tome.section} · Responsable: {tome.employee}</span></div>{tome.status!=="Completado"&&tome.employee!=="Sin asignar"&&<button className="primary" onClick={()=>{selectTome(tome.id);go("avance")}}>Registrar avance</button>}</div><section className="detail-hero card"><div><span className="book-icon"><Icon name="book" size={28}/></span><div><Badge>{tome.status}</Badge><h3>{tome.records===null?"Total de registros pendiente":`${tome.records} registros reportados · Del ${tome.recordStart ?? "?"} al ${tome.recordEnd ?? "?"}`}</h3><p>{tome.images.toLocaleString("es-MX")} imágenes digitalizadas acumuladas</p></div></div><div className="detail-stats"><div><small>Custodia</small><b>{tome.custody}</b></div><div><small>Asignación</small><b>{tome.assigned}</b></div></div></section></div>
}

type Advance = {id:number;date:string;images:number;note:string}
type IncidentStatus = "Abierta" | "En revisión" | "Resuelta"
type Incident = { id:number; tomeId:number; employee:string; type:string; recordNumber:string; description:string; date:string; status:IncidentStatus }
const incidentTypes = ["Documento ilegible", "Hojas faltantes", "Daño físico", "Problema de digitalización", "Otro"]
function ProgressForm({tome,advances,onAdd,onEdit,onFinish,incidents,onReport,go}:{tome:Tome;advances:Advance[];onAdd:(id:number,entry:Advance)=>void;onEdit:(id:number,entry:Advance)=>void;onFinish:(id:number,records:number,start:number,end:number)=>void;incidents:Incident[];onReport:(incident:Incident)=>void;go:(v:View)=>void}) {
 const [date,setDate]=useState("2026-11-06"),[images,setImages]=useState(""),[note,setNote]=useState(""),[editing,setEditing]=useState<Advance|null>(null),[finish,setFinish]=useState(false),[records,setRecords]=useState(""),[recordStart,setRecordStart]=useState(""),[recordEnd,setRecordEnd]=useState(""),[showIncident,setShowIncident]=useState(false),[incidentType,setIncidentType]=useState(incidentTypes[0]),[incidentRecord,setIncidentRecord]=useState(""),[incidentDescription,setIncidentDescription]=useState(""),[message,setMessage]=useState("")
 const [completed,setCompleted]=useState(tome.status==="Completado")
 const displayTotal=tome.images
 const register=(e:React.FormEvent)=>{e.preventDefault();const n=Number(images);if(!date||!Number.isSafeInteger(n)||n<=0||completed)return;onAdd(tome.id,{id:Date.now(),date,images:n,note});setImages("");setNote("");setMessage("Avance registrado correctamente")}
 const saveEdit=()=>{if(!editing||!editing.date||!Number.isSafeInteger(editing.images)||editing.images<=0)return;onEdit(tome.id,editing);setEditing(null);setMessage("Avance actualizado")}
 return <div className="page form-page wide-form"><button className="back" onClick={()=>go("asignacion")}>‹ Volver a Mis tomos</button><div className="page-lead"><div><p>ID ÚNICO {tome.id}</p><h2>Registrar avance · Tomo {tome.number}</h2><span>{tome.section} · {tome.employee} · <Badge>{completed?"Completado":tome.status}</Badge></span></div>{!completed&&<button className="finish-button" onClick={()=>setFinish(true)}>Finalizar tomo</button>}</div>
 {message&&<div className="success"><b>{message}</b><button onClick={()=>setMessage("")}>×</button></div>}
 {!completed&&<div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}><button className="secondary" onClick={()=>setShowIncident(true)}><Icon name="alert" /> Reportar incidencia</button></div>}
 <div className="advance-layout"><form className="card progress-form compact-capture" onSubmit={register}><div className="form-section"><span className="step">1</span><div><h3>Nuevo avance diario</h3><p>Registra las imágenes trabajadas este día.</p></div></div><label>Fecha del avance<input type="date" value={date} onChange={e=>setDate(e.target.value)} disabled={completed}/></label><label>Cantidad de imágenes digitalizadas<input type="number" min="1" step="1" required value={images} onChange={e=>setImages(e.target.value)} placeholder="Ej. 450" disabled={completed}/></label><label>Observaciones opcionales<textarea rows={3} value={note} onChange={e=>setNote(e.target.value)} disabled={completed}/></label><button className="primary large" type="submit" disabled={completed}>Registrar avance</button></form><section className="card accumulated"><small>TOTAL ACUMULADO DEL TOMO</small><strong>{displayTotal.toLocaleString("es-MX")}</strong><span>imágenes digitalizadas</span><div><b>{advances.length}</b><small>avances registrados en la demo</small></div><p>El número total de registros se solicita al finalizar el tomo.</p></section></div>
 <section className="card table-card recent-table"><div className="card-head"><div><h3>Historial de avances</h3><p>Fecha, imágenes del día y observaciones. Los avances iniciales son datos de ejemplo.</p></div></div><div style={{overflowX:"auto"}}><table><thead><tr><th>Fecha</th><th>Imágenes del día</th><th>Observaciones</th><th>Acciones</th></tr></thead><tbody>{advances.map(a=><tr key={a.id}><td>{a.date}</td><td><b>{a.images.toLocaleString("es-MX")}</b></td><td>{a.note||"—"}</td><td><button className="table-link" disabled={completed} onClick={()=>setEditing({...a})}>Editar</button></td></tr>)}</tbody></table></div></section>
 <section className="card table-card recent-table"><div className="card-head"><div><h3>Incidencias de este tomo</h3><p>Problemas reportados durante la digitalización.</p></div></div><div style={{overflowX:"auto"}}><table><thead><tr><th>Fecha</th><th>Tipo</th><th>Registro</th><th>Descripción</th><th>Estado</th></tr></thead><tbody>{incidents.filter(i=>i.tomeId===tome.id).length===0?<tr><td colSpan={5}>Todavía no hay incidencias reportadas.</td></tr>:incidents.filter(i=>i.tomeId===tome.id).map(i=><tr key={i.id}><td>{i.date}</td><td>{i.type}</td><td>{i.recordNumber||"—"}</td><td>{i.description}</td><td><Badge>{i.status}</Badge></td></tr>)}</tbody></table></div></section>
 {showIncident&&<div className="modal-backdrop"><section className="card assign-modal"><div className="modal-head"><div><p>TOMO {tome.number} · {tome.section}</p><h3>Reportar incidencia</h3><span>Se asociará automáticamente al tomo y al digitalizador.</span></div><button onClick={()=>setShowIncident(false)}>×</button></div><label>Tipo de incidencia<select value={incidentType} onChange={e=>setIncidentType(e.target.value)}>{incidentTypes.map(t=><option key={t}>{t}</option>)}</select></label><label>Número de registro (opcional)<input type="text" value={incidentRecord} onChange={e=>setIncidentRecord(e.target.value)} placeholder="Ej. 19" /></label><label>Descripción del problema<textarea rows={4} required value={incidentDescription} onChange={e=>setIncidentDescription(e.target.value)} placeholder="Describe qué sucedió..." /></label><div className="modal-actions"><button className="secondary" onClick={()=>setShowIncident(false)}>Cancelar</button><button className="primary" disabled={!incidentDescription.trim()} onClick={()=>{if(!incidentDescription.trim())return;onReport({id:Date.now(),tomeId:tome.id,employee:tome.employee,type:incidentType,recordNumber:incidentRecord.trim(),description:incidentDescription.trim(),date:new Date().toLocaleDateString("es-MX"),status:"Abierta"});setIncidentDescription("");setIncidentRecord("");setShowIncident(false);setMessage("Incidencia reportada correctamente")}}>Guardar incidencia</button></div></section></div>}
 {editing&&<div className="modal-backdrop"><section className="card assign-modal"><div className="modal-head"><div><h3>Editar avance</h3></div><button onClick={()=>setEditing(null)}>×</button></div><div className="form-grid"><label>Fecha<input type="date" value={editing.date} onChange={e=>setEditing({...editing,date:e.target.value})}/></label><label>Imágenes<input type="number" min="1" step="1" value={editing.images} onChange={e=>setEditing({...editing,images:Number(e.target.value)})}/></label></div><label>Observaciones<textarea rows={3} value={editing.note} onChange={e=>setEditing({...editing,note:e.target.value})}/></label><div className="modal-actions"><button className="secondary" onClick={()=>setEditing(null)}>Cancelar</button><button className="primary" onClick={saveEdit}>Guardar cambios</button></div></section></div>}
 {finish&&<div className="modal-backdrop"><section className="card assign-modal finish-modal"><div className="modal-head"><div><p>CONFIRMACIÓN FINAL</p><h3>Finalizar tomo</h3></div><button onClick={()=>setFinish(false)}>×</button></div><div className="finish-summary"><div><small>ID único</small><b>{tome.id}</b></div><div><small>Número de tomo</small><b>{tome.number}</b></div><div><small>Sección</small><b>{tome.section}</b></div><div><small>Imágenes acumuladas</small><b>{displayTotal.toLocaleString("es-MX")}</b></div></div><div className="form-grid"><label>Primer número de registro<input type="number" min="1" step="1" required value={recordStart} onChange={e=>setRecordStart(e.target.value)} placeholder="Ej. 1" /></label><label>Último número de registro<input type="number" min="1" step="1" required value={recordEnd} onChange={e=>setRecordEnd(e.target.value)} placeholder="Ej. 20" /></label></div><label>Total de registros del tomo<input type="number" min="1" step="1" required value={records} onChange={e=>setRecords(e.target.value)} placeholder="Ej. 20" /></label><p>Indica el primer y último número, además del total real. Los números pueden no ser consecutivos, por eso el total se captura por separado.</p><p>El total de registros se captura al terminar. Una vez finalizado, el tomo pasará al historial y sus avances quedarán en solo lectura.</p><div className="modal-actions"><button className="secondary" onClick={()=>setFinish(false)}>Cancelar</button><button className="primary" disabled={![records,recordStart,recordEnd].every(v=>v.trim()!==""&&Number.isSafeInteger(Number(v))&&Number(v)>0)||Number(recordEnd)<Number(recordStart)} onClick={()=>{onFinish(tome.id,Number(records),Number(recordStart),Number(recordEnd));setCompleted(true);setFinish(false);setMessage("Tomo finalizado correctamente")}}>Confirmar finalización</button></div></section></div>}
 </div>
}

function BarChart() {
  const data = [52, 68, 61, 82, 74, 90, 78]
  return (
    <div className="bar-chart">
      <div className="axis">
        <span>1,500</span>
        <span>1,000</span>
        <span>500</span>
        <span>0</span>
      </div>
      <div className="bars">
        {data.map((v, i) => (
          <div key={i}>
            <span style={{ height: `${v}%` }} />
            <small>
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Hoy"][i]}
            </small>
          </div>
        ))}
      </div>
    </div>
  )
}
function Kpi({
  label,
  value,
  note,
  icon,
  tone = "blue",
}: {
  label: string
  value: string
  note: string
  icon: string
  tone?: string
}) {
  return (
    <div className="card kpi">
      <div className={`kpi-icon ${tone}`}>
        <Icon name={icon} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </div>
  )
}

function ReportsPage() {
  return (
    <div className="page">
      <div className="page-lead">
        <div>
          <p>RESUMEN OPERATIVO</p>
          <h2>Buenos días, Laura</h2>
          <span>
            Supervisa el avance del proyecto y la productividad del equipo.
          </span>
        </div>
        <button className="primary">
          <Icon name="download" />
          Exportar a Excel
        </button>
      </div>
      <section className="hero-progress">
        <div>
          <small>PROGRESO GENERAL DEL PROYECTO</small>
          <strong>45.2%</strong>
          <p>3,842,650 de 8,500,000 imágenes estimadas digitalizadas</p>
          <Progress value={45.2} />
          <span>Meta configurable de planificación institucional</span>
        </div>
        <div className="ring">
          <svg viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="16" />
            <circle
              className="fill"
              cx="21"
              cy="21"
              r="16"
              pathLength="100"
              strokeDasharray="45.2 100"
            />
          </svg>
          <div>
            <b>45.2%</b>
            <small>completado</small>
          </div>
        </div>
      </section>
      <div className="card report-filters">
        <label>
          Fecha inicial
          <input type="date" defaultValue="2026-10-01" />
        </label>
        <label>
          Fecha final
          <input type="date" defaultValue="2026-11-05" />
        </label>
        <label>
          Empleado
          <select>
            <option>Todos</option>
          </select>
        </label>
        <label>
          Sección
          <select>
            <option>Todas</option>
            {sections.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Estado
          <select>
            <option>Todos</option>
          </select>
        </label>
        <button className="secondary">Aplicar filtros</button>
      </div>
      <div className="kpi-grid report-kpis">
        <Kpi
          label="Tomos registrados"
          value="248"
          note="84 asignados"
          icon="book"
        />
        <Kpi
          label="Tomos en proceso"
          value="63"
          note="26% del total"
          icon="clock"
          tone="amber"
        />
        <Kpi
          label="Tomos completados"
          value="126"
          note="50.8% del total"
          icon="chart"
          tone="green"
        />
        <Kpi
          label="Registros documentales"
          value="32,840"
          note="Cinco secciones"
          icon="grid"
        />
        <Kpi
          label="Imágenes digitalizadas"
          value="3,842,650"
          note="Meta: 8.5 millones"
          icon="chart"
          tone="green"
        />
        <Kpi
          label="Pendientes de devolución"
          value="18"
          note="Tomos en custodia"
          icon="archive"
          tone="amber"
        />
        <Kpi
          label="Tiempo promedio"
          value="6.4 días"
          note="Por tomo completado"
          icon="clock"
        />
        <Kpi
          label="Incidencias"
          value="7"
          note="3 requieren atención"
          icon="alert"
          tone="red"
        />
      </div>
      <div className="dashboard-grid">
        <section className="card chart-card">
          <div className="card-head">
            <div>
              <h3>Productividad diaria por empleado</h3>
              <p>Imágenes digitalizadas durante el periodo</p>
            </div>
            <select>
              <option>Semanal</option>
              <option>Mensual</option>
            </select>
          </div>
          <BarChart />
        </section>
        <section className="card completion">
          <div className="card-head">
            <div>
              <h3>Registros por sección</h3>
              <p>Distribución documental</p>
            </div>
          </div>
          <div className="donut">
            <div />
            <strong>
              32.8k<small>registros</small>
            </strong>
          </div>
          <ul>
            {sections.map((s, i) => (
              <li key={s}>
                <i
                  className={`dot ${["green", "blue", "amber", "gray", "blue"][i]}`}
                />
                {s}
                <b>
                  {[12480, 7620, 5240, 4180, 3320][i].toLocaleString("es-MX")}
                </b>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function GenericPage({ type, incidents = [], onStatusChange }: { type: View; incidents?: Incident[]; onStatusChange?:(id:number,status:IncidentStatus)=>void }) {
  if (type === "usuarios")
    return (
      <div className="page">
        <div className="page-lead">
          <div>
            <p>Administración</p>
            <h2>Usuarios</h2>
            <span>Alta, edición y control de acceso de empleados.</span>
          </div>
          <button className="primary">
            <Icon name="plus" />
            Agregar usuario
          </button>
        </div>
        <section className="card table-card">
          <table>
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Tomos asignados</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Lucía Herrera",
                  "lucia.herrera@ircm.gob.mx",
                  "Usuario (Digitalizador)",
                  "2",
                ],
                [
                  "Mateo Silva",
                  "mateo.silva@ircm.gob.mx",
                  "Usuario (Digitalizador)",
                  "1",
                ],
                [
                  "Laura Méndez",
                  "laura.mendez@ircm.gob.mx",
                  "Administrador",
                  "0",
                ],
                [
                  "Diego Morales",
                  "diego.morales@ircm.gob.mx",
                  "Usuario (Digitalizador)",
                  "1",
                ],
              ].map((x) => (
                <tr key={x[1]}>
                  <td>
                    <b>{x[0]}</b>
                  </td>
                  <td>{x[1]}</td>
                  <td>{x[2]}</td>
                  <td>{x[3]}</td>
                  <td>
                    <Badge>Activo</Badge>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button>Editar</button>
                      <button>Desactivar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    )
  if (type === "incidencias")
    return <div className="page"><div className="page-lead"><div><p>Control de calidad</p><h2>Incidencias</h2><span>Reportes enviados por los digitalizadores. Puedes actualizar su estado.</span></div></div><section className="card table-card"><div style={{overflowX:"auto"}}><table><thead><tr><th>ID único del tomo</th><th>Registro</th><th>Empleado</th><th>Tipo</th><th>Descripción</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>{incidents.length===0?<tr><td colSpan={7}>No hay incidencias registradas.</td></tr>:incidents.map(i=><tr key={i.id}><td><b>{i.tomeId}</b></td><td>{i.recordNumber||"—"}</td><td>{i.employee}</td><td>{i.type}</td><td>{i.description}</td><td>{i.date}</td><td><select aria-label={`Estado de incidencia ${i.id}`} value={i.status} onChange={e=>onStatusChange?.(i.id,e.target.value as IncidentStatus)}><option>Abierta</option><option>En revisión</option><option>Resuelta</option></select></td></tr>)}</tbody></table></div></section></div>
  return (
    <div className="page">
      <div className="page-lead">
        <div>
          <p>Productividad personal</p>
          <h2>Mi historial</h2>
          <span>Consulta tus avances diarios por tomo.</span>
        </div>
      </div>
      <section className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tomo</th>
              <th>Sección</th>
              <th>Imágenes del día</th>
              <th>Acumulado</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "05 Nov 2026",
                "1340",
                "Gravamen",
                "500",
                "5,360",
                "En proceso",
              ],
              [
                "05 Nov 2026",
                "1230",
                "Sentencias",
                "700",
                "3,680",
                "Completado",
              ],
              [
                "04 Nov 2026",
                "1340",
                "Gravamen",
                "420",
                "4,860",
                "En proceso",
              ],
            ].map((x) => (
              <tr key={x.join()}>
                {x.map((v, i) => (
                  <td key={i}>{i === 5 ? <Badge>{v}</Badge> : v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default function App() {
 const [role,setRole]=useState<Role>("admin"),[view,setView]=useState<View>("panel"),[menu,setMenu]=useState(false)
 const [tomes,setTomes]=useState<Tome[]>(initialTomes),[selectedId,setSelectedId]=useState(1)
 const selectedTome=tomes.find(t=>t.id===selectedId)??tomes[0]
 const [demoAdvances,setDemoAdvances]=useState<Record<number,Advance[]>>({})
 const [incidents,setIncidents]=useState<Incident[]>([])
 const reportIncident=(incident:Incident)=>setIncidents(prev=>[...prev,incident])
 const changeIncidentStatus=(id:number,status:IncidentStatus)=>setIncidents(prev=>prev.map(i=>i.id===id?{...i,status}:i))
 const createTome=(number:number,section:Section)=>{setTomes(prev=>[...prev,{id:Math.max(0,...prev.map(t=>t.id))+1,number,section,records:null,recordStart:null,recordEnd:null,images:0,employee:"Sin asignar",assigned:"—",status:"Pendiente",custody:"Disponible"}])}
 const assignTome=(id:number,employee:string,date:string,_note:string)=>{setTomes(prev=>prev.map(t=>t.id===id?{...t,employee,assigned:date,status:"Asignado"}:t))}
 const custodyTome=(id:number,mode:"entrega"|"devolucion")=>setTomes(prev=>prev.map(t=>t.id===id?{...t,custody:mode==="entrega"?"Entregado":"Devuelto"}:t))
 const addAdvance=(id:number,entry:Advance)=>{setDemoAdvances(prev=>({...prev,[id]:[...(prev[id]??[]),entry]}));setTomes(prev=>prev.map(t=>t.id===id?{...t,images:t.images+entry.images,status:"En proceso"}:t))}
 const editAdvance=(id:number,entry:Advance)=>{const old=(demoAdvances[id]??[]).find(a=>a.id===entry.id);if(!old)return;setDemoAdvances(prev=>({...prev,[id]:(prev[id]??[]).map(a=>a.id===entry.id?entry:a)}));setTomes(prev=>prev.map(t=>t.id===id?{...t,images:t.images+entry.images-old.images}:t))}
 const finishTome=(id:number,records:number,start:number,end:number)=>setTomes(prev=>prev.map(t=>t.id===id?{...t,records,recordStart:start,recordEnd:end,status:"Completado"}:t))
 const titles:Record<View,string>={panel:role==="admin"?"Panel general":"Mis tomos",registro:"Registro de tomos",asignacion:role==="admin"?"Asignación":"Mis tomos",custodia:"Custodia",detalle:"Detalle del tomo",usuarios:"Usuarios",reportes:"Reportes",incidencias:"Incidencias",avance:"Registrar avance",historial:"Mi historial"}
 let content:React.ReactNode
 if(view==="panel")content=role==="admin"?<AdminDashboard go={setView} tomes={tomes} selectTome={setSelectedId}/>:<UserDashboard go={setView} tomes={tomes} selectTome={setSelectedId}/>
 else if(view==="registro")content=role==="admin"?<TomeRegistrationPage tomes={tomes} onCreate={createTome}/>:<UserDashboard go={setView} tomes={tomes} selectTome={setSelectedId}/>
 else if(view==="asignacion")content=role==="admin"?<AssignmentPage tomes={tomes} onAssign={assignTome}/>:<UserDashboard go={setView} tomes={tomes} selectTome={setSelectedId}/>
 else if(view==="custodia")content=<CustodyPage tomes={tomes} onCustody={custodyTome}/>
 else if(view==="detalle")content=<TomeDetail go={setView} tome={selectedTome} selectTome={setSelectedId}/>
 else if(view==="avance")content=<ProgressForm key={selectedId} tome={selectedTome} advances={demoAdvances[selectedId]??[]} onAdd={addAdvance} onEdit={editAdvance} onFinish={finishTome} incidents={incidents} onReport={reportIncident} go={setView}/>
 else if(view==="reportes")content=<ReportsPage/>
 else content=<GenericPage type={view} incidents={incidents} onStatusChange={changeIncidentStatus}/>
 return <div className="app"><Sidebar role={role} view={view} setView={setView} setRole={setRole} open={menu} close={()=>setMenu(false)}/><main><Header title={titles[view]} onMenu={()=>setMenu(true)}/>{content}</main></div>
}
