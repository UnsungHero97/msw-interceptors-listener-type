import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest';
import { getResponse, http, HttpResponse } from 'msw';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const handlers = [
  http.post('http://localhost:8080/test', () => {
    return HttpResponse.json({ data: 'msw - ok' });
  }),
];

const interceptor = new XMLHttpRequestInterceptor();
interceptor.on('request', async ({ controller, request }) => {
  const response = await getResponse(handlers, request);
  controller.respondWith(response ?? Response.json({ error: 'msw interceptor error' }));
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>test</div>
  </StrictMode>,
);
