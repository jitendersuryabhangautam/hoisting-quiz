function startsWithComment(trimmed) {
  return (
    trimmed.startsWith("//") ||
    trimmed.startsWith("--") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("/*") ||
    trimmed.startsWith("*") ||
    trimmed.startsWith("*/")
  );
}

function splitInlineComment(line) {
  const markers = [" //", " --", " #"];
  let index = -1;

  for (const marker of markers) {
    const nextIndex = line.indexOf(marker);
    if (nextIndex !== -1 && (index === -1 || nextIndex < index)) {
      index = nextIndex + 1;
    }
  }

  if (index === -1) return { code: line, comment: "" };
  return {
    code: line.slice(0, index),
    comment: line.slice(index),
  };
}

export default function CodeBlockContent({ code }) {
  const normalized = String(code ?? "").replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");

  return (
    <>
      {lines.map((line, index) => {
        const trimmed = line.trimStart();
        const isCommentLine = startsWithComment(trimmed);
        const { code: codePart, comment } = isCommentLine
          ? { code: "", comment: line }
          : splitInlineComment(line);
        const hasNewline = index < lines.length - 1;

        return (
          <span key={`code-line-${index}`}>
            {codePart ? <span>{codePart}</span> : null}
            {comment ? (
              <span className="text-emerald-300">{comment}</span>
            ) : null}
            {hasNewline ? "\n" : ""}
          </span>
        );
      })}
    </>
  );
}

