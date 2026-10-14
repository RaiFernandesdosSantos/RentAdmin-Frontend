/** Exportação de CSV para download (abre corretamente no Excel PT-BR). */

export function downloadCsv(
  filename: string,
  rows: (string | number)[][],
): void {
  const csv = rows
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";"),
    )
    .join("\n")

  // BOM para o Excel reconhecer acentuação
  const blob = new Blob(["\ufeff" + csv], {
    type: "text/csv;charset=utf-8",
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
