import fs from "fs/promises";
import path from "path";

// Path
export async function getDbFilePath(dataType) {
  const dataDirectory = path.join(process.cwd(), "data");
  await fs.mkdir(dataDirectory, { recursive: true });

  // نام پوشه برای نوع داده (مثلا 'users', 'purchases')
  const dataSubdirectory = path.join(dataDirectory, dataType);
  await fs.mkdir(dataSubdirectory, { recursive: true });

  return path.join(dataSubdirectory, "db.json");
}

// Get Form Db.json
export async function readData(dataType) {
  const filePath = await getDbFilePath(dataType);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    if (!data) return [];
    const jsonData = JSON.parse(data);
    return Array.isArray(jsonData) ? jsonData : [];
  } catch (error) {
    console.error(`Error reading ${dataType} file:`, error);
    return [];
  }
}

// Add To Db.json
export async function writeData(dataType, data) {
  const filePath = await getDbFilePath(dataType);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing ${dataType} file:`, error);
    throw error;
  }
}
