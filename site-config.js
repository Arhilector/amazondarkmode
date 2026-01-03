(() => {
  const configPath = './site-config.json';

  const setText = (selector, config) => {
    document.querySelectorAll(selector).forEach((el) => {
      const key = el.getAttribute('data-config-text');
      if (key && config[key]) {
        el.textContent = config[key];
      }
    });
  };

  const setHref = (selector, config) => {
    document.querySelectorAll(selector).forEach((el) => {
      const key = el.getAttribute('data-config-href');
      if (key && config[key]) {
        el.setAttribute('href', config[key]);
      }
    });
  };

  const setEmail = (selector, config) => {
    if (!config.contactEmail) return;
    document.querySelectorAll(selector).forEach((el) => {
      const mode = el.getAttribute('data-config-email');
      el.setAttribute('href', `mailto:${config.contactEmail}`);
      if (mode !== 'href') {
        el.textContent = config.contactEmail;
      }
    });
  };

  fetch(configPath)
    .then((response) => (response.ok ? response.json() : null))
    .then((config) => {
      if (!config) return;
      setText('[data-config-text]', config);
      setHref('[data-config-href]', config);
      setEmail('[data-config-email]', config);
    })
    .catch(() => {
      // Keep static content if config can't be loaded.
    });
})();
