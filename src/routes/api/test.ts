export async function get() {
	return {
		status: 200,
		body: JSON.stringify({ hello: true })
	};
}
