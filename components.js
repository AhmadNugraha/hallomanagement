// ============================================================
// components.js — Reusable UI components untuk Hallo Management
// ============================================================

const ICONS = {
  heart:   '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
  doc:     '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  users:   '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
  flag:    '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>',
  clock:   '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  shield:  '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  trend:   '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>',
  alert:   '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
  check:   '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  calendar:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
  home:    '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-7h6v7h3a1 1 0 001-1V10"/></svg>',
  bolt:    '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
  chart:   '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  user:    '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
  building:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
  bell:    '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 11-6 0"/></svg>',
  gear:    '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  'user-plus': '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>',
  'user-switch': '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>',
  sync:    '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
  org:     '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>',
  star:    '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 8.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"/></svg>',
  eye:     '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>',
  eyeOff:  '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>',
  key:     '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>'
};

const COLOR_CLASSES = {
  rose:    { bg: 'bg-rose-50',   text: 'text-rose-600',   dot: 'bg-rose-500'   },
  sky:     { bg: 'bg-sky-50',    text: 'text-sky-600',    dot: 'bg-sky-500'    },
  amber:   { bg: 'bg-amber-50',  text: 'text-amber-600',  dot: 'bg-amber-500'  },
  indigo:  { bg: 'bg-indigo-50', text: 'text-indigo-600', dot: 'bg-indigo-500' },
  emerald: { bg: 'bg-emerald-50',text: 'text-emerald-600',dot: 'bg-emerald-500'},
  red:     { bg: 'bg-red-50',    text: 'text-red-600',    dot: 'bg-red-500'    }
};

// ---------- KPI CARD ----------
function kpiCard(k) {
  const c = COLOR_CLASSES[k.color] || COLOR_CLASSES.indigo;
  return `
    <div class="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft">
      <div class="flex items-center justify-between mb-4">
        <div class="w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center">${ICONS[k.icon] || ICONS.check}</div>
        <span class="text-xs text-gray-500">${k.delta || ''}</span>
      </div>
      <div class="text-3xl font-semibold text-gray-900 leading-none">${k.value}</div>
      <div class="text-sm text-gray-500 mt-2">${k.label}</div>
    </div>`;
}

// ---------- QUICK ACTION CARD ----------
function quickAction(a) {
  const c = COLOR_CLASSES[a.color] || COLOR_CLASSES.indigo;
  return `
    <button class="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft hover:shadow-card hover:border-brand-500 transition text-left group">
      <div class="w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-4">${ICONS[a.icon] || ICONS.bolt}</div>
      <div class="font-semibold text-gray-900 text-sm">${a.title}</div>
      <div class="text-xs text-gray-500 mt-1">${a.desc}</div>
      <div class="text-xs font-medium text-brand-600 mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">Open <span aria-hidden="true">→</span></div>
    </button>`;
}

// ---------- TIMELINE ITEM ----------
function timelineItem(t) {
  const c = COLOR_CLASSES[t.color] || COLOR_CLASSES.indigo;
  return `
    <div class="flex gap-4">
      <div class="flex flex-col items-center">
        <div class="w-9 h-9 rounded-full ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0">${ICONS[t.icon] || ICONS.bolt}</div>
        <div class="w-px flex-1 bg-surface-200 mt-2"></div>
      </div>
      <div class="flex-1 pb-6">
        <div class="text-sm font-medium text-gray-900">${t.title}</div>
        <div class="text-sm text-gray-600 mt-1">${t.desc}</div>
        <div class="text-xs text-gray-400 mt-2">${t.time}</div>
      </div>
    </div>`;
}

// ---------- STATUS BADGE ----------
function statusBadge(status) {
  const map = {
    'Pending':   'bg-amber-50 text-amber-700 border-amber-200',
    'In Review': 'bg-sky-50 text-sky-700 border-sky-200',
    'Overdue':   'bg-red-50 text-red-700 border-red-200',
    'Approved':  'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Rejected':  'bg-gray-100 text-gray-600 border-gray-200'
  };
  return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${map[status] || 'bg-gray-100 text-gray-600 border-gray-200'}">${status}</span>`;
}

