export const parseCSV = (text) => {
  const rows = text.split("\n").map(r => r.split(","));
  const headers = rows[0];

  return rows.slice(1).map(row => {
    let obj = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = row[i]?.trim();
    });
    return obj;
  });
};