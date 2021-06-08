module.exports = i => {
  if (i === undefined || i === null) { console.warn('isEvn: numeric argument is missing'); return false; }
  if (isNaN(i)) { console.warn('isEvn: argument provided is not a number'); return false; }
  return (i % 2) ? false : true;
};
