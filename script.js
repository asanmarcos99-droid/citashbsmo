// ...existing code...

// Imprimir código de barra en impresora térmica de viñetas
window.imprimirExpedienteBarcode = function imprimirExpedienteBarcode(barcode, name) {
  barcode = barcode || document.getElementById('expediente-barcode').value;
  name = name || document.getElementById('expediente-patient-name').value;
  const win = window.open('', '', 'width=320,height=180');
  win.document.write(`<html><head><title>Etiqueta Expediente</title><style>body{font-family:monospace;padding:10px;} .barcode{font-size:22px;font-weight:bold;letter-spacing:2px;} .name{font-size:16px;margin-top:8px;} .desc{font-size:13px;margin-top:4px;}</style></head><body><div class='barcode'>${barcode}</div><div class='name'>${name}</div><div class='desc'>Expediente de: ${name}</div><div style='font-size:12px;margin-top:6px;'>${new Date().toLocaleDateString()}</div></body></html>`);
  win.document.close();
  setTimeout(() => { win.print(); win.close(); }, 500);
};
// Extracted JS from citas.html
// Honduras Departments and Municipalities Data
const hondurasData = {
  "Atlántida": ["La Ceiba", "El Porvenir", "Esparta", "Jutiapa", "La Masica", "San Francisco", "Tela", "Arizona"],
  "Colón": ["Trujillo", "Balfate", "Iriona", "Limón", "Sabá", "Santa Fe", "Santa Rosa de Aguán", "Sonaguera", "Tocoa", "Bonito Oriental"],
  "Comayagua": ["Comayagua", "Ajuterique", "El Rosario", "Esquías", "Humuya", "La Libertad", "Lamaní", "La Trinidad", "Lejamaní", "Meámbar", "Minas de Oro", "Ojos de Agua", "San Jerónimo", "San José de Comayagua", "San José del Potrero", "San Luis", "San Sebastián", "Siguatepeque", "Villa de San Antonio", "Las Lajas", "Taulabé"],
  "Copán": ["Santa Rosa de Copán", "Cabañas", "Concepción", "Copán Ruinas", "Corquín", "Cucuyagua", "Dolores", "Dulce Nombre", "El Paraíso", "Florida", "La Jigua", "La Unión", "Nueva Arcadia", "San Agustín", "San Antonio", "San Jerónimo", "San José", "San Juan de Opoa", "San Nicolás", "San Pedro", "Santa Rita", "Trinidad de Copán", "Veracruz"],
  "Cortés": ["San Pedro Sula", "Choloma", "Omoa", "Pimienta", "Potrerillos", "Puerto Cortés", "San Antonio de Cortés", "San Francisco de Yojoa", "San Manuel", "Santa Cruz de Yojoa", "Villanueva", "La Lima"],
  "Choluteca": ["Choluteca", "Apacilagua", "Concepción de María", "Duyure", "El Corpus", "El Triunfo", "Marcovia", "Morolica", "Namasigüe", "Orocuina", "Pespire", "San Antonio de Flores", "San Isidro", "San José", "San Marcos de Colón", "Santa Ana de Yusguare"],
  "El Paraíso": ["Yuscarán", "Alauca", "Danlí", "El Paraíso", "Güinope", "Jacaleapa", "Liure", "Morocelí", "Oropolí", "Potrerillos", "San Antonio de Flores", "San Lucas", "San Matías", "Soledad", "Teupasenti", "Texiguat", "Trojes", "Vado Ancho"],
  "Francisco Morazán": ["Tegucigalpa", "Alubarén", "Cedros", "Curarén", "El Porvenir", "Guaimaca", "La Libertad", "La Venta", "Lepaterique", "Maraita", "Marale", "Nueva Armenia", "Ojojona", "Orica", "Reitoca", "Sabanagrande", "San Antonio de Oriente", "San Buenaventura", "San Ignacio", "San Juan de Flores", "San Miguelito", "Santa Ana", "Santa Lucía", "Talanga", "Tatumbla", "Valle de Ángeles", "Villa de San Francisco", "Vallecillo"],
  "Gracias a Dios": ["Puerto Lempira", "Brus Laguna", "Ahuas", "Juan Francisco Bulnes", "Ramón Villeda Morales", "Wampusirpi"],
  "Intibucá": ["La Esperanza", "Camasca", "Colomoncagua", "Concepción", "Dolores", "Intibucá", "Jesús de Otoro", "Magdalena", "Masaguara", "San Antonio", "San Isidro", "San Juan", "San Marcos de la Sierra", "San Miguel Guancapla", "Santa Lucía", "Yamaranguila", "San Francisco de Opalaca"],
  "Islas de la Bahía": ["Roatán", "Guanaja", "José Santos Guardiola", "Utila"],
  "La Paz": ["La Paz", "Aguanqueterique", "Cabañas", "Cane", "Chinacla", "Guajiquiro", "Lauterique", "Marcala", "Mercedes de Oriente", "Opatoro", "San Antonio del Norte", "San José", "San Juan", "San Pedro de Tutule", "Santa Ana", "Santa Elena", "Santa María", "Santiago de Puringla", "Yarula"],
  "Lempira": ["Gracias", "Belén", "Candelaria", "Cololaca", "Erandique", "Gualcince", "Guarita", "La Campa", "La Iguala", "Las Flores", "La Unión", "La Virtud", "Lepaera", "Mapulaca", "Piraera", "San Andrés", "San Francisco", "San Juan Guarita", "San Manuel Colohete", "San Rafael", "San Sebastián", "Santa Cruz", "Talgua", "Tambla", "Tomalá", "Valladolid", "Virginia", "San Marcos de Caiquín"],
  "Ocotepeque": ["Ocotepeque", "Belén Gualcho", "Concepción", "Dolores Merendón", "Fraternidad", "La Encarnación", "La Labor", "Lucerna", "Mercedes", "San Fernando", "San Francisco del Valle", "San Jorge", "San Marcos", "Santa Fe", "Sensenti", "Sinuapa"],
  "Olancho": ["Juticalpa", "Campamento", "Catacamas", "Concordia", "Dulce Nombre de Culmí", "El Rosario", "Esquipulas del Norte", "Gualaco", "Guarizama", "Guata", "Guayape", "Jano", "La Unión", "Mangulile", "Manto", "Salamá", "San Esteban", "San Francisco de Becerra", "San Francisco de La Paz", "Santa María del Real", "Silca", "Yocón", "Patuca"],
  "Santa Bárbara": ["Santa Bárbara", "Arada", "Atima", "Azacualpa", "Ceguaca", "Concepción del Norte", "Concepción del Sur", "Chinda", "El Níspero", "Gualala", "Ilama", "Las Vegas", "Macuelizo", "Naranjito", "Nuevo Celilac", "Petoa", "Protección", "Quimistán", "San Francisco de Ojuera", "San José de Colinas", "San Luis", "San Marcos", "San Nicolás", "San Pedro Zacapa", "Santa Rita", "Trinidad", "San Vicente Centenario"],
  "Valle": ["Nacaome", "Alianza", "Amapala", "Aramecina", "Caridad", "Goascorán", "Langue", "San Francisco de Coray", "San Lorenzo"],
  "Yoro": ["Yoro", "Arenal", "El Negrito", "El Progreso", "Jocón", "Morazán", "Olanchito", "Santa Rita", "Sulaco", "Victoria", "Yorito"]
};

