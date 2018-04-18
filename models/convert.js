/*
 * Converts Invader models to OBJ files using OpenScad + Blender.
 * 
 * OpenScad: http://www.openscad.org/downloads.html
 * Blender: https://www.blender.org/download/
 * 
 * Licence: MIT. Copyright (C) 2018, Uri Shaked.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function promiseFromChildProcess(child) {
  return new Promise((resolve, reject) => {
    child.stderr.pipe(process.stderr);
    child.addListener('error', reject);
    child.addListener('exit', resolve);
  });
}

async function main() {
  const scadFile = path.resolve(__dirname, 'invaders.scad');
  for (let i = 1; i <= 4; i++) {
    const stlFile = path.resolve(__dirname, `invader-${i}.stl`);
    const outputFile = path.resolve(__dirname, `../src/assets/invader-${i}.obj`);

    console.log(`Creating ${outputFile}...`);

    if (fs.existsSync(stlFile)) {
      fs.unlinkSync(stlFile);
    }
    await promiseFromChildProcess(
      spawn('openscad.exe', ['-o', stlFile, '-D', `invader=${i}`, scadFile]),
    );
    const proc = spawn('blender.exe', [
      '--background',
      '--python',
      path.resolve(__dirname, 'stl_to_obj.py'),
      '--',
      stlFile,
      outputFile,
    ]);
    await promiseFromChildProcess(proc);
  }
}

main().catch(console.err);
