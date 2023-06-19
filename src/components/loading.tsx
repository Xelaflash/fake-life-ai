export default function Loading({ color }: { color: string }) {
  return (
    <div
      className={`h-[512px] w-[512px] relative
      text-center
      flex
      flex-col
      justify-center
      m-auto
      before:absolute before:inset-0
      before:-translate-x-full
      before:animate-[shimmer_2.5s_ease_infinite]
      before:bg-gradient-to-r
      before:from-${color}/0 before:via-${color}/10 before:to-${color}/50
      isolate
      overflow-hidden`}
    >
      <p className="text-bold my-4 text-5xl text-center">🤖</p>
      <p className={` text-semibold italic mt-4 text-xl`}>
        Robot work in progress...
      </p>
    </div>
  );
}
