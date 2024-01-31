import { AvatarGenerator } from "random-avatar-generator";
import classJoin from "../utils/classJoin";

export default function ProfileImage({ name, className }) {
  const avatarGenerator = new AvatarGenerator();

  return (
    <img
      className={classJoin(["w-14 h-14 rounded-full", className])}
      src={avatarGenerator.generateRandomAvatar(name)}
      alt={"profile image"}
    />
  );
}