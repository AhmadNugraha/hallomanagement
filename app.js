// ============================================================
// app.js — Router + 5 Dashboard Renderers untuk Hallo Management
// ============================================================

let currentRole = 'employee';

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderRoleSwitcher();
  // Initial route from URL hash (e.g. index.html#peduli), default to employee dashboard
  const initialRoute = (location.hash || '#dashboard').slice(1);
  const initialRole = new URLSearchParams(location.search).get('role') || 'employee';
  currentRole = initialRole;
  const fn = routeRenderers[initialRoute] || (() => renderDashboard(initialRole));
  fn();
  // Sync nav active state
  const link = document.querySelector(`[data-route="${initialRoute}"]`);
  if (link) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    link.classList.add('active');
  }

  document.querySelectorAll('#role-switcher button').forEach(b => {
    b.addEventListener('click', () => renderDashboard(b.dataset.role));
  });

  // Modal close on backdrop
  document.getElementById('modal-root').addEventListener('click', (e) => {
    if (e.target.id === 'modal-root') closeModal();
  });

  // Debug: auto-open modal from URL ?modal=appreciate|whistle|schedule
  const autoModal = new URLSearchParams(location.search).get('modal');
  if (autoModal) {
    setTimeout(() => {
      if (autoModal === 'appreciate' && typeof openAppreciationModal === 'function') openAppreciationModal();
      if (autoModal === 'whistle'    && typeof openWhistleModal === 'function')       openWhistleModal();
      if (autoModal === 'schedule'   && typeof openCoachingScheduleModal === 'function') openCoachingScheduleModal();
    }, 200);
  }
});

// ---------- SIDEBAR ----------
function renderSidebar() {
  const html = DATA.navMain.map(n => `
    <a href="#" data-route="${n.route}" class="nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-surface-100 ${n.route === 'dashboard' ? 'active' : ''}">
      ${ICONS[n.icon] || ICONS.home}
      ${n.label}
      ${n.badge ? `<span class="ml-auto bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">${n.badge}</span>` : ''}
    </a>`).join('');
  document.getElementById('nav-main').innerHTML = html;
}

// ---------- ROLE SWITCHER ----------
function renderRoleSwitcher() {
  document.querySelectorAll('#role-switcher button').forEach(b => {
    b.classList.toggle('active', b.dataset.role === currentRole);
  });
}

// ---------- DASHBOARD ROUTER ----------
function renderDashboard(role) {
  currentRole = role;
  renderRoleSwitcher();

  const u = DATA.users[role];
  document.getElementById('user-name').textContent = u.name;
  document.getElementById('user-role').textContent = u.role;
  document.getElementById('user-avatar').textContent = u.avatar;
  document.getElementById('ctx-name').textContent = u.name;
  document.getElementById('ctx-role').textContent = u.roleLabel;
  document.getElementById('crumb-2').textContent = u.roleLabel;

  const container = document.getElementById('dashboard-container');
  container.classList.remove('fade-in');
  void container.offsetWidth;
  container.classList.add('fade-in');

  const renderers = {
    employee: renderEmployeeDashboard,
    manager: renderManagerDashboard,
    hr: renderHRDashboard,
    admin: renderAdminDashboard,
    executive: renderExecutiveDashboard
  };
  container.innerHTML = renderers[role](u);
}