// State
let allData = [];
let doctors = [];
let appointments = [];
let expenses = [];
let settings = null;
let currentMonth = new Date();
let selectedDate = null;
let lastSavedAppointment = null;
let tempVacations = [];
let tempServices = [];
let editingDoctorId = null;
let currentTriageApt = null;
let currentDiagnosisApt = null;
let prescMeds = [];

const defaultConfig = {
  hospital_name: "Hospital Básico San Marcos de Ocotepeque",
  system_title: "Sistema de Citas Médicas",
  logo_url: "",
  primary_color: "#059669",
  secondary_color: "#1e293b",
  text_color: "#ffffff",
  accent_color: "#0ea5e9",
  surface_color: "#334155"
};

// Data Handler
const dataHandler = {
  onDataChanged(data) {
    allData = data;
    doctors = data.filter(d => d.type === 'doctor');
    appointments = data.filter(d => d.type === 'appointment');
    expenses = data.filter(d => d.type === 'expense');
    settings = data.find(d => d.type === 'settings');
    
    loadSettings();
    updateDoctorSelect();
    updateDoctorFilter();
    updateFilterDoctorSelect();
    renderCalendar();
    renderDoctorsList();
    renderAppointmentsList();
    renderReassignList();
    renderMoraAnalysis();
    updateAvailableSlots();
    renderTriagePending();
    renderTriagesCompleted();
    renderDiagnosisPending();
    renderFinanceSummary();
    renderPaymentsList();
    renderExpensesList();
  }
};

// Initialize
async function init() {
  populateDepartments();
  showSection('calendar');
  renderCalendar();
  
  // Set today's date in expense form
  const today = new Date().toISOString().split('T')[0];
  if (document.getElementById('expense-date')) {
    document.getElementById('expense-date').value = today;
  }

  if (window.dataSdk) {
    const result = await window.dataSdk.init(dataHandler);
    if (!result.isOk) {
      console.error('Failed to init data SDK');
    } else {
      // Check if we need to add sample doctors
      await addSampleDoctorsIfNeeded();
    }
  }

  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        document.getElementById('hospital-title').textContent = config.hospital_name || defaultConfig.hospital_name;
        document.getElementById('system-subtitle').textContent = config.system_title || defaultConfig.system_title;
        
        const logoImg = document.getElementById('hospital-logo');
        const defaultLogo = document.getElementById('default-logo');
        if (config.logo_url) {
          logoImg.src = config.logo_url;
          logoImg.classList.remove('hidden');
          defaultLogo.style.display = 'none';
        } else {
          logoImg.classList.add('hidden');
          defaultLogo.style.display = 'flex';
        }
      },
      mapToCapabilities: (config) => ({
        recolorables: [
          { get: () => config.primary_color || defaultConfig.primary_color, set: (v) => window.elementSdk.setConfig({ primary_color: v }) },
          { get: () => config.secondary_color || defaultConfig.secondary_color, set: (v) => window.elementSdk.setConfig({ secondary_color: v }) },
          { get: () => config.text_color || defaultConfig.text_color, set: (v) => window.elementSdk.setConfig({ text_color: v }) },
          { get: () => config.accent_color || defaultConfig.accent_color, set: (v) => window.elementSdk.setConfig({ accent_color: v }) },
          { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => window.elementSdk.setConfig({ surface_color: v }) }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      }),
      mapToEditPanelValues: (config) => new Map([
        ["hospital_name", config.hospital_name || defaultConfig.hospital_name],
        ["system_title", config.system_title || defaultConfig.system_title]
      ])
    });
  }
  // Render any custom data saved in localStorage
  if (typeof renderCustomDataList === 'function') renderCustomDataList();
  // Inicializar autenticación y usuarios
  await initAuth();
}

