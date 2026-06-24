// Plain, locale-stable date formatter for blog timestamps. Kept deterministic
// (explicit en-US, UTC) so server and client render the same string and React
// does not throw a hydration mismatch.
export function formatBlogDate(iso: string): string {
	const date = new Date(iso)
	if (Number.isNaN(date.getTime())) return iso
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	})
}
