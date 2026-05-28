/* BIT/BGP Finance — shared components v2 */
const { useState, useEffect, useMemo, useRef } = React;

const Icon = ({ name, ...props }) => {
  const paths = {
    home: <><path d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2V10z"/></>,
    chart: <><path d="M3 21h18M6 17V9m6 8V5m6 12v-7"/></>,
    money: <><circle cx="12" cy="12" r="9"/><path d="M9 9.5c0-1.1.9-2 2-2h2.5a2 2 0 010 4H11a2 2 0 000 4h2.5a2 2 0 002-2M12 6v12"/></>,
    expense: <><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></>,
    flow: <><path d="M3 12h7l3-7 3 14 3-7h2"/></>,
    treasury: <><path d="M5 21V8l7-4 7 4v13M9 21v-7h6v7M3 21h18"/></>,
    compare: <><path d="M7 4v16M17 4v16M4 8h6M14 16h6"/></>,
    diary: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 7h16M9 3v18"/></>,
    report: <><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M9 13h6M9 17h4"/></>,
    fileText: <><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h6M8 9h2"/></>,
    invest: <><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v6h-6"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    menu: <><path d="M4 6h16M4 12h10M4 18h16"/></>,
    chevronRight: <><path d="M9 6l6 6-6 6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    bell: <><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9zM10 21a2 2 0 004 0"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></>,
    download: <><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/></>,
    sliders: <><path d="M4 6h11M4 12h7M4 18h13"/><circle cx="18" cy="6" r="2"/><circle cx="14" cy="12" r="2"/><circle cx="20" cy="18" r="2"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    arrowUp: <><path d="M12 19V5M5 12l7-7 7 7"/></>,
    arrowDown: <><path d="M12 5v14M19 12l-7 7-7-7"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
    cash: <><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></>,
    accrual: <><path d="M4 4h12l4 4v12H4z"/><path d="M4 12h16M12 4v16"/></>,
    filter: <><path d="M3 5h18l-7 9v6l-4-2v-4z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></>,
    moon: <><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></>,
    // === Novos ícones únicos por tela ===
    layers: <><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    gridSm: <><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></>,
    pie: <><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></>,
    donut: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></>,
    lineChart: <><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></>,
    barChart: <><path d="M3 3v18h18"/><rect x="7" y="12" width="2" height="6"/><rect x="11" y="8" width="2" height="10"/><rect x="15" y="14" width="2" height="4"/><rect x="19" y="6" width="2" height="12"/></>,
    trending: <><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></>,
    package: <><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/></>,
    boxes: <><path d="M7 16.5L2 13V7l5-3 5 3v6l-5 3.5z"/><path d="M12 10l5-3 5 3v6l-5 3.5L12 16"/><path d="M7 16.5l5-3 5 3"/></>,
    tagIcon: <><path d="M20 12l-8 8a2 2 0 0 1-2.83 0L2 12.83V3h9.83L20 11.17a2 2 0 0 1 0 2.83z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
    users: <><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><circle cx="17" cy="6" r="3"/><path d="M17 11a5 5 0 0 1 5 5"/></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    shoppingCart: <><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l3 12h12l2-8H6"/></>,
    truck: <><path d="M3 17V6h12v11M15 11h5l3 3v3h-8"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
    repeat: <><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></>,
    megaphone: <><path d="M3 11v3l13 5V6L3 11z"/><path d="M16 6v13"/><path d="M21 10v5"/></>,
    zap: <><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></>,
    clipboard: <><rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><path d="M9 11h6M9 15h4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    rotate: <><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></>,
    banknote: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v.01M18 14v.01"/></>,
    coin: <><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9h4.5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3h5"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {paths[name]}
    </svg>
  );
};