// ----------------- Authentication & User Management -----------------
const USERS_KEY = 'citas_publicas_users_v1';
let currentUser = null;
let initialSetup = false; // true cuando no hay usuarios y se debe crear el primero

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!list) return;
    if (filtered.length === 0) {
      list.innerHTML = '<p class="text-slate-400">No hay citas para mostrar.</p>';
      document.getElementById('appointments-count').textContent = '';
      return;
    }
    document.getElementById('appointments-count').textContent = `Mostrando ${filtered.length} cita(s)`;
    list.innerHTML = filtered.map(apt => {
      return `<div class="bg-slate-700 rounded p-2 flex items-center justify-between">
        <div>
          <div class="font-medium">${apt.patient_name}</div>
          <div class="text-xs text-slate-400">${apt.doctor_name} | ${apt.date} ${apt.time}</div>
          <span class="text-xs px-2 py-0.5 rounded ${apt.status === 'programada' ? 'bg-blue-600' : apt.status === 'completada' ? 'bg-green-600' : 'bg-red-600'}">${apt.status}</span>
          ${apt.expediente_barcode ? `<div class='text-xs text-amber-400 mt-1 font-mono'>Código: ${apt.expediente_barcode} <button onclick=\"imprimirExpedienteBarcode('${apt.expediente_barcode}','${apt.patient_name}')\" class='bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs ml-2'>Imprimir</button></div>` : ''}
        </div>
        <div class="flex gap-2">
          <button onclick="openAppointmentDetails('${apt.id || ''}')" class="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded">Ver</button>
          <button onclick="deleteAppointment('${apt.id || ''}')" class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Eliminar</button>
        </div>
      </div>`;
    }).join('');
    saveUsers(defaultUsers);
    console.log('Usuario admin creado: username="admin", password="admin123"');
    
    // Mostrar mensaje
    setTimeout(() => {
      alert('✅ Usuario admin creado automáticamente\n\nCredenciales:\nUsuario: admin\nContraseña: admin123\n\nPuede cambiarla en Configuración > CREAR PERFIL');
      openUserManagement();
      switchUserTab('existing');
    }, 500);
  }
  return;
}

async function initAuth() {
  await seedAdminIfNeeded();
  if (initialSetup) return; // esperar a que el primer usuario se cree desde la UI
  // show login modal if not authenticated
  // hide nav buttons until authentication
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.add('hidden'));
  const auth = sessionStorage.getItem('citas_current_user');
  if (auth) {
    try { currentUser = JSON.parse(auth); applyPermissions(); return; } catch (e) { /* ignore */ }
  }
  // show login
  document.getElementById('login-modal')?.classList.remove('hidden');
  document.getElementById('login-modal')?.classList.add('flex');
}

// Hash helpers using Web Crypto
// Hash helpers using bcrypt.js (in-browser)
async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    if (typeof bcrypt === 'undefined') return reject(new Error('bcrypt no disponible'));
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      resolve(hash);
    });
  });
}

async function loginUser() {
  const u = document.getElementById('login-username')?.value?.trim();
  const p = document.getElementById('login-password')?.value || '';
  const err = document.getElementById('login-error');
  err.classList.add('hidden'); err.textContent = '';
  const users = loadUsers();
  const user = users.find(x => x.username === u);
  if (!user) { err.textContent = 'Usuario o contraseña incorrectos'; err.classList.remove('hidden'); return; }

  // if stored password looks like a hex SHA-256 (64 chars) compare hashes
  const stored = user.password || '';
  if (stored && stored.length === 64 && /^[0-9a-fA-F]+$/.test(stored)) {
    try {
      const hp = await hashPassword(p);
      if (hp !== stored) { err.textContent = 'Usuario o contraseña incorrectos'; err.classList.remove('hidden'); return; }
    } catch (e) {
      err.textContent = 'Error de hashing'; err.classList.remove('hidden'); return;
    }
  } else {
    // legacy plain-text stored password — allow login and upgrade to hash
    if (p !== stored) { err.textContent = 'Usuario o contraseña incorrectos'; err.classList.remove('hidden'); return; }
    try { const newHash = await hashPassword(p); user.password = newHash; saveUsers(users); } catch (e) { /* ignore */ }
  }

  currentUser = user;
  sessionStorage.setItem('citas_current_user', JSON.stringify(user));
  closeModal('login-modal');
  applyPermissions();
}

function logoutUser() {
  currentUser = null; sessionStorage.removeItem('citas_current_user');
  // show login again
  document.getElementById('login-modal')?.classList.remove('hidden');
  document.getElementById('login-modal')?.classList.add('flex');
}

function applyPermissions() {
  // If admin or permission * then enable all
  const isAdmin = currentUser && (currentUser.role === 'admin' || (currentUser.permissions && currentUser.permissions.includes('*')));
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const section = btn.dataset.section;
    if (!section) return;
    if (isAdmin) { btn.classList.remove('hidden'); btn.disabled = false; return; }
    const perms = currentUser.permissions || [];
    if (perms.includes(section)) { btn.classList.remove('hidden'); btn.disabled = false; } else { btn.classList.add('hidden'); }
  });
  // Always ensure settings visible only if user has access
  const settingsBtn = Array.from(document.querySelectorAll('.nav-btn')).find(b => b.dataset.section === 'settings');
  if (settingsBtn && currentUser && (currentUser.role === 'admin' || (currentUser.permissions||[]).includes('settings'))) { settingsBtn.classList.remove('hidden'); }
  // Mostrar botón de logout cuando hay usuario
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    if (currentUser) { logoutBtn.classList.remove('hidden'); } else { logoutBtn.classList.add('hidden'); }
  }
  // Mostrar nombre del usuario en el header
  const userDisplay = document.getElementById('current-user-display');
  if (userDisplay) {
    if (currentUser) { userDisplay.textContent = `Usuario: ${currentUser.username} (${currentUser.role || 'user'})`; userDisplay.classList.remove('hidden'); }
    else { userDisplay.textContent = ''; userDisplay.classList.add('hidden'); }
  }
}

// User management UI
function openUserManagement() {
  try {
    const modal = document.getElementById('user-management-modal');
    if (modal) { 
      modal.classList.remove('hidden'); 
      modal.classList.add('flex');
    }
    renderUsersList();
    // Mostrar la primera pestaña por defecto
    switchUserTab('create');
  } catch (err) {
    console.error('Error al abrir gestión de usuarios:', err);
    alert('Error al abrir la gestión de usuarios. Ver consola para detalles.');
  }
}

function renderUsersList() {
  const list = document.getElementById('users-list');
  if (!list) {
    console.warn('Elemento users-list no encontrado');
    return;
  }
  
  try {
    const users = loadUsers();
    if (!users || users.length === 0) {
      list.innerHTML = '<p class="text-slate-400 text-center py-4">No hay usuarios creados aún. Crea uno en la pestaña "Crear Nuevo Perfil"</p>';
      return;
    }
    
    list.innerHTML = users.map(u => {
      const perms = u.role === 'admin' ? 'Administrador' : (u.permissions || []).join(', ');
      return `<div class="bg-slate-700 rounded p-2 flex items-center justify-between"><div><div class="font-medium">${u.username}</div><div class="text-xs text-slate-400">${perms}</div></div><div class="flex gap-2"><button onclick="editUser('${u.username}')" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Editar</button><button onclick="deleteUser('${u.username}')" class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Eliminar</button></div></div>`;
    }).join('');
  } catch (err) {
    console.error('Error al renderizar lista de usuarios:', err);
    list.innerHTML = '<p class="text-red-400">Error al cargar usuarios</p>';
  }
}

// Renderizar solicitudes pendientes y usuarios aprobados
function renderUserLists() {
  const pendingList = JSON.parse(localStorage.getItem('citas_pending_users_v1') || '[]');
  const users = JSON.parse(localStorage.getItem('citas_publicas_users_v1') || '[]');
  const pendingDiv = document.getElementById('pending-users-list');
  const approvedDiv = document.getElementById('approved-users-list');

  // Solicitudes pendientes
  pendingDiv.innerHTML = '<h3 class="font-semibold mb-2">Solicitudes Pendientes</h3>' +
    (pendingList.length === 0 ? '<p class="muted">No hay solicitudes pendientes.</p>' :
      pendingList.map((u, i) => `
        <div class="bg-slate-700 rounded-lg p-3 flex items-center justify-between">
          <span>${u.username}</span>
          <div class="flex gap-2">
            <button class="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded" onclick="approveUser(${i})">Aprobar</button>
            <button class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded" onclick="rejectUser(${i})">Rechazar</button>
          </div>
        </div>`).join(''));

  // Usuarios aprobados
  approvedDiv.innerHTML = '<h3 class="font-semibold mb-2">Usuarios Registrados</h3>' +
    (users.length === 0 ? '<p class="muted">No hay usuarios registrados.</p>' :
      users.map((u, i) => `
        <div class="bg-slate-700 rounded-lg p-3 flex items-center justify-between">
          <span>${u.username} <span class="muted">(${u.role || 'usuario'})</span></span>
          <button class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded" onclick="editUser(${i})">Editar</button>
        </div>`).join(''));
}

// Aprobar usuario
function approveUser(idx) {
  const pendingList = JSON.parse(localStorage.getItem('citas_pending_users_v1') || '[]');
  const users = JSON.parse(localStorage.getItem('citas_publicas_users_v1') || '[]');
  const user = pendingList[idx];
  user.role = 'usuario';
  user.permissions = [];
  users.push(user);
  pendingList.splice(idx, 1);
  localStorage.setItem('citas_publicas_users_v1', JSON.stringify(users));
  localStorage.setItem('citas_pending_users_v1', JSON.stringify(pendingList));
  renderUserLists();
}

// Rechazar usuario
function rejectUser(idx) {
  const pendingList = JSON.parse(localStorage.getItem('citas_pending_users_v1') || '[]');
  pendingList.splice(idx, 1);
  localStorage.setItem('citas_pending_users_v1', JSON.stringify(pendingList));
  renderUserLists();
}

// Mostrar formulario de edición de usuario
function editUser(idx) {
  const users = JSON.parse(localStorage.getItem('citas_publicas_users_v1') || '[]');
  const user = users[idx];
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.5)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.innerHTML = `
    <div style="background:#0b1220;padding:32px;border-radius:12px;max-width:350px;width:100%;color:#fff;">
      <h3 style="margin-bottom:16px">Editar usuario: ${user.username}</h3>
      <label style="display:block;margin-bottom:8px">Rol:
        <select id="edit-role" style="width:100%;margin-top:4px;padding:8px;border-radius:8px;background:#1e293b;color:#fff">
          <option value="usuario" ${user.role==='usuario'?'selected':''}>Usuario</option>
          <option value="admin" ${user.role==='admin'?'selected':''}>Administrador</option>
        </select>
      </label>
      <label style="display:block;margin-bottom:8px">Permisos:
        <input id="edit-permissions" type="text" style="width:100%;margin-top:4px;padding:8px;border-radius:8px;background:#1e293b;color:#fff" value="${(user.permissions||[]).join(',')}">
        <small style="color:#94a3b8">Separados por coma. Ej: citas,triage,finance</small>
      </label>
      <div style="display:flex;gap:8px;margin-top:16px">
        <button id="save-edit-user" style="flex:1;background:#059669;color:#fff;padding:8px;border-radius:8px;border:none">Guardar</button>
        <button id="cancel-edit-user" style="flex:1;background:#334155;color:#fff;padding:8px;border-radius:8px;border:none">Cancelar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('cancel-edit-user').onclick = ()=>{ document.body.removeChild(modal); };
  document.getElementById('save-edit-user').onclick = ()=>{
    user.role = document.getElementById('edit-role').value;
    user.permissions = document.getElementById('edit-permissions').value.split(',').map(x=>x.trim()).filter(x=>x);
    users[idx] = user;
    localStorage.setItem('citas_publicas_users_v1', JSON.stringify(users));
    document.body.removeChild(modal);
    renderUserLists();
  };
}

// Renderizar lista de preregistro
function renderPreregistroList() {
  const pendingList = JSON.parse(localStorage.getItem('citas_pending_users_v1') || '[]');
  const div = document.getElementById('preregistro-list');
  div.innerHTML = pendingList.length === 0 ? '<p class="muted">No hay usuarios preregistrados.</p>' :
    pendingList.map((u, i) => `
      <div class='bg-slate-700 rounded-lg p-3 flex items-center justify-between'>
        <span>${u.username}</span>
        <div class='flex gap-2'>
          <button class='bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded' onclick='autorizarPreregistro(${i})'>Autorizar</button>
          <button class='bg-red-600 hover:bg-red-700 px-3 py-1 rounded' onclick='rechazarPreregistro(${i})'>Rechazar</button>
        </div>
      </div>`).join('');
}
function autorizarPreregistro(idx) {
  const pendingList = JSON.parse(localStorage.getItem('citas_pending_users_v1') || '[]');
  const users = JSON.parse(localStorage.getItem('citas_publicas_users_v1') || '[]');
  const user = pendingList[idx];
  user.role = 'usuario';
  user.permissions = [];
  users.push(user);
  pendingList.splice(idx, 1);
  localStorage.setItem('citas_publicas_users_v1', JSON.stringify(users));
  localStorage.setItem('citas_pending_users_v1', JSON.stringify(pendingList));
  renderPreregistroList();
}
function rechazarPreregistro(idx) {
  const pendingList = JSON.parse(localStorage.getItem('citas_pending_users_v1') || '[]');
  pendingList.splice(idx, 1);
  localStorage.setItem('citas_pending_users_v1', JSON.stringify(pendingList));
  renderPreregistroList();
}
window.showSection = function(section) {
  document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById('section-' + section);
  if (el) {
    el.classList.remove('hidden');
    if (section === 'preregistro') renderPreregistroList();
    if (section === 'users') renderUserLists();
  }
}

// Show Section
function showSection(section) {
  document.querySelectorAll('.section-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(`section-${section}`).classList.remove('hidden');
  
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('bg-emerald-600');
    if (btn.dataset.section === section) {
      btn.classList.add('bg-emerald-600');
    }
  });
}

