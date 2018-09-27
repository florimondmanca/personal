import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

// Demo: https://tinesoft.github.io/ngx-cookieconsent/home
// Configuration reference: https://tinesoft.github.io/ngx-cookieconsent/doc/index.html
export function configureCookieConsent(opts: { domain: string }): NgcCookieConsentConfig {
  return {
    cookie: {
      // It is mandatory to set a domain for cookies to work properly (see https://goo.gl/S2Hy2A)
      domain: opts.domain,
    },
    position: 'bottom',
    theme: 'edgeless',
    type: 'opt-in',
    revokeBtn: '<div class="cc-revoke {{classes}}">Cookies</div>',
    content: {
      message: (
        'Hi, there! Cookies allow me to monitor website usage. 🍪 ' +
        'Learn more by reading the'
      ),
      link: 'Privacy Policy',
      deny: `No, thanks`,
      href: '/privacy',
    },
    palette: {
      popup: {
        // Light primary
        background: '#ebf8f6',
        // Text color
        text: '#424242',
      },
      button: {
        // Accent
        background: '#ea3b53',
      },
    },
    elements: {
      // NOTE: must use {{var}}, not {{ var }}.
      messagelink: `
        <span id="cookieconsent:desc" class="cc-message">
          {{message}}
          <a aria-label="read the privacy policy" tabindex="0" href="{{href}}" target="_blank">{{link}}</a>.
        </span>
      `,
    },
  };
}
