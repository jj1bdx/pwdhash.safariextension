// Thanks, http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
  var curleft = curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curleft,curtop];
  }
}


function passwordStrength(password) {
  var securityRating = 1;
  // Over 6 characters?
  if (password.length > 6)
    securityRating += 1;
  // Over 10 characters?
  if (password.length > 10)
    securityRating += 1;
  // Mixed case?
  if (password.toLowerCase() != password)
    securityRating += 1;
  // Numeric characters?
  for (var passwordCharIdx in password) {
    if (parseFloat(password[passwordCharIdx]) != NaN) {
      securityRating += 1;
      break;
    }
  }
  return {
    score: securityRating,
      max: 5
  };
}

function gradientStringForHash(passwordHash) {
  var gradientString = "-moz-linear-gradient(left";

  for (var hashBandX = 0; hashBandX < passwordHash.length/6-1; hashBandX++)
    gradientString += ", #" + passwordHash.substr(hashBandX*6,6).toUpperCase();

  gradientString += ')';

  return gradientString;
}

function randomizeHash(passwordHash) {
  // Add a little bit of randomness to each byte
  for (var byteIdx = 0; byteIdx < passwordHash.length/2; byteIdx++) {
    var byte = parseInt(passwordHash.substr(byteIdx*2,2),16);
    // +/- 3, within 0-255
    byte = Math.min(Math.max(byte + parseInt(Math.random()*6)-3,0),255);
    var hexStr = byte.toString(16).length == 2 ? byte.toString(16) : '0' + byte.toString(16);
    passwordHash = passwordHash.substr(0,byteIdx*2) + hexStr + passwordHash.substr(byteIdx*2+2);
  }
  return passwordHash;
}

function getDataURLForHash(passwordHash,inputWidth,inputHeight) {
  var win = window;
  try {
    win = unsafeWindow;
  }
  catch(e) {}
  var canvas = win.document.createElement('canvas');
  canvas.height = inputHeight;
  canvas.width = inputWidth;
  var context = canvas.getContext('2d');

  passwordHash = randomizeHash(passwordHash);

  for (var hashBandX = 0; hashBandX < 4; hashBandX++) {
    context.fillStyle='#' + passwordHash.substr(hashBandX*6,6);
    context.fillRect(hashBandX/4*inputWidth,0,inputWidth/4,inputHeight);

    context.fillStyle='#000000';
    context.fillRect(((hashBandX+1)/4*inputWidth)-1,0,2,inputHeight);
  }

  context.strokeStyle='#000000';
  context.strokeRect(0,0,inputWidth,inputHeight);

  return canvas.toDataURL();
}