// Calendar Functions
function changeMonth(delta) {
  currentMonth.setMonth(currentMonth.getMonth() + delta);
  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  const monthLabel = document.getElementById('calendar-month');
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthLabel.textContent = `${months[month]} ${year}`;
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  grid.innerHTML = '';
  
  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    grid.innerHTML += '<div class="p-2"></div>';
  }
  
  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateObj = new Date(year, month, day);
    const dayOfWeek = dateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const dayAppointments = appointments.filter(a => a.date === dateStr && a.status !== 'cancelada');
    const isToday = new Date().toDateString() === dateObj.toDateString();
    
    const selectedDoctor = document.getElementById('doctor-filter')?.value;
    
    let availableSlots = 0;
    let totalSlots = 0;
    let isVacation = false;
    
    // Check vacations for selected doctor or all doctors
    if (selectedDoctor) {
      const doctor = doctors.find(d => d.__backendId === selectedDoctor);
      if (doctor) {
        totalSlots = doctor.doctor_max_appointments || 10;
        const doctorApts = dayAppointments.filter(a => a.doctor_id === selectedDoctor);
        availableSlots = totalSlots - doctorApts.length;
        
        // Check if this date is in vacation period
        const vacations = doctor.doctor_vacations ? JSON.parse(doctor.doctor_vacations) : [];
        isVacation = vacations.some(v => dateStr >= v.start && dateStr <= v.end);
      }
    } else {
      doctors.forEach(doc => {
        const docSlots = doc.doctor_max_appointments || 10;
        totalSlots += docSlots;
        const docApts = dayAppointments.filter(a => a.doctor_id === doc.__backendId);
        availableSlots += docSlots - docApts.length;
      });
    }
    
    const isFull = availableSlots <= 0;
    let bgColor = 'bg-slate-700 border-slate-600';
    let displayText = '';
    
    if (isWeekend) {
      bgColor = 'bg-slate-600/50 border-slate-500';
      displayText = '<div class="text-xs text-slate-400 mt-1">Cerrado</div>';
    } else if (isVacation) {
      bgColor = 'bg-amber-600/30 border-amber-500';
      displayText = '<div class="text-xs text-amber-300 mt-1">🏖️ Vacaciones</div>';
    } else if (isFull) {
      bgColor = 'bg-red-600/30 border-red-500';
      displayText = `<div class="text-xs text-red-300 mt-1">${availableSlots}/${totalSlots} cupos</div>`;
    } else if (dayAppointments.length > 0) {
      bgColor = 'bg-emerald-600/20 border-emerald-500';
      displayText = `<div class="text-xs text-emerald-300 mt-1">${availableSlots}/${totalSlots} cupos</div>`;
    } else {
      displayText = `<div class="text-xs text-emerald-300 mt-1">${availableSlots}/${totalSlots} cupos</div>`;
    }
    
    const todayRing = isToday ? 'ring-2 ring-amber-400' : '';
    const cursorClass = (isWeekend || isVacation) ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-slate-600';
    const clickAction = (isWeekend || isVacation) ? '' : `onclick="selectDateAndOpenModal('${dateStr}')"`;
    
    grid.innerHTML += `
      <div ${clickAction} class="p-2 ${bgColor} ${todayRing} border rounded-lg ${cursorClass} transition-all text-center min-h-[60px]">
        <span class="font-medium">${day}</span>
        ${displayText}
      </div>
    `;
  }
}

