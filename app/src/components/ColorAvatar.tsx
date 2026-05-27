import type { Member } from "@/types";

const BG: Record<string, string> = {
  "tag-blue-bg": "bg-ui-tag-blue-bg",
  "tag-purple-bg": "bg-ui-tag-purple-bg",
  "tag-orange-bg": "bg-ui-tag-orange-bg",
  "tag-red-bg": "bg-ui-tag-red-bg",
  "tag-green-bg": "bg-ui-tag-green-bg",
  "tag-neutral-bg": "bg-ui-tag-neutral-bg",
};

const TEXT: Record<string, string> = {
  "tag-blue-text": "text-ui-tag-blue-text",
  "tag-purple-text": "text-ui-tag-purple-text",
  "tag-orange-text": "text-ui-tag-orange-text",
  "tag-red-text": "text-ui-tag-red-text",
  "tag-green-text": "text-ui-tag-green-text",
  "tag-neutral-text": "text-ui-tag-neutral-text",
};

const SIZE = {
  xsmall: { outer: "size-5", inner: "size-4 text-[12px]" },
  small: { outer: "size-6", inner: "size-5 text-[12px]" },
  base: { outer: "size-8", inner: "size-[26px] text-[13px]" },
  xlarge: { outer: "size-12", inner: "size-11 text-[18px]" },
};

export function ColorAvatar({
  member,
  size = "xsmall",
}: {
  member: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  size?: keyof typeof SIZE;
}) {
  const s = SIZE[size];
  return (
    <div
      className={`overflow-clip rounded-full shadow-borders-base shrink-0 align-middle flex items-center justify-center ${s.outer}`}
    >
      <div
        className={`rounded-full flex items-center justify-center ${s.inner} ${BG[member.avatarBg] ?? ""} ${TEXT[member.avatarText] ?? ""}`}
      >
        <span className="font-medium leading-5 text-center">
          {member.initials}
        </span>
      </div>
    </div>
  );
}
