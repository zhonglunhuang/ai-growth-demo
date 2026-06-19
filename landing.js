/* ============================================================
   飛輪 Flywheel · Landing / 提案頁 邏輯
   沿用 data.js 的 window.DB
   ============================================================ */
(() => {
  const DB = window.DB;
  const $ = (s, r = document) => r.querySelector(s);

  const ICON = {
    voice: '<path d="M12 4v16M8 8v8M16 8v8M4 11v2M20 11v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    book:  '<path d="M5 4h9a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm11 0h3v14h-3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    cpu:   '<rect x="6" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    plug:  '<path d="M9 3v6m6-6v6M6 9h12v3a6 6 0 0 1-12 0V9Zm6 9v3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    content: '<path d="M5 3h11l4 4v14H5V3Zm9 1v4h4M8 13h8M8 17h6M8 9h3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    ads:   '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Zm13-3a5 5 0 0 1 0 8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    cs:    '<path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2v-6h4M4 13v4a2 2 0 0 0 2 2h2v-6H4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    b2b:   '<path d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    decision: '<path d="M12 3a4 4 0 0 0-4 4 3.5 3.5 0 0 0-2 6.3A3.5 3.5 0 0 0 8 20a3 3 0 0 0 4 0 3 3 0 0 0 4 0 3.5 3.5 0 0 0 2-6.7A3.5 3.5 0 0 0 16 7a4 4 0 0 0-4-4ZM12 3v17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">${ICON[n] || ''}</svg>`;
  const polar = (cx, cy, r, deg) => { const a = deg * Math.PI / 180; return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }; };

  /* ---- 飛輪 SVG（與控制台同款） ---- */
  function flywheelSVG() {
    const cx = 190, cy = 190, R = 132;
    const nodes = DB.account.flywheel, n = nodes.length;
    let spokes = '', dots = '', labels = '';
    nodes.forEach((nd, i) => {
      const ang = -90 + (i * 360) / n;
      const p = polar(cx, cy, R, ang), lp = polar(cx, cy, R + 34, ang);
      spokes += `<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="${nd.color}" stroke-width="1.5" opacity=".25"/>`;
      dots += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="26" fill="#fff" stroke="${nd.color}" stroke-width="2.5"/><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="9" fill="${nd.color}"/>`;
      const anchor = lp.x > cx + 12 ? 'start' : lp.x < cx - 12 ? 'end' : 'middle';
      labels += `<text x="${lp.x.toFixed(1)}" y="${(lp.y - 2).toFixed(1)}" text-anchor="${anchor}" font-size="12.5" font-weight="700" fill="#14152B">${nd.name}</text><text x="${lp.x.toFixed(1)}" y="${(lp.y + 13).toFixed(1)}" text-anchor="${anchor}" font-size="10.5" fill="#8B5CF6" font-weight="600">${nd.metric}</text>`;
    });
    return `<svg viewBox="0 0 380 380" class="fly-svg" role="img" aria-label="成長飛輪">
      <defs><linearGradient id="hub" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5B53E8"/><stop offset="1" stop-color="#7C6CFF"/></linearGradient></defs>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#E8E9F2" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#16A06A" stroke-width="3" stroke-linecap="round" stroke-dasharray="70 760">
        <animateTransform attributeName="transform" type="rotate" from="-90 ${cx} ${cy}" to="270 ${cx} ${cy}" dur="6s" repeatCount="indefinite"/></circle>
      ${spokes}${dots}
      <circle cx="${cx}" cy="${cy}" r="46" fill="url(#hub)"/>
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="900" fill="#fff">飛輪</text>
      <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="9.5" fill="#E6E3FF" font-weight="600">AI 直接給結論</text>
      ${labels}</svg>`;
  }

  /* ---- 根基層 ---- */
  function renderFoundation() {
    $('#foundationGrid').innerHTML = DB.foundation.map((f) => `
      <div class="found-card"><div class="found-card__ic">${icon(f.icon)}</div>
      <strong>${f.name}</strong><p>${f.desc}</p></div>`).join('');
  }

  /* ---- 五大模組 ---- */
  const MODS = [
    { no: '①', route: 'content', ic: 'content', color: '#6366F1', name: '內容引擎', desc: '掃描網站與競品 → 選題 → 產出文章與 SKU 描述，自動配圖、補內部連結。', grab: '網站內容、競品、關鍵字', out: '上架文章、SEO 結構、配圖' },
    { no: '②', route: 'ads', ic: 'ads', color: '#F0653E', name: '攻擊端 · 廣告', desc: '把內容變流量與錢。CPA 自動開關、掃留言即時生對應素材，拉高 ROAS。', grab: 'CPA／ROAS、廣告留言', out: '廣告素材、流量與營收' },
    { no: '③', route: 'cs', ic: 'cs', color: '#2BB7A6', name: '防守端 · 客服', desc: '智慧客服自動回覆＋貼標，負評系統化彙整成痛點，回頭優化產品。', grab: '客服對話、各平台負評', out: '自動回覆、產品優化清單' },
    { no: '④', route: 'b2b', ic: 'b2b', color: '#E0A21A', name: '通路 B2B', desc: '經銷在網站／LINE 下單自動進 ERP；統編登入給 AI 採購建議。', grab: '經銷訂單、購買記錄、庫存', out: '自動訂單、採購建議、彙報' },
    { no: '⑤', route: 'decision', ic: 'decision', color: '#8B5CF6', name: '決策大腦', desc: '輿論監測同看競品與我方，營業額×行銷成效指標，AI 直接給資源配置建議。', grab: '各平台聲量、行銷動作、營收', out: '成效指標、資源配置建議' },
  ];
  function renderModules() {
    $('#modGrid').innerHTML = MODS.map((m) => `
      <a class="mod-card" style="border-top-color:${m.color}" href="console.html#${m.route}">
        <div class="mod-card__no">${m.no}</div>
        <div class="mod-card__ic" style="background:${m.color}1A;color:${m.color}">${icon(m.ic)}</div>
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
        <div class="mod-card__row"><b>抓什麼</b><span>${m.grab}</span></div>
        <div class="mod-card__row"><b>產出</b><span>${m.out}</span></div>
        <div class="mod-card__go" style="color:${m.color}">進控制台看 ${icon('arrow')}</div>
      </a>`).join('');
  }

  /* ---- 槓桿：老闆 chips ---- */
  function renderLeverage() {
    $('#leverageBosses').innerHTML = DB.clients.map((c) => `
      <div class="boss-chip"><span class="boss-chip__dot" style="background:${c.color}"></span>${c.name}<small style="color:#7E80A8">· ${c.industry.split(' ')[0]}</small></div>`).join('')
      + `<div class="boss-chip" style="border-style:dashed;opacity:.7">＋ 更多老闆…</div>`;
  }

  /* ---- 報價 ---- */
  function renderPricing(which) {
    const p = which === 'blog' ? DB.packages.blog : DB.packages.cs;
    $('#lpPricing').innerHTML = `
      <div class="lp-price-grid">${p.tiers.map((t) => `
        <div class="price-card ${t.hot ? 'is-hot' : ''}">
          ${t.hot ? '<div class="price-card__flag">最受歡迎</div>' : ''}
          <div class="price-card__tier">${t.tier}</div>
          <div class="price-card__name">${p.label} · ${t.name}</div>
          <div class="price-card__price">NT$ ${t.price}<small> /月</small></div>
          <div class="price-card__setup">建置費 NT$ ${t.setup}（一次）</div>
          <ul class="price-card__feats">${t.feats.map((f) => `<li><svg viewBox="0 0 24 24" width="18" height="18" class="ic"><path d="M5 12l4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${f}</span></li>`).join('')}</ul>
          <div class="price-card__fit">${t.fit}</div>
          <a class="btn ${t.hot ? 'btn--primary' : ''}" href="console.html#packages" style="width:100%;justify-content:center;text-decoration:none">選擇方案</a>
        </div>`).join('')}</div>
      <div class="lp-price-note">${p.note}</div>`;
  }

  /* ---- 五原則 ---- */
  const PRINCIPLES = [
    { no: '01', t: '先建根基，再自動化', d: '品牌語氣與知識庫是源頭，建好產出才一致、不走鐘。' },
    { no: '02', t: '人在迴圈', d: 'AI 產出與決策保留人工複核，台灣語境誤判這關不能省。' },
    { no: '03', t: '標準化工作流', d: '用編排器把流程固定成可複用模板，換產品直接套。' },
    { no: '04', t: '持續測試', d: '素材、文案、受眾不斷 A/B，讓轉化率一圈圈往上墊。' },
    { no: '05', t: 'AI 給結論', d: '不堆儀表板。系統的價值是直接告訴你資源放哪。' },
  ];
  function renderPrinciples() {
    $('#principles').innerHTML = PRINCIPLES.map((p) => `
      <div class="principle"><div class="principle__no">${p.no}</div><strong>${p.t}</strong><p>${p.d}</p></div>`).join('');
  }

  /* ---- Hero 數字計數 ---- */
  function countUp(el) {
    const target = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    const t0 = performance.now();
    (function f(now) {
      const p = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(target * e) + suf;
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }

  /* ---- 捲動揭露 + nav 陰影 ---- */
  function setupScroll() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    const heroIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.querySelectorAll('[data-count]').forEach(countUp); heroIO.unobserve(en.target); } });
    }, { threshold: 0.4 });
    const hs = $('#heroStats'); if (hs) heroIO.observe(hs);

    const nav = $('#lpNav');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
  }

  /* ---- init ---- */
  document.addEventListener('DOMContentLoaded', () => {
    $('#heroFlywheel').innerHTML = flywheelSVG();
    $('#systemFlywheel').innerHTML = flywheelSVG();
    renderFoundation();
    renderModules();
    renderLeverage();
    renderPrinciples();
    renderPricing('cs');
    $('#lpPriceTabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-tab]'); if (!b) return;
      $('#lpPriceTabs').querySelectorAll('.price-tab').forEach((x) => x.classList.toggle('is-on', x === b));
      renderPricing(b.dataset.tab);
    });
    setupScroll();
  });
})();
