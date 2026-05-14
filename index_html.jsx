import React, { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Phone, Mail, Navigation, ExternalLink, RefreshCw, Building2, Filter, AlertCircle, Download, CalendarCheck, StickyNote, CheckCircle2, Cloud, CloudOff, LogIn, LogOut, Save, UserCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/*
  クラウド同期について
  ------------------------------------------------------------
  このアプリは、Supabaseを設定するとログイン＋クラウド保存が使えます。
  未設定の場合は、従来どおりブラウザ内 localStorage に保存します。

  Supabaseに作るテーブル例：

  create table visit_records (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    facility_id text not null,
    status text not null default '未訪問',
    visit_date text,
    memo text,
    updated_at text,
    unique(user_id, facility_id)
  );

  Row Level Securityを有効化して、以下のポリシーを作成：

  create policy "select own visit records"
  on visit_records for select
  using (auth.uid() = user_id);

  create policy "insert own visit records"
  on visit_records for insert
  with check (auth.uid() = user_id);

  create policy "update own visit records"
  on visit_records for update
  using (auth.uid() = user_id);

  使う場合は下の2つを入力してください。
*/
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";

const DATA_SOURCES = [
  {
    id: "kyotaku",
    label: "居宅介護支援事業所",
    type: "居宅介護支援事業所",
    url: "https://www.city.osaka.lg.jp/fukushi/cmsfiles/contents/0000491/491832/kyotakukaigosien.csv",
  },
  {
    id: "houkatsu",
    label: "地域包括支援センター・ブランチ",
    type: "地域包括支援センター",
    url: "https://www.city.osaka.lg.jp/fukushi/cmsfiles/contents/0000370/370522/csv.csv",
  },
];

const WARDS = [
  "北区", "都島区", "福島区", "此花区", "中央区", "西区", "港区", "大正区", "天王寺区", "浪速区", "西淀川区", "淀川区", "東淀川区", "東成区", "生野区", "旭区", "城東区", "鶴見区", "阿倍野区", "住之江区", "住吉区", "東住吉区", "平野区", "西成区"
];

const VISIT_STATUSES = ["すべて", "未訪問", "訪問予定", "訪問済み"];
const VISIT_STORAGE_KEY = "osaka-care-support-visit-records-v2";

function detectWard(text = "") {
  return WARDS.find((ward) => text.includes(ward)) || "大阪市";
}

function normalizePhone(value = "") {
  return String(value).replace(/[－ー―]/g, "-").replace(/[^0-9-]/g, "").trim();
}

function makeGoogleMapsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function makeRouteUrl(address) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=transit`;
}

function normalizeHeader(header = "") {
  return String(header).replace(/^\uFEFF/, "").trim();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      if (row.some((cell) => String(cell).trim() !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => String(cell).trim() !== "")) rows.push(row);
  }
  return rows;
}

function rowToObject(headers, row) {
  const obj = {};
  headers.forEach((header, index) => {
    obj[normalizeHeader(header)] = String(row[index] || "").trim();
  });
  return obj;
}

function findColumn(obj, candidates) {
  for (const key of Object.keys(obj)) {
    const normalized = normalizeHeader(key);
    if (candidates.some((candidate) => normalized.includes(candidate))) {
      return obj[key];
    }
  }
  return "";
}

function normalizeKyotakuRow(obj, index) {
  const name = findColumn(obj, ["事業所名称", "名称"]);
  const address = findColumn(obj, ["所在地", "住所"]);
  const phone = normalizePhone(findColumn(obj, ["電話番号", "電話"]));
  const fax = normalizePhone(findColumn(obj, ["FAX番号", "ファックス"]));
  const corporation = findColumn(obj, ["法人名称", "法人"]);
  const serviceNo = findColumn(obj, ["事業所番号"]);
  const email = findColumn(obj, ["メール", "E-mail", "Email"]);
  const website = findColumn(obj, ["ホームページ", "URL"]);

  return {
    id: `kyotaku-${serviceNo || index}`,
    type: "居宅介護支援事業所",
    name: name || "名称未設定",
    ward: detectWard(address),
    postalCode: findColumn(obj, ["郵便番号", "郵便"]),
    address,
    phone,
    fax,
    email,
    website,
    corporation,
    raw: obj,
  };
}

function normalizeHoukatsuRows(rows) {
  const normalized = [];
  let currentWard = "";

  rows.forEach((row, index) => {
    const cells = row.map((cell) => String(cell || "").trim()).filter(Boolean);
    if (!cells.length) return;

    const joined = cells.join(" ");
    if (joined.includes("高齢者相談窓口") || joined.includes("区") && joined.includes("電話") && joined.includes("住所")) return;

    const wardCell = cells.find((cell) => WARDS.includes(cell));
    if (wardCell) currentWard = wardCell;

    const postal = cells.find((cell) => /^\d{3}-\d{4}$/.test(cell)) || "";
    const phoneCandidates = cells.filter((cell) => /^0\d{1,4}[-－ー]\d{1,4}[-－ー]\d{3,4}$/.test(cell));
    const url = cells.find((cell) => /^https?:\/\//i.test(cell)) || "";
    const email = cells.find((cell) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cell)) || "";
    const address = cells.find((cell) => cell.includes("大阪市") || WARDS.some((ward) => cell.startsWith(ward))) || "";

    if (!address || !phoneCandidates.length) return;

    const nameCandidates = cells.filter((cell) => {
      if (cell === currentWard || cell === postal || cell === address || phoneCandidates.includes(cell) || cell === url || cell === email) return false;
      if (/^\d+$/.test(cell)) return false;
      return true;
    });

    const name = nameCandidates.find((cell) => cell.includes("地域包括") || cell.includes("ブランチ")) || nameCandidates[0] || `${currentWard}地域包括支援センター`;

    normalized.push({
      id: `houkatsu-${index}`,
      type: name.includes("ブランチ") ? "総合相談窓口（ブランチ）" : "地域包括支援センター",
      name,
      ward: currentWard || detectWard(address),
      postalCode: postal,
      address: address.startsWith("大阪市") ? address : `大阪市${address}`,
      phone: normalizePhone(phoneCandidates[0]),
      fax: normalizePhone(phoneCandidates[1] || ""),
      email,
      website: url,
      corporation: "",
      raw: Object.fromEntries(cells.map((cell, i) => [`列${i + 1}`, cell])),
    });
  });

  return normalized;
}

async function fetchCsv(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`取得失敗: ${response.status}`);
  const buffer = await response.arrayBuffer();
  const utf8 = new TextDecoder("utf-8").decode(buffer);
  if (utf8.includes("�")) {
    try {
      return new TextDecoder("shift_jis").decode(buffer);
    } catch {
      return utf8;
    }
  }
  return utf8;
}

function loadVisitRecords() {
  try {
    return JSON.parse(localStorage.getItem(VISIT_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveLocalVisitRecords(records) {
  try {
    localStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // localStorageが使えない環境では画面上のみ保持します。
  }
}

function getVisitRecord(records, itemId) {
  return records[itemId] || { status: "未訪問", visitDate: "", memo: "", updatedAt: "" };
}

function exportCsv(items, visitRecords) {
  const headers = ["種別", "区", "名称", "郵便番号", "住所", "電話", "FAX", "メール", "ホームページ", "法人名", "訪問状況", "訪問日", "訪問メモ", "訪問記録更新日"];
  const lines = [headers.join(",")];
  items.forEach((item) => {
    const visit = getVisitRecord(visitRecords, item.id);
    const values = [item.type, item.ward, item.name, item.postalCode, item.address, item.phone, item.fax, item.email || "未公開", item.website, item.corporation, visit.status, visit.visitDate, visit.memo, visit.updatedAt];
    lines.push(values.map((value) => `"${String(value || "").replaceAll('"', '""')}"`).join(","));
  });
  const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "osaka_care_support_directory_with_visits.csv";
  a.click();
  URL.revokeObjectURL(url);
}

