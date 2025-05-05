export const formattedDateTime = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
};

export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
    const DOTS = "...";
    const totalNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.max(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    const firstPage = 1;
    const lastPage = totalPages;

    if (!showLeftDots && showRightDots) {
        let range = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
        return [...range, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
        let range = Array.from({ length: 3 + 2 * siblingCount },
            (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i);
        return [firstPage, DOTS, ...range];
    }

    if (showLeftDots && showRightDots) {
        let middle = Array.from({ length: 2 * siblingCount + 1 },
            (_, i) => leftSibling + i);
        return [firstPage, DOTS, ...middle, DOTS, lastPage];
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
}

export const getPaginationRange2 = (currentPage, totalPages) => {
    const DOTS = "...";
    
    if (totalPages <= 3) {
        return Array.from({ length: totalPages }, (_, i) => i+1);
    }

    const pages = new Set();

    pages.add(1);
    pages.add(totalPages);

    for (let i = currentPage-1; i <= currentPage+1; i++) {
        if (i > 1 && i < totalPages) {
            pages.add(i);
        }
    }

    const sorted = Array.from(pages).sort((a, b) => a-b);
    const rangeWithDots = [];

    for (let i = 0; i < sorted.length; i++) {
        const current = sorted[i];
        const next = sorted[i+1];

        rangeWithDots.push(current);

        if (next && next - current > 1) {
            rangeWithDots.push(DOTS);
        }
    }

    return rangeWithDots;
}