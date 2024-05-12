export interface User {
  id?: number | null,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  username: string,
  compagnie?: string | null,
  web_site_compagnie?:string | null,
  role_id?: number | null,
}