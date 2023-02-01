const NODE_ENV = process.env.NODE_ENV;
const PUBLIC_URL = process.env.PUBLIC_URL;

export const PRODUCTION_URL = NODE_ENV === "development" ? "" : PUBLIC_URL;
