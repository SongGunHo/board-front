'use chlient'
import { unauthorized } from "next/navigation"
import useUser from "../hooks/useUse"
export default function AdminOnlyContainer({ children }) {
  const { isAdmin } = useUser()
  if (!isAdmin) {
    unauthorized()
  }

  return children
}