// ============================================================
// 1) EMPLOYEE DASHBOARD
// ============================================================
function renderEmployeeDashboard(u) {
  const greeting = greetingForHour();
  return `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">${greeting}, ${u.name.split(' ')[0]} <span class="inline-block">👋</span></h1>
        <p class="text-sm text-gray-500 mt-1">Here's what's happening with your activities.</p>
      </header>

      <!-- Quick Actions -->
      <section class="mb-8">
        <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${DATA.quickActions.employee.map(a => quickAction(a)).join('')}
        </div>
      </section>

      <!-- KPI Overview -->
      <section class="mb-8">
        <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">My Overview</h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${DATA.kpis.employee.map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- Two columns: Activity + Recognition -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-base font-semibold text-gray-900">My Activity</h2>
            <a href="#" class="text-xs font-medium text-brand-600 hover:underline">View all</a>
          </div>
          <div>${DATA.timeline.employee.map(t => timelineItem(t)).join('')}</div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-base font-semibold text-gray-900">Recognition & PEDULI</h2>
              <span class="text-xs font-semibold text-brand-600 uppercase tracking-wider">⭐ PEDULI</span>
            </div>
            <div class="space-y-3">
              ${DATA.recognition.employee.map(r => `
                <div class="p-3 rounded-xl bg-surface-50">
                  <div class="text-xs font-semibold text-brand-700 mb-1">${r.badge}</div>
                  <div class="text-sm text-gray-700 italic">"${r.message}"</div>
                  <div class="text-xs text-gray-400 mt-2">From ${r.sender} · ${r.date}</div>
                </div>`).join('')}
            </div>
          </div>

          <!-- PEDULI Pulse widget -->
          <div class="bg-gradient-to-br from-brand-50 to-indigo-50 rounded-2xl p-5 border border-brand-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-brand-700 uppercase tracking-wider">⭐ PEDULI Pulse</span>
              <span class="text-xs text-gray-500">${DATA.peduliPulse.activeThisMonth} active</span>
            </div>
            <div class="text-2xl font-semibold text-gray-900 mb-1">${DATA.peduliPulse.topValue}</div>
            <div class="text-xs text-gray-600 mb-3">Nilai paling aktif di tim kamu — ${DATA.peduliPulse.topPct}% adopsi</div>
            <div class="grid grid-cols-6 gap-1">
              ${DATA.peduliValues.map(v => `
                <div class="flex flex-col items-center">
                  <div class="w-7 h-7 rounded-lg ${COLOR_CLASSES[v.color].bg} ${COLOR_CLASSES[v.color].text} flex items-center justify-center text-xs font-bold">${v.letter}</div>
                </div>`).join('')}
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
            <h2 class="text-base font-semibold text-gray-900 mb-4">Upcoming</h2>
            <div class="space-y-3">
              ${DATA.upcoming.map(u => `
                <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                  <div class="w-10 h-10 rounded-lg ${COLOR_CLASSES[u.color].bg} ${COLOR_CLASSES[u.color].text} flex items-center justify-center flex-shrink-0">
                    ${ICONS.calendar}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-gray-900 truncate">${u.title}</div>
                    <div class="text-xs text-gray-500 truncate">${u.subtitle}</div>
                  </div>
                  <div class="text-xs font-semibold text-gray-700">${u.date}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <p class="text-xs text-gray-400 mt-8 text-center">Employee data synced from HRIS · Last sync: 30 Sep 2026, 08:30</p>
    </div>`;
}

// ============================================================
// 2) MANAGER DASHBOARD
// ============================================================
function renderManagerDashboard(u) {
  return `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">${greetingForHour()}, ${u.name.split(' ')[0]}</h1>
        <p class="text-sm text-gray-500 mt-1">Here's your team overview.</p>
      </header>

      <!-- KPI -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${DATA.kpis.manager.map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- Chart + Coaching Health -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-base font-semibold text-gray-900">Team Activity — Last 30 Days</h2>
              <p class="text-xs text-gray-500 mt-0.5">Engagement signals across your team</p>
            </div>
            <select class="text-xs border border-surface-200 rounded-lg px-3 py-1.5 bg-white">
              <option>Last 30 days</option><option>Last 7 days</option><option>This quarter</option>
            </select>
          </div>
          ${barChart(DATA.chartTeamActivity)}
        </div>

        <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h2 class="text-base font-semibold text-gray-900 mb-1">Coaching Health</h2>
          <p class="text-xs text-gray-500 mb-4">Team coaching status</p>
          ${donutChart(DATA.coachingHealth)}
        </div>
      </div>

      <!-- Pending Approvals -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Pending Approvals</h2>
            <p class="text-xs text-gray-500 mt-0.5">Requests awaiting your decision</p>
          </div>
          <button class="text-sm font-medium text-brand-600 hover:underline">Review All →</button>
        </div>
        ${approvalTable(DATA.approvals.manager)}
      </section>

      <!-- Team Recognition -->
      <section class="mb-8">
        <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h2 class="text-base font-semibold text-gray-900 mb-1">Recent Team Recognition</h2>
          <p class="text-xs text-gray-500 mb-4">Highlights, not rankings — celebrating contributions across the team</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${DATA.recognition.team.map(r => `
              <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">${r.avatar}</div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900">${r.employee}</div>
                  <div class="text-xs text-gray-500 truncate">${r.type}</div>
                </div>
                <div class="text-xs text-gray-400">${r.date}</div>
              </div>`).join('')}
          </div>
        </div>
      </section>
    </div>`;
}

// ============================================================
// 3) HR / PEOPLE DASHBOARD
// ============================================================
function renderHRDashboard(u) {
  return `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">People & Culture Overview</h1>
        <p class="text-sm text-gray-500 mt-1">Organization health, engagement, and culture signals.</p>
      </header>

      <!-- KPI -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${DATA.kpis.hr.map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- Engagement Trend -->
      <section class="mb-8 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Employee Engagement Activity</h2>
            <p class="text-xs text-gray-500 mt-0.5">Across the organization · last 9 months</p>
          </div>
          <div class="flex bg-surface-100 rounded-lg p-0.5">
            ${['7D','30D','90D','Custom'].map((f,i) => `<button class="px-3 py-1 text-xs font-medium rounded-md ${i===2?'bg-white text-brand-700 shadow-soft':'text-gray-600'}">${f}</button>`).join('')}
          </div>
        </div>
        ${lineChart(DATA.chartEngagementTrend)}
      </section>

      <!-- Distribution + Coaching Health -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h2 class="text-base font-semibold text-gray-900 mb-1">Employee Distribution</h2>
          <p class="text-xs text-gray-500 mb-4">By division</p>
          <div class="space-y-3">
            ${[
              { label: 'Commercial', value: 412, pct: 33, color: 'indigo' },
              { label: 'Operations', value: 298, pct: 24, color: 'sky' },
              { label: 'Technology', value: 245, pct: 20, color: 'emerald' },
              { label: 'Corporate', value: 186, pct: 15, color: 'amber' },
              { label: 'Finance',    value: 107, pct:  8, color: 'rose' }
            ].map(d => `
              <div>
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="text-gray-700 font-medium">${d.label}</span>
                  <span class="text-gray-500">${d.value} <span class="text-gray-400">(${d.pct}%)</span></span>
                </div>
                <div class="h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div class="h-full ${COLOR_CLASSES[d.color].dot} rounded-full" style="width:${d.pct}%"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h2 class="text-base font-semibold text-gray-900 mb-4">Coaching Health</h2>
          ${donutChart(DATA.coachingHealth)}
        </div>
      </div>

      <!-- Attention + Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2 space-y-3">
          <h2 class="text-base font-semibold text-gray-900 mb-1">Areas Requiring Attention</h2>
          ${DATA.attentionHR.map(a => attentionCard(a)).join('')}
        </div>

        <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h2 class="text-base font-semibold text-gray-900 mb-5">Recent HR Activity</h2>
          <div>${DATA.timeline.hr.slice(0,4).map(t => timelineItem(t)).join('')}</div>
        </div>
      </div>

      <p class="text-xs text-gray-400 mt-8 text-center">Employee data synced from HRIS · 1,248 records · Last sync: 30 Sep 2026, 08:30</p>
    </div>`;
}

// ============================================================
// 4) ADMIN DASHBOARD
// ============================================================
function renderAdminDashboard(u) {
  return `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">System & Operations Overview</h1>
        <p class="text-sm text-gray-500 mt-1">Platform health, access governance, and audit signals.</p>
      </header>

      <!-- KPI -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${DATA.kpis.admin.map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- Access + Workflow -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h2 class="text-base font-semibold text-gray-900 mb-1">Access Overview</h2>
          <p class="text-xs text-gray-500 mb-5">Active users by role</p>
          <div class="space-y-3">
            ${[
              { label: 'Employee',     value: 920, pct: 74, color: 'indigo' },
              { label: 'Manager',      value: 168, pct: 13, color: 'sky' },
              { label: 'HR / People',  value:  24, pct:  2, color: 'emerald' },
              { label: 'Reviewer',     value:  14, pct:  1, color: 'amber' },
              { label: 'Admin',        value:   6, pct:  1, color: 'rose' },
              { label: 'Executive',    value:   2, pct:  1, color: 'red' }
            ].map(d => `
              <div>
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="text-gray-700 font-medium">${d.label}</span>
                  <span class="text-gray-500">${d.value} <span class="text-gray-400">(${d.pct}%)</span></span>
                </div>
                <div class="h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div class="h-full ${COLOR_CLASSES[d.color].dot} rounded-full" style="width:${d.pct}%"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h2 class="text-base font-semibold text-gray-900 mb-1">Approval Workflow Status</h2>
          <p class="text-xs text-gray-500 mb-5">Pending → In Review → Approved / Rejected</p>
          <div class="flex items-center justify-between">
            ${[
              { label: 'Pending',   value: 12, color: 'amber'   },
              { label: 'In Review', value:  8, color: 'sky'     },
              { label: 'Approved',  value: 142, color: 'emerald'},
              { label: 'Rejected',  value:  6, color: 'red'     }
            ].map((s,i,arr) => `
              <div class="text-center">
                <div class="w-20 h-20 rounded-2xl ${COLOR_CLASSES[s.color].bg} ${COLOR_CLASSES[s.color].text} flex flex-col items-center justify-center font-semibold">
                  <span class="text-2xl">${s.value}</span>
                  <span class="text-[10px] uppercase tracking-wider mt-1 opacity-80">${s.label}</span>
                </div>
                ${i < arr.length-1 ? '<div class="hidden"></div>' : ''}
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Notification Health -->
      <section class="mb-8 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
        <h2 class="text-base font-semibold text-gray-900 mb-1">Notification Health</h2>
        <p class="text-xs text-gray-500 mb-5">Delivery status · last 24h</p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${[
            { label: 'Sent',     value: '2,184', color: 'indigo' },
            { label: 'Delivered',value: '2,098', color: 'emerald' },
            { label: 'Pending',  value:    '82', color: 'amber' },
            { label: 'Failed',   value:     '4', color: 'red' }
          ].map(n => `
            <div class="p-4 rounded-xl ${COLOR_CLASSES[n.color].bg}">
              <div class="text-2xl font-semibold ${COLOR_CLASSES[n.color].text}">${n.value}</div>
              <div class="text-xs ${COLOR_CLASSES[n.color].text} mt-1 opacity-80">${n.label}</div>
            </div>`).join('')}
        </div>
      </section>

      <!-- Audit Trail -->
      <section class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
        <h2 class="text-base font-semibold text-gray-900 mb-1">Audit Trail</h2>
        <p class="text-xs text-gray-500 mb-5">System & user activity log</p>
        <div class="overflow-hidden rounded-xl border border-surface-200">
          <table class="w-full text-sm">
            <thead class="bg-surface-50 border-b border-surface-200">
              <tr class="text-xs text-gray-500 uppercase tracking-wider">
                <th class="text-left px-4 py-3 font-semibold">Timestamp</th>
                <th class="text-left px-4 py-3 font-semibold">User</th>
                <th class="text-left px-4 py-3 font-semibold">Activity</th>
                <th class="text-left px-4 py-3 font-semibold">Module</th>
                <th class="text-left px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 bg-white">
              ${DATA.auditTrail.map(a => `
                <tr class="hover:bg-surface-50">
                  <td class="px-4 py-3 text-xs text-gray-500 font-mono">${a.time}</td>
                  <td class="px-4 py-3 font-medium text-gray-900">${a.user}</td>
                  <td class="px-4 py-3 text-gray-700">${a.activity}</td>
                  <td class="px-4 py-3"><span class="text-xs px-2 py-1 bg-surface-100 rounded-md text-gray-600">${a.module}</span></td>
                  <td class="px-4 py-3 text-gray-700">${a.action}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>`;
}

// ============================================================
// 5) EXECUTIVE / DIREKSI DASHBOARD
// ============================================================
function renderExecutiveDashboard(u) {
  return `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Management Overview</h1>
        <p class="text-sm text-gray-500 mt-1">Organization health and culture activity.</p>
      </header>

      <!-- Executive KPI -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          ${DATA.kpis.executive.map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- Organization Health Comparison -->
      <section class="mb-8 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Organization Activity</h2>
            <p class="text-xs text-gray-500 mt-0.5">Compare across periods</p>
          </div>
          <div class="flex bg-surface-100 rounded-lg p-0.5">
            ${['Month','Quarter','YoY'].map((f,i) => `<button class="px-3 py-1 text-xs font-medium rounded-md ${i===1?'bg-white text-brand-700 shadow-soft':'text-gray-600'}">${f}</button>`).join('')}
          </div>
        </div>
        ${lineChart(DATA.chartEngagementTrend)}
      </section>

      <!-- Culture Activity + Attention -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h2 class="text-base font-semibold text-gray-900 mb-4">Culture Activity</h2>
          <div class="space-y-4">
            ${[
              { label: 'Appreciation', value: 342, color: 'rose',   pct: 86 },
              { label: 'Best Practice',value:  89, color: 'sky',    pct: 62 },
              { label: 'Coaching',     value: 140, color: 'amber',  pct: 78 }
            ].map(d => `
              <div>
                <div class="flex items-center justify-between text-xs mb-1.5">
                  <span class="text-gray-700 font-medium">${d.label}</span>
                  <span class="text-gray-900 font-semibold">${d.value}</span>
                </div>
                <div class="h-2.5 bg-surface-100 rounded-full overflow-hidden">
                  <div class="h-full ${COLOR_CLASSES[d.color].dot} rounded-full" style="width:${d.pct}%"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <div class="lg:col-span-2 space-y-3">
          <h2 class="text-base font-semibold text-gray-900 mb-1">Attention Required</h2>
          ${DATA.attentionExec.map(a => attentionCard(a)).join('')}
        </div>
      </div>

      <!-- Strategic Insight -->
      <section class="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-8 text-white shadow-card">
        <div class="flex items-start justify-between gap-6">
          <div class="flex-1">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-medium mb-3">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
              Management Insight
            </div>
            <h2 class="text-2xl font-semibold leading-tight">Employee recognition activity increased 18% compared with the previous month.</h2>
            <p class="text-sm text-white/80 mt-3 leading-relaxed">Driven primarily by Marketing (+22%) and Operations (+14%) divisions. Coaching completion also reached 78% — highest in the last 4 quarters.</p>
          </div>
          <button class="flex-shrink-0 px-5 py-3 bg-white text-brand-700 rounded-xl text-sm font-semibold hover:bg-white/90 transition">View Management Report →</button>
        </div>
      </section>

      <p class="text-xs text-gray-400 mt-8 text-center">Employee data synced from HRIS · 1,248 records · Last sync: 30 Sep 2026, 08:30</p>
    </div>`;
}

// ============================================================
// HELPERS
// ============================================================
function greetingForHour() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

// ============================================================
// DATA INTEGRATION (HRIS) — used by sidebar route
// ============================================================
function renderIntegrationPage() {
  const c = document.getElementById('dashboard-container');
  c.classList.remove('fade-in');
  void c.offsetWidth;
  c.classList.add('fade-in');

  document.getElementById('ctx-name').textContent = DATA.users[currentRole].name;
  document.getElementById('ctx-role').textContent = 'Data Integration';
  document.getElementById('crumb-2').textContent = 'Data Integration';

  c.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Data Integration</h1>
        <p class="text-sm text-gray-500 mt-1">HRIS as the source of truth for employee and organizational data.</p>
      </header>

      <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-gray-900">HRIS Connection</h2>
            <p class="text-xs text-gray-500 mt-0.5">Secure, one-way sync</p>
          </div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot"></span> Connected
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div class="p-4 bg-surface-50 rounded-xl">
            <div class="text-xs text-gray-500 uppercase tracking-wider">Last Sync</div>
            <div class="text-sm font-semibold text-gray-900 mt-1">30 Sep 2026, 08:30</div>
          </div>
          <div class="p-4 bg-surface-50 rounded-xl">
            <div class="text-xs text-gray-500 uppercase tracking-wider">Records</div>
            <div class="text-sm font-semibold text-gray-900 mt-1">1,248 Employees</div>
          </div>
          <div class="p-4 bg-surface-50 rounded-xl">
            <div class="text-xs text-gray-500 uppercase tracking-wider">Sync Status</div>
            <div class="text-sm font-semibold text-emerald-600 mt-1">Successful</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft mb-6">
        <h2 class="text-base font-semibold text-gray-900 mb-1">Synced Data</h2>
        <p class="text-xs text-gray-500 mb-5">All employee and organizational data is sourced from HRIS</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${['Employee Profile','Organization Structure','Position','Manager','Employment Status','Branch & Location'].map(item => `
            <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span class="text-sm font-medium text-gray-900">${item}</span>
              <span class="ml-auto text-xs text-emerald-600 font-medium">Synced</span>
            </div>`).join('')}
        </div>
      </div>

      <div class="bg-gradient-to-br from-brand-50 to-sky-50 rounded-2xl p-6 border border-brand-100">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-brand-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Integration Principle</h3>
            <p class="text-sm text-gray-700 mt-1 leading-relaxed">Hallo Management uses HRIS as the source of truth for employee and organizational data. Engagement data (appreciation, best practice, coaching) lives natively in Hallo Management and is enriched by HRIS context.</p>
          </div>
        </div>
      </div>
    </div>`;
}

// Wire up sidebar clicks for routes
const routeRenderers = {
  dashboard:    () => renderDashboard(currentRole),
  integration:  () => renderIntegrationPage(),
  peduli:       () => renderPeduliPage(),
  whistle:      () => renderWhistlePage(),
  agent:        () => renderAgentOfChangePage(),
  permissions:  () => renderPermissionsPage(),
  coaching:     () => renderCoachingPage(),
  bestpractice: () => renderBestPracticePage(),
  notifications:() => renderNotificationsApprovalsPage()
};

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-route]');
  if (!link) return;
  e.preventDefault();
  const route = link.dataset.route;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  link.classList.add('active');
  const fn = routeRenderers[route];
  if (fn) fn();
});

// ============================================================
// MODUL: PEDULI VALUES (role-aware)
//   - Employee: hanya referensi + apresiasi peer-to-peer & top-down
//   - Manager/HR/Admin/Executive: full view + leaderboard + PDF export
// ============================================================
function renderPeduliPage() {
  const c = document.getElementById('dashboard-container');
  c.classList.remove('fade-in'); void c.offsetWidth; c.classList.add('fade-in');
  const u = DATA.users[currentRole];
  document.getElementById('ctx-name').textContent = u.name;
  document.getElementById('ctx-role').textContent = 'PEDULI Values';
  document.getElementById('crumb-2').textContent = 'PEDULI Values';

  // Strictly Manager + HR + Executive (sesuai brief My Lord: "manager dan direksi")
  // Admin = sistem/IT, tidak perlu lihat leaderboard budaya
  const isPrivileged = ['manager', 'hr', 'executive'].includes(currentRole);
  const pulse = DATA.peduliPulse;
  const lb = DATA.peduliLeaderboard;
  const myA = DATA.myAppreciation;

  // ===== EMPLOYEE VIEW (restricted) =====
  if (!isPrivileged) {
    c.innerHTML = `
      <div class="max-w-5xl mx-auto">
        <header class="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">Core Values <span class="text-brand-600">PEDULI</span></h1>
            <p class="text-sm text-gray-500 mt-1">Kirim apresiasi ke rekan, dan lihat apresiasi yang Anda terima dari leader.</p>
          </div>
          <button onclick="openAppreciationModal()" class="px-5 py-3 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 flex items-center gap-2">
            ${ICONS.heart}
            Kirim Apresiasi
          </button>
        </header>

        <!-- Notice: restricted view -->
        <div class="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">i</div>
          <div class="text-sm text-gray-700">
            View ini khusus untuk Anda. Leaderboard dan ranking divisi hanya tersedia untuk Manager, HR, dan Executive.
          </div>
        </div>

        <!-- PEDULI Reference (compact, no adoption %) -->
        <section class="mb-8">
          <h2 class="text-base font-semibold text-gray-900 mb-4">6 Nilai PEDULI</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            ${DATA.peduliValues.map(v => {
              const c = COLOR_CLASSES[v.color] || COLOR_CLASSES.indigo;
              return `
                <div class="bg-white rounded-2xl p-4 border border-surface-200 shadow-soft text-center">
                  <div class="w-12 h-12 mx-auto rounded-xl ${c.bg} ${c.text} flex items-center justify-center text-lg font-bold mb-3">${v.letter}</div>
                  <div class="text-sm font-semibold text-gray-900 mb-1">${v.name}</div>
                  <div class="text-[11px] text-gray-500 leading-relaxed">${v.desc}</div>
                </div>`;
            }).join('')}
          </div>
        </section>

        <!-- Two columns: peer-to-peer sent + top-down received -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Peer-to-peer (yang Employee kirim) -->
          <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-base font-semibold text-gray-900">Apresiasi Peer-to-Peer</h2>
                <p class="text-xs text-gray-500 mt-0.5">Yang pernah Anda kirim ke rekan</p>
              </div>
              <span class="text-xs font-semibold text-emerald-600 uppercase tracking-wider">↑ Sent</span>
            </div>
            <div class="space-y-3">
              ${myA.sent.length === 0
                ? '<div class="text-sm text-gray-500 italic text-center py-6">Belum ada apresiasi terkirim. Klik "Kirim Apresiasi" di atas untuk mulai.</div>'
                : myA.sent.map(item => myAppreciationItem(item, 'sent')).join('')}
            </div>
          </div>

          <!-- Top-down (yang Employee terima dari leader) -->
          <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-base font-semibold text-gray-900">Apresiasi dari Leader</h2>
                <p class="text-xs text-gray-500 mt-0.5">Yang Anda terima dari Manager / Executive</p>
              </div>
              <span class="text-xs font-semibold text-brand-600 uppercase tracking-wider">↓ Received</span>
            </div>
            <div class="space-y-3">
              ${myA.received.length === 0
                ? '<div class="text-sm text-gray-500 italic text-center py-6">Belum ada apresiasi dari leader.</div>'
                : myA.received.map(item => myAppreciationItem(item, 'received')).join('')}
            </div>
          </div>
        </div>
      </div>`;
    return;
  }

  // ===== PRIVILEGED VIEW (Manager / HR / Admin / Executive) =====
  c.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Core Values <span class="text-brand-600">PEDULI</span></h1>
          <p class="text-sm text-gray-500 mt-1">Penguatan budaya melalui framework nilai yang terukur — dengan leaderboard dan reporting.</p>
        </div>
        <button onclick="exportPeduliPDF()" class="px-5 py-3 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Export PDF
        </button>
      </header>

      <!-- PEDULI Hero Banner -->
      <section class="mb-8 bg-gradient-to-br from-brand-600 to-indigo-700 rounded-2xl p-8 text-white shadow-card">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div class="lg:col-span-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-medium mb-3">
              ⭐ Culture Framework
            </div>
            <h2 class="text-3xl font-semibold leading-tight mb-3">Six values, one culture.</h2>
            <p class="text-sm text-white/80 leading-relaxed max-w-2xl">PEDULI adalah kompas perilaku Hallo Management. Setiap recognition, coaching, dan inisiatif diukur berdasarkan keenam nilai ini — bukan ranking, tapi alignment.</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-white/10 backdrop-blur rounded-xl p-4">
              <div class="text-3xl font-semibold">${pulse.activeThisMonth}</div>
              <div class="text-xs text-white/80 mt-1">Recognition bulan ini</div>
            </div>
            <div class="bg-white/10 backdrop-blur rounded-xl p-4">
              <div class="text-3xl font-semibold">${pulse.topPct}%</div>
              <div class="text-xs text-white/80 mt-1">Top: ${pulse.topValue}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6 Values Grid -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Nilai PEDULI</h2>
            <p class="text-xs text-gray-500 mt-0.5">Adopsi diukur dari perilaku nyata: recognition, coaching, dan inisiatif</p>
          </div>
          <button class="text-sm font-medium text-brand-600 hover:underline">Lihat Methodology →</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${DATA.peduliValues.map(v => valueCard(v)).join('')}
        </div>
      </section>

      <!-- LEADERBOARD SECTION (Manager+ only) -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-gray-900">🏆 Leaderboard Periode ${lb.period}</h2>
            <p class="text-xs text-gray-500 mt-0.5">Top performers, divisi, dan cabang · Confidential</p>
          </div>
          <span class="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            ${ICONS.shield}
            Restricted view
          </span>
        </div>

        <!-- Top Performers Table -->
        <div class="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden mb-6">
          <div class="p-5 border-b border-surface-200">
            <h3 class="text-sm font-semibold text-gray-900">Top 10 Performers</h3>
            <p class="text-xs text-gray-500 mt-0.5">Diurutkan berdasarkan total PEDULI points (sent + received)</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-surface-50 border-b border-surface-200">
                <tr class="text-xs text-gray-500 uppercase tracking-wider">
                  <th class="text-left px-4 py-3 font-semibold w-16">Rank</th>
                  <th class="text-left px-4 py-3 font-semibold">Karyawan</th>
                  <th class="text-left px-4 py-3 font-semibold">Cabang</th>
                  <th class="text-right px-4 py-3 font-semibold">Points</th>
                  <th class="text-center px-4 py-3 font-semibold">Activity</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-200 bg-white">
                ${lb.topPerformers.map(p => performerRow(p)).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Divisions + Branches -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Top Divisions -->
          <div class="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden">
            <div class="p-5 border-b border-surface-200">
              <h3 class="text-sm font-semibold text-gray-900">📊 Top Divisions</h3>
              <p class="text-xs text-gray-500 mt-0.5">Agregat PEDULI points per divisi</p>
            </div>
            <div class="p-5 space-y-4">
              ${(() => {
                const maxPts = Math.max(...lb.topDivisions.map(d => d.points));
                return lb.topDivisions.map((d, i) => {
                  const c = COLOR_CLASSES[i === 0 ? 'emerald' : i === 1 ? 'sky' : i === 2 ? 'indigo' : 'rose'];
                  const pct = Math.round((d.points / maxPts) * 100);
                  const changeColor = d.change.startsWith('+') ? 'text-emerald-600' : d.change.startsWith('-') ? 'text-red-600' : 'text-gray-600';
                  return `
                    <div>
                      <div class="flex items-center justify-between text-sm mb-2">
                        <div class="flex items-center gap-2">
                          <span class="w-6 h-6 rounded-md ${c.bg} ${c.text} flex items-center justify-center text-xs font-bold">${i + 1}</span>
                          <span class="font-semibold text-gray-900">${d.name}</span>
                          <span class="text-xs ${changeColor} font-medium">${d.change}</span>
                        </div>
                        <div class="text-right">
                          <div class="font-bold text-gray-900">${d.points.toLocaleString()}</div>
                          <div class="text-xs text-gray-400">${d.avg} avg · ${d.members} members</div>
                        </div>
                      </div>
                      <div class="h-2 bg-surface-100 rounded-full overflow-hidden">
                        <div class="h-full ${c.dot} rounded-full" style="width:${pct}%"></div>
                      </div>
                    </div>`;
                }).join('');
              })()}
            </div>
          </div>

          <!-- Top Branches -->
          <div class="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden">
            <div class="p-5 border-b border-surface-200">
              <h3 class="text-sm font-semibold text-gray-900">📍 Top Branches</h3>
              <p class="text-xs text-gray-500 mt-0.5">Agregat PEDULI points per cabang/lokasi</p>
            </div>
            <div class="p-5 space-y-4">
              ${(() => {
                const maxPts = Math.max(...lb.topBranches.map(b => b.points));
                return lb.topBranches.map((b, i) => {
                  const c = COLOR_CLASSES[i === 0 ? 'emerald' : i === 1 ? 'sky' : 'indigo'];
                  const pct = Math.round((b.points / maxPts) * 100);
                  return `
                    <div>
                      <div class="flex items-center justify-between text-sm mb-2">
                        <div class="flex items-center gap-2">
                          <span class="w-6 h-6 rounded-md ${c.bg} ${c.text} flex items-center justify-center text-xs font-bold">${i + 1}</span>
                          <span class="font-semibold text-gray-900">${b.name}</span>
                        </div>
                        <div class="text-right">
                          <div class="font-bold text-gray-900">${b.points.toLocaleString()}</div>
                          <div class="text-xs text-gray-400">${b.avg} avg · ${b.members} members</div>
                        </div>
                      </div>
                      <div class="h-2 bg-surface-100 rounded-full overflow-hidden">
                        <div class="h-full ${c.dot} rounded-full" style="width:${pct}%"></div>
                      </div>
                    </div>`;
                }).join('');
              })()}
            </div>
          </div>
        </div>
      </section>

      <!-- Adoption Trend -->
      <section class="mb-8 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Tren Adopsi PEDULI</h2>
            <p class="text-xs text-gray-500 mt-0.5">Per nilai, last 9 months</p>
          </div>
        </div>
        ${lineChart(DATA.chartEngagementTrend)}
      </section>

      <p class="text-xs text-gray-400 mt-8 text-center">Leaderboard di-generate otomatis dari engagement data · ${lb.generatedAt} · Internal use only</p>
    </div>`;
}

// ============================================================
// MODUL: WHISTLE / REPORTS
// ============================================================
function renderWhistlePage() {
  const c = document.getElementById('dashboard-container');
  c.classList.remove('fade-in'); void c.offsetWidth; c.classList.add('fade-in');
  const u = DATA.users[currentRole];
  document.getElementById('ctx-name').textContent = u.name;
  document.getElementById('ctx-role').textContent = 'Whistle / Reports';
  document.getElementById('crumb-2').textContent = 'Whistle / Reports';

  const s = DATA.whistleStats;
  const isPrivileged = currentRole === 'hr' || currentRole === 'admin' || currentRole === 'executive';

  c.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Whistle / Reporting</h1>
          <p class="text-sm text-gray-500 mt-1">Saluran pelaporan aman, anonim, dan terlacak untuk isu etika, integritas, dan lingkungan kerja.</p>
        </div>
        <button onclick="openWhistleModal()" class="px-5 py-3 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 flex items-center gap-2">
          ${ICONS.shield}
          Submit Report
        </button>
      </header>

      <!-- Stats -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
          ${[
            { label: 'Open',        value: s.open,        icon: 'flag',    color: 'amber' },
            { label: 'In Review',   value: s.inReview,    icon: 'eye',     color: 'sky' },
            { label: 'Escalated',   value: s.escalated,   icon: 'alert',   color: 'red' },
            { label: 'Resolved',    value: s.resolved,    icon: 'check',   color: 'emerald' },
            { label: 'Avg Response',value: s.avgResponse, icon: 'clock',   color: 'indigo', isText: true }
          ].map(k => kpiCard(k)).join('')}
        </div>
      </section>

      ${isPrivileged ? `
        <!-- Privileged: full report list -->
        <section class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-base font-semibold text-gray-900">Semua Laporan</h2>
              <p class="text-xs text-gray-500 mt-0.5">View: ${u.role} — akses penuh ke data whistle</p>
            </div>
            <div class="flex items-center gap-2">
              <select class="text-xs border border-surface-200 rounded-lg px-3 py-1.5 bg-white">
                <option>Semua Status</option>
                <option>Pending</option>
                <option>In Review</option>
                <option>Escalated</option>
                <option>Resolved</option>
              </select>
              <select class="text-xs border border-surface-200 rounded-lg px-3 py-1.5 bg-white">
                <option>Semua Severity</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            ${DATA.whistleReports.map(r => reportCard(r)).join('')}
          </div>
        </section>

        <!-- Categories breakdown -->
        <section class="mb-8 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h2 class="text-base font-semibold text-gray-900 mb-1">Distribusi per Kategori</h2>
          <p class="text-xs text-gray-500 mb-5">last 90 days</p>
          <div class="space-y-3">
            ${[
              { label: 'Lingkungan Kerja',   value: 9,  pct: 36, color: 'amber' },
              { label: 'Etika & Integritas', value: 7,  pct: 28, color: 'rose' },
              { label: 'Keamanan Data',      value: 4,  pct: 16, color: 'red' },
              { label: 'Diskriminasi',       value: 3,  pct: 12, color: 'indigo' },
              { label: 'Pelanggaran Prosedur',value: 2, pct:  8, color: 'sky' }
            ].map(d => `
              <div>
                <div class="flex items-center justify-between text-xs mb-1.5">
                  <span class="text-gray-700 font-medium">${d.label}</span>
                  <span class="text-gray-500">${d.value} laporan <span class="text-gray-400">(${d.pct}%)</span></span>
                </div>
                <div class="h-2.5 bg-surface-100 rounded-full overflow-hidden">
                  <div class="h-full ${COLOR_CLASSES[d.color].dot} rounded-full" style="width:${d.pct}%"></div>
                </div>
              </div>`).join('')}
          </div>
        </section>
      ` : `
        <!-- Non-privileged: submit-focused view -->
        <section class="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
            <h2 class="text-base font-semibold text-gray-900 mb-1">Cara Melapor</h2>
            <p class="text-xs text-gray-500 mb-5">Tiga langkah mudah</p>
            <div class="space-y-4">
              ${[
                { n: 1, t: 'Pilih Kategori', d: 'Tentukan jenis laporan: etika, lingkungan kerja, keamanan data, atau lainnya.' },
                { n: 2, t: 'Ceritakan Kronologi', d: 'Jelaskan apa yang terjadi, kapan, di mana, dan siapa pihak terkait — tanpa identitas pribadi.' },
                { n: 3, t: 'Kirim (Anonim atau Teridentifikasi)', d: 'Anda bisa mengirim secara anonim. Identitas tidak akan disimpan jika dipilih anonim.' }
              ].map(s => `
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-semibold text-sm flex-shrink-0">${s.n}</div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">${s.t}</div>
                    <div class="text-xs text-gray-600 mt-0.5">${s.d}</div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
          <div class="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-2xl p-6 border border-emerald-100">
            <h3 class="font-semibold text-gray-900 mb-2">🔒 Jaminan Kerahasiaan</h3>
            <ul class="space-y-2 text-xs text-gray-700">
              <li class="flex items-start gap-2"><span class="text-emerald-600">✓</span><span>Identitas dilindungi oleh sistem enkripsi</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-600">✓</span><span>Tanpa retaliation policy</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-600">✓</span><span>Tracking status real-time via notifikasi</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-600">✓</span><span>Audit trail untuk setiap akses data</span></li>
            </ul>
          </div>
        </section>

        <!-- My Reports -->
        <section class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-semibold text-gray-900">Laporan Saya</h2>
            <span class="text-xs text-gray-500">Riwayat laporan yang Anda kirim</span>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            ${DATA.whistleReports.slice(0, 2).map(r => reportCard(r)).join('')}
          </div>
        </section>
      `}

      <p class="text-xs text-gray-400 mt-8 text-center">Whistle data dilindungi UU Perlindungan Pelapor · Compliance: ISO 37002</p>
    </div>`;
}

// ============================================================
// MODUL: AGENT OF CHANGE
// ============================================================
function renderAgentOfChangePage() {
  const c = document.getElementById('dashboard-container');
  c.classList.remove('fade-in'); void c.offsetWidth; c.classList.add('fade-in');
  const u = DATA.users[currentRole];
  document.getElementById('ctx-name').textContent = u.name;
  document.getElementById('ctx-role').textContent = 'Agent of Change';
  document.getElementById('crumb-2').textContent = 'Agent of Change';

  const s = DATA.agentStats;

  c.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Agent of Change</h1>
        <p class="text-sm text-gray-500 mt-1">Jaringan champion internal yang menggerakkan inisiatif perubahan di setiap divisi.</p>
      </header>

      <!-- Stats -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${[
            { label: 'Total Agents',        value: s.totalAgents,         icon: 'users', color: 'indigo' },
            { label: 'Active Initiatives',  value: s.activeInitiatives,   icon: 'bolt',  color: 'sky' },
            { label: 'Avg Adoption',        value: s.avgAdoption + '%',   icon: 'trend', color: 'emerald' },
            { label: 'Recognition Bonus',   value: s.recognitionBonus,    icon: 'heart', color: 'rose' }
          ].map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- Champions Grid -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Active Champions</h2>
            <p class="text-xs text-gray-500 mt-0.5">Agents menggerakkan inisiatif perubahan terukur</p>
          </div>
          <button class="text-sm font-medium text-brand-600 hover:underline">+ Nominate Agent</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${DATA.agentsOfChange.map(a => championCard(a)).join('')}
        </div>
      </section>

      <!-- Pipeline -->
      <section class="mb-8 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
        <h2 class="text-base font-semibold text-gray-900 mb-1">Initiative Pipeline</h2>
        <p class="text-xs text-gray-500 mb-5">Status inisiatif change management</p>
        <div class="flex items-center justify-between">
          ${[
            { label: 'Pilot',       value: 4, color: 'amber' },
            { label: 'In Progress', value: 6, color: 'sky' },
            { label: 'Scaling',     value: 3, color: 'indigo' },
            { label: 'Completed',   value: 8, color: 'emerald' }
          ].map((s, i, a) => `
            <div class="flex flex-col items-center flex-1">
              <div class="w-20 h-20 rounded-2xl ${COLOR_CLASSES[s.color].bg} ${COLOR_CLASSES[s.color].text} flex flex-col items-center justify-center font-semibold">
                <span class="text-2xl">${s.value}</span>
                <span class="text-[10px] uppercase tracking-wider mt-1 opacity-80">${s.label}</span>
              </div>
              ${i < a.length - 1 ? '<div class="hidden lg:block w-12 h-px bg-surface-200 mt-10"></div>' : ''}
            </div>`).join('')}
        </div>
      </section>
    </div>`;
}


// ============================================================
// MODUL: ROLE & PERMISSIONS MATRIX
// ============================================================
function renderPermissionsPage() {
  const c = document.getElementById('dashboard-container');
  c.classList.remove('fade-in'); void c.offsetWidth; c.classList.add('fade-in');
  const u = DATA.users[currentRole];
  document.getElementById('ctx-name').textContent = u.name;
  document.getElementById('ctx-role').textContent = 'Role & Permissions';
  document.getElementById('crumb-2').textContent = 'Role & Permissions';

  const cell = (v) => {
    if (v === '✓') return '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold">✓</span>';
    if (v === 'R') return '<span class="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">Read</span>';
    if (v === 'A') return '<span class="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold">Approval</span>';
    return '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300 text-sm">—</span>';
  };

  c.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Role & Permissions</h1>
        <p class="text-sm text-gray-500 mt-1">Matriks akses 5 role terhadap 9 modul Hallo Management. Untuk alignment governance dengan tim klien.</p>
      </header>

      <!-- Role Summary Cards -->
      <section class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          ${DATA.roleSummary.map(r => {
            const colorByRole = { Employee: 'indigo', Manager: 'sky', 'HR / People': 'emerald', Admin: 'amber', Executive: 'rose' };
            const cc = COLOR_CLASSES[colorByRole[r.role]] || COLOR_CLASSES.indigo;
            return `
              <div class="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft">
                <div class="w-10 h-10 rounded-xl ${cc.bg} ${cc.text} flex items-center justify-center mb-3">${ICONS.users}</div>
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider">${r.role}</div>
                <div class="text-2xl font-semibold text-gray-900 leading-none mt-1">${r.count}</div>
                <div class="text-xs text-gray-500 mt-2 leading-relaxed">${r.desc}</div>
              </div>`;
          }).join('')}
        </div>
      </section>

      <!-- Permission Matrix -->
      <section class="mb-8 bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden">
        <div class="p-6 border-b border-surface-200 flex items-center justify-between">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Permission Matrix</h2>
            <p class="text-xs text-gray-500 mt-0.5">Definisi akses setiap role pada setiap modul</p>
          </div>
          <div class="flex items-center gap-3 text-xs">
            <span class="inline-flex items-center gap-1.5"><span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">✓</span> Allowed</span>
            <span class="inline-flex items-center gap-1.5"><span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">R</span> Read-only</span>
            <span class="inline-flex items-center gap-1.5"><span class="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-semibold">A</span> Approval</span>
            <span class="inline-flex items-center gap-1.5 text-slate-400">— None</span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-surface-50 border-b border-surface-200">
              <tr class="text-xs text-gray-500 uppercase tracking-wider">
                <th class="text-left px-6 py-4 font-semibold">Modul</th>
                <th class="text-center px-4 py-4 font-semibold">Employee</th>
                <th class="text-center px-4 py-4 font-semibold">Manager</th>
                <th class="text-center px-4 py-4 font-semibold">HR / People</th>
                <th class="text-center px-4 py-4 font-semibold">Admin</th>
                <th class="text-center px-4 py-4 font-semibold">Executive</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 bg-white">
              ${DATA.roleModules.map(m => `
                <tr class="hover:bg-surface-50">
                  <td class="px-6 py-4 font-medium text-gray-900">${m.module}</td>
                  <td class="text-center px-4 py-4">${cell(m.emp)}</td>
                  <td class="text-center px-4 py-4">${cell(m.mgr)}</td>
                  <td class="text-center px-4 py-4">${cell(m.hr)}</td>
                  <td class="text-center px-4 py-4">${cell(m.admin)}</td>
                  <td class="text-center px-4 py-4">${cell(m.exec)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Governance Notes -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
          <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">${ICONS.shield} Prinsip Governance</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2"><span class="text-emerald-600 font-bold">✓</span><span><strong>Least privilege</strong> — setiap role hanya mendapat akses minimum yang diperlukan.</span></li>
            <li class="flex items-start gap-2"><span class="text-emerald-600 font-bold">✓</span><span><strong>Separation of duties</strong> — tidak ada role tunggal yang bisa submit + approve modul kritis.</span></li>
            <li class="flex items-start gap-2"><span class="text-emerald-600 font-bold">✓</span><span><strong>Audit trail</strong> — setiap akses data whistle dan perubahan role tercatat.</span></li>
            <li class="flex items-start gap-2"><span class="text-emerald-600 font-bold">✓</span><span><strong>HRIS sebagai single source of truth</strong> — sync 1 arah, role berubah dari HRIS.</span></li>
          </ul>
        </div>
        <div class="bg-gradient-to-br from-brand-50 to-indigo-50 rounded-2xl p-6 border border-brand-100">
          <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">${ICONS.alert} Compliance Readiness</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2"><span class="text-brand-600 font-bold">•</span><span>Whistle module: UU Perlindungan Pelapor</span></li>
            <li class="flex items-start gap-2"><span class="text-brand-600 font-bold">•</span><span>Audit log: ISO 27001 access control</span></li>
            <li class="flex items-start gap-2"><span class="text-brand-600 font-bold">•</span><span>Data encryption at rest & in transit</span></li>
            <li class="flex items-start gap-2"><span class="text-brand-600 font-bold">•</span><span>RBAC configurable per klien</span></li>
          </ul>
        </div>
      </section>

      <p class="text-xs text-gray-400 mt-8 text-center">Matrix di atas adalah proposal default — dapat disesuaikan via Admin Configuration sesuai dengan struktur klien</p>
    </div>`;
}


// ============================================================
// MODUL: COACHING & FOLLOW UP
//   - Manager: full CRUD (schedule, log notes, follow-up)
//   - Employee: lihat sesi sendiri (read)
//   - HR/Admin/Executive: org-wide read-only summary
// ============================================================
function renderCoachingPage() {
  const c = document.getElementById('dashboard-container');
  c.classList.remove('fade-in'); void c.offsetWidth; c.classList.add('fade-in');
  const u = DATA.users[currentRole];
  document.getElementById('ctx-name').textContent = u.name;
  document.getElementById('ctx-role').textContent = 'Coaching & Follow Up';
  document.getElementById('crumb-2').textContent = 'Coaching & Follow Up';

  const s = DATA.coachingStats;
  const sessions = DATA.coachingSessions;
  const isManager = currentRole === 'manager';
  const isEmployee = currentRole === 'employee';

  // ===== EMPLOYEE VIEW (read-only own sessions) =====
  if (isEmployee) {
    const mySessions = sessions.filter(x => x.employee === u.name);
    const myFollowUps = mySessions.filter(x => x.followUpDate && x.followUpStatus !== 'completed');
    c.innerHTML = `
      <div class="max-w-5xl mx-auto">
        <header class="mb-8">
          <h1 class="text-2xl font-semibold text-gray-900">My Coaching Sessions</h1>
          <p class="text-sm text-gray-500 mt-1">Sesi coaching yang dijadwalkan untuk Anda dan catatan tindak lanjut.</p>
        </header>

        ${myFollowUps.length ? `
          <div class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <div class="text-2xl flex-shrink-0">⏰</div>
            <div>
              <div class="font-semibold text-amber-900">${myFollowUps.length} follow-up${myFollowUps.length > 1 ? 's' : ''} menunggu Anda</div>
              <div class="text-sm text-amber-800 mt-1">Pastikan progress kamu ter-update sebelum tanggal follow-up.</div>
            </div>
          </div>
        ` : ''}

        <div class="space-y-4">
          ${mySessions.length === 0
            ? '<div class="bg-white rounded-2xl p-8 border border-surface-200 text-center text-gray-500">Belum ada sesi terjadwal. Manager Anda akan menjadwalkan coaching untuk Anda.</div>'
            : mySessions.map(sess => coachingCard(sess, false)).join('')}
        </div>
      </div>`;
    return;
  }

  // ===== NON-MANAGER (HR/Admin/Executive) — read-only analytics =====
  if (!isManager) {
    const upcoming = sessions.filter(x => x.status === 'scheduled');
    const overdue  = sessions.filter(x => x.status === 'overdue');
    const completed = sessions.filter(x => x.status === 'completed');
    const dueFollowUps = sessions.filter(x => x.followUpDate && x.followUpStatus !== 'completed');
    c.innerHTML = `
      <div class="max-w-7xl mx-auto">
        <header class="mb-8">
          <h1 class="text-2xl font-semibold text-gray-900">Coaching & Follow Up <span class="text-xs font-medium text-gray-500 align-middle">(Read-only)</span></h1>
          <p class="text-sm text-gray-500 mt-1">Monitoring coaching activities lintas tim. Hanya Manager yang bisa create/edit.</p>
        </header>

        <section class="mb-8">
          <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
            ${[
              { label: 'Upcoming',          value: s.upcomingCount,        icon: 'calendar', color: 'sky' },
              { label: 'Overdue',           value: s.overdueCount,         icon: 'alert',   color: 'red' },
              { label: 'Completed This Month', value: s.completedThisMonth, icon: 'check',   color: 'emerald' },
              { label: 'Avg Duration',      value: s.avgDuration + ' min', icon: 'clock',   color: 'indigo' },
              { label: 'Follow-ups Due',    value: s.followUpsDue,         icon: 'flag',    color: 'amber' }
            ].map(k => kpiCard(k)).join('')}
          </div>
        </section>

        ${overdue.length ? `
          <section class="mb-8">
            <h2 class="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">⚠ Overdue Sessions <span class="text-xs font-normal text-red-600">(${overdue.length})</span></h2>
            <div class="space-y-4">${overdue.map(sess => coachingCard(sess, false)).join('')}</div>
          </section>
        ` : ''}

        <section class="mb-8">
          <h2 class="text-base font-semibold text-gray-900 mb-3">Upcoming Sessions</h2>
          <div class="space-y-4">${upcoming.map(sess => coachingCard(sess, false)).join('')}</div>
        </section>

        ${dueFollowUps.length ? `
          <section class="mb-8">
            <h2 class="text-base font-semibold text-gray-900 mb-3">⏳ Follow-ups Due</h2>
            <div class="space-y-4">${dueFollowUps.map(sess => coachingCard(sess, false)).join('')}</div>
          </section>
        ` : ''}

        <section class="mb-8">
          <h2 class="text-base font-semibold text-gray-900 mb-3">Recent Completed</h2>
          <div class="space-y-4">${completed.slice(0, 3).map(sess => coachingCard(sess, false)).join('')}</div>
        </section>
      </div>`;
    return;
  }

  // ===== MANAGER VIEW (full) =====
  const upcoming = sessions.filter(x => x.status === 'scheduled');
  const overdue  = sessions.filter(x => x.status === 'overdue');
  const completed = sessions.filter(x => x.status === 'completed');
  const dueFollowUps = sessions.filter(x => x.followUpDate && x.followUpStatus !== 'completed');

  c.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Coaching & Follow Up</h1>
          <p class="text-sm text-gray-500 mt-1">Kelola sesi coaching tim, catat komitmen, dan setel pengingat tindak lanjut.</p>
        </div>
        <button onclick="openCoachingScheduleModal()" class="px-5 py-3 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Schedule Session
        </button>
      </header>

      <!-- Stats -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
          ${[
            { label: 'Upcoming',          value: s.upcomingCount,        icon: 'calendar', color: 'sky' },
            { label: 'Overdue',           value: s.overdueCount,         icon: 'alert',   color: 'red', delta: overdue.length ? 'perlu aksi' : '' },
            { label: 'Completed This Month', value: s.completedThisMonth, icon: 'check',   color: 'emerald' },
            { label: 'Avg Duration',      value: s.avgDuration + ' min', icon: 'clock',   color: 'indigo' },
            { label: 'Follow-ups Due',    value: s.followUpsDue,         icon: 'flag',    color: 'amber', delta: dueFollowUps.length ? 'perlu tinjau' : '' }
          ].map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- Overdue (priority) -->
      ${overdue.length ? `
        <section class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-semibold text-gray-900 flex items-center gap-2">⚠ Overdue Sessions <span class="text-xs font-normal text-red-600">(${overdue.length})</span></h2>
            <span class="text-xs text-gray-500">Sesi yang belum terlaksana dari tanggal scheduled</span>
          </div>
          <div class="space-y-4">${overdue.map(sess => coachingCard(sess, true)).join('')}</div>
        </section>
      ` : ''}

      <!-- Upcoming -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold text-gray-900">Upcoming Sessions</h2>
          <span class="text-xs text-gray-500">${upcoming.length} sesi terjadwal</span>
        </div>
        <div class="space-y-4">${upcoming.map(sess => coachingCard(sess, true)).join('')}</div>
      </section>

      <!-- Follow-ups Due -->
      ${dueFollowUps.length ? `
        <section class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-semibold text-gray-900 flex items-center gap-2">⏳ Follow-ups Due</h2>
            <span class="text-xs text-gray-500">Sesi selesai yang butuh tinjauan kemajuan</span>
          </div>
          <div class="space-y-4">${dueFollowUps.map(sess => coachingCard(sess, true)).join('')}</div>
        </section>
      ` : ''}

      <!-- Past sessions -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold text-gray-900">Past Sessions</h2>
          <span class="text-xs text-gray-500">${completed.length} sesi selesai</span>
        </div>
        <div class="space-y-4">${completed.map(sess => coachingCard(sess, true)).join('')}</div>
      </section>
    </div>`;
}


// ============================================================
// MODUL: BEST PRACTICE SHARING
//   - Employee: submit, view, vote
//   - Manager: + curation (approve/reject/publish) + Spotlight
//   - HR/Admin/Executive: read-only analytics
// ============================================================
function renderBestPracticePage() {
  const c = document.getElementById('dashboard-container');
  c.classList.remove('fade-in'); void c.offsetWidth; c.classList.add('fade-in');
  const u = DATA.users[currentRole];
  document.getElementById('ctx-name').textContent = u.name;
  document.getElementById('ctx-role').textContent = 'Best Practice';
  document.getElementById('crumb-2').textContent = 'Best Practice';

  const stats = DATA.bpStats;
  const bps = DATA.bestPractices;
  const spotlight = bps.find(b => b.isSpotlight);
  const published = bps.filter(b => b.status === 'published');
  const inReview = bps.filter(b => b.status === 'in_review' || b.status === 'submitted');
  const isManager = currentRole === 'manager';
  const isEmployee = currentRole === 'employee';
  const isReadOnly = ['hr', 'admin', 'executive'].includes(currentRole);

  const ctx = { userName: u.name, isCurator: isManager, role: currentRole };

  c.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Best Practice Sharing</h1>
          <p class="text-sm text-gray-500 mt-1">Repositori ide & lessons learned · Senin, Rabu, Jumat</p>
        </div>
        <button onclick="openBPSubmitModal()" class="px-5 py-3 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Submit Best Practice
        </button>
      </header>

      <!-- Stats -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${[
            { label: 'Published This Week', value: stats.publishedThisWeek, icon: 'check',   color: 'emerald' },
            { label: 'Total Submissions',  value: stats.totalSubmissions,  icon: 'doc',     color: 'sky' },
            { label: 'Total Votes',        value: stats.totalVotes,        icon: 'heart',   color: 'rose' },
            { label: 'Avg Curation Time',  value: stats.avgCurationTime,   icon: 'clock',   color: 'indigo', isText: true }
          ].map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- Schedule days indicator -->
      <section class="mb-8 p-5 bg-gradient-to-br from-brand-50 to-indigo-50 rounded-2xl border border-brand-100">
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 class="text-sm font-semibold text-gray-900">📅 Jadwal Sharing</h3>
            <p class="text-xs text-gray-600 mt-0.5">Best Practice dipublikasikan 3× seminggu</p>
          </div>
          <div class="flex items-center gap-2">
            ${DATA.bpScheduleDays.map(d => `
              <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-surface-200">
                <span class="text-lg">${d.emoji}</span>
                <div>
                  <div class="text-xs font-semibold text-gray-900">${d.label}</div>
                  <div class="text-[10px] text-gray-500">${d.day}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      ${spotlight ? `
        <section class="mb-8">
          <h2 class="text-base font-semibold text-gray-900 mb-3">⭐ Spotlight Mingguan</h2>
          ${bestPracticeCard(spotlight, ctx)}
        </section>
      ` : ''}

      ${isManager && inReview.length ? `
        <section class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-semibold text-gray-900 flex items-center gap-2">
              📋 Antrean Kurasi
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">${inReview.length} pending</span>
            </h2>
            <span class="text-xs text-gray-500">Review & publish Best Practice dari tim</span>
          </div>
          <div class="space-y-4">${inReview.map(bp => bestPracticeCard(bp, ctx)).join('')}</div>
        </section>
      ` : ''}

      <section class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold text-gray-900">📚 Repositori Published</h2>
          <div class="flex items-center gap-2">
            <select class="text-xs border border-surface-200 rounded-lg px-3 py-1.5 bg-white">
              <option>Semua Kategori</option>
              <option>Marketing & Branding</option>
              <option>Process & Efficiency</option>
              <option>Technology</option>
              <option>Team & Culture</option>
              <option>People & Culture</option>
            </select>
            <select class="text-xs border border-surface-200 rounded-lg px-3 py-1.5 bg-white">
              <option>Terbaru</option>
              <option>Terbanyak Vote</option>
            </select>
          </div>
        </div>
        <div class="space-y-4">${published.map(bp => bestPracticeCard(bp, ctx)).join('')}</div>
      </section>

      ${isReadOnly ? `
        <p class="text-xs text-gray-400 text-center">Best Practice Sharing · ${bps.length} total submissions · ${stats.totalVotes} peer votes</p>
      ` : ''}
    </div>`;
}

// ============================================================
// MODUL: AGENT OF CHANGE — TRACKER (enhanced)
// ============================================================
function renderAgentOfChangePage() {
  const c = document.getElementById('dashboard-container');
  c.classList.remove('fade-in'); void c.offsetWidth; c.classList.add('fade-in');
  const u = DATA.users[currentRole];
  document.getElementById('ctx-name').textContent = u.name;
  document.getElementById('ctx-role').textContent = 'Agent of Change';
  document.getElementById('crumb-2').textContent = 'Agent of Change';

  const s = DATA.agentTrackerStats;
  const agents = DATA.agentsOfChange;
  const activities = DATA.agentTrackerActivities;
  const newMembers = DATA.agentNewMembers;
  const isManager = currentRole === 'manager';
  const isReadOnly = ['employee', 'hr', 'admin', 'executive'].includes(currentRole);

  // ===== READ-ONLY VIEW (Employee / HR / Admin / Executive) =====
  if (isReadOnly) {
    c.innerHTML = `
      <div class="max-w-7xl mx-auto">
        <header class="mb-8">
          <h1 class="text-2xl font-semibold text-gray-900">Agent of Change <span class="text-xs font-medium text-gray-500 align-middle">(Tracker)</span></h1>
          <p class="text-sm text-gray-500 mt-1">Jaringan champion internal — penugasan, aktivasi, dan kontribusi poin.</p>
        </header>

        <section class="mb-8">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            ${[
              { label: 'Total Agents',         value: s.totalAgents,           icon: 'users', color: 'indigo' },
              { label: 'Active Assignments',   value: s.activeAssignments,     icon: 'bolt',  color: 'sky' },
              { label: 'Completed This Quarter', value: s.completedThisQuarter, icon: 'check', color: 'emerald' },
              { label: 'Contribution Points',  value: s.totalContributionPoints.toLocaleString(), icon: 'heart', color: 'rose' }
            ].map(k => kpiCard(k)).join('')}
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-base font-semibold text-gray-900 mb-3">🏆 Champions & Inisiatif</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${agents.map(a => championCard(a)).join('')}
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-base font-semibold text-gray-900 mb-3">📊 Aktivitas Tracker Terkini</h2>
          <div class="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-surface-50 border-b border-surface-200">
                <tr class="text-xs text-gray-500 uppercase tracking-wider">
                  <th class="text-left px-4 py-3 font-semibold">Aktivitas</th>
                  <th class="text-left px-4 py-3 font-semibold">Tipe</th>
                  <th class="text-right px-4 py-3 font-semibold">Poin</th>
                  <th class="text-left px-4 py-3 font-semibold">Status</th>
                  <th class="text-left px-4 py-3 font-semibold">Tanggal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-200">
                ${activities.map(a => {
                  const sm = { completed: 'bg-emerald-50 text-emerald-700 border-emerald-200', in_progress: 'bg-sky-50 text-sky-700 border-sky-200', pending: 'bg-slate-50 text-slate-600 border-slate-200' };
                  const sl = { completed: 'Completed', in_progress: 'In Progress', pending: 'Pending' };
                  return `
                    <tr class="hover:bg-surface-50">
                      <td class="px-4 py-3 font-medium text-gray-900">${a.name}</td>
                      <td class="px-4 py-3 text-gray-700">${a.type}</td>
                      <td class="px-4 py-3 text-right font-bold text-brand-700">+${a.points}</td>
                      <td class="px-4 py-3"><span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${sm[a.status]}">${sl[a.status]}</span></td>
                      <td class="px-4 py-3 text-gray-500">${a.date}</td>
                    </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </section>
      </div>`;
    return;
  }

  // ===== MANAGER VIEW (full control) =====
  c.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Agent of Change <span class="text-xs font-medium text-gray-500 align-middle">Tracker</span></h1>
          <p class="text-sm text-gray-500 mt-1">Kelola program Agent of Change: penugasan, aktivasi, dan tracking kontribusi poin.</p>
        </div>
        <button onclick="openAddAgentModal()" class="px-5 py-3 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Tambah Anggota
        </button>
      </header>

      <!-- Stats -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${[
            { label: 'Total Agents',         value: s.totalAgents,           icon: 'users', color: 'indigo' },
            { label: 'Active Assignments',   value: s.activeAssignments,     icon: 'bolt',  color: 'sky', delta: 'Live' },
            { label: 'Completed This Quarter', value: s.completedThisQuarter, icon: 'check', color: 'emerald' },
            { label: 'Contribution Points',  value: s.totalContributionPoints.toLocaleString(), icon: 'heart', color: 'rose', delta: 'season-to-date' }
          ].map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- Pending new members -->
      ${newMembers.length ? `
        <section class="mb-8">
          <h2 class="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">⏳ Antrean Penambahan Agent</h2>
          <div class="space-y-3">
            ${newMembers.map(m => `
              <div class="bg-white rounded-2xl p-4 border border-amber-200 shadow-soft flex items-start gap-3">
                <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold flex-shrink-0">${m.name.split(' ').map(x => x[0]).join('').slice(0,2).toUpperCase()}</div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-gray-900 text-sm">${m.name}</div>
                  <div class="text-xs text-gray-500">${m.division} · Dinominasikan oleh ${m.nominatedBy}</div>
                  <div class="text-xs text-gray-700 mt-1 italic">"${m.reason}"</div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <button class="h-9 px-3 rounded-lg border border-red-200 bg-white text-red-700 text-xs font-semibold hover:bg-red-50">Tolak</button>
                  <button class="h-9 px-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700">Setujui</button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- Champions -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold text-gray-900">🏆 Champions Aktif</h2>
          <span class="text-xs text-gray-500">${agents.length} agents · assignment + adoption tracker</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${agents.map(a => championCard(a)).join('')}
        </div>
      </section>

      <!-- Activities tracker -->
      <section class="mb-8">
        <h2 class="text-base font-semibold text-gray-900 mb-3">📊 Activity Tracker</h2>
        <div class="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-surface-50 border-b border-surface-200">
              <tr class="text-xs text-gray-500 uppercase tracking-wider">
                <th class="text-left px-4 py-3 font-semibold">Aktivitas</th>
                <th class="text-left px-4 py-3 font-semibold">Tipe</th>
                <th class="text-right px-4 py-3 font-semibold">Poin</th>
                <th class="text-left px-4 py-3 font-semibold">Status</th>
                <th class="text-left px-4 py-3 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200">
              ${activities.map(a => {
                const sm = { completed: 'bg-emerald-50 text-emerald-700 border-emerald-200', in_progress: 'bg-sky-50 text-sky-700 border-sky-200', pending: 'bg-slate-50 text-slate-600 border-slate-200' };
                const sl = { completed: 'Completed', in_progress: 'In Progress', pending: 'Pending' };
                return `
                  <tr class="hover:bg-surface-50">
                    <td class="px-4 py-3 font-medium text-gray-900">${a.name}</td>
                    <td class="px-4 py-3 text-gray-700">${a.type}</td>
                    <td class="px-4 py-3 text-right font-bold text-brand-700">+${a.points}</td>
                    <td class="px-4 py-3"><span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${sm[a.status]}">${sl[a.status]}</span></td>
                    <td class="px-4 py-3 text-gray-500">${a.date}</td>
                  </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Pipeline -->
      <section class="mb-8 bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
        <h2 class="text-base font-semibold text-gray-900 mb-1">Initiative Pipeline</h2>
        <p class="text-xs text-gray-500 mb-5">Status inisiatif change management</p>
        <div class="flex items-center justify-between">
          ${[
            { label: 'Pilot',       value: 4, color: 'amber' },
            { label: 'In Progress', value: 6, color: 'sky' },
            { label: 'Scaling',     value: 3, color: 'indigo' },
            { label: 'Completed',   value: 8, color: 'emerald' }
          ].map((s, i, a) => `
            <div class="flex flex-col items-center flex-1">
              <div class="w-20 h-20 rounded-2xl ${COLOR_CLASSES[s.color].bg} ${COLOR_CLASSES[s.color].text} flex flex-col items-center justify-center font-semibold">
                <span class="text-2xl">${s.value}</span>
                <span class="text-[10px] uppercase tracking-wider mt-1 opacity-80">${s.label}</span>
              </div>
            </div>`).join('')}
        </div>
      </section>
    </div>`;
}

// ============================================================
// MODUL: NOTIFICATION & APPROVAL CENTER
// ============================================================
function renderNotificationsApprovalsPage() {
  const c = document.getElementById('dashboard-container');
  c.classList.remove('fade-in'); void c.offsetWidth; c.classList.add('fade-in');
  const u = DATA.users[currentRole];
  document.getElementById('ctx-name').textContent = u.name;
  document.getElementById('ctx-role').textContent = 'Notification & Approval';
  document.getElementById('crumb-2').textContent = 'Notification & Approval';

  const ns = DATA.notifications;
  const nsStats = DATA.notificationStats;
  const approvals = DATA.pendingApprovals;
  const matrix = DATA.approvalMatrix;
  const audit = DATA.auditTrail;
  const ctx = { role: currentRole };

  c.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Notification & Approval Center</h1>
        <p class="text-sm text-gray-500 mt-1">Pusat notifikasi (in-app + email) dan approval workflow berjenjang dengan tanda tangan elektronik.</p>
      </header>

      <!-- Notification Stats -->
      <section class="mb-8">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
          ${[
            { label: 'Unread',               value: nsStats.unread,                  icon: 'bell',    color: 'rose' },
            { label: 'Today Received',       value: nsStats.todayReceived,           icon: 'bolt',    color: 'sky' },
            { label: 'Email Success',        value: nsStats.deliveryEmailSuccess.toLocaleString(), icon: 'check', color: 'emerald' },
            { label: 'Email Pending',        value: nsStats.deliveryPending,         icon: 'clock',   color: 'amber' },
            { label: 'Email Failed',         value: nsStats.deliveryEmailFailed,     icon: 'alert',   color: 'red' }
          ].map(k => kpiCard(k)).join('')}
        </div>
      </section>

      <!-- TWO COLUMNS: Notifications | Pending Approvals -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Notifications list -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden">
          <div class="p-5 border-b border-surface-200 flex items-center justify-between">
            <div>
              <h2 class="text-base font-semibold text-gray-900">📬 Notifications</h2>
              <p class="text-xs text-gray-500 mt-0.5">${nsStats.unread} unread · in-app + email</p>
            </div>
            <div class="flex items-center gap-2">
              <select class="text-xs border border-surface-200 rounded-lg px-3 py-1.5 bg-white">
                <option>Semua Tipe</option>
                <option>Appreciation</option>
                <option>Coaching</option>
                <option>Best Practice</option>
                <option>Approval</option>
                <option>System</option>
              </select>
              <button class="text-xs font-medium text-brand-600 hover:underline">Mark all read</button>
            </div>
          </div>
          <div class="p-3 space-y-2">
            ${ns.map(n => notificationItem(n)).join('')}
          </div>
        </div>

        <!-- Pending Approvals sidebar -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-semibold text-gray-900">⏳ Pending Approvals</h2>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">${approvals.length}</span>
          </div>
          <div class="space-y-3">
            ${approvals.map(a => approvalCard(a, ctx)).join('')}
          </div>
        </div>
      </div>

      <!-- Approval Matrix -->
      <section class="mb-8 bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden">
        <div class="p-5 border-b border-surface-200">
          <h2 class="text-base font-semibold text-gray-900">📋 Approval Workflow Matrix</h2>
          <p class="text-xs text-gray-500 mt-0.5">Berjenjang sesuai tipe event — semua wajib tanda tangan elektronik + audit trail</p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-surface-50 border-b border-surface-200">
              <tr class="text-xs text-gray-500 uppercase tracking-wider">
                <th class="text-left px-5 py-3 font-semibold">Event</th>
                <th class="text-center px-4 py-3 font-semibold">Manager</th>
                <th class="text-center px-4 py-3 font-semibold">Executive</th>
                <th class="text-center px-4 py-3 font-semibold">E-Signature</th>
                <th class="text-center px-4 py-3 font-semibold">Typical Days</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200">
              ${matrix.map(m => `
                <tr class="hover:bg-surface-50">
                  <td class="px-5 py-3 font-medium text-gray-900">${m.event}</td>
                  <td class="text-center px-4 py-3">${m.managerRequired ? '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold">✓</span>' : '<span class="text-slate-400">—</span>'}</td>
                  <td class="text-center px-4 py-3">${m.execRequired ? '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold">✓</span>' : '<span class="text-slate-400">—</span>'}</td>
                  <td class="text-center px-4 py-3">${m.signatureRequired ? '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-50 text-amber-600 text-sm font-bold">✎</span>' : '<span class="text-slate-400">—</span>'}</td>
                  <td class="text-center px-4 py-3 text-xs text-gray-600">${m.typicalDays}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="p-4 bg-blue-50 border-t border-blue-100 text-xs text-gray-700">
          <strong>Compliance:</strong> Semua approval yang ditandai tanda tangan elektronik tunduk pada UU ITE No. 11/2008. Audit trail immutable dan ditandatangani SHA-256 hash.
        </div>
      </section>

      <!-- Audit Trail -->
      <section class="mb-8 bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden">
        <div class="p-5 border-b border-surface-200 flex items-center justify-between">
          <div>
            <h2 class="text-base font-semibold text-gray-900">🔐 Audit Trail</h2>
            <p class="text-xs text-gray-500 mt-0.5">Immutable log semua approval & publication activity</p>
          </div>
          <button class="text-xs font-medium text-brand-600 hover:underline">Export CSV →</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-surface-50 border-b border-surface-200">
              <tr class="text-xs text-gray-500 uppercase tracking-wider">
                <th class="text-left px-4 py-3 font-semibold">Timestamp</th>
                <th class="text-left px-4 py-3 font-semibold">Actor</th>
                <th class="text-left px-4 py-3 font-semibold">Action</th>
                <th class="text-left px-4 py-3 font-semibold">Target</th>
                <th class="text-left px-4 py-3 font-semibold">Signature ID</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200">
              ${audit.map(a => {
                const actionColor = { approved: 'text-emerald-700', rejected: 'text-red-700', submitted: 'text-amber-700', published: 'text-indigo-700', reviewed: 'text-sky-700', 'auto-routed': 'text-slate-600' };
                return `
                  <tr class="hover:bg-surface-50">
                    <td class="px-4 py-3 text-xs text-gray-500 font-mono">${a.timestamp}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">${a.actor}</td>
                    <td class="px-4 py-3 text-xs font-semibold ${actionColor[a.action] || 'text-gray-700'} uppercase tracking-wide">${a.action}</td>
                    <td class="px-4 py-3 text-gray-700">${a.target}${a.note ? ' <span class="text-xs text-gray-400 italic">(' + a.note + ')</span>' : ''}</td>
                    <td class="px-4 py-3 text-xs font-mono text-gray-500">${a.signatureId || '—'}</td>
                  </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>`;
}

// ============================================================
// ADD AGENT MODAL (Manager)
// ============================================================
function openAddAgentModal() {
  const root = document.getElementById('modal-root');
  document.getElementById('modal-content').innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Tambah Agent of Change</h3>
        <p class="text-sm text-gray-500 mt-1">Nominasikan karyawan berpotensi sebagai Agent of Change.</p>
      </div>
      <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="space-y-4">
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Karyawan</label>
        <input type="text" placeholder="Cari nama karyawan..." class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white" />
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Inisiatif yang Di-assign</label>
        <select class="w-full h-10 rounded-xl border border-surface-200 px-3 text-sm bg-white">
          <option>Onboarding journey v2</option>
          <option>Lean process coaching</option>
          <option>AI-assisted coding standard</option>
          <option>PEDULI culture rollout</option>
          <option>Inisiatif baru...</option>
        </select>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Alasan Nominasi</label>
        <textarea class="w-full h-24 rounded-xl border border-surface-200 px-3 py-2 text-sm bg-white resize-none" placeholder="Mengapa kandidat ini layak menjadi Agent of Change?"></textarea>
      </div>
      <div class="flex items-start gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
        <div class="text-blue-600 flex-shrink-0 text-lg">ℹ️</div>
        <div class="text-xs text-gray-700">Penambahan Agent baru wajib melalui approval: <strong>Manager → Executive</strong> dengan tanda tangan elektronik.</div>
      </div>
    </div>
    <div class="flex gap-3 mt-6">
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl border border-surface-200 text-sm font-medium text-gray-700 hover:bg-surface-50">Batal</button>
      <button onclick="closeModal()" class="flex-1 h-11 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">Submit untuk Approval</button>
    </div>`;
  root.classList.remove('hidden');
}
