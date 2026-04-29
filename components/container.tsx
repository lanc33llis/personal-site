import { cn } from "@/lib/utils";

const Container = ({
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto px-7 sm:px-12 py-8", className)} {...props} />
  );
};

export default Container;
