// src/app/utils/avatar.utils.ts

/**
 * Generates an avatar URL with initials based on a full name.
 * If the name has multiple parts (e.g., "Alex Jason"), it uses the first letter
 * of the first two words (e.g., "AJ").
 * If the name has only one part (e.g., "Alex"), it uses the first letter (e.g., "A").
 *
 * @param fullname The full name of the user (e.g., "Alex Jason" or "Alex").
 * @returns A string representing the generated avatar URL.
 */
export function generateAvatarUrl(fullname: string): string {
  if (!fullname) {
    // Return a default or empty avatar if fullname is not provided
    return 'https://placehold.co/100x100/CCCCCC/000000?text=NA'; // Default "Not Available"
  }

  const nameParts = fullname.trim().split(' ');
  let initials = '';

  if (nameParts.length > 1) {
    // For names like "Alex Jason", get "AJ"
    initials = nameParts[0].charAt(0) + nameParts[1].charAt(0);
  } else {
    // For names like "Alex", get "A"
    initials = nameParts[0].charAt(0);
  }

  // Ensure initials are uppercase for the URL
  initials = initials.toUpperCase();

  // Construct the URL using the provided base link
  return `https://placehold.co/100x100/34D399/FFFFFF?text=${initials}`;
}
