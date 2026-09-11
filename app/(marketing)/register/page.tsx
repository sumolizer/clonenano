import { redirect } from "next/navigation";
import { hasSessionCookie } from "@/lib/session";
import RegisterForm from "@/components/RegisterForm";

export default async function RegisterPage(props: PageProps<"/register">) {
  const params = await props.searchParams;
  const rawNext = params.next;
  const next = typeof rawNext === "string" && rawNext.startsWith("/") ? rawNext : "/dashboard";

  if (await hasSessionCookie()) {
    redirect(next);
  }

  return <RegisterForm next={next} />;
}
