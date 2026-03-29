const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'POS Billing System',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Security best practice
      contextIsolation: true,  // Security best practice
      webSecurity: false      // Allow loading local resources like C:\ images
    }
  });

  // Remove menu bar for POS feel
  mainWindow.setMenuBarVisibility(false);

  if (isDev) {
    // In development mode, load the React development server
    mainWindow.loadURL('http://localhost:3000');
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    // In production mode, load the bundled React app
    mainWindow.loadFile(path.join(__dirname, 'frontend/build/index.html'));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  // If not in dev environment, start the local backend server
  if (!isDev) {
    try {
      require('./backend/server.js');
      console.log('Local backend server started from Electron.');
    } catch (err) {
      console.error('Failed to start local backend server:', err);
    }
  }

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for desktop features
ipcMain.handle('app-version', () => app.getVersion());

ipcMain.handle('backup-database', async () => {
  const dbPath = path.join(__dirname, 'backend', 'database', 'pos_billing.db');
  
  const { canceled, filePath } = await dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
    title: 'Backup Database',
    defaultPath: path.join(app.getPath('documents'), `pos_backup_${new Date().toISOString().slice(0,10)}.db`),
    filters: [{ name: 'SQLite Database', extensions: ['db'] }]
  });

  if (canceled || !filePath) return { success: false, message: 'Backup canceled' };

  try {
    fs.copyFileSync(dbPath, filePath);
    return { success: true, message: 'Database backed up successfully' };
  } catch (err) {
    return { success: false, message: 'Error backing up: ' + err.message };
  }
});

ipcMain.handle('restore-database', async () => {
  const dbPath = path.join(__dirname, 'backend', 'database', 'pos_billing.db');
  
  const { canceled, filePaths } = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
    title: 'Restore Database',
    properties: ['openFile'],
    filters: [{ name: 'SQLite Database', extensions: ['db'] }]
  });

  if (canceled || filePaths.length === 0) return { success: false, message: 'Restore canceled' };

  try {
    const response = dialog.showMessageBoxSync(BrowserWindow.getFocusedWindow(), {
      type: 'warning',
      buttons: ['Cancel', 'Restore'],
      title: 'Confirm Restore',
      message: 'Are you sure you want to restore the database? This will overwrite your current local data and cannot be undone.'
    });

    if (response === 1) { // 1 corresponds to 'Restore' button
      fs.copyFileSync(filePaths[0], dbPath);
      // Let the frontend know to reload or show success message
      return { success: true, message: 'Database restored successfully! Please restart the application for changes to take effect.' };
    } else {
      return { success: false, message: 'Restore aborted' };
    }
  } catch (err) {
    return { success: false, message: 'Error restoring: ' + err.message };
  }
});
