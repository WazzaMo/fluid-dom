/*
 * Steps to take after the distribution files
 * are produced.
 */


const process = require('process')
const fs = require('fs')
const path = require('path')


function copyBrowserFileToLiveDocDir() {
  let fileToCopy = process.env.npm_package_browser
  let destinationPath = process.env.npm_package_directories_live
  let filename = path.basename(fileToCopy)
  let destination = path.join(destinationPath, filename)

  fs.copyFileSync(fileToCopy, destination)
}

copyBrowserFileToLiveDocDir()
