// Demo authentication system for development
// Replace with real Supabase auth when ready

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  username: string;
  fullName: string;
}

const DEMO_USERS: DemoUser[] = [
  {
    id: "demo-1",
    email: "demo@trekmates.com",
    password: "demo123",
    username: "demo_trekker",
    fullName: "Demo Trekker",
  },
  {
    id: "demo-2",
    email: "arjun@example.com",
    password: "password123",
    username: "arjun_treks",
    fullName: "Arjun Sharma",
  },
];

const STORAGE_KEY = "trekmates_demo_user";

export function demoSignUp(
  email: string,
  password: string,
  username: string,
  fullName: string
) {
  // Check if user already exists
  const exists = DEMO_USERS.some((u) => u.email === email || u.username === username);
  if (exists) {
    return {
      error: "User with that email or username already exists",
      user: null,
    };
  }

  // Create new user
  const newUser: DemoUser = {
    id: `demo-${Date.now()}`,
    email,
    password,
    username,
    fullName,
  };

  DEMO_USERS.push(newUser);

  // Store in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        fullName: newUser.fullName,
      })
    );
  }

  return {
    error: null,
    user: newUser,
  };
}

export function demoLogin(email: string, password: string) {
  const user = DEMO_USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    return {
      error: "Invalid email or password",
      user: null,
    };
  }

  // Store in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
      })
    );
  }

  return {
    error: null,
    user,
  };
}

export function demoLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getDemoUser() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return null;
}

export function isLoggedIn() {
  return getDemoUser() !== null;
}
