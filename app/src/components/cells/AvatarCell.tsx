import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

export function AvatarCell({ member }: { member: Pick<Member, "name" | "initials" | "avatarBg" | "avatarText"> }) {
  return (
    <div className="flex gap-2 items-center">
      <ColorAvatar member={member} size="xsmall" />
      <span className="txt-compact-small text-ui-fg-base">{member.name}</span>
    </div>
  );
}
