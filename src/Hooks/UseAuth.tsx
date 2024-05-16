import { session, userData } from "@/app/Features/AuthenticationSlice";
import { useAppSelector } from "@/app/reduxHooks";

export default function UseAuth() {
  const UserData = useAppSelector(userData);
  const Session = useAppSelector(session);
 

  return [Session, UserData];
}
