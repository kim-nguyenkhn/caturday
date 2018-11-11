// lib/utils.js

const generateRandomColor = index => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateFromSetOfColors = () => {
  let colors = [
    "#ED553B",
    "#61E0A3",
    "#F6BB3C",
    "#AC64D1",
    "#53C3E9",
    "#CA2779"
  ];
  if (index) {
    return colors[index];
  } else {
    return colors[Math.floor(Math.random() * colors.length)];
  }
};

const generateMagenta = () => {
  return "#CA2779";
};

// Note that this is a NodeJS context, NOT ES6
module.exports = {
  generateRandomColor,
  generateFromSetOfColors,
  generateMagenta
};
