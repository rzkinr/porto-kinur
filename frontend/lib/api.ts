const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  github: string;
  demo: string;
  status: string;
  createdAt: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  read_time: string;
  createdAt: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

//projects
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`, { cache: 'no-store' });
  const json = await res.json();
  return json.data || [];
}

export async function getProjectById(id: number): Promise<Project | null> {
  const res = await fetch(`${API_URL}/projects/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

//blog
export async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API_URL}/blogs`, { cache: 'no-store' });
  const json = await res.json();
  return json.data || [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await fetch(`${API_URL}/blogs/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

//contact
export async function sendContact(contact: ContactPayload): Promise<boolean> {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  return res.ok;
}

// AUTH
export async function login(
  username: string,
  password: string,
): Promise<string | null> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.token || null;
}

//admin helper
function authHeaders() {
  const token = Cookies.get('admin_token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

//admin projects
export async function adminCreateProject(
  project: Omit<Project, 'id' | 'createdAt'>,
) {
  const res = await fetch(`${API_URL}/admin/projects`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(project),
  });
  return res.ok;
}

export async function adminUpdateProject(
  id: number,
  project: Omit<Project, 'id' | 'createdAt'>,
) {
  const res = await fetch(`${API_URL}/admin/projects/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(project),
  });
  return res.ok;
}

export async function adminDeleteProject(id: number) {
  const res = await fetch(`${API_URL}/admin/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.ok;
}

//admin blogs
export async function adminCreateBlog(blog: Omit<Blog, 'id' | 'createdAt'>) {
  const res = await fetch(`${API_URL}/admin/blogs`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(blog),
  });
  return res.ok;
}

export async function adminUpdateBlog(
  id: string,
  blog: Omit<Blog, 'id' | 'createdAt'>,
) {
  const res = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(blog),
  });
  return res.ok;
}

export async function adminDeleteBlog(id: string) {
  const res = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.ok;
}

export async function adminGetMessages(): Promise<Contact[]> {
  const res = await fetch(`${API_URL}/admin/messages`, {
    headers: authHeaders(),
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}
