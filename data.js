// ============================================================
// data.js — Dummy data untuk Hallo Management prototype
// ============================================================

const DATA = {
  // ---------- USERS ----------
  users: {
    employee: { id: 'EMP-1042', name: 'Andi Saputra', role: 'Employee', roleLabel: 'Employee Dashboard', avatar: 'A', position: 'Marketing Specialist', department: 'Marketing', division: 'Commercial', branch: 'Jakarta HQ', manager: 'Budi Hartono', joinDate: '12 Mar 2024', status: 'Active' },
    manager:  { id: 'EMP-1005', name: 'Budi Hartono', role: 'Manager',  roleLabel: 'Manager Dashboard',  avatar: 'B', position: 'Marketing Manager', department: 'Marketing', division: 'Commercial', branch: 'Jakarta HQ', manager: 'Sinta Wahyu', joinDate: '04 Jan 2020', status: 'Active' },
    hr:       { id: 'EMP-0012', name: 'Sinta Wahyu',  role: 'HR',       roleLabel: 'HR / People Dashboard', avatar: 'S', position: 'People & Culture Lead', department: 'People & Culture', division: 'Corporate', branch: 'Jakarta HQ', manager: '—', joinDate: '08 Jul 2018', status: 'Active' },
    admin:    { id: 'EMP-0003', name: 'Rizky Pratama',role: 'Admin',    roleLabel: 'Admin Dashboard',    avatar: 'R', position: 'System Administrator', department: 'IT Operations', division: 'Corporate', branch: 'Jakarta HQ', manager: '—', joinDate: '02 Feb 2017', status: 'Active' },
    executive:{ id: 'EMP-0001', name: 'Dewi Anggraini',role: 'Executive', roleLabel: 'Executive Dashboard', avatar: 'D', position: 'Chief Executive Officer', department: 'Executive', division: '—', branch: 'Jakarta HQ', manager: '—', joinDate: '01 Jan 2015', status: 'Active' }
  },

  // ---------- KPI BUILDER ----------
  kpis: {
    employee: [
      { label: 'Appreciation Received', value: '12', delta: '+3 this month', icon: 'heart', color: 'rose' },
      { label: 'Best Practice Submitted', value: '4', delta: '2 in review', icon: 'doc', color: 'sky' },
      { label: 'Coaching Sessions', value: '6', delta: '2 upcoming', icon: 'users', color: 'amber' },
      { label: 'Pending Actions', value: '2', delta: '1 due tomorrow', icon: 'clock', color: 'red' }
    ],
    manager: [
      { label: 'Team Members', value: '14', delta: '2 on leave', icon: 'users', color: 'indigo' },
      { label: 'Pending Approvals', value: '5', delta: '2 overdue', icon: 'check', color: 'rose' },
      { label: 'Coaching Due', value: '8', delta: 'next: 2 Oct', icon: 'calendar', color: 'amber' },
      { label: 'Open Follow-ups', value: '3', delta: '1 escalated', icon: 'flag', color: 'red' }
    ],
    hr: [
      { label: 'Total Employees', value: '1,248', delta: '+24 this quarter', icon: 'users', color: 'indigo' },
      { label: 'Active Managers', value: '186', delta: '92% active', icon: 'shield', color: 'emerald' },
      { label: 'Pending Cases', value: '7', delta: '2 high priority', icon: 'flag', color: 'rose' },
      { label: 'Coaching Completion', value: '78%', delta: '+6% MoM', icon: 'check', color: 'emerald' }
    ],
    admin: [
      { label: 'Active Users', value: '1,134', delta: 'of 1,248', icon: 'users', color: 'indigo' },
      { label: 'Pending Approvals', value: '12', delta: '3 urgent', icon: 'check', color: 'amber' },
      { label: 'Failed Notifications', value: '4', delta: 'last 24h', icon: 'alert', color: 'rose' },
      { label: 'Open Reports', value: '8', delta: '2 escalated', icon: 'flag', color: 'amber' }
    ],
    executive: [
      { label: 'Total Employees', value: '1,248', delta: '+24 this quarter', icon: 'users', color: 'indigo' },
      { label: 'Engagement Rate', value: '84%', delta: '+5% YoY', icon: 'trend', color: 'emerald' },
      { label: 'Coaching Completion', value: '78%', delta: '+6% MoM', icon: 'check', color: 'emerald' },
      { label: 'Recognition Activity', value: '342', delta: '+18% MoM', icon: 'heart', color: 'rose' },
      { label: 'Open Issues', value: '5', delta: '2 escalated', icon: 'alert', color: 'amber' },
      { label: 'Best Practice Contributions', value: '89', delta: '+12 this month', icon: 'doc', color: 'sky' }
    ]
  },

  // ---------- QUICK ACTIONS ----------
  quickActions: {
    employee: [
      { title: 'Give Appreciation', desc: 'Recognize a colleague for great work', icon: 'heart', color: 'rose' },
      { title: 'Submit Best Practice', desc: 'Share a lesson learned with the team', icon: 'doc', color: 'sky' },
      { title: 'Request Coaching', desc: 'Ask for guidance from your manager', icon: 'users', color: 'amber' },
      { title: 'Report / Follow Up', desc: 'Flag an issue that needs attention', icon: 'flag', color: 'red' }
    ]
  },

  // ---------- TIMELINE / ACTIVITY ----------
  timeline: {
    employee: [
      { type: 'appreciation', icon: 'heart', color: 'rose', title: 'Appreciation received from Budi Hartono', desc: '"Great work on the Q3 campaign launch — your attention to detail made the difference."', time: '2 hours ago' },
      { type: 'bestpractice', icon: 'doc', color: 'sky', title: 'Best practice submitted', desc: 'How we increased engagement on Instagram by 42%', time: 'Yesterday' },
      { type: 'coaching', icon: 'users', color: 'amber', title: 'Coaching session scheduled', desc: 'Career development — with Sinta Wahyu', time: '28 Sep' },
      { type: 'followup', icon: 'flag', color: 'red', title: 'Follow-up requested', desc: 'Provide update on Q3 marketing report', time: '25 Sep' }
    ],
    hr: [
      { type: 'joined', icon: 'user-plus', color: 'emerald', title: 'New employee joined', desc: 'Rina Melati — Product Designer, Product Division', time: '1 hour ago' },
      { type: 'org', icon: 'org', color: 'sky', title: 'Organization changed', desc: 'Marketing Division restructured under Commercial', time: '4 hours ago' },
      { type: 'manager', icon: 'user-switch', color: 'indigo', title: 'Manager changed', desc: 'Andi Saputra reporting line updated to Budi Hartono', time: 'Yesterday' },
      { type: 'coaching', icon: 'check', color: 'emerald', title: 'Coaching completed', desc: 'Performance coaching for Dimas — finalized', time: 'Yesterday' },
      { type: 'escalated', icon: 'alert', color: 'rose', title: 'Report escalated', desc: 'Employee case #CASE-1042 escalated to HR Director', time: '2 days ago' }
    ],
    admin: [
      { type: 'role', icon: 'shield', color: 'sky', title: 'Role changed by Admin', desc: 'Andi Saputra: role Employee → Reviewer', time: '10:42' },
      { type: 'config', icon: 'gear', color: 'indigo', title: 'Configuration updated', desc: 'Notification retry policy changed to 3 attempts', time: '09:18' },
      { type: 'integration', icon: 'sync', color: 'emerald', title: 'HRIS sync completed', desc: '1,248 employees synced from HRIS', time: '08:30' },
      { type: 'failure', icon: 'alert', color: 'rose', title: 'Notification delivery failed', desc: '4 emails failed — recipient inbox full', time: '07:55' }
    ]
  },

  // ---------- APPROVALS ----------
  approvals: {
    manager: [
      { employee: 'Andi Saputra', request: 'Appreciation Review', submitted: '29 Sep', status: 'Pending', avatar: 'AS' },
      { employee: 'Rina Melati', request: 'Best Practice Approval', submitted: '28 Sep', status: 'Pending', avatar: 'RM' },
      { employee: 'Dimas P.', request: 'Coaching Follow-up', submitted: '27 Sep', status: 'In Review', avatar: 'DP' },
      { employee: 'Tio W.', request: 'Coaching Follow-up', submitted: '26 Sep', status: 'Overdue', avatar: 'TW' }
    ]
  },

  // ---------- RECOGNITION ----------
  recognition: {
    employee: [
      { badge: '⭐ Team Player', sender: 'Budi Hartono', message: 'Your collaboration with the design team shipped the launch on time.', date: '29 Sep' },
      { badge: '🚀 Above & Beyond', sender: 'Rina Melati', message: 'Stayed late to help QA the new onboarding flow.', date: '25 Sep' },
      { badge: '💡 Innovator', sender: 'Sinta Wahyu', message: 'Your A/B test framework saved us weeks of work.', date: '20 Sep' }
    ],
    team: [
      { employee: 'Andi Saputra', type: 'Appreciation from Manager', date: '29 Sep', avatar: 'AS' },
      { employee: 'Rina Melati', type: 'Best Practice submitted', date: '28 Sep', avatar: 'RM' },
      { employee: 'Dimas P.', type: 'Coaching session completed', date: '27 Sep', avatar: 'DP' },
      { employee: 'Tio W.', type: 'Peer recognition', date: '26 Sep', avatar: 'TW' }
    ]
  },

  // ---------- UPCOMING ----------
  upcoming: [
    { title: 'Coaching Session', subtitle: 'with Sinta Wahyu', date: '2 Oct', color: 'amber' },
    { title: 'Manager Review', subtitle: 'Q4 Goal Setting', date: '5 Oct', color: 'indigo' },
    { title: 'Best Practice Review', subtitle: 'Instagram Engagement', date: '8 Oct', color: 'sky' }
  ],

  // ---------- CHARTS ----------
  chartTeamActivity: {
    labels: ['W1','W2','W3','W4'],
    appreciation: [12, 18, 22, 28],
    bestpractice: [4, 6, 5, 9],
    coaching: [8, 10, 12, 14],
    followup: [3, 5, 4, 6]
  },

  chartEngagementTrend: {
    labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep'],
    appreciation: [120, 145, 168, 180, 195, 220, 245, 270, 298],
    bestpractice: [22, 28, 35, 38, 42, 48, 55, 60, 68],
    coaching: [85, 92, 98, 105, 112, 118, 125, 132, 140]
  },

  // ---------- COACHING HEALTH ----------
  coachingHealth: {
    completed: 62,
    onTrack: 28,
    dueSoon: 7,
    overdue: 3
  },

  // ---------- ATTENTION REQUIRED (HR) ----------
  attentionHR: [
    { insight: '12 overdue coaching activities', context: '8 belong to Marketing Division', action: 'Review Coaching' },
    { insight: '3 reports pending HR review', context: '1 escalated from Manager Dashboard', action: 'Open Reports' },
    { insight: 'Engagement dipped in Operations', context: '-8% vs previous month', action: 'View Insight' }
  ],

  // ---------- EXECUTIVE INSIGHTS ----------
  attentionExec: [
    { insight: '12 coaching activities require attention', context: 'Across 3 divisions, mostly Marketing' },
    { insight: '3 reports are currently under review', context: '1 escalated to HR Director' },
    { insight: 'Marketing shows increased engagement', context: '+22% recognition activity MoM' }
  ],

  // ---------- AUDIT TRAIL ----------
  auditTrail: [
    { time: '10:42', user: 'Rizky Pratama', activity: 'changed role', module: 'Access', action: 'Andi: Employee → Reviewer' },
    { time: '09:18', user: 'Sinta Wahyu', activity: 'updated', module: 'Coaching', action: 'Coaching template v2.1 published' },
    { time: '08:30', user: 'system', activity: 'synced', module: 'HRIS Integration', action: '1,248 employees synced successfully' },
    { time: '07:55', user: 'system', activity: 'failed', module: 'Notifications', action: '4 emails failed delivery' },
    { time: 'Yesterday 17:08', user: 'Budi Hartono', activity: 'approved', module: 'Appreciation', action: 'Approved appreciation for Rina M.' }
  ],

  // ---------- SIDEBAR NAV ----------
  navMain: [
    { route: 'dashboard',    label: 'Dashboard',        icon: 'home' },
    { route: 'peduli',       label: 'PEDULI Values',    icon: 'star' },
    { route: 'appreciation', label: 'Appreciation',     icon: 'heart' },
    { route: 'whistle',      label: 'Whistle / Report', icon: 'shield', badge: 3 },
    { route: 'bestpractice', label: 'Best Practice',    icon: 'doc' },
    { route: 'coaching',     label: 'Coaching',         icon: 'users' },
    { route: 'agent',        label: 'Agent of Change',  icon: 'bolt' },
    { route: 'reports',      label: 'Reports',          icon: 'chart' },
    { route: 'approvals',    label: 'Approvals',        icon: 'check', badge: 3 },
    { route: 'permissions',  label: 'Role & Permissions',icon: 'key' },
    { route: 'employees',    label: 'Employees',        icon: 'user' },
    { route: 'organization', label: 'Organization',     icon: 'building' },
    { route: 'notifications',label: 'Notifications',    icon: 'bell' },
    { route: 'admin',        label: 'Administration',   icon: 'gear' }
  ],

  // ---------- PEDULI CORE VALUES ----------
  // NOTE: Names below are placeholders. Replace with client's official PEDULI definitions
  // P = Profesional, E = Empati, D = Disiplin, U = Unggul, L = Loyal, I = Integritas
  peduliValues: [
    { letter: 'P', name: 'Profesional', desc: 'Bekerja dengan standar tinggi dan kompetensi relevan.', adoption: 92, recognitionCount: 145, icon: 'trend', color: 'rose' },
    { letter: 'E', name: 'Empati',     desc: 'Mendengarkan dengan seksama dan bertindak dengan kepedulian.', adoption: 88, recognitionCount: 128, icon: 'heart', color: 'indigo' },
    { letter: 'D', name: 'Disiplin',   desc: 'Konsisten pada proses, tepat pada komitmen.', adoption: 85, recognitionCount: 96,  icon: 'check', color: 'amber' },
    { letter: 'U', name: 'Unggul',     desc: 'Mencari cara lebih baik, bukan hanya cara yang cukup.', adoption: 79, recognitionCount: 112, icon: 'bolt', color: 'sky' },
    { letter: 'L', name: 'Loyal',      desc: 'Menjaga kepercayaan, memberi kontribusi jangka panjang.', adoption: 91, recognitionCount: 73,  icon: 'users', color: 'emerald' },
    { letter: 'I', name: 'Integritas', desc: 'Berkata dan bertindak jujur, terutama saat tidak diawasi.', adoption: 94, recognitionCount: 84,  icon: 'shield', color: 'red' }
  ],
  peduliPulse: { activeThisMonth: 312, topValue: 'Integritas', topPct: 94 },

  // ---------- EMPLOYEE APPRECIATION HISTORY ----------
  // Untuk view Employee di PEDULI page
  myAppreciation: {
    sent: [ // peer-to-peer yang employee kirim
      { recipient: 'Rina Melati',  value: 'E', valueName: 'Empati',     message: 'Terima kasih sudah bantu revisi brief desain.', date: '29 Sep' },
      { recipient: 'Budi Hartono', value: 'P', valueName: 'Profesional',message: 'Leadership yang jelas di weekly meeting.',     date: '22 Sep' },
      { recipient: 'Dimas Putra',  value: 'U', valueName: 'Unggul',     message: 'Solusi otomasinya hemat 8 jam/minggu.',        date: '18 Sep' }
    ],
    received: [ // top-down dari manager/executive
      { sender: 'Budi Hartono',   title: 'Q3 Performance Champion', value: 'I', valueName: 'Integritas', message: 'Konsistensi tinggi dalam integritas data Q3.', date: '28 Sep' },
      { sender: 'Dewi Anggraini', title: 'Above & Beyond',          value: 'U', valueName: 'Unggul',     message: 'Inisiatif di luar ekspektasi untuk project X.', date: '15 Sep' },
      { sender: 'Budi Hartono',   title: 'Team Player Award',       value: 'L', valueName: 'Loyal',      message: 'Selalu hadir untuk tim saat needed.',           date: '2 Sep' }
    ]
  },

  // ---------- PEDULI LEADERBOARD (Manager+ only) ----------
  // Top performers, divisions, branches — Q3 2026 snapshot
  peduliLeaderboard: {
    period: 'Q3 2026',
    generatedAt: '30 Sep 2026',
    topPerformers: [
      { rank: 1,  name: 'Andi Saputra',  division: 'Marketing',   branch: 'Jakarta HQ', points: 412, sent: 38, received: 24, avatar: 'AS' },
      { rank: 2,  name: 'Rina Melati',   division: 'Marketing',   branch: 'Bandung',    points: 389, sent: 32, received: 28, avatar: 'RM' },
      { rank: 3,  name: 'Dimas Putra',   division: 'Operations',  branch: 'Jakarta HQ', points: 356, sent: 22, received: 31, avatar: 'DP' },
      { rank: 4,  name: 'Tio Wibowo',    division: 'Technology',  branch: 'Surabaya',   points: 298, sent: 28, received: 19, avatar: 'TW' },
      { rank: 5,  name: 'Sinta Wahyu',   division: 'Corporate',   branch: 'Jakarta HQ', points: 274, sent: 41, received: 16, avatar: 'SW' },
      { rank: 6,  name: 'Budi Hartono',  division: 'Commercial',  branch: 'Jakarta HQ', points: 248, sent: 25, received: 22, avatar: 'BH' },
      { rank: 7,  name: 'Lia Permata',   division: 'Marketing',   branch: 'Jakarta HQ', points: 226, sent: 19, received: 21, avatar: 'LP' },
      { rank: 8,  name: 'Agus Pratama',  division: 'Operations',  branch: 'Medan',      points: 198, sent: 14, received: 18, avatar: 'AP' },
      { rank: 9,  name: 'Maya Sari',     division: 'Technology',  branch: 'Jakarta HQ', points: 184, sent: 17, received: 15, avatar: 'MS' },
      { rank: 10, name: 'Riko Aditya',   division: 'Finance',     branch: 'Bandung',    points: 172, sent: 12, received: 17, avatar: 'RA' }
    ],
    topDivisions: [
      { name: 'Marketing',   members: 412, points: 8420, avg: 20.4, change: '+12%' },
      { name: 'Operations',  members: 298, points: 6180, avg: 20.7, change: '+8%'  },
      { name: 'Technology',  members: 245, points: 5240, avg: 21.4, change: '+18%' },
      { name: 'Commercial',  members: 186, points: 3640, avg: 19.6, change: '+5%'  },
      { name: 'Corporate',   members:  72, points: 1480, avg: 20.6, change: '+3%'  },
      { name: 'Finance',     members:  35, points:  620, avg: 17.7, change: '-2%'  }
    ],
    topBranches: [
      { name: 'Jakarta HQ', members: 580, points: 12840, avg: 22.1 },
      { name: 'Bandung',    members: 220, points:  4280, avg: 19.5 },
      { name: 'Surabaya',   members: 180, points:  3120, avg: 17.3 },
      { name: 'Medan',      members: 142, points:  2140, avg: 15.1 },
      { name: 'Semarang',   members: 126, points:  1820, avg: 14.4 }
    ]
  },

  // ---------- WHISTLE / REPORTS ----------
  whistleReports: [
    { id: 'WBL-1042', category: 'Etika & Integritas', severity: 'high',   status: 'In Review',  anonymous: true,  summary: 'Potensi pelanggaran prosedur procurement',  submitted: '29 Sep', assignedTo: 'HR Director' },
    { id: 'WBL-1041', category: 'Lingkungan Kerja',   severity: 'medium', status: 'Pending',    anonymous: false, summary: 'Kekhawatiran terkait beban kerja tim',       submitted: '28 Sep', assignedTo: 'HR Manager' },
    { id: 'WBL-1040', category: 'Keamanan Data',      severity: 'critical',status: 'Escalated',  anonymous: true,  summary: 'Akses tidak sah terhadap dokumen internal',  submitted: '27 Sep', assignedTo: 'Compliance' },
    { id: 'WBL-1039', category: 'Diskriminasi',       severity: 'high',   status: 'Investigating',anonymous: true, summary: 'Laporan perlakuan tidak adil dalam promosi',  submitted: '24 Sep', assignedTo: 'HR Director' },
    { id: 'WBL-1038', category: 'Etika & Integritas', severity: 'low',    status: 'Resolved',   anonymous: false, summary: 'Penggunaan aset kantor untuk kepentingan pribadi', submitted: '20 Sep', assignedTo: 'HR Manager' },
    { id: 'WBL-1037', category: 'Lingkungan Kerja',   severity: 'medium', status: 'Resolved',   anonymous: true,  summary: 'Konflik antar rekan kerja di divisi X',       submitted: '18 Sep', assignedTo: 'HR Manager' }
  ],
  whistleStats: { open: 4, inReview: 3, escalated: 1, resolved: 18, avgResponse: '2.4 hari' },

  // ---------- AGENT OF CHANGE ----------
  agentsOfChange: [
    { id: 'AOC-001', name: 'Rina Melati',  division: 'Marketing',   initiative: 'Onboarding journey v2',       status: 'In Progress', adoption: 68, members: 12, avatar: 'RM' },
    { id: 'AOC-002', name: 'Dimas Putra',  division: 'Operations',  initiative: 'Lean process coaching',      status: 'Scaling',     adoption: 84, members: 18, avatar: 'DP' },
    { id: 'AOC-003', name: 'Tio Wibowo',   division: 'Technology',  initiative: 'AI-assisted coding standard',status: 'Pilot',       adoption: 42, members: 6,  avatar: 'TW' },
    { id: 'AOC-004', name: 'Sinta Wahyu',  division: 'Corporate',   initiative: 'PEDULI culture rollout',     status: 'In Progress', adoption: 91, members: 24, avatar: 'SW' },
    { id: 'AOC-005', name: 'Budi Hartono', division: 'Commercial',  initiative: 'Customer-first training',    status: 'Completed',   adoption: 100, members: 14, avatar: 'BH' }
  ],
  agentStats: { totalAgents: 28, activeInitiatives: 12, avgAdoption: 77, recognitionBonus: 156 },

  // ---------- ROLE & PERMISSIONS MATRIX ----------
  // Setiap cell: ✓ = allowed, — = not allowed, R = read-only, A = approval required
  roleModules: [
    { module: 'Dashboard Management',    emp: 'R', mgr: 'R', hr: 'R', admin: 'R', exec: 'R' },
    { module: 'Apresiasi PEDULI',        emp: '✓', mgr: '✓', hr: '✓', admin: '—', exec: 'R' },
    { module: 'Whistle / Reporting',     emp: '✓', mgr: '✓', hr: '✓', admin: '—', exec: 'R' },
    { module: 'Coaching & Follow Up',    emp: 'R', mgr: '✓', hr: '✓', admin: '—', exec: 'R' },
    { module: 'Best Practice Sharing',   emp: '✓', mgr: '✓', hr: '✓', admin: '—', exec: 'R' },
    { module: 'Agent of Change',         emp: '—', mgr: '✓', hr: '✓', admin: '—', exec: 'R' },
    { module: 'Notification & Approval', emp: 'R', mgr: '✓', hr: '✓', admin: '✓', exec: 'R' },
    { module: 'KPI Dashboard & Analytics',emp: 'R', mgr: 'R', hr: '✓', admin: '✓', exec: 'R' },
    { module: 'Admin & User Management', emp: '—', mgr: '—', hr: '—', admin: '✓', exec: '—' }
  ],
  roleSummary: [
    { role: 'Employee',  count: 920, desc: 'Akses self-service: kirim recognition, ajukan coaching, submit whistle anonim.' },
    { role: 'Manager',   count: 168, desc: 'Akses tim: approve pengajuan, monitoring KPI, nominate Agent of Change.' },
    { role: 'HR / People',count:  24, desc: 'Akses operasional: kelola kasus whistle, configure PEDULI values, lihat analytics.' },
    { role: 'Admin',     count:   6, desc: 'Akses sistem: kelola user & role, integrasi HRIS, audit log.' },
    { role: 'Executive', count:   2, desc: 'Akses strategis: dashboard eksekutif, culture insight, organizational health.' }
  ],

  // ---------- COACHING & FOLLOW UP ----------
  coachingStats: { upcomingCount: 8, overdueCount: 2, completedThisMonth: 14, avgDuration: 45, followUpsDue: 3 },
  coachingSessions: [
    // Scheduled upcoming
    { id: 'COA-101', employee: 'Andi Saputra',  manager: 'Budi Hartono', type: '1-on-1',      topic: 'Career development — leadership path',       scheduledDate: '2 Oct 2026',  duration: 60, status: 'scheduled', followUpDate: null, followUpStatus: null, actionItems: null, notes: null },
    { id: 'COA-102', employee: 'Rina Melati',   manager: 'Budi Hartono', type: 'Performance', topic: 'Q3 performance review',                       scheduledDate: '5 Oct 2026',  duration: 90, status: 'scheduled', followUpDate: null, followUpStatus: null, actionItems: null, notes: null },
    { id: 'COA-103', employee: 'Tio Wibowo',    manager: 'Budi Hartono', type: 'Project',     topic: 'Onboarding journey v2 — kickoff alignment', scheduledDate: '8 Oct 2026',  duration: 45, status: 'scheduled', followUpDate: null, followUpStatus: null, actionItems: null, notes: null },
    { id: 'COA-104', employee: 'Lia Permata',   manager: 'Budi Hartono', type: '1-on-1',      topic: 'Workload check-in & well-being',             scheduledDate: '14 Oct 2026', duration: 30, status: 'scheduled', followUpDate: null, followUpStatus: null, actionItems: null, notes: null },
    // Completed with notes + follow-up
    { id: 'COA-095', employee: 'Dimas Putra',   manager: 'Budi Hartono', type: 'Career',      topic: 'Skill gap analysis untuk Tech Lead role',  scheduledDate: '28 Sep 2026', duration: 60, status: 'completed', followUpDate: '12 Oct 2026', followUpStatus: 'pending',
      notes: 'Diskusi tentang gap teknis dan timeline readiness. Dimas on-track untuk Tech Lead readiness Q2 2027.',
      actionItems: ['Submit self-assessment untuk Tech Lead readiness', 'Diskusi dengan Engineering Director untuk sponsorship', 'Enroll di 1 course cloud architecture'] },
    { id: 'COA-094', employee: 'Andi Saputra',  manager: 'Budi Hartono', type: '1-on-1',      topic: 'Q3 OKR progress & blocker check',           scheduledDate: '21 Sep 2026', duration: 45, status: 'completed', followUpDate: '5 Oct 2026', followUpStatus: 'pending',
      notes: 'Andi behind schedule di KR 3.2 (campaign launch). Diskusi dependency dan tambahan resource dari Design.',
      actionItems: ['Sync daily dengan Design Lead sampai launch', 'Update timeline KR 3.2 di OKR dashboard', 'Escalate ke Marketing Director jika blocked >3 hari'] },
    { id: 'COA-093', employee: 'Maya Sari',     manager: 'Budi Hartono', type: 'Performance', topic: 'Q3 performance calibration',                 scheduledDate: '14 Sep 2026', duration: 60, status: 'completed', followUpDate: '28 Sep 2026', followUpStatus: 'completed',
      notes: 'Calibration dengan HRBP selesai. Maya rating "Exceeds Expectations". Komitmen pengembangan leadership disepakati.',
      actionItems: ['Maya enroll di Emerging Leaders program', 'Monthly check-in dengan skip-level'] },
    // Overdue
    { id: 'COA-090', employee: 'Agus Pratama',  manager: 'Budi Hartono', type: '1-on-1',      topic: 'Performance recovery plan',                  scheduledDate: '25 Sep 2026', duration: 60, status: 'overdue',   followUpDate: null, followUpStatus: null, actionItems: null, notes: null },
    { id: 'COA-088', employee: 'Riko Aditya',   manager: 'Budi Hartono', type: 'Project',     topic: 'Q4 close timeline review',                   scheduledDate: '23 Sep 2026', duration: 45, status: 'overdue',   followUpDate: null, followUpStatus: null, actionItems: null, notes: null }
  ],

  // ---------- BEST PRACTICE SHARING ----------
  bpStats: { publishedThisWeek: 5, totalSubmissions: 89, totalVotes: 1247, avgCurationTime: '1.8 hari' },
  bpScheduleDays: [
    { day: 'Monday',    label: 'Senin',  emoji: '🌅' },
    { day: 'Wednesday', label: 'Rabu',   emoji: '☕' },
    { day: 'Friday',    label: 'Jumat',  emoji: '🚀' }
  ],
  bestPractices: [
    {
      id: 'BP-001',
      title: 'Instagram engagement naik 42% dengan A/B test caption',
      submitter: 'Andi Saputra', submitterAvatar: 'AS',
      division: 'Marketing', submittedDate: '29 Sep 2026', scheduleDay: 'Wednesday',
      category: 'Marketing & Branding',
      description: 'Lakukan A/B test 3 variasi caption (pagi, siang, malam) selama 2 minggu. Caption dengan emoji di posisi pertama meningkatkan CTR 18%. Winning pattern: pertanyaan singkat di line pertama + value proposition di line kedua.',
      attachments: [{ name: 'campaign-result.pdf', size: '2.4 MB', type: 'pdf' }, { name: 'caption-variants.png', size: '480 KB', type: 'image' }],
      votes: 24, voterAvatars: ['AS','RM','DP','TW','SW'],
      status: 'published', curator: 'Budi Hartono', curatedDate: '30 Sep 2026',
      isSpotlight: true,
      tags: ['engagement', 'social-media', 'campaign']
    },
    {
      id: 'BP-002',
      title: 'Template email approval yang cut cycle time 60%',
      submitter: 'Rina Melati', submitterAvatar: 'RM',
      division: 'Operations', submittedDate: '27 Sep 2026', scheduleDay: 'Friday',
      category: 'Process & Efficiency',
      description: 'Pakai 5-field template untuk email approval. Sebelumnya approval butuh 4 email bolak-balik rata-rata 3.2 hari, sekarang jadi 1.2 hari. Template mencakup: Context, Decision needed, Options, Impact, Deadline.',
      attachments: [{ name: 'email-template.docx', size: '156 KB', type: 'doc' }],
      votes: 18, voterAvatars: ['DP','TW','AP'],
      status: 'published', curator: 'Budi Hartono', curatedDate: '28 Sep 2026',
      isSpotlight: false,
      tags: ['approval', 'efficiency', 'email']
    },
    {
      id: 'BP-003',
      title: 'Reduce cloud cost 30% dengan scheduled instance',
      submitter: 'Tio Wibowo', submitterAvatar: 'TW',
      division: 'Technology', submittedDate: '25 Sep 2026', scheduleDay: 'Friday',
      category: 'Technology',
      description: 'Migrasi dari on-demand ke scheduled instance untuk batch jobs. Penurunan cost $4,200/bulan tanpa performance impact. Saved lebih dari 6 jam engineering time per bulan untuk capacity planning.',
      attachments: [{ name: 'cost-analysis.xlsx', size: '892 KB', type: 'doc' }, { name: 'before-after.png', size: '320 KB', type: 'image' }],
      votes: 31, voterAvatars: ['TW','SW','MS','BH'],
      status: 'published', curator: 'Budi Hartono', curatedDate: '26 Sep 2026',
      isSpotlight: false,
      tags: ['cloud', 'cost-optimization', 'devops']
    },
    {
      id: 'BP-004',
      title: 'Weekly retrospective pakai 4-questions framework',
      submitter: 'Dimas Putra', submitterAvatar: 'DP',
      division: 'Operations', submittedDate: '22 Sep 2026', scheduleDay: 'Monday',
      category: 'Team & Culture',
      description: 'Format retrospective: 1) What went well? 2) What didnt? 3) What we learned? 4) What we commit to change? Adopsi 100% oleh tim Operations setelah 2 minggu pilot.',
      attachments: [],
      votes: 14, voterAvatars: ['DP','LP'],
      status: 'in_review', curator: null, curatedDate: null,
      isSpotlight: false,
      tags: ['retrospective', 'agile', 'team']
    },
    {
      id: 'BP-005',
      title: 'Onboarding buddy system — retention naik 25%',
      submitter: 'Sinta Wahyu', submitterAvatar: 'SW',
      division: 'Corporate', submittedDate: '20 Sep 2026', scheduleDay: 'Wednesday',
      category: 'People & Culture',
      description: 'Assign buddy ke setiap karyawan baru selama 90 hari pertama. Hasil: retention 6-bulan naik dari 76% ke 95%. Buddy dapat compensation point.',
      attachments: [{ name: 'buddy-program.pdf', size: '1.8 MB', type: 'pdf' }],
      votes: 22, voterAvatars: ['SW','BH'],
      status: 'in_review', curator: null, curatedDate: null,
      isSpotlight: false,
      tags: ['onboarding', 'retention', 'culture']
    },
    {
      id: 'BP-006',
      title: 'Standup 15-menit dengan 3-question format',
      submitter: 'Lia Permata', submitterAvatar: 'LP',
      division: 'Marketing', submittedDate: '18 Sep 2026', scheduleDay: 'Monday',
      category: 'Team & Culture',
      description: 'Format: What I did yesterday? What I do today? Any blocker? Reduce meeting time 50%, increase shipping velocity 18%.',
      attachments: [],
      votes: 9, voterAvatars: ['LP','AS'],
      status: 'submitted', curator: null, curatedDate: null,
      isSpotlight: false,
      tags: ['standup', 'agile', 'meeting']
    }
  ],

  // ---------- AGENT TRACKER (enhanced for "tracker" semantics) ----------
  agentTrackerStats: { totalAgents: 28, activeAssignments: 12, completedThisQuarter: 18, totalContributionPoints: 1247 },
  agentTrackerActivities: [
    { name: 'Onboarding workshop batch 14',  type: 'Training',     points: 30, status: 'completed', date: '28 Sep' },
    { name: 'Innovation challenge mentoring', type: 'Mentoring',    points: 45, status: 'completed', date: '24 Sep' },
    { name: 'PEDULI culture rollout session', type: 'Culture',      points: 25, status: 'in_progress', date: '30 Sep' },
    { name: 'Cross-team sync facilitation',  type: 'Facilitation', points: 20, status: 'pending',   date: '5 Oct' }
  ],
  agentNewMembers: [
    { name: 'Putri Ananda',  division: 'Operations', nominatedBy: 'Dimas Putra',  reason: 'Active in process improvement initiative', status: 'pending' },
    { name: 'Rian Hidayat',  division: 'Technology', nominatedBy: 'Tio Wibowo',   reason: 'Driver of DevOps adoption', status: 'pending' }
  ],

  // ---------- NOTIFICATIONS & APPROVALS ----------
  notifications: [
    { id: 'NTF-001', type: 'appreciation', channel: 'both',    title: 'Andi Saputra memberi Anda apresiasi',                 message: 'Great work on the Q3 campaign launch...',                 timestamp: '2 jam lalu',  read: false, priority: 'normal' },
    { id: 'NTF-002', type: 'coaching',     channel: 'in-app', title: 'Coaching session scheduled',                          message: 'Career development — dengan Sinta Wahyu, 2 Okt 14:00',   timestamp: '4 jam lalu',  read: false, priority: 'normal' },
    { id: 'NTF-003', type: 'approval',     channel: 'email',  title: 'Approval dibutuhkan: Best Practice BP-005',          message: 'Sinta Wahyu mengajukan BP-005 untuk kurasi & publish',  timestamp: '6 jam lalu',  read: false, priority: 'high' },
    { id: 'NTF-004', type: 'bestpractice', channel: 'in-app', title: 'Best Practice minggu ini: Cloud cost -30%',           message: 'Tio Wibowo share cara reduce cloud cost 30%...',        timestamp: 'Yesterday',   read: true,  priority: 'low' },
    { id: 'NTF-005', type: 'system',       channel: 'email',  title: 'Reminder: Quarterly OKR review',                       message: 'Q3 OKR review deadline 5 Oktober. Submit lewat HRIS.', timestamp: 'Yesterday',   read: true,  priority: 'normal' },
    { id: 'NTF-006', type: 'whistle',      channel: 'in-app', title: 'Update laporan WBL-1042',                              message: 'Status berubah ke In Review oleh HR Director',          timestamp: '2 hari lalu', read: true,  priority: 'normal' }
  ],
  notificationStats: { unread: 3, todayReceived: 6, deliveryEmailSuccess: 2098, deliveryEmailFailed: 4, deliveryPending: 82 },

  approvalMatrix: [
    { event: 'Best Practice Publication',  managerRequired: true,  execRequired: true,  signatureRequired: true,  typicalDays: '1-2' },
    { event: 'Coaching Schedule (1-on-1)', managerRequired: false, execRequired: false, signatureRequired: false, typicalDays: 'instant' },
    { event: 'Coaching Schedule (Performance Review)', managerRequired: true, execRequired: false, signatureRequired: true, typicalDays: '1' },
    { event: 'Agent of Change — Penambahan Anggota Baru', managerRequired: true, execRequired: true, signatureRequired: true, typicalDays: '2-3' },
    { event: 'Whistle Report (Critical severity)', managerRequired: false, execRequired: true, signatureRequired: true, typicalDays: 'instant' }
  ],
  pendingApprovals: [
    {
      id: 'APR-001', type: 'best_practice', title: 'BP-005: Onboarding buddy system — retention naik 25%',
      requester: 'Sinta Wahyu', submittedDate: '20 Sep 2026', priority: 'medium',
      currentStep: 'manager_review',
      steps: [
        { role: 'Manager',   approver: 'Budi Hartono',   status: 'pending', signedDate: null, signature: null },
        { role: 'Executive', approver: 'Dewi Anggraini', status: 'pending', signedDate: null, signature: null }
      ]
    },
    {
      id: 'APR-002', type: 'agent_of_change', title: 'Penambahan Agent: Putri Ananda (Operations)',
      requester: 'Dimas Putra', submittedDate: '28 Sep 2026', priority: 'low',
      currentStep: 'executive_approval',
      steps: [
        { role: 'Manager',   approver: 'Budi Hartono',   status: 'approved', signedDate: '29 Sep 2026', signature: 'BSH-9284-f8a2' },
        { role: 'Executive', approver: 'Dewi Anggraini', status: 'pending',  signedDate: null, signature: null }
      ]
    },
    {
      id: 'APR-003', type: 'coaching_performance', title: 'Performance Review: Maya Sari Q3 calibration',
      requester: 'Budi Hartono', submittedDate: '26 Sep 2026', priority: 'medium',
      currentStep: 'manager_review',
      steps: [
        { role: 'Manager',   approver: 'Budi Hartono',   status: 'pending', signedDate: null, signature: null }
      ]
    }
  ],
  auditTrail: [
    { id: 'AUD-501', timestamp: '30 Sep 2026 10:42', actor: 'Budi Hartono',   action: 'approved',    target: 'BP-005 Onboarding buddy system',     signatureId: 'BSH-9284-f8a2' },
    { id: 'AUD-502', timestamp: '30 Sep 2026 09:18', actor: 'Sinta Wahyu',    action: 'submitted',  target: 'BP-005 Onboarding buddy system',     signatureId: null },
    { id: 'AUD-503', timestamp: '29 Sep 2026 16:32', actor: 'Dewi Anggraini', action: 'reviewed',   target: 'AOC nomination — Dimas Putra',      signatureId: 'DAG-1102-c4b1' },
    { id: 'AUD-504', timestamp: '29 Sep 2026 14:18', actor: 'system',         action: 'auto-routed', target: 'BP-004 Weekly retrospective → Manager', signatureId: null },
    { id: 'AUD-505', timestamp: '28 Sep 2026 11:55', actor: 'Budi Hartono',   action: 'rejected',   target: 'BP-006 Standup 15-menit',           signatureId: 'BSH-9118-77ee', note: 'Duplicate of BP-002' },
    { id: 'AUD-506', timestamp: '28 Sep 2026 09:30', actor: 'Budi Hartono',   action: 'published',  target: 'BP-003 Cloud cost -30%',            signatureId: 'BSH-9076-aa01' }
  ]
};