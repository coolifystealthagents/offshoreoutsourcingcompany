export type ResearchSectionKind = 'question' | 'method' | 'analysis' | 'finding' | 'limitations' | 'sources' | 'paragraph';

export type ResearchSection = {
  kind: ResearchSectionKind;
  heading?: string;
  text: string;
};

export type ParsedResearchBody = {
  sections: ResearchSection[];
  sources: string[];
};

const urlPattern = /https?:\/\/[^\s),]+/g;
const explicitSourceList = /(^|[.!?]\s+)(Sources?|References):\s*(?=https?:\/\/)/gi;

const sectionLabels: Array<{
  pattern: RegExp;
  kind: ResearchSectionKind;
  heading: string;
}> = [
  { pattern: /^Research question(?: and scope)?$/i, kind: 'question', heading: 'Question and scope' },
  { pattern: /^Method(?:ology)?(?: and (?:evidence scope|sources))?$/i, kind: 'method', heading: 'How the study was structured' },
  { pattern: /^Measures and analysis$/i, kind: 'analysis', heading: 'Measures and analysis' },
  { pattern: /^Key finding$/i, kind: 'finding', heading: 'What the evidence shows' },
  { pattern: /^FAQ$/i, kind: 'finding', heading: 'Questions this report addresses' },
  { pattern: /^(?:Limitations?|Inference limits|Inference boundaries)$/i, kind: 'limitations', heading: 'What this evidence cannot establish' },
  { pattern: /^Operational use$/i, kind: 'analysis', heading: 'How to use the result' },
  { pattern: /^Reputable sources?$/i, kind: 'sources', heading: 'Evidence sources and relevance' },
];

const cleanUrl = (value: string) => value.replace(/[.;]+$/, '');

export function parseResearchBody(body: readonly string[]): ParsedResearchBody {
  const paragraphs = body
    .flatMap((entry) => entry.split(/\n{2,}/))
    .map((entry) => entry.trim())
    .filter(Boolean);
  const sources: string[] = [];
  const sections: ResearchSection[] = [];

  for (const paragraph of paragraphs) {
    let marker: RegExpExecArray | null = null;
    explicitSourceList.lastIndex = 0;
    for (let match = explicitSourceList.exec(paragraph); match; match = explicitSourceList.exec(paragraph)) marker = match;

    const markerStart = marker ? marker.index + marker[1].length : -1;
    const narrative = markerStart >= 0 ? paragraph.slice(0, markerStart).trim() : paragraph;
    const sourceText = markerStart >= 0 ? paragraph.slice(markerStart) : '';
    for (const rawUrl of sourceText.match(urlPattern) || []) {
      const url = cleanUrl(rawUrl);
      if (!sources.includes(url)) sources.push(url);
    }
    const citationNote = sourceText
      .replace(/^(Sources?|References):\s*/i, '')
      .replace(urlPattern, '')
      .replace(/(?:\s*[;,]\s*)+/g, ' ')
      .replace(/^\s*[.!?]\s*/, '')
      .trim();

    if (narrative) {
      const labelMatch = narrative.match(/^([A-Za-z][A-Za-z ]{1,45}):\s*([\s\S]*)$/);
      const definition = labelMatch
        ? sectionLabels.find(({ pattern }) => pattern.test(labelMatch[1].trim()))
        : undefined;

      sections.push(definition
        ? { kind: definition.kind, heading: definition.heading, text: labelMatch![2].trim() }
        : { kind: 'paragraph', text: narrative });
    }
    if (citationNote) sections.push({ kind: 'paragraph', text: citationNote });
  }

  return { sections, sources };
}