function selectDate(dateStr) {
  selectedDate = dateStr;
  const dayAppointments = appointments.filter(a => a.date === dateStr);
  
  const summary = document.getElementById('day-summary');
  if (dayAppointments.length === 0) {
    summary.innerHTML = '<p class="text-slate-400">No hay citas para este día</p>';
  } else {
    summary.innerHTML = dayAppointments.map((apt, idx) => `
      <div class="bg-slate-700 rounded p-2">
        <p class="font-medium text-sm">${apt.patient_name}</p>
        <p class="text-xs text-slate-400">Por Cita ${idx + 1} - ${apt.doctor_name}</p>
        <span class="text-xs px-2 py-0.5 rounded ${apt.status === 'programada' ? 'bg-blue-600' : apt.status === 'completada' ? 'bg-green-600' : 'bg-red-600'}">${apt.status}</span>
      </div>
    `).join('');
  }
}

// Select date and automatically open new appointment modal
function selectDateAndOpenModal(dateStr) {
  selectDate(dateStr);
  openNewAppointmentModal();
  // Pre-fill the date in the modal
  setTimeout(() => {
    document.getElementById('apt-date').value = dateStr;
  }, 100);
}

// Modal Functions
function openNewAppointmentModal() {
  document.getElementById('appointment-form').reset();
  document.getElementById('apt-department').value = 'Ocotepeque';
  updateMunicipalities();
  document.getElementById('apt-municipality').value = 'San Marcos';
  document.getElementById('appointment-modal').classList.remove('hidden');
  document.getElementById('appointment-modal').classList.add('flex');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
  document.getElementById(modalId).classList.remove('flex');
}

