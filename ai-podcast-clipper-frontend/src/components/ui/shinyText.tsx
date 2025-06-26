import type { ComponentPropsWithoutRef, ElementType, JSX } from "react";

type shinyTextProp<T extends ElementType> = {
  text: string | number;
  disabled: boolean;
  speed: number;
  className: string;
  element?: T;
} & Omit<ComponentPropsWithoutRef<T>, "classNAme" | "children">;

const ShinyText = <T extends ElementType = "div">({
  text,
  disabled = false,
  speed = 5,
  className = "",
  element,
  ...rest
}: shinyTextProp<T>): JSX.Element => {
  const Component = element ?? "div";
  const animationDuration = `${speed}s`;

  return (
    <Component
      className={`inline-block bg-clip-text text-[#b5b5b5a4] ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
      {...rest}
    >
      {text}
    </Component>
  );
};

export default ShinyText;
