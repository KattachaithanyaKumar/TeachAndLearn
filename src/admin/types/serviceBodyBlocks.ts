import type { SanityImage } from "./servicePageBlocks";

export type ServiceBodyBlock =
  | {
      _type: "service_body_block_markdown";
      _key?: string;
      tag?: string;
      heading?: string;
      markdown?: string;
    }
  | {
      _type: "service_body_block_image";
      _key?: string;
      tag?: string;
      placement?: "full" | "left" | "right";
      image?: SanityImage | undefined;
      alt?: string;
      caption?: string;
      rounded?: boolean;
      shadow?: boolean;
    };

export const SERVICE_BODY_BLOCK_TYPE_OPTIONS: Array<{
  value: ServiceBodyBlock["_type"];
  label: string;
}> = [
  { value: "service_body_block_markdown", label: "Markdown section" },
  { value: "service_body_block_image", label: "Image (with placement)" },
];

export function newEmptyServiceBodyBlock(
  type: ServiceBodyBlock["_type"],
): ServiceBodyBlock {
  const _key = crypto.randomUUID();
  if (type === "service_body_block_image") {
    return {
      _type: type,
      _key,
      placement: "full",
      rounded: true,
      shadow: true,
      alt: "",
      caption: "",
    };
  }
  return { _type: "service_body_block_markdown", _key, tag: "", heading: "", markdown: "" };
}

export function normalizeTag(tag: string): string {
  return String(tag ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_ ]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