// Update Doctor Selects
function updateDoctorSelect() {
  const select = document.getElementById('apt-doctor');
  select.innerHTML = '<option value="">Seleccione doctor...</option>';
  doctors.forEach(doc => {
    const docApts = appointments.filter(a => a.doctor_id === doc.__backendId && a.status !== 'cancelada');
    const available = (doc.doctor_max_appointments || 10) - docApts.length;
    select.innerHTML += `<option value="${doc.__backendId}">${doc.doctor_name} - ${doc.specialty} (${available} cupos hoy)</option>`;
  });
  
  // Also update quick doctor select
  const quickSelect = document.getElementById('quick-doctor-select');
  if (quickSelect) {
    quickSelect.innerHTML = '<option value="">Seleccione doctor...</option>';
    doctors.forEach(doc => {
      const docApts = appointments.filter(a => a.doctor_id === doc.__backendId && a.status !== 'cancelada');
      const available = (doc.doctor_max_appointments || 10) - docApts.length;
      quickSelect.innerHTML += `<option value="${doc.__backendId}">${doc.doctor_name} - ${doc.specialty} (${available} cupos)</option>`;
    });
  }
}

// Funciones para generación de recetas médicas
function openPrescriptionModal() {
  const form = document.getElementById('prescription-form');
  if (form) form.reset();
  prescMeds = [];
  renderPrescriptionMedsList();
  const sel = document.getElementById('prescription-doctor');
  if (sel) {
    sel.innerHTML = '<option value="">Seleccione doctor...</option>';
    doctors.forEach(d => {
      sel.innerHTML += `<option value="${d.__backendId}">${d.doctor_name}</option>`;
    });
    // al cambiar selección, actualizar campo de nombre del médico
    sel.onchange = () => {
      const name = sel.selectedOptions?.[0]?.text || '';
      const nameInput = document.getElementById('presc-doctor-name');
      if (nameInput) nameInput.value = name;
    };
  }
  // poblar datalist de pacientes y de medicamentos
  populatePatientsDatalist();
  populateMedsDatalist();
  const modal = document.getElementById('prescription-modal');
  if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
}

function generatePrescription() {
  const patient = document.getElementById('presc-patient')?.value || '';
  const id = document.getElementById('presc-id')?.value || '';
  const doctorSelect = document.getElementById('prescription-doctor');
  const doctorName = document.getElementById('presc-doctor-name')?.value || doctorSelect?.selectedOptions?.[0]?.text || '';
  const notes = document.getElementById('presc-notes')?.value || '';
  const date = new Date().toLocaleDateString();

  const printable = document.getElementById('prescription-printable');
  if (!printable) return;

  // Construir bloque de medicamentos: preferir prescMeds si tiene elementos
  let medsHtml = '';
  if (prescMeds && prescMeds.length > 0) {
    medsHtml = '<ul>' + prescMeds.map(m => `<li><strong>${m.name}</strong> - ${m.dose || ''} - <em>${m.freq || ''}</em></li>`).join('') + '</ul>';
  } else {
    const freeText = document.getElementById('presc-meds')?.value || '';
    medsHtml = `<pre style="white-space:pre-wrap; font-family:inherit; background:transparent;">${freeText}</pre>`;
  }

  const content = `
    <div class="presc-card p-6 bg-white text-black rounded">
      <h2 style="font-weight:700; font-size:18px;">${document.getElementById('hospital-title')?.textContent || ''}</h2>
      <p style="color:#374151; margin-top:4px;">${document.getElementById('system-subtitle')?.textContent || ''}</p>
      <hr style="margin:8px 0; border-color:#e5e7eb;"/>
      <p><strong>Paciente:</strong> ${patient}${id ? ' | ID: ' + id : ''}</p>
      <p><strong>Médico:</strong> ${doctorName}</p>
      <p><strong>Fecha:</strong> ${date}</p>
      <h3 style="margin-top:12px; font-weight:600;">Receta:</h3>
      ${medsHtml}
      ${notes ? `<p style="margin-top:8px;"><strong>Notas:</strong> ${notes}</p>` : ''}
      <div style="margin-top:18px;">
        <p>__________________________</p>
        <p>Firma del médico</p>
      </div>
    </div>
  `;

  printable.innerHTML = content;
  const view = document.getElementById('prescription-view');
  const actions = document.getElementById('prescription-actions');
  if (view) view.classList.remove('hidden');
  if (actions) actions.classList.remove('hidden');
}

// Prescription helpers
function addMedicationToList() {
  const name = document.getElementById('presc-med-name')?.value?.trim();
  const dose = document.getElementById('presc-med-dose')?.value?.trim();
  const freq = document.getElementById('presc-med-frequency')?.value || '';
  if (!name) return alert('Ingrese el nombre del medicamento');
  prescMeds.push({ name, dose, freq });
  document.getElementById('presc-med-name').value = '';
  document.getElementById('presc-med-dose').value = '';
  document.getElementById('presc-med-frequency').value = '';
  renderPrescriptionMedsList();
}

function renderPrescriptionMedsList() {
  const container = document.getElementById('presc-meds-list');
  if (!container) return;
  if (!prescMeds || prescMeds.length === 0) { container.innerHTML = '<p class="text-slate-400">No hay medicamentos agregados.</p>'; return; }
  container.innerHTML = prescMeds.map((m, i) => `
    <div class="bg-slate-700 rounded p-2 flex items-center justify-between">
      <div><div class="font-medium">${m.name} ${m.dose ? '- ' + m.dose : ''}</div><div class="text-xs text-slate-400">${m.freq || ''}</div></div>
      <div><button onclick="(function(i){ prescMeds.splice(i,1); renderPrescriptionMedsList(); })( ${i} )" class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded">Eliminar</button></div>
    </div>
  `).join('');
}

function populatePatientsDatalist() {
  const dl = document.getElementById('patients-list');
  if (!dl) return;
  const names = new Set();
  appointments.forEach(a => { if (a.patient_name) names.add(a.patient_name); });
  dl.innerHTML = Array.from(names).map(n => `<option value="${n}"></option>`).join('');
}

function populateMedsDatalist() {
  const dl = document.getElementById('meds-list');
  if (!dl) return;
  // Lista simple predefinida - puede ampliarse
  const meds = ['Paracetamol','Ibuprofeno','Amoxicilina','Metformina','Omeprazol','Clorfenamina'];
  dl.innerHTML = meds.map(m => `<option value="${m}"></option>`).join('');
}