// ---------- APPROVAL TABLE ----------
function approvalTable(rows) {
  return `
    <div class="overflow-hidden rounded-2xl border border-surface-200">
      <table class="w-full text-sm">
        <thead class="bg-surface-50 border-b border-surface-200">
          <tr class="text-xs text-gray-500 uppercase tracking-wider">
            <th class="text-left px-5 py-3 font-semibold">Employee</th>
            <th class="text-left px-5 py-3 font-semibold">Request</th>
            <th class="text-left px-5 py-3 font-semibold">Submitted</th>
            <th class="text-left px-5 py-3 font-semibold">Status</th>
            <th class="text-right px-5 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-200 bg-white">
          ${rows.map(r => `
            <tr class="hover:bg-surface-50 transition">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center text-xs font-semibold">${r.avatar}</div>
                  <span class="font-medium text-gray-900">${r.employee}</span>
                </div>
              </td>
              <td class="px-5 py-3.5 text-gray-700">${r.request}</td>
              <td class="px-5 py-3.5 text-gray-500">${r.submitted}</td>
              <td class="px-5 py-3.5">${statusBadge(r.status)}</td>
              <td class="px-5 py-3.5 text-right">
                <button onclick="openApprovalModal('${r.employee}','${r.request}')" class="text-xs font-medium text-brand-600 hover:text-brand-700 hover:underline">Review</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// ---------- BAR CHART (simple inline SVG) ----------
function barChart(d) {
  const max = Math.max(...d.appreciation, ...d.bestpractice, ...d.coaching, ...d.followup);
  const W = 560, H = 220, pad = 30;
  const barW = 16, gap = 4;
  const groupW = (barW + gap) * 4;
  const xStep = (W - pad*2) / d.labels.length;
  const groups = d.labels.map((label, i) => {
    const gx = pad + xStep*i + xStep/2 - groupW/2;
    const values = [d.appreciation[i], d.bestpractice[i], d.coaching[i], d.followup[i]];
    const colors = ['#f43f5e','#0ea5e9','#f59e0b','#ef4444'];
    return { label, gx, values, colors };
  });
  const heights = (v) => (v/max) * (H - pad*2);
  return `
    <svg viewBox="0 0 ${W} ${H}" class="w-full h-auto">
      ${groups.map(g => `
        ${g.values.map((v, i) => `<rect x="${g.gx + (barW+gap)*i}" y="${H-pad-heights(v)}" width="${barW}" height="${heights(v)}" rx="3" fill="${g.colors[i]}"/>`).join('')}
        <text x="${g.gx + groupW/2 - 12}" y="${H-10}" font-size="11" fill="#9ca3af">${g.label}</text>
      `).join('')}
      <line x1="${pad}" y1="${H-pad}" x2="${W-pad}" y2="${H-pad}" stroke="#eaeaec" stroke-width="1"/>
    </svg>
    <div class="flex flex-wrap gap-4 mt-3 text-xs text-gray-600">
      <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Appreciation</span>
      <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-sky-500"></span> Best Practice</span>
      <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-amber-500"></span> Coaching</span>
      <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-red-500"></span> Follow-up</span>
    </div>`;
}

// ---------- DONUT CHART (coaching health) ----------
function donutChart(data) {
  const total = data.completed + data.onTrack + data.dueSoon + data.overdue;
  const segs = [
    { v: data.completed, color: '#10b981', label: 'Completed' },
    { v: data.onTrack,   color: '#6366f1', label: 'On Track'  },
    { v: data.dueSoon,   color: '#f59e0b', label: 'Due Soon'  },
    { v: data.overdue,   color: '#ef4444', label: 'Overdue'   }
  ];
  const r = 60, c = 2*Math.PI*r;
  let offset = 0;
  return `
    <div class="flex items-center gap-6">
      <svg viewBox="0 0 160 160" class="w-32 h-32 -rotate-90">
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="#f5f5f7" stroke-width="16"/>
        ${segs.map(s => {
          const len = (s.v/total)*c;
          const dash = `${len} ${c-len}`;
          const out = `<circle cx="80" cy="80" r="${r}" fill="none" stroke="${s.color}" stroke-width="16" stroke-dasharray="${dash}" stroke-dashoffset="${-offset}" />`;
          offset += len;
          return out;
        }).join('')}
        <text x="80" y="78" text-anchor="middle" font-size="22" font-weight="600" fill="#111827" transform="rotate(90 80 80)">${total}</text>
        <text x="80" y="98" text-anchor="middle" font-size="11" fill="#6b7280" transform="rotate(90 80 80)">total</text>
      </svg>
      <div class="space-y-2 text-sm">
        ${segs.map(s => `
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-sm" style="background:${s.color}"></span>
            <span class="text-gray-700 w-24">${s.label}</span>
            <span class="font-semibold text-gray-900">${s.v}</span>
            <span class="text-xs text-gray-400">${Math.round(s.v/total*100)}%</span>
          </div>`).join('')}
      </div>
    </div>`;
}

// ---------- LINE CHART (engagement trend) ----------
function lineChart(d) {
  const allValues = [...d.appreciation, ...d.bestpractice, ...d.coaching];
  const max = Math.max(...allValues) * 1.1;
  const W = 640, H = 240, pad = 32;
  const xStep = (W - pad*2) / (d.labels.length - 1);
  const points = (arr) => arr.map((v, i) => `${pad + i*xStep},${H-pad-(v/max)*(H-pad*2)}`).join(' ');
  const series = [
    { color: '#f43f5e', values: d.appreciation,  label: 'Appreciation' },
    { color: '#0ea5e9', values: d.bestpractice,  label: 'Best Practice'},
    { color: '#f59e0b', values: d.coaching,      label: 'Coaching'    }
  ];
  return `
    <svg viewBox="0 0 ${W} ${H}" class="w-full h-auto">
      ${[0.25,0.5,0.75].map(t => `<line x1="${pad}" y1="${H-pad-(H-pad*2)*t}" x2="${W-pad}" y2="${H-pad-(H-pad*2)*t}" stroke="#f5f5f7" stroke-width="1"/>`).join('')}
      ${series.map(s => `<polyline fill="none" stroke="${s.color}" stroke-width="2.5" points="${points(s.values)}"/>`).join('')}
      ${series.map(s => s.values.map((v,i) => `<circle cx="${pad+i*xStep}" cy="${H-pad-(v/max)*(H-pad*2)}" r="3" fill="${s.color}"/>`).join('')).join('')}
      ${d.labels.map((l,i) => `<text x="${pad+i*xStep}" y="${H-8}" text-anchor="middle" font-size="10" fill="#9ca3af">${l}</text>`).join('')}
    </svg>
    <div class="flex gap-5 mt-3 text-xs text-gray-600">
      ${series.map(s => `<span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full" style="background:${s.color}"></span> ${s.label}</span>`).join('')}
    </div>`;
}

// ---------- ATTENTION CARD (Insight → Context → Action) ----------
function attentionCard(a) {
  return `
    <div class="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft hover:shadow-card transition">
      <div class="flex items-start gap-3 mb-3">
        <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div class="text-sm font-semibold text-gray-900">${a.insight}</div>
      </div>
      <div class="text-sm text-gray-600 mb-4 pl-11">${a.context}</div>
      <button class="text-xs font-semibold text-brand-600 hover:text-brand-700 pl-11 flex items-center gap-1">${a.action || 'Review'} <span aria-hidden="true">→</span></button>
    </div>`;
}

// ---------- APPROVAL MODAL ----------
function openApprovalModal(employee, request) {
  const root = document.getElementById('modal-root');
  document.getElementById('modal-content').innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Review Request</h3>
        <p class="text-sm text-gray-500 mt-1">${employee} — ${request}</p>
      </div>
      <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="bg-surface-50 rounded-xl p-4 mb-4">
      <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Request Details</div>
      <div class="text-sm text-gray-700">Employee has submitted this request for your review. Please verify the details before approving or rejecting.</div>
    </div>
    <div class="flex gap-3">
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl border border-surface-200 text-sm font-medium text-gray-700 hover:bg-surface-50">Reject</button>
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">Approve</button>
    </div>`;
  root.classList.remove('hidden');
}
function closeModal() { document.getElementById('modal-root').classList.add('hidden'); }

// ============================================================
// NEW: Modul tambahan (PEDULI, Whistle, Agent of Change)
// ============================================================

// ---------- PEDULI VALUE CARD ----------
function valueCard(v) {
  const c = COLOR_CLASSES[v.color] || COLOR_CLASSES.indigo;
  return `
    <div class="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft hover:shadow-card transition">
      <div class="flex items-start justify-between mb-4">
        <div class="w-12 h-12 rounded-xl ${c.bg} ${c.text} flex items-center justify-center text-lg font-bold">${v.letter}</div>
        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">PEDULI</span>
      </div>
      <div class="font-semibold text-gray-900 text-base mb-1">${v.name}</div>
      <div class="text-xs text-gray-500 leading-relaxed mb-4">${v.desc}</div>
      <div class="flex items-center justify-between text-xs mb-2">
        <span class="text-gray-500 font-medium">Adopsi</span>
        <span class="font-semibold text-gray-900">${v.adoption}%</span>
      </div>
      <div class="h-2 bg-surface-100 rounded-full overflow-hidden mb-3">
        <div class="h-full ${c.dot} rounded-full" style="width:${v.adoption}%"></div>
      </div>
      <div class="flex items-center gap-1.5 text-xs text-gray-500">
        ${ICONS.heart}
        <span><span class="font-semibold text-gray-900">${v.recognitionCount}</span> recognition</span>
      </div>
    </div>`;
}

// ---------- WHISTLE SEVERITY BADGE ----------
function severityBadge(sev) {
  const map = {
    critical: 'bg-red-50 text-red-700 border-red-200',
    high:     'bg-orange-50 text-orange-700 border-orange-200',
    medium:   'bg-amber-50 text-amber-700 border-amber-200',
    low:      'bg-slate-50 text-slate-600 border-slate-200'
  };
  return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${map[sev] || map.low}">${sev}</span>`;
}

// ---------- WHISTLE STATUS BADGE ----------
function whistleStatusBadge(s) {
  const map = {
    'Pending':       'bg-amber-50 text-amber-700 border-amber-200',
    'In Review':     'bg-sky-50 text-sky-700 border-sky-200',
    'Investigating': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Escalated':     'bg-red-50 text-red-700 border-red-200',
    'Resolved':      'bg-emerald-50 text-emerald-700 border-emerald-200'
  };
  return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${map[s] || 'bg-gray-100 text-gray-600 border-gray-200'}">${s}</span>`;
}

// ---------- WHISTLE REPORT CARD ----------
function reportCard(r) {
  return `
    <div class="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft hover:shadow-card transition">
      <div class="flex items-start justify-between gap-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono text-gray-400">${r.id}</span>
          ${severityBadge(r.severity)}
        </div>
        ${r.anonymous
          ? `<span class="inline-flex items-center gap-1 text-xs text-gray-500 font-medium">${ICONS.eyeOff}<span>Anonim</span></span>`
          : `<span class="inline-flex items-center gap-1 text-xs text-gray-500 font-medium">${ICONS.eye}<span>Teridentifikasi</span></span>`}
      </div>
      <div class="text-sm font-semibold text-gray-900 mb-1">${r.category}</div>
      <div class="text-sm text-gray-600 leading-relaxed mb-4">${r.summary}</div>
      <div class="flex items-center justify-between pt-3 border-t border-surface-100">
        <div class="flex items-center gap-3 text-xs text-gray-500">
          <span>📅 ${r.submitted}</span>
          <span>👤 ${r.assignedTo}</span>
        </div>
        ${whistleStatusBadge(r.status)}
      </div>
    </div>`;
}

// ---------- AGENT OF CHANGE CARD ----------
function championCard(a) {
  const statusMap = {
    'Pilot':        'bg-slate-50 text-slate-600 border-slate-200',
    'In Progress':  'bg-sky-50 text-sky-700 border-sky-200',
    'Scaling':      'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Completed':    'bg-emerald-50 text-emerald-700 border-emerald-200'
  };
  const adoptionColor = a.adoption >= 80 ? 'bg-emerald-500' : a.adoption >= 50 ? 'bg-amber-500' : 'bg-rose-500';
  return `
    <div class="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft hover:shadow-card transition">
      <div class="flex items-start gap-3 mb-4">
        <div class="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">${a.avatar}</div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-gray-900 text-sm">${a.name}</div>
          <div class="text-xs text-gray-500">${a.division} · ${a.members} anggota tim</div>
        </div>
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusMap[a.status] || statusMap.Pilot}">${a.status}</span>
      </div>
      <div class="mb-3">
        <div class="text-xs text-gray-500 uppercase tracking-wider mb-1">Inisiatif</div>
        <div class="text-sm font-medium text-gray-900">${a.initiative}</div>
      </div>
      <div class="flex items-center justify-between text-xs mb-2">
        <span class="text-gray-500 font-medium">Adopsi Tim</span>
        <span class="font-semibold text-gray-900">${a.adoption}%</span>
      </div>
      <div class="h-2 bg-surface-100 rounded-full overflow-hidden">
        <div class="h-full ${adoptionColor} rounded-full" style="width:${a.adoption}%"></div>
      </div>
    </div>`;
}

// ---------- WHISTLE SUBMIT MODAL ----------
function openWhistleModal() {
  const root = document.getElementById('modal-root');
  document.getElementById('modal-content').innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Submit Whistle Report</h3>
        <p class="text-sm text-gray-500 mt-1">Lapor secara rahasia — identitas terlindungi.</p>
      </div>
      <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="space-y-4">
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Kategori</label>
        <select class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white">
          <option>Etika & Integritas</option>
          <option>Lingkungan Kerja</option>
          <option>Diskriminasi</option>
          <option>Keamanan Data</option>
          <option>Pelanggaran Prosedur</option>
        </select>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Tingkat Urgensi</label>
        <div class="flex gap-2">
          <button class="flex-1 h-10 rounded-xl border border-surface-200 text-sm font-medium text-gray-700 hover:bg-surface-50">Low</button>
          <button class="flex-1 h-10 rounded-xl border border-amber-300 bg-amber-50 text-sm font-medium text-amber-700">Medium</button>
          <button class="flex-1 h-10 rounded-xl border border-surface-200 text-sm font-medium text-gray-700 hover:bg-surface-50">High</button>
          <button class="flex-1 h-10 rounded-xl border border-surface-200 text-sm font-medium text-gray-700 hover:bg-surface-50">Critical</button>
        </div>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Deskripsi</label>
        <textarea class="w-full h-28 rounded-xl border border-surface-200 px-3 py-2 text-sm bg-white resize-none" placeholder="Ceritakan kronologi, lokasi, dan pihak terkait (tanpa identitas pribadi jika anonim)"></textarea>
      </div>
      <div class="flex items-center gap-2 p-3 bg-surface-50 rounded-xl">
        <input type="checkbox" checked class="w-4 h-4 rounded text-brand-600" />
        <span class="text-sm text-gray-700">Kirim sebagai <strong>anonim</strong> (identitas tidak akan disimpan)</span>
      </div>
    </div>
    <div class="flex gap-3 mt-6">
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl border border-surface-200 text-sm font-medium text-gray-700 hover:bg-surface-50">Batal</button>
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">Submit Report</button>
    </div>`;
  root.classList.remove('hidden');
}

// ============================================================
// PEDULI LEADERBOARD (Manager+ only)
// ============================================================

// ---------- LEADERBOARD RANK MEDAL ----------
function rankMedal(rank) {
  if (rank === 1) return '<span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-sm">🥇</span>';
  if (rank === 2) return '<span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-sm">🥈</span>';
  if (rank === 3) return '<span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-sm">🥉</span>';
  return `<span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-100 text-gray-700 font-semibold text-sm">${rank}</span>`;
}

// ---------- LEADERBOARD PERFORMER ROW ----------
function performerRow(p) {
  return `
    <tr class="hover:bg-surface-50 transition">
      <td class="px-4 py-3">${rankMedal(p.rank)}</td>
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">${p.avatar}</div>
          <div>
            <div class="text-sm font-semibold text-gray-900">${p.name}</div>
            <div class="text-xs text-gray-500">${p.division}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-3 text-sm text-gray-700">${p.branch}</td>
      <td class="px-4 py-3 text-right">
        <div class="text-sm font-bold text-gray-900">${p.points}</div>
        <div class="text-xs text-gray-400">pts</div>
      </td>
      <td class="px-4 py-3 text-center text-xs text-gray-600">
        <div><span class="font-semibold text-emerald-600">↑${p.sent}</span> sent</div>
        <div><span class="font-semibold text-brand-600">↓${p.received}</span> recd</div>
      </td>
    </tr>`;
}

// ---------- EXPORT PEDULI LEADERBOARD TO PDF ----------
// Strategy: buka new window dengan print-friendly HTML, auto-trigger print, user saves as PDF
function exportPeduliPDF() {
  const lb = DATA.peduliLeaderboard;
  const totalPerformers = lb.topPerformers.length;
  const totalDivPoints = lb.topDivisions.reduce((a,d) => a + d.points, 0);
  const totalBranchPoints = lb.topBranches.reduce((a,b) => a + b.points, 0);

  const w = window.open('', '_blank', 'width=900,height=1100');
  if (!w) { alert('Popup diblokir — izinkan popup untuk export PDF.'); return; }

  w.document.write(`<!DOCTYPE html>
<html lang="id"><head>
<meta charset="UTF-8">
<title>PEDULI Leaderboard Report — ${lb.period}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #111827; margin: 0; padding: 40px; background: #fff; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  h2 { font-size: 14px; margin: 28px 0 12px; padding-bottom: 6px; border-bottom: 2px solid #4f46e5; text-transform: uppercase; letter-spacing: 0.05em; color: #4f46e5; }
  h3 { font-size: 13px; margin: 0 0 8px; }
  p { font-size: 12px; color: #6b7280; margin: 2px 0; }
  .meta { display: flex; gap: 24px; margin: 8px 0 16px; font-size: 11px; color: #6b7280; }
  .meta strong { color: #111827; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 11px; }
  th { background: #f5f5f7; padding: 8px 10px; text-align: left; font-weight: 600; color: #6b7280; text-transform: uppercase; font-size: 10px; letter-spacing: 0.05em; border-bottom: 1px solid #eaeaec; }
  td { padding: 8px 10px; border-bottom: 1px solid #f5f5f7; }
  tr:nth-child(even) td { background: #fafafa; }
  .right { text-align: right; }
  .center { text-align: center; }
  .pos { color: #059669; font-weight: 600; }
  .neg { color: #dc2626; font-weight: 600; }
  .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0; }
  .summary-card { background: #eef2ff; border-radius: 8px; padding: 12px; }
  .summary-card .num { font-size: 20px; font-weight: 700; color: #4f46e5; }
  .summary-card .lbl { font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
  .footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #eaeaec; font-size: 10px; color: #9ca3af; text-align: center; }
  .medal { display: inline-block; width: 24px; height: 24px; line-height: 24px; text-align: center; border-radius: 50%; font-size: 12px; }
  .m1 { background: #fef3c7; }
  .m2 { background: #e5e7eb; }
  .m3 { background: #fed7aa; }
  .bar { height: 8px; background: #eef2ff; border-radius: 4px; overflow: hidden; margin-top: 4px; }
  .bar > div { height: 100%; background: #4f46e5; border-radius: 4px; }
  @media print { body { padding: 24px; } .no-print { display: none; } }
  .toolbar { position: sticky; top: 0; background: #fff; padding: 8px 0; margin-bottom: 16px; border-bottom: 1px solid #eaeaec; display: flex; justify-content: space-between; align-items: center; }
  .toolbar button { background: #4f46e5; color: #fff; border: 0; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 12px; }
  .toolbar .hint { font-size: 11px; color: #6b7280; }
</style>
</head><body>
  <div class="toolbar no-print">
    <span class="hint">Gunakan <strong>Print → Save as PDF</strong> di dialog browser untuk menyimpan.</span>
    <button onclick="window.print()">🖨 Print / Save PDF</button>
  </div>

  <h1>⭐ PEDULI Leaderboard Report</h1>
  <div class="meta">
    <span><strong>Periode:</strong> ${lb.period}</span>
    <span><strong>Generated:</strong> ${lb.generatedAt}</span>
    <span><strong>Audience:</strong> Manager / HR / Admin / Executive</span>
    <span><strong>Classification:</strong> Internal</span>
  </div>

  <div class="summary-grid">
    <div class="summary-card"><div class="num">${totalPerformers}</div><div class="lbl">Top Performers</div></div>
    <div class="summary-card"><div class="num">${lb.topDivisions.length}</div><div class="lbl">Active Divisions</div></div>
    <div class="summary-card"><div class="num">${lb.topBranches.length}</div><div class="lbl">Active Branches</div></div>
    <div class="summary-card"><div class="num">${(totalDivPoints + totalBranchPoints).toLocaleString()}</div><div class="lbl">Total PEDULI Points</div></div>
  </div>

  <h2>🏆 Top 10 Performers</h2>
  <table>
    <thead>
      <tr>
        <th style="width:50px">Rank</th>
        <th>Nama</th>
        <th>Divisi</th>
        <th>Cabang</th>
        <th class="right">Points</th>
        <th class="center">Activity</th>
      </tr>
    </thead>
    <tbody>
      ${lb.topPerformers.map(p => `
        <tr>
          <td>${p.rank === 1 ? '<span class="medal m1">🥇</span>' : p.rank === 2 ? '<span class="medal m2">🥈</span>' : p.rank === 3 ? '<span class="medal m3">🥉</span>' : p.rank}</td>
          <td><strong>${p.name}</strong></td>
          <td>${p.division}</td>
          <td>${p.branch}</td>
          <td class="right"><strong>${p.points}</strong></td>
          <td class="center">↑${p.sent} sent · ↓${p.received} recd</td>
        </tr>`).join('')}
    </tbody>
  </table>

  <h2>📊 Top Divisions</h2>
  <table>
    <thead>
      <tr>
        <th>Divisi</th>
        <th class="right">Members</th>
        <th class="right">Total Points</th>
        <th class="right">Avg / Member</th>
        <th class="right">Change QoQ</th>
        <th>Share</th>
      </tr>
    </thead>
    <tbody>
      ${lb.topDivisions.map(d => {
        const maxPoints = Math.max(...lb.topDivisions.map(x => x.points));
        const pct = Math.round((d.points / maxPoints) * 100);
        const changeCls = d.change.startsWith('+') ? 'pos' : d.change.startsWith('-') ? 'neg' : '';
        return `
        <tr>
          <td><strong>${d.name}</strong></td>
          <td class="right">${d.members}</td>
          <td class="right"><strong>${d.points.toLocaleString()}</strong></td>
          <td class="right">${d.avg}</td>
          <td class="right ${changeCls}">${d.change}</td>
          <td><div class="bar"><div style="width:${pct}%"></div></div></td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>

  <h2>📍 Top Branches</h2>
  <table>
    <thead>
      <tr>
        <th>Cabang</th>
        <th class="right">Members</th>
        <th class="right">Total Points</th>
        <th class="right">Avg / Member</th>
      </tr>
    </thead>
    <tbody>
      ${lb.topBranches.map(b => `
        <tr>
          <td><strong>${b.name}</strong></td>
          <td class="right">${b.members}</td>
          <td class="right"><strong>${b.points.toLocaleString()}</strong></td>
          <td class="right">${b.avg}</td>
        </tr>`).join('')}
    </tbody>
  </table>

  <div class="footer">
    Hallo Management — Confidential Internal Report · Dihasilkan otomatis dari data PEDULI recognition system<br>
    Skor dihitung dari jumlah apresiasi yang dikirim & diterima, dibobotkan per nilai PEDULI.
  </div>
</body></html>`);
  w.document.close();
  // Auto-trigger print dialog once content is ready
  setTimeout(() => w.print(), 600);
}

// ---------- EMPLOYEE APPRECIATION ROW ----------
function myAppreciationItem(item, type) {
  // type: 'sent' (peer-to-peer) or 'received' (top-down)
  const c = COLOR_CLASSES.indigo;
  const valueColorMap = { P: 'rose', E: 'indigo', D: 'amber', U: 'sky', L: 'emerald', I: 'red' };
  const vc = COLOR_CLASSES[valueColorMap[item.value]] || c;
  if (type === 'sent') {
    return `
      <div class="flex items-start gap-3 p-3 rounded-xl bg-surface-50">
        <div class="w-9 h-9 rounded-lg ${vc.bg} ${vc.text} flex items-center justify-center text-xs font-bold flex-shrink-0">${item.value}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <div class="text-xs font-semibold text-gray-900">To: ${item.recipient}</div>
            <div class="text-xs text-gray-400">${item.date}</div>
          </div>
          <div class="text-xs text-brand-700 font-medium mb-1">${item.value} — ${item.valueName}</div>
          <div class="text-sm text-gray-700 italic">"${item.message}"</div>
        </div>
      </div>`;
  }
  return `
    <div class="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-100">
      <div class="w-9 h-9 rounded-lg ${vc.bg} ${vc.text} flex items-center justify-center text-xs font-bold flex-shrink-0">${item.value}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-1">
          <div class="text-xs font-semibold text-gray-900">From: ${item.sender}</div>
          <div class="text-xs text-gray-400">${item.date}</div>
        </div>
        <div class="text-xs text-brand-700 font-semibold mb-1">🏆 ${item.title}</div>
        <div class="text-xs text-gray-500 mb-1">${item.value} — ${item.valueName}</div>
        <div class="text-sm text-gray-700 italic">"${item.message}"</div>
      </div>
    </div>`;
}

// ---------- APPRECIATION SUBMIT MODAL (peer-to-peer) ----------
function openAppreciationModal() {
  const root = document.getElementById('modal-root');
  document.getElementById('modal-content').innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Kirim Apresiasi (Peer-to-Peer)</h3>
        <p class="text-sm text-gray-500 mt-1">Apresiasi untuk rekan kerja berdasarkan nilai PEDULI.</p>
      </div>
      <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Untuk</label>
        <input type="text" placeholder="Cari nama rekan kerja..." class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white" />
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Nilai PEDULI</label>
        <div class="grid grid-cols-6 gap-2">
          ${DATA.peduliValues.map(v => {
            const vc = COLOR_CLASSES[v.color] || COLOR_CLASSES.indigo;
            return `
              <button class="flex flex-col items-center p-2 rounded-xl border border-surface-200 hover:border-brand-500 transition">
                <div class="w-9 h-9 rounded-lg ${vc.bg} ${vc.text} flex items-center justify-center text-sm font-bold">${v.letter}</div>
                <div class="text-[10px] text-gray-700 mt-1 font-medium">${v.name}</div>
              </button>`;
          }).join('')}
        </div>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Pesan</label>
        <textarea class="w-full h-24 rounded-xl border border-surface-200 px-3 py-2 text-sm bg-white resize-none" placeholder="Ceritakan apa yang rekan Anda lakukan dan mengapa hal itu berarti..."></textarea>
      </div>

      <!-- Attachment section -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Lampiran <span class="text-gray-400 normal-case font-normal">(opsional)</span></label>
          <span class="text-xs text-gray-500">Maks 10MB · JPG/PNG/PDF/DOC</span>
        </div>
        <div id="attach-zone" class="relative border-2 border-dashed border-surface-200 rounded-xl p-4 hover:border-brand-400 hover:bg-brand-50/30 transition cursor-pointer">
          <input type="file" multiple accept="image/*,.pdf,.doc,.docx" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onchange="handleAppreciationAttach(event)" />
          <div class="flex flex-col items-center text-center py-2">
            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
            </div>
            <div class="text-sm text-gray-700 font-medium">Klik atau drop file di sini</div>
            <div class="text-xs text-gray-500 mt-1">Bisa lebih dari satu file · Maks 10MB per file</div>
          </div>
        </div>
        <div id="attach-list" class="mt-3 space-y-2"></div>
      </div>

      <div class="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
        <input type="checkbox" class="w-4 h-4 rounded text-brand-600" />
        <span class="text-sm text-gray-700">Buat <strong>anonim</strong> (nama saya tidak akan ditampilkan)</span>
      </div>
    </div>
    <div class="flex gap-3 mt-6">
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl border border-surface-200 text-sm font-medium text-gray-700 hover:bg-surface-50">Batal</button>
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">Kirim Apresiasi</button>
    </div>`;
  root.classList.remove('hidden');
}

// ---------- APPRECIATION ATTACHMENT HANDLER ----------
// Simulasi: validasi tipe + ukuran, tampilkan preview list
const APPRECIATION_ATTACH_MAX_BYTES = 10 * 1024 * 1024; // 10MB
const APPRECIATION_ATTACH_MAX_FILES = 5;
const APPRECIATION_ATTACH_ALLOWED = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

function formatBytes(b) {
  if (b < 1024) return b + ' B';
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1024 / 1024).toFixed(2) + ' MB';
}

function handleAppreciationAttach(event) {
  const files = Array.from(event.target.files || []);
  const list = document.getElementById('attach-list');
  if (!list) return;
  for (const f of files) {
    // Validasi tipe
    if (!APPRECIATION_ATTACH_ALLOWED.includes(f.type)) {
      alert(`File "${f.name}" ditolak: tipe ${f.type || 'unknown'} tidak didukung.\nHanya JPG, PNG, GIF, PDF, DOC, DOCX.`);
      continue;
    }
    // Validasi ukuran
    if (f.size > APPRECIATION_ATTACH_MAX_BYTES) {
      alert(`File "${f.name}" terlalu besar: ${formatBytes(f.size)}.\nMaks 10MB per file.`);
      continue;
    }
    // Tambah ke list
    const isImage = f.type.startsWith('image/');
    const icon = isImage ? '🖼' : f.type.includes('pdf') ? '📄' : '📝';
    const ext = (f.name.split('.').pop() || '').toUpperCase();
    const item = document.createElement('div');
    item.className = 'flex items-center gap-3 p-2.5 rounded-xl bg-surface-50 border border-surface-200';
    item.innerHTML = `
      <div class="w-9 h-9 rounded-lg bg-white border border-surface-200 flex items-center justify-center text-base flex-shrink-0">${icon}</div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium text-gray-900 truncate">${f.name}</div>
        <div class="text-xs text-gray-500">${ext} · ${formatBytes(f.size)}</div>
      </div>
      <button onclick="this.parentElement.remove()" class="w-7 h-7 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 flex items-center justify-center flex-shrink-0" title="Hapus">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>`;
    list.appendChild(item);
  }
  // Reset input supaya bisa pilih file yang sama lagi
  event.target.value = '';
}

// ============================================================
// COACHING & FOLLOW UP (Manager focus)
// ============================================================

// ---------- COACHING SESSION CARD ----------
function coachingCard(s, isManager) {
  const typeMap = {
    '1-on-1':        'bg-sky-50 text-sky-700 border-sky-200',
    'Performance':   'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Career':        'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Project':       'bg-amber-50 text-amber-700 border-amber-200'
  };
  const statusMap = {
    'scheduled': 'bg-blue-50 text-blue-700 border-blue-200',
    'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'overdue':   'bg-red-50 text-red-700 border-red-200',
    'cancelled': 'bg-slate-50 text-slate-500 border-slate-200'
  };
  const followUpMap = {
    'pending':   { badge: 'bg-amber-50 text-amber-700 border-amber-200', label: '⏳ Follow-up Pending' },
    'completed': { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: '✓ Follow-up Done' },
    'overdue':   { badge: 'bg-red-50 text-red-700 border-red-200', label: '⚠ Follow-up Overdue' }
  };

  // Get employee initials for avatar
  const initials = s.employee.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();

  return `
    <div class="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft hover:shadow-card transition">
      <!-- Header -->
      <div class="flex items-start gap-3 mb-4">
        <div class="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">${initials}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2 mb-1">
            <div class="font-semibold text-gray-900 text-sm">${s.employee}</div>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusMap[s.status] || statusMap.scheduled}">${s.status}</span>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${typeMap[s.type] || typeMap['1-on-1']}">${s.type}</span>
            <span class="text-xs text-gray-500">📅 ${s.scheduledDate}</span>
            <span class="text-xs text-gray-500">⏱ ${s.duration} min</span>
          </div>
        </div>
      </div>

      <!-- Topic -->
      <div class="mb-3">
        <div class="text-xs text-gray-500 uppercase tracking-wider mb-1">Topik Sesi</div>
        <div class="text-sm font-medium text-gray-900">${s.topic}</div>
      </div>

      ${s.notes ? `
        <!-- Notes (only for completed) -->
        <div class="mb-3 p-3 bg-surface-50 rounded-xl border border-surface-100">
          <div class="text-xs text-gray-500 uppercase tracking-wider mb-1">Catatan Sesi</div>
          <div class="text-sm text-gray-700 leading-relaxed">${s.notes}</div>
        </div>
      ` : ''}

      ${s.actionItems && s.actionItems.length ? `
        <div class="mb-3">
          <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Komitmen & Action Items</div>
          <ul class="space-y-1.5">
            ${s.actionItems.map(a => `
              <li class="flex items-start gap-2 text-sm text-gray-700">
                <span class="w-4 h-4 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5"></span>
                <span>${a}</span>
              </li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${s.followUpDate ? `
        <!-- Follow-up -->
        <div class="flex items-center justify-between gap-3 pt-3 border-t border-surface-100">
          <div class="flex items-center gap-2 text-xs">
            <span class="text-gray-500">📆 Follow-up:</span>
            <span class="font-semibold text-gray-900">${s.followUpDate}</span>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${followUpMap[s.followUpStatus].badge}">${followUpMap[s.followUpStatus].label}</span>
          </div>
          ${isManager && s.followUpStatus !== 'completed' ? `
            <button onclick="markFollowUpDone('${s.id}')" class="text-xs font-semibold text-brand-600 hover:text-brand-700">Mark Done →</button>
          ` : ''}
        </div>
      ` : ''}

      ${isManager && s.status === 'scheduled' ? `
        <!-- Actions for manager on upcoming session -->
        <div class="flex items-center gap-2 pt-3 mt-3 border-t border-surface-100">
          <button class="text-xs font-medium text-gray-700 hover:text-brand-600">Reschedule</button>
          <span class="text-gray-300">·</span>
          <button class="text-xs font-medium text-gray-700 hover:text-brand-600">Add Notes</button>
          <span class="text-gray-300">·</span>
          <button class="text-xs font-medium text-red-600 hover:text-red-700">Cancel</button>
        </div>
      ` : ''}
    </div>`;
}

// ---------- COACHING SCHEDULE MODAL (Manager only) ----------
function openCoachingScheduleModal() {
  const root = document.getElementById('modal-root');
  document.getElementById('modal-content').innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Schedule Coaching Session</h3>
        <p class="text-sm text-gray-500 mt-1">Jadwalkan sesi coaching dengan anggota tim Anda.</p>
      </div>
      <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="space-y-4">
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Anggota Tim</label>
        <select class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white">
          <option>Andi Saputra</option>
          <option>Rina Melati</option>
          <option>Dimas Putra</option>
          <option>Tio Wibowo</option>
        </select>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Tanggal</label>
          <input type="date" class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white" />
        </div>
        <div>
          <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Durasi</label>
          <select class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white">
            <option>30 menit</option>
            <option>45 menit</option>
            <option selected>60 menit</option>
            <option>90 menit</option>
          </select>
        </div>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Tipe Coaching</label>
        <div class="grid grid-cols-4 gap-2">
          ${['1-on-1','Performance','Career','Project'].map((t, i) => `
            <button class="px-2 py-2 rounded-xl border ${i === 0 ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-surface-200 text-gray-700'} text-xs font-medium">${t}</button>
          `).join('')}
        </div>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Topik Sesi</label>
        <input type="text" placeholder="Misal: Career development — leadership path" class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white" />
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Agenda / Catatan Awal</label>
        <textarea class="w-full h-20 rounded-xl border border-surface-200 px-3 py-2 text-sm bg-white resize-none" placeholder="Poin-poin yang akan dibahas..."></textarea>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Follow-up Date <span class="text-gray-400 normal-case font-normal">(tanggal tinjau berikutnya)</span></label>
        <input type="date" class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white" />
      </div>
    </div>
    <div class="flex gap-3 mt-6">
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl border border-surface-200 text-sm font-medium text-gray-700 hover:bg-surface-50">Batal</button>
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">Schedule Session</button>
    </div>`;
  root.classList.remove('hidden');
}

// Placeholder handler — di production akan update data & re-render
function markFollowUpDone(sessionId) {
  alert(`Mark follow-up done untuk sesi ${sessionId} (simulasi prototype).`);
}


// ============================================================
// BEST PRACTICE SHARING
// ============================================================

// ---------- BEST PRACTICE STATUS BADGE ----------
function bpStatusBadge(status) {
  const map = {
    draft:     'bg-slate-50 text-slate-600 border-slate-200',
    submitted: 'bg-amber-50 text-amber-700 border-amber-200',
    in_review: 'bg-sky-50 text-sky-700 border-sky-200',
    approved:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected:  'bg-red-50 text-red-700 border-red-200',
    published: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  };
  const labels = { draft:'Draft', submitted:'Submitted', in_review:'In Review', approved:'Approved', rejected:'Rejected', published:'Published' };
  return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${map[status] || map.draft}">${labels[status] || status}</span>`;
}

// ---------- VOTER AVATARS ----------
function voterAvatars(avatars, total) {
  const more = Math.max(0, total - avatars.length);
  return `
    <div class="flex -space-x-2">
      ${avatars.slice(0, 4).map(a => `
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center text-[10px] font-semibold border-2 border-white">${a}</div>
      `).join('')}
      ${more > 0 ? `<div class="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-semibold border-2 border-white">+${more}</div>` : ''}
    </div>`;
}

// ---------- ATTACHMENT CHIPS ----------
function bpAttachmentChip(att) {
  const isImage = att.type === 'image';
  const icon = isImage ? '🖼' : att.type === 'pdf' ? '📄' : '📝';
  return `
    <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-50 border border-surface-200">
      <span class="text-sm">${icon}</span>
      <span class="text-xs font-medium text-gray-700">${att.name}</span>
      <span class="text-xs text-gray-400">·</span>
      <span class="text-xs text-gray-500">${att.size}</span>
    </div>`;
}

// ---------- BEST PRACTICE CARD ----------
function bestPracticeCard(bp, ctx) {
  const isCurator = ctx.isCurator; // manager
  const isSubmitter = ctx.userName === bp.submitter;
  const dayLabel = DATA.bpScheduleDays.find(d => d.day === bp.scheduleDay);

  return `
    <div class="bg-white rounded-2xl border ${bp.isSpotlight ? 'border-amber-300 shadow-card ring-1 ring-amber-200' : 'border-surface-200 shadow-soft'} hover:shadow-card transition overflow-hidden">
      ${bp.isSpotlight ? `
        <div class="bg-gradient-to-r from-amber-50 to-amber-100 px-5 py-2 flex items-center gap-2 border-b border-amber-200">
          <span class="text-lg">⭐</span>
          <span class="text-xs font-semibold text-amber-800 uppercase tracking-wider">Spotlight Mingguan</span>
        </div>
      ` : ''}
      <div class="p-5">
          <!-- Header -->
          <div class="flex items-start gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">${bp.submitterAvatar}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="font-semibold text-gray-900 text-sm">${bp.submitter}</span>
                <span class="text-xs text-gray-400">·</span>
                <span class="text-xs text-gray-500">${bp.division}</span>
                <span class="text-xs text-gray-400">·</span>
                <span class="text-xs text-gray-500">${bp.submittedDate}</span>
              </div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
                  ${dayLabel?.emoji || '📅'} ${dayLabel?.label || bp.scheduleDay}
                </span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200">${bp.category}</span>
                ${bpStatusBadge(bp.status)}
              </div>
            </div>
          </div>

          <!-- Title + Description -->
          <h3 class="text-base font-semibold text-gray-900 mb-2">${bp.title}</h3>
          <p class="text-sm text-gray-600 leading-relaxed mb-4">${bp.description}</p>

          ${bp.tags && bp.tags.length ? `
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${bp.tags.map(t => `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-surface-100 text-gray-600">#${t}</span>`).join('')}
            </div>
          ` : ''}

          ${bp.attachments && bp.attachments.length ? `
            <div class="flex flex-wrap gap-2 mb-4">
              ${bp.attachments.map(a => bpAttachmentChip(a)).join('')}
            </div>
          ` : ''}

          ${bp.curator ? `
            <div class="text-xs text-gray-500 mb-3 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <span>Kurasi oleh <strong class="text-gray-700">${bp.curator}</strong> pada ${bp.curatedDate}</span>
            </div>
          ` : ''}

          <!-- Footer: voting + actions -->
          <div class="flex items-center justify-between gap-3 pt-3 border-t border-surface-100">
            <div class="flex items-center gap-3">
              <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition text-sm font-semibold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.008L7 10m7-10L7 10"/></svg>
                Vote
              </button>
              <span class="text-sm font-bold text-gray-900">${bp.votes}</span>
              ${voterAvatars(bp.voterAvatars, bp.votes)}
            </div>

            <div class="flex items-center gap-2">
              ${isSubmitter && bp.status === 'draft' ? `
                <button class="text-xs font-medium text-gray-700 hover:text-brand-600">Edit</button>
              ` : ''}
              ${isCurator && (bp.status === 'submitted' || bp.status === 'in_review') ? `
                <button onclick="openCurationModal('${bp.id}')" class="text-xs font-semibold text-brand-600 hover:text-brand-700">Review & Kurasi →</button>
              ` : ''}
              ${isCurator && bp.status === 'approved' ? `
                <button class="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Publish →</button>
              ` : ''}
            </div>
          </div>
        </div>
    </div>`;
}

// ---------- BEST PRACTICE SUBMIT MODAL ----------
function openBPSubmitModal() {
  const root = document.getElementById('modal-root');
  document.getElementById('modal-content').innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Submit Best Practice</h3>
        <p class="text-sm text-gray-500 mt-1">Bagikan ide, lessons learned, atau inisiatif yang bisa di-replicate tim lain.</p>
      </div>
      <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Judul Best Practice</label>
        <input type="text" placeholder="Misal: Cara reduce cloud cost 30% dengan scheduled instance" class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Hari Submit</label>
          <select class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white">
            ${DATA.bpScheduleDays.map(d => `<option>${d.label} (${d.day})</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Kategori</label>
          <select class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white">
            <option>Marketing & Branding</option>
            <option>Process & Efficiency</option>
            <option>Technology</option>
            <option>Team & Culture</option>
            <option>People & Culture</option>
          </select>
        </div>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Deskripsi / Langkah-langkah</label>
        <textarea class="w-full h-32 rounded-xl border border-surface-200 px-3 py-2 text-sm bg-white resize-none" placeholder="Jelaskan context, apa yang Anda lakukan, hasil yang dicapai, dan bagaimana tim lain bisa replicate..."></textarea>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Tags</label>
        <input type="text" placeholder="engagement, campaign, social-media (pisahkan dengan koma)" class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white" />
      </div>

      <!-- Attachment section (reuse) -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Lampiran Pendukung <span class="text-gray-400 normal-case font-normal">(opsional)</span></label>
          <span class="text-xs text-gray-500">Maks 10MB · JPG/PNG/PDF/DOC</span>
        </div>
        <div id="bp-attach-zone" class="relative border-2 border-dashed border-surface-200 rounded-xl p-4 hover:border-brand-400 hover:bg-brand-50/30 transition cursor-pointer">
          <input type="file" multiple accept="image/*,.pdf,.doc,.docx" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onchange="handleAppreciationAttach(event)" />
          <div class="flex flex-col items-center text-center py-2">
            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
            </div>
            <div class="text-sm text-gray-700 font-medium">Klik atau drop file di sini</div>
            <div class="text-xs text-gray-500 mt-1">Lampirkan data, screenshot, atau dokumen pendukung</div>
          </div>
        </div>
        <div id="attach-list" class="mt-3 space-y-2"></div>
      </div>

      <div class="flex items-start gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
        <div class="text-blue-600 flex-shrink-0 text-lg">ℹ️</div>
        <div class="text-xs text-gray-700">Best Practice akan melalui <strong>kurasi Manager</strong> sebelum dipublikasikan. Anda akan dinotifikasi jika disetujui/ditolak.</div>
      </div>
    </div>
    <div class="flex gap-3 mt-6">
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl border border-surface-200 text-sm font-medium text-gray-700 hover:bg-surface-50">Simpan Draft</button>
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">Submit untuk Kurasi</button>
    </div>`;
  root.classList.remove('hidden');
}

// ---------- BEST PRACTICE CURATION MODAL (Manager) ----------
function openCurationModal(bpId) {
  const bp = DATA.bestPractices.find(b => b.id === bpId);
  if (!bp) return;
  const root = document.getElementById('modal-root');
  document.getElementById('modal-content').innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Kurasi Best Practice</h3>
        <p class="text-sm text-gray-500 mt-1">Review, setujui/tolak, dan publikasikan BP-${bp.id}.</p>
      </div>
      <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div class="bg-surface-50 rounded-xl p-4">
        <div class="text-xs text-gray-500 mb-1">Submission dari</div>
        <div class="text-sm font-semibold text-gray-900">${bp.submitter} · ${bp.division} · ${bp.submittedDate}</div>
        <div class="mt-3 text-base font-semibold text-gray-900">${bp.title}</div>
        <p class="mt-2 text-sm text-gray-700 leading-relaxed">${bp.description}</p>
      </div>
      ${bp.attachments && bp.attachments.length ? `
        <div>
          <div class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Lampiran (${bp.attachments.length})</div>
          <div class="flex flex-wrap gap-2">
            ${bp.attachments.map(a => bpAttachmentChip(a)).join('')}
          </div>
        </div>
      ` : ''}
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Catatan Kurasi</label>
        <textarea class="w-full h-24 rounded-xl border border-surface-200 px-3 py-2 text-sm bg-white resize-none" placeholder="Catatan internal (tidak ditampilkan ke publik)..."></textarea>
      </div>
      <div>
        <label class="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 cursor-pointer">
          <input type="checkbox" class="w-4 h-4 rounded text-amber-600" />
          <span class="text-sm text-gray-700">Jadikan <strong>Spotlight Mingguan</strong> (auto-featured di dashboard)</span>
        </label>
      </div>
    </div>
    <div class="flex gap-3 mt-6">
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl border border-red-200 bg-red-50 text-sm font-medium text-red-700 hover:bg-red-100">Tolak</button>
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Setujui & Publish</button>
    </div>`;
  root.classList.remove('hidden');
}

// ============================================================
// NOTIFICATIONS & APPROVALS
// ============================================================

// ---------- NOTIFICATION ITEM ----------
function notificationItem(n) {
  const typeMap = {
    appreciation:  { bg: 'bg-rose-50',    text: 'text-rose-600',    icon: 'heart' },
    coaching:      { bg: 'bg-amber-50',   text: 'text-amber-600',   icon: 'users' },
    approval:      { bg: 'bg-indigo-50',  text: 'text-indigo-600',  icon: 'check' },
    bestpractice:  { bg: 'bg-sky-50',     text: 'text-sky-600',     icon: 'doc' },
    whistle:       { bg: 'bg-red-50',     text: 'text-red-600',     icon: 'shield' },
    system:        { bg: 'bg-slate-50',   text: 'text-slate-600',   icon: 'bell' }
  };
  const t = typeMap[n.type] || typeMap.system;
  const channelIcon = n.channel === 'email' ? '✉️' : n.channel === 'both' ? '📬' : '📱';
  return `
    <div class="flex items-start gap-3 p-3 rounded-xl ${n.read ? 'bg-white' : 'bg-brand-50/40 border border-brand-100'} hover:bg-surface-50 transition cursor-pointer">
      <div class="w-10 h-10 rounded-xl ${t.bg} ${t.text} flex items-center justify-center flex-shrink-0">${ICONS[t.icon] || ICONS.bell}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-2 mb-1">
          <div class="text-sm font-semibold ${n.read ? 'text-gray-700' : 'text-gray-900'}">${n.title}</div>
          ${!n.read ? '<span class="w-2 h-2 rounded-full bg-brand-600 flex-shrink-0"></span>' : ''}
        </div>
        <div class="text-xs text-gray-600 mb-1.5 line-clamp-2">${n.message}</div>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <span>${n.timestamp}</span>
          <span>·</span>
          <span>${channelIcon} ${n.channel}</span>
          ${n.priority === 'high' ? '<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-medium">High</span>' : ''}
        </div>
      </div>
    </div>`;
}

// ---------- APPROVAL CARD (with e-signature inline) ----------
function approvalCard(a, ctx) {
  const isManager = ctx.role === 'manager';
  const isExecutive = ctx.role === 'executive';
  const isHR = ctx.role === 'hr';

  const myStep = a.steps.find(s => {
    if (s.role === 'Manager' && isManager) return true;
    if (s.role === 'Executive' && isExecutive) return true;
    return false;
  });
  const canSign = myStep && myStep.status === 'pending';

  const typeMap = {
    best_practice:        { bg: 'bg-sky-50',    text: 'text-sky-700',    label: 'Best Practice' },
    agent_of_change:      { bg: 'bg-indigo-50', text: 'text-indigo-700', label: 'Agent of Change' },
    coaching_performance: { bg: 'bg-amber-50',  text: 'text-amber-700',  label: 'Performance Review' }
  };
  const typeInfo = typeMap[a.type] || typeMap.best_practice;

  return `
    <div class="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft">
      <div class="flex items-start gap-3 mb-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${typeInfo.bg} ${typeInfo.text}">${typeInfo.label}</span>
        <span class="text-xs font-mono text-gray-400">${a.id}</span>
        <span class="ml-auto text-xs text-gray-400">${a.submittedDate}</span>
      </div>
      <div class="text-sm font-semibold text-gray-900 mb-1">${a.title}</div>
      <div class="text-xs text-gray-500 mb-4">Dari: ${a.requester}</div>

      <!-- Workflow Steps -->
      <div class="space-y-2 mb-4">
        ${a.steps.map((step, idx) => {
          const statusBadge = step.status === 'approved' ? '<span class="inline-flex items-center gap-1 text-xs font-medium text-emerald-700"><span class="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">✓</span> Approved</span>'
            : step.status === 'pending' ? '<span class="inline-flex items-center gap-1 text-xs font-medium text-amber-700"><span class="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 animate-pulse">⏱</span> Pending</span>'
            : '<span class="inline-flex items-center gap-1 text-xs font-medium text-slate-500"><span class="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">—</span> Waiting</span>';
          return `
            <div class="flex items-center justify-between p-2.5 rounded-lg ${step.status === 'pending' ? 'bg-amber-50 border border-amber-100' : 'bg-surface-50'}">
              <div class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-full bg-white border-2 ${step.status === 'approved' ? 'border-emerald-200' : step.status === 'pending' ? 'border-amber-300' : 'border-slate-200'} flex items-center justify-center text-xs font-bold text-gray-700">${idx + 1}</div>
                <div>
                  <div class="text-xs font-semibold text-gray-900">${step.role} Approval</div>
                  <div class="text-xs text-gray-500">${step.approver}${step.signedDate ? ' · ' + step.signedDate : ''}</div>
                  ${step.signature ? `<div class="text-[10px] font-mono text-gray-400 mt-0.5">${step.signature}</div>` : ''}
                </div>
              </div>
              ${statusBadge}
            </div>`;
        }).join('')}
      </div>

      ${canSign ? `
        <!-- E-signature inline for current approver -->
        <div class="p-3 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            <span class="text-xs font-semibold text-amber-900">Tanda Tangan Elektronik Diperlukan</span>
          </div>
          <textarea class="w-full h-16 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm resize-none" placeholder="Ketik nama lengkap Anda sebagai tanda tangan elektronik (wajib sesuai UU ITE)"></textarea>
          <div class="flex gap-2 mt-2">
            <button class="flex-1 h-9 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700">✓ Approve & Sign</button>
            <button class="h-9 px-4 rounded-lg border border-red-200 bg-white text-red-700 text-xs font-semibold hover:bg-red-50">✗ Reject</button>
          </div>
        </div>
      ` : ''}
    </div>`;
}
