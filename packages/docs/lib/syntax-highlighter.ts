import hljs from "highlight.js"

export function highlightCode(code: string, language = "bash"): string {
  try {
    // Try to highlight with the specified language
    if (hljs.getLanguage(language)) {
      const highlighted = hljs.highlight(code, { language, ignoreIllegals: true })
      return highlighted.value
    }

    // Fallback to auto-detection
    const highlighted = hljs.highlightAuto(code)
    return highlighted.value
  } catch (error) {
    // If highlighting fails, return escaped code
    return escapeHtml(code)
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
