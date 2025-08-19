export default function formatText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace spaces and other characters with hyphens
        .replace(/^-|-$/g, '') // Remove hyphens at the beginning and end
}