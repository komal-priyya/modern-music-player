// import { useEffect, useRef, useState } from "react";
// import { ChevronDown, LogOut, UserCircle2, X } from "lucide-react";
// import { usePlayer } from "../../hooks/usePlayer";

// function ProfileMenu() {
//   // const { user, isLoggedIn, login, loginWithEmailPassword, register, logout } = usePlayer();
//   const { user, isLoggedIn, loginWithEmailPassword, register, logout } = usePlayer();
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState("login");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const firstInputRef = useRef(null);
//   const [error, setError] = useState("");
// const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!open) {
//       return;
//     }

//     const timeoutId = setTimeout(() => {
//       firstInputRef.current?.focus();
//     }, 0);

//     function handleEscape(event) {
//       if (event.key === "Escape") {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("keydown", handleEscape);
//     return () => {
//       clearTimeout(timeoutId);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [open, mode]);

//   const userName = user?.displayName || user?.email || "Profile";



//   ///////////////

// function validatePassword(value) {
//   if (value.length < 8) return "Password must be at least 8 characters long.";
//   if (!/[A-Z]/.test(value)) return "Password must include at least one uppercase letter.";
//   if (!/[a-z]/.test(value)) return "Password must include at least one lowercase letter.";
//   if (!/[0-9]/.test(value)) return "Password must include at least one number.";
//   if (!/[!@#$%^&*(),.?\":{}|<>_\-\\/[\]=+`~;]/.test(value)) {
//     return "Password must include at least one special character.";
//   }
//   return "";
// }




//   async function handleSubmit(event) {
//     event.preventDefault();

//     if (mode === "login") {
//       await loginWithEmailPassword(email, password);
//     } else {
//       await register(name, email, password);
//     }

//     setPassword("");
//     setOpen(false);
//   }


 



















//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => setOpen(true)}
//         className="flex max-w-full items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-3 text-sm text-slate-100 transition hover:bg-slate-800 sm:px-4"
//       >
//         <UserCircle2 size={18} />
//         <span className="max-w-[120px] truncate sm:max-w-[160px]">
//           {isLoggedIn ? userName : "Sign in / Login"}
//         </span>
//         <ChevronDown size={16} />
//       </button>

//       {open ? (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4">
//           <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl font-semibold text-white">
//                   {isLoggedIn ? "Your Profile" : "Welcome to Muzify"}
//                 </h2>
//                 <p className="mt-2 text-sm text-slate-400">
//                   {isLoggedIn
//                     ? "Manage your account here."
//                     : "Sign in or create an account to keep your playlists and library."}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {isLoggedIn ? (
//               <div className="mt-6 space-y-4">
//                 <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
//                   <p className="text-lg font-medium text-white">
//                     {user?.displayName || "Signed in user"}
//                   </p>
//                   <p className="mt-1 break-all text-sm text-slate-400">
//                     {user?.email || "No email available"}
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setOpen(false);
//                     logout();
//                   }}
//                   className="action-button"
//                 >
//                   <LogOut size={16} />
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-6 space-y-4">
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     type="button"
//                     onClick={() => setMode("login")}
//                     className={`rounded-lg px-4 py-2 text-sm font-medium ${
//                       mode === "login"
//                         ? "bg-orange-400 text-slate-950"
//                         : "border border-slate-700 bg-slate-800 text-slate-200"
//                     }`}
//                   >
//                     Login
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setMode("register")}
//                     className={`rounded-lg px-4 py-2 text-sm font-medium ${
//                       mode === "register"
//                          ? "bg-sky-400 text-slate-950"
//                         : "border border-slate-700 bg-slate-800 text-slate-200"
                    
  
                    
                    
                    
//                     }`}
//                   >
//                     Sign up
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {mode === "register" ? (
//                     <input
//                       ref={firstInputRef}
//                       value={name}
//                       onChange={(event) => setName(event.target.value)}
//                       placeholder="Name"
//                       className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
//                     />
//                   ) : null}

//                   <input
//                     ref={mode === "login" ? firstInputRef : null}
//                     value={email}
//                     onChange={(event) => setEmail(event.target.value)}
//                     placeholder="Email"
//                     type="email"
//                     className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
//                   />

//                   <input
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)}
//                     placeholder="Password"
//                     type="password"
//                     className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
//                   />

//                   <button
//                     type="submit"
//                     className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium ${
//                       mode === "login"
//                         ? "bg-orange-400 text-slate-950"
//                         : "bg-sky-400 text-slate-950"
//                     }`}
//                   >
//                     {mode === "login" ? "Login" : "Create account"}
//                   </button>
//                 </form>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setOpen(false);
//                     login();
//                   }}
//                   className="action-button w-full"
//                 >
//                   Sign in with Google
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

// export default ProfileMenu;













//////////////////////////
// import { useEffect, useRef, useState } from "react";
// import { ChevronDown, LogOut, UserCircle2, X } from "lucide-react";
// import { usePlayer } from "../../hooks/usePlayer";