// useCountUp — anima transição numérica suave (cubic ease-out). Mantém leve.
const useCountUp = (target, duration = 900) => {
  const [val, setVal] = React.useState(target);
  const prev = React.useRef(target);
  React.useEffect(() => {
    if (typeof target !== "number" || !isFinite(target)) { setVal(target); return; }
    const from = prev.current || 0;
    const to = target;
    if (from === to) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
};

const ASTRO_LEGACY_BASE = "https://demo-anon.187.77.238.125.sslip.io";
// Tintas suaves nos icones do menu (so quando inativos — ativo deixa o CSS pintar de cyan)
const ICON_TINTS = {
  // existentes
  home:         'rgba(34,211,238,0.55)',   // cyan
  chart:        'rgba(34,211,238,0.55)',   // cyan
  money:        'rgba(245,158,11,0.55)',   // âmbar
  expense:      'rgba(245,158,11,0.55)',   // âmbar
  invest:       'rgba(167,139,250,0.55)',  // violeta
  report:       'rgba(16,185,129,0.55)',   // verde
  user:         'rgba(244,114,182,0.55)',  // rosa
  sun:          'rgba(245,158,11,0.55)',   // âmbar
  moon:         'rgba(196,181,253,0.55)',  // lavanda
  // novos — distribuídos pra que vizinhos no menu não repitam tinta
  banknote:     'rgba(245,158,11,0.55)',   // âmbar
  calendar:     'rgba(167,139,250,0.55)',  // violeta
  coin:         'rgba(245,158,11,0.55)',   // âmbar
  layers:       'rgba(167,139,250,0.55)',  // violeta
  mapPin:       'rgba(244,114,182,0.55)',  // rosa
  lineChart:    'rgba(45,212,191,0.55)',   // teal
  pie:          'rgba(251,113,133,0.55)',  // coral
  clock:        'rgba(196,181,253,0.55)',  // lavanda
  package:      'rgba(245,158,11,0.55)',   // âmbar
  tagIcon:      'rgba(244,114,182,0.55)',  // rosa
  barChart:     'rgba(45,212,191,0.55)',   // teal
  donut:        'rgba(167,139,250,0.55)',  // violeta
  grid:         'rgba(34,211,238,0.55)',   // cyan
  clipboard:    'rgba(16,185,129,0.55)',   // verde
  rotate:       'rgba(34,211,238,0.55)',   // cyan
  truck:        'rgba(245,158,11,0.55)',   // âmbar
  shoppingCart: 'rgba(16,185,129,0.55)',   // verde
  repeat:       'rgba(251,113,133,0.55)',  // coral
  megaphone:    'rgba(244,114,182,0.55)',  // rosa
  zap:          'rgba(245,158,11,0.55)',   // âmbar
  trending:     'rgba(16,185,129,0.55)',   // verde
  target:       'rgba(251,113,133,0.55)',  // coral
  users:        'rgba(244,114,182,0.55)',  // rosa
  boxes:        'rgba(167,139,250,0.55)',  // violeta
  gridSm:       'rgba(34,211,238,0.55)',   // cyan
};
const Sidebar = ({ active, onSelect, open }) => {
  // === Power BI — telas na ORDEM do PDF original (17 telas, 3 ainda EM BREVE) ===
  const general = [
    { id: "astro_dash",              icon: "home",       label: "Dash" },
    { id: "astro_dashfatur",         icon: "banknote",   label: "Dash · Faturamento" },
    { id: "pbi_vendas_dia_util",     icon: "calendar",   label: "Vendas / Dia Útil" },
    { id: "pbi_cfv",                 icon: "coin",       label: "CFV" },
    { id: "pbi_geral",               icon: "layers",     label: "Geral" },
    { id: "pbi_campest",             icon: "mapPin",     label: "Campanha × Estado" },
    { id: "pbi_analise_vendas",      icon: "lineChart",  label: "Análise de Vendas" },
    { id: "pbi_tend_composicao",     icon: "pie",        label: "Tendência Composição" },
    { id: "pbi_tend_temporais",      icon: "clock",      label: "Tendência Temporal" },
    { id: "pbi_tend_produtos",       icon: "package",    label: "Tendência Produtos" },
    { id: "pbi_tend_marcas",         icon: "tagIcon",    label: "Tendências Marcas" },
    { id: "pbi_composicao_vendas",   icon: "barChart",   label: "Composição de Venda" },
    { id: "pbi_composicao_total",    icon: "donut",      label: "Composição (Total)" },
    { id: "pbi_coorte",              icon: "grid",       label: "Cohort (Valor + Vendas)" },
  ];
  // === Outras Análises — todas migradas internamente (não mais links externos) ===
  const others = [
    { id: "plano_acao",          icon: "clipboard",    label: "Plano de Ação" },
    { id: "astro_giro",          icon: "rotate",       label: "Giro Estoque" },
    { id: "astro_frete",         icon: "truck",        label: "Frete RJ" },
    { id: "astro_pedmin",        icon: "shoppingCart", label: "Pedido Mínimo" },
    { id: "astro_recompra",      icon: "repeat",       label: "Recompra" },
    { id: "astro_campanhas",     icon: "megaphone",    label: "Campanhas Ads" },
    { id: "astro_agressividade", icon: "zap",          label: "Agressividade" },
    { id: "astro_abc",           icon: "trending",     label: "Curva ABC" },
  ];
  // Modo da page (active/upsell/hidden) injetado pelo build-jsx.cjs a partir do bi.config.js
  const pageMode = (id) => (window.BI_PAGE_MODE && window.BI_PAGE_MODE[id]) || 'active';
  const isUpsell = (id) => pageMode(id) === 'upsell';
  const isHidden = (id) => pageMode(id) === 'hidden';

  const renderItem = (it) => {
    if (isHidden(it.id)) return null;
    const upsell = isUpsell(it.id);
    // Item externo (link pra Streamlit legacy)
    if (it.href) {
      return (
        <a
          key={it.id}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          className="sb-item"
          title={"Abrir em " + it.href}
        >
          <Icon name={it.icon} style={ICON_TINTS[it.icon] ? { color: ICON_TINTS[it.icon] } : undefined} />
          <span className="label">{it.label}</span>
          <span className="badge" style={{ background: "transparent", border: "1px solid var(--border-2)", fontSize: 9, padding: "1px 5px", color: "var(--mute-2)" }}>↗</span>
        </a>
      );
    }
    return (
      <button
        key={it.id}
        className={`sb-item ${active === it.id ? "active" : ""} ${upsell ? "sb-item-upsell" : ""}`}
        onClick={() => !it.badge && onSelect(it.id)}
        disabled={!!it.badge}
        style={it.badge ? { opacity: 0.45, cursor: "default" } : {}}
        title={upsell ? "Funcionalidade PRO — clique pra ver detalhes" : it.label}
      >
        <Icon name={it.icon} style={(active !== it.id && ICON_TINTS[it.icon]) ? { color: ICON_TINTS[it.icon] } : undefined} />
        <span className="label">{it.label}</span>
        {upsell && <span className="sb-item-badge-pro">PRO</span>}
        {it.badge && <span className="badge">{it.badge}</span>}
      </button>
    );
  };
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sb-brand">
        <img src="assets/bgp-logo-white.png" alt="BGP" className="sb-logo-img" />
      </div>
      <div className="sb-scroll">
        <div className="sb-section">Power BI</div>
        {general.map(renderItem)}
        <div className="sb-section">Outras Análises</div>
        {others.map(renderItem)}
      </div>
      <div className="sb-user">
        <div className="avatar">AS</div>
        <div className="who">
          <b>Distribuidora XYZ</b>
          <span>Cliente · BGP GO</span>
        </div>
      </div>
    </aside>
  );
};

const PAGE_TITLES = {
  overview: "Visão Geral",
  indicators: "Indicadores",
  receita: "Receita",
  despesa: "Despesa",
  fluxo: "Fluxo de Caixa",
  tesouraria: "Tesouraria",
  comparativo: "Comparativo",
  relatorio: "Relatório IA",
  faturamento_produto: "Faturamento por Produto",
  curva_abc: "Curva ABC de Produtos",
  marketing: "Marketing ADS",
  valuation: "Valuation",
  hierarquia: "Hierarquia ADS",
  detalhado: "Detalhado",
  profunda_cliente: "Profunda Cliente",
  crm: "CRM",
};

const DATE_RANGES = [
  { id: "hoje",   label: "Hoje" },
  { id: "semana", label: "Semana" },
  { id: "mes",    label: "Mês" },
  { id: "ano",    label: "Ano" },
];

const DateRangeSeg = ({ value, onChange }) => (
  <div className="seg date-range-seg">
    {DATE_RANGES.map(r => (
      <button key={r.id} className={value === r.id ? "active" : ""} onClick={() => onChange(r.id)}>{r.label}</button>
    ))}
  </div>
);

const STATUS_FILTERS = [
  { id: "realizado", label: "Realizado" },
  { id: "a_pagar_receber", label: "A pagar/receber" },
  { id: "tudo", label: "Tudo" },
];

const StatusFilterSeg = ({ value, onChange }) => (
  <div className="seg status-filter-seg" title="Filtro de status do lançamento">
    {STATUS_FILTERS.map(s => (
      <button key={s.id} className={value === s.id ? "active" : ""} onClick={() => onChange(s.id)}>{s.label}</button>
    ))}
  </div>
);

const YearSelect = ({ value, onChange, available }) => {
  const years = available && available.length ? available : [value];
  return (
    <select
      className="header-year"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      title="Ano de referência"
    >
      {years.map(y => <option key={y} value={y}>{y}</option>)}
    </select>
  );
};

const MONTH_OPTS = [
  { v: 0, label: "Ano completo" },
  { v: 1, label: "Janeiro" }, { v: 2, label: "Fevereiro" }, { v: 3, label: "Março" },
  { v: 4, label: "Abril" }, { v: 5, label: "Maio" }, { v: 6, label: "Junho" },
  { v: 7, label: "Julho" }, { v: 8, label: "Agosto" }, { v: 9, label: "Setembro" },
  { v: 10, label: "Outubro" }, { v: 11, label: "Novembro" }, { v: 12, label: "Dezembro" },
];

const MonthSelect = ({ value, onChange }) => (
  <select
    className="header-year"
    value={value || 0}
    onChange={e => onChange(Number(e.target.value))}
    title="Mês de referência (Ano completo = todos)"
  >
    {MONTH_OPTS.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
  </select>
);

// BiExportButton: modal com checkboxes pra exportar telas selecionadas como PDF
const BI_EXPORT_PAGES = [
  { id: "overview", label: "Visão Geral" },
  { id: "receita", label: "Receita" },
  { id: "despesa", label: "Despesa" },
  { id: "fluxo", label: "Fluxo de Caixa" },
  { id: "tesouraria", label: "Tesouraria" },
  { id: "comparativo", label: "Comparativo" },
  { id: "relatorio", label: "Relatório IA" },
  { id: "valuation", label: "Valuation" },
  { id: "indicators", label: "Indicadores" },
  { id: "faturamento_produto", label: "Faturamento por Produto" },
  { id: "curva_abc", label: "Curva ABC" },
  { id: "marketing", label: "Marketing ADS" },
  { id: "hierarquia", label: "Hierarquia ADS" },
  { id: "detalhado", label: "Detalhado" },
  { id: "profunda_cliente", label: "Profunda Cliente" },
  { id: "crm", label: "CRM" },
];

const BiExportButton = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(() => new Set(BI_EXPORT_PAGES.map(p => p.id)));
  const toggle = (id) => {
    setSelected(s => {
      const ns = new Set(s);
      if (ns.has(id)) ns.delete(id); else ns.add(id);
      return ns;
    });
  };
  const submit = () => {
    if (selected.size === 0) return;
    const ordered = BI_EXPORT_PAGES.filter(p => selected.has(p.id)).map(p => p.id);
    if (window.startBiExport) window.startBiExport(ordered);
    setOpen(false);
  };
  return (
    <>
      <button className="btn-ghost hd-export-bi" onClick={() => setOpen(true)} title="Exportar BI inteiro como PDF">
        <Icon name="download" /> <span>Exportar BI</span>
      </button>
      {open && (
        <div className="drawer-overlay no-print" onClick={() => setOpen(false)}>
          <div className="card bi-export-modal" onClick={e => e.stopPropagation()}>
            <h2 className="card-title">Exportar BI como PDF</h2>
            <p style={{ color: "var(--fg-2)", marginTop: 8, fontSize: 13 }}>
              Selecione as telas para incluir no PDF. Cada tela vira uma página A4 com o tema escuro mantido.
            </p>
            <div className="bi-export-grid">
              {BI_EXPORT_PAGES.map(p => (
                <label key={p.id} className="bi-export-row">
                  <input
                    type="checkbox"
                    checked={selected.has(p.id)}
                    onChange={() => toggle(p.id)}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
            <div className="bi-export-actions">
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-ghost" onClick={() => setSelected(new Set(BI_EXPORT_PAGES.map(p => p.id)))}>Todas</button>
                <button className="btn-ghost" onClick={() => setSelected(new Set())}>Nenhuma</button>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-ghost" onClick={() => setOpen(false)}>Cancelar</button>
                <button className="btn-primary" onClick={submit} disabled={selected.size === 0}>
                  Exportar ({selected.size})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Header: breadcrumb + YearSelect + MonthSelect + StatusFilter
const Header = ({ page, onToggleSidebar, statusFilter, setStatusFilter, year, setYear, month, setMonth }) => {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('bi.theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); }
    catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('bi.theme', theme); } catch {}
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  return (
    <header className="header">
      <button className="hd-icon-btn hd-menu-btn" title="Menu" onClick={onToggleSidebar}><Icon name="menu" /></button>
      <div className="breadcrumb">
        <span>Cliente</span>
        <Icon name="chevronRight" />
        <span>BI Financeiro</span>
        <Icon name="chevronRight" />
        <b>{PAGE_TITLES[page] || "Visão Geral"}</b>
      </div>
      <div style={{ flex: 1 }} />
      {setYear && <YearSelect value={year} onChange={setYear} available={window.AVAILABLE_YEARS} />}
      {setMonth && <MonthSelect value={month} onChange={setMonth} />}
      {setStatusFilter && <StatusFilterSeg value={statusFilter} onChange={setStatusFilter} />}
      <BiExportButton />
      <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}>
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
      </button>
    </header>
  );
};

// vertical bars (kept)
// Click handlers: onBarClick(monthData, idx). activeIdx adds .active class; outros ficam .dimmed
const MonthlyBars = ({ data, height = 230, type = "both", showLabels = true, onBarClick, activeIdx }) => {
  const max = Math.max(...data.map(d => Math.max(d.receita || 0, d.despesa || 0)));
  const grids = [0, 0.25, 0.5, 0.75, 1].map(p => p * max);
  const hasActive = activeIdx != null && activeIdx >= 0;
  return (
    <div style={{ position: "relative" }}>
      <div className="vbar-axis" style={{ height: height - 24 }}>
        {grids.map((g, i) => (<div key={i} className="grid" style={{ bottom: `${(g / max) * 100}%` }} />))}
        {grids.map((g, i) => (<div key={"l"+i} className="glabel" style={{ bottom: `${(g / max) * 100}%` }}>{window.BIT.fmtK(g)}</div>))}
      </div>
      <div className="vbar-chart" style={{ height }}>
        {data.map((d, i) => {
          const rH = ((d.receita || 0) / max) * 100;
          const dH = ((d.despesa || 0) / max) * 100;
          const cls = "vbar-col" + (onBarClick ? " clickable" : "") +
            (hasActive && i === activeIdx ? " active" : "") +
            (hasActive && i !== activeIdx ? " dimmed" : "");
          return (
            <div key={i} className={cls}
              onClick={onBarClick ? () => onBarClick(d, i) : undefined}
              style={onBarClick ? { cursor: "pointer" } : undefined}
            >
              <div className="stack">
                {(type === "both" || type === "receita") && (
                  <div className="bar" style={{ height: `${rH}%` }} title={`Receita: ${window.BIT.fmt(d.receita)}`}>
                    {showLabels && <span className="v">{window.BIT.fmtK(d.receita)}</span>}
                  </div>
                )}
                {(type === "both" || type === "despesa") && (
                  <div className="bar red" style={{ height: `${dH}%` }} title={`Despesa: ${window.BIT.fmt(d.despesa)}`}>
                    {showLabels && type === "despesa" && <span className="v">{window.BIT.fmtK(d.despesa)}</span>}
                  </div>
                )}
              </div>
              <span className="x">{d.m.slice(0, 3)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SingleBars = ({ values, labels, color = "green", height = 200, onBarClick, activeIdx }) => {
  const max = Math.max(...values);
  const hasActive = activeIdx != null && activeIdx >= 0;
  return (
    <div className="vbar-chart" style={{ height }}>
      {values.map((v, i) => {
        const h = (v / max) * 100;
        const cls = "vbar-col" + (onBarClick ? " clickable" : "") +
          (hasActive && i === activeIdx ? " active" : "") +
          (hasActive && i !== activeIdx ? " dimmed" : "");
        return (
          <div key={i} className={cls}
            onClick={onBarClick ? () => onBarClick(v, i, labels[i]) : undefined}
            style={onBarClick ? { cursor: "pointer" } : undefined}
          >
            <div className="stack">
              <div className={`bar ${color === "red" ? "red" : ""}`} style={{ height: `${h}%`, width: 22, background: color === "cyan" ? "var(--cyan)" : (color === "red" ? "var(--red)" : "var(--green)") }} title={window.BIT.fmt(v)}>
                <span className="v">{window.BIT.fmtK(v)}</span>
              </div>
            </div>
            <span className="x">{labels[i].slice(0, 3)}</span>
          </div>
        );
      })}
    </div>
  );
};

const DailyBars = ({ values, color = "green", onBarClick, activeIdx }) => {
  const max = Math.max(...values);
  const subPeaks = values.map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v).slice(0, 3).map(o => o.i);
  const hasActive = activeIdx != null && activeIdx >= 0;
  return (
    <div className="daily">
      <div className="daily-bars">
        {values.map((v, i) => {
          const h = (v / max) * 100;
          const cls = `b ${color === "red" ? "red" : ""} ${subPeaks.includes(i) ? "peak" : ""}` +
            (hasActive && i === activeIdx ? " active" : "") +
            (hasActive && i !== activeIdx ? " dimmed" : "");
          return (
            <div key={i} className={cls}
              style={{ height: `${Math.max(h, 1)}%`, cursor: onBarClick ? "pointer" : undefined }}
              data-v={window.BIT.fmtK(v)}
              title={`Dia ${i + 1}: ${window.BIT.fmt(v)}`}
              onClick={onBarClick ? () => onBarClick(i, v) : undefined}
            />
          );
        })}
      </div>
      <div className="daily-x">
        <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span><span>25</span><span>31</span>
      </div>
    </div>
  );
};

// Stacked area chart — receita (verde) sobre despesa (vermelho)
const StackedArea = ({ data, height = 320, showAxis = true }) => {
  const w = 1000, h = height;
  const padX = 50, padTop = 16, padBottom = 30;
  const all = data.flatMap(d => [d.receita, d.despesa]);
  const min = 0;
  const max = Math.max(...all) * 1.1;
  const range = max - min;
  const stepX = (w - padX * 2) / (data.length - 1);

  const pts = (key) => data.map((d, i) => {
    const x = padX + i * stepX;
    const y = padTop + (1 - (d[key] - min) / range) * (h - padTop - padBottom);
    return [x, y];
  });
  const curve = (points) => {
    if (points.length < 2) return "";
    let p = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const cx = (x0 + x1) / 2;
      p += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return p;
  };

  const ptsR = pts("receita");
  const ptsD = pts("despesa");
  const baseY = padTop + (h - padTop - padBottom);

  const areaR = curve(ptsR) + ` L ${ptsR[ptsR.length - 1][0]} ${baseY} L ${ptsR[0][0]} ${baseY} Z`;
  const areaD = curve(ptsD) + ` L ${ptsD[ptsD.length - 1][0]} ${baseY} L ${ptsD[0][0]} ${baseY} Z`;

  // y axis ticks
  const ticks = 5;
  const tickVals = Array.from({ length: ticks }, (_, i) => (max / (ticks - 1)) * i);

  return (
    <svg className="trend" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id="ga-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.03"/>
        </linearGradient>
        <linearGradient id="ga-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.03"/>
        </linearGradient>
      </defs>
      {showAxis && tickVals.map((tv, i) => {
        const y = padTop + (1 - tv / max) * (h - padTop - padBottom);
        return (
          <g key={i}>
            <line x1={padX} y1={y} x2={w - 10} y2={y} stroke="oklch(1 0 0 / 0.04)" strokeDasharray="3 4"/>
            <text x={padX - 8} y={y + 3} textAnchor="end" className="axis-text">R$ {(tv/1e6).toFixed(1).replace(".",",")}M</text>
          </g>
        );
      })}
      <path d={areaR} fill="url(#ga-green)" />
      <path d={areaD} fill="url(#ga-red)" />
      <path d={curve(ptsR)} fill="none" stroke="#22c55e" strokeWidth="2"/>
      <path d={curve(ptsD)} fill="none" stroke="#ef4444" strokeWidth="2"/>
      {showAxis && data.map((d, i) => {
        const x = padX + i * stepX;
        return <text key={i} x={x} y={h - 10} textAnchor="middle" className="axis-text" style={{ textTransform: "capitalize" }}>{d.m.slice(0,3)}</text>;
      })}
    </svg>
  );
};

// Trend (line + area)
const TrendChart = ({ values, labels, height = 160, color = "var(--cyan)", showPoints = true, showLabels = true, gradientId = "tg" }) => {
  const w = 1000, h = height;
  const padX = 40, padY = 32;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (w - padX * 2) / (values.length - 1);
  const points = values.map((v, i) => {
    const x = padX + i * stepX;
    const y = padY + (1 - (v - min) / range) * (h - padY * 2);
    return [x, y];
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = path + ` L ${points[points.length - 1][0]} ${h - padY} L ${points[0][0]} ${h - padY} Z`;
  return (
    <svg className="trend" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.30"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map(i => {
        const y = padY + (i / 3) * (h - padY * 2);
        return <line key={i} className="grid" x1={padX} y1={y} x2={w - padX} y2={y} />;
      })}
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {showPoints && points.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="3" fill={color}/>
          {showLabels && (
            <text className="point-label" x={p[0]} y={p[1] - 8} textAnchor="middle">{window.BIT.fmtK(values[i])}</text>
          )}
        </g>
      ))}
      {labels && labels.map((l, i) => (
        <text key={"x"+i} className="axis-text" x={padX + i * stepX} y={h - 6} textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
};

const MultiLine = ({ series, labels, height = 180 }) => {
  const w = 1000, h = height;
  const padX = 30, padY = 24;
  const all = series.flatMap(s => s.values);
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;
  const stepX = (w - padX * 2) / (series[0].values.length - 1);
  return (
    <svg className="trend" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height }}>
      {[0, 1, 2, 3].map(i => {
        const y = padY + (i / 3) * (h - padY * 2);
        return <line key={i} className="grid" x1={padX} y1={y} x2={w - padX} y2={y} />;
      })}
      {series.map((s, si) => {
        const points = s.values.map((v, i) => {
          const x = padX + i * stepX;
          const y = padY + (1 - (v - min) / range) * (h - padY * 2);
          return [x, y];
        });
        const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
        return (
          <g key={si}>
            <path d={path} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
            {points.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill={s.color}/>)}
          </g>
        );
      })}
      {labels && labels.map((l, i) => (
        <text key={"x"+i} className="axis-text" x={padX + i * stepX} y={h - 6} textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
};

// Sparkline (used in KPI tile)
const Spark = ({ values, color = "var(--cyan)", filled = true, height = 38 }) => {
  const w = 100, h = height;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, (1 - (v - min) / range) * (h - 6) + 3]);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const id = `sp-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {filled && (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
              <stop offset="100%" stopColor={color} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill={`url(#${id})`} />
        </>
      )}
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// Composition donut
const Donut = ({ segments, size = 180, thickness = 22 }) => {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="oklch(0.20 0.012 240)" strokeWidth={thickness}/>
      {segments.map((seg, i) => {
        const len = (seg.value / total) * c;
        const off = c - acc;
        acc += len;
        return (
          <circle
            key={i}
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={seg.color} strokeWidth={thickness}
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={off}
            transform={`rotate(-90 ${size/2} ${size/2})`}
            strokeLinecap="butt"
          />
        );
      })}
    </svg>
  );
};

// Horizontal bar list (with thin track) — used for bank balances/category
// onItemClick(item, idx) torna a linha clicavel; activeName destaca a linha ativa.
const BarListLine = ({ items, color = "cyan", onItemClick, activeName }) => {
  const max = Math.max(...items.map(it => it.value));
  const hasActive = activeName != null;
  return (
    <div className="bar-list with-bars">
      {items.map((it, i) => {
        const w = (it.value / max) * 100;
        const isActive = hasActive && it.name === activeName;
        const cls = "bar-row" + (onItemClick ? " clickable" : "") +
          (isActive ? " active" : "") +
          (hasActive && !isActive ? " dimmed" : "");
        return (
          <div key={i} className={cls}
            onClick={onItemClick ? () => onItemClick(it, i) : undefined}
            style={onItemClick ? { cursor: "pointer" } : undefined}
          >
            <div className="row-meta">
              <span className="label">{it.name}</span>
              <span className="val">{window.BIT.fmt(it.value)}</span>
            </div>
            <div className="track"><div className={`fill ${color}`} style={{ width: `${w}%` }} /></div>
          </div>
        );
      })}
    </div>
  );
};

const BarListLegend = ({ items, total }) => {
  return (
    <div className="bar-list">
      {items.map((it, i) => {
        const pct = (it.value / total) * 100;
        return (
          <div key={i} className="bar-row">
            <div className="top">
              <span className="dot" style={{ background: it.color }} />
              <span className="label">{it.name}</span>
            </div>
            <div>
              <span className="val">{window.BIT.fmt(it.value)}</span>
              <span className="pct">{pct.toFixed(2).replace(".",",")}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const BarList = ({ items, color = "green", valueKey = "value", labelKey = "name", onItemClick, activeName }) => {
  const mapped = items.map(it => ({ name: it[labelKey], value: it[valueKey] }));
  // se vier onItemClick, propaga o item ORIGINAL (nao o mapeado) pra page poder usar campos extras
  const handler = onItemClick
    ? (mappedIt, idx) => onItemClick(items[idx], idx)
    : undefined;
  return <BarListLine items={mapped} color={color} onItemClick={handler} activeName={activeName} />;
};

const DivergingBars = ({ values, labels }) => {
  const maxAbs = Math.max(...values.map(v => Math.abs(v)));
  return (
    <div className="bar-list">
      {values.map((v, i) => {
        const w = (Math.abs(v) / maxAbs) * 50;
        const positive = v >= 0;
        return (
          <div key={i} className="div-row">
            <div className="label">{labels[i]}</div>
            <div style={{ display: "flex", height: 12, position: "relative" }}>
              <div style={{ flex: 1, position: "relative", borderRight: "1px solid oklch(1 0 0 / 0.08)" }}>
                {!positive && (<div style={{ position: "absolute", right: 0, top: 0, height: "100%", width: `${w * 2}%`, background: "var(--red)", borderRadius: "3px 0 0 3px" }} />)}
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                {positive && (<div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${w * 2}%`, background: "var(--green)", borderRadius: "0 3px 3px 0" }} />)}
              </div>
            </div>
            <div className="val" style={{ color: positive ? "var(--green)" : "var(--red)" }}>{window.BIT.fmtK(v)}</div>
          </div>
        );
      })}
    </div>
  );
};

// KPI Tile (big numbers + sparkline). `tone` selects gradient: green / red / cyan / amber.
// `nonMonetary` hides the R$ prefix (for counts: clients, suppliers, etc).
const KpiTile = ({ label, value, unit, deltaPct, deltaDir, sparkValues, sparkColor, tone, nonMonetary }) => {
  return (
    <div className={`kpi-tile ${tone || ""}`}>
      <div>
        <div className="kpi-label">{label}</div>
        <div className="kpi-value">
          {!nonMonetary && <span className="currency">R$</span>}
          {value}
          {unit && <span className="unit">{unit}</span>}
        </div>
        {deltaPct != null && (
          <div className={["kpi-delta", deltaDir, Math.abs(deltaPct) > 20 ? "strong" : ""].filter(Boolean).join(" ")}>
            <Icon name={deltaDir === "up" ? "arrowUp" : "arrowDown"} style={{ width: 13, height: 13 }} />
            {Math.abs(deltaPct).toFixed(1).replace(".", ",")}%
          </div>
        )}
      </div>
      {sparkValues && (
        <div className="spark-wrap">
          <Spark values={sparkValues} color={sparkColor || "var(--cyan)"} />
        </div>
      )}
    </div>
  );
};

// PageHeader — header padronizado pra todas as pages (breadcrumb + title + subtitle + actions)
const PageHeader = ({ title, subtitle, breadcrumb, actions }) => {
  const crumbs = breadcrumb || ["Demo XYZ", title];
  return (
    <div className="page-title">
      <div className="ph-info">
        <div className="crumbs">
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep">›</span>}
              <span className={i === crumbs.length - 1 ? "current" : ""}>{c}</span>
            </React.Fragment>
          ))}
        </div>
        <h1>{title}</h1>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>
      {actions && <div className="actions">{actions}</div>}
    </div>
  );
};

// Default filter state — used for active-count + clear-all
const DEFAULT_FILTERS = {
  regime: "caixa",
  status: "Todos status",
  categoria: "Todas categorias",
  cc: "Todos centros de custo",
  dateFrom: "",
  dateTo: "",
};

const countActiveFilters = (f) => {
  let n = 0;
  if (f.regime !== DEFAULT_FILTERS.regime) n++;
  if (f.status !== DEFAULT_FILTERS.status) n++;
  if (f.categoria !== DEFAULT_FILTERS.categoria) n++;
  if (f.cc !== DEFAULT_FILTERS.cc) n++;
  if (f.dateFrom || f.dateTo) n++;
  return n;
};

// Toolbar de filtros inline (substitui o modal removido).
// Lê categorias únicas de window.ALL_TX e seta drilldown global.
const InlineFilterBar = ({ kindHint, drilldown, setDrilldown }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [grupo, setGrupo] = React.useState(() => {
    if (kindHint === "r") return "Receita";
    if (kindHint === "d") return "Despesa";
    return drilldown && drilldown.type === "kind"
      ? (drilldown.value === "r" ? "Receita" : "Despesa")
      : "Todos";
  });
  React.useEffect(() => {
    if (kindHint === "r") setGrupo("Receita");
    else if (kindHint === "d") setGrupo("Despesa");
  }, [kindHint]);

  // Lê categorias únicas filtradas pelo grupo
  const categorias = React.useMemo(() => {
    const all = window.ALL_TX || [];
    const set = new Set();
    for (const row of all) {
      const [kind, , , categoria] = row;
      if (!categoria) continue;
      if (grupo === "Receita" && kind !== "r") continue;
      if (grupo === "Despesa" && kind !== "d") continue;
      set.add(categoria);
    }
    return [...set].sort();
  }, [grupo]);

  const filtered = React.useMemo(() => {
    if (!searchTerm) return categorias.slice(0, 50);
    const q = searchTerm.toLowerCase();
    return categorias.filter(c => c.toLowerCase().includes(q)).slice(0, 50);
  }, [categorias, searchTerm]);

  const activeCategoria = drilldown && drilldown.type === "categoria" ? drilldown.value : null;

  const setGrupoAndClearCat = (v) => {
    setGrupo(v);
    if (drilldown && drilldown.type === "categoria") setDrilldown(null);
  };
  const handleCatSelect = (c) => {
    setDrilldown({ type: "categoria", value: c, label: c });
    setSearchOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="inline-filterbar">
      {!kindHint && (
        <label className="ifb-item">
          <span>Grupo</span>
          <select className="filter-select" value={grupo} onChange={e => setGrupoAndClearCat(e.target.value)}>
            <option>Todos</option>
            <option>Receita</option>
            <option>Despesa</option>
          </select>
        </label>
      )}
      <label className="ifb-item ifb-search-wrap">
        <span>Categoria</span>
        <div className="ifb-search-trigger" onClick={() => setSearchOpen(o => !o)}>
          <span style={{ flex: 1 }}>
            {activeCategoria
              ? <span style={{ color: "var(--cyan)", fontWeight: 600 }}>{activeCategoria.length > 28 ? activeCategoria.slice(0, 28) + "…" : activeCategoria}</span>
              : <span style={{ color: "var(--mute)" }}>Todas categorias</span>}
          </span>
          <Icon name="chevronRight" />
        </div>
        {searchOpen && (
          <div className="ifb-popover">
            <input
              autoFocus
              type="text"
              placeholder={`Pesquisar (${categorias.length} categorias)`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="ifb-search-input"
            />
            <div className="ifb-popover-list">
              <div className="ifb-popover-item" onClick={() => { setDrilldown(null); setSearchOpen(false); setSearchTerm(""); }}>
                <i>Todas categorias</i>
              </div>
              {filtered.map(c => (
                <div key={c}
                  className={`ifb-popover-item ${activeCategoria === c ? "active" : ""}`}
                  onClick={() => handleCatSelect(c)}>
                  {c}
                </div>
              ))}
              {filtered.length === 0 && <div className="ifb-popover-item" style={{ color: "var(--mute)" }}>Nada encontrado</div>}
            </div>
          </div>
        )}
      </label>
      {(activeCategoria || (drilldown && drilldown.type !== "categoria")) && (
        <button className="btn-ghost" onClick={() => setDrilldown(null)} title="Limpar filtros">
          Limpar
        </button>
      )}
    </div>
  );
};

// Compact button that opens the side drawer
const Filters = ({ filters, onOpen, page }) => {
  if (page === "comparativo") return null;
  const active = countActiveFilters(filters);
  return (
    <button className="btn-ghost filters-btn" onClick={onOpen}>
      <Icon name="sliders" /> Filtros
      {active > 0 && <span className="filters-badge">{active}</span>}
    </button>
  );
};

// Export current view (window.print → Save as PDF)
const ExportButton = () => (
  <button className="btn-ghost" onClick={() => window.print()}>
    <Icon name="download" /> Exportar
  </button>
);

const FiltersDrawer = ({ open, onClose, filters, setFilters }) => {
  if (!open) return null;
  const update = (patch) => setFilters({ ...filters, ...patch });
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <header className="drawer-header">
          <h2>Filtros</h2>
          <button className="drawer-close" onClick={onClose} aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="drawer-body">
          <div className="drawer-group">
            <label>Regime</label>
            <div className="seg full">
              <button className={filters.regime === "caixa" ? "active" : ""} onClick={() => update({ regime: "caixa" })}>
                <Icon name="cash" /> Caixa
              </button>
              <button className={filters.regime === "competencia" ? "active" : ""} onClick={() => update({ regime: "competencia" })}>
                <Icon name="accrual" /> Competência
              </button>
            </div>
          </div>
          <div className="drawer-group">
            <label>Status</label>
            <select className="filter-select" value={filters.status} onChange={(e) => update({ status: e.target.value })}>
              <option>Todos status</option><option>Pago</option><option>A pagar</option><option>Atrasado</option>
            </select>
          </div>
          <div className="drawer-group">
            <label>Categoria</label>
            <select className="filter-select" value={filters.categoria} onChange={(e) => update({ categoria: e.target.value })}>
              <option>Todas categorias</option><option>Folha</option><option>Marketing</option><option>Impostos</option>
              <option>Infra & Cloud</option><option>Software & SaaS</option><option>Comissões</option>
            </select>
          </div>
          <div className="drawer-group">
            <label>Centro de custo</label>
            <select className="filter-select" value={filters.cc} onChange={(e) => update({ cc: e.target.value })}>
              <option>Todos centros de custo</option><option>Comercial</option><option>Operações</option><option>Financeiro</option>
            </select>
          </div>
          <div className="drawer-group">
            <label>Período personalizado</label>
            <div className="date-range-pair">
              <input type="date" className="filter-select" value={filters.dateFrom} onChange={(e) => update({ dateFrom: e.target.value })} />
              <span className="date-range-sep">→</span>
              <input type="date" className="filter-select" value={filters.dateTo} onChange={(e) => update({ dateTo: e.target.value })} />
            </div>
          </div>
        </div>
        <footer className="drawer-footer">
          <button className="btn-ghost" onClick={() => setFilters({ ...DEFAULT_FILTERS })}>Limpar</button>
          <button className="btn-primary" onClick={onClose}>Aplicar</button>
        </footer>
      </aside>
    </div>
  );
};

// Chip que indica que o usuario filtrou um pedaco da tela clicando num grafico.
// drilldown shape: { type: 'mes'|'categoria'|'cliente'|'fornecedor'|'dia', value, label }
const DrilldownBadge = ({ drilldown, onClear }) => {
  if (!drilldown) return null;
  return (
    <div className="drilldown-badge">
      <span className="dd-label">Filtrando: <b>{drilldown.label}</b></span>
      <button className="dd-clear" onClick={onClear} aria-label="Limpar filtro">× Limpar</button>
    </div>
  );
};

// Helpers usados nas Pages para filtrar o EXTRATO conforme o drilldown ativo.
// EXTRATO row layout: [data DD/MM/YYYY, ccusto, categoria, cliente/fornecedor, valor, status]
function extratoMonthKey(dateStr) {
  // "04/05/2026" -> "2026-05"
  if (!dateStr || typeof dateStr !== "string") return "";
  const parts = dateStr.split("/");
  if (parts.length !== 3) return "";
  return `${parts[2]}-${parts[1]}`;
}
function applyDrilldown(extrato, dd) {
  if (!dd || !Array.isArray(extrato)) return extrato;
  if (dd.type === "mes") {
    return extrato.filter(e => extratoMonthKey(e[0]) === dd.value);
  }
  if (dd.type === "categoria") {
    return extrato.filter(e => e[2] === dd.value);
  }
  if (dd.type === "cliente" || dd.type === "fornecedor") {
    return extrato.filter(e => e[3] === dd.value);
  }
  return extrato;
}

Object.assign(window, {
  Icon, Sidebar, Header, Filters, FiltersDrawer, InlineFilterBar, ExportButton, DEFAULT_FILTERS,
  MonthlyBars, SingleBars, DailyBars, StackedArea, TrendChart, MultiLine,
  BarList, BarListLine, BarListLegend, DivergingBars, Donut, Spark, KpiTile, PageHeader,
  PAGE_TITLES, StatusFilterSeg, STATUS_FILTERS,
  DrilldownBadge, applyDrilldown, extratoMonthKey,
  useCountUp,
});
