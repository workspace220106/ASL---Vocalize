import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Shell } from '@/Shell'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  )
}
