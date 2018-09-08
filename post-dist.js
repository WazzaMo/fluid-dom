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

function prefixVersion(content) {
  let version = process.env.npm_package_version
  return `//  Fluid-DOM v ${version}
${content}
`
}

function asyncRead(fname) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(fname, (err, data) => {
        if (err) { reject(err) } else { resolve(data.toString()) }
      })
    } catch(e) {
      resolve(e)
    }
  })
}

function asyncWrite(fname, data) {
  return new Promise( (resolve, reject) => {
    fs.writeFile(fname, data, (err) => reject(err))
    resolve()
  })
}

function addVersionComment(fname) {
  asyncRead(fname)
  .then( x=> prefixVersion(x) )
  .then( last => 
    asyncWrite(fname, last)
  )
  .catch( error => console.error( error ))
}

function findFluidAndAddVersionComment() {
  fs.readdir('.', (err, files)=> {
    if (err) {
      console.warn(`Could not access file listing: ${err}`)
    } else {
      for(var a_file of files.filter(x => x.indexOf('fluid') != -1)) {
        addVersionComment(a_file)
        console.log(`--> ${a_file}`)
      }
    }
  })
}

findFluidAndAddVersionComment()
copyBrowserFileToLiveDocDir()