// function ProfileMenu() {
// const { user, isLoggedIn, loginWithEmailPassword, register, logout } = usePlayer();
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState("login");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const firstInputRef = useRef(null);

//   useEffect(() => {
//     if (!open) return;

//     const timeoutId = setTimeout(() => {
//       firstInputRef.current?.focus();
//     }, 0);

//     function handleEscape(event) {
//       if (event.key === "Escape") {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       clearTimeout(timeoutId);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [open, mode]);

//   const userName = user?.displayName || user?.email || "Profile";

//   function validatePassword(value) {
//     if (value.length < 8) return "Password must be at least 8 characters long.";
//     if (!/[A-Z]/.test(value)) return "Password must include at least one uppercase letter.";
//     if (!/[a-z]/.test(value)) return "Password must include at least one lowercase letter.";
//     if (!/[0-9]/.test(value)) return "Password must include at least one number.";
//     if (!/[!@#$%^&*(),.?\":{}|<>_\-\\/[\]=+`~;]/.test(value)) {
//       return "Password must include at least one special character.";
//     }
//     return "";
//   }

//   function getFirebaseErrorMessage(code) {
//     switch (code) {
//       case "auth/invalid-email":
//         return "Please enter a valid email address.";
//       case "auth/user-not-found":
//         return "No account found with this email.";
//       case "auth/wrong-password":
//       case "auth/invalid-credential":
//         return "Incorrect email or password.";
//       case "auth/email-already-in-use":
//         return "This email is already registered.";
//       case "auth/weak-password":
//         return "Password is too weak.";
//       case "auth/too-many-requests":
//         return "Too many attempts. Please try again later.";
//       default:
//         return "Something went wrong. Please try again.";
//     }
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();
//     setError("");

//     if (!email.trim()) {
//       setError("Email is required.");
//       return;
//     }

//     if (!password.trim()) {
//       setError("Password is required.");
//       return;
//     }

//     if (mode === "register") {
//       if (!name.trim()) {
//         setError("Name is required.");
//         return;
//       }

//       const passwordError = validatePassword(password);
//       if (passwordError) {
//         setError(passwordError);
//         return;
//       }
//     }

//     try {
//       setLoading(true);

//       if (mode === "login") {
//         await loginWithEmailPassword(email.trim(), password);
//       } else {
//         await register(name.trim(), email.trim(), password);
//       }

