// Modules
const {app, BrowserWindow, ipcMain, TouchBar} = require('electron')
const windowStateKeeper = require('electron-window-state')
const readItem = require('./readItem');
// const updater = require('./updater');
const user = require('./testStuff');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Touch bar label
const tbLabel = new TouchBar.TouchBarLabel({
  label: 'My Label'
})

// Mac Touchbar
const touchBar = new TouchBar({
  items: [
    tbLabel
  ]
})

// Listen for new item request
ipcMain.on('new-item', (e, itemUrl) => {

  // Get new item and send back to renderer

  readItem( itemUrl, item => {
    e.sender.send('new-item-success', item)
  })

  // setTimeout(() => {
  //   e.sender.send('new-item-success', 'setTimeout New item from main process')
  // }, 2000)
})


// Create a new BrowserWindow when `app` is ready
function createWindow () {


  // Check for app updates
  // setTimeout( updater, 3000);

  // Win state keeper
  let state = windowStateKeeper({
    defaultWidth: 500, defaultHeight: 650
  })

  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.width, height: state.height,
    // minWidth: 350, maxWidth: 650, minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  mainWindow.loadFile('renderer/main.html');


  state.manage(mainWindow)

  // mainWindow.webContents.openDevTools()



  // Listen for window being closed
  // mainWindow.on('closed',  () => {
  //   mainWindow = null
  // })

}



// Electron `app` is ready
app.on('ready', () => {

  console.log("App is NOT ready... JUST KIDDING!")
  createWindow();
  
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})







// ses.on('will-download', (e, downloadItem, webContents) => {

//   let fileName = downloadItem.getFilename()
//   let fileSize = downloadItem.getTotalBytes()

//   // Save to desktop
//   downloadItem.setSavePath(app.getPath('desktop') + `/${fileName}`)

//   downloadItem.on('updated', (e, state) => {
//     let received = downloadItem.getReceivedBytes()

//     if (state === 'progressing' && received) {
//       let progress = Math.round((received/fileSize)*100)
//       console.log(progress);
//       webContents.executeJavaScript(`window.progress.value = ${progress}`)
//     }
//   })
// })

//mainWindow.loadURL('https://github.com');

// let cookie = { url: 'https://myappdomain.com', name:'cookie1', value:'electron', expirationDate:1642618875};

// ses.cookies.remove('https://myappdomain.com', 'cookie1', err => {
//   getCookies();
// })

// ses.cookies.set(cookie)
//   .then(() => {
//     console.log("set the coookie!")
//     getCookies();
//   }, (error) => {
//     console.error(error)
//   });


// mainWindow.webContents.on('did-finish-load', e => {
//   console.log("hellooooo");
//   getCookies();
// });

// Open DevTools - Remove for PRODUCTION!

//  let wc = mainWindow.webContents

// wc.on('context-menu', (e, params) => {
//   console.log("hello from context-menu");
//   let selectedText = params.selectionText;
//   wc.executeJavaScript(`alert("${selectedText}")`)
// });




// dialog.showSaveDialog({}, filename => {
//   console.log(filename)
// })

// dialog.showSaveDialog().then(result => {
//   console.log("well in the showSaveDialog");
//   console.log(result);
// });

// console.log("finished loading I think");

// dialog.showOpenDialog(mainWindow, {
//   buttonLabel: 'Select a photo',
//   defaultPath: app.getPath('home'),
//   properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
// }).then(result => {
//   console.log(result);
// }).catch(err => {
//   console.log(err)
// });


// dialog.showOpenDialog(mainWindow, {
//   buttonLabel: 'Select a photo',
//   defaultPath: app.getPath('home')
// }, filepaths => {
//   console.log(filepaths)

// })

// mainWindow.webContents.on('did-finish-load', () => {


//   const answers = ['yes', 'no', 'maybe']

//   dialog.showMessageBox({
//     title: 'Message Box',
//     message: 'Please select an option',
//     detail: 'Message details',
//     buttons: answers
//   }).then(response => {
//     console.log(`User selected: ${answers[response.response]}`)
//   })

// })

// globalShortcut.register('CommandOrControl+G', () => {
//   console.log("user pressed G");

// })

//let mainMenu = Menu.buildFromTemplate(mainMenuItems)

//mainMenu.append(menuItem1)
//  Menu.setApplicationMenu(mainMenu)


// let contextMenu = Menu.buildFromTemplate([
//   { label: 'Item 1' },
//   { role: 'editMenu' }
// ])

//let defaultSes = session.defaultSession;  // this is usually recommended (combines with line 2)
// mainWindow.webContents.on('context-menu', e => {
//   contextMenu.popup()
  
// })






// ipcMain.on( 'sync-message', (e, args) => {
//   console.log(args)

//   setTimeout( () => {
//     e.returnValue = 'A sync response from the main process'
//   }, 4000);

// })

// mainWindow.webContents.on( 'did-finish-load', e => {

//   mainWindow.webContents.send( 'mailbox', {
//     from: 'Ray',
//     email: 'ray@stackacademy.tv',
//     priority: 1
//   });
// })


// ipcMain.on( 'channel1', (e, args) => {
//   console.log(args)
//   console.log(e);
//   e.sender.send( 'channel1-response', 'Message received on "channel1". Thank you!')
// } );
