import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, UserCircle2 } from "lucide-react";
import { usePlayer } from "../../hooks/usePlayer";

function ProfileMenu() {
  const { user, isLoggedIn, login, loginWithEmailPassword, register, logout } = usePlayer();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userName = user?.displayName || user?.email || "Profile";

  async function handleSubmit(event) {
    event.preventDefault();

    if (mode === "login") {
      await loginWithEmailPassword(email, password);
    } else {
      await register(name, email, password);
    }

    setPassword("");
    setOpen(false);
  }

  return (
    <div ref={menuRef} className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex max-w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-100 transition hover:bg-white/10 sm:px-4"
      >
        <UserCircle2 size={18} />
        <span className="max-w-[120px] truncate sm:max-w-[160px]">
          {isLoggedIn ? userName : "Sign in / Login"}
        </span>
        <ChevronDown size={16} />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-20 mt-3 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl">
          {isLoggedIn ? (
            <>
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="font-medium text-white">{user?.displayName || "Signed in user"}</p>
                <p className="mt-1 break-all text-sm text-slate-400">
                  {user?.email || "No email available"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="mt-3 flex w-full items-center gap-2 rounded-2xl px-3 py-3 text-left text-sm text-slate-200 transition hover:bg-white/5"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`rounded-full px-4 py-2 text-sm ${
                    mode === "login" ? "bg-white text-slate-900" : "bg-white/5 text-slate-200"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`rounded-full px-4 py-2 text-sm ${
                    mode === "register" ? "bg-white text-slate-900" : "bg-white/5 text-slate-200"
                  }`}
                >
                  Sign up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === "register" ? (
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none"
                  />
                ) : null}

                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  type="email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none"
                />

                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  type="password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none"
                />

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-3 text-sm font-medium text-white"
                >
                  {mode === "login" ? "Login" : "Create account"}
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  login();
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                Sign in with Google
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ProfileMenu;