function printPrescription() {
  const printContents = document.getElementById('prescription-printable')?.innerHTML || '';
  const win = window.open('', '', 'width=800,height=600');
  if (!win) return;
  win.document.write(`
    <html>
      <head>
        <title>Receta Médica</title>
        <link rel="stylesheet" href="style.css">
        <style>body{background:#fff;color:#000;font-family:Poppins, sans-serif;padding:20px;} .presc-card{max-width:700px;margin:0 auto;}</style>
      </head>
      <body>${printContents}</body>
    </html>
  `);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); win.close(); }, 500);
}

// Receta Médica Modal
let recetaMed = [];
function openRecetaModal() {
  recetaMed = [];
  document.getElementById('med-list').innerHTML = '';
  document.getElementById('med-nombre').value = '';
  document.getElementById('med-dosis').value = '';
  document.getElementById('modal-receta').classList.remove('hidden');
}
document.getElementById('agregar-med').onclick = function() {
  const nombre = document.getElementById('med-nombre').value.trim();
  const dosis = document.getElementById('med-dosis').value.trim();
  if (!nombre || !dosis) return;
  recetaMed.push({nombre, dosis});
  renderMedList();
  document.getElementById('med-nombre').value = '';
  document.getElementById('med-dosis').value = '';
};
function renderMedList() {
  const list = recetaMed.map(med => `<div style='font-size:15px;margin-bottom:4px'><b>${med.nombre}</b> - ${med.dosis}</div>`).join('');
  document.getElementById('med-list').innerHTML = list;
}
document.getElementById('cerrar-modal-receta').onclick = function() {
  document.getElementById('modal-receta').classList.add('hidden');
};
document.getElementById('imprimir-receta').onclick = function() {
  let html = `<div style='font-family:monospace;width:220px;padding:8px'><h3 style='font-size:16px;margin:0 0 8px 0'>Receta Médica</h3>`;
  recetaMed.forEach(med => {
    html += `<div style='font-size:14px;margin-bottom:4px'><b>${med.nombre}</b> - ${med.dosis}</div>`;
  });
  html += `<div style='margin-top:10px;font-size:12px'>Fecha: ${new Date().toLocaleDateString()}</div></div>`;
  const win = window.open('', '', 'width=240,height=600');
  win.document.write(`<html><head><title>Receta</title></head><body onload='window.print();setTimeout(()=>window.close(),500);'>${html}</body></html>`);
  win.document.close();
};

// Agregar botón en el menú para acceder a la sección de usuarios solo si el usuario es admin
function renderUserMenuButton() {
  const user = JSON.parse(sessionStorage.getItem('citas_current_user') || '{}');
  if (user.role === 'admin') {
    const nav = document.querySelector('nav .max-w-7xl');
    if (!document.getElementById('user-menu-btn')) {
      const btn = document.createElement('button');
      btn.id = 'user-menu-btn';
      btn.className = 'nav-btn px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-slate-700 whitespace-nowrap';
      btn.textContent = '👤 Usuarios';
      btn.onclick = () => showSection('users');
      nav.appendChild(btn);
    }
  }
}

// Mostrar sección de usuarios
function showSection(section) {
  document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById('section-' + section);
  if (el) el.classList.remove('hidden');
}

// Llamar al renderizado del botón de usuarios al cargar
window.addEventListener('DOMContentLoaded', renderUserMenuButton);

