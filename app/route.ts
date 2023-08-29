
export async function POST(request: Request) {
    const body = await request.json()
    const { name } = body
    return new Response(`Hello ${name}!`, {
        headers: { 'content-type': 'text/plain' },
    })
}
