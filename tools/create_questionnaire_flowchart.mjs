"use strict";

import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const outputDir = path.resolve("artifacts");
fs.mkdirSync(outputDir, { recursive: true });

const width = 1600;
const height = 2600;
const centerX = 800;

const esc = (text) => text
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const multiline = (lines, x, y, options = {}) => {
  const { size = 38, weight = 500, fill = "#172033", lineHeight = 1.25 } = options;
  const startY = y - ((lines.length - 1) * size * lineHeight) / 2;
  return `<text x="${x}" y="${startY}" text-anchor="middle" dominant-baseline="middle" font-family="Thonburi, 'Noto Sans Thai', Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : size * lineHeight}">${esc(line)}</tspan>`).join("")}</text>`;
};

const rounded = (x, y, w, h, lines, options = {}) => {
  const fill = options.fill || "#F7F9FC";
  const stroke = options.stroke || "#2D5B88";
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="${fill}" stroke="${stroke}" stroke-width="4"/>${multiline(lines, x + w / 2, y + h / 2 + 2, { size: options.size || 36, weight: options.weight || 500 })}</g>`;
};

const terminal = (x, y, w, h, label) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="#234D72"/>${multiline([label], x + w / 2, y + h / 2 + 1, { size: 38, weight: 700, fill: "#FFFFFF" })}</g>`;

const diamond = (cx, cy, w, h, lines) => {
  const points = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
  return `<g><polygon points="${points}" fill="#FFF7E8" stroke="#B46B22" stroke-width="4"/>${multiline(lines, cx, cy + 2, { size: 32, weight: 600 })}</g>`;
};

const arrow = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#44546A" stroke-width="5" marker-end="url(#arrow)"/>`;
const polyArrow = (points) => `<polyline points="${points}" fill="none" stroke="#44546A" stroke-width="5" stroke-linejoin="round" marker-end="url(#arrow)"/>`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L12,6 L0,12 z" fill="#44546A"/></marker>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="5" stdDeviation="8" flood-color="#172033" flood-opacity="0.10"/></filter>
  </defs>
  <rect width="1600" height="2600" fill="#FFFFFF"/>
  <text x="800" y="80" text-anchor="middle" dominant-baseline="middle" font-family="Thonburi, 'Noto Sans Thai', Arial, sans-serif" font-size="48" font-weight="700" fill="#111827">ผังงานลำดับการทำงานของระบบแบบสอบถาม</text>
  <g filter="url(#shadow)">
    ${terminal(600, 135, 400, 96, "เริ่มต้น")}
    ${rounded(350, 285, 900, 120, ["แสดงหน้าเริ่มต้นและรายละเอียดแบบสอบถาม"])}
    ${rounded(350, 465, 900, 150, ["กรอกข้อมูลผู้เล่น", "และให้ความยินยอมในการจัดเก็บข้อมูล"])}
    ${diamond(centerX, 770, 700, 210, ["ข้อมูลครบถ้วนและ", "ให้ความยินยอมแล้วหรือไม่"])}
    ${rounded(350, 955, 900, 125, ["สร้างรหัสประจำการตอบแบบสอบถาม", "(submissionId)"], { fill: "#EEF6FF" })}
    ${rounded(350, 1140, 900, 125, ["แสดงคำถามและบันทึกคำตอบข้อที่ 1–7"])}
    ${diamond(centerX, 1430, 650, 190, ["ตอบคำถามครบ", "ทั้ง 7 ข้อหรือไม่"])}
    ${rounded(350, 1600, 900, 125, ["รวมคะแนนอารมณ์และเลือกผลลัพธ์"])}
    ${rounded(350, 1785, 900, 135, ["แสดงดอกไม้ ข้อความ", "และผลลัพธ์ของผู้เล่น"], { fill: "#F5F0FF", stroke: "#7057A3" })}
    ${rounded(350, 1980, 900, 125, ["บันทึกข้อมูลลงฐานข้อมูล Supabase"], { fill: "#ECF8F1", stroke: "#2C7A52" })}
    ${rounded(350, 2165, 900, 140, ["ส่งต่อข้อมูลสำหรับแสดงผลในหน้า Admin", "และเชื่อมต่อกับ TouchDesigner"], { fill: "#ECF8F1", stroke: "#2C7A52" })}
    ${terminal(600, 2360, 400, 96, "สิ้นสุด")}
  </g>

  ${arrow(800, 231, 800, 285)}
  ${arrow(800, 405, 800, 465)}
  ${arrow(800, 615, 800, 665)}
  ${arrow(800, 875, 800, 955)}
  ${arrow(800, 1080, 800, 1140)}
  ${arrow(800, 1265, 800, 1335)}
  ${arrow(800, 1525, 800, 1600)}
  ${arrow(800, 1725, 800, 1785)}
  ${arrow(800, 1920, 800, 1980)}
  ${arrow(800, 2105, 800, 2165)}
  ${arrow(800, 2305, 800, 2360)}

  ${multiline(["ใช่"], 855, 915, { size: 28, weight: 600, fill: "#2C7A52" })}
  ${multiline(["ไม่ใช่"], 420, 750, { size: 28, weight: 600, fill: "#B42318" })}
  ${polyArrow("450,770 220,770 220,540 350,540")}

  ${multiline(["ใช่"], 855, 1560, { size: 28, weight: 600, fill: "#2C7A52" })}
  ${multiline(["ไม่ใช่"], 410, 1410, { size: 28, weight: 600, fill: "#B42318" })}
  ${polyArrow("475,1430 250,1430 250,1203 350,1203")}
  <text x="800" y="2540" text-anchor="middle" dominant-baseline="middle" font-family="Thonburi, 'Noto Sans Thai', Arial, sans-serif" font-size="34" font-weight="500" fill="#111827">ภาพที่ 3.X ผังงานลำดับการทำงานของระบบแบบสอบถาม</text>
</svg>`;

const svgPath = path.join(outputDir, "questionnaire-system-flowchart.svg");
const pngPath = path.join(outputDir, "questionnaire-system-flowchart.png");
fs.writeFileSync(svgPath, svg, "utf8");

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(pngPath);

console.log(JSON.stringify({ svgPath, pngPath }));
