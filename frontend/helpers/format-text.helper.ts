export function getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  export function formatShortDate(date: string): string {
    const dateObj = new Date(date);
  
    const formatted = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });

    return formatted;
  }
  