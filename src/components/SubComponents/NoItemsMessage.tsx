import { cn } from "@/lib/utils";

function NoItemsMessage({
  h,
  message,
  className,
}: {
  message: string;
  h?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        `w-full ${
          h === "screen" ? "h-[calc(100vh-136px)]" : "h-[500px]"
        } flex-center`,
        className
      )}
    >
      <p> {message}</p>
    </section>
  );
}

export default NoItemsMessage;