// Exportar citas en Excel
window.exportAppointmentsExcel = function exportAppointmentsExcel() {
  // Exportar citas en CSV (compatible Access)
  window.exportAppointmentsCSV = function exportAppointmentsCSV() {
    if (!appointments || appointments.length === 0) {
      alert('No hay citas para exportar');
      return;
    }
    const columns = [
      'Paciente','Doctor','Fecha de la cita','Hora','Estado','Teléfono','Observaciones','Fecha/Hora asignación'
    ];
    const now = new Date();
    const nowStr = now.toLocaleString('es-HN', { hour12: false });
    const rows = appointments.map(apt => [
      apt.patient_name || '',
      apt.doctor_name || '',
      apt.date || '',
      apt.time || '',
      apt.status || '',
      apt.patient_phone || '',
      apt.notes || '',
      apt.created_at || nowStr
    ]);
    let csv = columns.join(',') + '\n';
    csv += rows.map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'citas_access.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  // Mostrar opciones de importación
  window.showImportOptions = function showImportOptions() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.innerHTML = `
      <div style="background:#0b1220;padding:32px;border-radius:12px;max-width:350px;width:100%;color:#fff;">
        <h3 style="margin-bottom:16px">Importar citas</h3>
        <button id="import-excel-btn" style="width:100%;margin-bottom:12px;background:#059669;color:#fff;padding:8px;border-radius:8px;border:none">Importar Excel</button>
        <button id="import-csv-btn" style="width:100%;background:#f59e42;color:#fff;padding:8px;border-radius:8px;border:none">Importar Access/CSV</button>
        <button id="cancel-import-btn" style="width:100%;margin-top:16px;background:#334155;color:#fff;padding:8px;border-radius:8px;border:none">Cancelar</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('import-excel-btn').onclick = function() {
      document.getElementById('import-excel').click();
      document.body.removeChild(modal);
    };
    document.getElementById('import-csv-btn').onclick = function() {
      document.getElementById('import-csv').click();
      document.body.removeChild(modal);
    };
    document.getElementById('cancel-import-btn').onclick = function() {
      document.body.removeChild(modal);
    };
  }
  // Importar citas desde CSV y mostrar en tabla
  document.getElementById('import-csv').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const text = evt.target.result;
      const lines = text.split(/\r?\n/).filter(l => l.trim());
      if (lines.length < 2) {
        alert('El archivo CSV no tiene datos válidos.');
        return;
      }
      const headers = lines[0].split(',').map(h => h.replace(/"/g,''));
      const rows = lines.slice(1).map(l => l.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(v => v.replace(/"/g,'')));
      // Mostrar tabla
      let html = '<table class="min-w-full bg-slate-800 rounded-lg overflow-hidden"><thead><tr>';
      html += headers.map(h => `<th class="px-2 py-1 border-b border-slate-700 text-left">${h}</th>`).join('');
      html += '</tr></thead><tbody>';
      html += rows.map(r => `<tr>${r.map(v => `<td class="px-2 py-1 border-b border-slate-700">${v}</td>`).join('')}</tr>`).join('');
      html += '</tbody></table>';
      document.getElementById('imported-csv-table').innerHTML = html;

      // Agregar al sistema de citas
      let added = 0;
      rows.forEach(r => {
        // Mapear columnas por nombre
        const apt = {
          patient_name: r[headers.indexOf('Paciente')] || '',
          doctor_name: r[headers.indexOf('Doctor')] || '',
          date: r[headers.indexOf('Fecha de la cita')] || '',
          time: r[headers.indexOf('Hora')] || '',
          status: r[headers.indexOf('Estado')] || '',
          patient_phone: r[headers.indexOf('Teléfono')] || '',
          notes: r[headers.indexOf('Observaciones')] || '',
          created_at: r[headers.indexOf('Fecha/Hora asignación')] || ''
        };
        if (apt.patient_name && apt.date) {
          apt.type = 'appointment';
          allData.push(apt);
          appointments.push(apt);
          added++;
        }
      });
      if (window.dataSdk) window.dataSdk.save(allData);
      renderAppointmentsList && renderAppointmentsList();
      showToast && showToast(`Se importaron ${added} citas desde CSV y se agregaron al sistema.`,'success');
    };
    reader.readAsText(file);
  });
  // Requiere SheetJS (xlsx)
  if (typeof XLSX === 'undefined') {
    alert('Para exportar necesitas incluir SheetJS (xlsx) en tu proyecto.');
    return;
  }
  // Definir columnas y mapear datos
  const columns = [
    { header: 'Paciente', key: 'patient_name' },
    { header: 'Doctor', key: 'doctor_name' },
    { header: 'Fecha de la cita', key: 'date' },
    { header: 'Hora', key: 'time' },
    { header: 'Estado', key: 'status' },
    { header: 'Teléfono', key: 'patient_phone' },
    { header: 'Observaciones', key: 'notes' },
    { header: 'Fecha/Hora asignación', key: 'created_at' }
  ];

  // Mapear datos asegurando estructura y fecha/hora de asignación
  const now = new Date();
  const nowStr = now.toLocaleString('es-HN', { hour12: false });
  const data = appointments.map(apt => {
    // Si no existe fecha/hora de asignación, usar la actual
    let created = apt.created_at;
    if (!created) {
      created = nowStr;
    }
    return {
      patient_name: apt.patient_name || '',
      doctor_name: apt.doctor_name || '',
      date: apt.date || '',
      time: apt.time || '',
      status: apt.status || '',
      patient_phone: apt.patient_phone || '',
      notes: apt.notes || '',
      created_at: created
    };
  });

  // Crear hoja con encabezados personalizados
  const ws = XLSX.utils.json_to_sheet(data, { header: columns.map(c => c.header) });
  // Ajustar encabezados manualmente
  XLSX.utils.sheet_add_aoa(ws, [columns.map(c => c.header)], { origin: 'A1' });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Citas');
  XLSX.writeFile(wb, 'citas_export.xls');
}

document.getElementById('import-excel').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (typeof XLSX === 'undefined') {
    alert('Para importar necesitas incluir SheetJS (xlsx) en tu proyecto.');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(evt) {
    const data = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const citas = XLSX.utils.sheet_to_json(sheet);
    // Validar y agregar citas
    citas.forEach(cita => {
      cita.type = 'appointment';
      allData.push(cita);
    });
    if (window.dataSdk) window.dataSdk.save(allData);
    else {
      appointments = allData.filter(d => d.type === 'appointment');
      renderAppointmentsList();
    }
    alert('Citas importadas correctamente.');
  };
  reader.readAsArrayBuffer(file);
});

// Initialize on load
init();

function setAdminUser(username) {
  const users = JSON.parse(localStorage.getItem('citas_publicas_users_v1') || '[]');
  const idx = users.findIndex(u => u.username === username);
  if (idx !== -1) {
    users[idx].role = 'admin';
    users[idx].permissions = ['*'];
    localStorage.setItem('citas_publicas_users_v1', JSON.stringify(users));
    alert('Usuario ' + username + ' ahora es administrador.');
    if (typeof renderUserLists === 'function') renderUserLists();
  } else {
    alert('No se encontró el usuario ' + username);
  }
}

// Autorizar automáticamente a Dany95 como administrador al cargar
window.addEventListener('DOMContentLoaded', function() {
  // --- USUARIOS AGREGADOS AUTOMÁTICAMENTE ---
  const usuarios = [
    { username: 'medico95', password: '2207', role: 'doctor', permissions: ['appointments','calendar','triage-pending','diagnosis-pending','reassign','mora','finance'] },
    { username: 'recepcion95', password: '2207', role: 'reception', permissions: ['appointments','calendar','reassign'] },
    { username: 'admision95', password: '2207', role: 'admission', permissions: ['appointments'] }
  ];
  let users = JSON.parse(localStorage.getItem('citas_publicas_users_v1') || '[]');
  usuarios.forEach(async u => {
    if (!users.find(x => x.username === u.username)) {
      if (typeof bcrypt !== 'undefined') {
        bcrypt.hash(u.password, 10, (err, hash) => {
          if (!err) {
            users.push({ username: u.username, password: hash, role: u.role, permissions: u.permissions });
            localStorage.setItem('citas_publicas_users_v1', JSON.stringify(users));
          }
        });
      } else {
        users.push(u);
        localStorage.setItem('citas_publicas_users_v1', JSON.stringify(users));
      }
    }
  });
  // Exportar la tabla importada desde CSV a PDF
    const btn = document.getElementById('export-imported-csv-pdf');
    if (btn) {
      btn.onclick = function() {
        const table = document.getElementById('imported-csv-table');
        if (!table || !table.innerHTML.trim()) {
          alert('No hay tabla importada para exportar.');
          return;
        }
        // Usar html2pdf.js
        if (typeof html2pdf === 'undefined') {
          alert('Para exportar PDF necesitas incluir html2pdf.js en tu proyecto.');
          return;
        }
        html2pdf().set({
          margin: 10,
          filename: 'tabla_importada.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        }).from(table).save();
      };
    }
  });
  setAdminUser && setAdminUser('Dany95');
});
