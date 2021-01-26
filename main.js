const {app, BrowserWindow, Menu} = require ('electron')

process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin'


let mainWindow

function createMainWindow () {
     mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        width: 700,
        height:600,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: isDev
    })

    mainWindow.loadFile('./app/index.html')
}

app.on('ready', ()=> {
  createMainWindow()

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
  mainWindow.on('closed', () => mainWindow = null)
})

const menu = [
  // on mack custom menu not shown
  ...(isMac ? [{role:'appMenu'}]: []),
  {
    label:'File',
    submenu: [
      {
        label:'quit',
        click: () => app.quit()
      }
    ]
  }
]

//with this you only kill the proces with comand + q
app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })
//avoid open new window if there is already one opened
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
  })