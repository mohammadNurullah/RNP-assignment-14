// apps/protected.js
import { useRouter } from "next/router";
import { verifyToken } from "../utils/auth";

export default function ProtectedPage({ user }) {
  const router = useRouter();

  if (!user) {
    // Redirect unauthenticated users to the login page
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      {/* Your protected content */}
    </div>
  );
}

// This function will run on the server side
export async function getServerSideProps(context) {
  const token = context.req.headers.cookie?.replace("token=", "");
  const user = verifyToken(token);

  return {
    props: { user },
  };
}
