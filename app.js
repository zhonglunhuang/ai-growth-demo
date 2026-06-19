/* ============================================================
   飛輪 Flywheel OS · 應用邏輯（純前端 SPA · hash 路由）
   ============================================================ */
(() => {
  const DB = window.DB;

  /* ---------- 圖示（內聯 SVG，繼承 currentColor） ---------- */
  const ICON = {
    overview: '<path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"/>',
    content:  '<path d="M5 3h11l4 4v14H5V3Zm9 1v4h4M8 13h8M8 17h6M8 9h3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    ads:      '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Zm13-3a5 5 0 0 1 0 8M18.5 5.5a8 8 0 0 1 0 13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    cs:       '<path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2v-6h4M4 13v4a2 2 0 0 0 2 2h2v-6H4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    b2b:      '<path d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    decision: '<path d="M12 3a4 4 0 0 0-4 4 3.5 3.5 0 0 0-2 6.3A3.5 3.5 0 0 0 8 20a3 3 0 0 0 4 0 3 3 0 0 0 4 0 3.5 3.5 0 0 0 2-6.7A3.5 3.5 0 0 0 16 7a4 4 0 0 0-4-4ZM12 3v17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    blueprint:'<path d="M4 4h16v16H4V4Zm0 6h16M10 4v16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    tag:      '<path d="M3 12V4h8l9 9-8 8-9-9Zm5-4a1 1 0 1 0 0-.001Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    coin:     '<path d="M12 3v18M8 7h6a2 2 0 0 1 0 4H9a2 2 0 0 0 0 4h7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    target:   '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    chat:     '<path d="M4 5h16v11H9l-4 3v-3H4V5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    doc:      '<path d="M6 3h9l3 3v15H6V3Zm9 12H9m6-4H9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    up:       '<path d="M12 19V6m-6 6 6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    down:     '<path d="M12 5v13m-6-6 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    bolt:     '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    check:    '<path d="M5 12l4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    arrow:    '<path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    sparkle:  '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" fill="currentColor"/>',
    alert:    '<path d="M12 4 2.5 20h19L12 4Zm0 6v5m0 3v.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    voice:    '<path d="M12 4v16M8 8v8M16 8v8M4 11v2M20 11v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    book:     '<path d="M5 4h9a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm11 0h3v14h-3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    cpu:      '<rect x="6" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    plug:     '<path d="M9 3v6m6-6v6M6 9h12v3a6 6 0 0 1-12 0V9Zm6 9v3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    robot:    '<rect x="4" y="8" width="16" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 4v4M9 13h.5m5 0h.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    biz:      '<path d="M4 21V8l8-4 8 4v13M4 21h16M9 21v-5h6v5M8 11h.5m3 0h.5m3 0h.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  };
  const icon = (name, cls = '') =>
    `<svg class="${cls}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">${ICON[name] || ''}</svg>`;

  /* ---------- 導覽結構 ---------- */
  const NAV = [
    { group: '營運' },
    { id: 'overview', name: '營運總覽', ic: 'overview' },
    { group: '五大模組' },
    { id: 'content',  name: '① 內容引擎', ic: 'content' },
    { id: 'ads',      name: '② 攻擊端 · 廣告', ic: 'ads', badge: '自動' },
    { id: 'cs',       name: '③ 防守端 · 客服', ic: 'cs' },
    { id: 'b2b',      name: '④ 通路 B2B', ic: 'b2b' },
    { id: 'decision', name: '⑤ 決策大腦', ic: 'decision' },
    { group: '商業' },
    { id: 'blueprint', name: '系統藍圖', ic: 'blueprint' },
    { id: 'packages',  name: '服務包報價', ic: 'tag' },
  ];

  /* ---------- 狀態 ---------- */
  const CLIENT_SCALE = { haiyan: 1, shanhai: 0.72, lvye: 0.42, haibao: 0.64 };
  const state = { client: DB.clients[0].id, route: 'overview' };

  /* ---------- 工具 ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const currentClient = () => DB.clients.find((c) => c.id === state.client);

  function fmtVal(v, fmt, opt = {}) {
    if (fmt === 'money') return Math.round(v).toLocaleString('en-US');
    if (fmt === 'x') return v.toFixed(opt.decimals ?? 1);
    if (fmt === 'pct') return Math.round(v).toString();
    return Math.round(v).toString();
  }
  function animateCounter(node, target, { fmt, prefix = '', suffix = '', decimals = 0, dur = 1000 } = {}) {
    const t0 = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      node.innerHTML = prefix + fmtVal(target * e, fmt, { decimals }) + (suffix ? `<small>${suffix}</small>` : '');
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function polar(cx, cy, r, deg) {
    const a = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  /* ---------- 渲染：側邊欄 ---------- */
  function renderNav() {
    $('#nav').innerHTML = NAV.map((n) => {
      if (n.group) return `<div class="nav__group">${n.group}</div>`;
      const active = n.id === state.route ? ' is-active' : '';
      const badge = n.badge ? `<span class="nav__badge">${n.badge}</span>` : '';
      return `<button class="nav__item${active}" data-route="${n.id}">
        ${icon(n.ic, 'nav__ic')}<span>${n.name}</span>${badge}</button>`;
    }).join('');
    $('#nav').querySelectorAll('[data-route]').forEach((b) =>
      b.addEventListener('click', () => { location.hash = b.dataset.route; }));
  }

  /* ---------- 渲染：頂欄客戶切換 ---------- */
  function renderClientSwitch() {
    const c = currentClient();
    $('#clientName').textContent = c.name;
    $('#clientSwitch .client-switch__dot').style.background = c.color;

    const menu = $('#clientMenu');
    const toneClass = { pos: 'tag--pos', warn: 'tag--warn', neg: 'tag--neg' };
    menu.innerHTML = DB.clients.map((cl) => `
      <div class="client-opt ${cl.id === state.client ? 'is-active' : ''}" data-client="${cl.id}">
        <div class="client-opt__logo" style="background:${cl.color}">${cl.name[0]}</div>
        <div class="client-opt__meta">
          <strong>${cl.name}</strong>
          <small>${cl.industry} · 自 ${cl.since}</small>
        </div>
        <span class="client-opt__health ${toneClass[cl.healthTone]}">${cl.health}</span>
      </div>`).join('');
    menu.querySelectorAll('[data-client]').forEach((o) =>
      o.addEventListener('click', () => {
        state.client = o.dataset.client;
        menu.hidden = true;
        renderClientSwitch();
        render();
      }));
  }

  /* ============================================================
     視圖
     ============================================================ */
  const VIEWS = {};

  /* ---- 總覽 ---- */
  VIEWS.overview = () => {
    const c = currentClient();
    const scale = CLIENT_SCALE[c.id];
    const a = DB.account;
    const kpiHtml = a.kpis.map((k, i) => {
      const scaled = (k.fmt === 'money' || k.fmt === 'int') ? k.value * scale : k.value;
      return `<div class="kpi fade-in" style="animation-delay:${i * 60}ms">
        <div class="kpi__label">${icon(k.icon, 'ic')} ${k.label}</div>
        <div class="kpi__value" data-counter='${JSON.stringify({ target: scaled, fmt: k.fmt, prefix: k.prefix || '', suffix: k.suffix || '', decimals: k.decimals || 0 })}'>0</div>
        <div class="kpi__delta ${k.delta >= 0 ? 'up' : 'down'}">${icon(k.delta >= 0 ? 'up' : 'down')} ${k.delta >= 0 ? '+' : ''}${k.delta}${k.fmt === 'x' ? '' : (k.fmt === 'pct' ? ' pts' : '%')} 對比上月</div>
      </div>`;
    }).join('');

    const insightHtml = a.insights.map((ins) => `
      <div class="insight insight--${ins.module}">
        <div class="insight__icon">${icon('sparkle')}</div>
        <div class="insight__body">
          <div class="insight__src">${ins.src}</div>
          <p class="insight__text">${ins.text}</p>
          <div class="insight__action">
            <span class="insight__cta">${ins.cta} ${icon('arrow')}</span>
            <span class="insight__conf">${ins.conf}</span>
          </div>
        </div>
      </div>`).join('');

    return `
      <div class="page-head">
        <span class="page-head__eyebrow">${icon('sparkle')} AI 不只執行，直接給你結論</span>
        <h1>${c.name} · 營運總覽</h1>
        <p>${c.industry} · 合作方案：${c.pkgs.join('、')}。下方先給你 <b>今天該做的決策</b>，再展開五大模組的運轉狀況。</p>
      </div>

      <div class="grid grid-4">${kpiHtml}</div>

      <div class="section-title">${icon('sparkle')} 今日 AI 結論 · 直接告訴你資源放哪</div>
      <div class="grid" style="gap:14px">${insightHtml}</div>

      <div class="section-title">成長飛輪 · 五大模組怎麼越轉越快</div>
      <div class="card">
        <div class="flywheel-wrap">
          <div class="flywheel-stage">${flywheelSVG()}</div>
          <div class="flywheel-side">
            <div class="card__sub" style="margin-bottom:4px">內容帶來流量，流量產生數據，數據回頭優化產品與受眾，再餵回內容 —— 每轉一圈，下一圈更準、更省。</div>
            ${a.flywheel.map((n) => `
              <div class="fw-node-card">
                <span class="fw-node-card__dot" style="background:${n.color}"></span>
                <div class="fw-node-card__txt"><strong>${n.name}</strong><small>${n.sub}</small></div>
                <span class="fw-node-card__metric" style="color:${n.color}">${n.metric}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  };

  function flywheelSVG() {
    const cx = 190, cy = 190, R = 132;
    const nodes = DB.account.flywheel;
    const n = nodes.length;
    let spokes = '', dots = '', labels = '';
    nodes.forEach((nd, i) => {
      const ang = -90 + (i * 360) / n;
      const p = polar(cx, cy, R, ang);
      const lp = polar(cx, cy, R + 34, ang);
      spokes += `<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="${nd.color}" stroke-width="1.5" opacity=".25"/>`;
      dots += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="26" fill="#fff" stroke="${nd.color}" stroke-width="2.5"/>
               <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="9" fill="${nd.color}"/>`;
      const anchor = lp.x > cx + 12 ? 'start' : lp.x < cx - 12 ? 'end' : 'middle';
      labels += `<text x="${lp.x.toFixed(1)}" y="${(lp.y - 2).toFixed(1)}" text-anchor="${anchor}" font-size="12.5" font-weight="700" fill="#14152B">${nd.name}</text>
                 <text x="${lp.x.toFixed(1)}" y="${(lp.y + 13).toFixed(1)}" text-anchor="${anchor}" font-size="10.5" fill="#8B5CF6" font-weight="600">${nd.metric}</text>`;
    });
    return `
    <svg viewBox="0 0 380 380" class="chart-svg" style="max-width:380px;margin:auto" role="img" aria-label="成長飛輪示意圖">
      <defs>
        <linearGradient id="hub" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#5B53E8"/><stop offset="1" stop-color="#7C6CFF"/>
        </linearGradient>
      </defs>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#E8E9F2" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#16A06A" stroke-width="3"
        stroke-linecap="round" stroke-dasharray="70 760" transform="rotate(-90 ${cx} ${cy})">
        <animateTransform attributeName="transform" type="rotate" from="-90 ${cx} ${cy}" to="270 ${cx} ${cy}" dur="6s" repeatCount="indefinite"/>
      </circle>
      ${spokes}${dots}
      <circle cx="${cx}" cy="${cy}" r="46" fill="url(#hub)"/>
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="900" fill="#fff">飛輪</text>
      <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="9.5" fill="#E6E3FF" font-weight="600">AI 直接給結論</text>
      ${labels}
    </svg>`;
  }

  /* ---- ① 內容引擎 ---- */
  VIEWS.content = () => {
    const C = DB.content;
    const pipe = C.pipeline.map((s, i) => `
      <div class="pipe-step" data-step="${i}">
        <div class="pipe-step__dot">${icon(s.icon)}<span class="pipe-step__num">${i + 1}</span></div>
        <div class="pipe-step__txt"><strong>${s.name}</strong><small>${s.sub}</small></div>
      </div>${i < C.pipeline.length - 1 ? '<div class="pipe-arrow" data-arrow="' + i + '"></div>' : ''}`).join('');

    return `
      <div class="page-head">
        <span class="page-head__eyebrow" style="color:var(--m1);background:#EEF">① 核心引擎 · 內容自動化</span>
        <h1>內容引擎</h1>
        <p>掃描你的網站與競品 → 選題 → 產出文章架構與內文 → 自動配圖、延伸閱讀、補內部連結。數百到數千個 SKU 描述，從 2–3 天壓縮到約 15 分鐘。</p>
      </div>

      <div class="card card--pad" style="margin-bottom:18px">
        <div class="card__head"><div><div class="card__title">${icon('cpu')} 生成管線</div>
        <div class="card__sub">按「生成」會逐步跑完五個步驟，不是黑箱</div></div>
        <span class="tag" id="pipeState">待命</span></div>
        <div class="pipe" id="pipe">${pipe}</div>
      </div>

      <div class="gen-layout">
        <div class="card card--pad">
          <div class="field">
            <label>內容類型</label>
            <div class="chips" id="genType">
              <button class="chip is-on" data-type="blog">部落格文章</button>
              <button class="chip" data-type="sku">SKU 商品描述</button>
            </div>
          </div>
          <div class="field"><label>主題 / 選題</label>
            <select id="genTopic">${C.topics.map((t) => `<option>${t}</option>`).join('')}</select>
          </div>
          <div class="field"><label>品牌語氣（來自根基層）</label>
            <div class="chips" id="genTone">${C.tones.map((t, i) => `<button class="chip ${i === 1 ? 'is-on' : ''}" data-tone="${t}">${t}</button>`).join('')}</div>
          </div>
          <div class="field"><label>產出選項</label>
            <div class="chips">
              <button class="chip is-on">SEO 結構</button>
              <button class="chip is-on">自動配圖</button>
              <button class="chip is-on">內部連結</button>
              <button class="chip">延伸閱讀</button>
            </div>
          </div>
          <button class="btn btn--primary" id="genBtn" style="width:100%;justify-content:center">${icon('sparkle')} 用 AI 生成內容</button>
          <div class="stat-row">${C.stats.map((s) => `<div class="stat-pill"><strong>${s.num}</strong><small>${s.label}</small></div>`).join('')}</div>
        </div>

        <div class="gen-out">
          <div class="gen-out__bar">
            <span class="gen-out__dots"><i></i><i></i><i></i></span>
            <span class="gen-out__file" id="genFile">draft · untitled.md</span>
            <span class="gen-out__live" id="genLive"><span class="pulse"></span> Claude 生成中</span>
          </div>
          <div class="gen-stream" id="genStream">
            <div class="gen-empty">${icon('content')}<div>左側設定後按「生成」<br/>AI 會即時把文章寫出來</div></div>
          </div>
        </div>
      </div>

      <div id="seoSlot" class="mt"></div>`;
  };

  function seoCardHTML() {
    const s = DB.content.seo;
    return `
      <div class="card card--pad fade-in">
        <div class="card__head"><div class="card__title">${icon('target')} SEO 評分 · 產出即優化</div>
        <div class="seo-score"><span>${s.score}</span><small>/100</small></div></div>
        <div class="grid grid-2" style="gap:22px;align-items:center">
          <div>${s.sub.map((x) => `
            <div class="seo-row"><span>${x.name}</span>
            <span class="seo-row__bar"><i style="width:0%" data-w="${x.val}"></i></span>
            <b>${x.val}</b></div>`).join('')}</div>
          <div>
            <div class="card__sub" style="margin-bottom:8px">已鎖定關鍵字</div>
            <div class="chips" style="margin-bottom:14px">${s.keywords.map((k) => `<span class="chip is-on" style="cursor:default">${k}</span>`).join('')}</div>
            <div class="flex" style="gap:18px">
              <span class="tag tag--pos">${icon('check')} 已補 ${s.links} 條內部連結</span>
              <span class="tag tag--brand">已掃 142 篇舊文</span>
            </div>
            <div class="suggest-reco" style="margin-top:14px;background:#EEF;border-color:#D9D6FB">${icon('sparkle')}<div><strong>AI 結論：</strong>本篇切入「換季敏感」角度，正好補上競品 A 未涵蓋的搜尋缺口，預估 2 週內可進關鍵字前 3 頁。</div></div>
          </div>
        </div>
      </div>`;
  }

  function setStep(i, st) {
    const step = document.querySelector(`.pipe-step[data-step="${i}"]`);
    if (step) step.className = `pipe-step ${st ? 'is-' + st : ''}`;
    if (st === 'done') { const a = document.querySelector(`[data-arrow="${i}"]`); if (a) a.classList.add('is-done'); }
  }

  async function runGenerate() {
    const type = $('#genType .is-on')?.dataset.type || 'blog';
    const src = type === 'blog' ? DB.content.blog : DB.content.sku;
    const btn = $('#genBtn'), live = $('#genLive'), stream = $('#genStream'), file = $('#genFile');
    btn.disabled = true; live.classList.add('on');
    $('#seoSlot').innerHTML = '';
    DB.content.pipeline.forEach((_, i) => setStep(i, ''));
    file.textContent = type === 'blog' ? 'draft · blog-post.md' : 'draft · sku-description.md';
    stream.innerHTML = `<div class="gen-empty"><span class="typing"><i></i><i></i><i></i></span><div>跑生成管線中…</div></div>`;

    // 管線：掃描 → 競品 → 選題（產出前三步）
    for (let i = 0; i < 3; i++) { $('#pipeState').textContent = DB.content.pipeline[i].name; setStep(i, 'active'); await sleep(620); setStep(i, 'done'); }

    // 第 4 步：產出內文（串流）
    $('#pipeState').textContent = '產出內文'; setStep(3, 'active');
    stream.innerHTML = `<h3>${src.title || src.name}</h3><span id="genText"></span><span class="caret"></span>`;
    const txt = $('#genText');
    for (const chunk of src.chunks) {
      for (const ch of chunk) {
        txt.append(document.createTextNode(ch));
        stream.scrollTop = stream.scrollHeight;
        await sleep(ch === '\n' ? 36 : 10);
      }
    }
    $('.caret', stream)?.remove();
    setStep(3, 'done');

    // 第 5 步：配圖 + 內連
    $('#pipeState').textContent = '配圖＋內連'; setStep(4, 'active'); await sleep(720); setStep(4, 'done');
    $('#pipeState').innerHTML = `${icon('check')} 完成`; $('#pipeState').className = 'tag tag--pos';

    const done = document.createElement('div');
    done.className = 'mt';
    done.innerHTML = `<span class="tag tag--pos">${icon('check')} 已產出</span>
      <span class="tag tag--brand">SEO 已優化</span>
      <span class="tag">已掃 142 篇舊文補 12 內部連結</span>
      <span class="tag">配圖 3 張已生成</span>`;
    stream.append(done);
    live.classList.remove('on'); btn.disabled = false;

    // SEO 評分卡
    $('#seoSlot').innerHTML = seoCardHTML();
    requestAnimationFrame(() => $('#seoSlot').querySelectorAll('.seo-row__bar i').forEach((b) => { b.style.width = b.dataset.w + '%'; }));
  }

  /* ---- ② 攻擊端 · 廣告 ---- */
  VIEWS.ads = () => {
    const A = DB.ads;
    const rows = A.variants.map((v) => {
      const tone = v.roas >= 4 ? 'pos' : v.roas >= 3 ? 'warn' : 'neg';
      const cpaOver = v.cpa > A.threshold;
      return `<tr class="${v.on ? '' : 'is-off'}">
        <td class="table__name"><strong>${v.name}</strong><small>${v.audience}</small></td>
        <td>NT$ ${v.spend.toLocaleString('en-US')}</td>
        <td><span class="${cpaOver ? 'tag tag--neg' : ''}" style="font-weight:700">NT$ ${v.cpa}</span>${cpaOver ? ' <small class="muted">超標</small>' : ''}</td>
        <td>
          <div class="flex"><strong>${v.roas}×</strong>
          <span class="bar-mini"><i style="width:${Math.min(100, v.roas / 7 * 100)}%;background:var(--${tone})"></i></span></div>
        </td>
        <td><label class="switch"><input type="checkbox" ${v.on ? 'checked' : ''} data-ad="${v.name}"><span class="switch__slider"></span></label></td>
      </tr>`;
    }).join('');

    const comments = A.comments.map((c) => `
      <div class="comment-row">
        <div class="comment-row__av">${icon('chat')}</div>
        <div class="comment-row__body">
          <strong>${c.user}</strong>　<small>廣告留言</small><br/>${c.text}
          <div class="comment-row__act">${icon('sparkle')} ${c.insight}</div>
          <div class="comment-row__gen">${icon('bolt')} ${c.gen}</div>
        </div>
      </div>`).join('');

    return `
      <div class="page-head">
        <span class="page-head__eyebrow" style="color:var(--m2);background:#FDEBE5">② 攻擊端 · 流量與營收</span>
        <h1>AI 廣告投放 · 自動優化</h1>
        <p>多版本素材 A/B 測試，依 CPA 高低<b>自動開關</b>；同時掃描廣告留言 —— 有人問「有沒有綠色」，就即時生成對應素材去打這群人，把成本壓低、ROAS 拉高。</p>
      </div>
      <div class="grid grid-2" style="grid-template-columns:1.25fr 1fr">
        <div class="card card--pad">
          <div class="card__head">
            <div><div class="card__title">${icon('ads')} 廣告素材自動化</div>
            <div class="card__sub">CPA 門檻 NT$ ${A.threshold} · 超標即自動暫停</div></div>
            <span class="tag tag--brand">${icon('bolt')} 自動駕駛中</span>
          </div>
          <table class="table">
            <thead><tr><th>素材 / 受眾</th><th>花費</th><th>CPA</th><th>ROAS</th><th>自動</th></tr></thead>
            <tbody id="adBody">${rows}</tbody>
          </table>
          <div class="alert" style="margin-top:16px;background:#FDEBE5;border-color:#F7D4CD">
            <div class="alert__icon" style="background:#fff;color:var(--m2)">${icon('bolt')}</div>
            <div class="alert__body"><h4 style="color:var(--m2)">系統剛剛自動執行</h4>
            <p>「敏感肌保濕」CPA 連 3 天高於門檻，已自動暫停；省下的預算建議移往 ROAS 5.8 的「無香精」素材。</p></div>
          </div>
        </div>
        <div class="card card--pad">
          <div class="card__head"><div class="card__title">${icon('chat')} 留言雷達 → 即時生素材</div></div>
          <div class="comment-radar">${comments}</div>
        </div>
      </div>

      <div class="card card--pad mt">
        <div class="card__head">
          <div><div class="card__title">${icon('bolt')} 預算重分配模擬器</div>
          <div class="card__sub">拖曳：把低效素材（ROAS ${A.sim.lowRoas}）的預算移到高效素材（ROAS ${A.sim.highRoas}），看 AI 算出的成效</div></div>
          <div class="spark-wrap"><span class="card__sub">近 7 天混合 ROAS</span>${sparkline(A.roas7, 'var(--m2)')}<b id="roasNow" style="color:var(--m2)">${A.roas7[A.roas7.length - 1]}×</b></div>
        </div>
        <div class="sim">
          <div class="sim__control">
            <div class="flex between"><span class="card__sub">把低效預算移過去</span><strong id="simPct" style="color:var(--m2)">0%</strong></div>
            <input type="range" id="simRange" min="0" max="100" value="0" class="range"/>
            <div class="flex between" style="margin-top:6px"><small class="muted">維持現狀</small><small class="muted">全部移轉</small></div>
          </div>
          <div class="sim__out">
            <div class="sim__cell"><small>搬動預算</small><strong id="simMove">NT$ 0</strong></div>
            <div class="sim__cell"><small>預估混合 ROAS</small><strong id="simRoas" style="color:var(--m2)">4.7×</strong></div>
            <div class="sim__cell"><small>預估增額營收</small><strong id="simRev" style="color:var(--pos)">+NT$ 0</strong></div>
          </div>
        </div>
        <div class="suggest-reco" style="margin-top:14px;background:#FDEBE5;border-color:#F7D4CD">${icon('sparkle')}<div id="simReco"><strong>AI 建議：</strong>移轉約 70% 低效預算可把混合 ROAS 拉到 5.3×，預估多賺 NT$ 8.5 萬／月，且不增加總花費。</div></div>
      </div>`;
  };

  function sparkline(data, color) {
    const w = 96, h = 28, max = Math.max(...data), min = Math.min(...data);
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    const last = pts.split(' ').pop().split(',');
    return `<svg width="${w}" height="${h}" class="spark"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${last[0]}" cy="${last[1]}" r="2.6" fill="${color}"/></svg>`;
  }

  function bindAdSim() {
    const A = DB.ads, r = $('#simRange');
    if (!r) return;
    const base = 2480000; // 本月營收基準
    r.addEventListener('input', () => {
      const pct = +r.value;
      const move = Math.round(A.sim.movableBudget * pct / 100);
      // 搬動的預算從 ROAS 2.1 變 6.2，增額營收 = move *(highRoas-lowRoas)
      const extraRev = Math.round(move * (A.sim.highRoas - A.sim.lowRoas));
      const blended = (4.7 + (pct / 100) * 0.85).toFixed(1);
      $('#simPct').textContent = pct + '%';
      $('#simMove').textContent = 'NT$ ' + move.toLocaleString('en-US');
      $('#simRoas').textContent = blended + '×';
      $('#simRev').textContent = '+NT$ ' + extraRev.toLocaleString('en-US');
      $('#roasNow').textContent = blended + '×';
    });
  }

  /* ---- ③ 防守端 · 客服 ---- */
  VIEWS.cs = () => {
    const S = DB.cs;
    const pains = S.pains.map((p) => `
      <div class="pain">
        <div class="pain__top"><span class="pain__name">${p.name}</span>
        <span class="tag ${p.up ? 'tag--neg' : ''}">${p.count} 則${p.up ? ' · 週增 ↑' : ''}</span></div>
        <div class="pain__bar"><i style="width:${p.pct}%"></i></div>
        <div class="pain__quote">${p.quote}</div>
      </div>`).join('');

    return `
      <div class="page-head">
        <span class="page-head__eyebrow" style="color:var(--m3);background:#DEF6F2">③ 防守端 · 客戶與產品</span>
        <h1>智慧客服 · 承接每一次互動，再變成優化燃料</h1>
        <p>串接知識庫自動回覆，同時自動貼標、納入再行銷；各平台負評系統化彙整，挖出消費者最在意的痛點回去優化產品 —— 這是多數人忽略的環節。</p>
      </div>
      <div class="grid grid-4" style="margin-bottom:18px">
        <div class="kpi"><div class="kpi__label">${icon('robot', 'ic')} 自動承接率</div><div class="kpi__value">${S.autoStats.handled}<small>%</small></div></div>
        <div class="kpi"><div class="kpi__label">${icon('tag', 'ic')} 本週自動貼標</div><div class="kpi__value">${S.autoStats.tagged}<small> 筆</small></div></div>
        <div class="kpi"><div class="kpi__label">${icon('cs', 'ic')} 轉真人客訴</div><div class="kpi__value">${S.autoStats.escalated}<small> 件</small></div></div>
        <div class="kpi"><div class="kpi__label">${icon('check', 'ic')} 平均回應</div><div class="kpi__value">8<small> 秒</small></div></div>
      </div>
      <div class="cs-layout">
        <div class="card card--pad">
          <div class="card__head"><div class="card__title">${icon('chat')} 即時客服 · 自動回覆 + 自動貼標</div>
          <button class="btn btn--ghost" id="csReplay">${icon('bolt')} 重播對話</button></div>
          <div class="chat" id="chatBox"></div>
        </div>
        <div class="card card--pad">
          <div class="card__head"><div><div class="card__title">${icon('alert')} 負評痛點 → 產品優化清單</div>
          <div class="card__sub">用數據掌握最真實的反應，繞過「員工不一定向老闆反映」</div></div></div>
          <div class="pain-list">${pains}</div>
        </div>
      </div>

      <div class="grid grid-2 mt">
        <div class="card card--pad">
          <div class="card__head"><div class="card__title">${icon('tag')} 自動貼標分佈（本週）</div></div>
          ${(() => { const tmax = Math.max(...S.tags.map((t) => t.count)); return S.tags.map((t) => `
            <div class="tagbar">
              <span class="tagbar__name">${t.name}</span>
              <span class="tagbar__track"><i style="width:0%;background:${t.color}" data-w="${(t.count / tmax * 100).toFixed(0)}"></i></span>
              <b>${t.count}</b>
            </div>`).join(''); })()}
          <div class="card__sub mt-s">貼標即自動納入對應再行銷受眾名單。</div>
        </div>
        <div class="card card--pad">
          <div class="card__head"><div><div class="card__title">${icon('check')} 品控 · 瑕疵率 8 週趨勢</div>
          <div class="card__sub">客服識別嚴重客訴、統計瑕疵率 —— 持續下降代表優化有效</div></div>
          <b style="color:var(--pos);font-size:18px">${S.defectTrend[S.defectTrend.length - 1]}%</b></div>
          ${trendChart(S.defectTrend, 'var(--m3)')}
          <div class="grid grid-3 mt">
            <div class="stat-pill"><strong style="color:var(--m3)">${S.queue.total}</strong><small>本週工單</small></div>
            <div class="stat-pill"><strong style="color:var(--m3)">${S.queue.auto}</strong><small>AI 自動結案</small></div>
            <div class="stat-pill"><strong style="color:var(--m3)">${S.queue.human}</strong><small>轉真人</small></div>
          </div>
        </div>
      </div>`;
  };

  function trendChart(data, color) {
    const W = 360, H = 110, padB = 4, padT = 8;
    const max = Math.max(...data) * 1.1, min = 0;
    const stepX = W / (data.length - 1);
    const y = (v) => padT + (H - padT - padB) - ((v - min) / (max - min)) * (H - padT - padB);
    const line = data.map((v, i) => `${(i * stepX).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    const area = `0,${H} ` + line + ` ${W},${H}`;
    const dots = data.map((v, i) => `<circle cx="${(i * stepX).toFixed(1)}" cy="${y(v).toFixed(1)}" r="2.4" fill="${color}"/>`).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="chart-svg" preserveAspectRatio="none" style="height:110px">
      <defs><linearGradient id="trd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".22"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
      <polygon points="${area}" fill="url(#trd)"/>
      <polyline points="${line}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>${dots}</svg>`;
  }

  async function playChat() {
    const box = $('#chatBox');
    if (!box) return;
    box.innerHTML = '';
    const av = { user: '客', ai: 'AI' };
    for (const m of DB.cs.convo) {
      if (m.from === 'ai') {
        const t = document.createElement('div');
        t.className = 'msg msg--ai';
        t.innerHTML = `<div class="msg__av">AI</div><div class="msg__bubble"><span class="typing"><i></i><i></i><i></i></span></div>`;
        box.append(t); box.scrollTop = box.scrollHeight;
        await sleep(900);
        t.remove();
      } else {
        await sleep(450);
      }
      const wrap = document.createElement('div');
      wrap.className = `msg msg--${m.from}`;
      const tags = m.tags ? `<div class="msg__tags">${m.tags.map((tg) => `<span class="tag ${tg.includes('客訴') ? 'tag--neg' : 'tag--pos'}">${tg}</span>`).join('')}</div>` : '';
      wrap.innerHTML = `<div class="msg__av">${av[m.from]}</div>
        <div><div class="msg__bubble">${m.text}</div>${tags}<div class="msg__meta">${m.time}${m.from === 'ai' ? ' · AI 自動回覆' : ''}</div></div>`;
      box.append(wrap); box.scrollTop = box.scrollHeight;
      await sleep(550);
    }
  }

  /* ---- ④ 通路 B2B ---- */
  VIEWS.b2b = () => {
    const B = DB.b2b;
    const dists = B.distributors.map((d) => `
      <div class="dist-row">
        <div class="dist-row__logo">${d.name.includes('北') ? '北' : d.name.includes('中') ? '中' : '南'}</div>
        <div style="flex:1"><strong style="font-size:13.5px">${d.name}</strong><br/><small class="muted">統編 ${d.tax} · 上次採購 ${d.last}</small></div>
        <span class="tag ${d.trend.includes('缺貨') ? 'tag--warn' : 'tag--pos'}">${d.trend}</span>
      </div>`).join('');

    return `
      <div class="page-head">
        <span class="page-head__eyebrow" style="color:var(--m4);background:#FBF1D8">④ 通路 B2B · 經銷商管理</span>
        <h1>B2B 自動下單 + AI 採購建議</h1>
        <p>經銷商在網站或 LINE 直接下單，系統自動進 ERP 產生訂單、安排出貨 —— 下單全自動，省下一名業務助理。客戶輸入統編登入後，AI 自動分析購買記錄給出採購建議。</p>
      </div>
      <div class="grid grid-2" style="grid-template-columns:1fr 1.15fr">
        <div class="card card--pad">
          <div class="card__head"><div class="card__title">${icon('biz')} 採購建議 · 統編登入</div></div>
          <div class="b2b-login">
            <div class="field"><label>統一編號</label>
              <input id="taxId" placeholder="請輸入 8 碼統編" value="${B.suggestion.tax}" maxlength="8"/></div>
            <button class="btn btn--primary" id="b2bBtn" style="width:100%;justify-content:center;background:linear-gradient(135deg,#E0A21A,#F0C04E);box-shadow:0 8px 30px rgba(224,162,26,.3)">${icon('sparkle')} 登入並取得 AI 採購建議</button>
          </div>
          <div id="suggestSlot" class="mt"></div>
        </div>
        <div class="card card--pad">
          <div class="card__head"><div><div class="card__title">${icon('b2b')} 經銷商總覽</div>
          <div class="card__sub">LINE 機器人自動回覆 · 每日回報彙整給業務與老闆</div></div></div>
          ${dists}
          <div class="divider"></div>
          <div class="flex between"><span class="muted" style="font-size:13px">嫁接 WMS＋ERP 判讀庫存周轉與銷售趨勢</span>
          <span class="tag tag--brand">${icon('plug')} ERP 已連線</span></div>
        </div>
      </div>

      <div class="card card--pad mt">
        <div class="card__head"><div><div class="card__title">${icon('cpu')} 自動下單流程 · 下單到出貨全自動</div>
        <div class="card__sub">經銷下單後，系統自動進 ERP、排出貨、扣庫存 —— 省下一名業務助理</div></div>
        <button class="btn btn--primary" id="flowBtn" style="background:linear-gradient(135deg,#E0A21A,#F0C04E);box-shadow:0 8px 30px rgba(224,162,26,.3)">${icon('bolt')} 模擬一筆自動下單</button></div>
        <div class="flow" id="flow">${DB.b2b.flow.map((f, i) => `
          <div class="flow-node" data-fnode="${i}">
            <div class="flow-node__ic">${icon(f.icon)}</div>
            <strong>${f.name}</strong><small>${f.sub}</small>
          </div>${i < DB.b2b.flow.length - 1 ? '<div class="flow-link" data-flink="' + i + '"></div>' : ''}`).join('')}</div>
      </div>

      <div class="grid grid-2 mt">
        <div class="card card--pad">
          <div class="card__head"><div class="card__title">${icon('book')} 庫存周轉（週轉天數）</div></div>
          ${DB.b2b.turnover.map((t) => { const tone = t.status === 'warn' ? 'var(--warn)' : t.status === 'hot' ? 'var(--m2)' : 'var(--m3)'; const pct = Math.min(100, t.days / 45 * 100); return `
            <div class="tagbar">
              <span class="tagbar__name" style="flex:0 0 130px">${t.sku}</span>
              <span class="tagbar__track"><i style="width:${pct}%;background:${tone}"></i></span>
              <b style="color:${tone}">${t.days} 天</b>
            </div>`; }).join('')}
          <div class="card__sub mt-s">美白精華周轉偏慢（41 天），建議降低備貨或搭配促銷。</div>
        </div>
        <div class="card card--pad">
          <div class="card__head"><div class="card__title">${icon('doc')} 今日自動彙報 · 給業務與老闆</div></div>
          <div class="grid grid-3" style="gap:10px">
            <div class="stat-pill"><strong style="color:var(--m4)">${DB.b2b.dailyReport.orders}</strong><small>今日訂單</small></div>
            <div class="stat-pill"><strong style="color:var(--m4)">${DB.b2b.dailyReport.amount}</strong><small>訂單金額</small></div>
            <div class="stat-pill"><strong style="color:var(--m4)">${DB.b2b.dailyReport.newDist}</strong><small>新經銷</small></div>
          </div>
          <div class="suggest-reco" style="margin-top:14px">${icon('sparkle')}<div><strong>AI 彙報結論：</strong>${DB.b2b.dailyReport.highlight}</div></div>
        </div>
      </div>`;
  };

  async function runFlow() {
    const btn = $('#flowBtn');
    if (!btn) return;
    btn.disabled = true;
    DB.b2b.flow.forEach((_, i) => { document.querySelector(`[data-fnode="${i}"]`)?.classList.remove('is-on'); document.querySelector(`[data-flink="${i}"]`)?.classList.remove('is-on'); });
    for (let i = 0; i < DB.b2b.flow.length; i++) {
      document.querySelector(`[data-fnode="${i}"]`)?.classList.add('is-on');
      await sleep(500);
      if (i < DB.b2b.flow.length - 1) document.querySelector(`[data-flink="${i}"]`)?.classList.add('is-on');
      await sleep(180);
    }
    btn.disabled = false;
    btn.innerHTML = `${icon('check')} 已自動完成出貨`;
    setTimeout(() => { btn.innerHTML = `${icon('bolt')} 再模擬一筆`; }, 1600);
  }

  function showSuggestion() {
    const s = DB.b2b.suggestion;
    const slot = $('#suggestSlot');
    const btn = $('#b2bBtn');
    btn.disabled = true; btn.innerHTML = `${icon('sparkle')} AI 分析購買記錄中…`;
    setTimeout(() => {
      btn.disabled = false; btn.innerHTML = `${icon('sparkle')} 登入並取得 AI 採購建議`;
      slot.innerHTML = `
        <div class="suggest-card">
          <div class="flex between"><strong style="font-size:14px">${s.name}</strong><span class="tag tag--pos">${icon('check')} 已登入</span></div>
          <div class="suggest-grid">
            <div class="suggest-cell"><strong>${s.daysSince}</strong><small>距上次採購（天）</small></div>
            <div class="suggest-cell"><strong>${s.avgMonthly}</strong><small>平均月銷（件）</small></div>
            <div class="suggest-cell"><strong>${s.suggestQty}</strong><small>建議採購（件）</small></div>
          </div>
          <div class="suggest-reco">${icon('sparkle')}<div><strong>AI 採購建議：</strong>${s.reason}</div></div>
        </div>`;
    }, 1100);
  }

  /* ---- ⑤ 決策大腦 ---- */
  VIEWS.decision = () => {
    const D = DB.decision;
    const roi = D.roi.map((r, i) => `
      <div class="roi-row">
        <div class="roi-row__rank ${i === 0 ? 'top' : ''}">${i + 1}</div>
        <div class="roi-row__name"><strong>${r.name}</strong><small>${r.sub}</small></div>
        <div class="roi-row__val"><strong style="color:${i === 0 ? 'var(--m5)' : 'var(--ink)'}">${r.roi}×</strong><small>營收 ${r.rev}</small></div>
      </div>`).join('');

    const senti = D.sentiment.map((s) => `
      <div class="senti">
        <div class="senti__head"><span class="senti__name">${s.name}</span><span class="senti__vol">${s.vol}</span></div>
        <div class="senti-bar"><i class="sb-pos" style="width:${s.pos}%"></i><i class="sb-neu" style="width:${s.neu}%"></i><i class="sb-neg" style="width:${s.neg}%"></i></div>
        <div class="senti__legend"><span>正 ${s.pos}%</span><span>中 ${s.neu}%</span><span>負 ${s.neg}%</span></div>
      </div>`).join('');

    return `
      <div class="page-head">
        <span class="page-head__eyebrow" style="color:var(--m5);background:#F1EBFE">⑤ 決策大腦 · 數據與輿論判讀</span>
        <h1>營業額 × 行銷成效 · AI 直接告訴你資源放哪</h1>
        <p>以行銷動作（發文／投放／檔期）為 X 軸、每日營業額為 Y 軸，找出掛鉤、算出每檔活動 ROI；台灣在地輿論監測同看競品與我方，並設危機預警。</p>
      </div>

      <div class="card chart-card">
        <div class="card__head" style="margin-bottom:8px">
          <div><div class="card__title">${icon('decision')} 近 30 天：每日營業額 × 行銷動作</div>
          <div class="card__sub">滑鼠移到長條看當日營收，移到節點看行銷動作</div></div>
        </div>
        <div class="chart-legend">
          <span><span class="lg-dot" style="background:var(--m5)"></span>每日營業額（萬元）</span>
          <span><span class="lg-line" style="background:var(--m2)"></span>行銷動作節點</span>
        </div>
        <div id="chartSlot"></div>
      </div>

      <div class="grid grid-2 mt">
        <div class="card card--pad">
          <div class="card__head"><div class="card__title">${icon('target')} 每檔活動 ROI 排行</div></div>
          ${roi}
          <div class="suggest-reco" style="margin-top:14px">${icon('sparkle')}<div><strong>AI 結論：</strong>母親節禮盒 ROI 6.2× 為最佳，建議把「日常保濕廣告」的部分預算移到節慶受眾，預估可再多賺約 NT$ 41 萬。</div></div>
        </div>
        <div class="card card--pad">
          <div class="card__head"><div><div class="card__title">${icon('chat')} 台灣在地輿論監測</div>
          <div class="card__sub">PTT · Dcard · momo · 蝦皮 · 同看競品與我方</div></div></div>
          <div class="senti-grid">${senti}</div>
        </div>
      </div>

      <div class="grid grid-2 mt" style="grid-template-columns:1.4fr 1fr">
        <div class="card card--pad">
          <div class="card__head"><div><div class="card__title">${icon('decision')} 我方 vs 競品 · 聲量對比</div>
          <div class="card__sub">同看競品與我方，涵蓋本土論壇才不會有盲區</div></div></div>
          <div class="chart-legend">${D.compare.series.map((s) => `<span><span class="lg-dot" style="background:${s.color}"></span>${s.name}</span>`).join('')}</div>
          ${groupedBars(D.compare)}
          <div class="suggest-reco" style="margin-top:14px">${icon('sparkle')}<div><strong>AI 結論：</strong>${D.compare.note}</div></div>
        </div>
        <div class="card card--pad">
          <div class="card__head"><div class="card__title">${icon('sparkle')} 資源配置建議</div></div>
          <div class="action-list">${D.actions.map((a, i) => `
            <div class="action" data-act="${i}">
              <div class="action__body"><strong>${a.title}</strong>
              <div class="action__impact">${icon('up')} ${a.impact} · 信心 ${a.conf}</div></div>
              <button class="btn action__apply" data-apply="${i}">套用</button>
            </div>`).join('')}</div>
          <div class="card__sub mt-s">不堆儀表板 —— 直接告訴你下一步把資源放哪。</div>
        </div>
      </div>

      <div class="alert mt">
        <div class="alert__icon">${icon('alert')}</div>
        <div class="alert__body">
          <h4>${D.alert.title}</h4>
          <p>${D.alert.desc}</p>
          <span class="alert__rule">${icon('bolt')} ${D.alert.rule}</span>
        </div>
      </div>`;
  };

  function groupedBars(cmp) {
    const W = 560, H = 240, padL = 30, padB = 26, padT = 12;
    const plotW = W - padL - 8, plotH = H - padT - padB;
    const groups = cmp.weeks.length, series = cmp.series.length;
    const allMax = Math.max(...cmp.series.flatMap((s) => s.data)) * 1.1;
    const gW = plotW / groups, bW = (gW * 0.7) / series;
    const y = (v) => padT + plotH - (v / allMax) * plotH;
    let grid = '';
    for (let g = 0; g <= 4; g++) { const gy = padT + plotH - (g / 4) * plotH; grid += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${W}" y2="${gy.toFixed(1)}" stroke="#F0F1F8"/>`; }
    let bars = '', labels = '';
    cmp.weeks.forEach((wk, gi) => {
      const gx = padL + gi * gW + gW * 0.15;
      cmp.series.forEach((s, si) => {
        const v = s.data[gi];
        const bx = gx + si * bW;
        bars += `<rect x="${bx.toFixed(1)}" y="${y(v).toFixed(1)}" width="${(bW - 2).toFixed(1)}" height="${(padT + plotH - y(v)).toFixed(1)}" rx="2" fill="${s.color}"><title>${s.name} ${wk}：${v} 則</title></rect>`;
      });
      labels += `<text x="${(gx + (bW * series) / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="10" fill="#9A9DB8">${wk}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="chart-svg">${grid}${bars}${labels}</svg>`;
  }

  function renderChart() {
    const slot = $('#chartSlot');
    if (!slot) return;
    const D = DB.decision;
    const data = D.revenue;
    const W = 880, H = 300, padL = 36, padR = 14, padT = 18, padB = 30;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const max = Math.max(...data) * 1.1;
    const n = data.length;
    const gap = 4;
    const bw = (plotW / n) - gap;
    const x = (i) => padL + i * (plotW / n) + gap / 2;
    const y = (v) => padT + plotH - (v / max) * plotH;

    let grid = '';
    for (let g = 0; g <= 4; g++) {
      const gv = (max / 4) * g;
      const gy = y(gv);
      grid += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${W - padR}" y2="${gy.toFixed(1)}" stroke="#F0F1F8"/>
               <text x="${padL - 6}" y="${(gy + 3).toFixed(1)}" text-anchor="end" font-size="9.5" fill="#9A9DB8">${Math.round(gv)}</text>`;
    }
    let bars = '';
    data.forEach((v, i) => {
      const bh = (v / max) * plotH;
      bars += `<rect class="bar-rev" x="${x(i).toFixed(1)}" y="${y(v).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2"
        data-day="${i + 1}" data-rev="${v}"></rect>`;
    });
    let marksHtml = '';
    D.marks.forEach((m) => {
      const mx = x(m.day - 1) + bw / 2;
      marksHtml += `<line class="mk-line" x1="${mx.toFixed(1)}" y1="${padT}" x2="${mx.toFixed(1)}" y2="${padT + plotH}"/>
        <circle class="mk-dot" cx="${mx.toFixed(1)}" cy="${padT}" r="5" data-mark="${m.label}" data-kind="${m.kind}" data-day="${m.day}"></circle>`;
    });
    // X 軸日期刻度
    let xlab = '';
    [1, 7, 14, 21, 28, 30].forEach((d) => {
      xlab += `<text x="${(x(d - 1) + bw / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="9.5" fill="#9A9DB8">${d} 日</text>`;
    });

    slot.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img" aria-label="每日營業額與行銷動作圖">
        <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#A78BFA"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs>
        ${grid}${bars}${marksHtml}${xlab}
      </svg>`;

    // Tooltip
    let tip = $('.chart-tip');
    if (!tip) { tip = document.createElement('div'); tip.className = 'chart-tip'; document.body.append(tip); }
    const show = (html, e) => {
      tip.innerHTML = html; tip.style.opacity = '1';
      tip.style.left = Math.min(window.innerWidth - 240, e.clientX + 14) + 'px';
      tip.style.top = (e.clientY - 10) + 'px';
    };
    const hide = () => { tip.style.opacity = '0'; };
    slot.querySelectorAll('.bar-rev').forEach((b) => {
      b.addEventListener('mousemove', (e) => show(`<div class="ttl">第 ${b.dataset.day} 日</div>營業額 <strong>${b.dataset.rev} 萬</strong>`, e));
      b.addEventListener('mouseleave', hide);
    });
    slot.querySelectorAll('.mk-dot').forEach((d) => {
      d.addEventListener('mousemove', (e) => show(`<div class="ttl">${d.dataset.kind} · 第 ${d.dataset.day} 日</div>${d.dataset.mark}`, e));
      d.addEventListener('mouseleave', hide);
    });
  }

  /* ---- 系統藍圖 ---- */
  VIEWS.blueprint = () => {
    const f = DB.foundation.map((x) => `
      <div class="card card--pad" style="display:flex;gap:14px;align-items:flex-start">
        <div class="insight__icon">${icon(x.icon)}</div>
        <div><strong style="font-size:14.5px">${x.name}</strong>
        <p class="card__sub" style="margin-top:5px;line-height:1.5">${x.desc}</p></div>
      </div>`).join('');

    const mods = [
      { id: 'm1', no: '①', name: '核心引擎 · 內容自動化', color: 'var(--m1)', what: '部落格自動撰寫、SKU 規模化、內容本地化、延伸閱讀與內連', out: '上架文章、產品描述、SEO 結構、配圖' },
      { id: 'm2', no: '②', name: '攻擊端 · 流量與營收', color: 'var(--m2)', what: '賺錢部落格、AI 廣告投放（自動優化）、社群自動發文與回覆', out: '廣告素材、社群貼文、流量與營收' },
      { id: 'm3', no: '③', name: '防守端 · 客戶與產品', color: 'var(--m3)', what: '智慧客服自動回覆、自動貼標、負評痛點分析、客訴監測與品控', out: '自動回覆、客戶標籤、產品優化清單、瑕疵率報表' },
      { id: 'm4', no: '④', name: '通路 B2B · 經銷商管理', color: 'var(--m4)', what: 'B2B 自動下單、採購建議、LINE 機器人客服與報告、庫存數據分析', out: '自動訂單、採購建議、每日彙報、庫存洞察' },
      { id: 'm5', no: '⑤', name: '決策大腦 · 數據與輿論', color: 'var(--m5)', what: '競品與我方輿論監測、行銷動作盤點、營業額×行銷成效指標、危機預警', out: '聲量與情緒報表、成效指標、資源配置建議' },
    ];
    const modCards = mods.map((m) => `
      <div class="card card--pad fade-in" style="border-left:4px solid ${m.color};cursor:pointer" data-goto="${m.id === 'm1' ? 'content' : m.id === 'm2' ? 'ads' : m.id === 'm3' ? 'cs' : m.id === 'm4' ? 'b2b' : 'decision'}">
        <div class="flex between"><div class="card__title" style="color:${m.color}">${m.no} ${m.name}</div>${icon('arrow', 'nav__ic')}</div>
        <p class="card__sub mt-s"><b>做什麼：</b>${m.what}</p>
        <p class="card__sub" style="margin-top:6px"><b>產出：</b>${m.out}</p>
      </div>`).join('');

    return `
      <div class="page-head">
        <span class="page-head__eyebrow">${icon('blueprint')} Blueprint · 系統藍圖</span>
        <h1>從行銷到成交的 GTM 全流程自動化</h1>
        <p>把零散的 AI 功能，整合成一套會自我增強的成長系統。核心理念：AI 不只執行，更直接給你結論 —— 而不是丟一堆儀表板要你自己查。</p>
      </div>
      <div class="section-title">根基層 · 先有它，自動化才一致</div>
      <div class="grid grid-2">${f}</div>
      <div class="section-title">五大模組 · 點卡片直接進該模組</div>
      <div class="grid grid-2" id="modGrid">${modCards}</div>`;
  };

  /* ---- 服務包報價 ---- */
  VIEWS.packages = () => {
    const renderPack = (p, active) => `
      <div class="price-grid" data-pack="${p === DB.packages.cs ? 'cs' : 'blog'}" ${active ? '' : 'hidden'}>
        ${p.tiers.map((t) => `
          <div class="price-card ${t.hot ? 'is-hot' : ''}">
            ${t.hot ? '<div class="price-card__flag">最受歡迎</div>' : ''}
            <div class="price-card__tier">${t.tier}</div>
            <div class="price-card__name">${p.label} · ${t.name}</div>
            <div class="price-card__price">NT$ ${t.price}<small> /月</small></div>
            <div class="price-card__setup">建置費 NT$ ${t.setup}（一次）</div>
            <ul class="price-card__feats">${t.feats.map((f) => `<li>${icon('check', 'ic')}<span>${f}</span></li>`).join('')}</ul>
            <div class="price-card__fit">${t.fit}</div>
            <button class="btn ${t.hot ? 'btn--primary' : ''}" style="width:100%;justify-content:center">選擇方案</button>
          </div>`).join('')}
      </div>
      <div class="price-note" data-note="${p === DB.packages.cs ? 'cs' : 'blog'}" ${active ? '' : 'hidden'}>${p.note}</div>`;

    return `
      <div class="page-head">
        <span class="page-head__eyebrow">${icon('tag')} Packages · 不賣軟體，賣用自動化撐起的服務</span>
        <h1>兩個可報價的服務包</h1>
        <p>用「建置費（一次）＋ 月費（持續）」結構，賣你能控制的執行品質，不靠純抽成。第一波主打：部落格經營包與智能客服包。</p>
      </div>
      <div class="price-tabs">
        <button class="price-tab is-on" data-tab="cs">智能客服包</button>
        <button class="price-tab" data-tab="blog">部落格經營包</button>
      </div>
      ${renderPack(DB.packages.cs, true)}
      ${renderPack(DB.packages.blog, false)}`;
  };

  /* ============================================================
     視圖掛載後的互動綁定
     ============================================================ */
  function bind(route) {
    if (route === 'overview') {
      $('#view').querySelectorAll('[data-counter]').forEach((el) => {
        const o = JSON.parse(el.dataset.counter);
        animateCounter(el, o.target, o);
      });
    }
    if (route === 'content') {
      $('#genType').addEventListener('click', (e) => {
        const b = e.target.closest('[data-type]'); if (!b) return;
        $('#genType').querySelectorAll('.chip').forEach((c) => c.classList.remove('is-on'));
        b.classList.add('is-on');
      });
      $('#genTone').addEventListener('click', (e) => {
        const b = e.target.closest('[data-tone]'); if (!b) return;
        $('#genTone').querySelectorAll('.chip').forEach((c) => c.classList.remove('is-on'));
        b.classList.add('is-on');
      });
      $('#genBtn').addEventListener('click', runGenerate);
    }
    if (route === 'ads') {
      $('#adBody').addEventListener('change', (e) => {
        const row = e.target.closest('tr');
        row.classList.toggle('is-off', !e.target.checked);
      });
      bindAdSim();
    }
    if (route === 'cs') {
      $('#csReplay').addEventListener('click', playChat);
      playChat();
      requestAnimationFrame(() => $('#view').querySelectorAll('.tagbar__track i[data-w]').forEach((b) => { b.style.width = b.dataset.w + '%'; }));
    }
    if (route === 'b2b') {
      $('#b2bBtn').addEventListener('click', showSuggestion);
      $('#flowBtn').addEventListener('click', runFlow);
    }
    if (route === 'decision') {
      renderChart();
      $('.action-list')?.addEventListener('click', (e) => {
        const b = e.target.closest('[data-apply]'); if (!b) return;
        b.textContent = '已套用'; b.classList.add('is-applied'); b.disabled = true;
        b.closest('.action').classList.add('is-applied');
      });
    }
    if (route === 'blueprint') {
      $('#modGrid').addEventListener('click', (e) => {
        const card = e.target.closest('[data-goto]');
        if (card) location.hash = card.dataset.goto;
      });
    }
    if (route === 'packages') {
      const view = $('#view');
      view.querySelectorAll('.price-tab').forEach((t) =>
        t.addEventListener('click', () => {
          view.querySelectorAll('.price-tab').forEach((x) => x.classList.toggle('is-on', x === t));
          view.querySelectorAll('[data-pack]').forEach((g) => g.hidden = g.dataset.pack !== t.dataset.tab);
          view.querySelectorAll('[data-note]').forEach((g) => g.hidden = g.dataset.note !== t.dataset.tab);
        }));
    }
  }

  /* ============================================================
     路由
     ============================================================ */
  function render() {
    const route = state.route;
    const view = VIEWS[route] ? route : 'overview';
    state.route = view;
    $('#view').innerHTML = VIEWS[view]();
    $('#view').scrollTop = 0;
    renderNav();
    bind(view);
  }

  function onHash() {
    const h = (location.hash || '#overview').slice(1);
    state.route = VIEWS[h] ? h : 'overview';
    render();
  }

  /* ============================================================
     啟動
     ============================================================ */
  function boot() {
    // 頂欄日期
    const d = new Date('2026-06-19T10:00:00');
    $('#topDate').textContent = d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

    renderNav();
    renderClientSwitch();

    // 客戶切換選單開合
    $('#clientSwitch').addEventListener('click', (e) => {
      e.stopPropagation();
      $('#clientMenu').hidden = !$('#clientMenu').hidden;
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.topbar__left')) $('#clientMenu').hidden = true;
    });

    window.addEventListener('hashchange', onHash);
    onHash();

    // 收尾啟動畫面
    setTimeout(() => {
      $('#shell').hidden = false;
      $('#boot').classList.add('is-hide');
      setTimeout(() => { $('#boot').style.display = 'none'; }, 500);
    }, 850);
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
