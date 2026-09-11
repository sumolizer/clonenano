import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProvider from "@/components/ScrollProvider";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      <ScrollProvider>
        <div className="flex min-h-full flex-col pt-[108px]">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </ScrollProvider>
    </>
  );
}