//       setName("");
//       setEmail("");
//       setPassword("");
//       setError("");
//       setOpen(false);
//     } catch (err) {
//       setError(getFirebaseErrorMessage(err.code));
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => {
//           setError("");
//           setOpen(true);
//         }}
//         className="flex max-w-full items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-3 text-sm text-slate-100 transition hover:bg-slate-800 sm:px-4"
//       >
//         <UserCircle2 size={18} />
//         <span className="max-w-[120px] truncate sm:max-w-[160px]">
//           {isLoggedIn ? userName : "Sign in / Login"}
//         </span>
//         <ChevronDown size={16} />
//       </button>

//       {open ? (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4">
//           <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl font-semibold text-white">
//                   {isLoggedIn ? "Your Profile" : "Welcome to Muzify"}
//                 </h2>
//                 <p className="mt-2 text-sm text-slate-400">
//                   {isLoggedIn
//                     ? "Manage your account here."
//                     : "Sign in or create an account to keep your playlists and library."}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {isLoggedIn ? (
//               <div className="mt-6 space-y-4">
//                 <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
//                   <p className="text-lg font-medium text-white">
//                     {user?.displayName || "Signed in user"}
//                   </p>
//                   <p className="mt-1 break-all text-sm text-slate-400">
//                     {user?.email || "No email available"}
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setOpen(false);
//                     logout();
//                   }}
//                   className="action-button"
//                 >
//                   <LogOut size={16} />
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-6 space-y-4">
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setMode("login");
//                       setError("");
//                     }}
//                     className={`rounded-lg px-4 py-2 text-sm font-medium ${
//                       mode === "login"
//                         ? "bg-orange-400 text-slate-950"
//                         : "border border-slate-700 bg-slate-800 text-slate-200"
//                     }`}
//                   >
//                     Login
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setMode("register");
//                       setError("");
//                     }}
//                     className={`rounded-lg px-4 py-2 text-sm font-medium ${
//                       mode === "register"
//                         ? "bg-sky-400 text-slate-950"
//                         : "border border-slate-700 bg-slate-800 text-slate-200"
//                     }`}
//                   >
//                     Sign up
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {mode === "register" ? (
//                     <input
//                       ref={firstInputRef}
//                       value={name}
//                       onChange={(event) => setName(event.target.value)}
//                       placeholder="Name"
//                       className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
//                     />
//                   ) : null}

//                   <input
//                     ref={mode === "login" ? firstInputRef : null}
//                     value={email}
//                     onChange={(event) => setEmail(event.target.value)}
//                     placeholder="Email"
//                     type="email"
//                     className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
//                   />

//                   <input
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)}
//                     placeholder="Password"
//                     type="password"
//                     className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
//                   />

//                   {mode === "register" ? (
//                     <ul className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-400 space-y-1">
//                       <li className={password.length >= 8 ? "text-green-400" : ""}>
//                         At least 8 characters
//                       </li>
//                       <li className={/[A-Z]/.test(password) ? "text-green-400" : ""}>
//                         One uppercase letter
//                       </li>
//                       <li className={/[a-z]/.test(password) ? "text-green-400" : ""}>
//                         One lowercase letter
//                       </li>
//                       <li className={/[0-9]/.test(password) ? "text-green-400" : ""}>
//                         One number
//                       </li>
//                       <li
//                         className={
//                           /[!@#$%^&*(),.?\":{}|<>_\-\\/[\]=+`~;]/.test(password)
//                             ? "text-green-400"
//                             : ""
//                         }
//                       >
//                         One special character
//                       </li>
//                     </ul>
//                   ) : null}

//                   {error ? (
//                     <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
//                       {error}
//                     </p>
//                   ) : null}

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium disabled:opacity-60 ${
//                       mode === "login"
//                         ? "bg-orange-400 text-slate-950"
//                         : "bg-sky-400 text-slate-950"
//                     }`}
//                   >
//                     {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

// export default ProfileMenu;



import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, UserCircle2, X } from "lucide-react";
import { usePlayer } from "../../hooks/usePlayer";

function ProfileMenu() {
  const {
    user,
    isLoggedIn,
    loginWithEmailPassword,
    register,
    resendVerification,
    refreshVerificationStatus,
    logout,
  } = usePlayer();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

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

  function validateEmailDomain(value) {
    const normalizedEmail = value.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return "Please enter a valid email address.";
    }

    const domain = normalizedEmail.split("@")[1];

    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "ymail.com",
      "outlook.com",
      "hotmail.com",
      "live.com",
      "icloud.com",
    ];

    if (!allowedDomains.includes(domain)) {
      return "Only Gmail, Yahoo, Outlook, Hotmail, Live, or iCloud emails are allowed.";
    }

    return "";
  }

  function validatePassword(value) {
    if (value.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(value)) return "Password must include at least one uppercase letter.";
    if (!/[a-z]/.test(value)) return "Password must include at least one lowercase letter.";
    if (!/[0-9]/.test(value)) return "Password must include at least one number.";
    if (!/[!@#$%^&*(),.?\":{}|<>_\-\\/[\]=+`~;]/.test(value)) {
      return "Password must include at least one special character.";
    }
    return "";
  }

  function getFirebaseErrorMessage(code) {
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Invalid email or password.";
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/weak-password":
        return "Password is too weak.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    const emailError = validateEmailDomain(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setError("Name is required.");
        return;
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    }

    try {
      setLoading(true);

      if (mode === "login") {
        await loginWithEmailPassword(email.trim(), password);
      } else {
        await register(name.trim(), email.trim(), password);
      }

      setName("");
      setEmail("");
      setPassword("");
      setError("");
      setOpen(false);
    } catch (err) {
      setError(getFirebaseErrorMessage(err?.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
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

                  {user?.emailVerified ? (
                    <p 
                    className="mt-2 text-sm text-green-400"
                    >Email verified
                    </p>
                  ) : (
                    <div 
                    // className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3"
                    >
                      <p 
                      // className="text-sm text-amber-300"
                      >
                        {/* Your email is not verified yet. Please check your inbox and click the
                        verification link. */}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={resendVerification}
                          // className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-medium text-slate-950"
                        >
                          {/* Resend verification email */}
                        </button>

                        <button
                          type="button"
                          onClick={refreshVerificationStatus}
                          // className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200"
                        >
                          {/* I have verified */}
                        </button>
                      </div>
                    </div>
                  )}
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
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
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
                    onClick={() => {
                      setMode("register");
                      setError("");
                    }}
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

                  {mode === "register" ? (
                    <ul className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-400 space-y-1">
                      <li className={password.length >= 8 ? "text-green-400" : ""}>
                        At least 8 characters
                      </li>
                      <li className={/[A-Z]/.test(password) ? "text-green-400" : ""}>
                        One uppercase letter
                      </li>
                      <li className={/[a-z]/.test(password) ? "text-green-400" : ""}>
                        One lowercase letter
                      </li>
                      <li className={/[0-9]/.test(password) ? "text-green-400" : ""}>
                        One number
                      </li>
                      <li
                        className={
                          /[!@#$%^&*(),.?\":{}|<>_\-\\/[\]=+`~;]/.test(password)
                            ? "text-green-400"
                            : ""
                        }
                      >
                        One special character
                      </li>
                    </ul>
                  ) : null}

                  {mode === "register" ? (
                    <p className="text-xs text-slate-400">
                      Allowed emails: Gmail, Yahoo, Outlook, Hotmail, Live, and iCloud.
                    </p>
                  ) : null}

                  {error ? (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium disabled:opacity-60 ${
                      mode === "login"
                        ? "bg-orange-400 text-slate-950"
                        : "bg-sky-400 text-slate-950"
                    }`}
                  >
                    {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProfileMenu;



























