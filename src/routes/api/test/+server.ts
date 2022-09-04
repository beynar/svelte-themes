export async function GET() {
	return new Response(JSON.stringify({ hello: true }));
}
