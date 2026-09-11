import { redirect } from "next/navigation";
import { hasSessionCookie } from "@/lib/session";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage(props: PageProps<"/login">) {
  const params = await props.searchParams;
  const rawNext = params.next;
  const next = typeof rawNext === "string" && rawNext.startsWith("/") ? rawNext : "/dashboard";

  if (await hasSessionCookie()) {
    redirect(next);
  }

  return <LoginForm next={next} />;
}
