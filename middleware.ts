import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Simple middleware - no authentication checks needed
  // since we're using client-side localStorage authentication
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
