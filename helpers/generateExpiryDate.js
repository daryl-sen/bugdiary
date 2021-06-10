const generateExpiryDate = () => {
  const expiryDate = new Date();
  // 90 days later
  expiryDate.setTime(expiryDate.getTime() + 90 * 24 * 60 * 60 * 1000);
  return expiryDate;
};

module.exports = { generateExpiryDate };
