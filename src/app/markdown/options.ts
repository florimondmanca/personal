import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.link = (href: string, title: string, text: string) => {
    return `<a target="_blank" href="${href}" title="${title}">${text}</a>`;
  };

  renderer.image = (href: string, title: string, text: string) => {
    const caption = text ? `<figcaption>${text}</figcaption>` : '';
    return `
      <div class="markdown-image">
        <img src="${href}" title="${title || ''}">
        ${caption}
      </div>
    `;
  }

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}
