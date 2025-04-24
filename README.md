## Install

```aiignore
npm install --save @sentry/react
```

## Configure SDK

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://2d6609979342fa35c40f6812cd4266b3@o525885.ingest.us.sentry.io/4509208310710272",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

const container = document.getElementById(“app”);
const root = createRoot(container);
root.render(<App />);
```

## Source Maps
[sentry doc](https://docs.sentry.io/platforms/javascript/guides/react/sourcemaps/)

