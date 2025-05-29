// import {
// 	clerkMiddleware,
// 	auth,
// 	createRouteMatcher,
// } from '@clerk/nextjs/server';

// export default clerkMiddleware(async (auth, req) => {
// 	const user = await auth(); // No need for `await`

// 	if (isProtectedRoute(req) && !user.userId) {
// 		return Response.redirect(new URL('/sign-in', req.nextUrl));
// 	}
// });

// export const config = {
// 	matcher: [
// 		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
// 		// 	// Always run for API routes
// 		'/(api|trpc)(.*)',
// 	],
// };

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
const isProtectedRoute: any = createRouteMatcher(['/dashboard(.*)']);

// export default clerkMiddleware();
export default clerkMiddleware(async (auth, req) => {
	const user = await auth(); // Get user authentication status
	// return new Response('Unauthorized', {
	// 	status: 401,
	// 	headers: { 'Content-Type': 'text/plain' },
	// });

	// 	// if (isProtectedRoute(req) && !user.userId) {
	if (!user.userId && req.nextUrl.pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/', req.nextUrl));
	}
	// 	// }
});
export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};

// export default clerkMiddleware(async (auth, req) => {
// 	const user = await auth(); // Get user authentication status

// 	// if (isProtectedRoute(req) && !user.userId) {
// 	return Response.redirect(new URL('/sign-in', req.nextUrl));
// 	// }
// });
