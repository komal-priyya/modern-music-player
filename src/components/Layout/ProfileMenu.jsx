import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, UserCircle2, X } from "lucide-react";
import { usePlayer } from "../../hooks/usePlayer";

function ProfileMenu() {
  const { user, isLoggedIn, login, loginWithEmailPassword, register, logout } = usePlayer();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeoutId = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 0);

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, mode]);

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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex max-w-full items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-3 text-sm text-slate-100 transition hover:bg-slate-800 sm:px-4"
      >
        <UserCircle2 size={18} />
        <span className="max-w-[120px] truncate sm:max-w-[160px]">
          {isLoggedIn ? userName : "Sign in / Login"}
        </span>
        <ChevronDown size={16} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {isLoggedIn ? "Your Profile" : "Welcome to Muzify"}
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  {isLoggedIn
                    ? "Manage your account here."
                    : "Sign in or create an account to keep your playlists and library."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            {isLoggedIn ? (
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-lg font-medium text-white">
                    {user?.displayName || "Signed in user"}
                  </p>
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
                  className="action-button"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                      mode === "login"
                        ? "bg-orange-400 text-slate-950"
                        : "border border-slate-700 bg-slate-800 text-slate-200"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                      mode === "register"
                        ? "bg-sky-400 text-slate-950"
                        : "border border-slate-700 bg-slate-800 text-slate-200"
                    }`}
                  >
                    Sign up
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "register" ? (
                    <input
                      ref={firstInputRef}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Name"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
                    />
                  ) : null}

                  <input
                    ref={mode === "login" ? firstInputRef : null}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    type="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
                  />

                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    type="password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
                  />

                  <button
                    type="submit"
                    className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium ${
                      mode === "login"
                        ? "bg-orange-400 text-slate-950"
                        : "bg-sky-400 text-slate-950"
                    }`}
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
                  className="action-button w-full"
                >
                  Sign in with Google
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProfileMenu;
