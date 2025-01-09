export const LOGIN = '/login';
export const ROOT = '/';

//общественные маршруты. Все подмаршруты являются тоже общедоступными, если не прописаны в PROTECTED_SUB_ROUTES
export const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/products',
  '/blog',
  '/toplivo',
  '/api/register',
  '/api/auth/callback/google',
  '/api/auth/callback/github',
];

export const PROTECTED_SUB_ROUTES = ['/checkout'];