async function makeSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const mod = await import("@supabase/supabase-js");
  return mod.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function CloudLoginPanel({ cloudReady, user, email, setEmail, authMessage, syncStatus, onLogin, onLogout, onManualSync }) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-200">
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-start gap-3">
            {cloudReady ? <Cloud className="w-6 h-6 text-slate-700 mt-1" /> : <CloudOff className="w-6 h-6 text-slate-400 mt-1" />}
            <div>
              <h2 className="font-black text-lg">クラウド保存・ログイン</h2>
              <p className="text-sm text-slate-600">
                {cloudReady ? "ログインすると訪問記録をクラウド保存し、別端末でも共有できます。" : "Supabase未設定のため、現在は端末内保存モードです。"}
              </p>
            </div>
          </div>
          <div className="text-sm text-slate-600 flex items-center gap-2">
            <UserCircle className="w-4 h-4" />
            {user?.email || "未ログイン"}
          </div>
        </div>

        {cloudReady && !user && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
            <input
              className="md:col-span-9 w-full px-3 py-2 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-slate-300"
              type="email"
              placeholder="メールアドレスを入力"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="md:col-span-3 rounded-xl" onClick={onLogin} disabled={!email}>
              <LogIn className="w-4 h-4 mr-1" />ログインリンク送信
            </Button>
          </div>
        )}

        {cloudReady && user && (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" onClick={onManualSync}>
              <Save className="w-4 h-4 mr-1" />今すぐ同期
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-1" />ログアウト
            </Button>
          </div>
        )}

        {(authMessage || syncStatus) && (
          <div className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3">
            {authMessage || syncStatus}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function FacilityCard({ item, visit, onVisitChange }) {
  const statusClass = visit.status === "訪問済み"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : visit.status === "訪問予定"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : "bg-slate-50 text-slate-600 border-slate-200";

  function updateVisit(patch) {
    onVisitChange(item.id, {
      ...visit,
      ...patch,
      updatedAt: new Date().toLocaleString("ja-JP"),
    });
  }

  return (
    <Card className="rounded-2xl shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{item.type}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{item.ward}</span>
              <span className={`text-xs px-2 py-1 rounded-full border ${statusClass}`}>{visit.status}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.name}</h3>
            {item.corporation && <p className="text-sm text-slate-500 mt-1">{item.corporation}</p>}
          </div>
          <Building2 className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
        </div>

        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex gap-2">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <span>{item.postalCode && `〒${item.postalCode} `}{item.address || "住所未公開"}</span>
          </div>
          <div className="flex gap-2">
            <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <span>{item.phone || "電話未公開"}{item.fax && ` / FAX ${item.fax}`}</span>
          </div>
          <div className="flex gap-2">
            <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <span>{item.email || "メール未公開"}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <CalendarCheck className="w-4 h-4" />訪問記録
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <select className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white outline-none text-sm" value={visit.status} onChange={(e) => updateVisit({ status: e.target.value })}>
              <option>未訪問</option>
              <option>訪問予定</option>
              <option>訪問済み</option>
            </select>
            <input className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white outline-none text-sm" type="date" value={visit.visitDate} onChange={(e) => updateVisit({ visitDate: e.target.value })} />
          </div>
          <textarea className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white outline-none text-sm min-h-20" placeholder="担当者名、対応内容、次回予定などをメモ" value={visit.memo} onChange={(e) => updateVisit({ memo: e.target.value })} />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="rounded-xl" onClick={() => updateVisit({ status: "訪問済み", visitDate: new Date().toISOString().slice(0, 10) })}>
              <CheckCircle2 className="w-4 h-4 mr-1" />今日訪問済みにする
            </Button>
            <Button size="sm" variant="outline" className="rounded-xl" onClick={() => updateVisit({ status: "未訪問", visitDate: "", memo: "" })}>
              記録クリア
            </Button>
          </div>
          {visit.updatedAt && <p className="text-xs text-slate-500">最終更新：{visit.updatedAt}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          <Button asChild variant="outline" className="rounded-xl">
            <a href={item.phone ? `tel:${item.phone}` : undefined} aria-disabled={!item.phone}><Phone className="w-4 h-4 mr-1" />電話</a>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <a href={item.email ? `mailto:${item.email}` : undefined} aria-disabled={!item.email}><Mail className="w-4 h-4 mr-1" />メール</a>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <a href={makeGoogleMapsUrl(item.address)} target="_blank" rel="noreferrer"><MapPin className="w-4 h-4 mr-1" />地図</a>
          </Button>
          <Button asChild className="rounded-xl">
            <a href={makeRouteUrl(item.address)} target="_blank" rel="noreferrer"><Navigation className="w-4 h-4 mr-1" />ルート</a>
          </Button>
        </div>

        {item.website && (
          <a className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900" href={item.website} target="_blank" rel="noreferrer">
            ホームページ <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}

export default function OsakaCareSupportApp() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [ward, setWard] = useState("すべて");
  const [type, setType] = useState("すべて");
  const [visitFilter, setVisitFilter] = useState("すべて");
  const [visitRecords, setVisitRecords] = useState({});
  const [supabase, setSupabase] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [syncStatus, setSyncStatus] = useState("");

  const cloudReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && supabase);

  useEffect(() => {
    setVisitRecords(loadVisitRecords());
    makeSupabaseClient().then((client) => setSupabase(client)).catch(() => setSupabase(null));
  }, []);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, [supabase]);

  useEffect(() => {
    saveLocalVisitRecords(visitRecords);
  }, [visitRecords]);

  useEffect(() => {
    if (cloudReady && user) {
      loadCloudVisitRecords();
    }
  }, [cloudReady, user?.id]);

  async function loginWithEmail() {
    if (!supabase || !email) return;
    setAuthMessage("ログインリンクを送信中です...");
    const { error: loginError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href },
    });
    if (loginError) {
      setAuthMessage(`ログインリンク送信に失敗しました：${loginError.message}`);
      return;
    }
    setAuthMessage("メールにログインリンクを送信しました。リンクを開くと同期できます。");
  }

  async function logout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setAuthMessage("ログアウトしました。端末内保存モードに戻ります。");
  }

  async function loadCloudVisitRecords() {
    if (!supabase || !user) return;
    setSyncStatus("クラウド記録を読み込み中です...");
    const { data, error: loadError } = await supabase
      .from("visit_records")
      .select("facility_id,status,visit_date,memo,updated_at")
      .eq("user_id", user.id);

    if (loadError) {
      setSyncStatus(`クラウド読み込みに失敗しました：${loadError.message}`);
      return;
    }

    const cloudRecords = {};
    (data || []).forEach((row) => {
      cloudRecords[row.facility_id] = {
        status: row.status || "未訪問",
        visitDate: row.visit_date || "",
        memo: row.memo || "",
        updatedAt: row.updated_at || "",
      };
    });

    setVisitRecords((local) => ({ ...local, ...cloudRecords }));
    setSyncStatus(`クラウド記録を読み込みました：${data?.length || 0}件`);
  }

  async function saveRecordToCloud(itemId, record) {
    if (!supabase || !user) return;
    const payload = {
      user_id: user.id,
      facility_id: itemId,
      status: record.status || "未訪問",
      visit_date: record.visitDate || "",
      memo: record.memo || "",
      updated_at: record.updatedAt || new Date().toLocaleString("ja-JP"),
    };

    const { error: upsertError } = await supabase
      .from("visit_records")
      .upsert(payload, { onConflict: "user_id,facility_id" });

    if (upsertError) setSyncStatus(`クラウド保存に失敗しました：${upsertError.message}`);
    else setSyncStatus("クラウドに保存しました。");
  }

  async function syncAllToCloud() {
    if (!supabase || !user) return;
    const entries = Object.entries(visitRecords);
    if (!entries.length) {
      setSyncStatus("同期する訪問記録がありません。");
      return;
    }

    setSyncStatus("すべての訪問記録をクラウドに同期中です...");
    const payload = entries.map(([facilityId, record]) => ({
      user_id: user.id,
      facility_id: facilityId,
      status: record.status || "未訪問",
      visit_date: record.visitDate || "",
      memo: record.memo || "",
      updated_at: record.updatedAt || new Date().toLocaleString("ja-JP"),
    }));

    const { error: upsertError } = await supabase
      .from("visit_records")
      .upsert(payload, { onConflict: "user_id,facility_id" });

    if (upsertError) setSyncStatus(`一括同期に失敗しました：${upsertError.message}`);
    else setSyncStatus(`一括同期しました：${payload.length}件`);
  }

  function handleVisitChange(itemId, record) {
    setVisitRecords((current) => ({ ...current, [itemId]: record }));
    saveRecordToCloud(itemId, record);
  }

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const kyotakuText = await fetchCsv(DATA_SOURCES[0].url);
      const kyotakuRows = parseCsv(kyotakuText);
      const kyotakuHeaders = kyotakuRows[0] || [];
      const kyotakuItems = kyotakuRows.slice(1).map((row, index) => normalizeKyotakuRow(rowToObject(kyotakuHeaders, row), index)).filter((item) => item.address && item.phone);

      const houkatsuText = await fetchCsv(DATA_SOURCES[1].url);
      const houkatsuRows = parseCsv(houkatsuText);
      const houkatsuItems = normalizeHoukatsuRows(houkatsuRows);

      setItems([...houkatsuItems, ...kyotakuItems]);
    } catch (e) {
      setError("大阪市公式CSVの取得に失敗しました。通信環境、CORS、または大阪市サイトのURL変更をご確認ください。");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const counts = useMemo(() => {
    return items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      const visit = getVisitRecord(visitRecords, item.id);
      acc[visit.status] = (acc[visit.status] || 0) + 1;
      return acc;
    }, {});
  }, [items, visitRecords]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const visit = getVisitRecord(visitRecords, item.id);
      const text = [item.type, item.ward, item.name, item.address, item.phone, item.email, item.corporation, visit.status, visit.visitDate, visit.memo].join(" ").toLowerCase();
      const matchesQuery = !q || text.includes(q);
      const matchesWard = ward === "すべて" || item.ward === ward;
      const matchesType = type === "すべて" || item.type === type;
      const matchesVisit = visitFilter === "すべて" || visit.status === visitFilter;
      return matchesQuery && matchesWard && matchesType && matchesVisit;
    });
  }, [items, query, ward, type, visitFilter, visitRecords]);

  const typeOptions = useMemo(() => ["すべて", ...Array.from(new Set(items.map((item) => item.type))).sort()], [items]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">大阪市 介護相談・居宅支援ナビ</h1>
              <p className="text-sm text-slate-600 mt-1">大阪市限定：居宅介護支援事業所・地域包括支援センター・ブランチを検索し、訪問状況をクラウド保存できます。</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl" onClick={loadData} disabled={loading}><RefreshCw className="w-4 h-4 mr-1" />更新</Button>
              <Button className="rounded-xl" onClick={() => exportCsv(filtered, visitRecords)} disabled={!filtered.length}><Download className="w-4 h-4 mr-1" />CSV</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <CloudLoginPanel
          cloudReady={cloudReady}
          user={user}
          email={email}
          setEmail={setEmail}
          authMessage={authMessage}
          syncStatus={syncStatus}
          onLogin={loginWithEmail}
          onLogout={logout}
          onManualSync={syncAllToCloud}
        />

        <section className="grid grid-cols-2 md:grid-cols-7 gap-3">
          <Card className="rounded-2xl shadow-sm md:col-span-1"><CardContent className="p-4"><div className="text-sm text-slate-500">全件</div><div className="text-3xl font-black">{items.length}</div></CardContent></Card>
          <Card className="rounded-2xl shadow-sm md:col-span-1"><CardContent className="p-4"><div className="text-sm text-slate-500">居宅</div><div className="text-3xl font-black">{counts["居宅介護支援事業所"] || 0}</div></CardContent></Card>
          <Card className="rounded-2xl shadow-sm md:col-span-1"><CardContent className="p-4"><div className="text-sm text-slate-500">地域包括</div><div className="text-3xl font-black">{counts["地域包括支援センター"] || 0}</div></CardContent></Card>
          <Card className="rounded-2xl shadow-sm md:col-span-1"><CardContent className="p-4"><div className="text-sm text-slate-500">ブランチ</div><div className="text-3xl font-black">{counts["総合相談窓口（ブランチ）"] || 0}</div></CardContent></Card>
          <Card className="rounded-2xl shadow-sm md:col-span-1"><CardContent className="p-4"><div className="text-sm text-slate-500">未訪問</div><div className="text-3xl font-black">{counts["未訪問"] || 0}</div></CardContent></Card>
          <Card className="rounded-2xl shadow-sm md:col-span-1"><CardContent className="p-4"><div className="text-sm text-slate-500">予定</div><div className="text-3xl font-black">{counts["訪問予定"] || 0}</div></CardContent></Card>
          <Card className="rounded-2xl shadow-sm md:col-span-1"><CardContent className="p-4"><div className="text-sm text-slate-500">訪問済</div><div className="text-3xl font-black">{counts["訪問済み"] || 0}</div></CardContent></Card>
        </section>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-slate-300" placeholder="名称・住所・電話・法人名・訪問メモで検索" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="md:col-span-2 relative">
                <Filter className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <select className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white outline-none" value={ward} onChange={(e) => setWard(e.target.value)}>
                  <option>すべて</option>
                  {WARDS.map((w) => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div className="md:col-span-3">
                <select className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white outline-none" value={type} onChange={(e) => setType(e.target.value)}>
                  {typeOptions.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <select className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white outline-none" value={visitFilter} onChange={(e) => setVisitFilter(e.target.value)}>
                  {VISIT_STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <StickyNote className="w-4 h-4" />表示中：<strong>{filtered.length}</strong> 件。{cloudReady && user ? "訪問記録はクラウドと端末内の両方に保存されます。" : "訪問記録はこの端末のブラウザに保存されます。"}
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-2 text-amber-900">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-bold">データ取得エラー</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-slate-500">大阪市公式データを読み込み中...</div>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((item) => <FacilityCard key={item.id} item={item} visit={getVisitRecord(visitRecords, item.id)} onVisitChange={handleVisitChange} />)}
          </section>
        )}

        {!loading && !filtered.length && (
          <div className="text-center py-16 text-slate-500">該当する施設がありません。</div>
        )}

        <footer className="text-xs text-slate-500 py-8 space-y-1">
          <p>データ出典：大阪市公式CSV。メールアドレスは公式CSVに含まれる場合のみ表示します。</p>
          <p>地図・ルートはGoogle Mapsリンクを開きます。現在地からの正確な案内は端末側の位置情報許可が必要です。</p>
          <p>Supabase未設定時は端末内保存、設定後はログインユーザーごとにクラウド保存できます。</p>
        </footer>
      </main>
    </div>
  );
}
