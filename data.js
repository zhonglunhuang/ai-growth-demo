/* ============================================================
   飛輪 Flywheel OS · 模擬資料（zh-TW · 以台灣電商情境為主）
   全部為原型展示用的假資料，僅示意系統能力。
   ============================================================ */

window.DB = (() => {

  /* ---- 多位老闆（多租戶）---- */
  const clients = [
    {
      id: 'haiyan',
      name: '海鹽選物',
      industry: '保養 / 美妝電商',
      color: '#5B53E8',
      health: '優',
      healthTone: 'pos',
      mrr: 76000,
      pkgs: ['部落格經營包 · 成長', '智能客服包 · 進階'],
      since: '2025/11',
    },
    { id: 'shanhai', name: '山海食品', industry: '農產 / 食品電商', color: '#2BB7A6', health: '良', healthTone: 'pos', mrr: 54000, pkgs: ['智能客服包 · 進階'], since: '2026/01' },
    { id: 'lvye',    name: '綠葉生活', industry: '居家 / 選物電商', color: '#E0A21A', health: '注意', healthTone: 'warn', mrr: 30000, pkgs: ['部落格經營包 · 啟動'], since: '2026/03' },
    { id: 'haibao',  name: '海豹寵物', industry: '寵物用品電商',   color: '#F0653E', health: '良', healthTone: 'pos', mrr: 48000, pkgs: ['智能客服包 · 旗艦'], since: '2025/12' },
  ];

  /* ---- 以「海鹽選物」為示範客戶的完整資料 ---- */
  const account = {
    kpis: [
      { label: '本月營收', icon: 'coin', value: 2480000, prefix: 'NT$', delta: +18.4, fmt: 'money' },
      { label: '整體 ROAS', icon: 'target', value: 4.7, suffix: '×', delta: +0.9, fmt: 'x', decimals: 1 },
      { label: '客服自動承接率', icon: 'chat', value: 86, suffix: '%', delta: +12, fmt: 'pct' },
      { label: '本月內容產出', icon: 'doc', value: 18, suffix: ' 篇', delta: +6, fmt: 'int' },
    ],

    // AI 直接給結論（這是整套系統的招牌：不丟儀表板，直接給下一步）
    insights: [
      {
        module: 'm5', src: '決策大腦',
        text: '上週「母親節檔期」單檔 ROI 高達 <b>6.2 倍</b>，是近 30 天最佳。建議把原訂投在「日常保養」的 30% 預算，<b>移到節慶禮盒受眾</b>，預估可再多賺約 NT$ 41 萬。',
        cta: '套用預算配置建議', conf: '信心 92%',
      },
      {
        module: 'm3', src: '防守端 · 客服',
        text: '本週負評集中在 <b>「精華液出貨悶味」</b>（出現 14 次，週增 180%）。已歸入產品優化清單，建議改用鋁箔封口；此痛點正在拉低回購率。',
        cta: '查看痛點分析', conf: '信心 88%',
      },
      {
        module: 'm2', src: '攻擊端 · 廣告',
        text: '<b>「敏感肌保濕」</b>素材 CPA 已連 3 天高於門檻 NT$ 320，系統已<b>自動暫停</b>；同組「無香精」素材 ROAS 5.8，建議追加預算 30%。',
        cta: '檢視廣告自動化', conf: '已自動執行',
      },
    ],

    // 成長飛輪節點
    flywheel: [
      { id: 'm1', name: '內容引擎', sub: '部落格 · SKU 描述', color: '#6366F1', metric: '+18 篇' },
      { id: 'm2', name: '攻擊端',   sub: '社群 · 廣告 → 流量', color: '#F0653E', metric: 'ROAS 4.7×' },
      { id: 'm3', name: '互動數據', sub: '留言 · 負評 · 客訴', color: '#2BB7A6', metric: '1.2k 則' },
      { id: 'm5', name: '決策大腦', sub: '情感分析 · 結論', color: '#8B5CF6', metric: '12 結論' },
      { id: 'loop', name: '回灌優化', sub: '產品 · 受眾 · 知識庫', color: '#16A06A', metric: '↻ 每日' },
    ],
  };

  /* ---- 內容引擎：選題 + 樣本生成 ---- */
  const content = {
    topics: ['敏感肌換季保養', '美白精華成分比較', '夏季控油全攻略', '禮盒包裝靈感'],
    tones: ['專業權威', '溫暖閨蜜', '簡潔俐落'],
    // 一段段「串流」出來的內容（陣列每個元素為一個 chunk）
    blog: {
      title: '換季敏感肌怎麼救？皮膚科醫師都點頭的 5 步修復保養',
      chunks: [
        '## 為什麼一換季，臉就開始鬧脾氣？\n',
        '溫差一拉大，角質層的鎖水能力下降，肌膚屏障變得脆弱，泛紅、脫屑、刺痛就跟著來。',
        '這篇用最白話的方式，帶你用 5 個步驟把敏感肌穩定下來。\n\n',
        '## 步驟一：先「減法」，停掉刺激性成分\n',
        '換季期間先暫停酸類與高濃度美白，讓肌膚有喘息空間。',
        '挑選無香精、無酒精的溫和配方是關鍵。\n\n',
        '## 步驟二：用「修復型精華」補回屏障\n',
        '神經醯胺（Ceramide）與泛醇能直接補強角質層。',
        '建議在化妝水後、乳液前使用，薄擦一層即可。\n\n',
        '> 延伸閱讀：《神經醯胺是什麼？一次看懂屏障修復成分》',
      ],
    },
    sku: {
      name: '海鹽選物 · 神經醯胺修復精華 30ml',
      chunks: [
        '【商品描述】\n',
        '專為換季敏感肌設計，添加 5 重神經醯胺與泛醇，',
        '一滴補回流失的肌膚屏障。質地清爽不黏膩，敏弱肌也能安心日夜使用。\n\n',
        '【核心成分】神經醯胺 NP/AP/EOP · 泛醇 B5 · 積雪草萃取\n',
        '【適用膚質】乾燥 / 敏感 / 換季不穩定\n',
        '【SEO 關鍵字】敏感肌精華、屏障修復、神經醯胺、換季保養\n',
      ],
    },
    stats: [
      { num: '15 分', label: '原本 2–3 天 → 現在' },
      { num: '×340', label: 'SKU 批次規模化' },
      { num: 'SEO', label: '自動結構 + 內部連結' },
    ],
    // 生成管線（生成時逐步點亮）
    pipeline: [
      { name: '掃描網站', sub: '讀 142 篇舊文與商品頁', icon: 'doc' },
      { name: '競品調研', sub: '比對 8 個競品熱門題', icon: 'target' },
      { name: '選題', sub: '挑出搜尋缺口主題', icon: 'sparkle' },
      { name: '產出內文', sub: 'Claude 撰寫＋人工複核', icon: 'content' },
      { name: '配圖＋內連', sub: '生成 3 圖、補 12 內部連結', icon: 'plug' },
    ],
    // 生成後的 SEO 評分
    seo: {
      score: 92,
      sub: [
        { name: '關鍵字策略', val: 95 },
        { name: '標題與結構', val: 90 },
        { name: '內部連結', val: 88 },
        { name: '可讀性', val: 94 },
      ],
      keywords: ['敏感肌精華', '屏障修復', '神經醯胺', '換季保養', '無香精'],
      links: 12,
    },
    competitors: [
      { name: '競品 A · 美白攻略', gap: '未涵蓋「換季敏感」角度' },
      { name: '競品 B · 成分解析', gap: '可補更白話的步驟教學' },
    ],
  };

  /* ---- 攻擊端：廣告變體 + 留言雷達 ---- */
  const ads = {
    threshold: 320, // CPA 門檻
    variants: [
      { name: '無香精修復精華', audience: '敏弱肌 25–34 女', spend: 28400, cpa: 268, roas: 5.8, on: true, trend: 'up' },
      { name: '母親節禮盒組',   audience: '節慶送禮 30–45',  spend: 41200, cpa: 245, roas: 6.2, on: true, trend: 'up' },
      { name: '敏感肌保濕',     audience: '泛興趣 18–44',    spend: 19800, cpa: 386, roas: 2.1, on: false, trend: 'down' },
      { name: '美白精華日常',   audience: '美白關鍵字',      spend: 22300, cpa: 312, roas: 3.4, on: true, trend: 'flat' },
    ],
    comments: [
      { user: 'A***n', text: '請問有沒有適合「油痘肌」的版本？臉好容易出油😣', insight: '偵測到未覆蓋需求：油痘肌', gen: '已自動生成「控油版」素材，鎖定油痘肌受眾投放。' },
      { user: 'mei****', text: '禮盒有提供「客製卡片」嗎？想送媽媽', insight: '高購買意圖：禮贈需求', gen: '已生成「附手寫卡」賣點素材，導向母親節禮盒。' },
      { user: 'ywf***', text: '這個有沒有「無香」的？我會過敏', insight: '已有對應素材：無香精', gen: '自動回覆並導購「無香精修復精華」。' },
    ],
    // 預算重分配模擬器：把低效素材預算移到高效素材
    sim: {
      totalBudget: 111700,           // 四組目前總花費
      lowRoas: 2.1,                  // 低效素材 ROAS（敏感肌保濕）
      highRoas: 6.2,                 // 高效素材 ROAS（母親節禮盒）
      movableBudget: 19800,          // 可被搬動的低效預算上限
    },
    // 近 7 天混合 ROAS 趨勢
    roas7: [3.6, 3.9, 4.1, 4.0, 4.4, 4.6, 4.7],
  };

  /* ---- 防守端：客服對話流 + 負評痛點 ---- */
  const cs = {
    // 對話會被腳本依序「演」出來
    convo: [
      { from: 'user', text: '你好，我昨天下單的精華液到貨打開有一點悶悶的味道，正常嗎？', time: '14:02' },
      { from: 'ai', text: '您好 💛 神經醯胺精華因為不含香精，開封初期可能有淡淡原料味，靜置幾分鐘就會散去，是正常的喔！若味道明顯刺鼻，可能是運送悶熱導致，我們可以為您換貨～', time: '14:02', tags: ['出貨', '氣味', '可能客訴'] },
      { from: 'user', text: '好喔那我先試試。對了我想順便問美白精華適合敏感肌嗎', time: '14:03' },
      { from: 'ai', text: '建議您換季穩定後再用美白精華唷～目前先以「修復精華」打底，等屏障穩了再加美白，效果會更好也比較不刺激。需要我幫您把美白精華加入願望清單嗎？', time: '14:03', tags: ['諮詢', '敏感肌', '再行銷'] },
    ],
    pains: [
      { name: '精華液出貨悶味', pct: 78, count: 14, quote: '「打開有一股悶悶的味道」、「夏天寄來味道更重」', up: true },
      { name: '物流包裝擠壓',   pct: 54, count: 9,  quote: '「外盒被壓到凹一角」、「瓶身有刮痕」' },
      { name: '保存期限標示',   pct: 33, count: 5,  quote: '「找不到有效期限在哪」' },
    ],
    autoStats: { handled: 86, tagged: 132, escalated: 4 },
    // 自動貼標分佈（本週）
    tags: [
      { name: '高購買意圖', count: 38, color: '#16A06A' },
      { name: '敏感肌', count: 31, color: '#2BB7A6' },
      { name: '價格敏感', count: 24, color: '#E0A21A' },
      { name: '回購會員', count: 22, color: '#5B53E8' },
      { name: '待挽回', count: 17, color: '#E0392B' },
    ],
    // 瑕疵率 8 週趨勢（%，下降代表品控改善）
    defectTrend: [3.8, 3.5, 3.6, 3.1, 2.7, 2.4, 2.0, 1.6],
    queue: { total: 148, auto: 127, human: 21, sla: '8 秒' },
  };

  /* ---- 決策大腦：30 天營收 × 行銷動作 + ROI + 輿論 + 危機 ---- */
  // 每日營收（萬元），與行銷動作對齊
  const revenue = [
    62, 58, 65, 71, 60, 55, 59, 88, 96, 74, 68, 63, 70, 92,
    140, 120, 85, 78, 73, 69, 75, 110, 132, 98, 82, 77, 90, 125, 152, 138,
  ];
  const marks = [
    { day: 7,  label: '社群開箱文', kind: '內容' },
    { day: 14, label: '母親節檔期開跑', kind: '檔期' },
    { day: 21, label: 'KOL 合作貼文', kind: '社群' },
    { day: 28, label: '會員回購日', kind: '檔期' },
  ];
  const decision = {
    revenue, marks,
    roi: [
      { name: '母親節禮盒檔期', sub: '節慶受眾 · 5/8–5/12', roi: 6.2, rev: '78 萬' },
      { name: 'KOL 開箱合作',   sub: '美妝部落客 · 5/21',   roi: 4.8, rev: '52 萬' },
      { name: '社群開箱徵文',   sub: 'UGC 活動 · 5/7',      roi: 3.6, rev: '34 萬' },
      { name: '日常保濕廣告',   sub: '泛興趣 · 全月',        roi: 2.1, rev: '22 萬' },
    ],
    sentiment: [
      { name: 'Dcard 美妝版', vol: '486 則', pos: 64, neu: 26, neg: 10 },
      { name: 'PTT MakeUp',  vol: '212 則', pos: 51, neu: 33, neg: 16 },
      { name: 'momo 評論',   vol: '1.3k 則', pos: 72, neu: 21, neg: 7 },
      { name: '蝦皮評價',     vol: '980 則', pos: 68, neu: 20, neg: 12 },
    ],
    alert: {
      title: '危機預警：負面聲量單日達基準 218%',
      desc: '「出貨悶味」相關負面討論在 Dcard 美妝版 24 小時內被提及 31 次，超過過去 30 天日均（基準）的 200% 門檻，且負面比達 17%。建議優先處理出貨封口問題並公告說明。',
      rule: '規則：單日提及量 ≥ 基準 200% 或 負面比 > 15% 即通知',
    },
    // 我方 vs 競品 聲量對比（近 6 週，單位：則）
    compare: {
      weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
      series: [
        { name: '海鹽選物（我方）', color: '#5B53E8', data: [320, 360, 410, 540, 690, 820] },
        { name: '競品 A', color: '#F0653E', data: [480, 460, 470, 450, 500, 520] },
        { name: '競品 B', color: '#C9CCDE', data: [260, 290, 300, 280, 310, 330] },
      ],
      note: '我方聲量第 4 週起反超競品 A，與母親節檔期＋KOL 合作高度吻合。',
    },
    // 資源配置建議（可逐條套用）
    actions: [
      { title: '預算：日常保濕 → 節慶禮盒', impact: '+NT$ 41 萬 預估營收', conf: '92%' },
      { title: '內容：加開「敏感肌換季」系列', impact: '+18% 自然流量', conf: '81%' },
      { title: '客服：優先處理出貨悶味痛點', impact: '回購率 +6%', conf: '88%' },
    ],
  };

  /* ---- 通路 B2B：經銷商 + 採購建議 ---- */
  const b2b = {
    distributors: [
      { name: '北區 · 美麗人生藥妝', tax: '53••••21', last: '12 天前', trend: '回購穩定' },
      { name: '中區 · 康富連鎖',     tax: '27••••08', last: '31 天前', trend: '可能缺貨' },
      { name: '南區 · 海岸選品店',   tax: '84••••55', last: '6 天前',  trend: '成長中' },
    ],
    // 統編登入後的採購建議（示範）
    suggestion: {
      tax: '53921055',
      name: '美麗人生藥妝（北區經銷）',
      daysSince: 31,
      avgMonthly: 220,
      suggestQty: 280,
      reason: '距上次採購已 31 天，超過平均補貨週期（24 天）。依近 3 個月平均月銷 220 件、加上母親節檔期預估成長 25%，建議本次採購 <b>280 件</b>，可避免斷貨並承接節慶需求。',
    },
    // 自動下單流程（點「模擬下單」時逐節點亮）
    flow: [
      { name: '經銷下單', sub: 'B2B 網站 / LINE', icon: 'b2b' },
      { name: '進 ERP', sub: '自動產生訂單', icon: 'cpu' },
      { name: '排出貨', sub: '指派物流', icon: 'plug' },
      { name: 'WMS 扣庫存', sub: '即時更新周轉', icon: 'book' },
    ],
    // 庫存周轉（各 SKU 週轉天數，越低越健康）
    turnover: [
      { sku: '修復精華 30ml', days: 18, status: 'ok' },
      { sku: '無香精乳液', days: 26, status: 'ok' },
      { sku: '美白精華', days: 41, status: 'warn' },
      { sku: '母親節禮盒', days: 9, status: 'hot' },
    ],
    dailyReport: {
      orders: 14, amount: '38.6 萬', newDist: 2,
      highlight: '母親節禮盒佔今日 B2B 訂單 46%，建議通知中區康富連鎖補貨（已 31 天未進貨）。',
    },
  };

  /* ---- 服務包報價 ---- */
  const packages = {
    cs: {
      label: '智能客服包',
      sub: '24 小時不打烊承接 · 把每一次對話變成數據',
      tiers: [
        {
          tier: 'STARTER', name: '啟動', price: '12,000', setup: '25,000', hot: false,
          feats: ['LINE 單通路 AI 自動回覆', '知識庫建置與維護', '客戶自動貼標籤', '24 小時不打烊承接', '每月成果報告'],
          fit: '適合：剛起步、以 LINE 為主',
        },
        {
          tier: 'PRO', name: '進階', price: '28,000', setup: '40,000', hot: true,
          feats: ['多通路 LINE＋FB＋IG＋網站', '客訴與瑕疵率監測', '再行銷名單自動產生', 'AI 接不住自動轉真人', '雙週報＋產品痛點回饋'],
          fit: '適合：多通路、想把客服變成數據',
        },
        {
          tier: 'ELITE', name: '旗艦', price: '48,000 起', setup: '60,000 起', hot: false,
          feats: ['進階 Pro 全包', '產品痛點深度分析', '串接 CRM／再行銷', '專屬 PM＋回應 SLA', '客製工作流'],
          fit: '適合：規模較大、要深度整合',
        },
      ],
      note: '註：上方為服務費；LINE 官方帳號的訊息推播費（依輕／中／高用量）屬平台成本，由品牌端自行負擔，不計入報價。',
    },
    blog: {
      label: '部落格經營包',
      sub: '穩定產出 × SEO × 自動上架 · 養出會自己帶流量的內容資產',
      tiers: [
        {
          tier: 'STARTER', name: '啟動', price: '18,000', setup: '20,000', hot: false,
          feats: ['每月 8 篇（AI 產文＋人工複核）', '選題＋競品調研', '自動配圖＋內部連結', '基礎 SEO＋自動上架', '每月成果報告'],
          fit: '適合：要穩定產出、預算有限',
        },
        {
          tier: 'GROWTH', name: '成長', price: '36,000', setup: '30,000', hot: true,
          feats: ['每月 16 篇', '延伸閱讀＋進階關鍵字策略', '社群同步發布', '流量／關鍵字排名月報', '季度策略會議'],
          fit: '適合：要衝自然流量與搜尋排名',
        },
        {
          tier: 'SCALE', name: '規模', price: '60,000 起', setup: '40,000 起', hot: false,
          feats: ['每月 30 篇＋ 或 SKU 規模化', '內容本地化', '完整內容策略主導', '專屬 PM＋優先排程', '客製報表與整合'],
          fit: '適合：要大量產出或 SKU 規模化',
        },
      ],
      note: '註：以上為貼著台灣行情的建議起價範本，依產業與成本微調；三檔中以中間檔為主打。',
    },
  };

  /* ---- 根基層（藍圖的 Foundation）---- */
  const foundation = [
    { name: '品牌語氣', desc: 'AI 學會你的品牌語調，部落格、廣告、客服、社群產出口徑一致。', icon: 'voice' },
    { name: '知識庫',   desc: '產品資訊、FAQ、過往內容、負評痛點集中存放，所有模組共用同一份事實來源。', icon: 'book' },
    { name: '多模型',   desc: 'Claude／GPT／Gemini 擇優使用，用工作流編排器把每步串成可複用流程。', icon: 'cpu' },
    { name: '整合層',   desc: '對接 ERP、WMS、CRM、LINE 與各廣告社群 API；資料進得來、指令出得去。', icon: 'plug' },
  ];

  return { clients, account, content, ads, cs, decision, b2b, packages, foundation };
})();
