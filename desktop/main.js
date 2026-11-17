// Vỏ ứng dụng Windows cho Phần mềm tạo mã quét QR chuyên nghiệp: mở index.html trong một cửa sổ riêng, không cần trình duyệt, không cần mạng.
const { app, BrowserWindow, Menu, shell, session, protocol, net } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const ROOT = path.join(__dirname, '..');
const HOME = 'app://qrstudio/index.html';
// Chỉ những file này được phép nạp vào cửa sổ ứng dụng.
const ALLOWED = new Set(['index.html', 'icons/icon-512.png']);

// Địa chỉ app:// cố định giúp dữ liệu đã lưu (mã gần đây, kiểu dáng) không bị mất giữa các lần mở.
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }
]);

// Thư mục lưu dữ liệu dùng tên không dấu để tránh lỗi đường dẫn trên một số máy.
app.setPath('userData', path.join(app.getPath('appData'), 'TaoMaQR'));

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 420,
    minHeight: 560,
    title: 'Phần mềm tạo mã quét QR chuyên nghiệp',
    backgroundColor: '#d91a29',
    autoHideMenuBar: true,
    show: false,
    icon: path.join(ROOT, 'icons', 'icon-512.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false }
  });
  win.once('ready-to-show', () => win.show());
  win.on('closed', () => { win = null; });
  win.loadURL(HOME);

  // Liên kết ra ngoài mở bằng trình duyệt mặc định; cửa sổ ứng dụng không rời khỏi phần mềm.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (event, url) => {
    if (url.split('#')[0] === HOME) return;
    event.preventDefault();
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
  });
}

function buildMenu() {
  return Menu.buildFromTemplate([
    { label: 'Tệp', submenu: [{ role: 'quit', label: 'Thoát' }] },
    { label: 'Sửa', submenu: [
      { role: 'undo', label: 'Hoàn tác' }, { role: 'redo', label: 'Làm lại' }, { type: 'separator' },
      { role: 'cut', label: 'Cắt' }, { role: 'copy', label: 'Sao chép' }, { role: 'paste', label: 'Dán' }, { role: 'selectAll', label: 'Chọn tất cả' }
    ] },
    { label: 'Xem', submenu: [
      { role: 'reload', label: 'Tải lại' }, { type: 'separator' },
      { role: 'zoomIn', label: 'Phóng to' }, { role: 'zoomOut', label: 'Thu nhỏ' }, { role: 'resetZoom', label: 'Cỡ gốc' }, { type: 'separator' },
      { role: 'togglefullscreen', label: 'Toàn màn hình' }
    ] }
  ]);
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  app.whenReady().then(() => {
    protocol.handle('app', (request) => {
      const u = new URL(request.url);
      const rel = decodeURIComponent(u.pathname).replace(/^\/+/, '') || 'index.html';
      if (u.host !== 'qrstudio' || !ALLOWED.has(rel)) return new Response('Not found', { status: 404 });
      return net.fetch(pathToFileURL(path.join(ROOT, rel)).toString());
    });
    // Ứng dụng chỉ cần ba quyền: ghi ảnh vào bộ nhớ tạm (nút "Sao chép"), toàn màn hình, và camera để quét mã QR
    // (chỉ hình, không thu tiếng). Mọi quyền khác đều từ chối.
    const ALLOWED_PERMISSIONS = new Set(['clipboard-sanitized-write', 'fullscreen']);
    const cameraOnly = (details) => {
      const types = (details && details.mediaTypes) || (details && details.mediaType ? [details.mediaType] : []);
      return types.length > 0 && types.every((t) => t === 'video');
    };
    session.defaultSession.setPermissionRequestHandler((wc, permission, callback, details) => {
      callback(ALLOWED_PERMISSIONS.has(permission) || (permission === 'media' && cameraOnly(details)));
    });
    session.defaultSession.setPermissionCheckHandler((wc, permission, origin, details) => {
      return ALLOWED_PERMISSIONS.has(permission) || (permission === 'media' && cameraOnly(details));
    });
    Menu.setApplicationMenu(buildMenu());
    createWindow();
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
  });

  app.on('window-all-closed', () => app.quit());
}
