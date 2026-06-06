import { createFileRoute } from '@tanstack/vue-router'
import { createServerFn } from '@tanstack/vue-start'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div class="p-2">
      <h3>Welcome Home!!!</h3>
    </div>
  )
}
