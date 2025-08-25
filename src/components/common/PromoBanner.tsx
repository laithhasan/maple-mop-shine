export default function PromoBanner() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] bg-black text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <p className="h-8 sm:h-9 md:h-10 flex items-center justify-center text-xs sm:text-xs md:text-sm text-center leading-tight">
          <span className="hidden sm:inline">Our website helps you connect with us. Enjoy the first five days of cleaning for free and decide if we're the right fit for your business</span>
          <span className="sm:hidden">Get 5 days free cleaning to try our services</span>
        </p>
      </div>
    </div>
  );
}
