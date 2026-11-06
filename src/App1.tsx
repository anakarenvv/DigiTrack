import { useState } from "react"

type Role = "admin" | "usuario"
type View = "panel" | "asignacion" | "custodia" | "detalle" | "usuarios" | "reportes" | "incidencias" | "avance" | "historial"
type Section = "Propiedad" | "Gravamen" | "Sentencias" | "Varios" | "Cancelaciones"

const sections: Section[] = [
  "Propiedad",
  "Gravamen",
  "Sentencias",
  "Varios",
  "Cancelaciones",
]
const tomes = [
  {
    id: 1,
    number: 1340,
    section: "Gravamen",
    records: 3,
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
    records: 100,
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
    records: 118,
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
    records: 0,
    images: 0,
    employee: "Sin asignar",
    assigned: "—",
    status: "Pendiente",
    custody: "Disponible",
  },
]

const navAdmin = [
  ["panel", "Panel general", "grid"],
  ["asignacion", "Asignación", "book"],
  ["custodia", "Custodia", "archive"],
  ["usuarios", "Usuarios", "users"],
  ["reportes", "Reportes", "chart"],
  ["incidencias", "Incidencias", "alert"],
] as const
const navUser = [
  ["panel", "Mi panel", "grid"],
  ["asignacion", "Mis tomos", "book"],
  ["avance", "Registrar avance", "plus"],
  ["historial", "Mi historial", "clock"],
] as const

