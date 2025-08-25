export default function PromoBanner() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="h-10 md:h-11 lg:h-12 flex items-center justify-center text-xs sm:text-sm md:text-sm lg:text-base whitespace-nowrap overflow-hidden text-ellipsis">
          Our website helps you connect with us. Enjoy the first five days of cleaning for free and decide if we're the right fit for your business
        </p>
      </div>
    </div>
  );
}
