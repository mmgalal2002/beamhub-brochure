import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ExternalLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "children" | "target" | "rel"
> & {
  href: string;
  children: ReactNode;
};

export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  const isWebsite = href.startsWith("https://");
  return (
    <a
      href={href}
      target={isWebsite ? "_blank" : undefined}
      rel={isWebsite ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
      {isWebsite && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