function Icon({ name, size = 18 }: { name: string size?: number }) {
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

function Header({ title, onMenu }: { title: string onMenu: () => void }) {
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

function Filters() {
  return (
    <div className="card filters tome-filters">
      <div className="search">
        <Icon name="search" />
        <input placeholder="Buscar por ID o número de tomo..." />
      </div>
      <select>
        <option>Todas las secciones</option>
        {sections.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <select>
        <option>Todos los empleados</option>
        <option>Lucía Herrera</option>
        <option>Mateo Silva</option>
        <option>Diego Morales</option>
      </select>
      <select>
        <option>Todos los estados</option>
        <option>Pendiente</option>
        <option>Asignado</option>
        <option>En proceso</option>
        <option>Completado</option>
        <option>Con incidencia</option>
      </select>
    </div>
  )
}

function TomeTable({
  go,
  employeeOnly = false,
}: {
  go: (v: View) => void
  employeeOnly?: boolean
}) {
  const rows = employeeOnly
    ? tomes.filter((t) => t.employee === "Lucía Herrera")
    : tomes
  return (
    <section className="card table-card books-table">
      <div className="table-meta">
        <b>{rows.length} tomos en control</b>
        <span>Actualizado el 05 Nov 2026, 14:32</span>
      </div>
      <table className="tome-table">
        <thead>
          <tr>
            <th>ID único</th>
            <th>Número de tomo</th>
            <th>Sección</th>
            <th>Total de registros</th>
            <th>Imágenes digitalizadas</th>
            <th>Empleado asignado</th>
            <th>Digitalización</th>
            <th>Custodia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.id}>
              <td>
                <b>{t.id}</b>
              </td>
              <td>
                <b>{t.number}</b>
              </td>
              <td>{t.section}</td>
              <td>{t.records}</td>
              <td>{t.images.toLocaleString("es-MX")}</td>
              <td>{t.employee}</td>
              <td>
                <Badge>{t.status}</Badge>
              </td>
              <td>
                <Badge>{t.custody}</Badge>
              </td>
              <td>
                <div className="table-actions">
                  <button onClick={() => go("detalle")}>Ver detalle</button>
                  {employeeOnly && (
                    <button onClick={() => go("avance")}>
                      Registrar avance
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function AdminDashboard({ go }: { go: (v: View) => void }) {
  return (
    <div className="page">
      <div className="page-lead">
        <div>
          <p>Control documental</p>
          <h2>Panel general</h2>
          <span>
            Consulta el estado operativo de todos los tomos registrados.
          </span>
        </div>
      </div>
      <Filters />
      <TomeTable go={go} />
      <section className="card table-card recent-table">
        <div className="card-head">
          <div>
            <h3>Solicitudes de corrección pendientes</h3>
            <p>Autoriza temporalmente la edición de avances finalizados.</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Solicitante</th>
              <th>ID único</th>
              <th>Número de tomo</th>
              <th>Motivo</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lucía Herrera</td>
              <td>
                <b>3</b>
              </td>
              <td>1230</td>
              <td>Corregir cantidad del avance del 28/10</td>
              <td>05 Nov 2026</td>
              <td>
                <div className="table-actions">
                  <button>Autorizar</button>
                  <button>Rechazar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

function AssignmentPage() {
  const [saved, setSaved] = useState(false)
  return (
    <div className="page">
      <div className="page-lead">
        <div>
          <p>Administración</p>
          <h2>Asignación de tomos</h2>
          <span>
            Asigna tomos registrados sin modificar su estado de custodia física.
          </span>
        </div>
      </div>
      {saved && (
        <div className="success">
          <span>✓</span>
          <div>
            <b>Tomo asignado correctamente</b>
            <p>La asignación administrativa no registra una entrega física.</p>
          </div>
          <button onClick={() => setSaved(false)}>×</button>
        </div>
      )}
      <form
        className="card progress-form assignment-form"
        onSubmit={(e) => {
          e.preventDefault()
          setSaved(true)
        }}
      >
        <div className="form-section">
          <span className="step">1</span>
          <div>
            <h3>Nueva asignación</h3>
            <p>Un tomo solo puede tener una asignación activa.</p>
          </div>
        </div>
        <div className="form-grid three">
          <label>
            ID único
            <select>
              <option>28 · número 1340</option>
              <option>27 · número 40</option>
            </select>
          </label>
          <label>
            Número de tomo
            <input readOnly value="1340" />
          </label>
          <label>
            Sección principal
            <input readOnly value="Cancelaciones" />
          </label>
          <label>
            Empleado responsable
            <select>
              <option>Lucía Herrera</option>
              <option>Mateo Silva</option>
              <option>Diego Morales</option>
            </select>
          </label>
          <label>
            Fecha de asignación
            <input type="date" defaultValue="2026-11-05" />
          </label>
          <label>
            Observaciones opcionales
            <input placeholder="Indicaciones para el digitalizador" />
          </label>
        </div>
        <div className="form-actions">
          <span>La entrega física se registra desde Custodia.</span>
          <button className="primary large" type="submit">
            Asignar tomo
          </button>
        </div>
      </form>
      <section className="card table-card recent-table">
        <div className="card-head">
          <div>
            <h3>Asignaciones recientes</h3>
            <p>Últimos movimientos administrativos</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID único</th>
              <th>Número</th>
              <th>Sección</th>
              <th>Empleado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tomes.slice(0, 4).map((t) => (
              <tr key={t.id}>
                <td>
                  <b>{t.id}</b>
                </td>
                <td>{t.number}</td>
                <td>{t.section}</td>
                <td>{t.employee}</td>
                <td>{t.assigned}</td>
                <td>
                  <div className="table-actions">
                    <button>Consultar</button>
                    <button>Reasignar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

function CustodyPage() {
  const [mode, setMode] = useState<"entrega" | "devolucion">("entrega")
  const [message, setMessage] = useState("")
  return (
    <div className="page">
      <div className="page-lead">
        <div>
          <p>Control físico</p>
          <h2>Custodia</h2>
          <span>Registra la entrega y devolución física de los tomos.</span>
        </div>
        <div className="segmented">
          <button
            className={mode === "entrega" ? "selected" : ""}
            onClick={() => setMode("entrega")}
          >
            Registrar entrega
          </button>
          <button
            className={mode === "devolucion" ? "selected" : ""}
            onClick={() => setMode("devolucion")}
          >
            Registrar devolución
          </button>
        </div>
      </div>
      {message && (
        <div className="success">
          <span>✓</span>
          <div>
            <b>{message}</b>
            <p>El movimiento quedó registrado en el historial de custodia.</p>
          </div>
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}
      <form
        className="card progress-form custody-form"
        onSubmit={(e) => {
          e.preventDefault()
          setMessage(
            mode === "entrega"
              ? "Entrega confirmada correctamente"
              : "Devolución confirmada correctamente",
          )
        }}
      >
        <div className="form-section">
          <span className="step">
            <Icon name="archive" size={15} />
          </span>
          <div>
            <h3>
              {mode === "entrega"
                ? "Registrar entrega física"
                : "Registrar devolución física"}
            </h3>
            <p>La custodia es independiente del avance de digitalización.</p>
          </div>
        </div>
        <div className="form-grid three">
          <label>
            ID único
            <select>
              <option>3</option>
              <option>28</option>
            </select>
          </label>
          <label>
            Número de tomo
            <input readOnly value={mode === "entrega" ? "1340" : "1230"} />
          </label>
          <label>
            {mode === "entrega"
              ? "Empleado que recibe"
              : "Empleado que devuelve"}
            <select>
              <option>Lucía Herrera</option>
              <option>Mateo Silva</option>
            </select>
          </label>
          <label>
            Fecha y hora
            <input type="datetime-local" defaultValue="2026-11-05T09:30" />
          </label>
          <label>
            {mode === "entrega"
              ? "Administrador que entrega"
              : "Administrador que recibe"}
            <input readOnly value="Laura Méndez" />
          </label>
          <label>
            Condición física
            <select>
              <option>Buen estado</option>
              <option>Desgaste moderado</option>
              <option>Con daño visible</option>
            </select>
          </label>
        </div>
        <label>
          Observaciones
          <textarea
            rows={3}
            placeholder="Describe la condición o cualquier detalle relevante..."
          />
        </label>
        <div className="form-actions">
          <button className="primary large" type="submit">
            {mode === "entrega" ? "Confirmar entrega" : "Confirmar devolución"}
          </button>
        </div>
      </form>
      <section className="card table-card recent-table">
        <div className="card-head">
          <div>
            <h3>Movimientos de custodia</h3>
            <p>Historial de entregas y devoluciones</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID único</th>
              <th>Empleado responsable</th>
              <th>Fecha de entrega</th>
              <th>Fecha de devolución</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tomes.slice(0, 4).map((t, i) => (
              <tr key={t.id}>
                <td>
                  <b>{t.id}</b>
                </td>
                <td>{t.employee}</td>
                <td>{t.assigned}</td>
                <td>{i === 2 ? "03 Nov 2026" : "—"}</td>
                <td>
                  <Badge>{t.custody}</Badge>
                </td>
                <td>
                  <button className="more">•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

function UserDashboard({ go }: { go: (v: View) => void }) {
  const [tab, setTab] = useState<"activos" | "historial">("activos")
  const [correction, setCorrection] = useState(false)
  const [sent, setSent] = useState(false)
  const active = tomes.filter(
    (t) => t.employee === "Lucía Herrera" && t.status !== "Completado",
  )
  const completed = tomes.filter(
    (t) => t.employee === "Lucía Herrera" && t.status === "Completado",
  )
  return (
    <div className="page">
      <div className="page-lead">
        <div>
          <p>Jueves, 05 de noviembre de 2026</p>
          <h2>Mis tomos</h2>
          <span>Consulta únicamente los tomos que tienes asignados.</span>
        </div>
        <div className="segmented">
          <button
            className={tab === "activos" ? "selected" : ""}
            onClick={() => setTab("activos")}
          >
            Tomos activos
          </button>
          <button
            className={tab === "historial" ? "selected" : ""}
            onClick={() => setTab("historial")}
          >
            Historial
          </button>
        </div>
      </div>
      {sent && (
        <div className="success">
          <span>✓</span>
          <div>
            <b>Solicitud enviada</b>
            <p>Un administrador revisará el motivo de la corrección.</p>
          </div>
          <button onClick={() => setSent(false)}>×</button>
        </div>
      )}
      <section className="card table-card books-table">
        <div className="table-meta">
          <b>
            {tab === "activos"
              ? `${active.length} tomos activos`
              : `${completed.length} tomos finalizados`}
          </b>
          <span>Lucía Herrera</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID único</th>
              <th>Número de tomo</th>
              <th>Sección</th>
              {tab === "historial" && (
                <>
                  <th>Fecha de inicio</th>
                  <th>Fecha de finalización</th>
                </>
              )}
              <th>Registros</th>
              <th>Imágenes acumuladas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(tab === "activos" ? active : completed).map((t) => (
              <tr key={t.id}>
                <td>
                  <b>{t.id}</b>
                </td>
                <td>{t.number}</td>
                <td>{t.section}</td>
                {tab === "historial" && (
                  <>
                    <td>18 Oct 2026</td>
                    <td>03 Nov 2026</td>
                  </>
                )}
                <td>{t.records || "No disponible"}</td>
                <td>{t.images.toLocaleString("es-MX")}</td>
                <td>
                  <Badge>{t.status}</Badge>
                </td>
                <td>
                  <div className="table-actions">
                    {tab === "activos" ? (
                      <button onClick={() => go("avance")}>
                        Registrar avance
                      </button>
                    ) : (
                      <button onClick={() => setCorrection(true)}>
                        Solicitar corrección
                      </button>
                    )}
                    <button onClick={() => go("detalle")}>Ver detalle</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {correction && (
        <div className="modal-backdrop" onClick={() => setCorrection(false)}>
          <section
            className="card assign-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <p>SOLICITUD DE CORRECCIÓN</p>
                <h3>Tomo seleccionado: 1230</h3>
                <span>ID único 3 · Sentencias</span>
              </div>
              <button onClick={() => setCorrection(false)}>×</button>
            </div>
            <label>
              Motivo de la corrección
              <textarea
                rows={4}
                placeholder="Explica qué avance requiere corrección y por qué..."
              />
            </label>
            <div className="modal-actions">
              <button
                className="secondary"
                onClick={() => setCorrection(false)}
              >
                Cancelar
              </button>
              <button
                className="primary"
                onClick={() => {
                  setCorrection(false)
                  setSent(true)
                }}
              >
                Enviar solicitud
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

function TomeDetail({ go }: { go: (v: View) => void }) {
  const records = [
    ["1", "Gravamen", "Inscripción hipotecaria"],
    ["7", "Gravamen", "Modificación de garantía"],
    ["19", "Cancelaciones", "Cancelación parcial"],
  ]
  return (
    <div className="page">
      <button className="back" onClick={() => go("panel")}>
        ‹ Volver al control de tomos
      </button>
      <div className="page-lead">
        <div>
          <p>ID ÚNICO 1</p>
          <h2>Detalle del tomo 1340</h2>
          <span>Sección principal: Gravamen · Responsable: Lucía Herrera</span>
        </div>
        <button className="primary" onClick={() => go("avance")}>
          Registrar avance
        </button>
      </div>
      <section className="detail-hero card">
        <div>
          <span className="book-icon">
            <Icon name="book" size={28} />
          </span>
          <div>
            <Badge>En proceso</Badge>
            <h3>3 registros capturados</h3>
            <Progress value={62} />
            <p>1,100 imágenes digitalizadas acumuladas</p>
          </div>
        </div>
        <div className="detail-stats">
          <div>
            <small>Custodia</small>
            <b>Entregado</b>
          </div>
          <div>
            <small>Inicio</small>
            <b>20 Oct 2026</b>
          </div>
          <div>
            <small>Último avance</small>
            <b>05 Nov 2026</b>
          </div>
        </div>
      </section>
      <section className="card table-card">
        <div className="card-head">
          <div>
            <h3>Registros del tomo</h3>
            <p>
              La numeración no se genera automáticamente ni necesita ser
              consecutiva.
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Número de registro</th>
              <th>Sección</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={`${r[0]}-${r[1]}`}>
                <td>
                  <b>{r[0]}</b>
                </td>
                {r.slice(1).map((v) => (
                  <td key={v}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

function ProgressForm() {
  const [advances, setAdvances] = useState([
    { id: 1, date: "2026-11-06", images: 800, note: "Digitalización inicial" },
    { id: 2, date: "2026-11-07", images: 300, note: "Continuación del tomo" },
  ])
  const [date, setDate] = useState("2026-11-08")
  const [images, setImages] = useState("")
  const [note, setNote] = useState("")
  const [message, setMessage] = useState("")
  const [editing, setEditing] = useState<typeof advances[number] | null>(null)
  const [finish, setFinish] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [showRecord, setShowRecord] = useState(false)
  const [records, setRecords] = useState([
    {
      id: 1,
      number: "1",
      section: "Gravamen",
      note: "Inscripción hipotecaria",
    },
    {
      id: 2,
      number: "7",
      section: "Gravamen",
      note: "Modificación de garantía",
    },
  ])
  const total = advances.reduce((sum, item) => sum + item.images, 0)
  const register = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !images || Number(images) < 0) return
    setAdvances([
      ...advances,
      { id: Date.now(), date, images: Number(images), note },
    ])
    setImages("")
    setNote("")
    setMessage("Avance registrado correctamente")
  }
  const saveEdit = () => {
    if (!editing || !editing.date || editing.images < 0) return
    setAdvances(
      advances.map((item) => (item.id === editing.id ? editing : item)),
    )
    setEditing(null)
    setMessage("Corrección guardada y registrada en la auditoría")
  }
  return (
    <div className="page form-page wide-form">
      <button className="back">‹ Volver a Mis tomos</button>
      <div className="page-lead">
        <div>
          <p>ID ÚNICO 1</p>
          <h2>Registrar avance · Tomo 1340</h2>
          <span>
            Gravamen · Lucía Herrera ·{" "}
            <Badge>{completed ? "Completado" : "En proceso"}</Badge>
          </span>
        </div>
        {!completed && (
          <button className="finish-button" onClick={() => setFinish(true)}>
            Finalizar tomo
          </button>
        )}
      </div>
      {message && (
        <div className="success">
          <span>✓</span>
          <div>
            <b>{message}</b>
            <p>Los totales se actualizaron automáticamente.</p>
          </div>
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}
      <div className="advance-layout">
        <form
          className="card progress-form compact-capture"
          onSubmit={register}
        >
          <div className="form-section">
            <span className="step">1</span>
            <div>
              <h3>Nuevo avance diario</h3>
              <p>Registra únicamente las imágenes trabajadas este día.</p>
            </div>
          </div>
          <label>
            Fecha del avance
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={completed}
            />
          </label>
          <label>
            Cantidad de imágenes digitalizadas
            <input
              type="number"
              min="0"
              required
              value={images}
              onChange={(e) => setImages(e.target.value)}
              placeholder="Ej. 450"
              disabled={completed}
            />
          </label>
          <label>
            Observaciones opcionales
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Agrega información relevante..."
              disabled={completed}
            />
          </label>
          <button className="primary large" type="submit" disabled={completed}>
            Registrar avance
          </button>
        </form>
        <section className="card accumulated">
          <small>TOTAL ACUMULADO DEL TOMO</small>
          <strong>{total.toLocaleString("es-MX")}</strong>
          <span>imágenes digitalizadas</span>
          <div>
            <b>{advances.length}</b>
            <small>avances registrados</small>
          </div>
          <p>
            La productividad diaria total del empleado suma los avances
            capturados en todos sus tomos.
          </p>
        </section>
      </div>
      <section className="card table-card recent-table">
        <div className="card-head">
          <div>
            <h3>Historial de avances</h3>
            <p>Cada avance conserva su fecha, cantidad y observaciones.</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Imágenes del día</th>
              <th>Observaciones</th>
              <th>Auditoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {advances.map((a) => (
              <tr key={a.id}>
                <td>
                  {new Date(`${a.date}T12:00`).toLocaleDateString("es-MX")}
                </td>
                <td>
                  <b>{a.images.toLocaleString("es-MX")}</b>
                </td>
                <td>{a.note || "—"}</td>
                <td>
                  {a.id === 1 ? "Registro original" : "Sin modificaciones"}
                </td>
                <td>
                  <button
                    className="table-link"
                    disabled={completed}
                    onClick={() => setEditing({ ...a })}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="card optional-records">
        <div className="card-head">
          <div>
            <h3>
              Registros del tomo <span className="optional-tag">Opcional</span>
            </h3>
            <p>Captura provisional; no afecta la productividad por imágenes.</p>
          </div>
          <button
            className="secondary"
            disabled={completed}
            onClick={() => setShowRecord(!showRecord)}
          >
            <Icon name="plus" />
            Agregar registro
          </button>
        </div>
        {showRecord && (
          <div className="inline-record-form">
            <label>
              Número de registro
              <input placeholder="Ej. 19" />
            </label>
            <label>
              Sección documental
              <select>
                {sections.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Observaciones
              <input placeholder="Descripción opcional" />
            </label>
            <div>
              <small>ID único</small>
              <b>1</b>
            </div>
            <button
              className="primary"
              onClick={() => {
                setRecords([
                  ...records,
                  {
                    id: Date.now(),
                    number: "19",
                    section: "Cancelaciones",
                    note: "Registro agregado",
                  },
                ])
                setShowRecord(false)
              }}
            >
              Guardar registro
            </button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Número de registro</th>
              <th>Sección</th>
              <th>ID único del tomo</th>
              <th>Observaciones</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>
                  <b>{r.number}</b>
                </td>
                <td>{r.section}</td>
                <td>1</td>
                <td>{r.note}</td>
                <td>
                  <button className="table-link" disabled={completed}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {editing && (
        <div className="modal-backdrop">
          <section className="card assign-modal">
            <div className="modal-head">
              <div>
                <p>CORREGIR AVANCE</p>
                <h3>Datos originales disponibles en auditoría</h3>
                <span>Confirma cuidadosamente los nuevos valores.</span>
              </div>
              <button onClick={() => setEditing(null)}>×</button>
            </div>
            <div className="form-grid">
              <label>
                Fecha
                <input
                  type="date"
                  value={editing.date}
                  onChange={(e) =>
                    setEditing({ ...editing, date: e.target.value })
                  }
                />
              </label>
              <label>
                Imágenes
                <input
                  type="number"
                  min="0"
                  value={editing.images}
                  onChange={(e) =>
                    setEditing({ ...editing, images: Number(e.target.value) })
                  }
                />
              </label>
            </div>
            <label>
              Observaciones
              <textarea
                rows={3}
                value={editing.note}
                onChange={(e) =>
                  setEditing({ ...editing, note: e.target.value })
                }
              />
            </label>
            <div className="audit-note">
              La modificación conservará los datos originales en el registro de
              auditoría.
            </div>
            <div className="modal-actions">
              <button className="secondary" onClick={() => setEditing(null)}>
                Cancelar
              </button>
              <button className="primary" onClick={saveEdit}>
                Confirmar y guardar
              </button>
            </div>
          </section>
        </div>
      )}
      {finish && (
        <div className="modal-backdrop">
          <section className="card assign-modal finish-modal">
            <div className="modal-head">
              <div>
                <p>CONFIRMACIÓN FINAL</p>
                <h3>Finalizar tomo</h3>
              </div>
              <button onClick={() => setFinish(false)}>×</button>
            </div>
            <div className="finish-summary">
              <div>
                <small>ID único</small>
                <b>1</b>
              </div>
              <div>
                <small>Número de tomo</small>
                <b>1340</b>
              </div>
              <div>
                <small>Sección</small>
                <b>Gravamen</b>
              </div>
              <div>
                <small>Avances registrados</small>
                <b>{advances.length}</b>
              </div>
              <div>
                <small>Total acumulado</small>
                <b>{total.toLocaleString("es-MX")}</b>
              </div>
              <div>
                <small>Finalización</small>
                <b>08 Nov 2026</b>
              </div>
            </div>
            <p>
              ¿Confirmas que has terminado la digitalización de este tomo? Una
              vez finalizado, pasará a tu historial y no podrás modificar sus
              avances sin autorización del administrador.
            </p>
            <div className="modal-actions">
              <button className="secondary" onClick={() => setFinish(false)}>
                Cancelar
              </button>
              <button
                className="primary"
                disabled={!advances.length}
                onClick={() => {
                  setFinish(false)
                  setCompleted(true)
                  setMessage("Tomo finalizado y movido al historial")
                }}
              >
                Confirmar finalización
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
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

function GenericPage({ type }: { type: View }) {
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
    return (
      <div className="page">
        <div className="page-lead">
          <div>
            <p>Control de calidad</p>
            <h2>Incidencias</h2>
            <span>Incidencias asociadas a tomos y registros documentales.</span>
          </div>
        </div>
        <section className="card table-card">
          <table>
            <thead>
              <tr>
                <th>ID único</th>
                <th>Registro</th>
                <th>Empleado</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "27",
                  "Registro 822",
                  "Diego Morales",
                  "Documento ilegible",
                  "Tinta desvanecida",
                  "05 Nov 2026",
                  "Abierta",
                ],
                [
                  "2",
                  "—",
                  "Mateo Silva",
                  "Daño físico",
                  "Lomo desprendido",
                  "03 Nov 2026",
                  "En revisión",
                ],
                [
                  "1",
                  "Registro 1847",
                  "Lucía Herrera",
                  "Hojas faltantes",
                  "Falta hoja intermedia",
                  "01 Nov 2026",
                  "Resuelta",
                ],
              ].map((x) => (
                <tr key={x[0] + x[1]}>
                  {x.map((v, i) => (
                    <td key={i}>
                      {i === 0 ? <b>{v}</b> : i === 6 ? <Badge>{v}</Badge> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    )
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
                "Propiedad",
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
                "Propiedad",
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
  const [role, setRole] = useState<Role>("admin")
  const [view, setView] = useState<View>("panel")
  const [menu, setMenu] = useState(false)
  const titles: Record<View, string> = {
    panel: role === "admin" ? "Panel general" : "Mis tomos",
    asignacion: role === "admin" ? "Asignación" : "Mis tomos",
    custodia: "Custodia",
    detalle: "Detalle del tomo",
    usuarios: "Usuarios",
    reportes: "Reportes",
    incidencias: "Incidencias",
    avance: "Registrar avance",
    historial: "Mi historial",
  }
  let content: React.ReactNode
  if (view === "panel")
    content =
      role === "admin" ? (
        <AdminDashboard go={setView} />
      ) : (
        <UserDashboard go={setView} />
      )
  else if (view === "asignacion")
    content =
      role === "admin" ? <AssignmentPage /> : <UserDashboard go={setView} />
  else if (view === "custodia") content = <CustodyPage />
  else if (view === "detalle") content = <TomeDetail go={setView} />
  else if (view === "avance") content = <ProgressForm />
  else if (view === "reportes") content = <ReportsPage />
  else content = <GenericPage type={view} />
  return (
    <div className="app">
      <Sidebar
        role={role}
        view={view}
        setView={setView}
        setRole={setRole}
        open={menu}
        close={() => setMenu(false)}
      />
      <main>
        <Header title={titles[view]} onMenu={() => setMenu(true)} />
        {content}
      </main>
    </div>
  )
}
