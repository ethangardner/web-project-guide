const fs = require('fs');
const path = require('path');

const files = [
  {
    src: path.join(
      __dirname,
      '..',
      '..',
      '_headers.txt'
    ),
    dest: path.join(
      __dirname,
      '..',
      '..',
      '_site',
      '_headers'
    ),
  },
];

files.forEach((file) => {
  let src = file.src;
  let dest = file.dest;
  if (fs.existsSync(src)) {
    fs.copyFile(src, dest, function (err) {
      if (err) throw err;
      console.log(src, 'was copied to', dest);
    });
  }
});
